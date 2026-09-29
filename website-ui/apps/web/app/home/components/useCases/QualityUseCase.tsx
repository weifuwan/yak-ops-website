import { UseCaseResultSurface } from './shared';
import type { HomeUseCaseDefinition } from './types';

function QualityIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M6 10.2L8.7 12.8L14.4 7.1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 3.8 18 6v4.7c0 4-2.4 7-6 9.1-3.6-2.1-6-5.1-6-9.1V6l6-2.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 11.5 1.8 1.8 3.9-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <ellipse cx="12" cy="5.5" rx="6.5" ry="2.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 5.5v6c0 1.55 2.9 2.8 6.5 2.8s6.5-1.25 6.5-2.8v-6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 11.3v5.8c0 1.55 2.9 2.8 6.5 2.8s6.5-1.25 6.5-2.8v-5.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="m7.5 5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M15.6 7.2A6 6 0 0 0 5.2 5.4L3.8 7" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M3.7 3.8V7h3.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.4 12.8a6 6 0 0 0 10.4 1.8l1.4-1.6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path
        d="M16.3 16.2V13h-3.2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScoreRing() {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = 0.987;
  const dash = circumference * progress;
  const gap = circumference - dash;

  return (
    <div className="relative flex h-[118px] w-[118px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#ECECE6" strokeWidth="6" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#7FA88A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
        />
      </svg>

      <div className="relative text-center">
        <div className="text-[24px] font-semibold tracking-[-0.04em] text-[#171816]">
          98.7
          <span className="ml-0.5 text-[14px] font-medium">%</span>
        </div>
        <div className="mt-1 text-[10px] font-medium text-[#85877F]">Score</div>
      </div>
    </div>
  );
}

function ScoreTrend() {
  return (
    <div className="min-w-0">
      <svg viewBox="0 0 126 44" className="h-[48px] w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="quality-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7FA88A" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7FA88A" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M2 25C11 16 18 34 29 28C38 23 42 12 52 19C61 25 65 38 75 31C85 25 88 8 98 14C108 21 113 27 124 8V44H2Z"
          fill="url(#quality-trend-fill)"
        />
        <path
          d="M2 25C11 16 18 34 29 28C38 23 42 12 52 19C61 25 65 38 75 31C85 25 88 8 98 14C108 21 113 27 124 8"
          fill="none"
          stroke="#688E73"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="124" cy="8" r="2.8" fill="#557D62" />
      </svg>

      <div className="mt-2">
        <div className="text-[9px] font-medium text-[#777970]">Score trend (7d)</div>
        <div className="mt-0.5 text-[10px] font-semibold text-[#557D62]">96.2% avg</div>
      </div>
    </div>
  );
}

type RuleStatus = 'Passed' | 'Review';

const rules: Array<{
  rule: string;
  status: RuleStatus;
}> = [
  { rule: 'order_id is unique', status: 'Passed' },
  { rule: 'amount is not null', status: 'Passed' },
  { rule: 'daily row count drift', status: 'Review' },
  { rule: 'currency in accepted set', status: 'Passed' },
];

