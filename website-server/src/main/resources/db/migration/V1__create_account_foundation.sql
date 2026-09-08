-- Initial Yak Ops Website schema.
-- Keep the public website intentionally small: account, session and daily traffic only.

CREATE TABLE website_user (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(128) NOT NULL,
    password_hash VARCHAR(255) NULL,
    display_name VARCHAR(64) NULL,
    email_verified TINYINT(1) NOT NULL DEFAULT 0,
    register_source VARCHAR(64) NULL,
    utm_source VARCHAR(128) NULL,
    utm_medium VARCHAR(128) NULL,
    utm_campaign VARCHAR(256) NULL,
    verified_at DATETIME(3) NULL,
    last_login_at DATETIME(3) NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
        ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (id),
    UNIQUE KEY uk_website_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE website_session (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    type VARCHAR(32) NOT NULL,
    token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    expires_at DATETIME(3) NOT NULL,
    used_at DATETIME(3) NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (id),
    UNIQUE KEY uk_website_session_token_hash (token_hash),
    KEY idx_website_session_user_type (user_id, type, expires_at),
    CONSTRAINT fk_website_session_user
        FOREIGN KEY (user_id) REFERENCES website_user (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE website_traffic_daily (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    stat_date DATE NOT NULL,
    visitor_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    path VARCHAR(255) NOT NULL,
    pv_count INT UNSIGNED NOT NULL DEFAULT 1,
    first_seen_at DATETIME(3) NOT NULL,
    last_seen_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_website_traffic_daily_visitor_path (stat_date, visitor_id, path),
    KEY idx_website_traffic_daily_date_path (stat_date, path),
    KEY idx_website_traffic_daily_date_visitor (stat_date, visitor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
