import { UseCaseResultSurface } from './shared';
import type { HomeUseCaseDefinition } from './types';

function LineageIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="4" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="4" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="10" cy="10" r="1.7" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="16" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="16" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.1" />

      <path
        d="M5.4 5.8L8.5 8.8M5.4 14.2L8.5 11.2M11.6 8.8L14.6 5.8M11.6 11.2L14.6 14.2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LiveGraphBadge() {
  return (
    <div
      className="
        flex
        items-center
        gap-1.5
        rounded-full
        border
        border-[#EBD9DE]
        bg-[#FBF5F6]
        px-2.5
        py-1
      "
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#B96F84]" />

      <span className="text-[8px] font-medium text-[#9D6272]">Live graph</span>
    </div>
  );
}

function HeaderMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[54px] text-left">
      <div className="text-[18px] leading-none tracking-[-0.04em] text-[#1D1C1A]">{value}</div>

      <div className="mt-1.5 text-[8px] text-[#96928C]">{label}</div>
    </div>
  );
}

function GraphColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        text-center
        text-[7px]
        font-medium
        uppercase
        tracking-[0.14em]
        text-[#817D77]
      "
    >
      {children}
    </div>
  );
}

function LineageNode({ name }: { name: string }) {
  return (
    <div
      className="
        flex
        h-[58px]
        w-full
        items-center
        justify-between
        rounded-[9px]
        border
        border-[#DAD7D2]
        bg-[#FFF]
        px-4
      "
    >
      <span
        className="
          min-w-0
          truncate
          text-[9px]
          font-medium
          tracking-[-0.01em]
          text-[#35322F]
        "
      >
        {name}
      </span>

      <span className="ml-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A7A49F]" />
    </div>
  );
}

function SelectedModel() {
  return (
    <div
      className="
        relative
        w-full
        rounded-[12px]
        bg-[#1B1A19]
        px-4
        py-4
        text-white
      "
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="
            truncate
            text-[11px]
            font-semibold
            tracking-[-0.02em]
            text-[#FAF9F6]
          "
        >
          customer_360
        </span>

        <span
          className="
            shrink-0
            rounded
            bg-[#332629]
            px-2
            py-1
            text-[6px]
            font-medium
            text-[#DCA2B1]
          "
        >
          Selected
        </span>
      </div>

      <div className="mt-4">
        <ModelRow label="Owner" value="Data Platform" first />

        <ModelRow label="Updated" value="5 min ago" />

        <ModelRow label="Columns" value="84" />
      </div>

      {/* connection anchors */}
      <span
        className="
          absolute
          left-[-3px]
          top-1/2
          h-1.5
          w-1.5
          -translate-y-1/2
          rounded-full
          bg-[#C6798E]
        "
      />

      <span
        className="
          absolute
          right-[-3px]
          top-1/2
          h-1.5
          w-1.5
          -translate-y-1/2
          rounded-full
          bg-[#C6798E]
        "
      />
    </div>
  );
}

function ModelRow({ label, value, first = false }: { label: string; value: string; first?: boolean }) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        gap-3
        py-2.5
        ${first ? '' : 'border-t border-white/[0.09]'}
      `}
    >
      <span className="text-[7px] text-[#99948F]">{label}</span>

      <span
        className="
          truncate
          text-right
          text-[7px]
          font-medium
          text-[#E9E7E2]
        "
      >
        {value}
      </span>
    </div>
  );
}

function LineageGraph() {
  return (
    <div
      className="
        relative
        flex
        min-h-0
        flex-1
        flex-col
        overflow-hidden
        rounded-[14px]
        border
        border-[#E5E1DC]
        bg-[#FDFCF9]
        px-5
        pb-4
        pt-5
      "
    >
      {/* column labels */}
      <div
        className="
          grid
          grid-cols-[1fr_1.22fr_1fr]
          gap-[12%]
          px-2
        "
      >
        <GraphColumnLabel>Upstream</GraphColumnLabel>

        <GraphColumnLabel>Model</GraphColumnLabel>

        <GraphColumnLabel>Downstream</GraphColumnLabel>
      </div>

      {/* graph */}
      <div className="relative mt-3 min-h-0 flex-1">
        <svg
          className="
            pointer-events-none
            absolute
            inset-0
            h-full
            w-full
          "
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* left top */}
          <path
            d="
              M210 70
              C 300 70,
                315 150,
                430 150
            "
            fill="none"
            stroke="#AAA7A2"
            strokeWidth="1.15"
            strokeLinecap="round"
          />

          {/* left bottom */}
          <path
            d="
              M210 230
              C 300 230,
                315 150,
                430 150
            "
            fill="none"
            stroke="#AAA7A2"
            strokeWidth="1.15"
            strokeLinecap="round"
          />

          {/* right top */}
          <path
            d="
              M570 150
              C 685 150,
                700 70,
                790 70
            "
            fill="none"
            stroke="#AAA7A2"
            strokeWidth="1.15"
            strokeLinecap="round"
          />

          {/* right bottom */}
          <path
            d="
              M570 150
              C 685 150,
                700 230,
                790 230
            "
            fill="none"
            stroke="#AAA7A2"
            strokeWidth="1.15"
            strokeLinecap="round"
          />

          {/* subtle selected accents */}
          <path d="M405 150H432" fill="none" stroke="#C6798E" strokeWidth="1.4" strokeLinecap="round" />

          <path d="M568 150H595" fill="none" stroke="#C6798E" strokeWidth="1.4" strokeLinecap="round" />
        </svg>

        <div
          className="
            relative
            z-10
            grid
            h-full
            grid-cols-[1fr_1.22fr_1fr]
            items-center
            gap-[12%]
            px-2
          "
        >
          {/* upstream */}
          <div
            className="
              flex
              h-[200px]
              flex-col
              justify-between
            "
          >
            <LineageNode name="orders_raw" />

            <LineageNode name="crm_users" />
          </div>

          {/* model */}
          <div className="flex items-center justify-center">
            <SelectedModel />
          </div>

          {/* downstream */}
          <div
            className="
              flex
              h-[200px]
              flex-col
              justify-between
            "
          >
            <LineageNode name="revenue_mart" />

            <LineageNode name="ops_dashboard" />
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="mt-1 text-center">
        <span className="text-[7px] text-[#918D87]">2 upstream dependencies</span>

        <span className="mx-2 text-[#C7C3BD]">·</span>

        <span className="text-[7px] text-[#918D87]">2 downstream consumers</span>
      </div>
    </div>
  );
}

export default function LineageUseCase() {
  return (
    <UseCaseResultSurface>
      <div className="flex h-full flex-col p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-8">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h3
                className="
                  m-0
                  text-[19px]
                  font-medium
                  leading-none
                  text-[#171614]
                  [font-family:'Yak_Serif',Georgia,serif]
                "
              >
                Data lineage
              </h3>

              <LiveGraphBadge />
            </div>

            <p className="mt-2 text-[8px] text-[#8B8781]">Trace upstream and downstream dependencies</p>
          </div>

          {/* metrics */}
          <div className="flex shrink-0 items-start">
            <div className="pr-5">
              <HeaderMetric value="128" label="assets" />
            </div>

            <div
              className="
                border-l
                border-[#E4E0DA]
                px-5
              "
            >
              <HeaderMetric value="6" label="upstream" />
            </div>

            <div
              className="
                border-l
                border-[#E4E0DA]
                pl-5
              "
            >
              <HeaderMetric value="12" label="downstream" />
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="mt-5 min-h-0 flex-1">
          <LineageGraph />
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const lineageUseCase: HomeUseCaseDefinition = {
  id: 'lineage',
  label: 'Lineage',
  prompt:
    'Show the lineage for customer_360. Let me trace upstream sources, downstream consumers, and inspect the impacted assets.',

  stageColor: '#D9A7B5',

  Icon: LineageIcon,
  Result: LineageUseCase,
};
