# Yak Ops Docs Source

This directory is the source of truth for Yak Ops product documentation. Git is the documentation CMS: every content change is reviewed through a pull request, while authenticated delivery is owned by `website-server`.

## Protected delivery contract

- `docs/` must never be imported by `website-ui` or copied into its public bundle.
- Maven copies this directory into the backend artifact at `protected-docs/`.
- Only Markdown files declared in `navigation.json` are addressable through `/api/v1/docs/**`.
- A missing file, duplicate slug, unsafe slug or invalid `defaultSlug` fails backend startup.
- Documentation responses use `Cache-Control: no-store` so protected content is not retained by shared caches.
- Raw HTML in Markdown is intentionally not rendered by the frontend.

## Current authoring scope

The first documentation pass intentionally keeps only the getting-started section. Additional top-level sections should be added together with reviewed content instead of publishing empty navigation placeholders.

```text
docs/
├── navigation.json
└── getting-started/
    ├── overview.md
    └── quick-start.md
```

Keep slugs lowercase and stable. Prefer plain-text ATX headings (`#`, `##`, `###`) so table-of-contents anchors remain predictable. Use fenced code blocks with an explicit language when possible.

New documents become visible only after both steps are complete:

1. add the Markdown file under `docs/`;
2. add its slug/title/description to `navigation.json`.

The navigation file is deliberately explicit rather than filesystem-derived. It defines ordering and also acts as the server-side allowlist for protected content.
