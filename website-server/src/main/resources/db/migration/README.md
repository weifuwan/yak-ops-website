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

`V4__simplify_website_auth.sql` is an intentional development-time reset from the earlier
Yak Security/RBAC-backed account model. It drops the old website account tables and
`yak_security_*` tables before creating the two website-owned tables.
