package io.yak.website.account;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

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
}
