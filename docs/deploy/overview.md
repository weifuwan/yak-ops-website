# Deployment Guide

Yak Ops can be evaluated locally with Docker Compose and can also be connected to infrastructure you already manage.

For a first deployment, start with Docker Compose. It keeps the initial setup small and makes it easy to verify that the frontend, backend, and database can work together.

## Recommended path

1. Clone the Yak Ops repository.
2. Copy `.env.example` to `.env`.
3. Replace the example datasource master key.
4. Pull the configured images.
5. Start the Compose stack.
6. Open Yak Ops in the browser and sign in with the bootstrap account.

```bash
git clone https://github.com/weifuwan/yak-ops.git
cd yak-ops
cp .env.example .env
docker compose pull
docker compose up -d
```

The default local address is:

```text
http://localhost:9001
```

## Before using it outside local evaluation

Review at least these settings:

- MySQL passwords
- `YAK_OPS_DATASOURCE_MASTER_KEY`
- Bootstrap account credentials
- Network exposure and reverse-proxy settings
- Runtime dependencies such as Link-up or Flink when those features are enabled

## Existing MySQL

If you already operate MySQL, use `.env.without-mysql.example` with `compose.without-mysql.yaml` instead of starting the bundled database.

## Next step

For container details and common commands, continue with **Docker Compose**.
