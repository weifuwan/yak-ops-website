import { useState } from 'react';

import { StatusDot, UseCaseResultSurface } from './shared';
import type { HomeUseCaseDefinition } from './types';

type RunStatus = 'Succeeded' | 'Running' | 'Failed';

interface RunItem {
  id: string;
  name: string;
  status: RunStatus;
  duration: string;
  progress: number;
  startedAt: string;
  rows: string;
  detail: string;
}

const RUNS: RunItem[] = [
  {
    id: 'daily-revenue',
    name: 'daily_revenue',
    status: 'Succeeded',
    duration: '04:10',
    progress: 100,
    startedAt: '09:02',
    rows: '1.42M',
    detail: 'Revenue mart refreshed successfully.',
  },
  {
    id: 'customer-360',
    name: 'customer_360',
    status: 'Running',
    duration: '02:18',
    progress: 68,
    startedAt: '09:07',
    rows: '846K',
    detail: 'Merging Kafka events into the customer profile model.',
  },
  {
    id: 'orders-quality',
    name: 'orders_quality',
    status: 'Succeeded',
    duration: '00:51',
    progress: 100,
    startedAt: '09:11',
    rows: '284K',
    detail: '24 quality rules passed. No blocking issues found.',
  },
  {
    id: 'inventory-sync',
    name: 'inventory_sync',
    status: 'Failed',
    duration: '01:32',
    progress: 44,
    startedAt: '09:14',
    rows: '91K',
    detail: 'Warehouse API returned 429. Retry policy is waiting.',
  },
];

const THROUGHPUT = [32, 45, 42, 58, 61, 54, 72, 78, 70, 88, 91, 84];

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

function LiveBadge() {
  return (
    <div className="flex items-center gap-2 rounded-full bg-[#F4ECEF] px-2.5 py-1">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C46686] opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C46686]" />
      </span>
      <span className="text-[8px] font-medium uppercase tracking-[0.08em] text-[#8F3F5C]">Live</span>
    </div>
  );
}

function OpsMetric({ label, value, meta }: { label: string; value: string; meta: string }) {
  return (
    <div className="rounded-xl bg-[#F7F3F4] px-3 py-2.5">
      <div className="text-[8px] uppercase tracking-[0.06em] text-[#8A7A80]">{label}</div>
      <div className="mt-1 text-[18px] leading-none text-[#181817]">{value}</div>
      <div className="mt-1.5 text-[8px] text-[#6F6267]">{meta}</div>
    </div>
  );
}

