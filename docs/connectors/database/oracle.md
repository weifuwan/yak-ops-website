> **Tip:** Use the Oracle JDBC integration for batch reads and writes. This page describes JDBC connectivity, not a native Oracle CDC source.

## Overview

Yak Ops supports Oracle through JDBC integration.

- **JDBC Source** reads data from Oracle for batch synchronization.
- **JDBC Sink** writes synchronized data into Oracle.

Choose Oracle as the source or target in the data synchronization task that needs the connection.

## Requirements

- The Yak Ops runtime must be able to reach the Oracle listener and configured port.
- The configured account must have the privileges required for the selected read or write operation.
- Confirm the service name or SID and any required connection settings with the database administrator.
- Configure SSL or other network options when required by the target environment.

## Connection Configuration

1. Open Data Sources and create an Oracle connection.
2. Enter the host, port, service name or SID as required by the configured connection type, and the credentials.
3. Add any required connection options.
4. Test the connection before saving it.
5. Select the saved connection in the source or target configuration of a data synchronization task.

Keep credentials in the connection configuration rather than embedding them in task SQL or descriptions.

## JDBC Source

Use JDBC Source when a task needs to read data from Oracle.

1. Choose the Oracle connection as the source.
2. Select the tables or source objects supported by the task configuration.
3. Configure the required column mapping and synchronization options.
4. Validate the configuration before running the task.

The exact options depend on the task mode and the connector configuration exposed by your Yak Ops version.

## JDBC Sink

Use JDBC Sink when Oracle is the destination.

1. Choose the Oracle connection as the target.
2. Select or configure the destination tables.
3. Review field mapping and the supported write behavior for the task.
4. Confirm that the configured account can write to the target schema and tables.

Source and sink capabilities are configured separately. A connection that can read a table does not necessarily have permission to write to it.

## Limitations

- This page documents Oracle JDBC integration. Do not infer native Oracle CDC support from the availability of JDBC Source and Sink.
- Available write modes and synchronization options depend on the task configuration and connector version.
- Validate the selected source, target, and synchronization mode together before production use.

## Troubleshooting

### The connection test fails

Check the hostname, listener port, service name or SID, credentials, network route, and any required SSL settings.

### A table cannot be read or written

Verify the current schema, object privileges, table names, and the task's field mapping.

### The task fails during execution

Review the task logs for the first database error, then check listener connectivity, account privileges, schema compatibility, and the selected JDBC options.
