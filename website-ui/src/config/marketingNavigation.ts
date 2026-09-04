export const MARKETING_GITHUB_URL = 'https://github.com/weifuwan/yak-ops';
export const MARKETING_GITHUB_RELEASES_URL = `${MARKETING_GITHUB_URL}/releases`;
export const MARKETING_GITHUB_ISSUES_URL = `${MARKETING_GITHUB_URL}/issues`;

export interface MarketingNavLink {
  label: string;
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
 * Mega Menu 只承担导航职责：分组 + 链接，不在菜单中堆叠产品说明；
 * 开发者页使用独立 marketing URL，Docs 保持独立入口。
 */
export const MARKETING_NAV_ITEMS: readonly MarketingNavItem[] = [
  {
    key: 'developers',
    label: 'Developers',
    kind: 'mega',
    columns: [
      {
        title: 'GET STARTED',
        items: [
          { label: 'Quick Start', href: '/developers/quick-start' },
          { label: 'Deployment Guide', href: '/developers/deployment' },
          { label: 'Docker', href: '/developers/docker' },
        ],
      },
      {
        title: 'BUILD',
        items: [
          { label: 'Development Guide', href: '/developers/development' },
          { label: 'API', href: '/developers/api' },
          { label: 'Configuration Reference', href: '/developers/configuration' },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { label: 'GitHub', href: MARKETING_GITHUB_URL, external: true },
          { label: 'Releases', href: MARKETING_GITHUB_RELEASES_URL, external: true },
          { label: 'Issues', href: MARKETING_GITHUB_ISSUES_URL, external: true },
          { label: 'Contributing Guide', href: '/developers/contributing' },
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
  login: '/login',
  startUsing: '/docs',
} as const;
