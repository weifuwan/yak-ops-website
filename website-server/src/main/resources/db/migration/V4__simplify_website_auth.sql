-- Yak Ops Website only needs a small account model.
-- This migration intentionally removes the previous Yak Security/RBAC tables
-- and replaces the website profile/token split with two website-owned tables.
-- Existing development accounts are reset by this migration.

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS website_account_token;
DROP TABLE IF EXISTS website_user_profile;

DROP TABLE IF EXISTS yak_security_user_role;
DROP TABLE IF EXISTS yak_security_user_resource;
DROP TABLE IF EXISTS yak_security_user_project;
DROP TABLE IF EXISTS yak_security_user_dept;
DROP TABLE IF EXISTS yak_security_role_permission;
DROP TABLE IF EXISTS yak_security_role_project;
DROP TABLE IF EXISTS yak_security_role_menu;
DROP TABLE IF EXISTS yak_security_user;
DROP TABLE IF EXISTS yak_security_role;
DROP TABLE IF EXISTS yak_security_resource_type;
DROP TABLE IF EXISTS yak_security_project;
DROP TABLE IF EXISTS yak_security_permission;
DROP TABLE IF EXISTS yak_security_oplog_extra;
DROP TABLE IF EXISTS yak_security_oplog;
DROP TABLE IF EXISTS yak_security_message;
DROP TABLE IF EXISTS yak_security_menu;
DROP TABLE IF EXISTS yak_security_dept;
DROP TABLE IF EXISTS yak_security_config;

SET FOREIGN_KEY_CHECKS = 1;

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
