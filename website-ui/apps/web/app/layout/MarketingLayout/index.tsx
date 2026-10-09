import { Outlet } from 'react-router-dom';
import MarketingHeader from './MarketingHeader';

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-yak-page">
      <MarketingHeader />
      <Outlet />
    </div>
  );
}
