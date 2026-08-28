import { useEffect, useState } from 'react';
import type { DocsTocItem } from '@/utils/docs';

type DocsTableOfContentsProps = {
  items: DocsTocItem[];
};

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
      { rootMargin: '-92px 0px -68% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <nav className="yak-docs-toc" aria-label="本文目录">
      <div className="yak-docs-toc__title">本文目录</div>
      <div className="yak-docs-toc__items">
        {items.map((item) => (
          <a
            className={[
              'yak-docs-toc__item',
              item.level === 3 ? 'yak-docs-toc__item--nested' : '',
              activeId === item.id ? 'yak-docs-toc__item--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            href={`#${item.id}`}
            key={item.id}
          >
            {item.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
