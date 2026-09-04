import { StatusDot, UseCaseResultSurface } from "./shared";
import type { HomeUseCaseDefinition } from "./types";

function WorkflowsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 4.5H7M4 10H7M4 15.5H7M9 4.5H17M9 10H17M9 15.5H17" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M2.5 4.5L3.2 5.2L4.7 3.7M2.5 10L3.2 10.7L4.7 9.2M2.5 15.5L3.2 16.2L4.7 14.7" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WorkflowsUseCase() {
  return (
    <UseCaseResultSurface>
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
              {index < 2 ? (
                <span className="text-[#9C9A92]" aria-hidden="true">→</span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg bg-[#F5F4ED] p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[10px] text-[#343330]">
              <StatusDot tone="running" />
              Scheduled · 02:00 daily
            </span>
            <span className="text-[9px] text-[#73726C] [font-family:'Yak_Mono',monospace]">retry ×2</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-[#DEDCD1]">
            <div className="h-full w-[82%] rounded-full bg-[#C96442]" />
          </div>
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const workflowsUseCase: HomeUseCaseDefinition = {
  id: "workflows",
  label: "Workflows",
  prompt:
    "Create a daily revenue workflow. Read orders from PostgreSQL at 02:00, transform revenue metrics, load the warehouse, and retry failed transforms twice.",
  stageColor: "#CBCADB",
  Icon: WorkflowsIcon,
  Result: WorkflowsUseCase,
};
