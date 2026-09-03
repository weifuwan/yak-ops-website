import type { KeyboardEvent } from "react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";
import HomeUseCasePreview, {
  type HomeUseCaseContent,
  type HomeUseCaseId,
} from "./HomeUseCasePreview";

const USE_CASES: HomeUseCaseContent[] = [
  {
    id: "workflows",
    eyebrow: "Workflow orchestration",
    title: "Build reliable pipelines without hiding the flow.",
    description:
      "Model dependencies visually, schedule each step, pass parameters, and keep retries and execution state in one place.",
    sourceLabel: "PostgreSQL · Orders",
    outputLabel: "Warehouse · Revenue mart",
  },
  {
    id: "integration",
    eyebrow: "Data integration",
    title: "Move data across systems with a clear contract.",
    description:
      "Bring batch, CDC, and event sources into governed destinations while keeping connectors, mappings, and runtime state visible.",
    sourceLabel: "MySQL · Kafka · S3",
    outputLabel: "Lakehouse · Customer 360",
  },
  {
    id: "quality",
    eyebrow: "Data quality",
    title: "Catch bad data before it reaches the business.",
    description:
      "Run validation rules with every pipeline, surface drift and anomalies, and make failed checks easy to trace and review.",
    sourceLabel: "Orders · Daily partition",
    outputLabel: "Validated · Trusted dataset",
  },
  {
    id: "services",
    eyebrow: "Data services",
    title: "Turn trusted datasets into governed APIs.",
    description:
      "Publish data services with authentication, rate limits, access control, blacklists, and auditability built into the delivery path.",
    sourceLabel: "Customer profile dataset",
    outputLabel: "REST API · Controlled access",
  },
  {
    id: "operations",
    eyebrow: "Operations",
    title: "Operate every data job from one control surface.",
    description:
      "Monitor executions, inspect logs, follow metrics and notifications, and understand what changed without jumping between systems.",
    sourceLabel: "Workflows · Sync · Quality",
    outputLabel: "Runs · Logs · Alerts",
  },
];

function SectionPictogram() {
  return (
    <svg viewBox="0 0 72 72" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="18" cy="36" r="5.5" stroke="#5E5D59" strokeWidth="1.4" />
      <circle cx="54" cy="18" r="5.5" stroke="#5E5D59" strokeWidth="1.4" />
      <circle cx="54" cy="54" r="5.5" stroke="#5E5D59" strokeWidth="1.4" />
      <path
        d="M23.5 36H33C40 36 40 18 48.5 18"
        stroke="#B0AEA5"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M23.5 36H33C40 36 40 54 48.5 54"
        stroke="#B0AEA5"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M34 29L39 36L34 43"
        stroke="#C96442"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TabIcon({ id }: { id: HomeUseCaseId }) {
  const commonProps = {
    viewBox: "0 0 20 20",
    fill: "none",
    className: "h-5 w-5",
    "aria-hidden": true,
  } as const;

  switch (id) {
    case "workflows":
      return (
        <svg {...commonProps}>
          <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="10" cy="15" r="2" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M6.8 6.2L9 12.8M13.2 6.2L11 12.8M7 5H13"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      );
    case "integration":
      return (
        <svg {...commonProps}>
          <path
            d="M3 5H8M12 5H17M8 5L12 10M12 15H17M8 15H3M8 15L12 10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="10" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
    case "quality":
      return (
        <svg {...commonProps}>
          <path
            d="M4 10.2L7.4 13.5L16 5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="2.5" y="2.5" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
    case "services":
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M6 8L8 10L6 12M11 12H14"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "operations":
      return (
        <svg {...commonProps}>
          <path d="M3 16.5H17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="4" y="10" width="2.5" height="5" rx="0.7" stroke="currentColor" strokeWidth="1.1" />
          <rect x="8.75" y="5" width="2.5" height="10" rx="0.7" stroke="currentColor" strokeWidth="1.1" />
          <rect x="13.5" y="7.5" width="2.5" height="7.5" rx="0.7" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HomeUseCasesSection() {
  const [activeId, setActiveId] = useState<HomeUseCaseId>(USE_CASES[0].id);
  const shouldReduceMotion = useReducedMotion();
  const activeUseCase = USE_CASES.find((item) => item.id === activeId) ?? USE_CASES[0];

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const nextIndex = (currentIndex + direction + USE_CASES.length) % USE_CASES.length;
    const nextUseCase = USE_CASES[nextIndex];

    setActiveId(nextUseCase.id);
    window.requestAnimationFrame(() => {
      document.getElementById(`home-use-case-tab-${nextUseCase.id}`)?.focus();
    });
  };

  return (
    <section className="border-t border-solid border-[#E8E6DC] bg-white">
      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[70rem] pb-24 pt-24 sm:pb-28 sm:pt-28 lg:pb-32">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: HOME_EASE }}
          className="flex flex-col items-center text-center"
        >
          <div className="h-16 w-16">
            <SectionPictogram />
          </div>
          <h2 className="mt-7 text-[clamp(2.25rem,1.8rem+2vw,3.5rem)] font-medium leading-[1.08] text-[#141413] [font-family:'Yak_Serif',Georgia,sans-serif]">
            How you can use Yak Ops
          </h2>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.65,
            delay: shouldReduceMotion ? 0 : 0.16,
            ease: HOME_EASE,
          }}
          className="mt-24 overflow-x-auto pb-2 lg:mt-28"
        >
          <div
            role="tablist"
            aria-label="Yak Ops use cases"
            className="flex w-max rounded-2xl bg-[#F5F4ED] p-1"
          >
            {USE_CASES.map((item, index) => {
              const active = item.id === activeId;

              return (
                <button
                  key={item.id}
                  id={`home-use-case-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`home-use-case-panel-${item.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`flex h-10 shrink-0 appearance-none items-center justify-center gap-2 rounded-xl border-0 px-3 text-[12px] font-medium transition-[background-color,color,box-shadow] duration-200 [font-family:'Yak_Sans',Arial,sans-serif] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96442] sm:px-4 ${
                    active
                      ? "bg-white text-[#181817] shadow-[0_1px_2px_rgba(24,24,23,0.08)]"
                      : "bg-transparent text-[#73726C] hover:bg-[#E8E6DC] hover:text-[#181817]"
                  }`}
                >
                  <TabIcon id={item.id} />
                  <span className="whitespace-nowrap">
                    {item.id === "integration"
                      ? "Integrate"
                      : item.id === "operations"
                        ? "Operate"
                        : item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.75,
            delay: shouldReduceMotion ? 0 : 0.24,
            ease: HOME_EASE,
          }}
          className="mt-7 overflow-hidden rounded-[28px] bg-[#D9D8E5] shadow-[inset_0_0_0_1px_rgba(20,20,19,0.05)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeUseCase.id}
              id={`home-use-case-panel-${activeUseCase.id}`}
              role="tabpanel"
              aria-labelledby={`home-use-case-tab-${activeUseCase.id}`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.42, ease: HOME_EASE }}
            >
              <HomeUseCasePreview useCase={activeUseCase} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
