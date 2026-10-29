import { Github, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import brandLogo from '@/assets/img/logo2.png';

const footerGroups = [
  {
    title: 'Platform',
    links: [
      { label: 'Data Sources', href: '/product/data-sources' },
      { label: 'Batch Sync', href: '/product/batch-sync' },
      { label: 'Realtime Sync', href: '/product/realtime-sync' },
      { label: 'Data Development', href: '/product/data-development' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Quick Start', href: '/developers/quick-start' },
      { label: 'Deployment', href: '/developers/deployment' },
      { label: 'API Guide', href: '/developers/api' },
      { label: 'Configuration', href: '/developers/configuration' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Releases', href: 'https://github.com/weifuwan/yak-ops/releases' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com/weifuwan/yak-ops' },
      { label: 'Contributing', href: '/developers/contributing' },
      { label: 'Report an Issue', href: 'https://github.com/weifuwan/yak-ops/issues' },
    ],
  },
] as const;

const footerLinkClass =
  'inline-flex min-h-8 items-center text-[14px] leading-6 text-[#5A6881] no-underline transition-colors duration-200 hover:text-[#1769CC] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F6FED]';

/**
 * Shared marketing footer: only real Yak Ops routes, source repositories and
 * community links. No managed service, customer, or compliance claims.
 */
export default function MarketingFooter() {
  return (
    <footer className="mt-auto border-t border-[#E3E9F2] bg-[#F8FAFC] text-[#17223C]">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-14 pb-7 sm:px-12 lg:px-16 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
          <div className="max-w-[350px]">
            <Link
              aria-label="Yak Ops home"
              className="inline-flex w-[148px] items-center rounded-md outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#2F6FED]"
              to="/"
            >
              <img alt="Yak Ops" className="block h-auto w-full object-contain" src={brandLogo} />
            </Link>
            <p className="m-0 mt-5 max-w-[320px] text-[14px] leading-6 text-[#5A6881]">
              Open-source data integration, development, and operations. Built in the open.
            </p>
            <a
              className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#D9E3EF] bg-white px-3 text-[13px] font-semibold text-[#263E61] no-underline transition-colors duration-200 hover:border-[#A8C7F1] hover:text-[#1769CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F6FED]"
              href="https://github.com/weifuwan/yak-ops"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github aria-hidden="true" size={17} strokeWidth={1.8} />
              View on GitHub
              <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.8} />
            </a>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 sm:gap-x-6"
          >
            {footerGroups.map((group) => (
              <div className="min-w-0" key={group.title}>
                <h2 className="m-0 text-[14px] font-semibold text-[#1B2E4D]">{group.title}</h2>
                <ul className="m-0 mt-4 flex list-none flex-col gap-1 p-0">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('https://') ? (
                        <a
                          className={footerLinkClass}
                          href={link.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link className={footerLinkClass} to={link.href}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[#E3E9F2] pt-6 text-[13px] leading-5 text-[#66748C] sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© {new Date().getFullYear()} Yak Ops. Built in the open.</p>
          <a
            className="w-fit text-[#66748C] no-underline transition-colors duration-200 hover:text-[#1769CC] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F6FED]"
            href="https://github.com/weifuwan/yak-ops/blob/main/LICENSE"
            rel="noopener noreferrer"
            target="_blank"
          >
            Apache License 2.0
          </a>
        </div>
      </div>
    </footer>
  );
}
