import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
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
  code: Code2,
  workflow: Settings2,
  metrics: FileCode2,
  github: Github,
  releases: RefreshCcw,
};

const MENU_LINK_CLASS =
  'group flex min-h-[72px] min-w-0 items-center gap-3 rounded-lg px-2 py-2 text-[#12121a] no-underline transition-colors duration-200 hover:bg-white/65 focus-visible:bg-white/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]';

function DeveloperLink({ link, onNavigate }: { link: MarketingNavLink; onNavigate: () => void }) {
  const Icon = (link.icon && developerIcons[link.icon]) || BookOpen;
  const content = (
    <>
      <span className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-white text-[#076ff2]">
        <Icon aria-hidden="true" size={22} strokeWidth={1.7} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] leading-[1.25] font-medium text-[#14141c] group-hover:text-[#086cf4]">
          {link.label}
        </span>
        {link.description && (
          <span className="mt-1 block text-[14px] leading-[1.35] text-[#82829e]">{link.description}</span>
        )}
      </span>
      {link.external && (
        <ArrowUpRight aria-hidden="true" className="shrink-0 self-start text-[#9ca5b5]" size={13} />
      )}
    </>
  );

  return link.external ? (
    <a className={MENU_LINK_CLASS} href={link.href} onClick={onNavigate} rel="noopener noreferrer" target="_blank">
      {content}
    </a>
  ) : (
    <Link className={MENU_LINK_CLASS} onClick={onNavigate} to={link.href}>
      {content}
    </Link>
  );
}

/**
 * Match the Products mega menu's quiet split layout.
 * Keep just the primary developer journeys visible; the full docs remain
 * accessible from the footer, without a second grid of oversized cards.
 */
export default function DevelopersMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      aria-label="Developers"
      className="grid grid-cols-[340px_minmax(0,1fr)] bg-[linear-gradient(145deg,#f4f4f5_20%,#e3eef9_100%)] text-[#151b34]"
    >
      <aside className="flex min-h-[542px] min-w-0 flex-col px-7 pt-7 pb-5">
        <h2 className="m-0 text-[12px] leading-5 font-medium tracking-[0.04em] text-[#83849f]">DEVELOPERS</h2>

        <div className="mt-5 flex flex-col gap-2">
          {MARKETING_DEVELOPER_START_LINKS.map((link) => (
            <DeveloperLink key={link.href} link={link} onNavigate={onNavigate} />
          ))}
          <a
            className={MENU_LINK_CLASS}
            href={MARKETING_HEADER_ACTIONS.demo}
            onClick={onNavigate}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-white text-[#076ff2]">
              <ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.7} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[16px] leading-[1.25] font-medium text-[#14141c] group-hover:text-[#086cf4]">
                线上体验
              </span>
              <span className="mt-1 block text-[14px] leading-[1.35] text-[#82829e]">在线探索 Yak Ops</span>
            </span>
          </a>
        </div>

        <div className="mt-5 border-t border-[#b8d7fd] pt-5">
          <h2 className="m-0 text-[12px] leading-5 font-medium tracking-[0.04em] text-[#83849f]">OPEN SOURCE</h2>
          <div className="mt-2 flex flex-col gap-1">
            {MARKETING_DEVELOPER_OPEN_SOURCE.map((link) => (
              <DeveloperLink key={link.href} link={link} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        <div className="mt-auto pt-3">
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

      <div className="m-4 ml-0 min-w-0 rounded-2xl bg-white/50 px-6 py-7">
        <div className="grid grid-cols-2 gap-x-8">
          <section className="min-w-0">
            <h2 className="m-0 text-[12px] leading-5 font-medium tracking-[0.04em] text-[#777994]">
              DEPLOYMENT
            </h2>
            <div className="mt-4 flex flex-col gap-5">
              {MARKETING_DEVELOPER_GUIDES.slice(0, 2).map((link) => (
                <DeveloperLink key={link.href} link={link} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
          <section className="min-w-0">
            <h2 className="m-0 text-[12px] leading-5 font-medium tracking-[0.04em] text-[#777994]">
              DEVELOPMENT
            </h2>
            <div className="mt-4 flex flex-col gap-5">
              {MARKETING_DEVELOPER_GUIDES.slice(2).map((link) => (
                <DeveloperLink key={link.href} link={link} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
