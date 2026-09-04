import { useState } from "react";

import { UseCaseResultSurface } from "./shared";
import type { HomeUseCaseDefinition } from "./types";

const REVENUE_DATA = [98, 104, 110, 108, 118, 122, 130, 142];
const TRAFFIC_DATA = [
  { label: "Organic", value: 38, color: "#1D9E75" },
  { label: "Direct", value: 27, color: "#534AB7" },
  { label: "Referral", value: 21, color: "#378ADD" },
  { label: "Paid", value: 14, color: "#BA7517" },
] as const;

function BIIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 16.5H17" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <rect x="4" y="10" width="2.5" height="5" rx="0.7" stroke="currentColor" strokeWidth="1" />
      <rect x="8.75" y="5" width="2.5" height="10" rx="0.7" stroke="currentColor" strokeWidth="1" />
      <rect x="13.5" y="7.5" width="2.5" height="7.5" rx="0.7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function KpiCard({
  label,
  value,
  trend,
  tone,
}: {
  label: string;
  value: string;
  trend: string;
  tone: "up" | "down";
}) {
  return (
    <div className="rounded-lg bg-[#F5F4ED] px-3 py-2.5">
      <div className="text-[8px] uppercase tracking-[0.06em] text-[#87867F]">{label}</div>
      <div className="mt-1 text-[18px] leading-none text-[#181817]">{value}</div>
      <div className={`mt-1.5 text-[8px] ${tone === "up" ? "text-[#0F6E56]" : "text-[#993C1D]"}`}>
        {tone === "up" ? "↑" : "↓"} {trend}
      </div>
    </div>
  );
}