function ThroughputSparkline() {
  const width = 180;
  const height = 46;
  const min = Math.min(...THROUGHPUT);
  const max = Math.max(...THROUGHPUT);

  const points = THROUGHPUT.map((value, index) => {
    const x = (index / (THROUGHPUT.length - 1)) * width;
    const y = height - ((value - min) / (max - min)) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="rounded-xl border border-solid border-[#E5DADD] bg-white px-3 py-2.5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[8px] uppercase tracking-[0.06em] text-[#8A7A80]">Throughput</div>
          <div className="mt-1 text-[15px] text-[#181817]">2.4M rows/min</div>
        </div>
        <div className="text-[8px] text-[#4D7C5B]">↑ 12.8%</div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 h-[46px] w-full" role="img" aria-label="Throughput trend">
        <defs>
          <linearGradient id="ops-throughput-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C46686" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#C46686" stopOpacity="0" />
          </linearGradient>
        </defs>

        <polygon points={`0,${height} ${points} ${width},${height}`} fill="url(#ops-throughput-area)" />
        <polyline
          points={points}
          fill="none"
          stroke="#C46686"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function RunTimeline({ selectedRun, onSelectRun }: { selectedRun: string; onSelectRun: (id: string) => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-solid border-[#E5DADD] bg-white">
      <div className="grid grid-cols-[1fr_76px_62px] border-b border-solid border-[#EEE5E8] px-3 py-2">
        <span className="text-[8px] uppercase tracking-[0.06em] text-[#8A7A80]">Execution</span>
        <span className="text-[8px] uppercase tracking-[0.06em] text-[#8A7A80]">Status</span>
        <span className="text-right text-[8px] uppercase tracking-[0.06em] text-[#8A7A80]">Time</span>
      </div>

      {RUNS.map((run, index) => {
        const active = selectedRun === run.id;

        return (
          <button
            key={run.id}
            type="button"
            onMouseEnter={() => onSelectRun(run.id)}
            onFocus={() => onSelectRun(run.id)}
            className={`grid w-full appearance-none grid-cols-[1fr_76px_62px] items-center border-0 px-3 py-2.5 text-left transition-colors ${
              index === RUNS.length - 1 ? '' : 'border-b border-solid border-[#F0E9EB]'
            } ${active ? 'bg-[#FBF6F8]' : 'bg-white hover:bg-[#FCF9FA]'}`}
          >
            <div className="min-w-0 pr-3">
              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    run.status === 'Failed'
                      ? 'bg-[#B94B4B]'
                      : run.status === 'Running'
                        ? 'bg-[#C96442]'
                        : 'bg-[#4D7C5B]'
                  }`}
                />
                <span className="truncate text-[9px] font-medium text-[#343330]">{run.name}</span>
              </div>

              <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#F0E7EA]">
                <div
                  className={`h-full rounded-full transition-[width] duration-300 ${
                    run.status === 'Failed'
                      ? 'bg-[#B94B4B]'
                      : run.status === 'Running'
                        ? 'bg-[#C46686]'
                        : 'bg-[#779483]'
                  }`}
                  style={{ width: `${run.progress}%` }}
                />
              </div>
            </div>

            <span className="flex items-center gap-1.5 text-[8px] text-[#665B5F]">
              <StatusDot
                tone={run.status === 'Running' ? 'running' : run.status === 'Failed' ? 'neutral' : 'success'}
              />
              {run.status}
            </span>

            <span className="text-right text-[8px] text-[#8A7A80] [font-family:'Yak_Mono',monospace]">
              {run.duration}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function RunInspector({ run }: { run: RunItem }) {
  return (
    <div className="rounded-xl bg-[#191718] p-3.5 text-white">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[8px] uppercase tracking-[0.08em] text-[#998B90]">Selected run</div>
          <div className="mt-1 text-[12px] font-medium text-[#FAF9F5]">{run.name}</div>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-[7px] ${
            run.status === 'Failed'
              ? 'bg-[#4A2428] text-[#F0A7A7]'
              : run.status === 'Running'
                ? 'bg-[#4A2E25] text-[#E7B29C]'
                : 'bg-[#24382E] text-[#A9D0B8]'
          }`}
        >
          {run.status}
        </span>
      </div>

      <p className="mt-3 text-[8px] leading-[1.55] text-[#B9ADB1]">{run.detail}</p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-solid border-[#343033] px-2.5 py-2">
          <div className="text-[7px] uppercase tracking-[0.06em] text-[#84787D]">Started</div>
          <div className="mt-1 text-[9px] text-[#E6DFE1]">{run.startedAt}</div>
        </div>

        <div className="rounded-lg border border-solid border-[#343033] px-2.5 py-2">
          <div className="text-[7px] uppercase tracking-[0.06em] text-[#84787D]">Rows</div>
          <div className="mt-1 text-[9px] text-[#E6DFE1]">{run.rows}</div>
        </div>
      </div>

      <div className="mt-3 border-t border-solid border-[#312D30] pt-3 [font-family:'Yak_Mono',monospace]">
        <div className="text-[7px] text-[#84787D]">latest.log</div>
        <div className="mt-1.5 text-[8px] leading-[1.6] text-[#BDB3B6]">
          {run.status === 'Failed'
            ? 'WARN rate limit reached · retry in 30s'
            : run.status === 'Running'
              ? 'INFO processing partition 17 / 24'
              : 'INFO execution completed successfully'}
        </div>
      </div>
    </div>
  );
}

function AttentionQueue() {
  return (
    <div className="rounded-xl border border-solid border-[#E5DADD] bg-white p-3">
      <div className="flex items-center justify-between">
        <div className="text-[8px] uppercase tracking-[0.06em] text-[#8A7A80]">Attention queue</div>
        <span className="rounded-full bg-[#F4E7EA] px-2 py-0.5 text-[7px] text-[#9B445E]">2 issues</span>
      </div>

      <div className="mt-3 space-y-2">
        <div className="rounded-lg bg-[#FAF4F5] p-2.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B94B4B]" />
            <span className="text-[8px] font-medium text-[#4B373D]">inventory_sync failed</span>
          </div>
          <div className="mt-1 text-[7px] leading-[1.5] text-[#806F75]">Warehouse API rate limit · retry scheduled</div>
        </div>

        <div className="rounded-lg bg-[#FAF7F2] p-2.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#BA7517]" />
            <span className="text-[8px] font-medium text-[#4A4034]">customer_360 latency</span>
          </div>
          <div className="mt-1 text-[7px] leading-[1.5] text-[#817365]">
            P95 runtime is 18% above the weekly baseline
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OperationsUseCase() {
  const [selectedRunId, setSelectedRunId] = useState(RUNS[1].id);
  const selectedRun = RUNS.find((run) => run.id === selectedRunId) ?? RUNS[0];

  return (
    <UseCaseResultSurface>
      <div className="flex h-full flex-col p-8">
        <div className="flex items-start justify-between gap-4 border-b border-solid border-[#E8E0E3] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="m-0 text-[18px] font-medium leading-[1.15] text-[#141413] [font-family:'Yak_Serif',Georgia,sans-serif]">
                Operations control room
              </h3>
              <LiveBadge />
            </div>
            <p className="mt-1 text-[8px] text-[#70666A]">Yak Ops Runtime · last 60 minutes</p>
          </div>

          <div className="text-right">
            <div className="text-[8px] text-[#8A7A80]">Environment</div>
            <div className="mt-1 text-[9px] font-medium text-[#343330]">Production</div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <OpsMetric label="Success rate" value="99.4%" meta="↑ 0.6% today" />
          <OpsMetric label="Running" value="18" meta="7 workflows · 11 syncs" />
          <OpsMetric label="Needs attention" value="2" meta="1 failed · 1 slow" />
        </div>

        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1.42fr_0.78fr] gap-3">
          <div className="flex min-h-0 flex-col gap-3">
            <RunTimeline selectedRun={selectedRunId} onSelectRun={setSelectedRunId} />
            <ThroughputSparkline />
          </div>

          <div className="flex min-h-0 flex-col gap-3">
            <RunInspector run={selectedRun} />
            <AttentionQueue />
          </div>
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const operationsUseCase: HomeUseCaseDefinition = {
  id: 'operations',
  label: 'Operate',
  prompt:
    'Give me a live operations view for the last hour. Show workflow health, active executions, throughput, failed or slow jobs, and let me inspect the run that needs attention without leaving the page.',
  stageColor: '#C46686',
  Icon: OperationsIcon,
  Result: OperationsUseCase,
};