function RuleStatusIcon({ status }: { status: RuleStatus }) {
  if (status === 'Passed') {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5E8C69] text-white">
        <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3" aria-hidden="true">
          <path
            d="m5.8 10.1 2.5 2.5 5.9-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#C98A2E]">
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M8.5 3.5a1.73 1.73 0 0 1 3 0l5.8 10.2a1.73 1.73 0 0 1-1.5 2.6H4.2a1.73 1.73 0 0 1-1.5-2.6L8.5 3.5Z"
          fill="currentColor"
        />
        <path d="M10 7v4.2M10 13.6v.1" stroke="white" strokeWidth="1.45" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function StatusPill({ status }: { status: RuleStatus }) {
  const isPassed = status === 'Passed';

  return (
    <span
      className={[
        'inline-flex min-w-[60px] items-center justify-center rounded-full px-2.5 py-1 text-[9px] font-medium',
        isPassed ? 'bg-[#EAF1E9] text-[#557D62]' : 'bg-[#FBF0DF] text-[#B6751D]',
      ].join(' ')}
    >
      {status}
    </span>
  );
}

export default function QualityUseCase() {
  return (
    <UseCaseResultSurface>
      <div className="flex h-full flex-col justify-center p-5">
        <div className="overflow-hidden rounded-[18px] border border-[#E7E5DC] bg-[#FBFBF8] shadow-[0_18px_42px_rgba(31,40,35,0.08)]">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-5 pb-4 pt-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#E7EEE5] text-[#52755C]">
              <ShieldCheckIcon />
            </span>
            <div>
              <div className="text-[13px] font-semibold tracking-[-0.02em] text-[#22231F]">Data Quality Overview</div>
            </div>
          </div>

          {/* Summary */}
          <div className="mx-4 grid grid-cols-[132px_1fr_1fr_1.25fr] items-center overflow-hidden rounded-[15px] border border-[#E7E5DC] bg-white shadow-[0_8px_20px_rgba(25,32,28,0.035)]">
            <div className="flex items-center justify-center px-3 py-4">
              <ScoreRing />
            </div>

            <div className="border-l border-[#ECEAE2] px-4 py-4">
              <div className="text-[23px] font-semibold tracking-[-0.04em] text-[#171816]">24</div>
              <div className="mt-1 text-[10px] font-medium text-[#4B4D46]">Rules</div>
              <div className="mt-2 text-[9px] text-[#96988F]">Validated today</div>
            </div>

            <div className="border-l border-[#ECEAE2] px-4 py-4">
              <div className="text-[23px] font-semibold tracking-[-0.04em] text-[#171816]">1</div>
              <div className="mt-1 text-[10px] font-medium text-[#4B4D46]">Needs review</div>
              <div className="mt-2 text-[9px] text-[#96988F]">Across 24 rules</div>
            </div>

            <div className="border-l border-[#ECEAE2] px-4 py-4">
              <ScoreTrend />
            </div>
          </div>

          {/* Rules */}
          <div className="mx-4 mb-4 mt-4 overflow-hidden rounded-[14px] border border-[#E7E5DC] bg-white">
            <div className="grid grid-cols-[1fr_88px_28px] items-center border-b border-[#ECEAE2] px-4 py-2.5">
              <span className="text-[9px] font-medium text-[#8D8F87]">Rule</span>
              <span className="text-[9px] font-medium text-[#8D8F87]">Status</span>
              <span />
            </div>

            {rules.map((item, index) => (
              <div
                key={item.rule}
                className={[
                  'grid grid-cols-[1fr_88px_28px] items-center px-4 py-[10px]',
                  index === rules.length - 1 ? '' : 'border-b border-[#F0EEE7]',
                ].join(' ')}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <RuleStatusIcon status={item.status} />
                  <span className="truncate text-[10px] font-medium text-[#32342F]">{item.rule}</span>
                </div>

                <div>
                  <StatusPill status={item.status} />
                </div>

                <span className="text-[#96988F]">
                  <ChevronRightIcon />
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[#EEECE4] px-5 py-3">
            <div className="flex min-w-0 items-center gap-2.5 text-[9px] text-[#777970]">
              <span className="text-[#4F6255]">
                <DatabaseIcon />
              </span>

              <span className="font-medium text-[#454740]">
                Dataset:
                <span className="ml-1 font-normal text-[#777970]">orders</span>
              </span>

              <span className="text-[#C2C3BD]">•</span>

              <span className="hidden sm:inline">Checks executed: Today, 9:41 AM</span>

              <span className="text-[#999B94]">
                <RefreshIcon />
              </span>
            </div>

            <button
              type="button"
              className="ml-3 inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-[#D8D6CD] bg-[#FCFCFA] px-3 py-2 text-[9px] font-medium text-[#30322E] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition hover:bg-[#F5F5F0]"
            >
              View all rules
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const qualityUseCase: HomeUseCaseDefinition = {
  id: 'quality',
  label: 'Quality',
  prompt:
    "Check today's orders dataset for duplicate order IDs, missing amounts, row-count drift, and invalid currencies. Show the overall quality score and anything that needs review.",
  stageColor: '#BCD1CA',
  Icon: QualityIcon,
  Result: QualityUseCase,
};
