import { UseCaseResultSurface } from "./shared";
import type { HomeUseCaseDefinition } from "./types";

function ServicesIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="14"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M6 8L8 10L6 12M11 12H14"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
      <rect
        x="5"
        y="3"
        width="7"
        height="8"
        rx="1.3"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M4 5H3.8C3.14 5 2.6 5.54 2.6 6.2V11.8C2.6 12.46 3.14 13 3.8 13H8.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}

function MetricCard({
  label,
  value,
  delta,
  positive = true,
}: MetricCardProps) {
  return (
    <div className="relative min-w-0 overflow-hidden rounded-[12px] border border-[#E9E6DF] bg-white px-3.5 py-3">
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-5
          -top-7
          h-16
          w-16
          rounded-full
          bg-[#EEF6EF]
          blur-2xl
        "
      />

      <div className="relative">
        <div className="text-[8px] text-[#8C8880]">{label}</div>

        <div className="mt-1.5 flex items-end gap-1.5">
          <span className="truncate text-[17px] font-semibold tracking-[-0.035em] text-[#1E1D1A]">
            {value}
          </span>

          <span
            className={`
              mb-[2px]
              text-[7px]
              font-medium
              ${positive ? "text-[#4D966A]" : "text-[#B56B58]"}
            `}
          >
            {delta}
          </span>
        </div>
      </div>
    </div>
  );
}

function RequestsChart() {
  const bars = [
    32, 37, 28, 45, 40, 53, 47, 58, 50, 63, 61, 75, 68, 82, 72, 66, 79, 70,
    88, 84, 92, 78, 86, 98,
  ];

  return (
    <div className="mt-3 flex h-[82px] items-end gap-[3px]">
      {bars.map((height, index) => (
        <div
          key={`${height}-${index}`}
          className="group relative flex h-full min-w-0 flex-1 items-end"
        >
          <div
            className={`
              w-full
              rounded-[2px]
              transition-opacity
              ${
                index === 19
                  ? "bg-[#C96442]"
                  : index > 19
                    ? "bg-[#D9D8D1]"
                    : "bg-[#CBCBC4]"
              }
            `}
            style={{ height: `${height}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function EndpointRow() {
  return (
    <div className="mt-3 rounded-[12px] border border-[#E8E4DD] bg-[#FCFBF8] p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="
                rounded-[5px]
                bg-[#F1E2D9]
                px-2
                py-1
                text-[7px]
                font-semibold
                tracking-[0.03em]
                text-[#5A4438]
              "
            >
              GET
            </span>

            <code
              className="
                truncate
                text-[8px]
                text-[#3E3B36]
                [font-family:'Yak_Mono',monospace]
              "
            >
              /api/v1/customers/:id
            </code>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="flex items-center gap-1 text-[7px] text-[#5A765F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4E9A6A]" />
            Live
          </span>

          <button
            type="button"
            aria-label="Copy endpoint"
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-[6px]
              border
              border-[#E6E2DB]
              bg-white
              text-[#8A867E]
            "
          >
            <CopyIcon />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#ECE8E1] pt-2.5">
        <div>
          <div className="text-[7px] text-[#9A968E]">Auth</div>
          <div className="mt-0.5 text-[8px] font-medium text-[#45423D]">
            API key
          </div>
        </div>

        <div>
          <div className="text-[7px] text-[#9A968E]">Rate limit</div>
          <div className="mt-0.5 text-[8px] font-medium text-[#45423D]">
            600/min
          </div>
        </div>

        <div>
          <div className="text-[7px] text-[#9A968E]">Audit</div>
          <div className="mt-0.5 text-[8px] font-medium text-[#45423D]">
            Enabled
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceHealthCard() {
  return (
    <div className="flex h-full flex-col rounded-[14px] border border-[#E7E3DC] bg-white p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[9px] font-semibold text-[#282622]">
            Service health
          </div>

          <div className="mt-1 text-[7px] text-[#969188]">
            Last 24 hours
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-[#EDF6EF] px-2 py-1 text-[7px] font-medium text-[#4B7659]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4E9A6A]" />
          Healthy
        </div>
      </div>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-[22px] font-semibold tracking-[-0.05em] text-[#1D1C19]">
          99.98
        </span>
        <span className="mb-[3px] text-[8px] text-[#77736C]">%</span>
      </div>

      <div className="mt-1 text-[7px] text-[#969188]">
        Successful requests
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <div className="flex items-center justify-between text-[7px]">
            <span className="text-[#77736C]">Availability</span>
            <span className="font-medium text-[#3F3C37]">99.99%</span>
          </div>

          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#ECEAE5]">
            <div className="h-full w-[99%] rounded-full bg-[#6AA078]" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[7px]">
            <span className="text-[#77736C]">Latency target</span>
            <span className="font-medium text-[#3F3C37]">42 ms</span>
          </div>

          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#ECEAE5]">
            <div className="h-full w-[64%] rounded-full bg-[#B7B7AF]" />
          </div>
        </div>
      </div>

      <div className="mt-auto rounded-[10px] bg-[#181817] px-3 py-2.5">
        <div className="flex items-center gap-1.5 text-[7px] text-[#AAA8A1]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#72B789]" />
          Latest response
        </div>

        <div className="mt-2 [font-family:'Yak_Mono',monospace]">
          <div className="text-[7px] text-[#6FBA85]">
            200 OK
            <span className="ml-1.5 text-[#777871]">· 42 ms</span>
          </div>

          <div className="mt-1.5 text-[7px] leading-[1.6] text-[#D9D7CE]">
            {'{"customer_id":"C-1048"}'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesUseCase() {
  return (
    <UseCaseResultSurface>
      <div
        className="
          flex
          h-full
          items-center
          justify-center
          p-4
          [font-family:'Yak_Sans',Arial,sans-serif]
        "
      >
        <div
          className="
            relative
            w-full
            max-w-[690px]
            overflow-hidden
            rounded-[18px]
            border
            border-[#E2DED6]
            bg-[#F9F9F6]
            shadow-[0_14px_40px_rgba(48,43,36,0.08)]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-52
              w-52
              rounded-full
              bg-[#E8F2E8]
              opacity-70
              blur-[70px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-20
              bottom-0
              h-40
              w-40
              rounded-full
              bg-[#F2E5DC]
              opacity-60
              blur-[70px]
            "
          />

          <main className="relative min-w-0 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[7px] font-medium uppercase tracking-[0.13em] text-[#969188]">
                  Overview
                </div>

                <h3
                  className="
                    m-0
                    mt-1
                    text-[19px]
                    font-semibold
                    tracking-[-0.035em]
                    text-[#1D1C19]
                  "
                >
                  Customers API
                </h3>

                <p className="m-0 mt-1 text-[8px] text-[#88847C]">
                  Monitor traffic, latency, and service health.
                </p>
              </div>

              <button
                type="button"
                className="
                  shrink-0
                  rounded-[8px]
                  bg-[#181817]
                  px-3
                  py-2
                  text-[8px]
                  font-medium
                  text-white
                  shadow-[0_4px_12px_rgba(24,24,23,0.12)]
                "
              >
                + New endpoint
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              <MetricCard
                label="Requests today"
                value="48.2k"
                delta="+12.4%"
              />

              <MetricCard
                label="P95 latency"
                value="42 ms"
                delta="-8.2%"
              />

              <MetricCard
                label="Error rate"
                value="0.02%"
                delta="-0.3%"
              />
            </div>

            <div className="mt-3 grid grid-cols-[minmax(0,1.55fr)_minmax(150px,0.72fr)] gap-3">
              <div className="min-w-0 rounded-[14px] border border-[#E7E3DC] bg-white p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[9px] font-semibold text-[#282622]">
                      API traffic
                    </div>

                    <div className="mt-1 text-[7px] text-[#969188]">
                      Requests over the last 24 hours
                    </div>
                  </div>

                  <div
                    className="
                      rounded-[6px]
                      border
                      border-[#E5E1D9]
                      bg-[#FAF9F6]
                      px-2
                      py-1
                      text-[7px]
                      text-[#6E6A63]
                    "
                  >
                    24 hours
                  </div>
                </div>

                <RequestsChart />

                <div className="mt-2 flex justify-between text-[6px] text-[#AAA69E]">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>Now</span>
                </div>

                <EndpointRow />
              </div>

              <ServiceHealthCard />
            </div>
          </main>
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const servicesUseCase: HomeUseCaseDefinition = {
  id: "services",
  label: "Services",
  prompt:
    "Publish the customer profile dataset as GET /api/v1/customers/:id. Require an API key, limit traffic to 600 requests per minute, and enable audit logging.",
  stageColor: "#EBC9B7",
  Icon: ServicesIcon,
  Result: ServicesUseCase,
};