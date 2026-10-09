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

const HEADER_CLASS =
  'sticky top-0 z-[1200] w-full border-b [font-family:var(--yak-font-marketing)] transition-[background-color,border-color,color,box-shadow] duration-[240ms] ease-in-out';

const NAV_LINK_CLASS =
  'inline-flex min-h-9 cursor-pointer items-center justify-center gap-[7px] whitespace-nowrap rounded-full border border-transparent bg-transparent px-[13px] py-2 text-sm font-medium leading-[18px] no-underline transition-[background-color,border-color,color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016afb]';

const NAV_LINK_LIGHT_CLASS =
  'text-[#162044] hover:border-[#d9dfe8] hover:bg-[#f7f8fb] hover:text-[#162044] focus-visible:border-[#d9dfe8] focus-visible:bg-[#f7f8fb]';

const NAV_LINK_DARK_CLASS =
  'text-white hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:border-white/30 focus-visible:bg-white/10';

const MENU_LINK_CLASS =
  'flex items-center gap-2.5 rounded-[11px] px-[9px] py-[7px] text-[#162044] no-underline transition-[background-color,color] duration-200 hover:bg-[#f3f7fc] hover:text-[#016afb] focus-visible:bg-[#f3f7fc] focus-visible:text-[#016afb] focus-visible:outline-none';

const MENU_EYEBROW_CLASS = 'block text-[11px] font-semibold leading-[18px] tracking-[0.06em] text-[#828aa0]';

const MENU_ACTION_CLASS =
  'inline-flex min-h-12 items-center gap-3 rounded-[10px] border px-4 text-sm font-semibold no-underline transition-[background-color,border-color,transform] duration-200';

const MOBILE_NAV_LINK_CLASS =
  'flex min-h-[49px] w-full cursor-pointer items-center justify-between border-0 bg-transparent py-2.5 text-[15px] font-semibold text-[#162044] no-underline';

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
      className={`${MENU_LINK_CLASS} ${mobile ? 'min-h-12' : 'min-h-[53px]'}`}
      external={link.external}
      href={link.href}
      onClick={onClick}
    >
      <span className="inline-flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-[11px] border border-[#eef1f6] bg-[#fafbfe] text-[#016afb]">
        <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
      </span>
      <span className="min-w-0 text-sm font-medium leading-[1.4]">{link.label}</span>
      {link.external && <ExternalLink aria-hidden="true" className="ml-auto shrink-0 text-[#8b95a7]" size={14} />}
    </MarketingLink>
  );
}

