package io.yak.website.account;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Locale;
import org.springframework.stereotype.Component;

@Component
public class WebsiteTokenCodec {

    private static final int TOKEN_BYTES = 32;
    private final SecureRandom secureRandom = new SecureRandom();

    public String generate() {
        byte[] bytes = new byte[TOKEN_BYTES];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public String generateNumericCode(int length) {
        if (length < 1 || length > 9) {
            throw new IllegalArgumentException("numeric code length must be between 1 and 9");
        }
        int upperBound = 1;
        for (int index = 0; index < length; index++) {
            upperBound *= 10;
        }
        int value = secureRandom.nextInt(upperBound);
        return String.format(Locale.ROOT, "%0" + length + "d", value);
    }

    public String hash(String token) {
        if (token == null || token.isBlank()) {
            throw new WebsiteAccountException(
                    org.springframework.http.HttpStatus.BAD_REQUEST,
                    "链接无效或已过期");
        }
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(
                    digest.digest(token.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 is not available", exception);
        }
    }
}
