# Yak Ops Website — Frontend Mandatory Rules

Scope: **all work under `website-ui/`**, including AI-generated changes and human PRs. These are **MUST** rules, not style suggestions. Read `FRONTEND_CODE_STYLE.md` for the full architecture contract.

## Tailwind CSS First (mandatory)

1. **New and modified page/layout UI MUST use Tailwind CSS 4 utility classes** for layout, spacing, colors, typography, borders, responsive breakpoints, hover/focus/active states, and transitions. Prefer existing Yak UI components and tokens (`bg-yak-page`, `text-yak-text`, etc.) before arbitrary values.
2. **DO NOT create component/page-local stylesheets under `apps/web/app/**`.** This includes `.css`, CSS Modules, `.scss`, `.sass`, `.less`, `.styl`, and `.pcss`. Do not introduce CSS-in-JS or `@apply` to recreate ordinary page styles.
3. **DO NOT move page-specific CSS rules to `themes/global.css` or `themes/tailwind.css` to bypass the rule.** Those files own only global typography/reset, design tokens, shared foundations and CSS features that cannot reasonably be expressed by Tailwind utilities (e.g. custom `@font-face` / `@keyframes`).
4. Stylesheets under `packages/yak-ui` are allowed only for genuine reusable primitive internals that Tailwind cannot represent cleanly. Keep them scoped and explain why an exception is necessary.
5. **Static inline `style={{ ... }}` is forbidden in new page UI.** Inline styles are an exception only for truly runtime-computed values that Tailwind cannot express; add a short comment explaining the need. Never generate Tailwind class names dynamically via string interpolation (e.g. `bg-${color}`)—use complete, statically discoverable classes.
6. Respect `prefers-reduced-motion`, accessible focus states, keyboard navigation, and mobile layouts. Do not add redundant explanatory UI copy as a side effect of visual refactoring.

## Enforcement

- `npm run architecture:check` **fails when page-local stylesheets or stylesheet imports are introduced under `apps/web/app`**.
- PR CI runs format, lint, TypeScript, architecture and Vite build. **A failed gate blocks acceptance; do not bypass or weaken the check.**
- For any justified exception, keep it in the owning shared theme / Yak UI foundation, document the reason in code, and review it explicitly in the PR.
