export const MARKETING_GITHUB_URL = 'https://github.com/weifuwan/yak-ops';
export const MARKETING_GITHUB_RELEASES_URL = MARKETING_GITHUB_URL + '/releases';
export const MARKETING_GITHUB_ISSUES_URL = MARKETING_GITHUB_URL + '/issues';

export type MarketingNavIcon =
  | 'database'
  | 'sync'
  | 'radio'
  | 'code'
  | 'workflow'
  | 'calendar'
  | 'quality'
  | 'lineage'
  | 'assets'
  | 'datasets'
  | 'services'
  | 'metrics'
  | 'book'
  | 'github'
  | 'releases'
  | 'issues';

export interface MarketingNavLink {
  label: string;
  href: string;
  icon?: MarketingNavIcon;
  description?: string;
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
 * Original Collate Resources menu content, retained as a reference until
 * Yak Ops has its own resource articles and landing pages.
 */
export const MARKETING_RESOURCE_LINKS: readonly MarketingNavLink[] = [
  { label: 'Case Studies', href: 'https://www.getcollate.io/case-studies', external: true },
  { label: 'Learning Center', href: 'https://www.getcollate.io/learning-center', external: true },
  { label: 'Events', href: 'https://www.getcollate.io/events', external: true },
  { label: 'Compare', href: 'https://www.getcollate.io/learning-center/resource/compare', external: true },
  { label: 'Newsroom', href: 'https://www.getcollate.io/newsroom', external: true },
];

export const MARKETING_RESOURCE_ARTICLES: readonly MarketingNavLink[] = [
  {
    label: 'Context Engineering',
    description: 'Curate context to make AI outputs accurate',
    href: 'https://www.getcollate.io/learning-center/context-engineering',
    external: true,
  },
  {
    label: 'Data Catalog',
    description: 'Finding and accessing data is changing',
    href: 'https://www.getcollate.io/learning-center/data-catalog',
    external: true,
  },
  {
    label: 'Metadata Management',
    description: 'Enrich data context, discoverability, and governance',
    href: 'https://www.getcollate.io/learning-center/metadata-management',
    external: true,
  },
  {
    label: 'Data Integration',
    description: 'Unify data across sources for seamless access',
    href: 'https://www.getcollate.io/learning-center/data-integration',
    external: true,
  },
  {
    label: 'Data Quality',
    description: 'Ensure trustworthy, accurate data for stakeholders',
    href: 'https://www.getcollate.io/learning-center/data-quality',
    external: true,
  },
  {
    label: 'Data Observability',
    description: 'Improve data reliability and performance',
    href: 'https://www.getcollate.io/learning-center/data-observability',
    external: true,
  },
  {
    label: 'Data Lineage',
    description: 'Understand how data flows across your systems',
    href: 'https://www.getcollate.io/learning-center/data-lineage',
    external: true,
  },
  {
    label: 'Data Governance',
    description: 'Reduce risk, ensure data compliance',
    href: 'https://www.getcollate.io/learning-center/data-governance',
    external: true,
  },
  {
    label: 'Data Mesh',
    description: 'Decentralized, domain-driven ownership at scale',
    href: 'https://www.getcollate.io/learning-center/data-mesh',
    external: true,
  },
  {
    label: 'Data Management',
    description: 'Organize, store, and maintain data effectively',
    href: 'https://www.getcollate.io/learning-center/data-management',
    external: true,
  },
  {
    label: 'Data Warehouse',
    description: 'Centralize, organize, and analyze data at scale',
    href: 'https://www.getcollate.io/learning-center/data-warehouse',
    external: true,
  },
  {
    label: 'Data Lake',
    description: 'Flexible storage for raw and structured data',
    href: 'https://www.getcollate.io/learning-center/data-lake',
    external: true,
  },
];

/**
 * 官网 Header 导航的单一数据源。
 * 只使用已存在的站内页面与开源仓库地址，不引入新的业务页面。
 */
export const MARKETING_NAV_ITEMS: readonly MarketingNavItem[] = [
  {
    key: 'products',
    label: 'Products',
    kind: 'mega',
    columns: [
      {
        title: '数据集成',
        items: [
          { label: '数据源', href: '/product/data-sources', icon: 'database' },
          { label: '离线同步', href: '/product/batch-sync', icon: 'sync' },
          { label: '实时同步', href: '/product/realtime-sync', icon: 'radio' },
        ],
      },
      {
        title: '数据开发',
        items: [
          { label: '数据开发', href: '/product/data-development', icon: 'code' },
          { label: '工作流', href: '/product/workflows', icon: 'workflow' },
          { label: '任务调度', href: '/product/scheduling', icon: 'calendar' },
        ],
      },
      {
        title: '数据治理',
        items: [
          { label: '数据质量', href: '/product/data-quality', icon: 'quality' },
          { label: '数据血缘', href: '/product/lineage', icon: 'lineage' },
          { label: '数据资产', href: '/product/data-assets', icon: 'assets' },
          { label: '数据集', href: '/product/datasets', icon: 'datasets' },
          { label: '数据服务', href: '/product/data-services', icon: 'services' },
          { label: '指标管理', href: '/product/metrics', icon: 'metrics' },
        ],
      },
    ],
  },
  {
    key: 'developers',
    label: 'Developers',
    kind: 'mega',
    columns: [
      {
        title: 'GET STARTED',
        items: [{ label: 'Docker Compose', href: '/docs/deploy/docker-compose', icon: 'book' }],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { label: 'GitHub', href: MARKETING_GITHUB_URL, external: true, icon: 'github' },
          { label: 'Releases', href: MARKETING_GITHUB_RELEASES_URL, external: true, icon: 'releases' },
          { label: 'Issues', href: MARKETING_GITHUB_ISSUES_URL, external: true, icon: 'issues' },
        ],
      },
    ],
  },
  {
    key: 'docs',
    label: 'Docs',
    kind: 'link',
    href: '/docs',
  },
  {
    key: 'resources',
    label: 'Resources',
    kind: 'mega',
    columns: [
      { title: 'RESOURCES', items: MARKETING_RESOURCE_LINKS },
      { title: 'ARTICLES', items: MARKETING_RESOURCE_ARTICLES },
    ],
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
  startUsing: '/docs',
  demo: 'https://demo.yak-ops.com',
} as const;
