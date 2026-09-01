import { defineConfig } from '@umijs/max';
import { BRAND_COLOR, BRAND_THEME } from '../src/styles/brand';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  antd: {
    appConfig: {},
    configProvider: {
      theme: {
        ...BRAND_THEME,
        cssVar: true,
        token: {
          ...BRAND_THEME.token,
          colorInfo: BRAND_COLOR,
          colorLink: BRAND_COLOR,
          colorPrimary: BRAND_COLOR,
          fontFamily: 'var(--yak-font-family)',
        },
      },
    },
  },
  fastRefresh: true,
  hash: true,
  locale: {
    antd: true,
    baseNavigator: true,
    default: 'zh-CN',
  },
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  request: {},
  routes,
  tailwindcss: {},
  title: 'Yak Ops',
});
