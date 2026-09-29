import { ConfigProvider, type ThemeConfig } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';

import { BRAND_COLOR, BRAND_THEME } from '@/styles/brand';

import AppRouter from './router/AppRouter';
import PageViewTracker from './router/PageViewTracker';

const WEBSITE_THEME: ThemeConfig = {
  ...BRAND_THEME,
  cssVar: true,
  token: {
    ...BRAND_THEME.token,
    colorInfo: BRAND_COLOR,
    colorLink: BRAND_COLOR,
    colorPrimary: BRAND_COLOR,
    fontFamily: 'var(--yak-font-family)',
  },
};

export default function App() {
  return (
    <ConfigProvider locale={zhCN} theme={WEBSITE_THEME}>
      <BrowserRouter>
        <PageViewTracker />
        <AppRouter />
      </BrowserRouter>
    </ConfigProvider>
  );
}
