import { Link } from '@umijs/max';
import type { DocsNavigation } from '@/services/docs';
import DocsSearch from './DocsSearch';

type DocsHeaderProps = {
  navigation: DocsNavigation;
  activeSection?: string;
  isLanding: boolean;
  onNavigate: (slug: string) => void;
  onOpenNavigation: () => void;
  onUnauthorized: () => void;
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

function SearchSparkleIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 18 18">
      <path
        d="M9.5 2.75L11.4 7.6L16.25 9.5L11.4 11.4L9.5 16.25L7.6 11.4L2.75 9.5L7.6 7.6L9.5 2.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <path d="M3.5 1.5V5.5M1.5 3.5H5.5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 18 18">
      <rect height="9" rx="1.8" stroke="currentColor" strokeWidth="1.4" width="14" x="2" y="2.5" />
      <path d="M9 11.5V14M5 15.5L9 14.5L13 15.5" stroke="currentColor" strokeLinecap="round" />
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

const tabClassName = (active: boolean) =>
  active
    ? 'relative flex h-12 shrink-0 items-center font-semibold text-[#1f1f1d] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#1f1f1d]'
    : 'relative flex h-12 shrink-0 items-center font-medium text-[#55544f] hover:text-[#1f1f1d]';

export default function DocsHeader({
  navigation,
  activeSection,
  isLanding,
  onNavigate,
  onOpenNavigation,
  onUnauthorized,
}: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b  bg-[#FDFDF7] text-[#1f1f1d] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[92rem] items-center gap-4 px-5 lg:px-8">
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
            <span className="truncate font-yak-serif text-[27px] font-medium leading-none ">
              Yak Ops Docs
            </span>
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-2.5 lg:flex">
         
        </div>

        <div className="ml-auto hidden min-w-[230px] items-center justify-end gap-5 text-sm lg:flex">
          <a
            className="font-medium text-[#55544f] "
            href="https://github.com/weifuwan/yak-ops/issues"
            rel="noreferrer noopener"
            target="_blank"
          >
            Support
          </a>
          <Link className="inline-flex h-9 items-center gap-2 rounded-xl bg-[#171715] px-4 font-semibold text-white hover:opacity-90" to="/">
            Go to Yak Ops
            <span aria-hidden="true">›</span>
          </Link>
        </div>
      </div>

      <div className="border-t " style={{borderTop: "1px solid rgb(31 30 29 / 0.035)", 
        borderBottom: "1px solid rgb(31 30 29 / 0.035)", marginBottom: 40}}>
        <nav
          aria-label="Documentation sections"
          className="mx-auto flex h-12 max-w-[80rem] items-stretch gap-6 overflow-x-auto px-5 text-sm [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden"
        >
          <Link className={tabClassName(isLanding)} to="/docs">
            Welcome
          </Link>
          {navigation.sections.map((section) => {
            const firstItem = section.items[0];
            if (!firstItem) {
              return null;
            }
            return (
              <button
                className={`${tabClassName(!isLanding && activeSection === section.title)} border-0 bg-transparent p-0`}
                key={section.title}
                onClick={() => onNavigate(firstItem.slug)}
                type="button"
              >
                {section.title}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
