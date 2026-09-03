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

function PreviewWindow({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-solid border-[#C7C4BA] bg-white shadow-[0_18px_50px_rgba(24,24,23,0.10)]">
      <div className="flex h-12 items-center justify-between border-b border-solid border-[#D8D5CB] px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#C7C4BA]" />
          <span className="h-2 w-2 rounded-full bg-[#D8D5CB]" />
          <span className="h-2 w-2 rounded-full bg-[#E8E6DC]" />
        </div>
        <span className="text-[11px] font-medium tracking-[0.02em] text-[#73726C] [font-family:'Yak_Sans',Arial,sans-serif]">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function NodeCard({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-solid border-[#D1CFC5] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <StatusDot tone="success" />
        <span className="truncate text-[12px] font-medium text-[#343330] [font-family:'Yak_Sans',Arial,sans-serif]">
          {label}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#E8E6DC]">
        <div className="h-full w-3/4 rounded-full bg-[#B0AEA5]" />
      </div>
      <div className="mt-2 text-[10px] text-[#87867F] [font-family:'Yak_Mono',monospace]">
        {meta}
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <svg
      viewBox="0 0 34 16"
      fill="none"
      className="hidden h-4 w-8 shrink-0 text-[#9C9A92] lg:block"
      aria-hidden="true"
    >
      <path d="M1 8H30" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M25 3L30 8L25 13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorkflowPreview() {
  return (
    <PreviewWindow label="Workflow / daily_revenue_pipeline">
      <div className="p-5 sm:p-7">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex-1">
            <NodeCard label="PostgreSQL" meta="source.orders" />
          </div>
          <FlowArrow />
          <div className="flex-1">
            <NodeCard label="Transform" meta="model.revenue_daily" />
          </div>
          <FlowArrow />
          <div className="flex-1">
            <NodeCard label="Warehouse" meta="analytics.revenue" />
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-solid border-[#D1CFC5] bg-[#F5F4ED] p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <StatusDot tone="running" />
              <span className="text-[12px] font-medium text-[#343330]">Running</span>
            </div>
            <span className="text-[11px] text-[#73726C] [font-family:'Yak_Mono',monospace]">
              03:42 / 04:10
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#DEDCD1]">
            <div className="h-full w-[82%] rounded-full bg-[#C96442]" />
          </div>
        </div>
      </div>
    </PreviewWindow>
  );
}

function IntegrationPreview() {
  const sources = ["MySQL / orders", "Kafka / events", "S3 / exports"];

  return (
    <PreviewWindow label="Data integration / customer_360">
      <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[0.9fr_auto_1.1fr] lg:items-center">
        <div className="space-y-3">
          {sources.map((source) => (
            <div
              key={source}
              className="flex items-center justify-between rounded-xl border border-solid border-[#D1CFC5] bg-white px-4 py-3"
            >
              <span className="text-[12px] font-medium text-[#343330]">{source}</span>
              <StatusDot tone="success" />
            </div>
          ))}
        </div>

        <div className="hidden h-28 w-16 items-center justify-center lg:flex" aria-hidden="true">
          <svg viewBox="0 0 64 112" fill="none" className="h-full w-full text-[#B0AEA5]">
            <path d="M0 16H22C34 16 34 56 46 56H61" stroke="currentColor" strokeWidth="1.2" />
            <path d="M0 56H61" stroke="currentColor" strokeWidth="1.2" />
            <path d="M0 96H22C34 96 34 56 46 56H61" stroke="currentColor" strokeWidth="1.2" />
            <path d="M56 51L61 56L56 61" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="rounded-2xl border border-solid border-[#C7C4BA] bg-[#F0EEE6] p-5">
          <div className="text-[10px] uppercase tracking-[0.08em] text-[#87867F]">Destination</div>
          <div className="mt-2 text-[18px] font-medium text-[#181817] [font-family:'Yak_Serif',Georgia,sans-serif]">
            Customer 360
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["1.2M rows", "3 sources", "CDC on", "2m lag"].map((metric) => (
              <div key={metric} className="rounded-lg bg-[#FAF9F5] px-3 py-2 text-[11px] text-[#5E5D59]">
                {metric}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWindow>
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
    <PreviewWindow label="Data quality / orders_daily">
      <div className="p-5 sm:p-7">
        <div className="mb-5 grid grid-cols-3 gap-3">
          {[
            ["98.7%", "Score"],
            ["24", "Rules"],
            ["1", "Needs review"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl bg-[#F0EEE6] p-3 text-center">
              <div className="text-[18px] font-medium text-[#181817]">{value}</div>
              <div className="mt-1 text-[10px] text-[#73726C]">{label}</div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-solid border-[#D1CFC5]">
          {rules.map(([rule, status], index) => (
            <div
              key={rule}
              className={`flex items-center justify-between gap-4 bg-white px-4 py-3 ${
                index === rules.length - 1 ? "" : "border-b border-solid border-[#E8E6DC]"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <StatusDot tone={status === "Passed" ? "success" : "running"} />
                <span className="truncate text-[12px] text-[#343330]">{rule}</span>
              </div>
              <span className="shrink-0 text-[10px] text-[#73726C]">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWindow>
  );
}

function ServicesPreview() {
  return (
    <PreviewWindow label="Data service / customer-profile-api">
      <div className="p-5 sm:p-7">
        <div className="rounded-2xl border border-solid border-[#D1CFC5] bg-white p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-[#181817] px-2 py-1 text-[10px] font-semibold text-white">GET</span>
            <code className="text-[12px] text-[#343330]">/api/v1/customers/:id</code>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Authentication", "API key"],
              ["Rate limit", "600 / min"],
              ["Audit", "Enabled"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-[#F5F4ED] p-3">
                <div className="text-[10px] text-[#87867F]">{label}</div>
                <div className="mt-1 text-[12px] font-medium text-[#343330]">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#1F1E1D] p-4 [font-family:'Yak_Mono',monospace]">
          <div className="text-[10px] text-[#9C9A92]">200 OK · 42 ms</div>
          <pre className="mt-3 overflow-hidden whitespace-pre-wrap text-[11px] leading-[1.6] text-[#E8E6DC]">{`{
  "customer_id": "C-1048",
  "segment": "active",
  "lifetime_value": 2840
}`}</pre>
        </div>
      </div>
    </PreviewWindow>
  );
}

function OperationsPreview() {
  const runs = [
    ["daily_revenue", "Succeeded", "04:10"],
    ["customer_360", "Running", "02:18"],
    ["orders_quality", "Succeeded", "00:51"],
  ] as const;

  return (
    <PreviewWindow label="Operations / executions">
      <div className="p-5 sm:p-7">
        <div className="grid grid-cols-3 gap-3">
          {[
            ["99.4%", "Success rate"],
            ["18", "Running"],
            ["2.4m", "Rows / min"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl bg-[#F0EEE6] p-3">
              <div className="text-[17px] font-medium text-[#181817]">{value}</div>
              <div className="mt-1 text-[10px] text-[#73726C]">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-solid border-[#D1CFC5] bg-white">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-solid border-[#E8E6DC] px-4 py-2 text-[10px] uppercase tracking-[0.06em] text-[#87867F]">
            <span>Job</span>
            <span>Status</span>
            <span>Duration</span>
          </div>
          {runs.map(([job, status, duration], index) => (
            <div
              key={job}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3 text-[11px] ${
                index === runs.length - 1 ? "" : "border-b border-solid border-[#E8E6DC]"
              }`}
            >
              <span className="truncate text-[#343330]">{job}</span>
              <span className="flex items-center gap-2 text-[#5E5D59]">
                <StatusDot tone={status === "Running" ? "running" : "success"} />
                {status}
              </span>
              <span className="text-[#87867F] [font-family:'Yak_Mono',monospace]">{duration}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWindow>
  );
}

function ProductPreview({ id }: { id: HomeUseCaseId }) {
  switch (id) {
    case "workflows":
      return <WorkflowPreview />;
    case "integration":
      return <IntegrationPreview />;
    case "quality":
      return <QualityPreview />;
    case "services":
      return <ServicesPreview />;
    case "operations":
      return <OperationsPreview />;
    default:
      return null;
  }
}

function PreviewBackdrop() {
  return (
    <svg
      viewBox="0 0 1120 600"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full text-white/20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M-40 440C115 385 135 520 286 450C430 384 445 235 590 260C730 284 744 406 890 358C1010 318 1045 205 1170 232" stroke="currentColor" strokeWidth="3" />
      <path d="M-80 128C95 196 138 82 296 142C452 202 452 354 606 326C758 298 780 112 938 154C1022 176 1080 238 1182 208" stroke="currentColor" strokeWidth="3" />
      <path d="M174 -24C230 92 206 190 252 294C302 404 400 486 474 624" stroke="currentColor" strokeWidth="3" />
      <path d="M790 -30C748 86 724 154 746 246C768 340 856 444 884 632" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export default function HomeUseCasePreview({ useCase }: HomeUseCasePreviewProps) {
  return (
    <div className="relative min-h-[560px] overflow-hidden p-6 sm:min-h-[600px] sm:p-10 lg:p-12">
      <PreviewBackdrop />

      <div className="relative z-10 flex min-h-[512px] flex-col justify-center sm:min-h-[520px] lg:block">
        <div className="w-full lg:absolute lg:left-12 lg:top-1/2 lg:w-[58%] lg:-translate-y-1/2">
          <ProductPreview id={useCase.id} />
        </div>

        <aside className="mt-5 space-y-3 lg:absolute lg:right-12 lg:top-1/2 lg:mt-0 lg:w-[29%] lg:-translate-y-1/2">
          <div className="rounded-2xl bg-[#1F1E1D] p-5 text-[#FAF9F5] shadow-[0_12px_30px_rgba(24,24,23,0.10)] sm:p-6">
            <div className="text-[10px] uppercase tracking-[0.1em] text-[#9C9A92] [font-family:'Yak_Sans',Arial,sans-serif]">
              {useCase.eyebrow}
            </div>
            <h3 className="mt-4 text-[clamp(1.25rem,1.08rem+0.6vw,1.6rem)] font-medium leading-[1.2] [font-family:'Yak_Serif',Georgia,sans-serif]">
              {useCase.title}
            </h3>
            <p className="mt-4 text-[12px] leading-[1.65] text-[#C7C4BA] [font-family:'Yak_Sans',Arial,sans-serif]">
              {useCase.description}
            </p>
          </div>

          <div className="rounded-2xl bg-[#1F1E1D] p-4 text-[#FAF9F5] shadow-[0_12px_30px_rgba(24,24,23,0.08)] sm:p-5">
            <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#9C9A92] [font-family:'Yak_Sans',Arial,sans-serif]">
              Flow
            </div>
            <dl className="mt-3 rounded-xl border border-solid border-[#3D3D3A] px-3 py-2.5 text-[10px] [font-family:'Yak_Sans',Arial,sans-serif]">
              <div className="flex items-start justify-between gap-4 py-1.5">
                <dt className="text-[#87867F]">From</dt>
                <dd className="m-0 text-right text-[#DEDCD1]">{useCase.sourceLabel}</dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-solid border-[#343330] py-1.5">
                <dt className="text-[#87867F]">To</dt>
                <dd className="m-0 text-right text-[#DEDCD1]">{useCase.outputLabel}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
