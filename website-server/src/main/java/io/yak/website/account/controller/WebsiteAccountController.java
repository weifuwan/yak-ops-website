package io.yak.website.account.controller;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import io.yak.website.account.config.WebsiteAccountProperties;
import io.yak.website.account.domain.WebsiteAccountException;
import io.yak.website.account.domain.WebsiteMailer;
import io.yak.website.account.domain.WebsiteRateLimiter;
import io.yak.website.account.domain.WebsiteSession;
import io.yak.website.account.domain.WebsiteSessionRegistry;
import io.yak.website.account.domain.WebsiteSessionType;
import io.yak.website.account.domain.WebsiteTokenCodec;
import io.yak.website.account.domain.WebsiteUser;
import io.yak.website.account.mapper.WebsiteUserMapper;
import io.yak.website.account.model.WebsiteAccountModels.CompleteRegistrationRequest;
import io.yak.website.account.model.WebsiteAccountModels.CurrentUserResponse;
import io.yak.website.account.model.WebsiteAccountModels.EmailRequest;
import io.yak.website.account.model.WebsiteAccountModels.LoginRequest;
import io.yak.website.account.model.WebsiteAccountModels.MessageResponse;
import io.yak.website.account.model.WebsiteAccountModels.RegistrationEmailRequest;
import io.yak.website.account.model.WebsiteAccountModels.RegistrationVerificationResponse;
import io.yak.website.account.model.WebsiteAccountModels.ResetPasswordRequest;
import io.yak.website.account.model.WebsiteAccountModels.VerifyRegistrationCodeRequest;
import io.yak.website.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Locale;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * HTTP entry and account workflow coordinator for the public website.
 *
 * <p>The website intentionally has no generic service layer. The controller owns the
 * request-level workflow and collaborates with small role-oriented components such as the
 * session registry, token codec, rate limiter and mailer.</p>
 */
@RestController
@RequestMapping("/api/v1/auth")
public class WebsiteAccountController {

    private static final int REGISTRATION_CODE_LENGTH = 6;
    private static final int REGISTRATION_CODE_INSERT_ATTEMPTS = 5;
    private static final MessageResponse REGISTRATION_CODE_SENT =
            new MessageResponse("验证码已发送，请检查邮箱");
    private static final MessageResponse GENERIC_RESET_RESPONSE =
            new MessageResponse("如果该邮箱已注册，我们已发送重置密码邮件");

    private final WebsiteUserMapper userMapper;
    private final WebsiteSessionRegistry sessions;
    private final WebsiteTokenCodec tokenCodec;
    private final WebsiteMailer mailer;
    private final WebsiteAccountProperties properties;
    private final WebsiteRateLimiter rateLimiter;
    private final PasswordEncoder passwordEncoder;

    public WebsiteAccountController(
            WebsiteUserMapper userMapper,
            WebsiteSessionRegistry sessions,
            WebsiteTokenCodec tokenCodec,
            WebsiteMailer mailer,
            WebsiteAccountProperties properties,
            WebsiteRateLimiter rateLimiter,
            PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.sessions = sessions;
        this.tokenCodec = tokenCodec;
        this.mailer = mailer;
        this.properties = properties;
        this.rateLimiter = rateLimiter;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register/request-code")
    @Transactional
    public ApiResponse<MessageResponse> requestRegistrationCode(
            @Valid @RequestBody RegistrationEmailRequest request,
            HttpServletRequest httpRequest) {
        String email = normalizeEmail(request.email());
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("register-code-ip", ip, 20);
        rateLimiter.check("register-code-email", email, 5);

        WebsiteUser user = findByEmail(email);
        if (user != null && Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new WebsiteAccountException(HttpStatus.CONFLICT, "该邮箱已注册，请直接登录");
        }
        if (user == null) {
            user = createPendingUser(email, request);
        }

        issueRegistrationCode(user.getId(), email);
        return ApiResponse.success(REGISTRATION_CODE_SENT);
    }

    @PostMapping("/register/verify-code")
    @Transactional
    public ApiResponse<RegistrationVerificationResponse> verifyRegistrationCode(
            @Valid @RequestBody VerifyRegistrationCodeRequest request,
            HttpServletRequest httpRequest) {
        String email = normalizeEmail(request.email());
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("register-verify-ip", ip, 50);
        rateLimiter.check("register-verify-email", email, 10);

        WebsiteUser user = findByEmail(email);
        if (user == null) {
            throw invalidRegistrationCode();
        }
        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new WebsiteAccountException(HttpStatus.CONFLICT, "该邮箱已完成注册，请直接登录");
        }

        String codeHash = registrationCodeHash(user.getId(), request.code());
        sessions.consumeHashedForUser(
                        user.getId(),
                        codeHash,
                        WebsiteSessionType.REGISTRATION_CODE)
                .orElseThrow(this::invalidRegistrationCode);

        rateLimiter.reset("register-verify-email", email);
        String setupToken = sessions.replaceToken(
                user.getId(),
                WebsiteSessionType.REGISTRATION_SETUP,
                properties.getRegistrationSetupTtl());
        return ApiResponse.success(new RegistrationVerificationResponse(
                setupToken,
                "邮箱验证成功，请设置密码"));
    }

