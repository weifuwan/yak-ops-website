# Yak Ops Website

Yak Ops Website is the public product website and authenticated developer entry for Yak Ops.

This repository is intentionally separated from the Yak Ops admin product. It reuses Yak Ops engineering conventions and design primitives without bringing the admin product's RBAC/domain model or `yak-framework` runtime dependencies into the website.

## Repository layout

```text
yak-ops-website/
├── website-ui/       # React + Umi Max + Ant Design website
├── website-server/   # Spring Boot website API and protected docs delivery
├── docs/             # Git-managed documentation source
├── deploy/           # local Docker and Nginx deployment foundation
└── pom.xml            # backend reactor parent
```

## Marketing homepage

The public page uses the existing Yak Ops warm background, dark ink and `#fe2c55` brand accent. Brand red is intentionally sparse and limited to primary actions, active flow states and quality highlights.

Protected Docs links pass through the website account boundary and return to the requested document after login.

## Account architecture

The website deliberately owns a small authentication model instead of depending on Yak Security or the full Yak Ops RBAC schema.

```text
email registration
      ↓
website_user
      ↓
email verification / password setup
      ↓
website_session
      ↓
HttpOnly session cookie
```

The account database has only two business tables:

```text
website_user
website_session
```

`website_user` stores email, BCrypt password hash, verification state and lightweight registration metadata.

`website_session` stores hashed login session tokens and short-lived `REGISTRATION_CODE`, `REGISTRATION_SETUP` and `RESET_PASSWORD` tokens. Raw tokens are never persisted.

The browser session cookie is `HttpOnly`, `SameSite=Lax` and session-scoped. Local HTTP development leaves `Secure` disabled; HTTPS production must set `WEBSITE_SESSION_COOKIE_SECURE=true`.

The account code follows a role-oriented package layout instead of a generic service layer:

```text
account/
├── controller/   # HTTP entry and request-level workflow coordination
├── config/       # Spring configuration and account properties
├── model/        # API request/response models
├── domain/       # website_user/session plus focused roles such as session registry, mailer and token codec
└── mapper/       # MyBatis Plus persistence boundary
```

`WebsiteAccountController` is the application entry for registration, login and password recovery. It coordinates small role components directly; there is no `WebsiteAccountService` or `WebsiteSessionService` layer.

The backend uses Spring Boot + MyBatis Plus directly. API responses use the website-owned `{ code, message, data }` envelope, so the backend no longer needs `yak-framework`, Yak Security, Sa-Token or the admin product's department/role/permission/menu/project/resource tables.

## Protected docs architecture

`docs/` is the only documentation content source. It is never imported into `website-ui` or copied into the public frontend bundle.

```text
Git-reviewed docs/
      ↓ Maven resources
backend protected-docs/ classpath
      ↓ startup-validated navigation allowlist
website_session
      ↓ verified website_user
/api/v1/docs/**
      ↓
React Markdown docs experience
```

`docs/navigation.json` controls ordering and acts as the addressable-content allowlist. Missing documents, duplicate/unsafe slugs and an invalid default document fail backend startup.

Protected docs APIs:

```text
GET /api/v1/docs/navigation
GET /api/v1/docs/content?slug=getting-started/overview
GET /api/v1/docs/search?q=质量
```

## Prerequisites

- Node.js 20+
- Java 21
- Maven 3.9+
- Docker / Docker Compose

## Local development

Start the single local database dependency:

```bash
docker compose -f deploy/docker/compose.yaml up -d
```

Start the backend:

```bash
mvn -pl website-server spring-boot:run
```

For local mail testing, set `WEBSITE_MAIL_MODE=log`. Production can use Alibaba Cloud Enterprise Mail through the `MAIL_*` settings documented in `.env.example`.

Start the frontend:

```bash
cd website-ui
npm install
npm run dev
```

The frontend proxies `/api/*` and `/actuator/*` to the backend during local development.

## Account routes

```text
/register
/verify-email
/login
/forgot-password
/reset-password
```

The account API is under `/api/v1/auth`. `/current`, `/logout` and `/api/v1/docs/**` require a valid website session.

## Schema reset note

`V2__simplify_website_auth.sql` intentionally removes the earlier Yak Security/RBAC-backed account tables. This project is still in development, so existing development website accounts are reset by that migration rather than carrying forward unnecessary RBAC data.

After migration the website database should contain only the Flyway history table and the two website account tables:

```text
flyway_schema_history
website_user
website_session
```

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
