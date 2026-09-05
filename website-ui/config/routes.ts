export default [
  {
    path: '/',
    component: '@/layouts/MarketingLayout',
    routes: [
      {
        path: '/',
        component: '@/pages/home',
      },
      {
        path: '/link-up',
        component: '@/pages/link-up',
      },
      {
        path: '/product/data-sources',
        component: '@/pages/product/data-sources',
      },
      {
        path: '/product/batch-sync',
        component: '@/pages/product/batch-sync',
      },
      {
        path: '/product/realtime-sync',
        component: '@/pages/product/realtime-sync',
      },
      {
        path: '/product/data-development',
        component: '@/pages/product/data-development',
      },
      {
        path: '/product/workflows',
        component: '@/pages/product/workflows',
      },
      {
        path: '/product/scheduling',
        component: '@/pages/product/scheduling',
      },
      {
        path: '/product/data-quality',
        component: '@/pages/product/data-quality',
      },
      {
        path: '/product/lineage',
        component: '@/pages/product/lineage',
      },
      {
        path: '/product/data-assets',
        component: '@/pages/product/data-assets',
      },
      {
        path: '/product/datasets',
        component: '@/pages/product/datasets',
      },
      {
        path: '/product/data-services',
        component: '@/pages/product/data-services',
      },
      {
        path: '/product/metrics',
        component: '@/pages/product/metrics',
      },
      {
        path: '/developers/quick-start',
        component: '@/pages/developers/quick-start',
      },
      {
        path: '/developers/deployment',
        component: '@/pages/developers/deployment',
      },
      {
        path: '/developers/docker',
        component: '@/pages/developers/docker',
      },
      {
        path: '/developers/development',
        component: '@/pages/developers/development',
      },
      {
        path: '/developers/api',
        component: '@/pages/developers/api',
      },
      {
        path: '/developers/configuration',
        component: '@/pages/developers/configuration',
      },
      {
        path: '/developers/contributing',
        component: '@/pages/developers/contributing',
      },
    ],
  },
  {
    path: '/docs/*',
    component: '@/pages/docs',
  },
  {
    path: '/login',
    component: '@/pages/auth/login',
  },
  {
    path: '/forgot-password',
    component: '@/pages/auth/forgot-password',
  },
  {
    path: '/reset-password',
    component: '@/pages/auth/reset-password',
  },
];
