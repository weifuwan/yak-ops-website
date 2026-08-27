import { Outlet } from '@umijs/max';
import './index.less';

export default function MarketingLayout() {
  return (
    <div className="yak-marketing-layout">
      <Outlet />
    </div>
  );
}
