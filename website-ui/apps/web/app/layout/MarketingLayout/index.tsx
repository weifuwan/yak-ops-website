import { Outlet } from 'react-router-dom';
import MarketingFooter from './MarketingFooter';
import MarketingHeader from './MarketingHeader';

export default function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-yak-page [font-family:var(--yak-font-marketing)]">
      <MarketingHeader />
      <Outlet />
      <MarketingFooter />
    </div>
  );
}
