import {
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  BookOpen,
  GitBranch,
  Layers3,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import DocsConnectors from './DocsConnectors';

type DocsHomeProps = {
  onSearch: () => void;
};

type DocsChip = {
  title: string;
  href: string;
  image: string;
};

// Reference artwork and destinations from the supplied Collate Docs chips.
// These are intentionally external sample links; Yak Ops guides remain below.
const popular: readonly DocsChip[] = [
  {
    title: 'Databricks',
    href: 'https://docs.getcollate.io/ai-2-0/connectors/database/databricks',
    image: 'https://mintcdn.com/collatedocs/12mtkhFtvTP7FUxZ/public/images/connectors/databrick.webp?fit=max&auto=format&n=12mtkhFtvTP7FUxZ&q=85&s=595ec3832f654c87e1ec35a422933f7f',
  },
  {
    title: 'BigQuery',
    href: 'https://docs.getcollate.io/ai-2-0/connectors/database/bigquery',
    image: 'https://mintcdn.com/collatedocs/XRLyE3HymqoH13_i/public/images/connectors/bigquery.webp?fit=max&auto=format&n=XRLyE3HymqoH13_i&q=85&s=f3bd1ac39f3c204cc48d09874c6cee43',
  },
  {
    title: 'Redshift',
    href: 'https://docs.getcollate.io/ai-2-0/connectors/database/redshift',
    image: 'https://mintcdn.com/collatedocs/kj7ZjFqdvAgAlfBX/public/images/connectors/redshift.webp?fit=max&auto=format&n=kj7ZjFqdvAgAlfBX&q=85&s=aa91561402fb57c7cc256a509873bffd',
  },
  {
    title: 'Snowflake',
    href: 'https://docs.getcollate.io/ai-2-0/connectors/database/snowflake',
    image: 'https://mintcdn.com/collatedocs/qybQN_VCNOUNg9nn/public/images/connectors/snowflakes.webp?fit=max&auto=format&n=qybQN_VCNOUNg9nn&q=85&s=70fdc52fb23bfcdcb33c630e7592c7eb',
  },
  {
    title: 'Collate AI Chat',
    href: 'https://docs.getcollate.io/ai-2-0/collate-ai/collate-ai-chat',
    image: 'https://mintcdn.com/collatedocs/yvgGxaeRR5RwtQo6/public/images/icons/askcollate.svg?fit=max&auto=format&n=yvgGxaeRR5RwtQo6&q=85&s=e13369d212b859ab1a7cbdb6373964aa',
  },
  {
    title: 'AI Studio',
    href: 'https://docs.getcollate.io/ai-2-0/collate-ai/ai-studio',
    image: 'https://mintcdn.com/collatedocs/rbimi0ZI_PNqhVKs/public/images/homepage-icons/studio-ai.svg?fit=max&auto=format&n=rbimi0ZI_PNqhVKs&q=85&s=af69fe456a77472b8b5372e4ddcca32b',
  },
  {
    title: 'AI SDK',
    href: 'https://docs.getcollate.io/ai-2-0/developer-guide/sdk/ai-sdk',
    image: 'https://mintcdn.com/collatedocs/HoL0Mtvr6sdpYjdM/public/images/homepage-icons/ai-sdk2.svg?fit=max&auto=format&n=HoL0Mtvr6sdpYjdM&q=85&s=3b22cf8b3b07fa7e7ebf57b05a0993ab',
  },
  {
    title: 'AI Analytics',
    href: 'https://docs.getcollate.io/ai-2-0/collate-ai/ai-analytics',
    image: 'https://mintcdn.com/collatedocs/q9W0TCgsCU2-B-iR/public/images/homepage-icons/insights.svg?fit=max&auto=format&n=q9W0TCgsCU2-B-iR&q=85&s=d14723743333262bdfbe31777c786301',
  },
];

type GuideCard = {
  title: string;
  href: string;
  icon: string;
  iconBackground: string;
};

// Reference guide imagery and destinations supplied for the Docs homepage.
const guides: readonly GuideCard[] = [
  {
    title: 'Discovery',
    href: 'https://docs.getcollate.io/ai-2-0/how-to-guides/data-discovery',
    icon: 'https://mintcdn.com/collatedocs/q9W0TCgsCU2-B-iR/public/images/homepage-icons/discovery.svg?fit=max&auto=format&n=q9W0TCgsCU2-B-iR&q=85&s=c6a03d9ec0b04bf8c5f0add075acaa40',
    iconBackground: 'bg-[#eafaf1]',
  },
  {
    title: 'Lineage',
    href: 'https://docs.getcollate.io/ai-2-0/how-to-guides/data-lineage',
    icon: 'https://mintcdn.com/collatedocs/q9W0TCgsCU2-B-iR/public/images/homepage-icons/lineage.svg?fit=max&auto=format&n=q9W0TCgsCU2-B-iR&q=85&s=d2e38412de14e1865f8acde4a94118df',
    iconBackground: 'bg-[#fffbeb]',
  },
  {
    title: 'Observability',
    href: 'https://docs.getcollate.io/ai-2-0/how-to-guides/data-quality-observability',
    icon: 'https://mintcdn.com/collatedocs/q9W0TCgsCU2-B-iR/public/images/homepage-icons/observability.svg?fit=max&auto=format&n=q9W0TCgsCU2-B-iR&q=85&s=a7a4691c2bb9e8d2a76870f8f0982f3a',
    iconBackground: 'bg-[#fff6ef]',
  },
  {
    title: 'Governance',
    href: 'https://docs.getcollate.io/ai-2-0/how-to-guides/data-governance',
    icon: 'https://mintcdn.com/collatedocs/q9W0TCgsCU2-B-iR/public/images/homepage-icons/governance.svg?fit=max&auto=format&n=q9W0TCgsCU2-B-iR&q=85&s=54e2577b7e269f4b2c1a9bb43dfe9d35',
    iconBackground: 'bg-[#e9fbfd]',
  },
  {
    title: 'Collaboration',
    href: 'https://docs.getcollate.io/ai-2-0/how-to-guides/data-collaboration',
    icon: 'https://mintcdn.com/collatedocs/_b2s5J-PJNlcmOmk/public/images/ai-2.0/ai-icons/collaboration.svg?fit=max&auto=format&n=_b2s5J-PJNlcmOmk&q=85&s=f4e247f41684e58dd02032cc998bb956',
    iconBackground: 'bg-[#ebf7ff]',
  },
  {
    title: 'Marketplace',
    href: 'https://docs.getcollate.io/ai-2-0/how-to-guides/data-marketplace',
    icon: 'https://mintcdn.com/collatedocs/_b2s5J-PJNlcmOmk/public/images/ai-2.0/ai-icons/data-marketplace.svg?fit=max&auto=format&n=_b2s5J-PJNlcmOmk&q=85&s=8053268d4a5868f0aadb49c169e07e22',
    iconBackground: 'bg-[#ebf7ff]',
  },
  {
    title: 'Collate AI',
    href: 'https://docs.getcollate.io/ai-2-0/collate-ai',
    icon: 'https://mintcdn.com/collatedocs/q9W0TCgsCU2-B-iR/public/images/homepage-icons/collate-ai.svg?fit=max&auto=format&n=q9W0TCgsCU2-B-iR&q=85&s=4cf7396b35cb92e6df304f127f863cd9',
    iconBackground: 'bg-[#edf7ff]',
  },
];

const updates = [
  {
    title: 'Release 2.0',
    eyebrow: 'RELEASE OVERVIEW',
    description: 'Explore the documentation for Yak Ops 2.0. Release details and upgrade notes will be added as they become available.',
    href: '/docs/release-2.0',
    action: 'Explore Release 2.0',
    icon: Layers3,
  },
  {
    title: 'Realtime Data Sync',
    eyebrow: 'EXPLORE YAK OPS',
    description: 'Move beyond one-off transfers. Explore incremental synchronization and MySQL CDC in the realtime data pipeline.',
    href: '/product/realtime-sync',
    action: 'Explore realtime sync',
    icon: ArrowRightLeft,
  },
  {
    title: 'Orchestrate Data Work',
    eyebrow: 'EXPLORE YAK OPS',
    description: 'Build connected data workflows with development and scheduling tools, all from one place.',
    href: '/product/workflows',
    action: 'Explore workflows',
    icon: Workflow,
  },
  {
    title: 'Data Quality',
    eyebrow: 'EXPLORE YAK OPS',
    description: 'Explore quality checks and monitoring to help teams keep data reliable and ready to use.',
    href: '/product/data-quality',
    action: 'Explore data quality',
    icon: ShieldCheck,
  },
  {
    title: 'Data Lineage',
    eyebrow: 'EXPLORE YAK OPS',
    description: 'Understand how data moves between sources, tasks, and downstream workflows.',
    href: '/product/lineage',
    action: 'Explore data lineage',
    icon: GitBranch,
  },
] as const;

function PipelineIllustration({ title }: { title: string }) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[525px] overflow-hidden rounded-[12px] border-[3px] border-[#c8d8fc] bg-white shadow-[0_15px_32px_rgba(38,75,158,0.12)]"
    >
      <div className="grid h-[258px] grid-cols-[85px_minmax(0,1fr)] sm:h-[284px] sm:grid-cols-[105px_minmax(0,1fr)]">
        <aside className="flex min-w-0 flex-col border-r border-[#e8eef9] bg-[#fbfcff]">
          <div className="flex h-9 items-center gap-1.5 border-b border-[#e8eef9] px-2.5">
            <Layers3 aria-hidden="true" className="shrink-0 text-[#0d89e8]" size={14} />
            <span className="text-[9px] font-bold tracking-wide text-[#253c69]">YAK OPS</span>
          </div>
          <div className="flex flex-col gap-1 px-2 py-3">
            {['Overview', 'Sources', 'Pipelines', 'Workflows', 'Quality'].map((name, index) => (
              <div
                className={
                  index === 0
                    ? 'flex h-6 items-center gap-1.5 rounded bg-[#edf4ff] px-1.5 text-[8px] font-medium text-[#2673d2]'
                    : 'flex h-6 items-center gap-1.5 rounded px-1.5 text-[8px] text-[#8390a6]'
                }
                key={name}
              >
                <span className={index === 0 ? 'h-2 w-2 rounded-[3px] bg-[#5193f6]' : 'h-2 w-2 rounded-[3px] bg-[#cad7ea]'} />
                <span className="truncate">{name}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-1.5 border-t border-[#edf1f7] px-2 py-2">
            <span className="h-4 w-4 rounded-full bg-[#d2f7dd]" />
            <span className="h-1.5 w-10 rounded bg-[#e4eaf4]" />
          </div>
        </aside>
        <div className="min-w-0 overflow-hidden">
          <div className="flex h-9 items-center justify-between border-b border-[#e8eef9] px-3">
            <span className="h-1.5 w-20 rounded-full bg-[#e4ecf8]" />
            <span className="h-4 w-12 rounded bg-[#e5f0ff]" />
          </div>
          <div className="px-3 py-2.5 sm:px-4 sm:py-3">
            <div className="flex items-center justify-between gap-1">
              <div className="min-w-0">
                <span className="block truncate text-[10px] font-semibold text-[#314368]">{title}</span>
                <span className="mt-0.5 block text-[7px] text-[#9caac0]">Workspace overview</span>
              </div>
              <span className="shrink-0 rounded bg-[#e7f1ff] px-2 py-1 text-[7px] font-semibold text-[#2385f3]">Dashboard</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
              {[
                { label: 'Data Sources', count: '21', accent: 'text-[#1882ed]' },
                { label: 'Active Tasks', count: '16', accent: 'text-[#3470e3]' },
                { label: 'Workflows', count: '47', accent: 'text-[#169fd0]' },
              ].map((metric) => (
                <div className="rounded-[5px] border border-[#e8edf7] p-1.5" key={metric.label}>
                  <span className="block truncate text-[7px] text-[#8696b2]">{metric.label}</span>
                  <span className={'mt-1 block text-[15px] leading-none font-semibold ' + metric.accent}>{metric.count}</span>
                  <span className="mt-1.5 block h-[3px] w-3/4 rounded bg-[#e9f3ff]" />
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-2">
              <div className="rounded-[5px] border border-[#e8edf7] p-2">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-semibold text-[#5f7297]">Pipeline activity</span>
                  <span className="h-1 w-8 rounded bg-[#dce8f7]" />
                </div>
                <div className="mt-2.5 flex h-[47px] items-end gap-1 sm:h-[61px]">
                  {[42, 62, 54, 83, 65, 94, 79, 89, 72, 98, 80, 91].map((height, index) => (
                    <span
                      className="min-w-0 flex-1 rounded-t-[2px] bg-[linear-gradient(180deg,#359cff,#b2daff)]"
                      key={index}
                      style={{ height: height + '%' }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-[5px] border border-[#e8edf7] p-2">
                <span className="block text-[7px] font-semibold text-[#5f7297]">Recent activity</span>
                <div className="mt-3 grid gap-2">
                  {['Sync completed', 'Quality checked', 'Workflow running'].map((activity, index) => (
                    <div className="flex items-center gap-1.5" key={activity}>
                      <span className={index === 2 ? 'h-2 w-2 shrink-0 rounded-full bg-[#f2c45e]' : 'h-2 w-2 shrink-0 rounded-full bg-[#6bd9aa]'} />
                      <span className="truncate text-[7px] text-[#8795ac]">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReleaseCarousel() {
  const [current, setCurrent] = useState(0);
  const slide = updates[current];
  const move = (step: number) => setCurrent((index) => (index + step + updates.length) % updates.length);

  return (
    <section aria-label="Featured documentation" className="relative mx-auto mt-0 w-full max-w-[1300px]">
      <div className="relative min-h-[414px] overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,rgba(195,201,252,0.5)_0%,rgba(142,234,252,0.5)_100%)] px-6 pt-12 pb-[68px] sm:px-14 lg:px-[100px] lg:py-12">
        <div
          aria-atomic="true"
          aria-live="polite"
          className="grid min-w-0 items-center gap-8 animate-[release-carousel-slide-next_450ms_ease] motion-reduce:animate-none lg:grid-cols-2 lg:gap-[50px]"
          key={current}
        >
          <PipelineIllustration title={slide.title} />
          <div className="min-w-0 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="m-0 text-[30px] leading-[1.2] font-medium tracking-[-0.025em] text-[#1b2432] sm:text-[32px]">
                {slide.title}
              </h2>
              <span className="inline-flex shrink-0 items-center rounded-full bg-white/75 px-3.5 py-1.5 text-[12px] font-semibold text-[#079aef]">
                NEW RELEASE
              </span>
            </div>
            <p className="mt-4 max-w-[475px] text-[16px] leading-[1.58] text-[#475563] sm:text-[17px]">
              {slide.description}
            </p>
            <Link
              className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[16px] font-medium text-[#181b23] no-underline shadow-[0_8px_16px_rgba(49,83,127,0.10)] transition-[background-color,color] hover:bg-[#eef7ff] hover:text-[#096deb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
              to={slide.href}
            >
              See what's new
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        <button
          aria-label="Previous update"
          className="absolute bottom-4 left-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#c8d5fb] bg-white text-[#1b2638] shadow-[0_7px_15px_rgba(39,76,160,0.10)] transition-colors hover:bg-[#f0f7ff] hover:text-[#086cf5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2"
          onClick={() => move(-1)}
          type="button"
        >
          <ArrowLeft aria-hidden="true" size={20} strokeWidth={2.2} />
        </button>
        <button
          aria-label="Next update"
          className="absolute right-4 bottom-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#c8d5fb] bg-white text-[#1b2638] shadow-[0_7px_15px_rgba(39,76,160,0.10)] transition-colors hover:bg-[#f0f7ff] hover:text-[#086cf5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2"
          onClick={() => move(1)}
          type="button"
        >
          <ArrowRight aria-hidden="true" size={20} strokeWidth={2.2} />
        </button>
        <div aria-label="Choose featured update" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {updates.map((update, index) => (
            <button
              aria-current={index === current ? 'true' : undefined}
              aria-label={'Go to ' + update.title}
              className="inline-flex h-3 w-3 min-w-0 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
              key={update.title}
              onClick={() => setCurrent(index)}
              type="button"
            >
              <span
                aria-hidden="true"
                className={
                  index === current
                    ? 'block h-[10px] w-[10px] shrink-0 rounded-full bg-[#086cf5] transition-colors'
                    : 'block h-2 w-2 shrink-0 rounded-full bg-[#c4d4ff] transition-colors hover:bg-[#8dafed]'
                }
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DocsHome({ onSearch }: DocsHomeProps) {
  return (
    <main className="min-h-screen bg-white pb-28 text-[#192238]">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <section className="bg-[radial-gradient(46.63%_44.4%_at_50%_50%,rgba(201,207,255,0.2)_0%,rgba(255,255,255,0.2)_100%)] pt-24 pb-24 text-center">
          <h1 className="m-0 mt-6 text-[clamp(36px,5vw,56px)] leading-[1.2] font-semibold tracking-[-0.03em] text-[#181d27]">
            Unlock the{' '}
            <span className="bg-[linear-gradient(to_top,#016afb_0%,#00e0ee_100%)] bg-clip-text text-transparent">
              Power
            </span>{' '}
            of Data
          </h1>
          <p className="mx-auto mt-5 max-w-[1160px] text-[17px] leading-[1.5] text-[#717680] sm:text-[18px] lg:text-[20px]">
            Connect, synchronize, develop, and govern your data with Yak Ops. Find the guides you need to get started.
          </p>

          <button
            aria-label="Search Yak Ops documentation"
            className="group mx-auto mt-16 flex min-h-[64px] w-full max-w-[800px] cursor-pointer items-center gap-3 rounded-full border-2 border-[#eaecf5] bg-white/70 px-4 py-2.5 text-left transition-[border-color,box-shadow,background-color] duration-200 hover:border-[#c7dcfa] hover:bg-white hover:shadow-[0_6px_24px_rgba(34,82,158,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] sm:gap-4 sm:px-5"
            onClick={onSearch}
            type="button"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#44c9ef,#535cf2)] text-white">
              <Sparkles aria-hidden="true" size={21} strokeWidth={1.8} />
            </span>
            <span aria-hidden="true" className="h-4 w-px shrink-0 bg-[#dfe4ed]" />
            <span className="min-w-0 flex-1 truncate text-[14px] font-normal text-[#a0a7b2] sm:text-[16px]">
              Search for connectors, deployment, workflows and more
            </span>
            <Search aria-hidden="true" className="shrink-0 text-[#9ca3af] sm:hidden" size={16} />
            <kbd className="hidden shrink-0 px-2 py-1 text-[12px] font-semibold whitespace-nowrap text-[#9ca3af] sm:inline">
              Ctrl K
            </kbd>
          </button>

          <div className="mx-auto mt-6 flex max-w-[1300px] flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {popular.map((item) => (
              <a
                className="inline-flex w-max items-center gap-3 rounded-full bg-[linear-gradient(93.13deg,#ebf9ff_0%,#ecf4ff_189.43%)] px-3 py-2 text-[14px] leading-6 font-medium whitespace-nowrap text-[#194185] no-underline shadow-[0_4px_12px_-1px_rgba(10,13,18,0.08)] transition-[color,box-shadow] duration-200 hover:bg-[linear-gradient(93.13deg,#def3ff_0%,#dbeaff_189.43%)] hover:text-[#086cf5] hover:shadow-[0_4px_12px_-1px_rgba(10,13,18,0.10)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] sm:text-[16px]"
                href={item.href}
                key={item.title}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt=""
                  aria-hidden="true"
                  className="block h-4 w-4 shrink-0 object-contain"
                  height={16}
                  loading="lazy"
                  src={item.image}
                  width={16}
                />
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </section>

        <ReleaseCarousel />

        <section aria-labelledby="docs-quick-setup-title" className="mx-auto mt-24 max-w-[1300px] text-center sm:mt-28">
          <span className="inline-flex items-center justify-center rounded-full bg-[#edf8ff] px-5 py-2 text-[14px] font-medium text-[#079bea]">
            How-to Guides
          </span>
          <h2
            className="m-0 mt-5 text-[clamp(30px,3.5vw,40px)] leading-[1.2] font-normal tracking-[-0.025em] text-[#181d27]"
            id="docs-quick-setup-title"
          >
            Quick Setup Guides
          </h2>
          <p className="mx-auto mt-4 max-w-[900px] text-[16px] leading-[1.5] text-[#717680] sm:text-[18px]">
            Dive into our library of guides to explore data with Collate 2.0.
          </p>
          <div className="mt-[52px] grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 xl:gap-6">
            {guides.map((guide) => (
              <a
                className="group flex min-h-[164px] min-w-0 flex-col items-center justify-center gap-4 rounded-[20px] bg-white px-4 py-5 text-[#252b37] no-underline shadow-[0_4px_12px_-1px_rgba(10,13,18,0.08)] transition-[background-color,color,box-shadow] duration-300 hover:bg-[#f6fbff] hover:text-[#076cf5] hover:shadow-[0_6px_18px_-1px_rgba(10,13,18,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
                href={guide.href}
                key={guide.title}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className={'flex h-20 w-20 shrink-0 items-center justify-center rounded-full ' + guide.iconBackground}>
                  <img
                    alt=""
                    aria-hidden="true"
                    className="h-20 w-20 object-contain"
                    height={80}
                    loading="lazy"
                    src={guide.icon}
                    width={80}
                  />
                </span>
                <span className="text-center text-[16px] leading-[1.3] font-medium sm:text-[18px]">
                  {guide.title}
                </span>
              </a>
            ))}
          </div>
        </section>

        <DocsConnectors />

        <section className="mx-auto mt-24 flex max-w-[1190px] flex-col items-start justify-between gap-7 rounded-[22px] border border-[#e7ecf4] bg-[linear-gradient(110deg,#f8faff,#eff7ff)] px-7 py-8 sm:flex-row sm:items-center sm:px-11 sm:py-10">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#1677f4] shadow-sm">
              <Network aria-hidden="true" size={23} />
            </span>
            <div>
              <h2 className="m-0 text-[22px] font-semibold text-[#1c2c4c]">Built in the open</h2>
              <p className="mb-0 mt-2 max-w-[570px] text-[14px] leading-6 text-[#76839a]">
                Find the source code, report issues, and follow the project's development.
              </p>
            </div>
          </div>
          <a
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#166df2] px-5 py-3 text-[14px] font-semibold text-white no-underline hover:bg-[#055ad1]"
            href="https://github.com/weifuwan/yak-ops"
            rel="noopener noreferrer"
            target="_blank"
          >
            <BookOpen aria-hidden="true" size={17} />
            Explore GitHub
            <ArrowRight aria-hidden="true" size={16} />
          </a>
        </section>
      </div>
    </main>
  );
}
