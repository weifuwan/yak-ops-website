export const MARKETING_GITHUB_URL = 'https://github.com/weifuwan/yak-ops';

export interface MarketingNavItem {
  key: string;
  label: string;
  href: string;
  external?: boolean;
}

/**
 * 官网公开区域保持克制：一个介绍 Yak Ops 的首页，以及登录后可访问的文档。
 * GitHub 作为开源项目入口直接外跳，不在官网内增加中转页面。
 */
export const MARKETING_NAV_ITEMS: readonly MarketingNavItem[] = [
  {
    key: 'home',
    label: '首页',
    href: '/',
  },
  {
    key: 'docs',
    label: '文档',
    href: '/docs',
  },
  {
    key: 'github',
    label: 'GitHub',
    href: MARKETING_GITHUB_URL,
    external: true,
  },
];

export const MARKETING_HEADER_ACTIONS = {
  login: '/login',
  startUsing: '/register',
} as const;