function MegaMenu({ item, onNavigate }: { item: MarketingMegaNavItem; onNavigate: () => void }) {
  return (
    <div
      aria-label={item.label}
      className="grid max-h-[calc(100vh-85px)] grid-cols-[270px_minmax(0,1fr)] overflow-hidden rounded-[20px] border border-[#e7ebf1] bg-white text-[#162044] shadow-[0_18px_45px_rgba(22,32,68,0.14)] transition-[opacity,transform] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] starting:-translate-y-2 starting:opacity-0 motion-reduce:transition-none"
      id={'yak-marketing-menu-' + item.key}
    >
      <aside className="flex min-w-0 flex-col bg-[linear-gradient(145deg,#f4f6fa_10%,#e8f0f9_100%)] px-6 py-7">
        <span className={`${MENU_EYEBROW_CLASS} mb-4`}>YAK OPS</span>
        <strong className="text-[22px] font-semibold leading-[1.3] text-[#162044]">
          {item.key === 'products' ? '数据集成' : '开发者资源'}
        </strong>
        <div className="mt-auto grid gap-3 pt-[52px]">
          <MarketingLink
            className={`${MENU_ACTION_CLASS} justify-between border-[#016afb] bg-[#016afb] text-white hover:-translate-y-px hover:bg-[#0056dc] hover:text-white focus-visible:bg-[#0056dc] focus-visible:text-white`}
            external
            href={MARKETING_HEADER_ACTIONS.demo}
            onClick={onNavigate}
          >
            线上体验
            <ArrowUpRight aria-hidden="true" size={18} />
          </MarketingLink>
          <MarketingLink
            className={`${MENU_ACTION_CLASS} justify-start border-[#dce3ef] bg-white/80 text-[#162044] hover:border-[#b5c5e2] hover:bg-white hover:text-[#162044] focus-visible:border-[#b5c5e2] focus-visible:bg-white`}
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
            ? 'grid min-w-0 grid-cols-3 gap-[22px] overflow-y-auto bg-white p-7'
            : 'grid min-w-0 grid-cols-2 gap-[22px] overflow-y-auto bg-white p-7'
        }
      >
        {item.columns.map((column) => (
          <section className="min-w-0" key={column.title}>
            <h2 className={`${MENU_EYEBROW_CLASS} mb-4`}>{column.title}</h2>
            <ul className="m-0 grid list-none gap-[7px] p-0">
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
      className={`${HEADER_CLASS} ${isDark ? 'border-transparent bg-[#162044] text-white' : 'border-[#e6e8eb] bg-white text-[#162044]'}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpenMenu(null);
        }
      }}
      onMouseLeave={() => setOpenMenu(null)}
      ref={headerRef}
    >
      <div className="relative mx-auto grid h-[60px] w-full max-w-[1440px] grid-cols-[minmax(140px,1fr)_auto_minmax(140px,1fr)] items-center px-[clamp(24px,4vw,64px)] max-lg:grid-cols-[minmax(0,1fr)_auto] max-[560px]:px-5">
        <MarketingLink
          className="inline-flex w-[140px] max-w-full items-center rounded-md outline-offset-4 max-[560px]:w-[124px]"
          href="/"
          onClick={closeAllMenus}
        >
          <img
            alt="Yak Ops"
            draggable={false}
            src={brandLogo}
            className={
              isDark
                ? 'block h-auto w-full object-contain brightness-0 invert transition-[filter] duration-[240ms]'
                : 'block h-auto w-full object-contain transition-[filter] duration-[240ms]'
            }
          />
        </MarketingLink>

        <nav aria-label="Primary navigation" className="h-full max-lg:hidden">
          <ul className="m-0 flex h-full list-none items-center justify-center gap-2 p-0">
            {MARKETING_NAV_ITEMS.map((item) => (
              <li key={item.key}>
                {item.kind === 'mega' ? (
                  <button
                    aria-controls={openMenu === item.key ? 'yak-marketing-menu-' + item.key : undefined}
                    aria-expanded={openMenu === item.key}
                    aria-haspopup="true"
                    className={`${NAV_LINK_CLASS} ${isDark ? NAV_LINK_DARK_CLASS : NAV_LINK_LIGHT_CLASS} ${openMenu === item.key ? 'border-[#d9dfe8] bg-[#f7f8fb] text-[#162044]' : ''}`}
                    onClick={() => setOpenMenu(openMenu === item.key ? null : item.key)}
                    onMouseEnter={() => setOpenMenu(item.key)}
                    type="button"
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" size={14} strokeWidth={1.8} />
                  </button>
                ) : (
                  <MarketingLink
                    className={`${NAV_LINK_CLASS} ${isDark ? NAV_LINK_DARK_CLASS : NAV_LINK_LIGHT_CLASS}`}
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

        <div className="flex shrink-0 items-center justify-end gap-3">
          <MarketingLink
            className="inline-flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-lg border border-[#016afb] bg-[#016afb] px-5 text-sm font-semibold leading-none text-white no-underline transition-[background-color,border-color,transform] duration-200 hover:-translate-y-px hover:border-[#0056dc] hover:bg-[#0056dc] hover:text-white focus-visible:border-[#0056dc] focus-visible:bg-[#0056dc] focus-visible:text-white max-[560px]:hidden"
            href={MARKETING_HEADER_ACTIONS.startUsing}
            onClick={closeAllMenus}
          >
            Get Started
          </MarketingLink>
          <button
            aria-controls="yak-marketing-mobile-menu"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? '关闭导航' : '打开导航'}
            className={`hidden h-10 w-10 cursor-pointer items-center justify-center rounded-[9px] border-0 bg-transparent max-lg:inline-flex ${isDark ? 'text-white hover:bg-white/10 focus-visible:bg-white/10' : 'text-[#162044] hover:bg-[#f0f3f8] focus-visible:bg-[#f0f3f8]'}`}
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
          <div className="absolute top-[calc(100%-1px)] left-1/2 z-[2] hidden w-[1100px] max-w-[calc(100vw-48px)] -translate-x-1/2 pt-3 lg:block">
            <MegaMenu item={activeMegaMenu} onNavigate={closeAllMenus} />
          </div>
        )}
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full flex max-h-[calc(100vh-60px)] flex-col overflow-y-auto border-t border-[#e6e8eb] bg-white px-6 pt-3 pb-6 text-[#162044] shadow-[0_16px_32px_rgba(22,32,68,0.1)] transition-[opacity,transform] duration-200 starting:-translate-y-2 starting:opacity-0 motion-reduce:transition-none"
          id="yak-marketing-mobile-menu"
        >
          {MARKETING_NAV_ITEMS.map((item) =>
            item.kind === 'mega' ? (
              <div className="border-b border-[#edf0f5]" key={item.key}>
                <button
                  aria-expanded={openMenu === item.key}
                  className={MOBILE_NAV_LINK_CLASS}
                  onClick={() => setOpenMenu(openMenu === item.key ? null : item.key)}
                  type="button"
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={openMenu === item.key ? 'rotate-180' : undefined}
                    size={17}
                  />
                </button>
                {openMenu === item.key && (
                  <div className="grid gap-[22px] pt-2 pb-5">
                    {item.columns.map((column) => (
                      <section key={column.title}>
                        <h2 className={`${MENU_EYEBROW_CLASS} mb-[5px]`}>{column.title}</h2>
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
                className={MOBILE_NAV_LINK_CLASS}
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
            className="mt-5 flex min-h-11 items-center justify-center gap-[9px] rounded-[9px] border border-[#dce3ef] text-sm font-semibold text-[#162044] no-underline"
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
