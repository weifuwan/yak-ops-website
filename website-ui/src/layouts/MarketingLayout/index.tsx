import { Outlet } from '@umijs/max';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentWebsiteUser, type CurrentWebsiteUser } from '@/services/auth';
import MarketingHeader from './MarketingHeader';
import './index.less';

type SessionState = 'checking' | 'guest' | 'authenticated';

const AVATAR_COLORS = [
  '#C74634',
  '#C96B28',
  '#A64B7A',
  '#7B5BC7',
  '#5268C9',
  '#2D70A8',
  '#287C72',
  '#3C7A4A',
  '#8A6530',
  '#6D635D',
] as const;

function getAvatarLabel(email: string) {
  const localPart = email.split('@')[0] || '';
  const lettersAndNumbers = localPart.match(/[a-zA-Z0-9]/g)?.join('') || 'Y';
  return lettersAndNumbers.slice(0, 2).toUpperCase();
}

function getAvatarColor(email: string) {
  let hash = 0;
  for (const character of email.toLowerCase()) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export default function MarketingLayout() {
  const [sessionState, setSessionState] = useState<SessionState>('checking');
  const [currentUser, setCurrentUser] = useState<CurrentWebsiteUser>();

  useEffect(() => {
    let active = true;

    getCurrentWebsiteUser()
      .then((user) => {
        if (active) {
          setCurrentUser(user);
          setSessionState('authenticated');
        }
      })
      .catch(() => {
        if (active) {
          setCurrentUser(undefined);
          setSessionState('guest');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const avatarStyle = useMemo(() => {
    if (!currentUser?.email) {
      return undefined;
    }

    return {
      '--yak-account-avatar-bg': getAvatarColor(currentUser.email),
      '--yak-account-avatar-label': `"${getAvatarLabel(currentUser.email)}"`,
    } as CSSProperties;
  }, [currentUser?.email]);

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
          ${sessionState === 'checking' ? 'yak-marketing-header--session-checking' : ''}
          ${sessionState === 'authenticated' ? 'yak-marketing-header--authenticated' : ''}
        `}
        style={{
          borderBottom: '0.0625rem solid #e8e6dc',
          ...avatarStyle,
        }}
      >
        <MarketingHeader />
      </header>
      <Outlet />
    </div>
  );
}
