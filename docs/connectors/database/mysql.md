> **Tip:** Use JDBC for batch reads and writes. Use MySQL CDC when a data sync task needs to capture ongoing changes from the MySQL binlog.

## Overview

Yak Ops provides MySQL integration through JDBC and a dedicated MySQL CDC source.

- **JDBC Source** reads data from MySQL for batch synchronization.
- **JDBC Sink** writes synchronized data into MySQL.
- **MySQL CDC** captures existing table data and then continues reading change events from the binlog.

Choose the mode that matches the task. CDC is intended for ongoing change capture; it is not the same execution path as a one-time JDBC read.

## Requirements

- The Yak Ops runtime must be able to reach the MySQL host and port.
- The database account must have the privileges required for the selected read or write operation.
- For CDC, enable MySQL binary logging and configure row-based binlog events. Confirm that the account has the replication and table-read privileges required by your MySQL version and deployment.
- Confirm that the source tables and their schema are accessible to the account used by the task.

## Connection Configuration

1. Open Data Sources and create a MySQL connection.
2. Enter the host, port, database, credentials, and any applicable SSL or connection options.
3. Test the connection before saving it.
4. Select the saved connection when configuring a data synchronization task.

Keep credentials in the connection configuration rather than embedding them in task SQL or documentation examples.

## JDBC Source

Use JDBC Source when a task needs to read data from MySQL.

1. Choose the MySQL connection as the source.
2. Select the tables or source objects supported by the selected task configuration.
3. Configure the required column mapping and synchronization options.
4. Validate the configuration before running the task.

The exact available options depend on the selected task mode and the connector configuration exposed by your Yak Ops version.

## JDBC Sink

Use JDBC Sink when MySQL is the destination.

1. Choose the MySQL connection as the target.
2. Select or configure the destination tables.
3. Review field mapping and the supported write behavior for the task.
4. Validate the target schema and permissions before execution.

Source and sink capabilities are configured separately. A connection that can read a table does not necessarily have permission to write to it.

## MySQL CDC

The MySQL CDC source supports an initial snapshot followed by ongoing binlog change capture. This allows a task to establish an initial view of the source tables and then continue consuming changes.

Before starting CDC, verify that:

- Binary logging is enabled and row-based events are available.
- The account has the privileges required to read the snapshot and consume the binlog.
- Network access remains available to the MySQL server throughout the task.
- The selected startup and recovery settings match the intended synchronization behavior.

CDC state and recovery behavior depend on the runtime configuration and saved execution state. Use the options exposed by the current Yak Ops release rather than copying configuration fields from another CDC implementation.

## Limitations

- This page documents the MySQL JDBC and MySQL CDC integrations available in Yak Ops; it does not imply CDC support for every database connector.
- Available write modes, startup behavior, and source options depend on the task configuration and connector version.
- Validate the selected source, target, and synchronization mode together before using the task in production.

## Troubleshooting

### The connection test fails

Check the hostname, port, credentials, network route, firewall rules, and database permissions from the Yak Ops runtime environment.

### JDBC reads or writes fail

Verify that the account has the required table privileges and that the source or target schema matches the task mapping.

### CDC cannot start or stops consuming changes

Check binary logging, row-based event configuration, replication privileges, server reachability, and the task's startup or recovery settings. Review the task logs for the first database or runtime error before changing configuration.
