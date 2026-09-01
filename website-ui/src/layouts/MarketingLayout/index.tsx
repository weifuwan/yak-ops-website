import { Outlet } from '@umijs/max';
import MarketingHeader from './MarketingHeader';
import './index.less';

export default function MarketingLayout() {
  return (
    <div className="yak-marketing-layout">
      <header
        className="
          sticky
          top-0
          z-[1200]
          visible
          transform-none
          border-b
          border-[#e8e6dc]
          bg-[#faf9f5]
          opacity-100
        "
        style={{
          borderBottom: "0.0625rem solid #e8e6dc"
        }}
      >
        <MarketingHeader />
      </header>
      <Outlet />
    </div>
  );
}
