package io.yak.website.account;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "website.account")
public class WebsiteAccountProperties {

    private String publicBaseUrl = "http://localhost:8000";
    private Duration registrationCodeTtl = Duration.ofMinutes(10);
    private Duration registrationSetupTtl = Duration.ofMinutes(15);
    private Duration resetPasswordTtl = Duration.ofMinutes(30);
    private String mailFrom = "no-reply@yakops.local";

    public String getPublicBaseUrl() {
        return publicBaseUrl;
    }

    public void setPublicBaseUrl(String publicBaseUrl) {
        this.publicBaseUrl = publicBaseUrl;
    }

    public Duration getRegistrationCodeTtl() {
        return registrationCodeTtl;
    }

    public void setRegistrationCodeTtl(Duration registrationCodeTtl) {
        this.registrationCodeTtl = registrationCodeTtl;
    }

    public Duration getRegistrationSetupTtl() {
        return registrationSetupTtl;
    }

    public void setRegistrationSetupTtl(Duration registrationSetupTtl) {
        this.registrationSetupTtl = registrationSetupTtl;
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
