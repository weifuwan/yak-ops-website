import type { DocsNavigation, DocsNavigationItem } from '@/services/docs';

type DocsLandingProps = {
  navigation: DocsNavigation;
  onNavigate: (slug: string) => void;
};

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 18 18">
      <path d="M3 9H15M10.75 4.75L15 9L10.75 13.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}

function StartCard({
  item,
  eyebrow,
  onNavigate,
}: {
  item: DocsNavigationItem;
  eyebrow: string;
  onNavigate: (slug: string) => void;
}) {
  return (
    <button
      className="group flex min-h-[190px] flex-col rounded-2xl border border-solid border-[#d8d5cd] bg-[#faf9f5] p-7 text-left text-[#1f1f1d] transition-[background-color,border-color] duration-200 ease-out hover:border-[#a9a59b] hover:bg-white"
      onClick={() => onNavigate(item.slug)}
      type="button"
    >
      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#77756f]">{eyebrow}</div>
      <div className="mt-auto flex items-end justify-between gap-6 pt-10">
        <div>
          <div className="font-yak-serif text-[22px] font-medium tracking-[-0.025em]">{item.title}</div>
          <p className="mb-0 mt-2 text-[13px] leading-5 text-[#77756f]">{item.description}</p>
        </div>
        <span className="shrink-0 text-[#77756f] transition-transform duration-200 ease-out group-hover:translate-x-1">
          <ArrowRightIcon />
        </span>
      </div>
    </button>
  );
}

export default function DocsLanding({ navigation, onNavigate }: DocsLandingProps) {
  const startItems = navigation.sections[0]?.items ?? [];
  const overview = startItems[0];
  const quickStart = startItems[1];

  return (
    <main className="bg-[#faf9f5]">
      <section className="bg-[#e3dacc]">
        <div className="mx-auto flex max-w-[92rem] flex-col items-center px-6 py-[76px] text-center sm:px-10 lg:py-[84px]">
          <p className="mb-7 text-[13px] font-medium uppercase tracking-[0.14em] text-[#77756f]">
            Yak Ops Documentation
          </p>
          <h1 className="m-0 max-w-[820px] font-yak-serif text-[42px] font-normal leading-[1.04] tracking-[-0.045em] text-[#171715] sm:text-[52px] lg:text-[58px]">
            What do you want to do with Yak Ops?
          </h1>

          <div className="mt-8 grid w-full max-w-[690px] grid-cols-1 gap-2.5 sm:grid-cols-2">
            {overview ? (
              <button
                className="flex min-h-[58px] flex-col items-center justify-center rounded-full border border-solid border-[#1f1e1d]/[0.14] bg-white/75 px-5 py-2.5 text-center text-[#1f1f1d] hover:bg-white"
                onClick={() => onNavigate(overview.slug)}
                type="button"
              >
                <span className="text-[14px] font-semibold leading-5">Understand Yak Ops</span>
                <span className="mt-0.5 text-[12px] font-medium leading-4 text-[#66645f]">{overview.title}</span>
              </button>
            ) : null}
            {quickStart ? (
              <button
                className="flex min-h-[58px] flex-col items-center justify-center rounded-full border border-solid border-[#1f1e1d]/[0.14] bg-white/75 px-5 py-2.5 text-center text-[#1f1f1d] hover:bg-white"
                onClick={() => onNavigate(quickStart.slug)}
                type="button"
              >
                <span className="text-[14px] font-semibold leading-5">Get started quickly</span>
                <span className="mt-0.5 text-[12px] font-medium leading-4 text-[#66645f]">{quickStart.title}</span>
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] px-6 py-14 sm:px-10 lg:px-8 lg:py-16">
        <div className="mb-8 max-w-[640px]">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#77756f]">Start here</p>
          <h2 className="m-0 font-yak-serif text-[32px] font-medium tracking-[-0.035em] text-[#1d1d1b]">
            Two paths are enough for now
          </h2>
          <p className="mb-0 mt-3 text-[15px] leading-6 text-[#77756f]">
            Keep the first documentation pass focused. More top-level sections can be added when their content is ready.
          </p>
        </div>

        <div className="grid max-w-[900px] grid-cols-1 gap-4 md:grid-cols-2">
          {overview ? <StartCard eyebrow="Overview" item={overview} onNavigate={onNavigate} /> : null}
          {quickStart ? <StartCard eyebrow="Quick start" item={quickStart} onNavigate={onNavigate} /> : null}
        </div>
      </section>
    </main>
  );
}
