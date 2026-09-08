# Flyway migrations

Keep website schema changes in this directory using Flyway versioned migrations.

The website account model is intentionally small:

```text
website_user
website_session
```

`website_user` stores the website identity and BCrypt password hash. `website_session`
stores login sessions plus short-lived registration and password-reset tokens; only token
hashes are persisted.

`V2__simplify_website_auth.sql` is an intentional development-time reset from the earlier
Yak Security/RBAC-backed account model. It drops the old website account tables and any
legacy `yak_security_*` tables that were created in the website database before creating
the two website-owned account tables.

`V3__create_website_traffic_daily.sql` adds the separate `website_traffic_daily` analytics
table. It stores one aggregate row per day, visitor UUID and route pathname so PV can be
incremented atomically while UV remains derivable without storing raw IP addresses.
