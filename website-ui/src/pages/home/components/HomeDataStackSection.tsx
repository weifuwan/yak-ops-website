import { motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";

type IntegrationKind = "sync" | "stream" | "database" | "storage" | "task" | "alert";

type Integration = {
  name: string;
  category: string;
  kind: IntegrationKind;
};

const INTEGRATIONS: Integration[] = [
  {
    name: "Link-Up",
    category: "Offline sync",
    kind: "sync",
  },
  {
    name: "Flink CDC",
    category: "Realtime sync",
    kind: "stream",
  },
  {
    name: "JDBC",
    category: "Datasource",
    kind: "database",
  },
  {
    name: "Doris",
    category: "Datasource",
    kind: "database",
  },
  {
    name: "MinIO",
    category: "Storage",
    kind: "storage",
  },
  {
    name: "HDFS",
    category: "Storage",
    kind: "storage",
  },
  {
    name: "SQL · Python · Shell · Java",
    category: "Task runtimes",
    kind: "task",
  },
  {
    name: "DingTalk",
    category: "Alerts",
    kind: "alert",
  },
];

function IntegrationGlyph({ kind }: { kind: IntegrationKind }) {
  if (kind === "stream") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path
          d="M3 8H8L11 5L14 11L17 8H21"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 16H7L10 13L14 19L18 15H21"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "database") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.35" />
        <path
          d="M5 6V12C5 13.7 8.1 15 12 15C15.9 15 19 13.7 19 12V6"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M5 12V18C5 19.7 8.1 21 12 21C15.9 21 19 19.7 19 18V12"
          stroke="currentColor"
          strokeWidth="1.35"
        />
      </svg>
    );
  }

  if (kind === "storage") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path
          d="M4 8.5L12 4L20 8.5L12 13L4 8.5Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M4 12.5L12 17L20 12.5M4 16.5L12 21L20 16.5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "task") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <rect x="3.5" y="4" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.35" />
        <path
          d="M7 9L10 12L7 15M13 15H17"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "alert") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path
          d="M6.5 9.5C6.5 6.5 8.8 4 12 4C15.2 4 17.5 6.5 17.5 9.5V14L20 17H4L6.5 14V9.5Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path d="M10 20H14" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <rect x="3.5" y="5" width="5" height="5" rx="1.1" stroke="currentColor" strokeWidth="1.35" />
      <rect x="15.5" y="14" width="5" height="5" rx="1.1" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M8.5 7.5H15C16.7 7.5 18 8.8 18 10.5V14"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M15.5 11.5L18 14L20.5 11.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomeDataStackSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-t border-solid border-[#E3E0D7] bg-[#FAF9F5]">
      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] py-[clamp(7rem,6.142857rem+4.285714vw,10rem)]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.72fr)] lg:gap-[clamp(4rem,2.857143rem+5.714286vw,8rem)]">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.72,
              ease: HOME_EASE,
            }}
            className="rounded-[clamp(1.5rem,1.071429rem+2.142857vw,3rem)] bg-[#F0EEE6] px-[clamp(1.5rem,0.928571rem+2.857143vw,3.5rem)] py-[clamp(2.5rem,1.928571rem+2.857143vw,4.5rem)]"
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-[clamp(2.75rem,2.178571rem+2.857143vw,4.75rem)] sm:grid-cols-3 lg:grid-cols-4">
              {INTEGRATIONS.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.5,
                    delay: shouldReduceMotion ? 0 : (index % 4) * 0.055,
                    ease: HOME_EASE,
                  }}
                  className="group min-w-0"
                >
                  <div className="flex min-h-[88px] flex-col justify-center">
                    <div className="flex items-center gap-3 text-[#353431] transition-colors duration-300 group-hover:text-[#181817]">
                      <span className="shrink-0 text-[#77746D] transition-colors duration-300 group-hover:text-[#C96442]">
                        <IntegrationGlyph kind={integration.kind} />
                      </span>
                      <span
                        className={`min-w-0 leading-[1.08] text-[#181817] [font-family:'Yak_Serif',Georgia,sans-serif] ${
                          integration.kind === "task"
                            ? "text-[clamp(1rem,0.92rem+0.24vw,1.18rem)]"
                            : "text-[clamp(1.25rem,1.08rem+0.48vw,1.6rem)]"
                        }`}
                      >
                        {integration.name}
                      </span>
                    </div>

                    <p className="mb-0 mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#8A877F] [font-family:'Yak_Sans',Arial,sans-serif]">
                      {integration.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.72,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: HOME_EASE,
            }}
            className="max-w-[31rem] lg:max-w-none"
          >
            <p className="m-0 text-[11px] font-medium uppercase tracking-[0.17em] text-[#88857D] [font-family:'Yak_Sans',Arial,sans-serif]">
              Integrations
            </p>

            <h2 className="m-0 mt-5 text-[clamp(2.25rem,1.946429rem+1.517857vw,3.3125rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[#181817] [font-family:'Yak_Serif',Georgia,sans-serif]">
              Works with your data stack
            </h2>

            <p className="mb-0 mt-6 text-[clamp(1rem,0.964286rem+0.178571vw,1.125rem)] leading-[1.62] text-[#66645F] [font-family:'Yak_Sans',Arial,sans-serif]">
              Keep the infrastructure you already use. Yak Ops connects engines, storage, task runtimes, and alerting through one operating context.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#77746D] [font-family:'Yak_Sans',Arial,sans-serif]">
              <span>Batch & realtime</span>
              <span aria-hidden="true">·</span>
              <span>Plugin based</span>
              <span aria-hidden="true">·</span>
              <span>Self-hosted</span>
            </div>

            <a
              href="https://github.com/weifuwan/yak-ops"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-solid border-[#D1CFC5] px-4 py-2.5 text-[14px] font-medium text-[#353431] no-underline transition-colors duration-200 hover:border-[#A9A69D] hover:bg-[#F0EEE6] hover:text-[#181817] [font-family:'Yak_Sans',Arial,sans-serif]"
            >
              Explore on GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
