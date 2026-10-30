# Data Integration

Data Integration covers data sources, batch synchronization, and real-time synchronization.

## Data Sources

Register and test database connections before configuring a task. Browse the [connector reference](/docs/connectors/overview) for currently documented sources and sinks.

## Batch Sync

Batch synchronization reads from a source and writes to a destination. Available options depend on the selected connectors and task configuration.

## Real-time Sync

Real-time synchronization processes ongoing changes. For MySQL, the CDC source can combine an initial snapshot with subsequent binlog change capture.

See [MySQL CDC](/docs/connectors/database/mysql) for requirements and configuration details.

## Preparing a task

1. Validate source and destination connections.
2. Confirm table permissions and schemas.
3. Review field mappings and connector-specific options.
4. Choose startup and recovery settings for the task.

Use the options offered by your deployed Yak Ops version.
