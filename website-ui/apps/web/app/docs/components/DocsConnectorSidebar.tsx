import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import type { DocsNavigationItem } from '@/service/docs';
import type { DocsTocItem } from '@/utils/docs';

type Props = {
  currentSlug: string;
  items: DocsNavigationItem[];
  toc: DocsTocItem[];
  onNavigate: () => void;
};

export default function DocsConnectorSidebar({ currentSlug, items, toc, onNavigate }: Props) {
  const [databaseOpen, setDatabaseOpen] = useState(true);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(currentSlug);
  const { hash } = useLocation();

  useEffect(() => {
    setDatabaseOpen(true);
    setExpandedSlug(currentSlug);
  }, [currentSlug]);

  const databases = items.filter((item) => item.slug.startsWith('connectors/database/'));
  return (
    <nav aria-label="Connector documentation" className="pb-10 text-[13px] leading-5">
      <Link
        to="/docs/connectors/overview"
        onClick={onNavigate}
        className="mb-4 block border-b border-[#EAECF0] px-3 pb-4 font-semibold text-[#086cf5] no-underline"
      >
        Connectors
      </Link>
      <button
        type="button"
        aria-expanded={databaseOpen}
        onClick={() => setDatabaseOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent px-3 py-2 text-left font-semibold text-[#344054] hover:text-[#086cf5]"
      >
        Database
        {databaseOpen ? <ChevronDown aria-hidden="true" size={14} /> : <ChevronRight aria-hidden="true" size={14} />}
      </button>
      {databaseOpen ? (
        <div className="mt-1 space-y-1">
          {databases.map((item) => {
            const active = currentSlug === item.slug;
            const expanded = active && expandedSlug === item.slug;
            return (
              <div key={item.slug}>
                <div className="flex items-center gap-1">
                  <Link
                    to={'/docs/' + item.slug}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={
                      'min-w-0 flex-1 rounded-lg px-3 py-2 no-underline transition-colors ' +
                      (active
                        ? 'bg-[#E7F0FF] font-semibold text-[#086cf5]'
                        : 'text-[#52525B] hover:bg-[#F4F7FB] hover:text-[#086cf5]')
                    }
                  >
                    {item.title}
                  </Link>
                  {active && toc.length > 0 ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-label={(expanded ? 'Collapse ' : 'Expand ') + item.title + ' sections'}
                      onClick={() => setExpandedSlug(expanded ? null : item.slug)}
                      className="flex h-8 w-6 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent text-[#667085]"
                    >
                      {expanded ? (
                        <ChevronDown aria-hidden="true" size={14} />
                      ) : (
                        <ChevronRight aria-hidden="true" size={14} />
                      )}
                    </button>
                  ) : null}
                </div>
                {expanded ? (
                  <div className="my-1 ml-4 space-y-0.5 border-l border-[#E4E7EC] pl-2">
                    {toc
                      .filter((heading) => heading.level === 2)
                      .map((heading) => (
                        <a
                          href={'#' + heading.id}
                          key={heading.id}
                          onClick={onNavigate}
                          aria-current={hash === '#' + heading.id ? 'location' : undefined}
                          className={
                            'block rounded-md px-2 py-1.5 text-[12px] no-underline hover:text-[#086cf5] ' +
                            (hash === '#' + heading.id ? 'font-medium text-[#086cf5]' : 'text-[#667085]')
                          }
                        >
                          {heading.title}
                        </a>
                      ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </nav>
  );
}
