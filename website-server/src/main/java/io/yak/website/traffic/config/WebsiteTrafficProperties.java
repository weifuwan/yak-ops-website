package io.yak.website.traffic.config;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "website.traffic")
public class WebsiteTrafficProperties {

    private String visitorCookieName = "yakops_visitor";
    private Duration visitorCookieMaxAge = Duration.ofDays(365);
    private boolean visitorCookieSecure;

    public String getVisitorCookieName() {
        return visitorCookieName;
    }

    public void setVisitorCookieName(String visitorCookieName) {
        this.visitorCookieName = visitorCookieName;
    }

    public Duration getVisitorCookieMaxAge() {
        return visitorCookieMaxAge;
    }

    public void setVisitorCookieMaxAge(Duration visitorCookieMaxAge) {
        this.visitorCookieMaxAge = visitorCookieMaxAge;
    }

    public boolean isVisitorCookieSecure() {
        return visitorCookieSecure;
    }

    public void setVisitorCookieSecure(boolean visitorCookieSecure) {
        this.visitorCookieSecure = visitorCookieSecure;
    }
}
