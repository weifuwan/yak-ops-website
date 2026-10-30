-- Personal Docs search history. Records are only associated with authenticated website users.
CREATE TABLE website_docs_search_history (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    history_key VARCHAR(255) NOT NULL,
    search_query VARCHAR(80) NOT NULL DEFAULT '',
    document_slug VARCHAR(255) NULL,
    anchor VARCHAR(128) NULL,
    created_at DATETIME(3) NOT NULL,
    updated_at DATETIME(3) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_docs_history_user_key (user_id, history_key),
    KEY idx_docs_history_user_recent (user_id, updated_at),
    KEY idx_docs_history_expiration (updated_at),
    CONSTRAINT fk_docs_history_user
        FOREIGN KEY (user_id) REFERENCES website_user (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
