import type { ReactNode } from "react";

export type HomeUseCaseId =
  | "workflows"
  | "integration"
  | "quality"
  | "services"
  | "operations";

export interface HomeUseCaseContent {
  id: HomeUseCaseId;
  eyebrow: string;
  title: string;
  description: string;
  sourceLabel: string;
  outputLabel: string;
}

interface HomeUseCasePreviewProps {
  useCase: HomeUseCaseContent;
}

const STATUS_STYLES = {
  success: "bg-[#4D7C5B]",
  running: "bg-[#C96442]",
  neutral: "bg-[#9C9A92]",
} as const;

function StatusDot({ tone }: { tone: keyof typeof STATUS_STYLES }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 rounded-full ${STATUS_STYLES[tone]}`}
    />
  );
}

function ReferenceTexture() {
  return (
    <svg
      viewBox="0 0 1462 674"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full text-white/10"
      aria-hidden="true"
    >
      <path
        d="M-40 560C110 485 198 610 330 520C480 418 452 232 635 270C805 306 840 474 1015 396C1165 329 1205 194 1515 178"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M-70 145C108 226 204 104 365 174C540 250 508 404 704 346C882 294 918 120 1098 176C1252 224 1314 333 1518 260"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M160 -80C252 62 180 190 286 318C374 424 510 490 552 736"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M1030 -60C918 94 952 212 1004 314C1060 423 1180 505 1192 744"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  );
}

function WindowShell({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex aspect-[5/4] w-full flex-col overflow-hidden rounded-xl bg-white">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-solid border-[#E8E6DC] px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#D1CFC5]" />
          <span className="h-2 w-2 rounded-full bg-[#DEDCD1]" />
          <span className="h-2 w-2 rounded-full bg-[#E8E6DC]" />
        </div>
        <span className="text-[10px] text-[#73726C] [font-family:'Yak_Sans',Arial,sans-serif]">
          {label}
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-[#F5F4ED] px-3 py-2.5">
      <div className="text-[15px] font-medium text-[#181817]">{value}</div>
      <div className="mt-1 text-[9px] text-[#73726C]">{label}</div>
    </div>
  );
}

function WorkflowsPreview() {
  return (
    <WindowShell label="Workflow / daily_revenue_pipeline">
      <div className="flex h-full flex-col justify-center p-5">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          {["PostgreSQL", "Transform", "Warehouse"].map((label, index) => (
            <div key={label} className="contents">
              <div className="rounded-lg border border-solid border-[#D1CFC5] p-3">
                <div className="flex items-center gap-2">
                  <StatusDot tone="success" />
                  <span className="truncate text-[10px] font-medium text-[#343330]">{label}</span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-[#E8E6DC]">
                  <div className="h-full w-3/4 rounded-full bg-[#B0AEA5]" />
                </div>
              </div>
              {index < 2 ? <span className="text-[#9C9A92]" aria-hidden="true">→</span> : null}
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg bg-[#F5F4ED] p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[10px] text-[#343330]">
              <StatusDot tone="running" />
              Running
            </span>
            <span className="text-[9px] text-[#73726C] [font-family:'Yak_Mono',monospace]">03:42 / 04:10</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-[#DEDCD1]">
            <div className="h-full w-[82%] rounded-full bg-[#C96442]" />
          </div>
        </div>
      </div>
    </WindowShell>
  );
}

function IntegrationPreview() {
  return (
    <WindowShell label="Data integration / customer_360">
      <div className="grid h-full grid-cols-[0.85fr_1.15fr] items-center gap-4 p-5">
        <div className="space-y-2">
          {["MySQL / orders", "Kafka / events", "S3 / exports"].map((source) => (
            <div key={source} className="flex items-center justify-between rounded-lg border border-solid border-[#D1CFC5] px-3 py-2.5">
              <span className="text-[9px] text-[#343330]">{source}</span>
              <StatusDot tone="success" />
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-[#F0EEE6] p-4">
          <div className="text-[9px] uppercase tracking-[0.08em] text-[#87867F]">Destination</div>
          <div className="mt-2 text-[17px] font-medium text-[#181817] [font-family:'Yak_Serif',Georgia,sans-serif]">Customer 360</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["1.2M rows", "3 sources", "CDC on", "2m lag"].map((metric) => (
              <div key={metric} className="rounded-md bg-white px-2 py-2 text-[9px] text-[#5E5D59]">{metric}</div>
            ))}
          </div>
        </div>
      </div>
    </WindowShell>
  );
}

function QualityPreview() {
  const rules = [
    ["order_id is unique", "Passed"],
    ["amount is not null", "Passed"],
    ["daily row count drift", "Review"],
    ["currency in accepted set", "Passed"],
  ] as const;

  return (
    <WindowShell label="Data quality / orders_daily">
      <div className="flex h-full flex-col justify-center p-5">
        <div className="grid grid-cols-3 gap-2">
          <Metric value="98.7%" label="Score" />
          <Metric value="24" label="Rules" />
          <Metric value="1" label="Needs review" />
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-solid border-[#D1CFC5]">
          {rules.map(([rule, status], index) => (
            <div key={rule} className={`flex items-center justify-between px-3 py-2.5 ${index === rules.length - 1 ? "" : "border-b border-solid border-[#E8E6DC]"}`}>
              <span className="flex items-center gap-2 text-[9px] text-[#343330]">
                <StatusDot tone={status === "Passed" ? "success" : "running"} />
                {rule}
              </span>
              <span className="text-[9px] text-[#73726C]">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </WindowShell>
  );
}

function ServicesPreview() {
  return (
    <WindowShell label="Data service / customer-profile-api">
      <div className="flex h-full flex-col justify-center p-5">
        <div className="rounded-xl border border-solid border-[#D1CFC5] p-4">
          <div className="flex items-center gap-3">
            <span className="rounded bg-[#181817] px-2 py-1 text-[9px] font-semibold text-white">GET</span>
            <code className="text-[10px] text-[#343330]">/api/v1/customers/:id</code>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Metric value="API key" label="Authentication" />
            <Metric value="600/min" label="Rate limit" />
            <Metric value="Enabled" label="Audit" />
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-[#141413] p-3 [font-family:'Yak_Mono',monospace]">
          <div className="text-[9px] text-[#9C9A92]">200 OK · 42 ms</div>
          <div className="mt-2 text-[9px] leading-[1.55] text-[#E8E6DC]">{`{"customer_id":"C-1048","segment":"active"}`}</div>
        </div>
      </div>
    </WindowShell>
  );
}

function OperationsPreview() {
  const runs = [
    ["daily_revenue", "Succeeded", "04:10"],
    ["customer_360", "Running", "02:18"],
    ["orders_quality", "Succeeded", "00:51"],
  ] as const;

  return (
    <WindowShell label="Operations / executions">
      <div className="flex h-full flex-col justify-center p-5">
        <div className="grid grid-cols-3 gap-2">
          <Metric value="99.4%" label="Success rate" />
          <Metric value="18" label="Running" />
          <Metric value="2.4m" label="Rows / min" />
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-solid border-[#D1CFC5]">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-solid border-[#E8E6DC] px-3 py-2 text-[8px] uppercase tracking-[0.06em] text-[#87867F]">
            <span>Job</span><span>Status</span><span>Duration</span>
          </div>
          {runs.map(([job, status, duration], index) => (
            <div key={job} className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-3 py-2.5 text-[9px] ${index === runs.length - 1 ? "" : "border-b border-solid border-[#E8E6DC]"}`}>
              <span className="text-[#343330]">{job}</span>
              <span className="flex items-center gap-2 text-[#5E5D59]">
                <StatusDot tone={status === "Running" ? "running" : "success"} />
                {status}
              </span>
              <span className="text-[#87867F] [font-family:'Yak_Mono',monospace]">{duration}</span>
            </div>
          ))}
        </div>
      </div>
    </WindowShell>
  );
}

