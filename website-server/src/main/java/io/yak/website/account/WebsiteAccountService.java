package io.yak.website.account;

import io.yak.framework.security.common.entity.user.User;
import io.yak.framework.security.context.CurrentUser;
import io.yak.website.account.WebsiteAccountModels.CurrentUserResponse;
import io.yak.website.account.WebsiteAccountModels.EmailRequest;
import io.yak.website.account.WebsiteAccountModels.LoginRequest;
import io.yak.website.account.WebsiteAccountModels.MessageResponse;
import io.yak.website.account.WebsiteAccountModels.Profile;
import io.yak.website.account.WebsiteAccountModels.RegisterRequest;
import io.yak.website.account.WebsiteAccountModels.ResetPasswordRequest;
import io.yak.website.account.WebsiteAccountModels.TokenPurpose;
import io.yak.website.account.WebsiteAccountModels.TokenRecord;
import io.yak.website.account.WebsiteAccountModels.VerifyEmailRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.Locale;
import java.util.Optional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class WebsiteAccountService {

    private static final MessageResponse GENERIC_REGISTRATION_RESPONSE =
            new MessageResponse("如果该邮箱可以注册，我们已发送验证邮件");
    private static final MessageResponse GENERIC_RESET_RESPONSE =
            new MessageResponse("如果该邮箱已注册，我们已发送重置密码邮件");

    private final WebsiteAccountRepository repository;
    private final SecurityUserGateway securityUsers;
    private final WebsiteTokenCodec tokenCodec;
    private final WebsiteMailService mailService;
    private final WebsiteAccountProperties properties;
    private final WebsiteAccountRateLimiter rateLimiter;
    private final CurrentUser currentUser;

    public WebsiteAccountService(
            WebsiteAccountRepository repository,
            SecurityUserGateway securityUsers,
            WebsiteTokenCodec tokenCodec,
            WebsiteMailService mailService,
            WebsiteAccountProperties properties,
            WebsiteAccountRateLimiter rateLimiter,
            CurrentUser currentUser) {
        this.repository = repository;
        this.securityUsers = securityUsers;
        this.tokenCodec = tokenCodec;
        this.mailService = mailService;
        this.properties = properties;
        this.rateLimiter = rateLimiter;
        this.currentUser = currentUser;
    }

    public MessageResponse register(RegisterRequest request, HttpServletRequest httpRequest) {
        String email = normalizeEmail(request.email());
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("register-ip", ip, 20);
        rateLimiter.check("register-email", email, 3);

        Optional<Profile> existingProfile = repository.findProfileByEmail(email);
        if (existingProfile.isPresent()) {
            Profile profile = existingProfile.get();
            if (!profile.emailVerified()) {
                issueVerification(profile.securityUserId(), email);
            }
            return GENERIC_REGISTRATION_RESPONSE;
        }

        User user = securityUsers.provisionPending(email, request.password());
        try {
            repository.insertProfile(
                    user.getId(),
                    email,
                    defaultText(request.source(), "website"),
                    trimToNull(request.utmSource()),
                    trimToNull(request.utmMedium()),
                    trimToNull(request.utmCampaign()));
        } catch (DataIntegrityViolationException exception) {
            Profile raced = repository.findProfileByEmail(email).orElse(null);
            if (raced == null) {
                throw exception;
            }
            if (!raced.emailVerified()) {
                issueVerification(raced.securityUserId(), email);
            }
            return GENERIC_REGISTRATION_RESPONSE;
        }

        issueVerification(user.getId(), email);
        return GENERIC_REGISTRATION_RESPONSE;
    }

    public MessageResponse resendVerification(EmailRequest request, HttpServletRequest httpRequest) {
        String email = normalizeEmail(request.email());
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("verify-ip", ip, 20);
        rateLimiter.check("verify-email", email, 3);
        repository.findProfileByEmail(email)
                .filter(profile -> !profile.emailVerified())
                .ifPresent(profile -> issueVerification(profile.securityUserId(), email));
        return GENERIC_REGISTRATION_RESPONSE;
    }

    public MessageResponse verifyEmail(VerifyEmailRequest request) {
        TokenRecord token = repository.consumeToken(
                        tokenCodec.hash(request.token()),
                        TokenPurpose.VERIFY_EMAIL)
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        "链接无效或已过期"));

        Profile profile = repository.findProfileBySecurityUserId(token.securityUserId())
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        "账号验证信息不存在"));

        securityUsers.enable(profile.securityUserId());
        repository.markEmailVerified(profile.securityUserId());
        return new MessageResponse("邮箱验证成功，现在可以登录 Yak Ops");
    }

    public CurrentUserResponse login(
            LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        String email = normalizeEmail(request.email());
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("login-ip", ip, 100);
        rateLimiter.check("login-email", email, 10);

        Profile profile = repository.findProfileByEmail(email)
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.UNAUTHORIZED,
                        "邮箱或密码错误"));
        if (!profile.emailVerified()) {
            if (!securityUsers.credentialsMatch(email, request.password())) {
                throw new WebsiteAccountException(HttpStatus.UNAUTHORIZED, "邮箱或密码错误");
            }
            rateLimiter.reset("login-email", email);
            throw new WebsiteAccountException(HttpStatus.FORBIDDEN, "请先完成邮箱验证");
        }

        User user = securityUsers.login(
                email,
                request.password(),
                httpRequest,
                httpResponse);
        rateLimiter.reset("login-email", email);
        repository.touchLastLogin(user.getId());
        return toCurrentUser(user, profile);
    }

    public CurrentUserResponse current() {
        if (!currentUser.isAuthenticated() || currentUser.getUserId() == null) {
            throw new WebsiteAccountException(HttpStatus.UNAUTHORIZED, "请先登录");
        }
        Profile profile = repository.findProfileBySecurityUserId(currentUser.getUserId())
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.UNAUTHORIZED,
                        "当前账号不是 Yak Ops Website 用户"));
        User user = securityUsers.findById(currentUser.getUserId());
        if (user == null) {
            throw new WebsiteAccountException(HttpStatus.UNAUTHORIZED, "当前账号不存在");
        }
        return toCurrentUser(user, profile);
    }

    public MessageResponse logout(HttpServletRequest request, HttpServletResponse response) {
        securityUsers.logout(request, response);
        return new MessageResponse("已退出登录");
    }

    public MessageResponse forgotPassword(EmailRequest request, HttpServletRequest httpRequest) {
        String email = normalizeEmail(request.email());
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("reset-ip", ip, 20);
        rateLimiter.check("reset-email", email, 3);
        repository.findProfileByEmail(email)
                .filter(Profile::emailVerified)
                .ifPresent(profile -> issueReset(profile.securityUserId(), email));
        return GENERIC_RESET_RESPONSE;
    }

    public MessageResponse resetPassword(ResetPasswordRequest request) {
        TokenRecord token = repository.consumeToken(
                        tokenCodec.hash(request.token()),
                        TokenPurpose.RESET_PASSWORD)
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        "链接无效或已过期"));
        Profile profile = repository.findProfileBySecurityUserId(token.securityUserId())
                .filter(Profile::emailVerified)
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        "账号不可重置密码"));
        securityUsers.resetPassword(profile.securityUserId(), request.password());
        return new MessageResponse("密码已重置，请使用新密码登录");
    }

    private void issueVerification(Long userId, String email) {
        String rawToken = issueToken(userId, TokenPurpose.VERIFY_EMAIL, properties.getVerificationTtl());
        String link = UriComponentsBuilder.fromUriString(properties.getPublicBaseUrl())
                .pathSegment("verify-email")
                .queryParam("token", rawToken)
                .build()
                .encode()
                .toUriString();
        mailService.sendVerification(email, link);
    }

    private void issueReset(Long userId, String email) {
        String rawToken = issueToken(userId, TokenPurpose.RESET_PASSWORD, properties.getResetPasswordTtl());
        String link = UriComponentsBuilder.fromUriString(properties.getPublicBaseUrl())
                .pathSegment("reset-password")
                .queryParam("token", rawToken)
                .build()
                .encode()
                .toUriString();
        mailService.sendPasswordReset(email, link);
    }

    private String issueToken(Long userId, TokenPurpose purpose, Duration ttl) {
        String rawToken = tokenCodec.generate();
        repository.replaceToken(userId, purpose, tokenCodec.hash(rawToken), ttl);
        return rawToken;
    }

    private CurrentUserResponse toCurrentUser(User user, Profile profile) {
        String displayName = StringUtils.hasText(user.getRealName())
                ? user.getRealName()
                : profile.email().substring(0, profile.email().indexOf('@'));
        return new CurrentUserResponse(
                profile.id(),
                profile.email(),
                displayName,
                profile.emailVerified());
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }

    private String remoteAddress(HttpServletRequest request) {
        return request == null ? "unknown" : request.getRemoteAddr();
    }

    private String defaultText(String value, String fallback) {
        String trimmed = trimToNull(value);
        return trimmed == null ? fallback : trimmed;
    }

    private String trimToNull(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }
        return value.trim();
    }
}
