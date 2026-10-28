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

Base UI is the headless interaction foundation owned by `packages/yak-ui`. App and page code consume Yak UI only; direct `@base-ui/react`, `antd`, `@ant-design/icons` and `antd-style` imports are forbidden.

## Services

All HTTP access belongs under `apps/web/service`.

Pages, components and hooks do not create a second HTTP Client.

Public marketing pages remain backend-independent unless there is a real public-data requirement.

## Styling — Tailwind First (Mandatory)

**强制规则：页面与 Layout 的新增或重构样式必须优先使用 Tailwind CSS 4。**

- 复用顺序：**Yak UI → Tailwind 主题 token → Tailwind utility → 必要的共享底层 CSS**。
- 常规布局、间距、字号、颜色、边框、阴影、响应式、hover / focus / disabled / motion 状态，直接使用 JSX 中的 Tailwind class；禁止另写 page-specific selector。
- `apps/web/app/**` **严禁新增局部 CSS / CSS Modules / Sass / Less / Stylus / PostCSS 样式文件，也禁止从 app 页面导入这些样式文件**；不要通过 CSS-in-JS、`@apply` 或全局 CSS 转移页面样式。
- Tailwind 4 的 `@theme inline` / `bg-yak-*` 等稳定 token 优先于重复的硬编码颜色。只在没有可复用 token 时使用 arbitrary values，并保持 class 完整、可静态扫描（禁止 `bg-${color}` 一类的动态拼接）。
- 仅 `apps/web/themes/` 维护全局 reset、字体、token、浏览器层面不可用 utility 表达的共享特性（如 `@font-face` / `@keyframes`）；`packages/yak-ui` 可维护基础组件确需的局部底层样式。**禁止把页面样式移到上述位置规避检查**；新增例外需代码注释说明原因。
- JSX 新增静态 `style={{ ... }}` 禁止。必须动态计算且无法以 Tailwind 表达的运行时值才可用 inline style，需说明原因。
- Tailwind Preflight 保持禁用，`apps/web/themes/global.css` 只维护全局元素基础；保留响应式、键盘交互、focus 可见性和 `prefers-reduced-motion` 支持。

### Physical Enforcement

`npm run architecture:check` 会扫描整个 `apps/web/app`，发现局部样式文件或 app 中的样式导入就失败；CI 不能绕过该 gate。AI 生成代码同样必须遵守 `website-ui/AGENTS.md`。

不得为了通过检查修改或弱化 gate；确需例外时，在主题 / Yak UI 的合法 ownership 下实现，并在 PR 中说明理由。

## Must Not

- Recreate `website-ui/src`.
- Recreate `src/pages`, `src/layouts`, `src/services` or `src/components`.
- Put backend request code directly in `app/**`.
- Create a second HTTP transport.
- Copy YakButton / YakTab into page domains.
- Introduce Redux / Zustand for local page state without a demonstrated cross-page need.
- Reintroduce AntD or bypass Yak UI by importing Base UI directly from App / page code.

## Tooling

Frontend tooling owner:

```text
Vite 6
Tailwind CSS 4 + @tailwindcss/vite
TypeScript 5.9
Oxlint
Oxfmt
Node architecture check
```

Do not reintroduce Umi, Biome, Tailwind 3 PostCSS configuration, Less or Yarn.

## Physical Quality Gate

```text
format:check
    ↓
lint
    ↓
typecheck
    ↓
architecture:check
    ↓
build
```

CI checks only; it does not run formatter or lint auto-fix commands.

Local aggregate verification:

```bash
npm run check
npm run build
```
