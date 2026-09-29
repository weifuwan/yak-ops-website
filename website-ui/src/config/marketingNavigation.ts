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
 * Developers 菜单只承担文档导航职责；具体内容统一维护在 Docs 中，
 * Open Source 链接继续直接指向 GitHub。
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
          { label: 'Quick Start', href: '/docs/getting-started/quick-start' },
          { label: 'Deployment Guide', href: '/docs/deploy/overview' },
          { label: 'Docker', href: '/docs/deploy/docker-compose' },
        ],
      },
      {
        title: 'BUILD',
        items: [
          { label: 'Development Guide', href: '/docs/development/guide' },
          { label: 'Architecture', href: '/docs/development/architecture' },
          { label: 'Configuration Reference', href: '/docs/development/configuration' },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { label: 'GitHub', href: MARKETING_GITHUB_URL, external: true },
          { label: 'Releases', href: MARKETING_GITHUB_RELEASES_URL, external: true },
          { label: 'Issues', href: MARKETING_GITHUB_ISSUES_URL, external: true },
          { label: 'Contributing Guide', href: '/docs/contributing/guide' },
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
} as const;
