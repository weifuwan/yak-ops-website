# Deployment Foundation

PR 1 keeps deployment intentionally small:

- `docker/compose.yaml` starts the local MySQL dependency only;
- `nginx/default.conf` defines the future production boundary for SPA fallback and backend proxying.

A full application image / production compose stack is deferred until the UI and server packaging contracts are stable.
