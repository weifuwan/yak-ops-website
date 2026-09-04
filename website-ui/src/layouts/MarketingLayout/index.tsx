import { Outlet } from '@umijs/max';
import { useEffect, useState } from 'react';
import { getCurrentWebsiteUser } from '@/services/auth';
import MarketingHeader from './MarketingHeader';
import './index.less';

type SessionState = 'checking' | 'guest' | 'authenticated';

export default function MarketingLayout() {
  const [sessionState, setSessionState] = useState<SessionState>('checking');

  useEffect(() => {
    let active = true;

    getCurrentWebsiteUser()
      .then(() => {
        if (active) {
          setSessionState('authenticated');
        }
      })
      .catch(() => {
        if (active) {
          setSessionState('guest');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="yak-marketing-layout">
      <header
        className={`
          sticky
          top-0
          z-[1200]
          visible
          transform-none
          border-b
          border-[#e8e6dc]
          bg-[#faf9f5]
          opacity-100
          ${sessionState === 'guest' ? '' : 'yak-marketing-header--session-active'}
        `}
        style={{
          borderBottom: '0.0625rem solid #e8e6dc',
        }}
      >
        <MarketingHeader />
      </header>
      <Outlet />
    </div>
  );
}
