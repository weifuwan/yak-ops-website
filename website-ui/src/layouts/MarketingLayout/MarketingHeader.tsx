import brandLogo from '@/assets/img/logo1.png';
import {
  MARKETING_HEADER_ACTIONS,
  MARKETING_NAV_ITEMS,
} from '@/config/marketingNavigation';
import { Link, useLocation } from '@umijs/max';
import type { ReactNode } from 'react';

interface MarketingLinkProps {
  href: string;
  external?: boolean;
  className: string;
  children: ReactNode;
}

function MarketingLink({ href, external = false, className, children }: MarketingLinkProps) {
  if (external) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={href}>
      {children}
    </Link>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 flex-none"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.7761 3 17 3.22386 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BrandLogo() {
  return (
    <Link
      aria-label="Yak Ops 首页"
      className="relative z-[2] flex w-[7.5rem] max-w-full flex-none items-center justify-start outline-offset-[-0.125rem]"
      to="/"
    >
      <img
        alt="Yak Ops"
        className="block h-auto w-full select-none object-contain"
        draggable={false}
        src={brandLogo}
      />
    </Link>
  );
}

export default function MarketingHeader() {
  const location = useLocation();

  return (
    <div
      className="mx-auto flex h-[76px] w-[calc(100%-2rem)] max-w-[90rem] items-center gap-5 sm:w-[calc(100%-3rem)] lg:w-[calc(100%-6rem)]"
      style={{ fontFamily: 'var(--yak-font-marketing)' }}
    >
      <BrandLogo />

      <nav aria-label="主导航" className="ml-auto hidden h-full items-center md:flex">
        <ul className="m-0 flex h-full list-none items-center gap-1 p-0">
          {MARKETING_NAV_ITEMS.map((item) => {
            const active = !item.external &&
              (item.href === '/'
                ? location.pathname === '/'
                : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`));

            return (
              <li className="flex items-center" key={item.key}>
                <MarketingLink
                  className={`inline-flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-[14px] leading-none no-underline transition-colors duration-200 ${
                    active
                      ? 'bg-[#efede7] text-[#242422]'
                      : 'text-[#575650] hover:bg-[#f1efe8] hover:text-[#242422]'
                  }`}
                  external={item.external}
                  href={item.href}
                >
                  <span>{item.label}</span>
                  {item.external ? <ExternalLinkIcon /> : null}
                </MarketingLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-none items-center gap-2 md:ml-3">
        <MarketingLink
          className="hidden h-[38px] items-center justify-center whitespace-nowrap rounded-[8px] border border-[#d8d5cc] bg-transparent px-4 text-[14px] font-medium leading-none text-[#30302e] no-underline transition-colors duration-200 hover:bg-[#f1efe8] sm:inline-flex"
          href={MARKETING_HEADER_ACTIONS.login}
        >
          登录
        </MarketingLink>

        <MarketingLink
          className="inline-flex h-[38px] items-center justify-center whitespace-nowrap rounded-[8px] border border-[#1f1f1d] bg-[#1f1f1d] px-4 text-[14px] font-semibold leading-none text-white no-underline transition-colors duration-200 hover:bg-black"
          href={MARKETING_HEADER_ACTIONS.startUsing}
        >
          开始使用
        </MarketingLink>
      </div>
    </div>
  );
}
