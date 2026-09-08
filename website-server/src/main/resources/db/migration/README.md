# Flyway migrations

Keep website schema changes in this directory using Flyway versioned migrations.

The website is still pre-deployment, so the current database starts from a single baseline migration:

```text
V1__create_account_foundation.sql
```

V1 creates the complete initial website schema:

```text
website_user
website_session
website_traffic_daily
```

`website_user` stores the website identity and BCrypt password hash. `website_session`
stores login sessions plus short-lived registration and password-reset tokens; only token
hashes are persisted.

`website_traffic_daily` stores one aggregate row per day, visitor UUID and route pathname.
Repeated visits atomically increment `pv_count`, allowing PV and UV to be derived without
storing raw IP addresses or user-agent strings.

Create a new Flyway version only after this V1 baseline has been used by a deployed or shared database.
