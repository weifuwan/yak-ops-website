import { Link } from 'react-router-dom';

import type { DocsNavigationSection } from '@/service/docs';

type DocsSidebarProps = {
  onNavigate: () => void;
  sections: DocsNavigationSection[];
  currentSlug: string;
};

export default function DocsSidebar({ onNavigate, sections, currentSlug }: DocsSidebarProps) {
  return (
    <nav aria-label="Documentation navigation" className="pb-10">
      {sections.map((section) => (
        <section className="mb-6 last:mb-0" key={section.title}>
          <div className="mb-3 px-3 text-[13px] font-semibold leading-5 text-[#27272A]">{section.title}</div>
          <div className="grid gap-1">
            {section.items.map((item) => {
              const active = currentSlug === item.slug;
              return (
                <Link
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'flex w-full items-start rounded-[10px] px-3 py-2 text-left text-[13px] leading-5 no-underline transition-colors',
                    active
                      ? 'bg-[#E7F0FF] font-semibold text-[#086cf5]'
                      : 'font-normal text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#18181B]',
                  ].join(' ')}
                  key={item.slug}
                  onClick={onNavigate}
                  to={'/docs/' + item.slug}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </nav>
  );
}
