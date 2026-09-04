package io.yak.website.account;

import io.yak.website.account.WebsiteAccountModels.Profile;
import io.yak.website.account.WebsiteAccountModels.TokenPurpose;
import io.yak.website.account.WebsiteAccountModels.TokenRecord;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class WebsiteAccountRepository {

    private final JdbcTemplate jdbcTemplate;

    public WebsiteAccountRepository(
            @Qualifier("websiteJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<Profile> findProfileByEmail(String email) {
        List<Profile> profiles = jdbcTemplate.query(
                """
                SELECT id, security_user_id, email, email_verified
                FROM website_user_profile
                WHERE email = ?
                """,
                (rs, rowNum) -> new Profile(
                        rs.getLong("id"),
                        rs.getLong("security_user_id"),
                        rs.getString("email"),
                        rs.getBoolean("email_verified")),
                email);
        return profiles.stream().findFirst();
    }

    public Optional<Profile> findProfileBySecurityUserId(Long securityUserId) {
        List<Profile> profiles = jdbcTemplate.query(
                """
                SELECT id, security_user_id, email, email_verified
                FROM website_user_profile
                WHERE security_user_id = ?
                """,
                (rs, rowNum) -> new Profile(
                        rs.getLong("id"),
                        rs.getLong("security_user_id"),
                        rs.getString("email"),
                        rs.getBoolean("email_verified")),
                securityUserId);
        return profiles.stream().findFirst();
    }

    public void insertProfile(
            Long securityUserId,
            String email,
            String source,
            String utmSource,
            String utmMedium,
            String utmCampaign) {
        jdbcTemplate.update(
                """
                INSERT INTO website_user_profile (
                    security_user_id, email, register_source,
                    utm_source, utm_medium, utm_campaign
                ) VALUES (?, ?, ?, ?, ?, ?)
                """,
                securityUserId,
                email,
                source,
                utmSource,
                utmMedium,
                utmCampaign);
    }

    public void markEmailVerified(Long securityUserId) {
        jdbcTemplate.update(
                """
                UPDATE website_user_profile
                SET email_verified = 1,
                    verified_at = COALESCE(verified_at, CURRENT_TIMESTAMP(3))
                WHERE security_user_id = ?
                """,
                securityUserId);
    }

    public void touchLastLogin(Long securityUserId) {
        jdbcTemplate.update(
                """
                UPDATE website_user_profile
                SET last_login_at = CURRENT_TIMESTAMP(3)
                WHERE security_user_id = ?
                """,
                securityUserId);
    }

    public void replaceToken(
            Long securityUserId,
            TokenPurpose purpose,
            String tokenHash,
            Duration ttl) {
        jdbcTemplate.update(
                """
                UPDATE website_account_token
                SET used_at = CURRENT_TIMESTAMP(3)
                WHERE security_user_id = ? AND purpose = ? AND used_at IS NULL
                """,
                securityUserId,
                purpose.name());
        jdbcTemplate.update(
                """
                INSERT INTO website_account_token (
                    security_user_id, purpose, token_hash, expires_at
                ) VALUES (?, ?, ?, TIMESTAMPADD(SECOND, ?, CURRENT_TIMESTAMP(3)))
                """,
                securityUserId,
                purpose.name(),
                tokenHash,
                Math.max(1L, ttl.toSeconds()));
    }

    public Optional<TokenRecord> consumeToken(
            String tokenHash,
            TokenPurpose purpose) {
        List<TokenRecord> tokens = jdbcTemplate.query(
                """
                SELECT id, security_user_id
                FROM website_account_token
                WHERE token_hash = ?
                  AND purpose = ?
                  AND used_at IS NULL
                  AND expires_at > CURRENT_TIMESTAMP(3)
                """,
                (rs, rowNum) -> new TokenRecord(
                        rs.getLong("id"),
                        rs.getLong("security_user_id")),
                tokenHash,
                purpose.name());
        return consume(tokens.stream().findFirst());
    }

    public Optional<TokenRecord> consumeTokenForUser(
            Long securityUserId,
            String tokenHash,
            TokenPurpose purpose) {
        List<TokenRecord> tokens = jdbcTemplate.query(
                """
                SELECT id, security_user_id
                FROM website_account_token
                WHERE security_user_id = ?
                  AND token_hash = ?
                  AND purpose = ?
                  AND used_at IS NULL
                  AND expires_at > CURRENT_TIMESTAMP(3)
                """,
                (rs, rowNum) -> new TokenRecord(
                        rs.getLong("id"),
                        rs.getLong("security_user_id")),
                securityUserId,
                tokenHash,
                purpose.name());
        return consume(tokens.stream().findFirst());
    }

    private Optional<TokenRecord> consume(Optional<TokenRecord> token) {
        if (token.isEmpty()) {
            return Optional.empty();
        }
        int updated = jdbcTemplate.update(
                """
                UPDATE website_account_token
                SET used_at = CURRENT_TIMESTAMP(3)
                WHERE id = ? AND used_at IS NULL AND expires_at > CURRENT_TIMESTAMP(3)
                """,
                token.get().id());
        return updated == 1 ? token : Optional.empty();
    }
}
