import { Outlet } from '@umijs/max';
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  getCurrentWebsiteUser,
  logoutAccount,
  type CurrentWebsiteUser,
} from '@/services/auth';
import MarketingHeader from './MarketingHeader';
import './index.less';

type SessionState = 'checking' | 'guest' | 'authenticated';

const ACCOUNT_MENU_WIDTH = 272;
const ACCOUNT_MENU_VIEWPORT_PADDING = 16;

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

function LogoutIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M8.25 4H5.5C4.67157 4 4 4.67157 4 5.5V14.5C4 15.3284 4.67157 16 5.5 16H8.25M12.25 6.5L15.75 10M15.75 10L12.25 13.5M15.75 10H7.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MarketingLayout() {
  const headerRef = useRef<HTMLElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const [sessionState, setSessionState] = useState<SessionState>('checking');
  const [currentUser, setCurrentUser] = useState<CurrentWebsiteUser>();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [accountMenuPosition, setAccountMenuPosition] = useState<CSSProperties>();
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string>();

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

  const avatarLabel = currentUser?.email ? getAvatarLabel(currentUser.email) : 'Y';
  const avatarColor = currentUser?.email ? getAvatarColor(currentUser.email) : '#6D635D';

  const avatarStyle = useMemo(() => {
    if (!currentUser?.email) {
      return undefined;
    }

    return {
      '--yak-account-avatar-bg': avatarColor,
      '--yak-account-avatar-label': `"${avatarLabel}"`,
    } as CSSProperties;
  }, [avatarColor, avatarLabel, currentUser?.email]);

  const getAccountAnchor = () =>
    headerRef.current?.querySelector<HTMLAnchorElement>(
      "nav + div > a[href='/login']:first-child",
    );

  const syncAccountMenuPosition = () => {
    const anchor = getAccountAnchor();
    if (!anchor) {
      return;
    }

    const rect = anchor.getBoundingClientRect();
    const maxLeft = window.innerWidth - ACCOUNT_MENU_WIDTH - ACCOUNT_MENU_VIEWPORT_PADDING;
    const left = Math.min(
      Math.max(ACCOUNT_MENU_VIEWPORT_PADDING, rect.right - ACCOUNT_MENU_WIDTH),
      Math.max(ACCOUNT_MENU_VIEWPORT_PADDING, maxLeft),
    );

    setAccountMenuPosition({
      top: rect.bottom + 10,
      left,
      width: ACCOUNT_MENU_WIDTH,
    });
  };

  const toggleAccountMenu = () => {
    if (sessionState !== 'authenticated') {
      return;
    }

    setLogoutError(undefined);
    setAccountMenuOpen((open) => {
      const nextOpen = !open;
      if (nextOpen) {
        syncAccountMenuPosition();
      }
      return nextOpen;
    });
  };

  const handleHeaderClickCapture = (event: ReactMouseEvent<HTMLElement>) => {
    if (sessionState !== 'authenticated') {
      return;
    }

    const target = event.target as HTMLElement;
    const loginLink = target.closest<HTMLAnchorElement>("a[href='/login']");
    if (!loginLink || !headerRef.current?.contains(loginLink)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    toggleAccountMenu();
  };

  const handleHeaderKeyDownCapture = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (sessionState !== 'authenticated' || event.key !== ' ') {
      return;
    }

    const target = event.target as HTMLElement;
    const loginLink = target.closest<HTMLAnchorElement>("a[href='/login']");
    if (!loginLink || !headerRef.current?.contains(loginLink)) {
      return;
    }

    event.preventDefault();
    toggleAccountMenu();
  };

  useEffect(() => {
    const anchor = getAccountAnchor();
    if (!anchor) {
      return undefined;
    }

    if (sessionState === 'authenticated' && currentUser) {
      anchor.setAttribute('role', 'button');
      anchor.setAttribute('aria-haspopup', 'menu');
      anchor.setAttribute('aria-expanded', String(accountMenuOpen));
      anchor.setAttribute('aria-label', `Account menu for ${currentUser.email}`);
      anchor.setAttribute('title', currentUser.email);
    } else {
      anchor.removeAttribute('role');
      anchor.removeAttribute('aria-haspopup');
      anchor.removeAttribute('aria-expanded');
      anchor.removeAttribute('aria-label');
      anchor.removeAttribute('title');
    }

    return undefined;
  }, [accountMenuOpen, currentUser, sessionState]);

  useEffect(() => {
    if (!accountMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const anchor = getAccountAnchor();

      if (accountMenuRef.current?.contains(target) || anchor?.contains(target)) {
        return;
      }
      setAccountMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAccountMenuOpen(false);
        getAccountAnchor()?.focus();
      }
    };

    const handleResize = () => syncAccountMenuPosition();

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [accountMenuOpen]);

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);
    setLogoutError(undefined);

    try {
      await logoutAccount();
      setAccountMenuOpen(false);
      setCurrentUser(undefined);
      setSessionState('guest');
      window.location.replace('/login');
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : '退出失败，请稍后重试');
      setLoggingOut(false);
    }
  };

  return (
    <div className="yak-marketing-layout">
      <header
        ref={headerRef}
        className={`
          sticky
          top-0
          z-[1200]
          visible
          transform-none
          border-b
          border-[#E4E7EC]
          bg-white
          opacity-100
          ${sessionState === 'checking' ? 'yak-marketing-header--session-checking' : ''}
          ${sessionState === 'authenticated' ? 'yak-marketing-header--authenticated' : ''}
        `}
        style={{
          borderBottom: '0.0625rem solid #E4E7EC',
          ...avatarStyle,
        }}
        onClickCapture={handleHeaderClickCapture}
        onKeyDownCapture={handleHeaderKeyDownCapture}
      >
        <MarketingHeader />
      </header>

      {sessionState === 'authenticated' && currentUser && accountMenuOpen ? (
        <div
          ref={accountMenuRef}
          className="yak-account-menu"
          role="menu"
          aria-label="Account menu"
          style={accountMenuPosition}
        >
          <div className="yak-account-menu__identity">
            <span
              className="yak-account-menu__avatar"
              style={{ backgroundColor: avatarColor }}
              aria-hidden="true"
            >
              {avatarLabel}
            </span>
            <span className="yak-account-menu__identity-copy">
              <span className="yak-account-menu__eyebrow">Signed in as</span>
              <span className="yak-account-menu__email" title={currentUser.email}>
                {currentUser.email}
              </span>
            </span>
          </div>

          <div className="yak-account-menu__divider" />

          <button
            type="button"
            className="yak-account-menu__logout"
            role="menuitem"
            disabled={loggingOut}
            onClick={handleLogout}
          >
            <span className="yak-account-menu__logout-icon">
              <LogoutIcon />
            </span>
            <span>{loggingOut ? 'Logging out…' : 'Log out'}</span>
          </button>

          {logoutError ? <p className="yak-account-menu__error">{logoutError}</p> : null}
        </div>
      ) : null}

      <Outlet />
    </div>
  );
}
