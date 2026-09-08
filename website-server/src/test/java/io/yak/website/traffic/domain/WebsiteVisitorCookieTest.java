package io.yak.website.traffic.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import io.yak.website.traffic.config.WebsiteTrafficProperties;
import jakarta.servlet.http.Cookie;
import java.time.Duration;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

class WebsiteVisitorCookieTest {

    @Test
    void createsAndReusesVisitorCookie() {
        WebsiteTrafficProperties properties = new WebsiteTrafficProperties();
        properties.setVisitorCookieName("yakops_visitor");
        properties.setVisitorCookieMaxAge(Duration.ofDays(365));

        WebsiteVisitorCookie visitorCookie = new WebsiteVisitorCookie(properties);
        MockHttpServletRequest firstRequest = new MockHttpServletRequest();
        MockHttpServletResponse firstResponse = new MockHttpServletResponse();

        String visitorId = visitorCookie.resolve(firstRequest, firstResponse);

        assertEquals(visitorId, UUID.fromString(visitorId).toString());
        String setCookie = firstResponse.getHeader("Set-Cookie");
        assertNotNull(setCookie);
        assertTrue(setCookie.contains("yakops_visitor=" + visitorId));
        assertTrue(setCookie.contains("HttpOnly"));
        assertTrue(setCookie.contains("SameSite=Lax"));

        MockHttpServletRequest returningRequest = new MockHttpServletRequest();
        returningRequest.setCookies(new Cookie("yakops_visitor", visitorId));
        MockHttpServletResponse returningResponse = new MockHttpServletResponse();

        assertEquals(visitorId, visitorCookie.resolve(returningRequest, returningResponse));
        assertNull(returningResponse.getHeader("Set-Cookie"));
    }
}
