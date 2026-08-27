# Yak Ops Docs Source

This directory is the source of truth for Yak Ops product documentation.

The website will treat Git as the documentation CMS: documentation changes are reviewed through pull requests, while authenticated delivery is implemented by `website-server` in a later stage.

## Planned structure

```text
docs/
├── getting-started/
├── data-integration/
├── data-development/
├── data-quality/
├── lineage/
└── deployment/
```

PR 1 intentionally does not add product documentation or expose these files through the frontend bundle.
