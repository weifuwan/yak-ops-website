# Connectors

Connect Yak Ops to databases for reads, writes, and change data capture. Choose a connector to review its prerequisites and configuration.

## Available database connectors

- [MySQL](/docs/connectors/database/mysql) — JDBC Source, JDBC Sink, and MySQL CDC.
- [PostgreSQL](/docs/connectors/database/postgresql) — JDBC Source and JDBC Sink.
- [Oracle](/docs/connectors/database/oracle) — JDBC Source and JDBC Sink.

## Choosing a connector

Use JDBC for batch reads and writes. Use MySQL CDC when you need ongoing MySQL binlog change capture; CDC support should not be inferred for other database connectors.

For end-to-end synchronization, see [Data Integration](/docs/products/data-integration).
