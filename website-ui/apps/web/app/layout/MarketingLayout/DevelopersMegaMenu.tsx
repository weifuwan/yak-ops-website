import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CircleHelp,
  Code2,
  Container,
  FileCode2,
  Github,
  RefreshCcw,
  ServerCog,
  Settings2,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  MARKETING_DEVELOPER_GUIDES,
  MARKETING_DEVELOPER_OPEN_SOURCE,
  MARKETING_DEVELOPER_START_LINKS,
  MARKETING_HEADER_ACTIONS,
  type MarketingNavIcon,
  type MarketingNavLink,
} from '@/config/marketingNavigation';

const developerIcons: Partial<Record<MarketingNavIcon, LucideIcon>> = {
  book: BookOpen,
  services: ServerCog,
  database: Container,
  code: Code2,
  workflow: Settings2,
  metrics: FileCode2,
  github: Github,
  releases: RefreshCcw,
  issues: CircleHelp,
};

function DeveloperLink({
  link,
  onNavigate,
  compact = false,
}: {
  link: MarketingNavLink;
  onNavigate: () => void;
  compact?: boolean;
}) {
  const Icon = (link.icon && developerIcons[link.icon]) || BookOpen;
  const className = `group flex min-w-0 items-center gap-3 rounded-xl border border-white/80 bg-white/85 px-3 py-3 text-[#152244] no-underline transition-[background-color,border-color] duration-200 hover:border-[#c7ddfa] hover:bg-[#eaf3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] ${compact ? 'min-h-[76px]' : 'min-h-[82px]'}`;
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-[#e6edf7] bg-[#f8fbff] text-[#1663da]">
        <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] leading-5 font-semibold group-hover:text-[#0b59c0]">{link.label}</span>
        {link.description && (
          <span className="mt-1 block text-[13px] leading-[1.35] text-[#66718a]">{link.description}</span>
        )}
      </span>
      {link.external && (
        <ArrowUpRight aria-hidden="true" className="shrink-0 self-start text-[#8b95aa]" size={14} strokeWidth={1.7} />
      )}
    </>
  );

  return link.external ? (
    <a className={className} href={link.href} onClick={onNavigate} rel="noopener noreferrer" target="_blank">
      {content}
    </a>
  ) : (
    <Link className={className} onClick={onNavigate} to={link.href}>
      {content}
    </Link>
  );
}

/**
 * Developer navigation follows the same shared frame, gradient sidebar and
 * card-based hierarchy as Products and Resources. Desktop/mobile links come
 * from the same navigation configuration.
 */
export default function DevelopersMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      aria-label="Developers"
      className="grid grid-cols-[290px_minmax(0,1fr)] bg-[linear-gradient(140deg,#f6f7fa_10%,#e5eef9_100%)] text-[#152244]"
    >
      <aside className="flex min-h-[520px] min-w-0 flex-col bg-[linear-gradient(150deg,#f3f5f9_0%,#e2edf9_100%)] px-6 py-7">
        <p className="m-0 text-[12px] leading-5 font-medium tracking-[0.06em] text-[#777f9a]">DEVELOPERS</p>
        <h2 className="m-0 mt-3 text-[23px] leading-[1.3] font-semibold text-[#19284b]">开发者中心</h2>
        <p className="m-0 mt-2 text-[14px] leading-[1.6] text-[#65708a]">从快速部署到二次开发，找到所需资源。</p>

        <div className="mt-7 flex flex-col gap-3">
          <Link
            className="group flex min-h-[60px] items-center justify-between rounded-xl bg-[#086bf5] px-4 text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#045dcc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086bf5]"
            onClick={onNavigate}
            to={MARKETING_DEVELOPER_START_LINKS[0].href}
          >
            <span className="flex items-center gap-3">
              <BookOpen aria-hidden="true" size={19} strokeWidth={1.8} />
              快速开始
            </span>
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
          </Link>
          <Link
            className="group flex min-h-[60px] items-center gap-3 rounded-xl border border-[#d9e2f0] bg-white/90 px-4 text-[15px] font-medium text-[#19284b] no-underline transition-colors duration-200 hover:border-[#bcd2f3] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086bf5]"
            onClick={onNavigate}
            to={MARKETING_DEVELOPER_START_LINKS[1].href}
          >
            <ServerCog aria-hidden="true" className="text-[#1168db]" size={19} strokeWidth={1.8} />
            Docker Compose
          </Link>
          <a
            className="group flex min-h-[60px] items-center justify-between rounded-xl border border-[#d9e2f0] bg-white/60 px-4 text-[15px] font-medium text-[#19284b] no-underline transition-colors duration-200 hover:border-[#bcd2f3] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086bf5]"
            href={MARKETING_HEADER_ACTIONS.demo}
            onClick={onNavigate}
            rel="noopener noreferrer"
            target="_blank"
          >
            线上体验
            <ArrowUpRight aria-hidden="true" className="text-[#1168db]" size={17} strokeWidth={1.8} />
          </a>
        </div>

        <div className="mt-auto border-t border-[#ccd9eb] pt-5">
          <Link
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#1559b6] no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086bf5]"
            onClick={onNavigate}
            to="/docs"
          >
            查看完整文档
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </aside>

      <div className="min-w-0 px-6 py-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="m-0 text-[12px] leading-5 font-medium tracking-[0.06em] text-[#777f9a]">
            DEVELOPMENT GUIDES
          </h2>
          <Link
            className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-[#1559b6] no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086bf5]"
            onClick={onNavigate}
            to="/docs"
          >
            View All Docs
            <ArrowRight aria-hidden="true" size={14} />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {MARKETING_DEVELOPER_GUIDES.map((link) => (
            <DeveloperLink key={link.href} link={link} onNavigate={onNavigate} />
          ))}
        </div>

        <div className="mt-6 border-t border-[#dbe4f0] pt-5">
          <h2 className="m-0 mb-4 text-[12px] leading-5 font-medium tracking-[0.06em] text-[#777f9a]">
            OPEN SOURCE
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {MARKETING_DEVELOPER_OPEN_SOURCE.map((link) => (
              <DeveloperLink compact key={link.href} link={link} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
