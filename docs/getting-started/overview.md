# Yak Ops Overview

Yak Ops is built for data engineering and data governance. It brings data ingestion, development, quality, lineage, and operations into one coherent workflow. The documentation site requires authentication, while the source remains in Git so documentation can be reviewed, rolled back, and evolved alongside the code.

## What to learn first

The first documentation pass intentionally keeps only two essential entry points:

- **Yak Ops Overview**: understand the product positioning, capability boundaries, and documentation structure.
- **Quick Start**: build a complete mental model of how data moves through Yak Ops from ingestion to usable results.

Dedicated chapters for individual modules will be added only when the content is ready, rather than publishing empty navigation placeholders in advance.

> The documentation describes product boundaries and how to think about using Yak Ops. Implementation details that are still changing quickly are not frozen early just to make the documentation look complete.

## Recommended reading order

If you are new to Yak Ops, read this overview first and then continue to **Quick Start**. These two pages are enough to establish the first layer of understanding. Future module documentation will extend the same structure.

## How the documentation stays trustworthy

The documentation is not generated dynamically from a database, and the frontend does not maintain a second copy. `docs/` is the single source of truth, while `navigation.json` explicitly defines the navigation order. The content is packaged only with the backend artifact and delivered through an authentication-protected API.
