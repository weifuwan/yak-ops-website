# Frontend Tooling

Status: Active

Scope:
- `website-ui`

## Toolchain

当前官网前端工具链：

```text
Vite 6
React 18
React Router
Tailwind CSS 4
TypeScript 5.9
Oxlint
Oxfmt
npm workspaces
Node architecture check
```

Node 要求：

```text
>= 22.13
```

Umi Max、Biome、Tailwind 3 PostCSS pipeline、Less、Yarn 不再属于官网前端工具链。

## Required Checks

本地在 `website-ui/` 下执行：

```bash
npm run check
npm run build
```

`check` 按顺序执行：

```text
format:check
      ↓
lint
      ↓
typecheck
      ↓
architecture:check
```

Build 独立执行，验证真实 Vite production build。

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run architecture:check
npm run typecheck
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run check
```

## Tailwind CSS 4

Tailwind 4 通过 `@tailwindcss/vite` 接入，不再维护 PostCSS 配置和 Tailwind 3 `content` 配置。

官网继续禁用 Preflight，以避免改变现有 Ant Design 与官网基础样式。入口 CSS 只导入：

```text
tailwindcss/theme.css
tailwindcss/utilities.css
```

并通过 `@source` 显式覆盖 `app` 与 `packages/yak-ui`。

官网主题 utility 通过 CSS-first `@theme inline` 映射到现有 Yak CSS variables。

## Lint / Format

Oxlint 是唯一静态 lint owner。

Oxfmt 是唯一 formatter owner。

CI 只执行 check-only 命令：

```text
npm run format:check
npm run lint
npm run typecheck
npm run architecture:check
npm run build
```

CI 禁止执行 `format` 或 `lint:fix` 自动修改源码。

## Architecture Gate

`scripts/check-architecture.mjs` 保护以下物理边界：

- 禁止恢复 `src`、根 `public`、Umi、Biome、Tailwind 3 PostCSS 配置。
- 禁止恢复 Less。
- `packages` 当前只允许 `yak-ui`。
- Workspace root 不拥有 runtime dependencies。
- `service/**` 不得反向依赖 `app/**`。
- `app/**` 不得直接依赖 `service/http`。
- 原生 `fetch` 只允许存在于明确的 service transport owner。
- 禁止恢复旧 `@/services`、`@/components`、`@/pages` 等 alias。

架构需要演进时，先修改 Architecture / Rules，再修改 enforcement。

## Package Manager

官网前端统一使用 npm workspaces。

当前 CI 使用 `npm install` 安装依赖；仓库完成 lockfile 收口后可切换到 `npm ci`。不要重新引入 Yarn lockfile。
