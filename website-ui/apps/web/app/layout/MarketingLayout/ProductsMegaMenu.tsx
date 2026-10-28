import { ArrowUpRight, BookOpen, Layers3 } from 'lucide-react';

type ProductEntry = {
  label: string;
  description: string;
  href: string;
  icon: string;
};

const collateAi: readonly ProductEntry[] = [
  { label: 'Collate AI', description: 'The AI layer for data', href: '/collate-ai', icon: 'collate-ai-icon.svg' },
  { label: 'AI Studio & AI SDK', description: 'Code & no code agents', href: '/ai-studio-ai-sdk', icon: 'ai-studio.svg' },
  { label: 'AskCollate', description: 'Conversational data UI', href: '/askcollate', icon: 'ask-collate.svg' },
  { label: 'AI Analytics', description: 'Governed exploration', href: '/ai-analytics', icon: 'ai-analytics.svg' },
  { label: 'AI Native Experience', description: 'Embedded AI workflows', href: '/ai-native-experience', icon: 'ai-native.svg' },
  { label: 'Context Center', description: 'Context for teams and AI', href: '/context-center', icon: 'context-center.svg' },
];

const capabilitiesLeft: readonly ProductEntry[] = [
  { label: 'Data Discovery', description: 'Beyond the data catalog', href: '/data-discovery', icon: 'data-discovery-icon.svg' },
  { label: 'Data Lineage', description: 'Trace data end to end', href: '/data-lineage', icon: 'data-lineage-icon.svg' },
  { label: 'Data Quality', description: 'Complete quality solution', href: '/data-quality', icon: 'data-quality-icon.svg' },
  { label: 'Data Observability', description: 'See into your pipelines', href: '/data-observability', icon: 'data-observability-icon.svg' },
  { label: 'Data Governance', description: 'Trust and compliance', href: '/data-governance', icon: 'data-governance-icon.svg' },
];

const capabilitiesRight: readonly ProductEntry[] = [
  { label: 'AI Governance Studio', description: 'Govern every AI asset', href: '/ai-governance-studio', icon: 'ai-governance-icon.svg' },
  { label: 'Data Contracts', description: 'Codify data trust', href: '/data-contracts', icon: 'data-contracts.svg' },
  { label: 'Data Marketplace', description: 'Self-serve data products', href: '/data-marketplace', icon: 'data-marketplace-icon.svg' },
  { label: 'Data Insights', description: 'Health, KPIs, and cost', href: '/data-insights', icon: 'data-insights-icon.svg' },
  { label: 'Data Collaboration', description: 'Collaborate in context', href: '/data-collaboration', icon: 'data-collaboration-icon.svg' },
];

/**
 * Reference-copy Products mega menu. The linked copy and SVG icon sources are
 * intentionally Collate's for visual review; replace them together when the
 * site navigation is adapted to Yak Ops.
 */
function ProductLink({ entry, onNavigate }: { entry: ProductEntry; onNavigate: () => void }) {
  return (
    <a
      className="group flex min-h-[65px] items-center gap-2 rounded-[8px] px-2 py-2 text-[#101016] transition-colors hover:bg-[#e8f1ff] focus-visible:bg-[#e8f1ff] focus-visible:outline-2 focus-visible:outline-[#1677ff]"
      href={`https://www.getcollate.io${entry.href}`}
      onClick={onNavigate}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[12px] bg-white">
        <img
          alt=""
          aria-hidden="true"
          className="h-[45px] w-[45px] object-contain"
          height="45"
          loading="lazy"
          src={`https://www.getcollate.io/assets/navbar/${entry.icon}`}
          width="45"
        />
      </span>
      <span className="min-w-0">
        <span className="block text-[16px] leading-[1.2] font-medium text-[#12121a] group-hover:text-[#086cf4]">
          {entry.label}
        </span>
        <span className="mt-1 block text-[14px] leading-[1.35] font-normal text-[#82829e]">{entry.description}</span>
      </span>
    </a>
  );
}

function PlatformLink({
  label,
  subtitle,
  href,
  icon,
  onNavigate,
}: {
  label: string;
  subtitle: string;
  href: string;
  icon: 'collate' | 'metadata' | 'comparison';
  onNavigate: () => void;
}) {
  return (
    <a
      className="group flex min-h-[72px] items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-[#1677ff]"
      href={href}
      onClick={onNavigate}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-white">
        {icon === 'collate' && <Layers3 aria-hidden="true" className="text-[#00b8fa]" size={29} strokeWidth={1.8} />}
        {icon === 'metadata' && (
          <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 28 28">
            <ellipse cx="14" cy="7" rx="8" ry="4" stroke="#7955e9" strokeWidth="3" />
            <path d="M6 7v14c5 5 11 5 16 0V7M6 15c5 5 11 5 16 0M14 12v10" stroke="#7955e9" strokeWidth="3" />
          </svg>
        )}
        {icon === 'comparison' && <span className="text-[17px] font-bold italic text-[#35364f]">VS</span>}
      </span>
      <span className="min-w-0">
        <span className="block text-[16px] leading-[1.2] font-medium text-[#111119] group-hover:text-[#086cf4]">{label}</span>
        <span className="mt-1 block text-[14px] leading-[1.35] text-[#82829e]">{subtitle}</span>
      </span>
    </a>
  );
}

