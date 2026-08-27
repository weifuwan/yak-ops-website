export default [
  {
    path: '/',
    component: '@/layouts/MarketingLayout',
    routes: [
      {
        path: '/',
        component: '@/pages/home',
      },
    ],
  },
  {
    path: '/login',
    component: '@/pages/auth/login',
  },
  {
    path: '/register',
    component: '@/pages/auth/register',
  },
  {
    path: '/verify-email',
    component: '@/pages/auth/verify-email',
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
