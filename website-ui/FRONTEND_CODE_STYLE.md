# Yak Ops Website Frontend Standard

The website inherits the engineering rules of `yak-ops-ui`, but keeps marketing, account and docs concerns isolated from the admin product.

Core rule: **pages compose, components render, hooks own state/behaviour, services own backend communication, and Yak Components own shared visual language.**

## Structure

```text
src/
├── assets/                     # global website assets
├── components/
│   ├── ui/                     # Yak Design System primitives
│   └── shared/                 # stable cross-feature components
├── layouts/                    # Marketing / Auth / Docs shells
├── pages/
│   └── <module>/
│       ├── index.tsx
│       ├── components/
│       ├── hooks/
│       ├── constants.ts
│       ├── types.ts
│       └── assets/
├── services/                   # backend API boundaries only
├── styles/                     # brand tokens and global theme
└── global.less
```

Do not create empty role directories. Code stays with its owning module until reuse is proven.

## Components

Use a Yak Component when one exists. Ant Design remains the underlying UI system, but pages should not create a second button/tab/input visual language beside Yak Components.

Website-only presentation belongs in page/layout components; product business components from `yak-ops-ui` are not copied into this repository.

Marketing product previews are illustrative presentation components, not duplicated admin business components. Keep them under the owning marketing page until reuse is proven.

## Services

All HTTP access belongs under `src/services`. Pages, components and hooks do not hard-code API URLs or call `fetch` / `request` directly.

Account/auth and protected Docs already have dedicated service boundaries. Public marketing pages should remain backend-independent unless a real public-data requirement appears; do not add anonymous API calls only to make the homepage feel dynamic.

## Styling

Prefer this order:

```text
Yak Component -> design token -> module class -> dynamic inline style
```

Marketing pages may use lower-density editorial layouts than the Yak Ops admin product, while preserving the same brand color, typography family, interaction quality and component primitives.

Use brand red as an accent rather than a surface. Motion should clarify entry, flow or state and must respect `prefers-reduced-motion`.

## Quality gate

```bash
npm run lint
npm run build
```

New code must pass Biome and TypeScript before merge.
