package io.yak.website.account;

import java.time.Duration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

public interface WebsiteMailService {

    void sendRegistrationCode(String email, String code, Duration validFor);

    void sendPasswordReset(String email, String resetUrl);
}

@Component
@ConditionalOnProperty(
        prefix = "website.mail",
        name = "mode",
        havingValue = "log",
        matchIfMissing = true)
class LoggingWebsiteMailService implements WebsiteMailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingWebsiteMailService.class);

    @Override
    public void sendRegistrationCode(String email, String code, Duration validFor) {
        LOGGER.info(
                "[DEV MAIL] Yak Ops registration code: recipient={}, code={}, validFor={}",
                email,
                code,
                validFor);
    }

    @Override
    public void sendPasswordReset(String email, String resetUrl) {
        LOGGER.info("[DEV MAIL] Reset Yak Ops password: recipient={}, url={}", email, resetUrl);
    }
}

@Component
@ConditionalOnProperty(prefix = "website.mail", name = "mode", havingValue = "smtp")
class SmtpWebsiteMailService implements WebsiteMailService {

    private final JavaMailSender mailSender;
    private final WebsiteAccountProperties properties;

    SmtpWebsiteMailService(
            JavaMailSender mailSender,
            WebsiteAccountProperties properties) {
        this.mailSender = mailSender;
        this.properties = properties;
    }

    @Override
    public void sendRegistrationCode(String email, String code, Duration validFor) {
        long minutes = Math.max(1L, validFor.toMinutes());
        send(
                email,
                "Your Yak Ops verification code",
                "Use this verification code to create your Yak Ops account:\n\n"
                        + code
                        + "\n\nThis code expires in "
                        + minutes
                        + " minutes. If you did not request this, ignore this email.");
    }

    @Override
    public void sendPasswordReset(String email, String resetUrl) {
        send(
                email,
                "Reset your Yak Ops password",
                "Use the link below to reset your Yak Ops password:\n\n"
                        + resetUrl
                        + "\n\nThis link expires in 30 minutes. If you did not request this, ignore this email.");
    }

    private void send(String email, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(properties.getMailFrom());
        message.setTo(email);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
