export const MARKETING_GITHUB_URL = 'https://github.com/weifuwan/yak-ops';

export interface MarketingNavLink {
  label: string;
  description: string;
  href: string;
  external?: boolean;
}

export interface MarketingNavColumn {
  title: string;
  items: readonly MarketingNavLink[];
}

export interface MarketingMegaNavItem {
  key: string;
  label: string;
  kind: 'mega';
  columns: readonly MarketingNavColumn[];
}

export interface MarketingDirectNavItem {
  key: string;
  label: string;
  kind: 'link';
  href: string;
  external?: boolean;
}

export type MarketingNavItem = MarketingMegaNavItem | MarketingDirectNavItem;

/**
 * 官网顶部导航的单一数据源。
 *
 * 约束：
 * - 站内链接必须与 config/routes.ts 中的真实路由匹配；
 * - 文档链接必须对应 docs/ 下真实存在的 slug；
 * - 外部地址显式标记 external，避免站内路由与外链行为混用。
 */
export const MARKETING_NAV_ITEMS: readonly MarketingNavItem[] = [
  {
    key: 'about',
    label: '了解 Yak Ops',
    kind: 'mega',
    columns: [
      {
        title: '开始',
        items: [
          {
            label: 'Yak Ops 概览',
            description: '了解产品定位、能力边界与整体数据流。',
            href: '/docs/getting-started/overview',
          },
          {
            label: '快速开始',
            description: '沿着最短路径跑通 Yak Ops。',
            href: '/docs/getting-started/quick-start',
          },
        ],
      },
      {
        title: '运行与开源',
        items: [
          {
            label: '部署与运行',
            description: '查看部署边界、配置原则与运行说明。',
            href: '/docs/deployment/overview',
          },
          {
            label: 'GitHub',
            description: '查看 Yak Ops 源码、Issue 与 Pull Request。',
            href: MARKETING_GITHUB_URL,
            external: true,
          },
        ],
      },
    ],
  },
  {
    key: 'platform',
    label: '平台',
    kind: 'mega',
    columns: [
      {
        title: '连接',
        items: [
          {
            label: '数据集成',
            description: '数据源、离线同步与实时数据接入。',
            href: '/docs/data-integration/overview',
          },
        ],
      },
      {
        title: '开发',
        items: [
          {
            label: '数据开发',
            description: '开发任务、发布与运行管理。',
            href: '/docs/data-development/overview',
          },
        ],
      },
      {
        title: '治理',
        items: [
          {
            label: '数据质量',
            description: '质量监控、运行记录与规则治理。',
            href: '/docs/data-quality/overview',
          },
        ],
      },
      {
        title: '理解',
        items: [
          {
            label: '数据血缘',
            description: '查看上下游关系、传播路径与影响范围。',
            href: '/docs/lineage/overview',
          },
        ],
      },
    ],
  },
  {
    key: 'docs',
    label: '文档',
    kind: 'link',
    href: '/docs',
  },
  {
    key: 'github',
    label: 'GitHub',
    kind: 'link',
    href: MARKETING_GITHUB_URL,
    external: true,
  },
];

export const MARKETING_HEADER_ACTIONS = {
  login: '/login',
  quickStart: '/docs/getting-started/quick-start',
} as const;
