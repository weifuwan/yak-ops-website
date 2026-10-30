import { ArrowRight, DatabaseZap, GitBranch, PlugZap, RefreshCw, ShieldCheck, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Highlight = {
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
};

const highlights: readonly Highlight[] = [
  {
    title: 'Data Integration',
    description: 'Connect data sources and move data with batch and real-time synchronization.',
    to: '/docs/products/data-integration',
    icon: DatabaseZap,
  },
  {
    title: 'Data Development',
    description: 'Develop data tasks, build workflows, and schedule reliable execution.',
    to: '/docs/products/data-development',
    icon: Workflow,
  },
  {
    title: 'Data Governance',
    description: 'Explore data quality, lineage, and asset management capabilities.',
    to: '/docs/products/data-governance',
    icon: ShieldCheck,
  },
  {
    title: 'MySQL CDC',
    description: 'Capture initial snapshots and ongoing database changes with MySQL CDC.',
    to: '/docs/connectors/database/mysql',
    icon: RefreshCw,
  },
  {
    title: 'Workflow Orchestration',
    description: 'Organize task dependencies and coordinate scheduled data workflows.',
    to: '/docs/getting-started/build-workflow',
    icon: GitBranch,
  },
  {
    title: 'Database Connectors',
    description: 'Explore MySQL, PostgreSQL, and Oracle connector configuration guides.',
    to: '/docs/connectors/overview',
    icon: PlugZap,
  },
];

export default function DocsHighlights() {
  return (
    <section
      aria-labelledby="docs-highlights-title"
      className="mx-auto w-full max-w-[1300px] px-5 pt-12 pb-24 text-center sm:px-12"
    >
      <span className="inline-flex items-center justify-center rounded-full bg-[#f0f9ff] px-5 py-2 text-[14px] font-medium text-[#0ba5ec]">
        Highlights
      </span>
      <h2
        className="m-0 mt-6 text-[clamp(30px,3.5vw,40px)] leading-[1.2] font-medium tracking-[-0.025em] text-[#181d27]"
        id="docs-highlights-title"
      >
        Explore Yak Ops Capabilities
      </h2>
      <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-[1.5] text-[#717680] sm:text-[18px]">
        Discover how Yak Ops brings data integration, development, and governance together in one platform.
      </p>

      <div className="mx-auto mt-[60px] grid w-full max-w-[850px] grid-cols-1 gap-8 text-left sm:grid-cols-2">
        {highlights.map((highlight) => {
          const Icon = highlight.icon;
          return (
            <article
              className="flex min-w-0 flex-col rounded-[20px] border border-[#edf0f5] bg-white p-7 shadow-[0_4px_12px_-1px_rgba(10,13,18,0.06)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#d6e8ff] hover:bg-[#fbfdff] hover:shadow-[0_6px_16px_-1px_rgba(10,13,18,0.09)]"
              key={highlight.title}
            >
              <Icon aria-hidden="true" className="shrink-0 text-[#087bf5]" size={48} strokeWidth={1.7} />
              <h3 className="m-0 mt-3 text-[20px] leading-[1.35] font-medium text-[#181d27]">{highlight.title}</h3>
              <p className="mt-3 mb-6 text-[15px] leading-[1.7] text-[#667085]">{highlight.description}</p>
              <Link
                className="mt-auto inline-flex w-fit items-center gap-2 text-[15px] font-medium text-[#086cf5] no-underline hover:text-[#004cd3] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
                to={highlight.to}
              >
                Learn More
                <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
