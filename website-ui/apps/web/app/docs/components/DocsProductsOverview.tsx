import { Database, GitBranch, ShieldCheck } from 'lucide-react';

import type { DocsNavigationItem } from '@/service/docs';

import DocsCatalogCard from './DocsCatalogCard';

type DocsProductsOverviewProps = {
  items: DocsNavigationItem[];
};

const presentations: Record<string, string> = {
  'data-integration': 'Connect data sources and run batch or real-time synchronization tasks.',
  'data-development': 'Develop SQL tasks, orchestrate workflows, and schedule execution.',
  'data-governance': 'Organize data assets, explore lineage, and improve data quality.',
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

            return (
              <DocsCatalogCard
                description={presentations[id] ?? item.description}
                headingId={'doc-' + id}
                icon={<ProductIcon id={id} />}
                key={item.slug}
                title={item.title}
                to={'/docs/' + item.slug}
              />
            );
          })}
        </div>
      </section>
    </article>
  );
}
