import { Outlet } from 'react-router-dom';
import MarketingHeader from './MarketingHeader';
import './index.css';

export default function MarketingLayout() {
  return (
    <div className="yak-marketing-layout">
      <MarketingHeader />
      <Outlet />
    </div>
  );
}
