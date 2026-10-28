import { useEffect, useState } from 'react';

type EcosystemItem = {
  name: string;
  description: string;
};

type Capability = {
  name: string;
  description?: string;
};

const connectedSystems: readonly EcosystemItem[] = [
  { name: 'Databases', description: 'Operational data' },
  { name: 'Data Warehouses', description: 'Analytics storage' },
  { name: 'Applications', description: 'Business systems' },
  { name: 'Compute Platforms', description: 'Cloud & on-premise' },
];

const dataConsumers: readonly EcosystemItem[] = [
  { name: 'Business Teams', description: 'Data for every team' },
  { name: 'Analytics & BI', description: 'Insights & reporting' },
  { name: 'Data Products', description: 'Reusable data services' },
  { name: 'AI & Innovation', description: 'Data for new ideas' },
];

const developmentCapabilities: readonly Capability[] = [
  { name: 'Data Integration', description: 'Batch & Real-time Sync' },
  { name: 'Intelligent Modeling', description: 'Models & Metrics' },
  { name: 'Data Development', description: 'Processing & Workflows' },
  { name: 'Data Services', description: 'Data APIs & Delivery' },
];

const governanceCapabilities: readonly Capability[] = [
  { name: 'Data Quality' },
  { name: 'Data Assets' },
  { name: 'Data Lineage' },
  { name: 'Data Standards' },
];

const operationsCapabilities: readonly Capability[] = [
  { name: 'Scheduling' },
  { name: 'Monitoring' },
  { name: 'Diagnostics' },
  { name: 'Recovery' },
];

const connectorPhases = ['0s', '-0.27s', '-0.54s', '-0.81s'] as const;

/**
 * A stationary dotted guide with a blue segment traveling along it, preserving
 * the previous homepage diagram's animation. Reduced-motion users see a static
 * segment instead.
 */
function FlowConnector({ reducedMotion, begin = '0s' }: { reducedMotion: boolean; begin?: string }) {
  return (
    <svg aria-hidden="true" className="block h-9 w-3 overflow-visible" viewBox="0 0 12 40">
      <path d="M6 2V38" fill="none" stroke="#9AABC7" strokeDasharray="2 5" strokeWidth="1.4" />
      <path
        d="M6 2V38"
        fill="none"
        pathLength={100}
        stroke="#2F6FED"
        strokeDasharray="22 178"
        strokeDashoffset="-40"
        strokeLinecap="round"
        strokeWidth="3"
      >
        {!reducedMotion && (
          <animate
            attributeName="stroke-dashoffset"
            begin={begin}
            dur="1.8s"
            from="25"
            repeatCount="indefinite"
            to="-100"
          />
        )}
      </path>
    </svg>
  );
}

