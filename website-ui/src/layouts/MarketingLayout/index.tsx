import { Outlet } from '@umijs/max';
import MarketingHeader from './MarketingHeader';
import './index.less';

export default function MarketingLayout() {
  return (
    <div className="yak-marketing-layout">
      <header
        className="
          relative
          z-[1]
          visible
          transform-none
          border-b
          border-[#e8e6dc]
          bg-[#faf9f5]
          opacity-100
        "
      >
        <MarketingHeader />
      </header>
      <Outlet />
    </div>
  );
}
