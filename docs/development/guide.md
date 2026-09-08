# Development Guide

Yak Ops is a Java and React project. This page only covers the minimum setup needed to work on the codebase.

## Requirements

- JDK 21
- Node.js 20+
- Yarn Classic
- Maven, or the included Maven Wrapper
- MySQL 8.0 for a local runtime

## Repository layout

```text
yak-ops
├── yak-ops-common
├── yak-ops-spi
├── yak-ops-core
├── yak-ops-business
├── yak-ops-plugins
├── yak-ops-boot
├── yak-ops-ui
└── yak-ops-dist
```

The backend is organized around business domains and plugin contracts. The frontend lives in `yak-ops-ui`.

## Build the frontend

```bash
cd yak-ops-ui
yarn install
yarn build
```

## Build the backend

From the repository root:

```bash
./mvnw clean package -DskipTests
```

On Windows:

```cmd
mvnw.cmd clean package -DskipTests
```

The assembled distribution is generated under `yak-ops-dist/target/`.

## Development principle

Keep product concepts in Yak Ops and keep execution details behind integrations or plugin contracts. A datasource, workflow, quality task, or API should not depend on one specific runtime engine unless that dependency is part of the feature itself.

For frontend changes, follow `yak-ops-ui/FRONTEND_CODE_STYLE.md`. For Java changes, follow `CODE_STYLE.md`.