function ProductPreview({ id }: { id: HomeUseCaseId }) {
  switch (id) {
    case "workflows": return <WorkflowsPreview />;
    case "integration": return <IntegrationPreview />;
    case "quality": return <QualityPreview />;
    case "services": return <ServicesPreview />;
    case "operations": return <OperationsPreview />;
    default: return null;
  }
}

function MetadataCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-[#141413] p-4 text-[#FAF9F5]">
      <div className="text-[11px] font-medium leading-[1.6] [font-family:'Yak_Sans',Arial,sans-serif]">{title}</div>
      {children}
    </div>
  );
}

export default function HomeUseCasePreview({ useCase }: HomeUseCasePreviewProps) {
  return (
    <div className="relative overflow-hidden lg:aspect-[16/9]">
      <ReferenceTexture />

      <div className="relative z-10 grid min-h-[620px] grid-cols-1 lg:h-full lg:min-h-0 lg:grid-cols-12">
        <div className="flex items-center justify-center p-6 sm:p-10 lg:col-start-1 lg:col-end-9 lg:p-16">
          <ProductPreview id={useCase.id} />
        </div>

        <aside className="flex flex-col justify-center gap-2 px-6 pb-8 sm:px-10 lg:col-start-9 lg:col-end-13 lg:px-0 lg:py-8 lg:pr-16">
          <MetadataCard title="Prompt">
            <p className="m-0 text-[11px] leading-[1.6] text-[#B0AEA5] [font-family:'Yak_Sans',Arial,sans-serif]">{useCase.description}</p>
          </MetadataCard>

          <MetadataCard title="Flow">
            <div className="rounded-lg border border-solid border-[#3D3D3A] p-2.5 [font-family:'Yak_Sans',Arial,sans-serif]">
              <div className="flex items-start gap-3">
                <span className="w-10 shrink-0 text-[10px] text-[#87867F]">From</span>
                <span className="text-[10px] leading-[1.5] text-[#E8E6DC]">{useCase.sourceLabel}</span>
              </div>
              <div className="mt-2 flex items-start gap-3 border-t border-solid border-[#343330] pt-2">
                <span className="w-10 shrink-0 text-[10px] text-[#87867F]">To</span>
                <span className="text-[10px] leading-[1.5] text-[#E8E6DC]">{useCase.outputLabel}</span>
              </div>
            </div>
          </MetadataCard>
        </aside>
      </div>
    </div>
  );
}
