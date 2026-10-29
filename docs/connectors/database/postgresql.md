> **Tip:** Use the PostgreSQL JDBC integration for batch reads and writes. This page describes JDBC connectivity, not a native PostgreSQL CDC source.

## Overview

Yak Ops supports PostgreSQL through JDBC integration.

- **JDBC Source** reads data from PostgreSQL for batch synchronization.
- **JDBC Sink** writes synchronized data into PostgreSQL.

Use the connection as a source or target according to the data synchronization task you are configuring.

## Requirements

- The Yak Ops runtime must be able to reach the PostgreSQL host and port.
- The database and schema must exist and be accessible to the configured account.
- The account must have the privileges required for the selected read or write operation.
- If the server requires SSL or other connection settings, configure them to match the target environment.

## Connection Configuration

1. Open Data Sources and create a PostgreSQL connection.
2. Enter the host, port, database, credentials, and any applicable SSL or connection options.
3. Test the connection before saving it.
4. Select the saved connection in the source or target configuration of a data synchronization task.

Keep credentials in the connection configuration rather than placing them in SQL snippets or task descriptions.

## JDBC Source

Use JDBC Source when a task needs to read data from PostgreSQL.

1. Choose the PostgreSQL connection as the source.
2. Select the tables or source objects supported by the task configuration.
3. Configure the required column mapping and synchronization options.
4. Validate the configuration before running the task.

The exact options depend on the task mode and the connector configuration exposed by your Yak Ops version.

## JDBC Sink

Use JDBC Sink when PostgreSQL is the destination.

1. Choose the PostgreSQL connection as the target.
2. Select or configure the destination tables.
3. Review field mapping and the supported write behavior for the task.
4. Confirm that the configured account can write to the target schema and tables.

Source and sink capabilities are configured separately. Verify the permissions required by the direction in which the connection will be used.

## Limitations

- This page documents PostgreSQL JDBC integration. Do not infer native PostgreSQL CDC support from the availability of JDBC Source and Sink.
- Available write modes and synchronization options depend on the task configuration and connector version.
- Validate the selected source, target, and synchronization mode together before production use.

## Troubleshooting

### The connection test fails

Check the hostname, port, credentials, network route, server access rules, and SSL settings from the Yak Ops runtime environment.

### A table cannot be read or written

Verify database and schema permissions, the selected schema, table names, and the task's field mapping.

### The task fails during execution

Review the task logs for the first database error, then check connectivity, account privileges, schema compatibility, and the selected JDBC options.
