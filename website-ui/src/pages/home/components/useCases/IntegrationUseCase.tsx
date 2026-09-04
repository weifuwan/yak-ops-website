import { StatusDot, UseCaseResultSurface } from "./shared";
import type { HomeUseCaseDefinition } from "./types";

function IntegrationIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M3.9 7.7H16.1M3.9 12.3H16.1M10 3.5C11.8 5.4 12.7 7.6 12.7 10C12.7 12.4 11.8 14.6 10 16.5M10 3.5C8.2 5.4 7.3 7.6 7.3 10C7.3 12.4 8.2 14.6 10 16.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function IntegrationUseCase() {
  return (
    <UseCaseResultSurface>
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
    </UseCaseResultSurface>
  );
}

export const integrationUseCase: HomeUseCaseDefinition = {
  id: "integration",
  label: "Integrate",
  prompt:
    "Sync MySQL orders, Kafka customer events, and S3 exports into a Customer 360 dataset. Keep CDC enabled and show source health and sync lag.",
  stageColor: "#D97757",
  Icon: IntegrationIcon,
  Result: IntegrationUseCase,
};
