package io.yak.website.account;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

public interface WebsiteMailService {

    void sendVerification(String email, String verificationUrl);

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
    public void sendVerification(String email, String verificationUrl) {
        LOGGER.info("[DEV MAIL] Verify Yak Ops account: recipient={}, url={}", email, verificationUrl);
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
    public void sendVerification(String email, String verificationUrl) {
        send(
                email,
                "Verify your Yak Ops account",
                "Welcome to Yak Ops. Verify your email to activate your account:\n\n"
                        + verificationUrl
                        + "\n\nThis link expires in 24 hours.");
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
