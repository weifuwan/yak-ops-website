CREATE TABLE website_traffic_daily (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    stat_date DATE NOT NULL,
    visitor_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    path VARCHAR(255) NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    pv_count INT UNSIGNED NOT NULL DEFAULT 1,
    first_seen_at DATETIME(3) NOT NULL,
    last_seen_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_website_traffic_daily_visitor_path (stat_date, visitor_id, path),
    KEY idx_website_traffic_daily_date_path (stat_date, path),
    KEY idx_website_traffic_daily_date_visitor (stat_date, visitor_id),
    KEY idx_website_traffic_daily_user_date (user_id, stat_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
