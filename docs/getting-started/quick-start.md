# Quick Start

This page does not try to fill the screen with buttons and configuration options. It first connects the core Yak Ops workflow end to end. When you move into a specific module, you can then use the corresponding chapter for task-level details.

## A typical data flow

You can think of day-to-day work as the following path:

```text
Data source
  ↓
Batch sync / real-time sync
  ↓
Data development and transformation
  ↓
Data quality checks
  ↓
Quality results / run history / lineage
```

These steps are not isolated feature pages. Sync tasks answer **how data arrives**, development tasks answer **how data is produced or transformed**, quality checks answer **whether the result meets expectations**, and lineage answers **who will be affected by a change**.

## Confirm three things before you start

### Is the data source clear?

Confirm which system the data comes from, how frequently it changes, and whether the workload requires incremental or real-time processing. Different freshness requirements lead to different synchronization methods and runtime strategies.

### How do you determine whether the task succeeded?

Do not judge success only by whether a task finished running. Define acceptance criteria such as row counts, field completeness, business rules, and downstream usability as well.

### Where do you investigate when something goes wrong?

Start with the sequence **task → run history → result → upstream/downstream**. Future Yak Ops documentation will follow the same troubleshooting flow whenever possible instead of explaining controls on individual screens in isolation.

## Next step

For now, use this flow to build an overall mental model. Documentation for data integration, data development, data quality, data lineage, deployment, and other modules will be added as standalone entry points once the content is ready.
