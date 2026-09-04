import { Metric, StatusDot, UseCaseResultSurface } from "./shared";
import type { HomeUseCaseDefinition } from "./types";

function QualityIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6 10.2L8.7 12.8L14.4 7.1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function QualityUseCase() {
  const rules = [
    ["order_id is unique", "Passed"],
    ["amount is not null", "Passed"],
    ["daily row count drift", "Review"],
    ["currency in accepted set", "Passed"],
  ] as const;

  return (
    <UseCaseResultSurface>
      <div className="flex h-full flex-col justify-center p-5">
        <div className="grid grid-cols-3 gap-2">
          <Metric value="98.7%" label="Score" />
          <Metric value="24" label="Rules" />
          <Metric value="1" label="Needs review" />
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-solid border-[#D1CFC5]">
          {rules.map(([rule, status], index) => (
            <div
              key={rule}
              className={`flex items-center justify-between px-3 py-2.5 ${
                index === rules.length - 1
                  ? ""
                  : "border-b border-solid border-[#E8E6DC]"
              }`}
            >
              <span className="flex items-center gap-2 text-[9px] text-[#343330]">
                <StatusDot tone={status === "Passed" ? "success" : "running"} />
                {rule}
              </span>
              <span className="text-[9px] text-[#73726C]">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const qualityUseCase: HomeUseCaseDefinition = {
  id: "quality",
  label: "Quality",
  prompt:
    "Check today's orders dataset for duplicate order IDs, missing amounts, row-count drift, and invalid currencies. Show the overall quality score and anything that needs review.",
  stageColor: "#BCD1CA",
  Icon: QualityIcon,
  Result: QualityUseCase,
};
