import { Outlet } from 'react-router-dom';
import MarketingHeader from './MarketingHeader';
import './index.css';

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
          border-[#E4E7EC]
          bg-white
          opacity-100
        "
        style={{
          borderBottom: '0.0625rem solid #E4E7EC',
        }}
      >
        <MarketingHeader />
      </header>

      <Outlet />
    </div>
  );
}
