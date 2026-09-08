# Configuration Reference

Yak Ops uses Spring Boot configuration and environment variables. For Docker Compose, most common settings are exposed through `.env`.

This page lists the settings that are most useful during initial deployment and development.

## Application and database

| Variable | Purpose |
| --- | --- |
| `YAK_OPS_PORT` | Browser-facing port used by the default Compose stack. |
| `YAK_DATABASE_URL` | Yak Ops business database JDBC URL. |
| `YAK_DATABASE_USERNAME` | Business database username. |
| `YAK_DATABASE_PASSWORD` | Business database password. |
| `YAK_DATASOURCE_URL` | Shortcut datasource URL shared by Yak Ops and Yak Security when separate values are not configured. |

## Bootstrap account

| Variable | Purpose |
| --- | --- |
| `YAK_SECURITY_BOOTSTRAP_USERNAME` | Initial administrator username. |
| `YAK_SECURITY_BOOTSTRAP_PASSWORD` | Initial administrator password. |

Change the example password before exposing Yak Ops outside a local environment.

## Datasource security

| Variable | Purpose |
| --- | --- |
| `YAK_OPS_DATASOURCE_MASTER_KEY` | Encrypts datasource passwords stored by Yak Ops. |
| `YAK_DATASOURCE_CONNECT_TIMEOUT_SECONDS` | Datasource connection-test timeout. |

Use a new random master key for every non-local deployment and keep it stable after datasource credentials have been stored.

## Offline synchronization

| Variable | Purpose | Default |
| --- | --- | --- |
| `YAK_OFFLINE_SYNC_ENABLED` | Enables offline synchronization. | `true` |
| `YAK_LINK_UP_ENABLED` | Enables the Link-up execution integration. | `true` |
| `YAK_LINK_UP_BASE_URL` | Link-up service address. | `http://127.0.0.1:18080` |
| `YAK_LINK_UP_CONNECT_TIMEOUT` | Link-up connection timeout. | `10s` |
| `YAK_LINK_UP_REQUEST_TIMEOUT` | Link-up request timeout. | `30s` |

## Realtime synchronization

| Variable | Purpose | Default |
| --- | --- | --- |
| `YAK_REALTIME_SYNC_ENABLED` | Enables realtime synchronization. | `true` |
| `YAK_FLINK_REST_URL` | Flink REST endpoint. | `http://127.0.0.1:8081` |
| `YAK_FLINK_HOME` | Flink installation directory. | `/opt/flink` |
| `YAK_FLINK_CDC_HOME` | Flink CDC installation directory. | `/opt/flink-cdc` |

## Resource storage

Yak Ops resources can use local filesystem, MinIO, or HDFS storage. The primary selector is:

```text
YAK_RESOURCE_STORAGE_TYPE
```

Typical values are `LOCAL`, `MINIO`, and `HDFS`.

## Where to look next

`.env.example` documents the default Compose values. `yak-ops-boot/src/main/resources/application.yml` is the source of truth for backend defaults and optional settings.
