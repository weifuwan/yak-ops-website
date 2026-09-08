package io.yak.website.account;

import static org.junit.jupiter.api.Assertions.fail;

import jakarta.mail.AuthenticationFailedException;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import java.util.Properties;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;

class AliyunSmtpAuthenticationTest {

    private static final String SMTP_HOST = "smtp.qiye.aliyun.com";
    private static final int SMTP_PORT = 465;
    private static final String DEFAULT_USERNAME = "noreply@yak-ops.com";

    @Test
    void shouldAuthenticateAliyunEnterpriseMail() throws Exception {
        String username = getOptionalEnv("SMTP_TEST_USERNAME", DEFAULT_USERNAME);
        String password = System.getenv("SMTP_TEST_PASSWORD");

        Assumptions.assumeTrue(
                password != null && !password.isBlank(),
                "Set SMTP_TEST_PASSWORD to run the Alibaba Cloud Enterprise Mail authentication test");

        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.connectiontimeout", "10000");
        properties.put("mail.smtp.timeout", "10000");

        Session session = Session.getInstance(properties);

        try (Transport transport = session.getTransport("smtp")) {
            System.out.println("====================================");
            System.out.println("SMTP host     = " + SMTP_HOST);
            System.out.println("SMTP port     = " + SMTP_PORT);
            System.out.println("SMTP username = " + username);
            System.out.println("Testing SMTP authentication...");
            System.out.println("====================================");

            transport.connect(SMTP_HOST, SMTP_PORT, username, password);

            System.out.println();
            System.out.println("SMTP Authentication SUCCESS");
            System.out.println("The supplied password can be used for Yak Ops SMTP delivery.");
        } catch (AuthenticationFailedException exception) {
            System.err.println();
            System.err.println("SMTP Authentication FAILED");
            System.err.println("The supplied password was rejected by Alibaba Cloud Enterprise Mail.");
            System.err.println("Server message: " + exception.getMessage());

            fail("SMTP authentication failed", exception);
        }
    }

    private String getOptionalEnv(String name, String defaultValue) {
        String value = System.getenv(name);
        return value == null || value.isBlank() ? defaultValue : value;
    }
}
