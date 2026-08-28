# Yak Ops Website

Yak Ops Website is the public product website and authenticated developer entry for Yak Ops.

This repository is intentionally separated from the Yak Ops admin product. It reuses Yak Ops engineering conventions and design primitives without copying product-domain pages into the website.

## Repository layout

```text
yak-ops-website/
├── website-ui/       # React + Umi Max + Ant Design website
├── website-server/   # Spring Boot website API, account facade and protected docs delivery
├── docs/             # Git-managed documentation source
├── deploy/           # local Docker and Nginx deployment foundation
└── pom.xml            # backend reactor parent
```

## Roadmap foundation

- **PR 1 — Website Foundation:** frontend/backend/deploy skeleton and Git-managed docs boundary.
- **PR 2 — Account Foundation:** email registration, verification, login session, password reset and mail adapter.
- **PR 3 — Protected Docs:** authenticated docs delivery, Markdown renderer, navigation, TOC and search.
- **PR 4 — Marketing Homepage:** Claude-inspired editorial product story, responsive product previews and restrained motion.

PR 1–4 establish the first complete website loop: public discovery → email account → verified session → protected documentation.

## Marketing homepage

The homepage borrows the information hierarchy and editorial restraint of modern product websites without copying another product's skin. Yak Ops keeps its own data-engineering visual language:

```text
Hero
  ↓
MySQL → Link-Up → Doris product flow
  ↓
Connect → Move → Build → Govern → Deliver
  ↓
Data Integration / Quality / Lineage / Service previews
  ↓
Account / Docs / GitHub conversion paths
```

The public page uses the existing Yak Ops warm background, dark ink and `#fe2c55` brand accent. Brand red is intentionally sparse and limited to primary actions, active flow states and quality highlights. The marketing page uses Framer Motion for restrained entrance motion and honors `prefers-reduced-motion`.

The homepage does not make anonymous backend calls. Protected Docs links still pass through the PR 3 access boundary and return to the requested document after login.

## Account architecture

Website accounts use email as the public login identifier while Yak Security remains the credential and session authority.

```text
email registration
      ↓
website account profile + hashed one-time token
      ↓
Yak Security user (internal web_* username)
      ↓
email verification activates the security account
      ↓
Sa-Token session / HttpOnly cookie
```

The website business schema (`yak_ops_website`) and Yak Security schema (`yak_ops_website_security`) remain separate so their Flyway histories cannot collide. Production may host both schemas on the same MySQL service. The local Compose file uses two MySQL containers on ports `3306` and `3307` so a fresh checkout needs no privileged schema-bootstrap step and existing PR 1 data volumes remain compatible.

Verification and reset tokens are stored only as SHA-256 hashes. Registration and password-reset discovery responses are deliberately generic to reduce account enumeration. Login attempt protection is provided by Yak Security; registration, resend, login-facade and reset-mail actions also have a small in-memory rate guard for the single-instance website phase.

The Sa-Token browser session is explicitly configured as `HttpOnly` and `SameSite=Lax`. It is a session cookie rather than a persistent cookie. Local HTTP development leaves `Secure` disabled; any HTTPS production deployment must set `SA_TOKEN_COOKIE_SECURE=true`. Production Nginx also emits `Referrer-Policy: no-referrer` so reset/verification tokens in URLs are not forwarded as referrers.

## Protected docs architecture

`docs/` is the only documentation content source. It is never imported into `website-ui` or copied into the public frontend bundle.

```text
Git-reviewed docs/
      ↓ Maven resources
backend protected-docs/ classpath
      ↓ startup-validated navigation allowlist
Yak Security session
      ↓ verified website profile guard
/api/v1/docs/**
      ↓
React Markdown docs experience
```

`docs/navigation.json` controls ordering and acts as the addressable-content allowlist. Missing documents, duplicate/unsafe slugs and an invalid default document fail backend startup. The API never turns a user-supplied slug into a filesystem path; it only looks up documents that were loaded into the validated catalog.

Docs access requires both a valid Yak Security login and a verified row in `website_user_profile`. Responses use `Cache-Control: no-store`. Search runs on the backend catalog, so protected Markdown is not shipped to anonymous clients as a prebuilt search index. Raw HTML inside Markdown is not rendered.

Protected docs APIs:

```text
GET /api/v1/docs/navigation
GET /api/v1/docs/content?slug=getting-started/overview
GET /api/v1/docs/search?q=质量
```

Frontend route:

```text
/docs
/docs/<slug>
```

Anonymous visits to `/docs` are redirected to `/login?returnTo=...`; after authentication the user returns to the requested document.

## Prerequisites

- Node.js 20+
- Java 21
- Maven 3.9+
- Docker / Docker Compose
- Yak Framework `1.0.0-SNAPSHOT` available to Maven locally (same baseline used by Yak Ops)

## Local development

Start both local database dependencies:

```bash
docker compose -f deploy/docker/compose.yaml up -d
```

Start the backend:

```bash
mvn -pl website-server spring-boot:run
```

By default `WEBSITE_MAIL_MODE=log`, so verification/reset links are written to the backend development log instead of sending real email. For SMTP delivery set `WEBSITE_MAIL_MODE=smtp` and configure the `MAIL_*` / `WEBSITE_MAIL_FROM` variables from `.env.example`.

Start the frontend:

```bash
cd website-ui
npm install
npm run dev
```

The frontend proxies `/api/*` and `/actuator/*` to `http://localhost:8080` during local development. Production Nginx exposes only `/api/*`; Actuator remains internal.

## Account routes

```text
/register
/verify-email
/login
/forgot-password
/reset-password
```

The account API is under `/api/v1/auth`. `/current` and `/logout` require a valid Yak Security session.

## Quality checks

Frontend:

```bash
cd website-ui
npm run lint
npm run build
```

Backend:

```bash
mvn -pl website-server test
```

## Design-system rule

The website inherits Yak Ops brand tokens and Yak Components while keeping a separate, lower-density marketing presentation. Shared product UI primitives belong under `website-ui/src/components/ui`; website page-specific presentation remains with its page or layout.
