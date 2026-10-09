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
