package io.yak.website.account;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import io.yak.website.account.entity.WebsiteSession;
import io.yak.website.account.entity.WebsiteUser;
import io.yak.website.account.mapper.WebsiteSessionMapper;
import io.yak.website.account.mapper.WebsiteUserMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class WebsiteSessionService {

    private static final int TOKEN_INSERT_ATTEMPTS = 3;

    private final WebsiteSessionMapper sessionMapper;
    private final WebsiteUserMapper userMapper;
    private final WebsiteTokenCodec tokenCodec;
    private final WebsiteAccountProperties properties;

    public WebsiteSessionService(
            WebsiteSessionMapper sessionMapper,
            WebsiteUserMapper userMapper,
            WebsiteTokenCodec tokenCodec,
            WebsiteAccountProperties properties) {
        this.sessionMapper = sessionMapper;
        this.userMapper = userMapper;
        this.tokenCodec = tokenCodec;
        this.properties = properties;
    }

    public String replaceToken(
            Long userId,
            WebsiteSessionType type,
            Duration ttl) {
        invalidateActiveType(userId, type);
        return insertGeneratedToken(userId, type, ttl);
    }

    public void replaceWithHash(
            Long userId,
            WebsiteSessionType type,
            String tokenHash,
            Duration ttl) {
        LocalDateTime now = LocalDateTime.now();
        invalidateActiveType(userId, type);

        WebsiteSession session = new WebsiteSession();
        session.setUserId(userId);
        session.setType(type.name());
        session.setTokenHash(tokenHash);
        session.setExpiresAt(now.plus(ttl));
        sessionMapper.insert(session);
    }

    public Optional<WebsiteSession> consumeToken(
            String rawToken,
            WebsiteSessionType type) {
        if (!StringUtils.hasText(rawToken)) {
            return Optional.empty();
        }
        return consumeByHash(null, tokenCodec.hash(rawToken), type);
    }

    public Optional<WebsiteSession> consumeHashedForUser(
            Long userId,
            String tokenHash,
            WebsiteSessionType type) {
        return consumeByHash(userId, tokenHash, type);
    }

    public void startLoginSession(
            Long userId,
            HttpServletResponse response) {
        String rawToken = insertGeneratedToken(
                userId,
                WebsiteSessionType.LOGIN,
                properties.getSessionTtl());
        writeSessionCookie(response, rawToken);
    }

    public Optional<WebsiteUser> currentUser(HttpServletRequest request) {
        String rawToken = readSessionCookie(request);
        if (!StringUtils.hasText(rawToken)) {
            return Optional.empty();
        }

        LocalDateTime now = LocalDateTime.now();
        WebsiteSession session = sessionMapper.selectOne(
                Wrappers.<WebsiteSession>lambdaQuery()
                        .eq(WebsiteSession::getType, WebsiteSessionType.LOGIN.name())
                        .eq(WebsiteSession::getTokenHash, tokenCodec.hash(rawToken))
                        .isNull(WebsiteSession::getUsedAt)
                        .gt(WebsiteSession::getExpiresAt, now));

        if (session == null) {
            return Optional.empty();
        }

        WebsiteUser user = userMapper.selectById(session.getUserId());
        if (user == null
                || !Boolean.TRUE.equals(user.getEmailVerified())
                || !StringUtils.hasText(user.getPasswordHash())) {
            consumeSession(session.getId(), now);
            return Optional.empty();
        }

        sessionMapper.update(
                null,
                Wrappers.<WebsiteSession>lambdaUpdate()
                        .eq(WebsiteSession::getId, session.getId())
                        .isNull(WebsiteSession::getUsedAt)
                        .set(
                                WebsiteSession::getExpiresAt,
                                now.plus(properties.getSessionTtl())));
        return Optional.of(user);
    }

    public void logout(
            HttpServletRequest request,
            HttpServletResponse response) {
        String rawToken = readSessionCookie(request);
        if (StringUtils.hasText(rawToken)) {
            LocalDateTime now = LocalDateTime.now();
            sessionMapper.update(
                    null,
                    Wrappers.<WebsiteSession>lambdaUpdate()
                            .eq(WebsiteSession::getType, WebsiteSessionType.LOGIN.name())
                            .eq(WebsiteSession::getTokenHash, tokenCodec.hash(rawToken))
                            .isNull(WebsiteSession::getUsedAt)
                            .set(WebsiteSession::getUsedAt, now));
        }
        clearSessionCookie(response);
    }

    public void invalidateLoginSessions(Long userId) {
        invalidateActiveType(userId, WebsiteSessionType.LOGIN);
    }

    private String insertGeneratedToken(
            Long userId,
            WebsiteSessionType type,
            Duration ttl) {
        DuplicateKeyException collision = null;
        for (int attempt = 0; attempt < TOKEN_INSERT_ATTEMPTS; attempt++) {
            String rawToken = tokenCodec.generate();
            WebsiteSession session = new WebsiteSession();
            session.setUserId(userId);
            session.setType(type.name());
            session.setTokenHash(tokenCodec.hash(rawToken));
            session.setExpiresAt(LocalDateTime.now().plus(ttl));
            try {
                sessionMapper.insert(session);
                return rawToken;
            } catch (DuplicateKeyException exception) {
                collision = exception;
            }
        }
        throw collision == null
                ? new IllegalStateException("Unable to create website session token")
                : collision;
    }

    private Optional<WebsiteSession> consumeByHash(
            Long userId,
            String tokenHash,
            WebsiteSessionType type) {
        LocalDateTime now = LocalDateTime.now();
        var query = Wrappers.<WebsiteSession>lambdaQuery()
                .eq(WebsiteSession::getType, type.name())
                .eq(WebsiteSession::getTokenHash, tokenHash)
                .isNull(WebsiteSession::getUsedAt)
                .gt(WebsiteSession::getExpiresAt, now);
        if (userId != null) {
            query.eq(WebsiteSession::getUserId, userId);
        }

        WebsiteSession session = sessionMapper.selectOne(query);
        if (session == null) {
            return Optional.empty();
        }
        return consumeSession(session.getId(), now)
                ? Optional.of(session)
                : Optional.empty();
    }

    private boolean consumeSession(Long sessionId, LocalDateTime now) {
        int updated = sessionMapper.update(
                null,
                Wrappers.<WebsiteSession>lambdaUpdate()
                        .eq(WebsiteSession::getId, sessionId)
                        .isNull(WebsiteSession::getUsedAt)
                        .gt(WebsiteSession::getExpiresAt, now)
                        .set(WebsiteSession::getUsedAt, now));
        return updated == 1;
    }

    private void invalidateActiveType(
            Long userId,
            WebsiteSessionType type) {
        sessionMapper.update(
                null,
                Wrappers.<WebsiteSession>lambdaUpdate()
                        .eq(WebsiteSession::getUserId, userId)
                        .eq(WebsiteSession::getType, type.name())
                        .isNull(WebsiteSession::getUsedAt)
                        .set(WebsiteSession::getUsedAt, LocalDateTime.now()));
    }

    private String readSessionCookie(HttpServletRequest request) {
        if (request == null || request.getCookies() == null) {
            return null;
        }
        for (Cookie cookie : request.getCookies()) {
            if (properties.getSessionCookieName().equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    private void writeSessionCookie(
            HttpServletResponse response,
            String token) {
        ResponseCookie cookie = ResponseCookie
                .from(properties.getSessionCookieName(), token)
                .httpOnly(true)
                .secure(properties.isSessionCookieSecure())
                .sameSite("Lax")
                .path("/")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private void clearSessionCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie
                .from(properties.getSessionCookieName(), "")
                .httpOnly(true)
                .secure(properties.isSessionCookieSecure())
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ZERO)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