function EcosystemRow({
  items,
  position,
  reducedMotion,
}: {
  items: readonly EcosystemItem[];
  position: 'above' | 'below';
  reducedMotion: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3 lg:grid-cols-4 lg:gap-x-6">
      {items.map((item, index) => (
        <div className="flex min-w-0 flex-col items-center" key={item.name}>
          {position === 'below' && (
            <div className="hidden lg:block">
              <FlowConnector begin={connectorPhases[index]} reducedMotion={reducedMotion} />
            </div>
          )}
          <div className="flex min-h-[76px] w-full flex-col justify-center rounded-xl border border-[#DFE6F3] bg-white px-3 py-3 text-center shadow-[0_4px_18px_rgba(42,69,110,0.035)] sm:min-h-[82px]">
            <p className="m-0 text-[14px] leading-5 font-semibold text-[#1E2A47] sm:text-[15px]">{item.name}</p>
            <p className="m-0 mt-1 text-xs leading-4 text-[#7985A0] sm:text-[13px]">{item.description}</p>
          </div>
          {position === 'above' && (
            <div className="hidden lg:block">
              <FlowConnector begin={connectorPhases[index]} reducedMotion={reducedMotion} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CapabilityCards({
  items,
  compact = false,
}: {
  items: readonly Capability[];
  compact?: boolean;
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-white/85 bg-white/90 px-3 py-4 text-center shadow-[0_2px_12px_rgba(51,71,121,0.035)]"
          key={item.name}
        >
          <p className="m-0 text-[15px] leading-5 font-semibold text-[#182547]">{item.name}</p>
          {!compact && item.description && (
            <p className="m-0 mt-1.5 text-[13px] leading-5 text-[#7885A2]">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Marketing product panorama, organized around customer-facing business domains
 * rather than YakFlow runtime internals. It represents the product direction;
 * individual capabilities must be checked against each published release.
 */
export default function YakOpsProductPanorama() {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <div aria-label="Yak Ops product capability panorama" className="mx-auto w-full max-w-[1180px]" role="group">
      <div className="mb-4 text-center">
        <p className="m-0 text-[15px] font-semibold tracking-[0.015em] text-[#243451] sm:text-lg">
          Connected Data &amp; Compute Ecosystem
        </p>
        <p className="m-0 mt-1 text-[13px] leading-5 text-[#7885A2] sm:text-sm">
          Bring data from anywhere. Deliver value everywhere.
        </p>
      </div>

      <EcosystemRow items={connectedSystems} position="above" reducedMotion={reducedMotion} />

      <div className="rounded-[22px] border-[1.5px] border-[#2F6FED] bg-[linear-gradient(135deg,#EAF2FF_0%,#F0F3FD_62%,#E7F4FC_100%)] p-3 shadow-[0_14px_45px_rgba(43,94,162,0.055)] sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-col gap-1.5 px-1 sm:flex-row sm:items-center sm:gap-4">
          <p className="m-0 shrink-0 text-[21px] leading-tight font-bold tracking-[0.075em] text-[#172B52]">
            YAK OPS
          </p>
          <span aria-hidden="true" className="hidden h-6 w-px bg-[#ABBBD3] sm:block" />
          <p className="m-0 text-[13px] leading-5 text-[#4B5E7D] sm:text-[15px]">
            Unified Data Development &amp; Governance Platform
          </p>
        </div>

        <section aria-labelledby="panorama-develop" className="rounded-[16px] border border-[#B4D1FF] bg-[#DFECFF] p-3 sm:p-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="m-0 text-[20px] leading-7 font-semibold text-[#183766] sm:text-[22px]" id="panorama-develop">
              Develop
            </h3>
            <p className="m-0 text-[13px] leading-5 text-[#5977A3] sm:text-sm">
              From raw data to ready-to-use products
            </p>
          </div>
          <CapabilityCards items={developmentCapabilities} />
        </section>

        <div className="flex justify-center">
          <FlowConnector begin="-0.35s" reducedMotion={reducedMotion} />
        </div>

        <section aria-labelledby="panorama-govern" className="rounded-[16px] border border-[#D2C3F5] bg-[#EBE5FA] p-3 sm:p-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="m-0 text-[20px] leading-7 font-semibold text-[#6549A0] sm:text-[22px]" id="panorama-govern">
              Govern
            </h3>
            <p className="m-0 text-[13px] leading-5 text-[#806DAB] sm:text-sm">
              Keep data trustworthy and discoverable
            </p>
          </div>
          <CapabilityCards compact items={governanceCapabilities} />
        </section>

        <div className="flex justify-center">
          <FlowConnector begin="-0.7s" reducedMotion={reducedMotion} />
        </div>

        <section
          aria-labelledby="panorama-operations"
          className="rounded-[16px] border border-[#A8E1EE] bg-[#E0F5FA] p-3 sm:p-4"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3
              className="m-0 text-[20px] leading-7 font-semibold text-[#245E7A] sm:text-[22px]"
              id="panorama-operations"
            >
              Operations Center
            </h3>
            <p className="m-0 text-[13px] leading-5 text-[#5C89A1] sm:text-sm">
              Run, monitor, and maintain data workflows
            </p>
          </div>
          <CapabilityCards compact items={operationsCapabilities} />
        </section>
      </div>

      <EcosystemRow items={dataConsumers} position="below" reducedMotion={reducedMotion} />
    </div>
  );
}
