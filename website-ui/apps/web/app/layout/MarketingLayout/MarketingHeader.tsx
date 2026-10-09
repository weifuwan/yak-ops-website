import brandLogo from '@/assets/img/logo2.png';
import {
  MARKETING_HEADER_ACTIONS,
  MARKETING_NAV_ITEMS,
  type MarketingMegaNavItem,
  type MarketingNavIcon,
  type MarketingNavLink,
} from '@/config/marketingNavigation';
import {
  ArrowLeftRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CalendarClock,
  ChevronDown,
  CircleHelp,
  Code2,
  Database,
  ExternalLink,
  FolderKanban,
  GitBranch,
  Github,
  Layers3,
  Menu,
  RadioTower,
  RefreshCcw,
  ServerCog,
  ShieldCheck,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';

const MENU_ICONS: Record<MarketingNavIcon, LucideIcon> = {
  database: Database,
  sync: ArrowLeftRight,
  radio: RadioTower,
  code: Code2,
  workflow: Workflow,
  calendar: CalendarClock,
  quality: ShieldCheck,
  lineage: GitBranch,
  assets: FolderKanban,
  datasets: Layers3,
  services: ServerCog,
  metrics: BarChart3,
  book: BookOpen,
  github: Github,
  releases: RefreshCcw,
  issues: CircleHelp,
};

interface MarketingLinkProps {
  href: string;
  external?: boolean;
  className: string;
  children: ReactNode;
  onClick?: () => void;
}

function MarketingLink({ href, external = false, className, children, onClick }: MarketingLinkProps) {
  if (external) {
    return (
      <a className={className} href={href} onClick={onClick} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} onClick={onClick} to={href}>
      {children}
    </Link>
  );
}

function MenuItemLink({
  link,
  onClick,
  mobile = false,
}: {
  link: MarketingNavLink;
  onClick: () => void;
  mobile?: boolean;
}) {
  const Icon = link.icon ? MENU_ICONS[link.icon] : BookOpen;

  return (
    <MarketingLink
      className={mobile ? 'yak-marketing-mobile-item-link' : 'yak-marketing-menu-item-link'}
      external={link.external}
      href={link.href}
      onClick={onClick}
    >
      <span className="yak-marketing-menu-item-icon">
        <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
      </span>
      <span className="yak-marketing-menu-item-label">{link.label}</span>
      {link.external && <ExternalLink aria-hidden="true" className="yak-marketing-external-icon" size={14} />}
    </MarketingLink>
  );
}

function MegaMenu({ item, onNavigate }: { item: MarketingMegaNavItem; onNavigate: () => void }) {
  return (
    <div aria-label={item.label} className="yak-marketing-mega-menu" id={'yak-marketing-menu-' + item.key}>
      <aside className="yak-marketing-mega-aside">
        <span className="yak-marketing-menu-eyebrow">YAK OPS</span>
        <strong className="yak-marketing-mega-aside-title">
          {item.key === 'products' ? '数据集成' : '开发者资源'}
        </strong>
        <div className="yak-marketing-mega-aside-actions">
          <MarketingLink
            className="yak-marketing-mega-aside-primary"
            external
            href={MARKETING_HEADER_ACTIONS.demo}
            onClick={onNavigate}
          >
            线上体验
            <ArrowUpRight aria-hidden="true" size={18} />
          </MarketingLink>
          <MarketingLink
            className="yak-marketing-mega-aside-secondary"
            href={MARKETING_HEADER_ACTIONS.startUsing}
            onClick={onNavigate}
          >
            <BookOpen aria-hidden="true" size={17} />
            快速开始
          </MarketingLink>
        </div>
      </aside>

      <div
        className={
          item.columns.length >= 3
            ? 'yak-marketing-mega-columns yak-marketing-mega-columns-three'
            : 'yak-marketing-mega-columns'
        }
      >
        {item.columns.map((column) => (
          <section className="yak-marketing-mega-column" key={column.title}>
            <h2 className="yak-marketing-menu-eyebrow">{column.title}</h2>
            <ul className="yak-marketing-mega-list">
              {column.items.map((link) => (
                <li key={link.href}>
                  <MenuItemLink link={link} onClick={onNavigate} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function MarketingHeader() {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24);

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    return () => window.removeEventListener('scroll', updateScroll);
  }, [pathname]);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const closeAllMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const openedItem = MARKETING_NAV_ITEMS.find((item) => item.kind === 'mega' && item.key === openMenu);
  const activeMegaMenu = openedItem?.kind === 'mega' ? openedItem : null;
  const isDark = pathname === '/' && !isScrolled && !openMenu && !mobileOpen;

  return (
    <header
      className={isDark ? 'yak-marketing-site-header is-dark' : 'yak-marketing-site-header'}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpenMenu(null);
        }
      }}
      onMouseLeave={() => setOpenMenu(null)}
      ref={headerRef}
    >
      <div className="yak-marketing-header-inner">
        <MarketingLink className="yak-marketing-brand" href="/" onClick={closeAllMenus}>
          <img alt="Yak Ops" draggable={false} src={brandLogo} />
        </MarketingLink>

        <nav aria-label="Primary navigation" className="yak-marketing-desktop-nav">
          <ul className="yak-marketing-desktop-nav-list">
            {MARKETING_NAV_ITEMS.map((item) => (
              <li key={item.key}>
                {item.kind === 'mega' ? (
                  <button
                    aria-controls={openMenu === item.key ? 'yak-marketing-menu-' + item.key : undefined}
                    aria-expanded={openMenu === item.key}
                    aria-haspopup="true"
                    className={
                      openMenu === item.key
                        ? 'yak-marketing-nav-link yak-marketing-nav-link-active'
                        : 'yak-marketing-nav-link'
                    }
                    onClick={() => setOpenMenu(openMenu === item.key ? null : item.key)}
                    onMouseEnter={() => setOpenMenu(item.key)}
                    type="button"
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" size={14} strokeWidth={1.8} />
                  </button>
                ) : (
                  <MarketingLink
                    className="yak-marketing-nav-link"
                    external={item.external}
                    href={item.href}
                    onClick={closeAllMenus}
                  >
                    {item.label}
                  </MarketingLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="yak-marketing-header-actions">
          <MarketingLink
            className="yak-marketing-header-cta"
            href={MARKETING_HEADER_ACTIONS.startUsing}
            onClick={closeAllMenus}
          >
            Get Started
          </MarketingLink>
          <button
            aria-controls="yak-marketing-mobile-menu"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? '关闭导航' : '打开导航'}
            className="yak-marketing-mobile-toggle"
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setOpenMenu(null);
            }}
            type="button"
          >
            {mobileOpen ? <X aria-hidden="true" size={23} /> : <Menu aria-hidden="true" size={23} />}
          </button>
        </div>

        {activeMegaMenu && !mobileOpen && (
          <div className="yak-marketing-mega-layer">
            <MegaMenu item={activeMegaMenu} onNavigate={closeAllMenus} />
          </div>
        )}
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="yak-marketing-mobile-panel" id="yak-marketing-mobile-menu">
          {MARKETING_NAV_ITEMS.map((item) =>
            item.kind === 'mega' ? (
              <div className="yak-marketing-mobile-section" key={item.key}>
                <button
                  aria-expanded={openMenu === item.key}
                  className="yak-marketing-mobile-section-trigger"
                  onClick={() => setOpenMenu(openMenu === item.key ? null : item.key)}
                  type="button"
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={openMenu === item.key ? 'yak-marketing-chevron-up' : undefined}
                    size={17}
                  />
                </button>
                {openMenu === item.key && (
                  <div className="yak-marketing-mobile-submenu">
                    {item.columns.map((column) => (
                      <section key={column.title}>
                        <h2 className="yak-marketing-menu-eyebrow">{column.title}</h2>
                        {column.items.map((link) => (
                          <MenuItemLink key={link.href} link={link} mobile onClick={closeAllMenus} />
                        ))}
                      </section>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <MarketingLink
                className="yak-marketing-mobile-direct-link"
                external={item.external}
                href={item.href}
                key={item.key}
                onClick={closeAllMenus}
              >
                {item.label}
              </MarketingLink>
            ),
          )}
          <MarketingLink
            className="yak-marketing-mobile-demo"
            external
            href={MARKETING_HEADER_ACTIONS.demo}
            onClick={closeAllMenus}
          >
            线上体验
            <ArrowUpRight aria-hidden="true" size={18} />
          </MarketingLink>
        </nav>
      )}
    </header>
  );
}
