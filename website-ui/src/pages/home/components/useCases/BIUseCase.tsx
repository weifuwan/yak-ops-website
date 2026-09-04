import { useState } from "react";

import { UseCaseResultSurface } from "./shared";
import type { HomeUseCaseDefinition } from "./types";

const GMV_DATA = [86, 94, 101, 98, 112, 121, 136, 149];

const FUNNEL_DATA = [
  { label: "Visits", value: 128400, rate: 100, color: "#D97757" },
  { label: "Product views", value: 84620, rate: 66, color: "#E08A68" },
  { label: "Add to cart", value: 21980, rate: 17.1, color: "#E99E7F" },
  { label: "Checkout", value: 11240, rate: 8.8, color: "#F0B59D" },
  { label: "Orders", value: 7284, rate: 5.7, color: "#C96442" },
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
    <div className="rounded-lg bg-[#F7F3EE] px-3 py-2.5">
      <div className="text-[8px] uppercase tracking-[0.06em] text-[#87867F]">{label}</div>
      <div className="mt-1 text-[18px] leading-none text-[#181817]">{value}</div>
      <div className={`mt-1.5 text-[8px] ${tone === "up" ? "text-[#29705B]" : "text-[#A5482A]"}`}>
        {tone === "up" ? "↑" : "↓"} {trend}
      </div>
    </div>
  );
}