export default function ProductsMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      aria-label="Products"
      className="grid max-h-[calc(100vh-68px)] grid-cols-[340px_minmax(0,1fr)] overflow-y-auto rounded-[20px] bg-[linear-gradient(145deg,#f4f4f5_20%,#e3eef9_100%)] text-[#151b34] shadow-[0_10px_24px_rgba(23,48,83,0.15)]"
      id="yak-marketing-menu-products"
    >
      <aside className="flex min-h-[542px] min-w-0 flex-col px-7 pt-7 pb-5">
        <p className="m-0 text-[12px] leading-5 tracking-[0.04em] text-[#83849f]">PLATFORM</p>
        <div className="mt-5 flex flex-col gap-2">
          <PlatformLink
            href="https://www.getcollate.io/product"
            icon="collate"
            label="The Agentic Data Platform"
            onNavigate={onNavigate}
            subtitle="Built on OpenMetadata"
          />
          <PlatformLink
            href="https://www.getcollate.io/openmetadata"
            icon="metadata"
            label="OpenMetadata"
            onNavigate={onNavigate}
            subtitle="The Open Context Platform"
          />
          <PlatformLink
            href="https://www.getcollate.io/collate-vs-openmetadata"
            icon="comparison"
            label="Collate vs OpenMetadata"
            onNavigate={onNavigate}
            subtitle="Managed vs open source"
          />
        </div>

        <div className="mt-5 border-t border-[#b8d7fd] pt-6">
          <a
            className="group flex min-h-[92px] items-center gap-2 rounded-[11px] bg-white px-3 py-3 transition-colors hover:bg-[#f6fbff]"
            href="https://www.getcollate.io/blog"
            onClick={onNavigate}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="flex h-[70px] w-[80px] shrink-0 items-center justify-center rounded-[11px] bg-[linear-gradient(135deg,#02bef6,#0878f7)] text-[24px] font-bold text-white">
              v2.0
            </span>
            <span className="min-w-0">
              <span className="inline-flex rounded-sm bg-[#d9ebff] px-2 py-0.5 text-[12px] leading-4 text-[#1684fa]">NEW</span>
              <span className="mt-1 block text-[15px] leading-5 font-semibold text-[#24284b]">Release Overview</span>
              <span className="mt-1 flex items-center gap-1 text-[14px] text-[#135ac7]">
                Read More <ArrowUpRight aria-hidden="true" size={13} />
              </span>
            </span>
          </a>
          <a
            className="mt-3 block text-[14px] font-medium text-[#1557be] hover:underline"
            href="https://www.getcollate.io/blog"
            onClick={onNavigate}
            rel="noopener noreferrer"
            target="_blank"
          >
            View all releases →
          </a>
          <a
            className="group mt-4 flex min-h-[96px] items-center gap-2 rounded-[11px] bg-white px-3 py-3 transition-colors hover:bg-[#f6fbff]"
            href="https://www.getcollate.io/blog/ground-your-ai-in-standards-based-knowledge-with-ontology-explorer"
            onClick={onNavigate}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="flex h-[74px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#dcecff]">
              <svg aria-hidden="true" fill="none" viewBox="0 0 80 74" className="h-full w-full">
                {Array.from({ length: 12 }, (_, i) => (
                  <path
                    d={`M${-5 + i * 4} 3 Q${40 + i * 2} ${16 + i * 3} ${15 + i * 5} 80`}
                    key={i}
                    stroke="#2185f5"
                    strokeOpacity={0.2 + i * 0.045}
                    strokeWidth="0.9"
                  />
                ))}
              </svg>
            </span>
            <span className="min-w-0">
              <span className="inline-flex rounded-sm bg-[#d9ebff] px-2 py-0.5 text-[12px] leading-4 text-[#1684fa]">
                NEW
              </span>
              <span className="mt-1 block text-[15px] leading-5 font-semibold text-[#24284b]">Semantic Context for AI</span>
              <span className="mt-1 flex items-center gap-1 text-[14px] text-[#135ac7]">
                Read the explainer <ArrowUpRight aria-hidden="true" size={13} />
              </span>
            </span>
          </a>
        </div>
      </aside>

      <div className="m-4 ml-0 grid min-w-0 grid-cols-3 gap-x-3 rounded-2xl bg-white/50 p-6">
        <section className="min-w-0">
          <h2 className="m-0 mb-5 text-[12px] leading-5 font-medium tracking-[0.04em] text-[#777994]">COLLATE AI</h2>
          <div className="flex flex-col gap-3">
            {collateAi.map((entry) => (
              <ProductLink entry={entry} key={entry.label} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
        <section className="min-w-0">
          <h2 className="m-0 mb-5 text-[12px] leading-5 font-medium tracking-[0.04em] text-[#777994]">CAPABILITIES</h2>
          <div className="flex flex-col gap-3">
            {capabilitiesLeft.map((entry) => (
              <ProductLink entry={entry} key={entry.label} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
        <section className="min-w-0 pt-10">
          <div className="flex flex-col gap-3">
            {capabilitiesRight.map((entry) => (
              <ProductLink entry={entry} key={entry.label} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
