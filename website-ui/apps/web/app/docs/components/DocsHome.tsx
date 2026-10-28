import {
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Network,
  Play,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type DocsHomeProps = {
  onSearch: () => void;
};

type Entry = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

const popular: readonly Entry[] = [
  { title: 'Docker Compose', href: '/docs/deploy/docker-compose', icon: Server },
  { title: 'MySQL CDC', href: '/product/realtime-sync', icon: ArrowRightLeft },
  { title: 'Data Sources', href: '/product/data-sources', icon: Database },
  { title: 'Workflows', href: '/product/workflows', icon: Workflow },
  { title: 'Data Quality', href: '/product/data-quality', icon: ShieldCheck },
  { title: 'Batch Sync', href: '/product/batch-sync', icon: Layers3 },
  { title: 'Data Lineage', href: '/product/lineage', icon: GitBranch },
  { title: 'Data Services', href: '/product/data-services', icon: Network },
];

const guides: readonly Entry[] = [
  {
    title: 'Quick Start',
    description: 'Get familiar with the platform and its core workflows.',
    href: '/developers/quick-start',
    icon: Play,
  },
  {
    title: 'Docker Compose',
    description: 'Deploy Yak Ops using the Docker Compose guide.',
    href: '/docs/deploy/docker-compose',
    icon: Server,
  },
  {
    title: 'Data Sources',
    description: 'Explore how data connections fit into Yak Ops.',
    href: '/product/data-sources',
    icon: Database,
  },
  {
    title: 'Realtime Sync',
    description: 'Learn about continuous change data capture.',
    href: '/product/realtime-sync',
    icon: ArrowRightLeft,
  },
  {
    title: 'Workflows',
    description: 'Connect data tasks into repeatable processes.',
    href: '/product/workflows',
    icon: Workflow,
  },
  {
    title: 'Developer Guide',
    description: 'Set up a development environment and explore APIs.',
    href: '/developers/development',
    icon: Code2,
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
] as const;

function PipelineIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-xl border border-[#d8e6fc] bg-white/90 shadow-[0_18px_45px_rgba(36,77,159,0.12)]"
    >
      <div className="flex h-9 items-center gap-2 border-b border-[#e8eef8] bg-white px-3">
        <span className="h-2 w-2 rounded-full bg-[#c9dafa]" />
        <span className="h-2 w-2 rounded-full bg-[#c9dafa]" />
        <span className="h-2 w-2 rounded-full bg-[#c9dafa]" />
        <span className="ml-3 h-2 w-24 rounded-full bg-[#e9eef7]" />
        <span className="ml-auto h-4 w-14 rounded-full bg-[#e3efff]" />
      </div>
      <div className="grid grid-cols-[82px_minmax(0,1fr)] sm:grid-cols-[105px_minmax(0,1fr)]">
        <div className="flex flex-col gap-3 border-r border-[#e8eef8] bg-[#f7faff] px-3 py-5">
          <span className="h-2 w-3/4 rounded bg-[#bdd8fd]" />
          <span className="h-2 w-full rounded bg-[#e0e8f5]" />
          <span className="h-2 w-4/5 rounded bg-[#e0e8f5]" />
          <span className="h-2 w-3/4 rounded bg-[#e0e8f5]" />
          <span className="mt-4 h-2 w-full rounded bg-[#e0e8f5]" />
          <span className="h-2 w-4/5 rounded bg-[#e0e8f5]" />
        </div>
        <div className="min-w-0 px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <span className="h-2.5 w-32 max-w-[60%] rounded bg-[#c4d8f4]" />
            <span className="h-5 w-14 rounded-md bg-[#dceafe]" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {['Sources', 'Pipelines', 'Tasks'].map((label, index) => (
              <div className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-2 py-2" key={label}>
                <span className="block text-[9px] font-medium text-[#8d9bb3]">{label}</span>
                <span className="mt-2 block text-base font-semibold text-[#175dbd]">{[12, 8, 24][index]}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-[98px] items-end gap-[7px] rounded-lg bg-[#f7faff] px-3 pb-3 pt-4">
            {[32, 50, 42, 70, 54, 85, 65, 77, 62, 92, 68, 80].map((value, index) => (
              <span
                className="min-w-0 flex-1 rounded-t bg-[linear-gradient(180deg,#319dff,#8fc7ff)]"
                key={index}
                style={{ height: value + '%' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReleaseCarousel() {
  const [current, setCurrent] = useState(0);
  const slide = updates[current];
  const Icon = slide.icon;
  const move = (step: number) => setCurrent((index) => (index + step + updates.length) % updates.length);

  return (
    <section aria-label="Featured documentation" className="relative mx-auto mt-0 max-w-[1190px]">
      <div className="overflow-hidden rounded-[24px] bg-[linear-gradient(110deg,#e1e4ff_0%,#d4efff_55%,#c8f4ff_100%)] px-6 py-9 sm:px-12 sm:py-12">
        <div className="grid items-center gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <PipelineIllustration />
          <div className="max-w-[440px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/65 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#087bd1]">
              <Icon aria-hidden="true" size={14} />
              {slide.eyebrow}
            </div>
            <h2 className="m-0 text-[clamp(26px,3vw,34px)] leading-[1.18] font-semibold tracking-[-0.03em] text-[#17223d]">
              {slide.title}
            </h2>
            <p className="mt-4 max-w-[40ch] text-[15px] leading-[1.75] text-[#49576b] sm:text-[16px]">
              {slide.description}
            </p>
            <Link
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[#0768df] no-underline hover:text-[#054dab] hover:underline"
              to={slide.href}
            >
              {slide.action}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          aria-label="Previous feature"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#dce7f8] bg-white text-[#26528e] transition-colors hover:bg-[#eaf4ff] focus-visible:outline-2 focus-visible:outline-[#1677ff]"
          onClick={() => move(-1)}
          type="button"
        >
          <ArrowLeft aria-hidden="true" size={17} />
        </button>
        <div aria-label="Feature slides" className="flex items-center gap-2">
          {updates.map((update, index) => (
            <button
              aria-current={index === current ? 'true' : undefined}
              aria-label={'Show ' + update.title}
              className={index === current ? 'h-2 w-6 rounded-full bg-[#1875ee]' : 'h-2 w-2 rounded-full bg-[#cad9ec] hover:bg-[#9abce9]'}
              key={update.title}
              onClick={() => setCurrent(index)}
              type="button"
            />
          ))}
        </div>
        <button
          aria-label="Next feature"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#dce7f8] bg-white text-[#26528e] transition-colors hover:bg-[#eaf4ff] focus-visible:outline-2 focus-visible:outline-[#1677ff]"
          onClick={() => move(1)}
          type="button"
        >
          <ArrowRight aria-hidden="true" size={17} />
        </button>
      </div>
    </section>
  );
}

export default function DocsHome({ onSearch }: DocsHomeProps) {
  return (
    <main className="min-h-screen bg-white pb-28 text-[#192238]">
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8">
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

          <div className="mx-auto mt-6 flex max-w-[1300px] flex-wrap items-center justify-center gap-x-4 gap-y-3 lg:gap-x-6">
            {popular.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  className="inline-flex w-max items-center gap-3 rounded-full bg-[linear-gradient(93.13deg,#ebf9ff_0%,#ecf4ff_189.43%)] px-3 py-2 text-[14px] leading-6 font-medium whitespace-nowrap text-[#194185] no-underline shadow-[0_4px_12px_-1px_rgba(10,13,18,0.08)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_16px_-1px_rgba(10,13,18,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] sm:text-[16px]"
                  key={item.title}
                  to={item.href}
                >
                  <Icon aria-hidden="true" className="shrink-0 text-[#1695ec]" size={16} strokeWidth={1.8} />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </section>

        <ReleaseCarousel />

        <section className="mx-auto mt-24 max-w-[1190px] text-center sm:mt-28">
          <span className="inline-flex rounded-full bg-[#f4eeff] px-4 py-1.5 text-[12px] font-semibold text-[#7353c8]">
            HOW-TO GUIDES
          </span>
          <h2 className="m-0 mt-4 text-[clamp(28px,3.5vw,39px)] font-semibold tracking-[-0.03em] text-[#192238]">
            Quick Setup Guides
          </h2>
          <p className="mx-auto mt-3 max-w-[630px] text-[15px] leading-7 text-[#7b8494] sm:text-[16px]">
            From your first deployment to a production data workflow, start with practical guides.
          </p>
          <div className="mt-9 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  className="group flex min-h-[145px] gap-4 rounded-2xl border border-[#e6ecf5] bg-white p-5 no-underline transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-[#c8dfff] hover:shadow-[0_12px_30px_rgba(22,55,112,0.08)]"
                  key={guide.title}
                  to={guide.href}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef7ff] text-[#1677f7]">
                    <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2 text-[16px] font-semibold text-[#202b43] group-hover:text-[#086cf4]">
                      {guide.title}
                      <ArrowRight aria-hidden="true" className="shrink-0 text-[#a4b4ca] group-hover:text-[#086cf4]" size={16} />
                    </span>
                    <span className="mt-2 block text-[13px] leading-[1.65] text-[#768298]">
                      {guide.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-[1190px] sm:mt-28">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-[#f4eeff] px-4 py-1.5 text-[12px] font-semibold text-[#7353c8]">
              DATA PLATFORM
            </span>
            <h2 className="m-0 mt-4 text-[clamp(28px,3.5vw,39px)] font-semibold tracking-[-0.03em]">
              Explore the Data Lifecycle
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[#7b8494] sm:text-[16px]">
              Discover the key parts of Yak Ops, from data connections to trusted data products.
            </p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {[
              { title: 'Connect', description: 'Explore your available data sources and integration options.', href: '/product/data-sources', icon: Database },
              { title: 'Build', description: 'Develop, schedule, and operate repeatable data workflows.', href: '/product/data-development', icon: GitBranch },
              { title: 'Govern', description: 'Understand lineage, quality, and the context around your data.', href: '/product/data-quality', icon: CheckCircle2 },
            ].map((entry) => {
              const Icon = entry.icon;
              return (
                <Link
                  className="group rounded-2xl border border-[#e5edf7] bg-[#f9fbff] px-6 py-7 no-underline transition-colors hover:border-[#b7d8fd] hover:bg-[#f0f7ff]"
                  key={entry.title}
                  to={entry.href}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#1377f4] shadow-sm">
                    <Icon aria-hidden="true" size={23} />
                  </span>
                  <h3 className="m-0 mt-6 flex items-center justify-between text-[19px] font-semibold text-[#1b2842]">
                    {entry.title}
                    <ArrowRight aria-hidden="true" className="text-[#91a8c3] group-hover:text-[#086cf4]" size={18} />
                  </h3>
                  <p className="mb-0 mt-3 text-[14px] leading-[1.7] text-[#78849a]">{entry.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

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
