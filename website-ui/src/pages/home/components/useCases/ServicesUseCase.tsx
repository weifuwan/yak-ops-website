import { Metric, UseCaseResultSurface } from "./shared";
import type { HomeUseCaseDefinition } from "./types";

function ServicesIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6 8L8 10L6 12M11 12H14" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ServicesUseCase() {
  return (
    <UseCaseResultSurface>
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
          <div className="mt-2 text-[9px] leading-[1.55] text-[#E8E6DC]">
            {`{"customer_id":"C-1048","segment":"active"}`}
          </div>
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const servicesUseCase: HomeUseCaseDefinition = {
  id: "services",
  label: "Services",
  prompt:
    "Publish the customer profile dataset as GET /api/v1/customers/:id. Require an API key, limit traffic to 600 requests per minute, and enable audit logging.",
  stageColor: "#EBC9B7",
  Icon: ServicesIcon,
  Result: ServicesUseCase,
};
