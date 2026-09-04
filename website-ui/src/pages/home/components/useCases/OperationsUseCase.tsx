import { Metric, StatusDot, UseCaseResultSurface } from "./shared";
import type { HomeUseCaseDefinition } from "./types";

function OperationsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 16.5H17" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <rect x="4" y="10" width="2.5" height="5" rx="0.7" stroke="currentColor" strokeWidth="1" />
      <rect x="8.75" y="5" width="2.5" height="10" rx="0.7" stroke="currentColor" strokeWidth="1" />
      <rect x="13.5" y="7.5" width="2.5" height="7.5" rx="0.7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function OperationsUseCase() {
  const runs = [
    ["daily_revenue", "Succeeded", "04:10"],
    ["customer_360", "Running", "02:18"],
    ["orders_quality", "Succeeded", "00:51"],
  ] as const;

  return (
    <UseCaseResultSurface>
      <div className="flex h-full flex-col justify-center p-5">
        <div className="grid grid-cols-3 gap-2">
          <Metric value="99.4%" label="Success rate" />
          <Metric value="18" label="Running" />
          <Metric value="2" label="Needs attention" />
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-solid border-[#D1CFC5]">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-solid border-[#E8E6DC] px-3 py-2 text-[8px] uppercase tracking-[0.06em] text-[#87867F]">
            <span>Job</span>
            <span>Status</span>
            <span>Duration</span>
          </div>
          {runs.map(([job, status, duration], index) => (
            <div
              key={job}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-3 py-2.5 text-[9px] ${
                index === runs.length - 1
                  ? ""
                  : "border-b border-solid border-[#E8E6DC]"
              }`}
            >
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
    </UseCaseResultSurface>
  );
}

export const operationsUseCase: HomeUseCaseDefinition = {
  id: "operations",
  label: "Operate",
  prompt:
    "Summarize workflow activity from the last hour. Show running jobs, failed jobs, durations, and the metrics I need to investigate first.",
  stageColor: "#C46686",
  Icon: OperationsIcon,
  Result: OperationsUseCase,
};
