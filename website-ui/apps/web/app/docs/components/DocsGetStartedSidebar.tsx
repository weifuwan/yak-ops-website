import { Link } from 'react-router-dom';

import type { DocsNavigationItem } from '@/service/docs';

type Props = {
  currentSlug: string;
  items: DocsNavigationItem[];
  onNavigate: () => void;
};

const startSlugs = ['getting-started/overview', 'getting-started/before-you-begin'];
const stepSlugs = [
  'getting-started/deploy',
  'getting-started/connect-data',
  'getting-started/integrate-data',
  'getting-started/build-workflow',
  'getting-started/data-governance',
];

export default function DocsGetStartedSidebar({ currentSlug, items, onNavigate }: Props) {
  const available = new Map(items.map((item) => [item.slug, item]));
  const navLink = (item: DocsNavigationItem, nested = false) => {
    const active = currentSlug === item.slug;
    return (
      <Link
        aria-current={active ? 'page' : undefined}
        className={[
          'block rounded-[10px] px-3 py-2 text-[13px] leading-5 no-underline transition-colors',
          nested ? 'ml-3' : '',
          active
            ? 'bg-[#E7F0FF] font-semibold text-[#086cf5]'
            : 'font-normal text-[#52525B] hover:bg-[#F4F7FB] hover:text-[#086cf5]',
        ].join(' ')}
        key={item.slug}
        onClick={onNavigate}
        to={'/docs/' + item.slug}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <nav aria-label="Get Started steps" className="pb-10">
      <Link className="mb-5 block px-3 text-[14px] font-semibold text-[#086cf5] no-underline" onClick={onNavigate} to="/docs/getting-started/overview">
        Get Started
      </Link>
      <div className="mb-6">
        <div className="mb-2 px-3 text-[13px] font-semibold text-[#27272A]">Start Here</div>
        <div className="grid gap-1">
          {startSlugs.map((slug) => {
            const item = available.get(slug);
            return item ? navLink(item) : null;
          })}
        </div>
      </div>
      <div>
        <div className="mb-2 px-3 text-[13px] font-semibold text-[#27272A]">Let's Get Started</div>
        <div className="grid gap-1">
          {stepSlugs.map((slug) => {
            const item = available.get(slug);
            if (!item) return null;
            return (
              <div key={slug}>
                {navLink(item)}
                {slug === 'getting-started/deploy' && available.has('deploy/docker-compose') ? (
                  <div className="my-1 ml-3 border-l border-[#E4E7EC] pl-1">
                    {navLink(available.get('deploy/docker-compose')!, true)}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