function RevenueBarChart() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const minValue = 95;
  const maxValue = 145;
  const chartTop = 20;
  const chartBottom = 188;
  const chartHeight = chartBottom - chartTop;
  const ticks = [95, 105, 115, 125, 135, 145];

  const valueToY = (value: number) =>
    chartTop + ((maxValue - value) / (maxValue - minValue)) * chartHeight;

  return (
    <div className="rounded-lg border border-solid border-[#DEDCD1] p-3">
      <div className="text-[8px] uppercase tracking-[0.08em] text-[#5E5D59]">Revenue — last 8 weeks</div>
      <svg viewBox="0 0 360 220" className="mt-1 h-[190px] w-full" role="img" aria-label="Revenue for the last eight weeks">
        {ticks.map((tick) => {
          const y = valueToY(tick);
          return (
            <g key={tick}>
              <line x1="42" x2="344" y1={y} y2={y} stroke="#E8E6DC" strokeWidth="1" />
              <text x="35" y={y + 3} textAnchor="end" fontSize="8" fill="#73726C">${tick}k</text>
            </g>
          );
        })}

        {REVENUE_DATA.map((value, index) => {
          const x = 50 + index * 36;
          const y = valueToY(value);
          const height = chartBottom - y;
          const active = hoveredBar === index;

          return (
            <g
              key={`${value}-${index}`}
              tabIndex={0}
              role="graphics-symbol"
              aria-label={`Week ${index + 1}: $${value}k`}
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
              onFocus={() => setHoveredBar(index)}
              onBlur={() => setHoveredBar(null)}
              className="cursor-pointer outline-none"
            >
              <rect
                x={x}
                y={active ? y - 3 : y}
                width="24"
                height={active ? height + 3 : height}
                rx="2"
                fill={index === REVENUE_DATA.length - 1 || active ? "#1D9E75" : "#92D7C3"}
                opacity={hoveredBar === null || active ? 1 : 0.62}
                style={{ transition: "all 160ms ease" }}
              />
              <text x={x + 12} y="204" textAnchor="middle" fontSize="8" fill="#73726C">Wk {index + 1}</text>

              {active ? (
                <g pointerEvents="none" transform={`translate(${x - 8},${Math.max(3, y - 30)})`}>
                  <rect width="40" height="22" rx="5" fill="#141413" />
                  <text x="20" y="14" textAnchor="middle" fontSize="9" fill="#FAF9F5">${value}k</text>
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function TrafficDonutChart() {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const radius = 42;
  let offset = 0;

  return (
    <div className="rounded-lg border border-solid border-[#DEDCD1] p-3">
      <div className="text-[8px] uppercase tracking-[0.08em] text-[#5E5D59]">Traffic mix</div>
      <svg viewBox="0 0 180 150" className="mx-auto mt-2 h-[150px] w-full" role="img" aria-label="Traffic source mix">
        {TRAFFIC_DATA.map((segment, index) => {
          const dashOffset = -offset;
          offset += segment.value;
          const active = hoveredSegment === index;

          return (
            <circle
              key={segment.label}
              cx="90"
              cy="68"
              r={radius}
              pathLength="100"
              fill="none"
              stroke={segment.color}
              strokeWidth={active ? 18 : 14}
              strokeDasharray={`${segment.value} ${100 - segment.value}`}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 90 68)"
              opacity={hoveredSegment === null || active ? 1 : 0.5}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
              className="cursor-pointer"
              style={{ transition: "stroke-width 160ms ease, opacity 160ms ease" }}
            />
          );
        })}

        <text x="90" y="66" textAnchor="middle" fontSize="10" fill="#73726C">
          {hoveredSegment === null ? "Traffic" : TRAFFIC_DATA[hoveredSegment].label}
        </text>
        <text x="90" y="80" textAnchor="middle" fontSize="15" fontWeight="600" fill="#181817">
          {hoveredSegment === null ? "100%" : `${TRAFFIC_DATA[hoveredSegment].value}%`}
        </text>
      </svg>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {TRAFFIC_DATA.map((segment, index) => (
          <button
            key={segment.label}
            type="button"
            onMouseEnter={() => setHoveredSegment(index)}
            onMouseLeave={() => setHoveredSegment(null)}
            onFocus={() => setHoveredSegment(index)}
            onBlur={() => setHoveredSegment(null)}
            className="flex appearance-none items-center gap-1.5 border-0 bg-transparent p-0 text-left text-[8px] text-[#5E5D59]"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
            <span>{segment.label} {segment.value}%</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BIUseCase() {
  return (
    <UseCaseResultSurface>
      <div className="flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-4 border-b border-solid border-[#E8E6DC] pb-3">
          <div>
            <h3 className="m-0 text-[18px] font-medium leading-[1.15] text-[#141413] [font-family:'Yak_Serif',Georgia,sans-serif]">
              Weekly performance report
            </h3>
            <p className="mt-1 text-[8px] text-[#5E5D59]">Yak Ops BI · Mar 17–23, 2026</p>
          </div>
          <div className="flex gap-1.5">
            <span className="rounded-full border border-solid border-[#B0AEA5] px-3 py-1 text-[8px] text-[#181817]">Revenue</span>
            <span className="rounded-full border border-solid border-[#D1CFC5] px-3 py-1 text-[8px] text-[#5E5D59]">Users</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <KpiCard label="Active users" value="24,810" trend="11.1% vs last week" tone="up" />
          <KpiCard label="Revenue" value="$142.3k" trend="9.4% vs last week" tone="up" />
          <KpiCard label="Conversions" value="1,847" trend="8.2% vs last week" tone="down" />
        </div>

        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1.35fr_0.85fr] gap-3">
          <RevenueBarChart />
          <TrafficDonutChart />
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const biUseCase: HomeUseCaseDefinition = {
  id: "bi",
  label: "BI",
  prompt:
    "Build a weekly performance dashboard from the analytics mart. Show active users, revenue, conversions, the eight-week revenue trend, and traffic mix. Make the charts interactive so I can inspect exact values.",
  stageColor: "#6A9BCC",
  Icon: BIIcon,
  Result: BIUseCase,
};
