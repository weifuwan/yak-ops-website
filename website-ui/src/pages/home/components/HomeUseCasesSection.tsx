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
    prompt:
      "Create a daily revenue workflow. Read orders from PostgreSQL at 02:00, transform revenue metrics, load the warehouse, and retry failed transforms twice.",
    stageColor: "#CBCADB",
  },
  {
    id: "integration",
    prompt:
      "Sync MySQL orders, Kafka customer events, and S3 exports into a Customer 360 dataset. Keep CDC enabled and show source health and sync lag.",
    stageColor: "#D97757",
  },
  {
    id: "quality",
    prompt:
      "Check today's orders dataset for duplicate order IDs, missing amounts, row-count drift, and invalid currencies. Show the overall quality score and anything that needs review.",
    stageColor: "#BCD1CA",
  },
  {
    id: "services",
    prompt:
      "Publish the customer profile dataset as GET /api/v1/customers/:id. Require an API key, limit traffic to 600 requests per minute, and enable audit logging.",
    stageColor: "#EBC9B7",
  },
  {
    id: "operations",
    prompt:
      "Summarize workflow activity from the last hour. Show running jobs, failed jobs, durations, and the metrics I need to investigate first.",
    stageColor: "#C46686",
  },
];

function SectionPictogram() {
  return (
    <svg viewBox="0 0 96 96" fill="none" className="h-full w-full" aria-hidden="true">
      <path
        d="M33 69V41.5C33 37.9 35.9 35 39.5 35S46 37.9 46 41.5V52"
        stroke="#141413"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M46 51V31.5C46 27.9 48.9 25 52.5 25S59 27.9 59 31.5V50"
        stroke="#141413"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M59 49V34.5C59 30.9 61.9 28 65.5 28S72 30.9 72 34.5V53"
        stroke="#141413"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M72 50V42.5C72 38.9 74.9 36 78.5 36S85 38.9 85 42.5V58C85 72.9 74.9 82 60 82H47C39.3 82 33 75.7 33 68Z"
        stroke="#141413"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 57L26.8 51.7C23.8 49.1 19.3 49.4 16.7 52.4C14.1 55.4 14.4 59.9 17.4 62.5L35.5 78"
        stroke="#141413"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M79 18L81.2 23.8L87 26L81.2 28.2L79 34L76.8 28.2L71 26L76.8 23.8L79 18Z"
        fill="#C96442"
      />
      <path
        d="M89 34L90.4 37.6L94 39L90.4 40.4L89 44L87.6 40.4L84 39L87.6 37.6L89 34Z"
        fill="#141413"
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
          <path d="M4 4.5H7M4 10H7M4 15.5H7M9 4.5H17M9 10H17M9 15.5H17" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M2.5 4.5L3.2 5.2L4.7 3.7M2.5 10L3.2 10.7L4.7 9.2M2.5 15.5L3.2 16.2L4.7 14.7" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "integration":
      return (
        <svg {...commonProps}>
          <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.1" />
          <path d="M3.9 7.7H16.1M3.9 12.3H16.1M10 3.5C11.8 5.4 12.7 7.6 12.7 10C12.7 12.4 11.8 14.6 10 16.5M10 3.5C8.2 5.4 7.3 7.6 7.3 10C7.3 12.4 8.2 14.6 10 16.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "quality":
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="14" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.1" />
          <path d="M6 10.2L8.7 12.8L14.4 7.1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "services":
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.1" />
          <path d="M6 8L8 10L6 12M11 12H14" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "operations":
      return (
        <svg {...commonProps}>
          <path d="M3 16.5H17" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <rect x="4" y="10" width="2.5" height="5" rx="0.7" stroke="currentColor" strokeWidth="1" />
          <rect x="8.75" y="5" width="2.5" height="10" rx="0.7" stroke="currentColor" strokeWidth="1" />
          <rect x="13.5" y="7.5" width="2.5" height="7.5" rx="0.7" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    default:
      return null;
  }
}

const TAB_LABELS: Record<HomeUseCaseId, string> = {
  workflows: "Workflows",
  integration: "Integrate",
  quality: "Quality",
  services: "Services",
  operations: "Operate",
};

export default function HomeUseCasesSection() {
  const [activeId, setActiveId] = useState<HomeUseCaseId>(USE_CASES[0].id);
  const shouldReduceMotion = useReducedMotion();
  const activeUseCase =
    USE_CASES.find((item) => item.id === activeId) ?? USE_CASES[0];

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction =
      event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const nextIndex =
      (currentIndex + direction + USE_CASES.length) % USE_CASES.length;
    const nextUseCase = USE_CASES[nextIndex];

    setActiveId(nextUseCase.id);
    window.requestAnimationFrame(() => {
      document
        .getElementById(`home-use-case-tab-${nextUseCase.id}`)
        ?.focus();
    });
  };

  return (
    <section className="relative border-t border-solid border-[#F0EEE6] bg-white">
      <div className="h-[clamp(6rem,5.42857rem+2.85714vw,8rem)]" />

      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem]">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            ease: HOME_EASE,
          }}
          className="flex flex-col items-center text-center"
        >
          <div className="h-[clamp(4rem,3.42857rem+2.85714vw,6rem)] w-[clamp(4rem,3.42857rem+2.85714vw,6rem)]">
            <SectionPictogram />
          </div>

          <h2 className="mt-8 max-w-[30ch] text-[clamp(2.125rem,1.80357rem+1.60714vw,3.25rem)] font-medium leading-[1.2] tracking-normal text-[#141413] [font-family:'Yak_Serif',Georgia,sans-serif]">
            How you can use Yak Ops
          </h2>
        </motion.div>
      </div>

      <div className="h-[clamp(6rem,5.42857rem+2.85714vw,8rem)]" />

      <div className="mx-auto grid w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] grid-cols-1 gap-y-0 lg:grid-cols-12 lg:gap-x-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.6,
            ease: HOME_EASE,
          }}
          className="overflow-x-auto pb-2 lg:col-start-2 lg:col-end-12"
        >
          <div
            role="tablist"
            aria-label="Yak Ops use cases"
            className="flex w-max items-center rounded-2xl bg-[#F5F4ED] p-1"
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
                  className={`flex h-10 shrink-0 appearance-none items-center justify-center gap-2 rounded-xl border-0 py-2 pl-3 pr-4 text-[12px] font-normal transition-[background-color,color] duration-200 [font-family:'Yak_Sans',Arial,sans-serif] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96442] ${
                    active
                      ? "bg-white text-[#141413]"
                      : "bg-transparent text-[#5E5D59] hover:bg-white hover:text-[#141413]"
                  }`}
                >
                  <TabIcon id={item.id} />
                  <span className="whitespace-nowrap">{TAB_LABELS[item.id]}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            delay: shouldReduceMotion ? 0 : 0.08,
            ease: HOME_EASE,
          }}
          style={{ backgroundColor: activeUseCase.stageColor }}
          className="mt-4 overflow-hidden rounded-[clamp(1rem,0.714286rem+1.42857vw,2rem)] transition-colors duration-500 lg:col-start-2 lg:col-end-12"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeUseCase.id}
              id={`home-use-case-panel-${activeUseCase.id}`}
              role="tabpanel"
              aria-labelledby={`home-use-case-tab-${activeUseCase.id}`}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.15 : 0.38,
                ease: HOME_EASE,
              }}
            >
              <HomeUseCasePreview useCase={activeUseCase} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="h-[clamp(6rem,5.42857rem+2.85714vw,8rem)]" />
    </section>
  );
}
