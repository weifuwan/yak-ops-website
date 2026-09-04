import { UseCaseResultSurface } from "./shared";
import type { HomeUseCaseDefinition } from "./types";

function IntegrationIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M3.9 7.7H16.1M3.9 12.3H16.1M10 3.5C11.8 5.4 12.7 7.6 12.7 10C12.7 12.4 11.8 14.6 10 16.5M10 3.5C8.2 5.4 7.3 7.6 7.3 10C7.3 12.4 8.2 14.6 10 16.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MySqlIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4 7.2c3.7-2.1 7.3-2.1 10.5.1 2.3 1.6 4 4 5.5 7.7-1.6-1.3-3-2.3-4.3-2.8-.6-.3-1.1-.5-1.5-.6.1 1.4.8 2.6 2.1 3.8-2.4-.4-4.1-1.3-5.1-2.8-1.3-1.9-2.5-3.8-3.7-5.6"
        stroke="#3E7C9C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.4 9.2c-.7 1.5-.7 3 0 4.5"
        stroke="#3E7C9C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KafkaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5.5" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18.5" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5.5" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18.5" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10.2 6.7 7.6 8M13.8 6.7 16.4 8M7.7 11.2v1.6M16.3 11.2v1.6M7.6 16l2.6 1.3M16.4 16l-2.6 1.3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function S3Icon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3 6.4 6.1 12 9.3l5.6-3.2L12 3Z" fill="#C74C37" />
      <path d="m6.4 6.1-3.1 1.8L9 11.2l3-1.9-5.6-3.2Z" fill="#B93E30" />
      <path d="m17.6 6.1 3.1 1.8-5.7 3.3-3-1.9 5.6-3.2Z" fill="#D65C43" />
      <path d="M9 11.2 3.3 7.9v6.4L9 17.6v-6.4Z" fill="#A9352B" />
      <path d="m15 11.2 5.7-3.3v6.4L15 17.6v-6.4Z" fill="#C84936" />
      <path d="m12 9.3-3 1.9v6.4l3 1.8 3-1.8v-6.4l-3-1.9Z" fill="#E26A4D" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="6.2" ry="2.7" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M5.8 6v6c0 1.5 2.8 2.7 6.2 2.7s6.2-1.2 6.2-2.7V6"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M5.8 12v5.8c0 1.5 2.8 2.7 6.2 2.7s6.2-1.2 6.2-2.7V12"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function SourcesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="9" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16.5" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4.7 18c.4-3 2.2-4.7 4.4-4.7s4 1.7 4.4 4.7M13.6 14c.7-.7 1.7-1.1 2.8-1.1 2 0 3.4 1.3 3.7 3.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M18.6 8.5A7.2 7.2 0 0 0 6.3 6.7L4.8 8.4"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <path
        d="M4.7 4.8v3.7h3.7"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.4 15.5a7.2 7.2 0 0 0 12.3 1.8l1.5-1.7"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <path
        d="M19.3 19.2v-3.7h-3.7"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 8.2V12l2.8 1.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Source = {
  name: string;
  icon: React.ReactNode;
};

const sources: Source[] = [
  { name: "MySQL / orders", icon: <MySqlIcon /> },
  { name: "Kafka / events", icon: <KafkaIcon /> },
  { name: "S3 / exports", icon: <S3Icon /> },
];

function HealthPill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF5EE] px-2 py-1 text-[9px] font-medium text-[#4E865F]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#4E9A64]" />
      Healthy
    </span>
  );
}

function MetricTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-[11px] border border-[#E6E1D8] bg-white px-3 py-3 shadow-[0_5px_14px_rgba(40,30,22,0.035)]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FBE9DF] text-[#534B45]">
        {icon}
      </span>

      <div className="min-w-0">
        <div className="text-[16px] font-semibold tracking-[-0.03em] text-[#24211F]">
          {value}
        </div>
        <div className="mt-0.5 text-[9px] text-[#878079]">{label}</div>
      </div>
    </div>
  );
}

function FlowLines() {
  return (
    <svg
      viewBox="0 0 190 220"
      fill="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="integration-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EDC5B1" />
          <stop offset="100%" stopColor="#D97757" />
        </linearGradient>
      </defs>

      <path
        d="M0 44H58C82 44 85 56 85 76V90C85 104 94 110 111 110H173"
        stroke="url(#integration-flow)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M0 110H173"
        stroke="url(#integration-flow)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M0 176H58C82 176 85 164 85 144V130C85 116 94 110 111 110H173"
        stroke="url(#integration-flow)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <path
        d="m166 101 10 9-10 9"
        stroke="#D97757"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function IntegrationUseCase() {
  return (
    <UseCaseResultSurface>
      <div className="flex h-full items-center justify-center p-5">
        <div className="grid w-full grid-cols-[minmax(0,0.95fr)_150px_minmax(0,1.05fr)] items-center gap-0">
          {/* Sources */}
          <div className="space-y-3">
            {sources.map((source) => (
              <div
                key={source.name}
                className="flex min-h-[58px] items-center justify-between rounded-[13px] border border-[#E4E0D8] bg-white px-4 shadow-[0_8px_20px_rgba(39,30,24,0.04)]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center text-[#3C3A36]">
                    {source.icon}
                  </span>

                  <span className="truncate text-[11px] font-medium text-[#2F2D29]">
                    {source.name}
                  </span>
                </div>

                <HealthPill />
              </div>
            ))}
          </div>

          {/* Flow */}
          <div className="relative h-[220px]">
            <FlowLines />
          </div>

          {/* Destination */}
          <div className="rounded-[18px] border border-[#E6DFD4] bg-[#F7F3EC] p-5 shadow-[0_14px_34px_rgba(56,37,27,0.065)]">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#C76A4B]">
              Destination
            </div>

            <div className="mt-2 text-[23px] font-medium leading-none text-[#24211F] [font-family:'Yak_Serif',Georgia,serif]">
              Customer 360
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <MetricTile icon={<DatabaseIcon />} value="1.2M" label="rows" />
              <MetricTile icon={<SourcesIcon />} value="3" label="sources" />
              <MetricTile icon={<SyncIcon />} value="CDC" label="on" />
              <MetricTile icon={<ClockIcon />} value="2m" label="lag" />
            </div>
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