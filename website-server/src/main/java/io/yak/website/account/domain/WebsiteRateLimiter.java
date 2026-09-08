package io.yak.website.account.domain;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

/** In-memory abuse guard for the low-volume public website account endpoints. */
@Component
public class WebsiteRateLimiter {

    private final Cache<String, AtomicInteger> counters = Caffeine.newBuilder()
            .expireAfterWrite(Duration.ofMinutes(10))
            .maximumSize(20_000)
            .build();

    public void check(String scope, String identity, int maximumAttempts) {
        String key = key(scope, identity);
        AtomicInteger counter = counters.asMap()
                .computeIfAbsent(key, ignored -> new AtomicInteger());
        if (counter.incrementAndGet() > maximumAttempts) {
            throw new WebsiteAccountException(
                    HttpStatus.TOO_MANY_REQUESTS,
                    "操作过于频繁，请稍后再试");
        }
    }

    public void reset(String scope, String identity) {
        counters.invalidate(key(scope, identity));
    }

    private String key(String scope, String identity) {
        return scope + ':' + identity;
    }
}
