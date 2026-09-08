# Deployment Foundation

PR 1 keeps deployment intentionally small:

- `docker/compose.yaml` starts the local MySQL dependency only;
- `nginx/default.conf` defines the future production boundary for SPA fallback and backend proxying.

A full application image / production compose stack is deferred until the UI and server packaging contracts are stable.

## Alibaba Cloud Enterprise Mail

Production registration and password-reset mail can use the Alibaba Cloud Enterprise Mail account `noreply@yak-ops.com` over SMTP.

Use the following environment variables in the deployment environment:

```env
WEBSITE_MAIL_MODE=smtp
WEBSITE_MAIL_FROM=noreply@yak-ops.com

MAIL_HOST=smtp.qiye.aliyun.com
MAIL_PORT=465
MAIL_USERNAME=noreply@yak-ops.com
MAIL_PASSWORD=<third-party-client-security-password>
MAIL_SMTP_AUTH=true
MAIL_SSL=true
MAIL_STARTTLS=false
```

The application uses implicit SSL on port `465`; this is different from STARTTLS, so `MAIL_SSL` must be enabled while `MAIL_STARTTLS` remains disabled.

Before enabling SMTP delivery, make sure the `noreply@yak-ops.com` mailbox has SMTP access enabled in Alibaba Cloud Enterprise Mail. Generate a **third-party client security password** for this mailbox and use that value as `MAIL_PASSWORD` instead of the mailbox web-login password. If the organization has a third-party client access policy, allow this mailbox through that policy as well.

Never commit the real password. `.env` and `.env.*` files are ignored by Git except for `.env.example`; keep the actual credential in the deployment environment or secret store and leave `MAIL_PASSWORD` empty in committed examples.
