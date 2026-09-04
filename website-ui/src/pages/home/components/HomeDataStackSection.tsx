import { motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";

type IntegrationKind = "sync" | "stream" | "database" | "storage" | "task" | "alert";

type Integration = {
  name: string;
  category: string;
  description: string;
  kind: IntegrationKind;
};

const INTEGRATIONS: Integration[] = [
  {
    name: "Link-Up",
    category: "Offline sync",
    description: "Task definitions, execution, and reconciliation for batch data movement.",
    kind: "sync",
  },
  {
    name: "Flink CDC",
    category: "Realtime sync",
    description: "Realtime pipeline submission with Flink runtime control through REST APIs.",
    kind: "stream",
  },
  {
    name: "JDBC",
    category: "Datasource",
    description: "Reusable database connectivity through the datasource plugin layer.",
    kind: "database",
  },
  {
    name: "Doris",
    category: "Datasource",
    description: "Native datasource support for analytical workloads and metadata access.",
    kind: "database",
  },
  {
    name: "MinIO",
    category: "Storage",
    description: "Object storage support through the common storage plugin contract.",
    kind: "storage",
  },
  {
    name: "HDFS",
    category: "Storage",
    description: "Distributed file storage integration for data and managed assets.",
    kind: "storage",
  },
  {
    name: "SQL · Python · Shell · Java",
    category: "Task plugins",
    description: "A shared task foundation for the runtimes data teams already use.",
    kind: "task",
  },
  {
    name: "DingTalk",
    category: "Alerts",
    description: "Operational notifications through a common alert SPI and DingTalk integration.",
    kind: "alert",
  },
];

function IntegrationGlyph({ kind }: { kind: IntegrationKind }) {
  if (kind === "stream") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M3 8H8L11 5L14 11L17 8H21" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 16H7L10 13L14 19L18 15H21" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "database") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.35" />
        <path d="M5 6V12C5 13.7 8.1 15 12 15C15.9 15 19 13.7 19 12V6" stroke="currentColor" strokeWidth="1.35" />
        <path d="M5 12V18C5 19.7 8.1 21 12 21C15.9 21 19 19.7 19 18V12" stroke="currentColor" strokeWidth="1.35" />
      </svg>
    );
  }

  if (kind === "storage") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M4 8.5L12 4L20 8.5L12 13L4 8.5Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
        <path d="M4 12.5L12 17L20 12.5M4 16.5L12 21L20 16.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "task") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <rect x="3.5" y="4" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.35" />
        <path d="M7 9L10 12L7 15M13 15H17" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "alert") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M6.5 9.5C6.5 6.5 8.8 4 12 4C15.2 4 17.5 6.5 17.5 9.5V14L20 17H4L6.5 14V9.5Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
        <path d="M10 20H14" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect x="3.5" y="5" width="5" height="5" rx="1.1" stroke="currentColor" strokeWidth="1.35" />
      <rect x="15.5" y="14" width="5" height="5" rx="1.1" stroke="currentColor" strokeWidth="1.35" />
      <path d="M8.5 7.5H15C16.7 7.5 18 8.8 18 10.5V14" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M15.5 11.5L18 14L20.5 11.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomeDataStackSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-t border-solid border-[#E3E0D7] bg-[#FAF9F5]">
      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] py-[clamp(7rem,6.142857rem+4.285714vw,10rem)]">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            ease: HOME_EASE,
          }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="m-0 text-[clamp(2.5rem,2.035714rem+2.321429vw,4.125rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[#181817] [font-family:'Yak_Serif',Georgia,sans-serif]">
            Works with your data stack
          </h2>

          <p className="mb-0 mt-5 max-w-[44rem] text-[clamp(1.05rem,0.985714rem+0.321429vw,1.275rem)] leading-[1.55] text-[#66645F] [font-family:'Yak_Sans',Arial,sans-serif]">
            Connect the engines, storage, task runtimes, and alerting tools that already power your data operations.
          </p>
        </motion.div>

        <div className="mt-[clamp(5rem,4.428571rem+2.857143vw,7rem)] grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-4 lg:gap-y-16">
          {INTEGRATIONS.map((integration, index) => {
            const showTabletDivider = index % 2 === 1;
            const showDesktopDivider = index % 4 !== 0;

            return (
              <motion.article
                key={integration.name}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: 16,
                      }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.55,
                  delay: shouldReduceMotion ? 0 : (index % 4) * 0.055,
                  ease: HOME_EASE,
                }}
                className="relative min-h-[205px] px-4 sm:px-8 lg:px-9 xl:px-10"
              >
                {showTabletDivider && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-[#DDD9CF] sm:block lg:hidden"
                  />
                )}

                {showDesktopDivider && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-[#DDD9CF] lg:block"
                  />
                )}

                <div className="text-[#6D6A64]">
                  <IntegrationGlyph kind={integration.kind} />
                </div>

                <p className="m-0 mt-7 text-[11px] font-medium uppercase tracking-[0.15em] text-[#8A877F] [font-family:'Yak_Sans',Arial,sans-serif]">
                  {integration.category}
                </p>

                <h3 className="m-0 mt-2 text-[clamp(1.18rem,1.09rem+0.35vw,1.42rem)] font-medium leading-[1.22] text-[#181817] [font-family:'Yak_Serif',Georgia,sans-serif]">
                  {integration.name}
                </h3>

                <p className="mb-0 mt-3 max-w-[31ch] text-[14px] leading-[1.62] text-[#66645F] [font-family:'Yak_Sans',Arial,sans-serif]">
                  {integration.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <p className="mb-0 mt-[clamp(4.5rem,4.071429rem+2.142857vw,6rem)] text-center text-[14px] leading-[1.6] text-[#77746D] [font-family:'Yak_Sans',Arial,sans-serif]">
          Built on plugin contracts so the integration surface can grow without redefining the platform.
        </p>
      </div>
    </section>
  );
}