    @PostMapping("/register/complete")
    @Transactional
    public ApiResponse<CurrentUserResponse> completeRegistration(
            @Valid @RequestBody CompleteRegistrationRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        rateLimiter.check("register-complete-ip", remoteAddress(httpRequest), 30);

        WebsiteSession setupSession = sessions.consumeToken(
                        request.setupToken(),
                        WebsiteSessionType.REGISTRATION_SETUP)
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        "注册会话无效或已过期，请重新验证邮箱"));

        WebsiteUser user = userMapper.selectById(setupSession.getUserId());
        if (user == null) {
            throw new WebsiteAccountException(HttpStatus.BAD_REQUEST, "账号注册信息不存在");
        }
        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new WebsiteAccountException(HttpStatus.CONFLICT, "该邮箱已完成注册，请直接登录");
        }

        LocalDateTime now = LocalDateTime.now();
        WebsiteUser update = new WebsiteUser();
        update.setId(user.getId());
        update.setPasswordHash(passwordEncoder.encode(request.password()));
        update.setDisplayName(defaultDisplayName(user.getEmail()));
        update.setEmailVerified(true);
        update.setVerifiedAt(now);
        update.setLastLoginAt(now);
        if (userMapper.updateById(update) != 1) {
            throw new WebsiteAccountException(HttpStatus.INTERNAL_SERVER_ERROR, "注册失败，请稍后重试");
        }

        sessions.startLoginSession(user.getId(), httpResponse);
        rateLimiter.reset("register-code-email", user.getEmail());
        return ApiResponse.success(toCurrentUser(requireUser(user.getId())));
    }

    @PostMapping("/login")
    @Transactional
    public ApiResponse<CurrentUserResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        String email = normalizeEmail(request.email());
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("login-ip", ip, 100);
        rateLimiter.check("login-email", email, 10);

        WebsiteUser user = findByEmail(email);
        if (user == null
                || !Boolean.TRUE.equals(user.getEmailVerified())
                || !StringUtils.hasText(user.getPasswordHash())
                || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new WebsiteAccountException(HttpStatus.UNAUTHORIZED, "邮箱或密码错误");
        }

        WebsiteUser update = new WebsiteUser();
        update.setId(user.getId());
        update.setLastLoginAt(LocalDateTime.now());
        userMapper.updateById(update);

        sessions.startLoginSession(user.getId(), httpResponse);
        rateLimiter.reset("login-email", email);
        return ApiResponse.success(toCurrentUser(requireUser(user.getId())));
    }

    @GetMapping("/current")
    public ApiResponse<CurrentUserResponse> current(HttpServletRequest request) {
        WebsiteUser user = sessions.currentUser(request)
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.UNAUTHORIZED,
                        "请先登录"));
        return ApiResponse.success(toCurrentUser(user));
    }

    @PostMapping("/logout")
    @Transactional
    public ApiResponse<MessageResponse> logout(
            HttpServletRequest request,
            HttpServletResponse response) {
        sessions.logout(request, response);
        return ApiResponse.success(new MessageResponse("已退出登录"));
    }

    @PostMapping("/forgot-password")
    @Transactional
    public ApiResponse<MessageResponse> forgotPassword(
            @Valid @RequestBody EmailRequest request,
            HttpServletRequest httpRequest) {
        String email = normalizeEmail(request.email());
        String ip = remoteAddress(httpRequest);
        rateLimiter.check("reset-ip", ip, 20);
        rateLimiter.check("reset-email", email, 3);

        WebsiteUser user = findByEmail(email);
        if (user != null
                && Boolean.TRUE.equals(user.getEmailVerified())
                && StringUtils.hasText(user.getPasswordHash())) {
            issueReset(user);
        }
        return ApiResponse.success(GENERIC_RESET_RESPONSE);
    }

    @PostMapping("/reset-password")
    @Transactional
    public ApiResponse<MessageResponse> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        WebsiteSession resetSession = sessions.consumeToken(
                        request.token(),
                        WebsiteSessionType.RESET_PASSWORD)
                .orElseThrow(() -> new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        "链接无效或已过期"));

        WebsiteUser user = userMapper.selectById(resetSession.getUserId());
        if (user == null || !Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new WebsiteAccountException(HttpStatus.BAD_REQUEST, "账号不可重置密码");
        }

        WebsiteUser update = new WebsiteUser();
        update.setId(user.getId());
        update.setPasswordHash(passwordEncoder.encode(request.password()));
        if (userMapper.updateById(update) != 1) {
            throw new WebsiteAccountException(HttpStatus.INTERNAL_SERVER_ERROR, "密码重置失败");
        }
        sessions.invalidateLoginSessions(user.getId());
        return ApiResponse.success(new MessageResponse("密码已重置，请使用新密码登录"));
    }

    private WebsiteUser createPendingUser(
            String email,
            RegistrationEmailRequest request) {
        WebsiteUser user = new WebsiteUser();
        user.setEmail(email);
        user.setEmailVerified(false);
        user.setRegisterSource(defaultText(request.source(), "website"));
        user.setUtmSource(trimToNull(request.utmSource()));
        user.setUtmMedium(trimToNull(request.utmMedium()));
        user.setUtmCampaign(trimToNull(request.utmCampaign()));

        try {
            userMapper.insert(user);
            return user;
        } catch (DuplicateKeyException exception) {
            WebsiteUser raced = findByEmail(email);
            if (raced == null) {
                throw exception;
            }
            if (Boolean.TRUE.equals(raced.getEmailVerified())) {
                throw new WebsiteAccountException(HttpStatus.CONFLICT, "该邮箱已注册，请直接登录");
            }
            return raced;
        }
    }

    private void issueRegistrationCode(Long userId, String email) {
        Duration ttl = properties.getRegistrationCodeTtl();
        DuplicateKeyException lastCollision = null;

        for (int attempt = 0; attempt < REGISTRATION_CODE_INSERT_ATTEMPTS; attempt++) {
            String code = tokenCodec.generateNumericCode(REGISTRATION_CODE_LENGTH);
            try {
                sessions.replaceWithHash(
                        userId,
                        WebsiteSessionType.REGISTRATION_CODE,
                        registrationCodeHash(userId, code),
                        ttl);
                mailer.sendRegistrationCode(email, code, ttl);
                return;
            } catch (DuplicateKeyException collision) {
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

    private void issueReset(WebsiteUser user) {
        String rawToken = sessions.replaceToken(
                user.getId(),
                WebsiteSessionType.RESET_PASSWORD,
                properties.getResetPasswordTtl());
        String link = UriComponentsBuilder.fromUriString(properties.getPublicBaseUrl())
                .pathSegment("reset-password")
                .queryParam("token", rawToken)
                .build()
                .encode()
                .toUriString();
        mailer.sendPasswordReset(user.getEmail(), link);
    }

    private WebsiteUser findByEmail(String email) {
        return userMapper.selectOne(
                Wrappers.<WebsiteUser>lambdaQuery()
                        .eq(WebsiteUser::getEmail, email));
    }

    private WebsiteUser requireUser(Long userId) {
        WebsiteUser user = userMapper.selectById(userId);
        if (user == null) {
            throw new WebsiteAccountException(HttpStatus.UNAUTHORIZED, "当前账号不存在");
        }
        return user;
    }

    private CurrentUserResponse toCurrentUser(WebsiteUser user) {
        String displayName = StringUtils.hasText(user.getDisplayName())
                ? user.getDisplayName()
                : defaultDisplayName(user.getEmail());
        return new CurrentUserResponse(
                user.getId(),
                user.getEmail(),
                displayName,
                Boolean.TRUE.equals(user.getEmailVerified()));
    }

    private WebsiteAccountException invalidRegistrationCode() {
        return new WebsiteAccountException(HttpStatus.BAD_REQUEST, "验证码无效或已过期");
    }

    private String defaultDisplayName(String email) {
        int separator = email.indexOf('@');
        String local = separator > 0 ? email.substring(0, separator) : "Yak Ops User";
        return local.length() <= 64 ? local : local.substring(0, 64);
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
