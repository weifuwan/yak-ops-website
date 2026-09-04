# Docker Compose

Deploy Yak Ops with Docker Compose and bring the platform up with a single command.

This guide focuses on the deployment workflow. The Dockerfiles, Compose definitions, and image build details are maintained in the `yak-ops` repository and are intentionally not duplicated in the documentation site.

## Prerequisites

Before you begin, make sure you have:

- Docker Engine installed and running
- Docker Compose v2 available through `docker compose`
- Access to the `yak-ops` repository
- Permission to expose the ports required by your deployment
- Enough CPU, memory, and disk space for the services defined by the Compose bundle

## Get Yak Ops

Clone the Yak Ops repository and enter the project directory:

```bash
git clone https://github.com/weifuwan/yak-ops.git
cd yak-ops
```

The `yak-ops` repository is responsible for shipping the Docker Compose bundle, Dockerfiles, and any startup scripts required by the deployment.

## Configure the deployment

Use the runtime configuration template provided by the `yak-ops` repository and fill in the values required for your environment.

Review at least:

- Exposed ports
- Database and service credentials
- Hostnames or external service addresses
- Persistent storage locations
- Environment-specific runtime options

Keep deployment-specific values outside the documentation site so the same guide works across development, test, and production environments.

## Start Yak Ops

From the directory that contains the Compose file, start the complete stack with:

```bash
docker compose up -d
```

This is the recommended one-command deployment path. Docker Compose starts the services in the dependency order defined by the bundle and keeps them running in the background.

## Verify the deployment

Check the service state:

```bash
docker compose ps
```

All required services should reach their expected running or healthy state before you open Yak Ops in the browser.

If a service does not start correctly, inspect the logs before changing configuration:

```bash
docker compose logs -f
```

## Common operations

### Follow logs

```bash
docker compose logs -f
```

### Restart services

```bash
docker compose restart
```

### Stop Yak Ops

```bash
docker compose down
```

Stopping the stack does not need to remove persistent volumes.

## Upgrade

Pull the latest Yak Ops source and recreate the stack:

```bash
git pull
docker compose up -d --build
```

The Compose bundle remains the source of truth for which services need to be rebuilt or restarted.

## Persistent data

Persistent data should be stored in the volumes or mounted directories declared by the Compose bundle.

Avoid running the following command during a normal restart or upgrade unless you intentionally want to delete persisted data:

```bash
docker compose down -v
```

## Where the deployment files live

The documentation site only explains how to operate the deployment. The actual `compose.yaml`, Dockerfiles, environment templates, and startup scripts belong in the `yak-ops` repository so deployment code stays versioned together with the application.
