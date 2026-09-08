package io.yak.website.account.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class WebsiteTokenCodecTest {

    private final WebsiteTokenCodec codec = new WebsiteTokenCodec();

    @Test
    void generatedTokensAreRandomAndHashesAreStable() {
        String first = codec.generate();
        String second = codec.generate();

        assertNotEquals(first, second);
        assertEquals(codec.hash(first), codec.hash(first));
        assertEquals(64, codec.hash(first).length());
    }

    @Test
    void generatedNumericCodeHasRequestedLength() {
        String code = codec.generateNumericCode(6);

        assertEquals(6, code.length());
        assertTrue(code.matches("\\d{6}"));
    }
}