function GMVBarChart() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const minValue = 80;
  const maxValue = 155;
  const chartTop = 20;
  const chartBottom = 188;
  const chartHeight = chartBottom - chartTop;
  const ticks = [80, 95, 110, 125, 140, 155];

  const valueToY = (value: number) =>
    chartTop + ((maxValue - value) / (maxValue - minValue)) * chartHeight;

  return (
    <div className="rounded-lg border border-solid border-[#E3DED7] p-3">
      <div className="flex items-center justify-between gap-4">
        <div className="text-[8px] uppercase tracking-[0.08em] text-[#5E5D59]">
          GMV — last 8 weeks
        </div>
        <div className="text-[8px] text-[#9A7464]">USD · thousands</div>
      </div>

      <svg
        viewBox="0 0 360 220"
        className="mt-1 h-[190px] w-full"
        role="img"
        aria-label="Gross merchandise value for the last eight weeks"
      >
        {ticks.map((tick) => {
          const y = valueToY(tick);

          return (
            <g key={tick}>
              <line x1="42" x2="344" y1={y} y2={y} stroke="#ECE7E1" strokeWidth="1" />
              <text x="35" y={y + 3} textAnchor="end" fontSize="8" fill="#73726C">
                ${tick}k
              </text>
            </g>
          );
        })}

        {GMV_DATA.map((value, index) => {
          const x = 50 + index * 36;
          const y = valueToY(value);
          const height = chartBottom - y;
          const active = hoveredBar === index;
          const latest = index === GMV_DATA.length - 1;

          return (
            <g
              key={`${value}-${index}`}
              tabIndex={0}
              role="graphics-symbol"
              aria-label={`Week ${index + 1}: $${value}k GMV`}
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
              onFocus={() => setHoveredBar(index)}
              onBlur={() => setHoveredBar(null)}
              className="cursor-pointer outline-none"
            >
              <rect
                x={x}
                y={active ? y - 4 : y}
                width="24"
                height={active ? height + 4 : height}
                rx="3"
                fill={active || latest ? "#C96442" : "#E7A58C"}
                opacity={hoveredBar === null || active ? 1 : 0.48}
                style={{ transition: "all 160ms ease" }}
              />

              <text x={x + 12} y="204" textAnchor="middle" fontSize="8" fill="#73726C">
                Wk {index + 1}
              </text>

              {active ? (
                <g pointerEvents="none" transform={`translate(${x - 10},${Math.max(3, y - 31)})`}>
                  <rect width="44" height="22" rx="5" fill="#141413" />
                  <text x="22" y="14" textAnchor="middle" fontSize="9" fill="#FAF9F5">
                    ${value}k
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ConversionFunnelChart() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="rounded-lg border border-solid border-[#E3DED7] p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[8px] uppercase tracking-[0.08em] text-[#5E5D59]">
          Conversion funnel
        </div>
        <div className="text-[8px] text-[#9A7464]">Weekly</div>
      </div>

      <div className="mt-4 flex min-h-[190px] flex-col justify-center gap-2.5">
        {FUNNEL_DATA.map((step, index) => {
          const active = hoveredStep === index;

          return (
            <button
              key={step.label}
              type="button"
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              onFocus={() => setHoveredStep(index)}
              onBlur={() => setHoveredStep(null)}
              className="group appearance-none border-0 bg-transparent p-0 text-left outline-none"
              aria-label={`${step.label}: ${step.value.toLocaleString()} users, ${step.rate}% of visits`}
            >
              <div className="mb-1 flex items-center justify-between gap-3">
                <span
                  className={`text-[8px] transition-colors ${
                    active ? "font-medium text-[#181817]" : "text-[#5E5D59]"
                  }`}
                >
                  {step.label}
                </span>

                <span className={`text-[8px] ${active ? "text-[#181817]" : "text-[#87867F]"}`}>
                  {step.value.toLocaleString()}
                </span>
              </div>

              <div className="relative h-7 overflow-hidden rounded-md bg-[#F4EFEA]">
                <div
                  className="flex h-full items-center rounded-md px-2 transition-all duration-200"
                  style={{
                    width: `${Math.max(step.rate, 16)}%`,
                    backgroundColor: step.color,
                    opacity: hoveredStep === null || active ? 1 : 0.42,
                    transform: active ? "scaleY(1.08)" : "scaleY(1)",
                    transformOrigin: "left center",
                  }}
                >
                  <span className="text-[8px] font-medium text-white">
                    {step.rate}%
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 rounded-lg bg-[#F7F3EE] p-2.5">
        <div className="text-[8px] uppercase tracking-[0.06em] text-[#87867F]">
          Checkout → order
        </div>
        <div className="mt-1 flex items-end justify-between gap-3">
          <div className="text-[16px] leading-none text-[#181817]">64.8%</div>
          <div className="text-[8px] text-[#29705B]">↑ 3.2% vs last week</div>
        </div>
      </div>
    </div>
  );
}

export default function BIUseCase() {
  return (
    <UseCaseResultSurface>
      <div className="flex h-full flex-col p-10">
        <div className="flex items-start justify-between gap-4 border-b pb-3">
          <div>
            <h3 className="m-0 text-[18px] font-medium leading-[1.15] text-[#141413] [font-family:'Yak_Serif',Georgia,sans-serif]">
              Weekly commerce performance
            </h3>
            <p className="mt-1 text-[8px] text-[#5E5D59]">
              Yak Ops Commerce · Aug 25–31, 2026
            </p>
          </div>

          <div className="flex gap-1.5">
            <span className="rounded-full border border-solid border-[#BFAE9F] px-3 py-1 text-[8px] text-[#181817]">
              GMV
            </span>
            <span className="rounded-full border border-solid border-[#DED4CB] px-3 py-1 text-[8px] text-[#5E5D59]">
              Orders
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <KpiCard
            label="GMV"
            value="$149.2k"
            trend="9.6% vs last week"
            tone="up"
          />
          <KpiCard
            label="Orders"
            value="7,284"
            trend="7.8% vs last week"
            tone="up"
          />
          <KpiCard
            label="Refund rate"
            value="2.3%"
            trend="0.4% vs last week"
            tone="down"
          />
        </div>

        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1.35fr_0.85fr] gap-3">
          <GMVBarChart />
          <ConversionFunnelChart />
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const biUseCase: HomeUseCaseDefinition = {
  id: "bi",
  label: "BI",
  prompt:
    "Build a weekly ecommerce performance dashboard. Show GMV, orders, refund rate, the eight-week GMV trend, and a conversion funnel from visits to completed orders. Make every chart interactive so I can inspect exact values.",
  stageColor: "#DFA083",
  Icon: BIIcon,
  Result: BIUseCase,
};