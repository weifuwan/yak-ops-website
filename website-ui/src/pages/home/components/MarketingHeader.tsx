import {
  DownOutlined,
  GithubOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link } from '@umijs/max';
import { type FocusEvent, useState } from 'react';

import {
  HOME_GITHUB_URL,
  HOME_NAV_ITEMS,
  type HomeNavLink,
} from '../constants';

interface NavLinkProps {
  item: HomeNavLink;
  className?: string;
  onClick?: () => void;
}

function NavLink({ item, className, onClick }: NavLinkProps) {
  const content = <span>{item.label}</span>;

  if (item.external) {
    return (
      <a
        className={className}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
      >
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

function YakOpsLogo() {
  return (
    <span className="flex items-center gap-[7px]">
      <svg
        aria-hidden="true"
        className="h-[28px] w-[28px] shrink-0 text-[#d97757]"
        viewBox="0 0 32 32"
        fill="none"
      >
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        >
          <path d="M16 2v9" />
          <path d="M16 21v9" />
          <path d="M2 16h9" />
          <path d="M21 16h9" />

          <path d="M6.1 6.1l6.35 6.35" />
          <path d="M19.55 19.55l6.35 6.35" />
          <path d="M25.9 6.1l-6.35 6.35" />
          <path d="M12.45 19.55L6.1 25.9" />

          <path d="M10.65 3.1l3.45 8.3" />
          <path d="M17.9 20.6l3.45 8.3" />
          <path d="M28.9 10.65l-8.3 3.45" />
          <path d="M11.4 17.9l-8.3 3.45" />

          <path d="M21.35 3.1l-3.45 8.3" />
          <path d="M14.1 20.6l-3.45 8.3" />
          <path d="M28.9 21.35l-8.3-3.45" />
          <path d="M11.4 14.1l-8.3-3.45" />
        </g>

        <circle cx="16" cy="16" r="2.1" fill="currentColor" />
      </svg>

      <span
        className="whitespace-nowrap text-[28px] font-medium leading-none tracking-[-0.035em] text-[#171716]"
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        Yak Ops
      </span>
    </span>
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
    if (
      !event.currentTarget.contains(
        event.relatedTarget as Node | null,
      )
    ) {
      setActiveMenu(null);
    }
  };

  return (
    <header
      className="relative z-50 w-full bg-[#f7f6f2]"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/*
       * desktop 使用 1fr / auto / 1fr，
       * 不管左右区域多宽，中间导航始终真正居中。
       */}
      <div className="mx-auto grid h-[82px] w-full max-w-[1450px] grid-cols-[1fr_auto_1fr] items-center px-6 xl:px-8">
        {/* Logo */}
        <div className="flex min-w-0 items-center justify-start">
          <Link
            aria-label="Yak Ops 首页"
            className="inline-flex items-center no-underline"
            to="/"
            onClick={closeNavigation}
          >
            <YakOpsLogo />
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav
          aria-label="主导航"
          className="hidden h-full items-center justify-center gap-[30px] lg:flex"
        >
          {HOME_NAV_ITEMS.map((item) => {
            if (item.kind === 'link') {
              if (item.external) {
                return (
                  <a
                    key={item.key}
                    className="flex h-full items-center whitespace-nowrap text-[15px] font-normal text-[#171716] transition-opacity duration-200 hover:text-[#171716] hover:opacity-60"
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
                  className="flex h-full items-center whitespace-nowrap text-[15px] font-normal text-[#171716] transition-opacity duration-200 hover:text-[#171716] hover:opacity-60"
                  to={item.href}
                  onMouseEnter={() => setActiveMenu(null)}
                >
                  {item.label}
                </Link>
              );
            }

            const open = activeMenu === item.key;

            const menuWidth = Math.min(
              Math.max(item.columns.length * 210, 320),
              960,
            );

            return (
              <div
                key={item.key}
                className="relative flex h-full items-center"
                onBlur={handleMenuBlur}
                onFocus={() => setActiveMenu(item.key)}
                onMouseEnter={() => setActiveMenu(item.key)}
              >
                <button
                  aria-expanded={open}
                  aria-haspopup="true"
                  className="group flex h-full items-center gap-[6px] whitespace-nowrap border-0 bg-transparent p-0 text-[15px] font-normal text-[#171716] outline-none transition-opacity duration-200 hover:opacity-60"
                  type="button"
                  onClick={() =>
                    setActiveMenu((current) =>
                      current === item.key ? null : item.key,
                    )
                  }
                >
                  <span>{item.label}</span>

                  <DownOutlined
                    aria-hidden="true"
                    className={`text-[9px] transition-transform duration-200 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Mega menu */}
                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-150 ${
                    open
                      ? 'pointer-events-auto translate-y-0 opacity-100'
                      : 'pointer-events-none -translate-y-1 opacity-0'
                  }`}
                >
                  <div
                    className="overflow-hidden rounded-[12px] border border-[#dedbd3] bg-[#fffefa] shadow-[0_18px_55px_rgba(27,27,24,0.10)]"
                    style={{ width: menuWidth }}
                  >
                    <div
                      className="grid p-6"
                      style={{
                        gridTemplateColumns: `repeat(${item.columns.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {item.columns.map((column, index) => (
                        <section
                          key={column.title}
                          className={`min-w-0 px-5 first:pl-1 last:pr-1 ${
                            index > 0
                              ? 'border-l border-[#e5e2da]'
                              : ''
                          }`}
                        >
                          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.08em] text-[#77746d]">
                            {column.title}
                          </div>

                          <div className="flex flex-col">
                            {column.items.map((link) => (
                              <NavLink
                                key={`${column.title}-${link.label}`}
                                className="rounded-[6px] py-[7px] text-[15px] leading-[1.35] text-[#171716] transition-opacity duration-150 hover:text-[#171716] hover:opacity-55"
                                item={link}
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

        {/* Desktop actions */}
        <div className="hidden items-center justify-end gap-[10px] lg:flex">
          <Link
            className="mr-2 whitespace-nowrap text-[15px] text-[#171716] transition-opacity duration-200 hover:text-[#171716] hover:opacity-60"
            to="/login"
          >
            登录
          </Link>

          <a
            className="inline-flex h-[38px] items-center justify-center gap-2 whitespace-nowrap rounded-[9px] border border-[#d8d4ca] bg-transparent px-[17px] text-[15px] font-medium text-[#292824] transition-colors duration-200 hover:border-[#aaa69d] hover:bg-[#f1efe9] hover:text-[#292824]"
            href={HOME_GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            <GithubOutlined />
            GitHub
          </a>

          <Link
            className="inline-flex h-[38px] items-center justify-center whitespace-nowrap rounded-[9px] border border-[#171716] bg-[#171716] px-[18px] text-[15px] font-medium text-white transition-colors duration-200 hover:border-[#343431] hover:bg-[#343431] hover:text-white"
            to="/register"
          >
            开始使用
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="col-start-3 flex items-center justify-end lg:hidden">
          <button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? '关闭导航' : '打开导航'}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-0 bg-transparent text-[20px] text-[#171716]"
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <MenuOutlined />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`absolute left-0 top-full w-full border-t border-[#e5e2da] bg-[#f7f6f2] shadow-[0_20px_40px_rgba(0,0,0,0.06)] lg:hidden ${
          mobileOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="mx-auto max-h-[calc(100vh-82px)] max-w-[720px] overflow-y-auto px-6 py-5">
          <div className="flex flex-col">
            {HOME_NAV_ITEMS.map((item) => {
              if (item.kind === 'link') {
                if (item.external) {
                  return (
                    <a
                      key={item.key}
                      className="border-b border-[#e5e2da] py-4 text-[17px] font-medium text-[#171716]"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeNavigation}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    className="border-b border-[#e5e2da] py-4 text-[17px] font-medium text-[#171716]"
                    to={item.href}
                    onClick={closeNavigation}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <details
                  key={item.key}
                  className="group border-b border-[#e5e2da]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[17px] font-medium text-[#171716] [&::-webkit-details-marker]:hidden">
                    <span>{item.label}</span>

                    <DownOutlined className="text-[10px] transition-transform duration-200 group-open:rotate-180" />
                  </summary>

                  <div className="pb-5">
                    {item.columns.map((column) => (
                      <section
                        key={column.title}
                        className="mb-5 last:mb-0"
                      >
                        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#77746d]">
                          {column.title}
                        </div>

                        <div className="flex flex-col">
                          {column.items.map((link) => (
                            <NavLink
                              key={`${column.title}-${link.label}`}
                              className="py-2 text-[15px] text-[#171716]"
                              item={link}
                              onClick={closeNavigation}
                            />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-6">
            <Link
              className="flex h-11 items-center justify-center rounded-[9px] border border-[#d8d4ca] text-[15px] font-medium text-[#171716]"
              to="/login"
              onClick={closeNavigation}
            >
              登录
            </Link>

            <a
              className="flex h-11 items-center justify-center gap-2 rounded-[9px] border border-[#d8d4ca] text-[15px] font-medium text-[#171716]"
              href={HOME_GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              onClick={closeNavigation}
            >
              <GithubOutlined />
              GitHub
            </a>

            <Link
              className="flex h-11 items-center justify-center rounded-[9px] bg-[#171716] text-[15px] font-medium text-white"
              to="/register"
              onClick={closeNavigation}
            >
              开始使用
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}