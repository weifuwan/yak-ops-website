package io.yak.website.account;

import io.yak.framework.security.common.entity.user.User;
import io.yak.framework.security.context.CurrentUser;
import io.yak.website.account.WebsiteAccountModels.CompleteRegistrationRequest;
import io.yak.website.account.WebsiteAccountModels.CurrentUserResponse;
import io.yak.website.account.WebsiteAccountModels.EmailRequest;
import io.yak.website.account.WebsiteAccountModels.LoginRequest;
import io.yak.website.account.WebsiteAccountModels.MessageResponse;
import io.yak.website.account.WebsiteAccountModels.Profile;
import io.yak.website.account.WebsiteAccountModels.RegistrationEmailRequest;
import io.yak.website.account.WebsiteAccountModels.RegistrationVerificationResponse;
import io.yak.website.account.WebsiteAccountModels.ResetPasswordRequest;
import io.yak.website.account.WebsiteAccountModels.TokenPurpose;
import io.yak.website.account.WebsiteAccountModels.TokenRecord;
import io.yak.website.account.WebsiteAccountModels.VerifyRegistrationCodeRequest;
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

    private static final int REGISTRATION_CODE_LENGTH = 6;
    private static final int REGISTRATION_CODE_INSERT_ATTEMPTS = 5;
    private static final MessageResponse REGISTRATION_CODE_SENT =
            new MessageResponse("验证码已发送，请检查邮箱");
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

    public MessageResponse requestRegistrationCode(
            RegistrationEmailRequest request,
            HttpServletRequest httpRequest) {
        String email = normalizeEmail(request.email());
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("register-code-ip", ip, 20);
        rateLimiter.check("register-code-email", email, 5);

        Optional<Profile> existingProfile = repository.findProfileByEmail(email);
        if (existingProfile.isPresent()) {
            Profile profile = existingProfile.get();
            if (profile.emailVerified()) {
                throw new WebsiteAccountException(HttpStatus.CONFLICT, "该邮箱已注册，请直接登录");
            }
            issueRegistrationCode(profile.securityUserId(), email);
            return REGISTRATION_CODE_SENT;
        }

        if (securityUsers.findByEmail(email) != null) {
            throw new WebsiteAccountException(HttpStatus.CONFLICT, "该邮箱已被使用，请直接登录或更换邮箱");
        }

        User user = securityUsers.provisionPending(email, tokenCodec.generate());
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
            if (raced.emailVerified()) {
                throw new WebsiteAccountException(HttpStatus.CONFLICT, "该邮箱已注册，请直接登录");
            }
            issueRegistrationCode(raced.securityUserId(), email);
            return REGISTRATION_CODE_SENT;
        }

        issueRegistrationCode(user.getId(), email);
        return REGISTRATION_CODE_SENT;
    }

    public RegistrationVerificationResponse verifyRegistrationCode(
            VerifyRegistrationCodeRequest request,
            HttpServletRequest httpRequest) {
        String email = normalizeEmail(request.email());
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("register-verify-ip", ip, 50);
        rateLimiter.check("register-verify-email", email, 10);

        Profile profile = repository.findProfileByEmail(email)
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        "验证码无效或已过期"));
        if (profile.emailVerified()) {
            throw new WebsiteAccountException(HttpStatus.CONFLICT, "该邮箱已完成注册，请直接登录");
        }

        String codeHash = registrationCodeHash(profile.securityUserId(), request.code());
        repository.consumeTokenForUser(
                        profile.securityUserId(),
                        codeHash,
                        TokenPurpose.REGISTRATION_CODE)
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        "验证码无效或已过期"));

        rateLimiter.reset("register-verify-email", email);
        String setupToken = issueToken(
                profile.securityUserId(),
                TokenPurpose.REGISTRATION_SETUP,
                properties.getRegistrationSetupTtl());
        return new RegistrationVerificationResponse(setupToken, "邮箱验证成功，请设置密码");
    }

    public CurrentUserResponse completeRegistration(
            CompleteRegistrationRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("register-complete-ip", ip, 30);

        TokenRecord token = repository.consumeToken(
                        tokenCodec.hash(request.setupToken()),
                        TokenPurpose.REGISTRATION_SETUP)
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        "注册会话无效或已过期，请重新验证邮箱"));

        Profile profile = repository.findProfileBySecurityUserId(token.securityUserId())
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        "账号注册信息不存在"));
        if (profile.emailVerified()) {
            throw new WebsiteAccountException(HttpStatus.CONFLICT, "该邮箱已完成注册，请直接登录");
        }

        securityUsers.resetPassword(profile.securityUserId(), request.password());
        securityUsers.enable(profile.securityUserId());
        repository.markEmailVerified(profile.securityUserId());

        User user = securityUsers.login(
                profile.email(),
                request.password(),
                httpRequest,
                httpResponse);
        repository.touchLastLogin(user.getId());
        rateLimiter.reset("register-code-email", profile.email());
        return toCurrentUser(user, profileWithVerifiedEmail(profile));
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

    private void issueRegistrationCode(Long userId, String email) {
        Duration ttl = properties.getRegistrationCodeTtl();
        DataIntegrityViolationException lastCollision = null;
        for (int attempt = 0; attempt < REGISTRATION_CODE_INSERT_ATTEMPTS; attempt++) {
            String code = tokenCodec.generateNumericCode(REGISTRATION_CODE_LENGTH);
            try {
                repository.replaceToken(
                        userId,
                        TokenPurpose.REGISTRATION_CODE,
                        registrationCodeHash(userId, code),
                        ttl);
                mailService.sendRegistrationCode(email, code, ttl);
                return;
            } catch (DataIntegrityViolationException collision) {
                lastCollision = collision;
            }
        }
        throw lastCollision == null
                ? new IllegalStateException("Unable to issue registration code")
                : lastCollision;
    }

    private String registrationCodeHash(Long userId, String code) {
        return tokenCodec.hash(userId + ":" + code);
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

    private Profile profileWithVerifiedEmail(Profile profile) {
        return new Profile(
                profile.id(),
                profile.securityUserId(),
                profile.email(),
                true);
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
