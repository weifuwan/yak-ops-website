import { Database, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import type { DocsNavigationItem } from '@/service/docs';

import DocsFilterSelect from './DocsFilterSelect';

type Props = { items: DocsNavigationItem[] };

const connectorLogos: Record<string, string> = {
  mysql: '/images/integrations/MySQL.png',
  oracle: '/images/integrations/Oracle.png',
};

const typeName = (type: string) => (type === 'database' ? 'Database' : type.replaceAll('-', ' '));

function ConnectorIcon({ image }: { image?: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F5F7FA]">
      {image && !imageFailed ? (
        <img
          alt=""
          className="h-10 w-10 object-contain"
          loading="lazy"
          onError={() => setImageFailed(true)}
          src={image}
        />
      ) : (
        <Database aria-hidden="true" className="text-[#2675DB]" size={30} strokeWidth={1.8} />
      )}
    </span>
  );
}

export default function DocsConnectorOverview({ items }: Props) {
  const [query, setQuery] = useState('');
  const [serviceType, setServiceType] = useState('all');
  const [service, setService] = useState('all');
  const connectors = useMemo(
    () => items.filter((item) => item.slug.startsWith('connectors/') && item.slug !== 'connectors/overview'),
    [items],
  );
  const types = useMemo(() => Array.from(new Set(connectors.map((item) => item.slug.split('/')[1]))), [connectors]);
  const services = useMemo(
    () => connectors.filter((item) => serviceType === 'all' || item.slug.split('/')[1] === serviceType),
    [connectors, serviceType],
  );
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return services.filter(
      (item) =>
        (service === 'all' || service === item.slug) &&
        (!search || item.title.toLowerCase().includes(search) || item.description.toLowerCase().includes(search)),
    );
  }, [services, service, query]);

  return (
    <article className="pb-24 text-[#18181B]">
      <span className="mb-3 inline-flex rounded-full bg-[#F0F9FF] px-3 py-1 text-[12px] font-medium text-[#0284C7]">
        Yak Ops Documentation
      </span>
      <h1 id="doc-connectors" className="m-0 scroll-mt-[190px] text-[36px] font-semibold tracking-[-0.03em]">
        Connectors
      </h1>
      <p className="mt-4 mb-9 text-[16px] leading-7 text-[#667085]">
        Explore supported database connectors and find their configuration and usage documentation.
      </p>

      <div className="relative z-30 mb-9 rounded-xl border border-[#DDE5F2] bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.06)] lg:sticky lg:top-[158px]">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="flex min-w-0 flex-col gap-2 text-[12px] font-medium text-[#475467]">
            Search
            <span className="flex h-9 items-center gap-2 rounded-md border border-[#DFE7F5] bg-white px-3 transition-colors focus-within:border-[#2F6FED] focus-within:ring-2 focus-within:ring-[#2F6FED]/15">
              <Search aria-hidden="true" size={15} className="shrink-0 text-[#98A2B3]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search connectors..."
                className="w-full min-w-0 border-0 bg-transparent text-[13px] text-[#1D2939] outline-none placeholder:text-[#98A2B3]"
              />
            </span>
          </label>
          <DocsFilterSelect
            label="Service Type"
            onChange={(nextType) => {
              setServiceType(nextType);
              setService('all');
            }}
            options={[
              { value: 'all', label: 'All Service Types' },
              ...types.map((type) => ({ value: type, label: typeName(type) })),
            ]}
            value={serviceType}
          />
          <DocsFilterSelect
            label="Service"
            onChange={setService}
            options={[
              { value: 'all', label: 'All Services' },
              ...services.map((item) => ({ value: item.slug, label: item.title })),
            ]}
            value={service}
          />
        </div>
      </div>

      <p className="mb-8 text-[13px] text-[#667085]">Select a connector to open its documentation.</p>
      {types.map((type) => {
        const matches = filtered.filter((item) => item.slug.split('/')[1] === type);
        if (!matches.length) return null;
        return (
          <section className="mb-12" aria-labelledby={`doc-${type}`} key={type}>
            <h2
              id={`doc-${type}`}
              className="mb-5 scroll-mt-[270px] text-[25px] font-semibold tracking-[-0.02em] text-[#1D2939]"
            >
              {typeName(type)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {matches.map((item) => {
                const id = item.slug.substring(item.slug.lastIndexOf('/') + 1);
                return (
                  <Link
                    className="group relative flex min-h-[112px] items-center gap-4 rounded-2xl bg-white px-5 py-5 text-[#1D2939] no-underline shadow-[0_5px_14px_rgba(15,23,42,0.09)] transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] focus-visible:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] after:pointer-events-none after:absolute after:inset-x-6 after:bottom-0 after:h-5 after:rounded-full after:opacity-0 after:shadow-[0_14px_12px_-8px_rgba(15,23,42,0.23)] after:transition-opacity after:duration-[280ms] after:ease-[cubic-bezier(0.22,1,0.36,1)] after:content-[''] hover:after:opacity-100 focus-visible:after:opacity-100 motion-reduce:transform-none motion-reduce:transition-none motion-reduce:after:transition-none"
                    key={item.slug}
                    to={'/docs/' + item.slug}
                  >
                    <ConnectorIcon image={connectorLogos[id]} />
                    <h3 className="m-0 min-w-0 text-[20px] leading-7 font-semibold text-[#1D2939]">{item.title}</h3>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#DDE5F2] py-12 text-center text-[14px] text-[#667085]">
          No connectors match the selected filters.
        </div>
      ) : null}
    </article>
  );
}
