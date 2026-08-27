package io.yak.website.account;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "website.account")
public class WebsiteAccountProperties {

    private String publicBaseUrl = "http://localhost:8000";
    private Duration verificationTtl = Duration.ofHours(24);
    private Duration resetPasswordTtl = Duration.ofMinutes(30);
    private String mailFrom = "no-reply@yakops.local";

    public String getPublicBaseUrl() {
        return publicBaseUrl;
    }

    public void setPublicBaseUrl(String publicBaseUrl) {
        this.publicBaseUrl = publicBaseUrl;
    }

    public Duration getVerificationTtl() {
        return verificationTtl;
    }

    public void setVerificationTtl(Duration verificationTtl) {
        this.verificationTtl = verificationTtl;
    }

    public Duration getResetPasswordTtl() {
        return resetPasswordTtl;
    }

    public void setResetPasswordTtl(Duration resetPasswordTtl) {
        this.resetPasswordTtl = resetPasswordTtl;
    }

    public String getMailFrom() {
        return mailFrom;
    }

    public void setMailFrom(String mailFrom) {
        this.mailFrom = mailFrom;
    }
}
