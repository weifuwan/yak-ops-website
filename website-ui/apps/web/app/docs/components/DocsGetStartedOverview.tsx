import { BookOpen, ClipboardList } from 'lucide-react';

import type { DocsNavigationItem } from '@/service/docs';

import DocsCatalogCard from './DocsCatalogCard';

type Props = { items: DocsNavigationItem[] };

const startHere = [
  {
    slug: 'getting-started/platform-overview',
    title: 'Overview',
    description: 'Understand Yak Ops and the path to your first data workflow.',
    icon: BookOpen,
  },
  {
    slug: 'getting-started/before-you-begin',
    title: 'Before You Begin',
    description: 'Prepare your environment and review prerequisites.',
    icon: ClipboardList,
  },
];

const steps = [
  {
    slug: 'getting-started/deploy',
    title: 'Deploy Yak Ops',
    description: 'Set up the platform and verify your installation.',
  },
  {
    slug: 'getting-started/connect-data',
    title: 'Connect Your Data',
    description: 'Register a database connection and validate access.',
  },
  {
    slug: 'getting-started/integrate-data',
    title: 'Integrate Your Data',
    description: 'Explore your first batch or real-time synchronization task.',
  },
  {
    slug: 'getting-started/build-workflow',
    title: 'Build Your First Workflow',
    description: 'Learn how to organize and schedule data processing tasks.',
  },
  {
    slug: 'getting-started/data-governance',
    title: 'Explore Data Governance',
    description: 'Discover data assets, lineage, and quality capabilities.',
  },
];

export default function DocsGetStartedOverview({ items }: Props) {
  const available = new Set(items.map((item) => item.slug));

  return (
    <article className="pb-24 text-[#18181B]">
      <span className="mb-3 inline-flex rounded-full bg-[#F0F9FF] px-3 py-1 text-[12px] font-medium text-[#0284C7]">
        Yak Ops Documentation
      </span>
      <h1
        className="m-0 scroll-mt-[190px] text-[36px] font-semibold leading-[1.2] tracking-[-0.03em]"
        id="doc-get-started"
      >
        Get Started
      </h1>
      <p className="mt-4 mb-11 text-[16px] leading-7 text-[#667085]">
        Everything you need to get started with Yak Ops — from deployment to your first data workflow.
      </p>

      <section aria-labelledby="doc-start-here" className="mb-12">
        <h2
          className="mb-6 scroll-mt-[190px] text-[26px] font-semibold tracking-[-0.02em] text-[#1D2939]"
          id="doc-start-here"
        >
          Start Here
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {startHere.filter((entry) => available.has(entry.slug)).map((entry) => {
            const Icon = entry.icon;
            return (
              <DocsCatalogCard
                description={entry.description}
                icon={<Icon aria-hidden="true" size={22} strokeWidth={1.8} />}
                key={entry.slug}
                title={entry.title}
                to={'/docs/' + entry.slug}
              />
            );
          })}
        </div>
      </section>

      <section aria-labelledby="doc-lets-get-started">
        <h2
          className="mb-6 scroll-mt-[190px] text-[26px] font-semibold tracking-[-0.02em] text-[#1D2939]"
          id="doc-lets-get-started"
        >
          Let's Get Started
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {steps.filter((entry) => available.has(entry.slug)).map((entry) => {
            const step = steps.indexOf(entry) + 1;
            return (
              <DocsCatalogCard
                description={entry.description}
                icon={
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E7F0FF] text-[12px] font-semibold text-[#086cf5]"
                  >
                    {step}
                  </span>
                }
                key={entry.slug}
                title={`Step ${step} – ${entry.title}`}
                to={'/docs/' + entry.slug}
              />
            );
          })}
        </div>
      </section>
    </article>
  );
}
