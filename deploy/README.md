# Deployment Foundation

The website deployment foundation stays intentionally small:

- `docker/compose.yaml` starts one local MySQL dependency;
- `nginx/nginx.conf` is mounted directly into the official `nginx:latest` container and defines the SPA fallback plus backend proxying;
- `nginx-java.md` documents the production-style runtime model: Nginx in Docker and the backend started with `java -jar`.

The website account model uses the same `yak_ops_website` database and does not require a separate Yak Security database.

## Alibaba Cloud Enterprise Mail

Production registration and password-reset mail can use `noreply@yak-ops.com` over Alibaba Cloud Enterprise Mail SMTP.

```env
WEBSITE_MAIL_MODE=smtp
WEBSITE_MAIL_FROM=noreply@yak-ops.com

MAIL_HOST=smtp.qiye.aliyun.com
MAIL_PORT=465
MAIL_USERNAME=noreply@yak-ops.com
MAIL_PASSWORD=<smtp-credential>
MAIL_SMTP_AUTH=true
MAIL_SSL=true
MAIL_STARTTLS=false
```

Port `465` uses implicit SSL rather than STARTTLS.

`MAIL_PASSWORD` is the credential accepted by Alibaba Cloud Enterprise Mail for SMTP. If third-party client security passwords are enabled for the mailbox, use that security password; otherwise the mailbox login password can be used. The administrator's third-party client access policy must also allow `noreply@yak-ops.com`.

Never commit the real SMTP credential. Supply it through the deployment environment or secret store.
