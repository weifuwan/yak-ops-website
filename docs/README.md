# Yak Ops Docs Source

This directory is the source of truth for Yak Ops public documentation. Git is the documentation CMS: every content change is reviewed through a pull request, while public delivery is owned by `website-server`.

## Public delivery contract

- `docs/` must never be imported by `website-ui` or copied into its public bundle.
- Maven copies this directory into the backend artifact at `docs/`.
- Only Markdown files declared in `navigation.json` are addressable through `/api/v1/docs/**`.
- A missing file, duplicate slug, unsafe slug or invalid `defaultSlug` fails backend startup.
- Documentation responses use `Cache-Control: no-store`.
- Raw HTML in Markdown is intentionally not rendered by the frontend.

## Current public scope

The public documentation is intentionally minimal for the current release and exposes one guide:

```text
docs/
├── navigation.json
└── deploy/
    └── docker-compose.md
```

The only published path is:

```text
Getting Started
└── Docker Compose
```

Additional documents should be added only when their content is ready and the navigation is intentionally expanded.

Keep slugs lowercase and stable. Prefer plain-text ATX headings (`#`, `##`, `###`) so table-of-contents anchors remain predictable. Use fenced code blocks with an explicit language when possible.

A new public document becomes visible only after both steps are complete:

1. add the Markdown file under `docs/`;
2. add its slug/title/description to `navigation.json`.

The navigation file is explicit rather than filesystem-derived. It defines ordering and acts as the server-side allowlist for published content.
