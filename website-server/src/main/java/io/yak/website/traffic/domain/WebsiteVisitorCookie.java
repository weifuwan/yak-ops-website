package io.yak.website.traffic.domain;

import io.yak.website.traffic.config.WebsiteTrafficProperties;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.UUID;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

/** Owns the anonymous visitor identifier used for daily UV counting. */
@Component
public class WebsiteVisitorCookie {

    private final WebsiteTrafficProperties properties;

    public WebsiteVisitorCookie(WebsiteTrafficProperties properties) {
        this.properties = properties;
    }

    public String resolve(
            HttpServletRequest request,
            HttpServletResponse response) {
        String current = read(request);
        if (isValidVisitorId(current)) {
            return current;
        }

        String visitorId = UUID.randomUUID().toString();
        ResponseCookie cookie = ResponseCookie
                .from(properties.getVisitorCookieName(), visitorId)
                .httpOnly(true)
                .secure(properties.isVisitorCookieSecure())
                .sameSite("Lax")
                .path("/")
                .maxAge(properties.getVisitorCookieMaxAge())
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return visitorId;
    }

    private String read(HttpServletRequest request) {
        if (request == null || request.getCookies() == null) {
            return null;
        }
        for (Cookie cookie : request.getCookies()) {
            if (properties.getVisitorCookieName().equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    private boolean isValidVisitorId(String value) {
        if (value == null || value.isBlank()) {
            return false;
        }
        try {
            return UUID.fromString(value).toString().equalsIgnoreCase(value);
        } catch (IllegalArgumentException exception) {
            return false;
        }
    }
}
