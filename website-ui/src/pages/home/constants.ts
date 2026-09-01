export const HOME_GITHUB_URL = 'https://github.com/weifuwan/yak-ops';

export interface HomeNavLink {
  label: string;
  description: string;
  href: string;
  external?: boolean;
}

export interface HomeNavColumn {
  title: string;
  items: readonly HomeNavLink[];
}

export type HomeNavItem =
  | {
      key: string;
      label: string;
      kind: 'mega';
      columns: readonly HomeNavColumn[];
    }
  | {
      key: string;
      label: string;
      kind: 'link';
      href: string;
      external?: boolean;
    };

export const HOME_NAV_ITEMS: readonly HomeNavItem[] = [
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
            description: '沿着最短路径跑通接入、开发、治理与交付。',
            href: '/docs/getting-started/quick-start',
          },
        ],
      },
      {
        title: '运行',
        items: [
          {
            label: '部署与运行',
            description: '了解部署边界、配置原则与上线检查。',
            href: '/docs/deployment/overview',
          },
          {
            label: '开源项目',
            description: '在 GitHub 查看 Yak Ops 源码与最新进展。',
            href: HOME_GITHUB_URL,
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
        title: '连接与集成',
        items: [
          {
            label: '数据集成',
            description: '数据源管理、离线同步与实时 CDC。',
            href: '/docs/data-integration/overview',
          },
        ],
      },
      {
        title: '开发与编排',
        items: [
          {
            label: '数据开发',
            description: '开发任务、发布中心与运行记录。',
            href: '/docs/data-development/overview',
          },
          {
            label: '工作流',
            description: '工作流定义、调度与实例运行。',
            href: '/docs/getting-started/overview',
          },
        ],
      },
      {
        title: '治理与理解',
        items: [
          {
            label: '数据质量',
            description: '质量总览、表监控、运行记录与规则模板。',
            href: '/docs/data-quality/overview',
          },
          {
            label: '数据血缘',
            description: '查看上下游关系、传播路径与影响范围。',
            href: '/docs/lineage/overview',
          },
        ],
      },
      {
        title: '消费与交付',
        items: [
          {
            label: '数据消费',
            description: '数据集、仪表盘与数字化大屏。',
            href: '/docs/getting-started/overview',
          },
          {
            label: '数据服务',
            description: 'API 集市、调试、运行概览与调用记录。',
            href: '/docs/getting-started/overview',
          },
        ],
      },
    ],
  },
  {
    key: 'membership',
    label: '会员',
    kind: 'link',
    href: '/#membership',
  },
  {
    key: 'resources',
    label: '资源',
    kind: 'mega',
    columns: [
      {
        title: '文档',
        items: [
          {
            label: 'Docs',
            description: '浏览 Yak Ops 产品与部署文档。',
            href: '/docs',
          },
          {
            label: '快速开始',
            description: '从一条最短的数据流开始使用 Yak Ops。',
            href: '/docs/getting-started/quick-start',
          },
        ],
      },
      {
        title: '开源',
        items: [
          {
            label: 'GitHub',
            description: '查看源码、Issue 与 Pull Request。',
            href: HOME_GITHUB_URL,
            external: true,
          },
        ],
      },
    ],
  },
];
