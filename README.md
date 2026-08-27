# Yak Ops Website

Yak Ops Website is the public product website and the future authenticated developer entry for Yak Ops.

This repository is intentionally separated from the Yak Ops admin product. It reuses Yak Ops engineering conventions and design primitives without copying product-domain pages into the website.

## Repository layout

```text
yak-ops-website/
├── website-ui/       # React + Umi Max + Ant Design website
├── website-server/   # Spring Boot website API
├── docs/             # Git-managed documentation source
├── deploy/           # local Docker and Nginx deployment foundation
└── pom.xml            # backend reactor parent
```

## Stage boundaries

PR 1 only establishes the website foundation:

- frontend runtime, routing, theme tokens and Yak UI entry;
- Spring Boot / Yak Framework / MySQL / Flyway backend foundation;
- Git-based docs source boundary;
- local MySQL and Nginx deployment skeleton.

The following are deliberately deferred:

- **PR 2:** email registration, verification, login, session and password reset;
- **PR 3:** authenticated docs delivery and docs UI;
- **PR 4:** production marketing homepage and motion design.

`docs/` is not imported into the frontend bundle. Protected documentation will be delivered through the backend after authentication is implemented.

## Prerequisites

- Node.js 20+
- Java 21
- Maven 3.9+
- Docker / Docker Compose
- Yak Framework `1.0.0-SNAPSHOT` available to Maven locally (same baseline used by Yak Ops)

## Local development

Start MySQL:

```bash
docker compose -f deploy/docker/compose.yaml up -d
```

Start the backend:

```bash
mvn -pl website-server spring-boot:run
```

Start the frontend:

```bash
cd website-ui
npm install
npm run dev
```

The frontend proxies `/api/*` and `/actuator/*` to `http://localhost:8080` during local development.

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
