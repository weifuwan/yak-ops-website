import { useEffect, useState } from 'react';
import type { DocsTocItem } from '@/utils/docs';

type DocsTableOfContentsProps = {
  items: DocsTocItem[];
};

function TocIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 18 18">
      <path
        d="M2.75 3.75H15.25M2.75 9H8.25M2.75 14.25H15.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export default function DocsTableOfContents({ items }: DocsTableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    setActiveId(items[0]?.id ?? '');
    if (!items.length || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-132px 0px -68% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label="On this page" className="text-[13px] leading-5 text-[#71717A]">
      <div className="mb-2 flex items-center gap-2 font-semibold text-[#3F3F46]">
        <TocIcon />
        <span>On this page</span>
      </div>
      <div className="space-y-0.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              aria-current={isActive ? 'location' : undefined}
              className={[
                'block py-1 hover:text-[#18181B]',
                item.level === 3 ? 'pl-4' : 'pl-0',
                isActive ? 'font-medium text-[#18181B]' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              href={`#${item.id}`}
              key={item.id}
            >
              {item.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
