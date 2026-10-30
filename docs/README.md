# Yak Ops Docs Source

This directory is the source of truth for public Yak Ops documentation. Git is the documentation CMS; public delivery is owned by `website-server`.

## Public delivery contract

- `docs/` must not be bundled into `website-ui`.
- Maven packages the directory into the backend artifact at `docs/`.
- Only Markdown files registered in `navigation.json` are accessible via `/api/v1/docs/**`.
- Missing documents, duplicate or unsafe slugs, and invalid defaults fail backend startup.
- Documentation responses use `Cache-Control: no-store`; raw HTML in Markdown is not rendered.

## Information architecture

The nine top-level sections are Home, Release 2.0, Get Started, Connectors, Products, Yak Ops AI, How-to Guides, Admin, and Developers.

The top navigation switches documentation modules. Each desktop and mobile sidebar displays only the section containing the active document; Connectors details use their own nested sidebar. The catalog stays global for document lookup and search, while previous/next links never cross module boundaries.

Release 2.0 is a dedicated frontend page. Products groups Data Integration, Data Development, and Data Governance. The Yak Ops AI overview describes planned 2.0 areas, not shipped features.

## Publishing

1. Add a Markdown document beneath `docs/`.
2. Register its slug, title, and description in `navigation.json`.
3. Update related links and tests.

Keep slugs lowercase and stable. Prefer ATX headings and fenced code blocks with explicit languages. Do not link to missing documentation or imply that planned capabilities are released.
