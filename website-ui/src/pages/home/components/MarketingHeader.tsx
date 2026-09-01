import { DownOutlined, GithubOutlined, MenuOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { type FocusEvent, useState } from 'react';
import { YakButton } from '@/components/ui';
import { HOME_GITHUB_URL, HOME_NAV_ITEMS, type HomeNavLink } from '../constants';

interface NavLinkProps {
  item: HomeNavLink;
  className?: string;
  onClick?: () => void;
}

function NavLink({ item, className, onClick }: NavLinkProps) {
  const content = (
    <>
      <span className="home-nav-link__label">{item.label}</span>
      <span className="home-nav-link__description">{item.description}</span>
    </>
  );

  if (item.external) {
    return (
      <a className={className} href={item.href} target="_blank" rel="noreferrer" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link className={className} to={item.href} onClick={onClick}>
      {content}
    </Link>
  );
}

export default function MarketingHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeNavigation = () => {
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const handleMenuBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setActiveMenu(null);
    }
  };

  return (
    <header className="home-header" onMouseLeave={() => setActiveMenu(null)}>
      <div className="home-header__inner">
        <Link className="home-wordmark" to="/" onClick={closeNavigation}>
          <span className="home-wordmark__mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>Yak Ops</span>
        </Link>

        <nav className="home-header__nav" aria-label="主导航">
          {HOME_NAV_ITEMS.map((item) => {
            if (item.kind === 'link') {
              if (item.external) {
                return (
                  <a
                    key={item.key}
                    className="home-nav-direct"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setActiveMenu(null)}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.key}
                  className="home-nav-direct"
                  to={item.href}
                  onMouseEnter={() => setActiveMenu(null)}
                >
                  {item.label}
                </Link>
              );
            }

            const open = activeMenu === item.key;

            return (
              <div
                key={item.key}
                className={`home-nav-item${open ? ' home-nav-item--open' : ''}`}
                onBlur={handleMenuBlur}
                onFocus={() => setActiveMenu(item.key)}
                onMouseEnter={() => setActiveMenu(item.key)}
              >
                <button
                  className="home-nav-trigger"
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => setActiveMenu((current) => (current === item.key ? null : item.key))}
                >
                  <span>{item.label}</span>
                  <DownOutlined aria-hidden="true" />
                </button>

                <div className="home-mega-menu" aria-hidden={!open}>
                  <div className="home-mega-menu__surface">
                    <div className="home-mega-menu__columns">
                      {item.columns.map((column) => (
                        <section className="home-mega-menu__column" key={column.title}>
                          <div className="home-mega-menu__title">{column.title}</div>
                          <div className="home-mega-menu__links">
                            {column.items.map((link) => (
                              <NavLink
                                className="home-mega-menu__link"
                                item={link}
                                key={`${column.title}-${link.label}`}
                                onClick={closeNavigation}
                              />
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="home-header__actions">
          <Link className="home-header__signin" to="/login">
            登录
          </Link>
          <Link className="home-button home-button--dark home-header__get-started" to="/register">
            开始使用 <RightOutlined />
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
        {HOME_NAV_ITEMS.map((item) => {
          if (item.kind === 'link') {
            if (item.external) {
              return (
                <a key={item.key} className="home-mobile-nav__direct" href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              );
            }

            return (
              <Link key={item.key} className="home-mobile-nav__direct" to={item.href} onClick={closeNavigation}>
                {item.label}
              </Link>
            );
          }

          return (
            <details className="home-mobile-nav__group" key={item.key}>
              <summary>{item.label}</summary>
              <div className="home-mobile-nav__group-body">
                {item.columns.map((column) => (
                  <section key={column.title}>
                    <div className="home-mobile-nav__title">{column.title}</div>
                    {column.items.map((link) => (
                      <NavLink
                        className="home-mobile-nav__link"
                        item={link}
                        key={`${column.title}-${link.label}`}
                        onClick={closeNavigation}
                      />
                    ))}
                  </section>
                ))}
              </div>
            </details>
          );
        })}

        <div className="home-mobile-nav__actions">
          <Link to="/login" onClick={closeNavigation}>
            登录
          </Link>
          <Link className="home-button home-button--dark" to="/register" onClick={closeNavigation}>
            开始使用
          </Link>
          <a href={HOME_GITHUB_URL} target="_blank" rel="noreferrer" onClick={closeNavigation}>
            <GithubOutlined /> GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
