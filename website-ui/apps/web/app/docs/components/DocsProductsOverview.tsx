import { ArrowUpRight, Database, GitBranch, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { DocsNavigationItem } from '@/service/docs';

type DocsProductsOverviewProps = {
  items: DocsNavigationItem[];
};

const presentations: Record<string, { description: string; capabilities: string[] }> = {
  'data-integration': {
    description: 'Connect your data sources and run batch or real-time synchronization tasks.',
    capabilities: ['Data Sources', 'Batch Sync', 'Real-time Sync'],
  },
  'data-development': {
    description: 'Develop data processing tasks, orchestrate workflows, and schedule execution.',
    capabilities: ['SQL Development', 'Workflows', 'Scheduling'],
  },
  'data-governance': {
    description: 'Organize data assets, understand lineage, and improve data reliability.',
    capabilities: ['Data Quality', 'Data Lineage', 'Data Assets'],
  },
};

function ProductIcon({ id }: { id: string }) {
  if (id === 'data-integration') {
    return <Database aria-hidden="true" className="text-[#2675DB]" size={22} strokeWidth={1.8} />;
  }
  if (id === 'data-development') {
    return <GitBranch aria-hidden="true" className="text-[#7C58D3]" size={22} strokeWidth={1.8} />;
  }
  return <ShieldCheck aria-hidden="true" className="text-[#12977F]" size={22} strokeWidth={1.8} />;
}

export default function DocsProductsOverview({ items }: DocsProductsOverviewProps) {
  const products = items.filter((item) => item.slug.startsWith('products/') && item.slug !== 'products/overview');

  return (
    <article className="pb-24 text-[#18181B]">
      <span className="mb-3 inline-flex rounded-full bg-[#F0F9FF] px-3 py-1 text-[12px] font-medium text-[#0284C7]">
        Yak Ops Documentation
      </span>
      <h1
        className="m-0 scroll-mt-[190px] text-[36px] font-semibold leading-[1.2] tracking-[-0.03em]"
        id="doc-products"
      >
        Products
      </h1>
      <p className="mt-4 mb-11 text-[16px] leading-7 text-[#667085]">
        Explore Yak Ops data integration, development, and governance. Choose a product to open its documentation.
      </p>

      <section aria-labelledby="doc-platform-capabilities">
        <h2
          className="mb-6 scroll-mt-[190px] text-[26px] font-semibold tracking-[-0.02em] text-[#1D2939]"
          id="doc-platform-capabilities"
        >
          Platform Capabilities
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((item) => {
            const id = item.slug.substring(item.slug.lastIndexOf('/') + 1);
            const presentation = presentations[id];

            return (
              <Link
                className="group flex min-h-[188px] items-start gap-4 rounded-2xl border border-[#EDF0F4] bg-white px-5 py-5 text-[#1D2939] no-underline shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition-[border-color,box-shadow] hover:border-[#B8DDFF] hover:shadow-[0_6px_20px_rgba(15,23,42,0.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
                key={item.slug}
                to={'/docs/' + item.slug}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F6F8FC]">
                  <ProductIcon id={id} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3
                    className="m-0 scroll-mt-[190px] text-[17px] font-semibold leading-6 text-[#1D2939] group-hover:text-[#086cf5]"
                    id={'doc-' + id}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-1.5 mb-3 text-[13px] leading-[1.65] text-[#667085]">
                    {presentation?.description ?? item.description}
                  </p>
                  {presentation ? (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] leading-5 text-[#667085]">
                      {presentation.capabilities.map((capability) => (
                        <span key={capability}>{capability}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[#98A2B3] transition-colors group-hover:text-[#086cf5]"
                  size={16}
                />
              </Link>
            );
          })}
        </div>
      </section>
    </article>
  );
}
