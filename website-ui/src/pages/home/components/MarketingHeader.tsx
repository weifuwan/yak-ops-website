import { GithubOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { useState } from 'react';
import { YakButton } from '@/components/ui';
import { HOME_GITHUB_URL } from '../constants';

const NAV_ITEMS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Quality', href: '#quality' },
  { label: 'Lineage', href: '#lineage' },
] as const;

export default function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="home-header">
      <div className="home-header__inner">
        <Link className="home-wordmark" to="/" onClick={closeMobile}>
          <span className="home-wordmark__mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>Yak Ops</span>
        </Link>

        <nav className="home-header__nav" aria-label="主导航">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <Link to="/docs">Docs</Link>
          <a href={HOME_GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>

        <div className="home-header__actions">
          <Link className="home-header__signin" to="/login">
            登录
          </Link>
          <Link className="home-button home-button--dark home-header__get-started" to="/register">
            开始使用
          </Link>
          <YakButton
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? '关闭导航' : '打开导航'}
            className="home-header__menu-button"
            icon={<MenuOutlined />}
            iconOnly
            onClick={() => setMobileOpen((open) => !open)}
          />
        </div>
      </div>

      <div className={`home-mobile-nav${mobileOpen ? ' home-mobile-nav--open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMobile}>
            {item.label}
          </a>
        ))}
        <Link to="/docs" onClick={closeMobile}>
          Docs
        </Link>
        <a href={HOME_GITHUB_URL} target="_blank" rel="noreferrer" onClick={closeMobile}>
          <GithubOutlined /> GitHub
        </a>
        <Link to="/login" onClick={closeMobile}>
          登录
        </Link>
        <Link className="home-button home-button--dark" to="/register" onClick={closeMobile}>
          创建账号
        </Link>
      </div>
    </header>
  );
}
