# Yak Ops Website Frontend Standard

The website follows the same ownership model as `yak-ops-ui`, while keeping marketing and docs concerns isolated from the admin product.

Core rule: **app owns product/page behavior, service owns backend communication, infrastructure stays at the Web Root, and shared visual primitives belong to Yak UI.**

## Structure

```text
website-ui/
├── apps/
│   └── web/
│       ├── app/
│       ├── service/
│       ├── utils/
│       ├── themes/
│       ├── types/
│       ├── hooks/
│       ├── context/
│       ├── config/
│       ├── constants/
│       ├── assets/
│       ├── public/
│       ├── main.tsx
│       └── vite.config.ts
├── packages/
│   └── yak-ui/
├── package.json
└── tsconfig.json
```

Do not create empty role directories. Code stays with its owner until a real cross-page need appears.

## Ownership

- `apps/web/app/<domain>`: page UI, local state, local components and presentation.
- `apps/web/app/layout`: shared website shell.
- `apps/web/app/router`: route composition and route-level behaviors.
- `apps/web/service/<domain>`: backend API and backend contract.
- `apps/web/service/http`: HTTP transport.
- `apps/web/utils`: business-agnostic helpers.
- `apps/web/themes`: global theme and CSS foundation.
- `apps/web/config`: stable navigation/runtime configuration.
- `apps/web/assets`: bundled assets.
- `apps/web/public`: raw static assets.
- `packages/yak-ui`: reusable UI primitives without page business meaning.

## Dependency Rule

Keep the dependency direction:

```text
app → service → http
```

App may also depend on Web Root infrastructure and `@yak-ops-website/yak-ui`.

Service must not import `app/**`.

## Components

Use a Yak UI primitive when one exists.

Website-only presentation belongs in the owning page/layout. Product business components from `yak-ops-ui` are not copied into this repository.

Marketing product previews are illustrative presentation components, not duplicated admin business components.

Ant Design remains the current underlying UI system. Replacing AntD is a separate change and must not be mixed into ordinary page work.

## Services

All HTTP access belongs under `apps/web/service`.

Pages, components and hooks do not create a second HTTP Client.

Public marketing pages remain backend-independent unless there is a real public-data requirement.

## Styling

Prefer this order:

```text
Yak UI -> design token / Tailwind utility -> owning stylesheet -> dynamic inline style
```

Tailwind Preflight remains disabled. `apps/web/themes/global.less` owns global element resets and typography.

Prefer Yak theme utilities mapped in `tailwind.config.js` over repeated hard-coded brand values when a token already exists.

Marketing pages may use lower-density editorial layouts than the Yak Ops admin product while preserving the same interaction quality.

## Must Not

- Recreate `website-ui/src`.
- Recreate `src/pages`, `src/layouts`, `src/services` or `src/components`.
- Put backend request code directly in `app/**`.
- Create a second HTTP transport.
- Copy YakButton / YakTab into page domains.
- Introduce Redux / Zustand for local page state without a demonstrated cross-page need.
- Mix tooling replacement, AntD removal or visual redesign into a directory-only architecture change.

## Quality Gate

```bash
npm run lint
npm run build
```

The deterministic architecture enforcement script is handled in the tooling alignment PR.
