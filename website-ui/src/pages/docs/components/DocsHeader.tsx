import { Link, useLocation } from '@umijs/max';
import { YakTab } from '@/components/ui';
import type { DocsNavigation } from '@/services/docs';

type DocsHeaderProps = {
  navigation: DocsNavigation;
  isLanding: boolean;
  onNavigate: (slug: string) => void;
  onOpenNavigation: () => void;
  onWelcome: () => void;
};

function DocsMark() {
  return (
    <svg aria-hidden="true" className="h-[24px] w-[24px] text-yak-brand" viewBox="0 0 24 24">
      <path
        d="M12 1.8V7.2M12 16.8V22.2M1.8 12H7.2M16.8 12H22.2M4.78 4.78L8.6 8.6M15.4 15.4L19.22 19.22M19.22 4.78L15.4 8.6M8.6 15.4L4.78 19.22M7.1 2.95L9.45 7.85M14.55 16.15L16.9 21.05M21.05 7.1L16.15 9.45M7.85 14.55L2.95 16.9M16.9 2.95L14.55 7.85M9.45 16.15L7.1 21.05M21.05 16.9L16.15 14.55M7.85 9.45L2.95 7.1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" fill="currentColor" r="2.25" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
      <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

const docsSlugFromPath = (pathname: string) => pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '');

export default function DocsHeader({
  navigation,
  isLanding,
  onNavigate,
  onOpenNavigation,
  onWelcome,
}: DocsHeaderProps) {
  const location = useLocation();
  const currentSlug = docsSlugFromPath(location.pathname);
  const sectionTabs = navigation.sections.map((section, sectionIndex) => ({
    key: `section-${sectionIndex}`,
    label: section.title,
  }));
  const activeSectionIndex = navigation.sections.findIndex((section) =>
    section.items.some((item) => item.slug === currentSlug),
  );
  const activeKey = isLanding
    ? 'welcome'
    : `section-${activeSectionIndex >= 0 ? activeSectionIndex : 0}`;
  const tabs = [{ key: 'welcome', label: 'Welcome' }, ...sectionTabs];

  const handleTabChange = (key: string) => {
    if (key === 'welcome') {
      onWelcome();
      return;
    }

    const sectionIndex = Number(key.replace('section-', ''));
    const targetSlug = Number.isInteger(sectionIndex)
      ? navigation.sections[sectionIndex]?.items[0]?.slug
      : undefined;

    if (targetSlug) {
      onNavigate(targetSlug);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fdfdf7] text-[#1f1f1d]">
      <div
        className="mx-auto flex h-16 max-w-[92rem] items-center gap-4 px-5 lg:px-8"
        style={{ borderBottom: '1px solid rgb(31 30 29 / 0.05)' }}
      >
        <div className="flex min-w-0 flex-1 items-center lg:min-w-[230px] lg:flex-none">
          <button
            aria-label="Open documentation navigation"
            className="mr-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent p-0 text-[#66645f] hover:bg-black/[0.04] lg:hidden"
            onClick={onOpenNavigation}
            type="button"
          >
            <MenuIcon />
          </button>

          <Link className="flex min-w-0 items-center gap-2.5" to="/docs">
            <DocsMark />
            <span className="truncate font-yak-serif text-[27px] font-medium leading-none">Yak Ops Docs</span>
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 lg:block" />

        <div className="ml-auto hidden min-w-[230px] items-center justify-end gap-5 text-sm lg:flex">
          <a
            className="font-medium text-[#55544f] hover:text-[#1f1f1d]"
            href="https://github.com/weifuwan/yak-ops/issues"
            rel="noreferrer noopener"
            target="_blank"
          >
            Support
          </a>
          <Link
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-[#171715] px-4 font-semibold text-white hover:opacity-90"
            to="/"
          >
            Go to Yak Ops
            <span aria-hidden="true">›</span>
          </Link>
        </div>
      </div>

      <div>
        <div className="mx-auto flex h-12 max-w-[92rem] items-end px-5 lg:px-8">
          <YakTab
            activeKey={activeKey}
            animated={false}
            className="w-full"
            items={tabs}
            onChange={handleTabChange}
          />
        </div>
      </div>
    </header>
  );
}
