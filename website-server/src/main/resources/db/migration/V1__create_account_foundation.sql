CREATE TABLE website_user_profile (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    security_user_id BIGINT NOT NULL,
    email VARCHAR(128) NOT NULL,
    email_verified TINYINT(1) NOT NULL DEFAULT 0,
    register_source VARCHAR(64) NULL,
    utm_source VARCHAR(128) NULL,
    utm_medium VARCHAR(128) NULL,
    utm_campaign VARCHAR(256) NULL,
    verified_at DATETIME(3) NULL,
    last_login_at DATETIME(3) NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (id),
    UNIQUE KEY uk_website_user_profile_security_user (security_user_id),
    UNIQUE KEY uk_website_user_profile_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE website_account_token (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    security_user_id BIGINT NOT NULL,
    purpose VARCHAR(32) NOT NULL,
    token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    expires_at DATETIME(3) NOT NULL,
    used_at DATETIME(3) NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (id),
    UNIQUE KEY uk_website_account_token_hash (token_hash),
    KEY idx_website_account_token_user_purpose (security_user_id, purpose, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
