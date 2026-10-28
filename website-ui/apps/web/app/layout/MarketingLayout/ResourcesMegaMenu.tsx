import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { MARKETING_RESOURCE_ARTICLES, MARKETING_RESOURCE_LINKS } from '@/config/marketingNavigation';

const resourceIcons = ['case-studies.svg', 'learning-center.svg', 'events.svg', 'compare.svg', 'newsroom.svg'] as const;

/** Reference Resources drop-down, including original copy and source artwork. */
export default function ResourcesMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      aria-label="Resources"
      className="grid max-h-[calc(100vh-80px)] grid-cols-[225px_minmax(0,1fr)] overflow-y-auto rounded-b-[24px] rounded-t-[4px] bg-[linear-gradient(155deg,#fff_6%,#f9fbff_44%,#e6f0fa_100%)] text-[#10131e] shadow-[0_12px_32px_rgba(15,31,56,0.16)]"
      id="yak-marketing-menu-resources"
    >
      <aside className="min-w-0 px-5 py-6 pr-1">
        <h2 className="m-0 text-[14px] leading-5 font-medium tracking-[0.04em] text-[#777d9c]">RESOURCES</h2>
        <ul className="m-0 mt-5 grid list-none gap-2 p-0">
          {MARKETING_RESOURCE_LINKS.map((link, index) => (
            <li key={link.label}>
              <a
                className="group flex min-h-[60px] items-center gap-3 rounded-md px-2 py-2 text-[#111118] transition-colors duration-200 hover:bg-[#e9f2ff] focus-visible:bg-[#e9f2ff] focus-visible:outline-2 focus-visible:outline-[#1677ff]"
                href={link.href}
                onClick={onNavigate}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt=""
                  aria-hidden="true"
                  className="h-[45px] w-[45px] shrink-0 object-contain"
                  height="45"
                  loading="lazy"
                  src={`https://www.getcollate.io/assets/navbar/${resourceIcons[index]}`}
                  width="45"
                />
                <span className="text-[14px] leading-5 font-medium group-hover:text-[#086cf4]">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <section className="min-w-0 px-5 py-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="m-0 text-[14px] leading-5 font-medium tracking-[0.04em] text-[#777d9c]">ARTICLES</h2>
          <a
            className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-medium text-[#145bbf] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
            href="https://www.getcollate.io/learning-center"
            onClick={onNavigate}
            rel="noopener noreferrer"
            target="_blank"
          >
            View All Articles
            <ArrowRight aria-hidden="true" size={13} strokeWidth={1.8} />
          </a>
        </div>

        <ul className="m-0 mt-5 grid list-none grid-cols-2 gap-3 p-0">
          {MARKETING_RESOURCE_ARTICLES.map((article) => (
            <li key={article.href}>
              <a
                className="group relative flex min-h-[67px] flex-col justify-center rounded-[12px] bg-white/95 px-4 py-3 text-[#10131e] transition-colors duration-200 hover:bg-[#f5f8ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
                href={article.href}
                onClick={onNavigate}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ArrowUpRight
                  aria-hidden="true"
                  className="absolute top-3 right-3 text-[#8a90ad] group-hover:text-[#145bbf]"
                  size={14}
                  strokeWidth={1.7}
                />
                <span className="block pr-5 text-[15px] leading-5 font-medium">{article.label}</span>
                <span className="mt-1 block text-[13px] leading-[1.35] font-normal text-[#343747]">
                  {article.description}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
