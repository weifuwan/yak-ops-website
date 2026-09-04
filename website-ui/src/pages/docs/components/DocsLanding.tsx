import type { DocsNavigation } from '@/services/docs';

type DocsLandingProps = {
  navigation: DocsNavigation;
  onNavigate: (slug: string) => void;
};

const TASK_LABELS = [
  'Connect data and systems',
  'Build reliable data pipelines',
  'Develop and transform data',
  'Check and improve data quality',
  'Understand data lineage',
  'Deploy and operate Yak Ops',
];

function ArrowDownIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 18 18">
      <path d="M9 3V15M4.75 10.75L9 15L13.25 10.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}

function SectionIcon({ index }: { index: number }) {
  if (index % 3 === 1) {
    return (
      <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path d="M5 7.5H19M5 12H15M5 16.5H12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <path d="M18.5 14.5V20M15.75 17.25H21.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    );
  }
  if (index % 3 === 2) {
    return (
      <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path d="M6 18L10 14L13 16L19 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M15.5 9H19V12.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M5 5V19H20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <rect height="13" rx="2" stroke="currentColor" strokeWidth="1.5" width="14" x="5" y="5.5" />
      <path d="M9 3.5V7.5M15 3.5V7.5M8.5 11.5H15.5M8.5 15H13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

export default function DocsLanding({ navigation, onNavigate }: DocsLandingProps) {
  const allItems = navigation.sections.flatMap((section) =>
    section.items.map((item) => ({ ...item, section: section.title })),
  );
  const quickLinks = allItems.slice(0, 6);

  return (
    <main className="bg-[#faf9f5]">
      <section className="bg-[#e3dacc]">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center px-6 py-[76px] text-center sm:px-10 lg:py-[80px]">
          <p className="mb-7 text-[13px] font-medium uppercase tracking-[0.14em] text-[#77756f]">
            Yak Ops Documentation
          </p>
          <h1 className="m-0 max-w-[790px] font-yak-serif text-[42px] font-normal leading-[1.04] tracking-[-0.045em] text-[#171715] sm:text-[52px] lg:text-[58px]">
            What do you want to do with Yak Ops?
          </h1>

          <div className="mt-8 grid w-full max-w-[940px] grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((item, index) => (
              <button
                className="flex min-h-[58px] flex-col items-center justify-center rounded-full border border-[#1f1e1d]/[0.14] bg-white/75 px-5 py-2.5 text-center text-[#1f1f1d] transition-colors hover:bg-white"
                key={item.slug}
                onClick={() => onNavigate(item.slug)}
                type="button"
              >
                <span className="text-[14px] font-semibold leading-5">{TASK_LABELS[index] ?? item.title}</span>
                <span className="mt-0.5 text-[12px] font-medium leading-4 text-[#66645f]">{item.title}</span>
              </button>
            ))}
          </div>

          <p className="mt-6 text-[15px] text-[#686660]">
            Search the documentation above, or pick a path to start exploring Yak Ops.
          </p>
          <a
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-[#1f1e1d]/40 px-5 text-sm font-semibold text-[#1f1f1d] transition-colors hover:bg-white/40"
            href="#docs-catalog"
          >
            Browse all documentation
            <ArrowDownIcon />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-6 py-14 sm:px-10 lg:px-8 lg:py-16" id="docs-catalog">
        <div className="mb-8 max-w-[650px]">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#77756f]">Documentation</p>
          <h2 className="m-0 font-yak-serif text-[32px] font-medium tracking-[-0.035em] text-[#1d1d1b]">
            Explore Yak Ops by capability
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {navigation.sections.map((section, index) => {
            const firstItem = section.items[0];
            if (!firstItem) {
              return null;
            }
            return (
              <button
                className="group min-h-[190px] rounded-2xl border border-[#d8d5cd] bg-[#faf9f5] p-7 text-left text-[#1f1f1d] transition-colors hover:border-[#a9a59b]"
                key={section.title}
                onClick={() => onNavigate(firstItem.slug)}
                type="button"
              >
                <div className="mb-10 text-[#2f2f2c]">
                  <SectionIcon index={index} />
                </div>
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <div className="font-yak-serif text-[21px] font-medium tracking-[-0.025em]">{section.title}</div>
                    <div className="mt-1 text-[13px] leading-5 text-[#77756f]">{firstItem.description}</div>
                  </div>
                  <span className="shrink-0 text-lg text-[#77756f] transition-transform group-hover:translate-x-1">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
