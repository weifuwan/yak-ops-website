# Architecture

Yak Ops is designed as a data-operations control plane. Product workflows live in Yak Ops, while execution engines and infrastructure are integrated behind stable boundaries.

```text
┌─────────────────────────────┐
│          yak-ops-ui         │
│        React / Umi          │
└──────────────┬──────────────┘
               │ HTTP
               ▼
┌─────────────────────────────┐
│        yak-ops-boot         │
│       Spring Boot API       │
└──────────────┬──────────────┘
               │
      ┌────────┴────────┐
      ▼                 ▼
 Business domains   Security / RBAC
      │
      ▼
 Plugin / runtime contracts
      │
      ▼
 Databases / Link-up / Flink / storage
```

## Main layers

### UI

The web application provides the product experience for data integration, development, workflows, quality, data consumption, services, and administration.

### Business domains

Business modules own product concepts and lifecycle state, such as datasource definitions, synchronization tasks, workflows, datasets, lineage, and quality executions.

### Plugins and runtime integrations

External systems are kept behind plugin or runtime boundaries where possible. Current integrations include datasource plugins, storage plugins, task plugins, Link-up for offline synchronization, and Flink CDC for realtime synchronization.

### Security and project scope

Permissions answer what a user can do. Project scope answers where that action applies. Business data is gradually being aligned around the same project boundary.

## Design direction

The goal is not to expose every engine setting in the UI. Yak Ops should keep common workflows understandable and make infrastructure details visible only when they are useful.
