# Supported Connectors

Yak Ops uses Link-up as the execution engine for batch/offline data synchronization. The matrix below follows the datasource profiles currently registered by Yak Ops, so it reflects the systems available when creating offline sync jobs.

> Runtime availability still depends on the Link-up worker version and connector packages deployed with your Yak Ops installation.

## JDBC database profiles

These systems use the shared JDBC connector with database-specific datasource plugins, drivers, and dialect handling in Yak Ops.

| System | Source | Sink |
| --- | :---: | :---: |
| MySQL | ✓ | ✓ |
| TiDB | ✓ | ✓ |
| GoldenDB | ✓ | ✓ |
| GBase 8c | ✓ | ✓ |
| GBase 8a | ✓ | ✓ |
| GBase 8s | ✓ | ✓ |
| SAP HANA | ✓ | ✓ |
| Oracle | ✓ | ✓ |
| PostgreSQL | ✓ | ✓ |
| IBM Db2 | ✓ | ✓ |
| openGauss | ✓ | ✓ |
| SQL Server | ✓ | ✓ |
| OceanBase | ✓ | ✓ |
| YashanDB | ✓ | ✓ |
| HighGo | ✓ | ✓ |
| InterSystems IRIS | ✓ | ✓ |
| XuguDB | ✓ | ✓ |
| DuckDB | ✓ | ✓ |
| KingbaseES | ✓ | ✓ |
| Dameng (达梦) | ✓ | ✓ |

## Native connector profiles

These systems use dedicated Link-up connectors rather than the shared JDBC connector.

| System | Source | Sink |
| --- | :---: | :---: |
| Doris | ✓ | ✓ |
| StarRocks | ✓ | ✓ |
| ClickHouse | ✓ | ✓ |
| Elasticsearch 7 | ✓ | ✓ |
| Elasticsearch 8 | ✓ | ✓ |
| MongoDB | ✓ | ✓ |

A check mark means Yak Ops currently registers that system for the corresponding role in batch/offline synchronization.

## Notes

- This page documents Yak Ops datasource profiles, not every connector that may exist in the Link-up engine.
- HTTP is therefore no longer listed in this matrix because it is not currently exposed as a Yak Ops offline-sync datasource profile.
- The connector profile metadata exposed by a running Yak Ops/Link-up deployment is the final source of truth for runtime availability.
