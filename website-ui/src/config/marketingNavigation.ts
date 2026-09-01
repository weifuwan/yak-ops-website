export const MARKETING_GITHUB_URL = 'https://github.com/weifuwan/yak-ops';
export const MARKETING_GITHUB_RELEASES_URL = `${MARKETING_GITHUB_URL}/releases`;
export const MARKETING_GITHUB_ISSUES_URL = `${MARKETING_GITHUB_URL}/issues`;

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
 * 产品页与开发者页使用独立 marketing URL，不直接把产品导航映射为 Docs；
 * Docs 继续保持独立入口，GitHub / Releases / Issues 明确作为外链。
 */
export const MARKETING_NAV_ITEMS: readonly MarketingNavItem[] = [
  {
    key: 'product',
    label: '产品',
    kind: 'mega',
    columns: [
      {
        title: 'CONNECT',
        items: [
          {
            label: '数据源管理',
            description: '连接和统一管理数据库与数据源。',
            href: '/product/data-sources',
          },
          {
            label: '离线同步',
            description: '批量同步数据并管理周期任务。',
            href: '/product/batch-sync',
          },
          {
            label: '实时同步',
            description: '持续捕获并同步数据变化。',
            href: '/product/realtime-sync',
          },
        ],
      },
      {
        title: 'BUILD',
        items: [
          {
            label: '数据开发',
            description: '开发、调试和发布数据任务。',
            href: '/product/data-development',
          },
          {
            label: '工作流',
            description: '编排多步骤数据处理流程。',
            href: '/product/workflows',
          },
          {
            label: '任务调度',
            description: '管理周期、依赖与运行计划。',
            href: '/product/scheduling',
          },
        ],
      },
      {
        title: 'GOVERN',
        items: [
          {
            label: '数据质量',
            description: '定义规则并持续监控数据质量。',
            href: '/product/data-quality',
          },
          {
            label: '数据血缘',
            description: '追踪数据来源、加工与去向。',
            href: '/product/lineage',
          },
          {
            label: '数据资产',
            description: '发现、理解和管理可信数据。',
            href: '/product/data-assets',
          },
        ],
      },
      {
        title: 'SERVE',
        items: [
          {
            label: '数据集',
            description: '组织并复用可消费的数据集合。',
            href: '/product/datasets',
          },
          {
            label: '数据服务',
            description: '将数据能力以服务形式交付。',
            href: '/product/data-services',
          },
          {
            label: '指标',
            description: '统一定义和管理业务指标。',
            href: '/product/metrics',
          },
        ],
      },
    ],
  },
  {
    key: 'developers',
    label: '开发者',
    kind: 'mega',
    columns: [
      {
        title: 'GET STARTED',
        items: [
          {
            label: '快速开始',
            description: '用最短路径认识并开始使用 Yak Ops。',
            href: '/developers/quick-start',
          },
          {
            label: '部署指南',
            description: '了解部署方式与运行边界。',
            href: '/developers/deployment',
          },
          {
            label: 'Docker',
            description: '通过容器方式运行 Yak Ops。',
            href: '/developers/docker',
          },
        ],
      },
      {
        title: 'BUILD',
        items: [
          {
            label: '开发指南',
            description: '了解项目结构、开发流程与扩展方式。',
            href: '/developers/development',
          },
          {
            label: 'API',
            description: '查看 Yak Ops 对外能力与接口说明。',
            href: '/developers/api',
          },
          {
            label: '配置参考',
            description: '集中查看运行和功能配置。',
            href: '/developers/configuration',
          },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          {
            label: 'GitHub',
            description: '查看 Yak Ops 源码与社区协作。',
            href: MARKETING_GITHUB_URL,
            external: true,
          },
          {
            label: 'Releases',
            description: '查看 Yak Ops 版本发布记录。',
            href: MARKETING_GITHUB_RELEASES_URL,
            external: true,
          },
          {
            label: 'Issues',
            description: '反馈问题并跟踪社区讨论。',
            href: MARKETING_GITHUB_ISSUES_URL,
            external: true,
          },
          {
            label: '贡献指南',
            description: '了解如何参与 Yak Ops 开源协作。',
            href: '/developers/contributing',
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
  startUsing: '/register',
} as const;
