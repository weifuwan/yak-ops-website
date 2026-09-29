# Yak Ops Website UI Architecture

Status: Active

Scope:
- `website-ui/apps/**`
- `website-ui/packages/**`

Depends On:
- `./FRONTEND_CODE_STYLE.md`

## Principle

Yak Ops Website 使用与 Yak Ops UI 一致的 Workspace + Web Root 结构。

`apps/web` 是官网唯一 Web Root。

页面、路由和布局归 `app`；后端通信与 API Contract 归 `service`；真正跨页面的基础能力进入 Web Root infrastructure；无页面业务语义的共享 UI Primitive 归 `packages/yak-ui`。

## Web Root Ownership

```text
apps/web/
├── app/        → 页面能力、Router、Layout、页面局部组件
├── service/    → 后端通信、API Contract、HTTP transport
├── utils/      → 无页面业务语义工具
├── themes/     → 全局样式、品牌主题
├── types/      → 跨 Web 稳定类型 / 声明
├── hooks/      → 跨页面 React Hook
├── context/    → App-wide Context
├── config/     → 运行与导航配置
├── constants/  → 稳定常量
├── assets/     → 参与构建的静态资源
└── public/     → 原样复制的静态资源

packages/yak-ui/ → 无页面业务语义的共享 UI Primitive
```

没有实际内容的 infrastructure 目录不为“结构完整”提前创建。

## App Ownership

当前页面能力：

```text
app/
├── router/
├── layout/
│   └── MarketingLayout/
├── marketing/
├── home/
├── product/
├── developers/
└── docs/
```

规则：

- 页面专属组件跟随所属页面目录。
- Home 的展示组件、Hook、常量继续局部内聚在 `app/home`。
- Docs 的 Sidebar / Search / Markdown renderer 继续归 `app/docs`。
- Product / Developers 的占位页共享展示归 `app/marketing`。
- 不为了一个概念名额外创建 Domain Layer、Manager、Model 或 Runtime 层。

## Dependency Direction

```text
app/router
   ↓
app/<domain>
   ├── service/<domain>
   ├── utils
   └── @yak-ops-website/yak-ui

service/<domain>
   ↓
service/http
```

核心 invariant：

```text
app → service → http
```

Service 不反向依赖 `app`。

## Service Boundary

`service/http` 是唯一 HTTP transport owner。

当前后端通信：

```text
service/
├── http/
├── docs/
└── traffic/
```

页面和组件不直接创建第二套 HTTP Client。

Traffic 的 fire-and-forget page view 仍归 `service/traffic`，由 `app/router/PageViewTracker` 在路由变化时触发。

## UI Primitive Boundary

`packages/yak-ui` 只承载可跨页面复用、没有营销页面业务语义的 UI Primitive。

当前：

```text
packages/yak-ui/src/
├── YakButton/
├── YakTab/
└── index.ts
```

Ant Design 目前仍是这些 Primitive 的底层实现。去 AntD 不属于本次架构迁移。

页面禁止复制 YakButton / YakTab 形成第二套实现。

## Theme / Asset Boundary

```text
themes/
├── brand.ts
├── global.css
└── tailwind.css

assets/ → 构建期 import 的字体、图片等
public/ → 不经 Vite transform 的静态文件
```

`@/*` 只指向 `apps/web/*`，不再指向 legacy `src`。Tailwind CSS 4 通过 Vite Plugin 接入；官网保留无 Preflight 策略，避免基础样式重置影响现有 Ant Design。

## Legacy Source Rule

`website-ui/src` 已退出架构。

禁止重新创建：

```text
website-ui/src/pages
website-ui/src/layouts
website-ui/src/services
website-ui/src/components
```

新页面能力必须进入 `apps/web/app`。

## Architecture Enforcement

```bash
npm run architecture:check
```

物理 gate 保护：

- 禁止恢复 legacy `src`、根 `public`、Umi / Biome / Less / Tailwind 3 PostCSS 配置。
- `packages` 当前只允许 `yak-ui`。
- Workspace root 不拥有 runtime dependencies。
- 保持 `app → service → http`。
- App 不直接依赖 `service/http`。
- Service 不反向依赖 App。
- 原生 `fetch` 只允许由明确 service transport owner 使用。

## Verification

```bash
cd website-ui
npm run check
npm run build
```

CI 将 format / lint / typecheck / architecture / build 拆成独立 gate。
