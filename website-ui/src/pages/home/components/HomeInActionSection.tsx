import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";

const STEP_DURATION = 1800;

const DEMO_STEPS = [
  {
    label: "Connect",
    product: "MySQL",
    title: "Source connected",
    description: "Reuse a tested datasource and bring metadata into one operating context.",
  },
  {
    label: "Move",
    product: "Link-Up",
    title: "Sync is running",
    description: "Move orders into Doris while execution state stays visible from the same workspace.",
  },
  {
    label: "Build",
    product: "Workflow",
    title: "Workflow released",
    description: "Compose downstream work, release it, and keep scheduling connected to the data flow.",
  },
  {
    label: "Trust",
    product: "Quality",
    title: "Quality checks passed",
    description: "Validate the dataset before bad data can spread into downstream consumers.",
  },
  {
    label: "Serve",
    product: "API",
    title: "Data is ready to use",
    description: "Publish trusted data for APIs, datasets, and the teams that depend on it.",
  },
] as const;

function ActionIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" aria-hidden="true">
      <rect x="8" y="9" width="25" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 17H27M14 23H25M14 29H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="31.5" cy="30.5" r="7.5" fill="#FAF9F5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M37 36L42 41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={compact ? "h-4 w-4" : "h-7 w-7"} aria-hidden="true">
      <path d="M8.5 6.75V17.25L17 12L8.5 6.75Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M9 7V17M15 7V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ReplayIcon({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={compact ? "h-4 w-4" : "h-7 w-7"} aria-hidden="true">
      <path d="M7.2 8.2H3.8V4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.2 8.2C5.7 5.8 8.4 4.2 11.5 4.2C15.9 4.2 19.5 7.7 19.5 12C19.5 16.3 15.9 19.8 11.5 19.8C8.2 19.8 5.4 17.9 4.1 15.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function StepIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="6.5" ry="2.75" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 6V12C5.5 13.5 8.4 14.75 12 14.75C15.6 14.75 18.5 13.5 18.5 12V6M5.5 12V18C5.5 19.5 8.4 20.75 12 20.75C15.6 20.75 18.5 19.5 18.5 18V12" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M4 8H16M13 5L16 8L13 11M20 16H8M11 13L8 16L11 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 6H16M7.2 7.7L10.9 16.2M16.8 7.7L13.1 16.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M5 7H19M5 12H19M5 17H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M15.5 17L17.2 18.7L21 14.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 10L10 12L8 14M13 14H16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomeInActionSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const lastStepIndex = DEMO_STEPS.length - 1;
  const currentStep = DEMO_STEPS[activeStep];
  const isComplete = activeStep === lastStepIndex && !isPlaying;
  const progress = (activeStep / lastStepIndex) * 100;

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (activeStep >= lastStepIndex) {
        setIsPlaying(false);
        return;
      }
      setActiveStep((current) => current + 1);
    }, STEP_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeStep, isPlaying, lastStepIndex]);

  const startPlayback = () => {
    if (activeStep === lastStepIndex) {
      setActiveStep(0);
    }
    setIsPlaying(true);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    startPlayback();
  };

  return (
    <section className="relative border-t border-solid border-[#E3E0D7] bg-[#FAF9F5] text-[#181817]">
      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] py-[clamp(7rem,6.142857rem+4.285714vw,10rem)]">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: Boolean(shouldReduceMotion), amount: 0.45 }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: HOME_EASE }}
          className="flex flex-col items-center text-center"
        >
          <div className="text-[#262522]">
            <ActionIcon />
          </div>

          <h2 className="m-0 mt-8 text-[clamp(2.75rem,2.178571rem+2.857143vw,4.75rem)] font-medium leading-[1.02] text-[#181817] [font-family:'Yak_Serif',Georgia,sans-serif]">
            See Yak Ops in action
          </h2>

          <p className="mb-0 mt-6 max-w-[46rem] text-[clamp(1.05rem,0.985714rem+0.321429vw,1.275rem)] leading-[1.6] text-[#66645F] [font-family:'Yak_Sans',Arial,sans-serif]">
            Follow one data flow from source connection to a trusted, ready-to-serve data product without jumping between tools.
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: Boolean(shouldReduceMotion), amount: 0.15 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.8,
            delay: shouldReduceMotion ? 0 : 0.08,
            ease: HOME_EASE,
          }}
          className="relative mt-[clamp(4.5rem,4.071429rem+2.142857vw,6rem)] overflow-hidden rounded-[clamp(1.5rem,1.071429rem+2.142857vw,3rem)] border border-solid border-[#CFC8BA] bg-[#DED8CB] p-[clamp(0.75rem,0.5rem+1.25vw,1.625rem)]"
        >
          <div className="relative min-h-[640px] overflow-hidden rounded-[clamp(1rem,0.857143rem+0.714286vw,1.5rem)] border border-solid border-[#D4D0C7] bg-[#F8F7F3] sm:min-h-[560px] lg:aspect-[16/9] lg:min-h-0">
            <div className="flex h-14 items-center justify-between border-b border-solid border-[#E3E0D8] bg-[#FCFBF8] px-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#181817] text-[10px] font-semibold text-[#F8F7F3] [font-family:'Yak_Sans',Arial,sans-serif]">
                  Y
                </div>
                <div className="text-left [font-family:'Yak_Sans',Arial,sans-serif]">
                  <p className="m-0 text-[13px] font-medium text-[#302F2C]">Customer orders pipeline</p>
                  <p className="m-0 mt-0.5 text-[11px] text-[#8A877F]">Production · Project space</p>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-solid border-[#DDD9CF] bg-white px-3 py-1.5 text-[11px] font-medium text-[#5F5C55] sm:flex [font-family:'Yak_Sans',Arial,sans-serif]">
                <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? "bg-[#C96442]" : "bg-[#9B978E]"}`} />
                {isPlaying ? "Running walkthrough" : isComplete ? "Walkthrough complete" : "Ready to play"}
              </div>
            </div>

            <div className="grid min-h-[calc(100%-3.5rem)] grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div className="relative overflow-hidden px-[clamp(1rem,0.571429rem+2.142857vw,2.75rem)] pb-24 pt-[clamp(1.5rem,1.142857rem+1.785714vw,2.75rem)] sm:pb-20">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="m-0 text-[11px] font-medium uppercase tracking-[0.14em] text-[#9A968D] [font-family:'Yak_Sans',Arial,sans-serif]">
                      Live workflow
                    </p>
                    <h3 className="m-0 mt-2 text-[clamp(1.45rem,1.307143rem+0.714286vw,1.95rem)] font-medium leading-[1.15] text-[#242320] [font-family:'Yak_Serif',Georgia,sans-serif]">
                      Orders to trusted service
                    </h3>
                  </div>

                  <div className="rounded-lg border border-solid border-[#E0DDD4] bg-white px-3 py-2 text-right [font-family:'Yak_Sans',Arial,sans-serif]">
                    <p className="m-0 text-[10px] uppercase tracking-[0.12em] text-[#9A968D]">Run</p>
                    <p className="m-0 mt-1 text-[12px] font-medium text-[#4A4842]">#0241</p>
                  </div>
                </div>

                <div className="relative mt-[clamp(2.75rem,2.178571rem+2.857143vw,4.75rem)]">
                  <div className="absolute bottom-[22px] left-[22px] top-[22px] w-px bg-[#D8D4CA] sm:hidden" />
                  <motion.div
                    aria-hidden="true"
                    className="absolute bottom-[22px] left-[22px] top-[22px] w-px origin-top bg-[#C96442] sm:hidden"
                    animate={{ scaleY: progress / 100 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: HOME_EASE }}
                  />

                  <div className="absolute left-[10%] right-[10%] top-[23px] hidden h-px bg-[#D8D4CA] sm:block" />
                  <motion.div
                    aria-hidden="true"
                    className="absolute left-[10%] top-[23px] hidden h-px w-[80%] origin-left bg-[#C96442] sm:block"
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: HOME_EASE }}
                  />

                  <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-2">
                    {DEMO_STEPS.map((step, index) => {
                      const active = index === activeStep;
                      const complete = index < activeStep;

                      return (
                        <div key={step.label} className="relative flex items-start gap-4 sm:block sm:text-center">
                          <motion.div
                            animate={{ scale: shouldReduceMotion ? 1 : active ? 1.06 : 1 }}
                            transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: HOME_EASE }}
                            className={`relative z-10 flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border transition-colors duration-300 sm:mx-auto ${
                              active
                                ? "border-[#C96442] bg-[#FFF8F4] text-[#C96442]"
                                : complete
                                  ? "border-[#BBB6AA] bg-[#E8E4DA] text-[#4D4B45]"
                                  : "border-[#D8D4CA] bg-[#F8F7F3] text-[#77736B]"
                            }`}
                          >
                            <StepIcon index={index} />
                          </motion.div>

                          <div className="min-w-0 pt-1 sm:pt-0">
                            <p
                              className={`m-0 text-[10px] font-medium uppercase tracking-[0.13em] transition-colors duration-300 sm:mt-4 [font-family:'Yak_Sans',Arial,sans-serif] ${
                                active ? "text-[#C96442]" : "text-[#969188]"
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="m-0 mt-1 text-[12px] font-medium leading-[1.35] text-[#4A4842] sm:px-1 [font-family:'Yak_Sans',Arial,sans-serif]">
                              {step.product}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <motion.div
                  key={currentStep.title}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease: HOME_EASE }}
                  className="mt-[clamp(2.75rem,2.321429rem+2.142857vw,4.25rem)] rounded-2xl border border-solid border-[#DDD9CF] bg-white p-[clamp(1rem,0.785714rem+1.071429vw,1.75rem)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="m-0 text-[10px] font-medium uppercase tracking-[0.14em] text-[#C96442] [font-family:'Yak_Sans',Arial,sans-serif]">
                        {currentStep.label}
                      </p>
                      <p className="m-0 mt-2 text-[clamp(1.15rem,1.078571rem+0.357143vw,1.4rem)] font-medium text-[#252421] [font-family:'Yak_Serif',Georgia,sans-serif]">
                        {currentStep.title}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#F2EFE7] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#68655E] [font-family:'Yak_Sans',Arial,sans-serif]">
                      Step {activeStep + 1}/5
                    </span>
                  </div>
                  <p className="mb-0 mt-3 max-w-[44rem] text-[12px] leading-[1.65] text-[#77746D] [font-family:'Yak_Sans',Arial,sans-serif]">
                    {currentStep.description}
                  </p>
                </motion.div>
              </div>

              <aside className="hidden border-l border-solid border-[#E3E0D8] bg-[#FBFAF7] p-5 xl:block">
                <p className="m-0 text-[10px] font-medium uppercase tracking-[0.14em] text-[#9A968D] [font-family:'Yak_Sans',Arial,sans-serif]">
                  Run details
                </p>

                <div className="mt-6 rounded-xl border border-solid border-[#E0DDD4] bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[12px] font-medium text-[#4A4842] [font-family:'Yak_Sans',Arial,sans-serif]">Status</span>
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#6A665F] [font-family:'Yak_Sans',Arial,sans-serif]">
                      <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? "bg-[#C96442]" : isComplete ? "bg-[#6F8A72]" : "bg-[#9B978E]"}`} />
                      {isPlaying ? "Running" : isComplete ? "Success" : "Ready"}
                    </span>
                  </div>

                  <div className="mt-5 space-y-4 border-t border-solid border-[#EEEAE1] pt-4 text-[11px] [font-family:'Yak_Sans',Arial,sans-serif]">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#99958C]">Source</span>
                      <span className="font-medium text-[#5B5851]">MySQL</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#99958C]">Destination</span>
                      <span className="font-medium text-[#5B5851]">Doris</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#99958C]">Quality</span>
                      <span className="font-medium text-[#5B5851]">12 checks</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#99958C]">Errors</span>
                      <span className="font-medium text-[#5B5851]">0</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-solid border-[#E0DDD4] bg-[#F4F1E9] p-4 [font-family:'Yak_Sans',Arial,sans-serif]">
                  <p className="m-0 text-[10px] font-medium uppercase tracking-[0.12em] text-[#9A968D]">Current event</p>
                  <p className="m-0 mt-3 text-[12px] font-medium leading-[1.45] text-[#514E47]">{currentStep.title}</p>
                  <p className="mb-0 mt-2 text-[11px] leading-[1.55] text-[#858178]">Everything stays in one visible operating context.</p>
                </div>
              </aside>
            </div>

            {!isPlaying && (
              <button
                type="button"
                onClick={startPlayback}
                aria-label={isComplete ? "Replay Yak Ops walkthrough" : "Play Yak Ops walkthrough"}
                className="group absolute left-1/2 top-1/2 flex h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[22px] border border-solid border-[#D4D0C7] bg-[#FAF9F5]/95 text-[#5F5C55] shadow-[0_10px_35px_rgba(32,31,28,0.10)] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#BDB8AD] hover:bg-white hover:text-[#181817]"
              >
                {isComplete ? <ReplayIcon /> : <PlayIcon />}
              </button>
            )}

            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-xl border border-solid border-[#D9D5CC] bg-[#FCFBF8]/95 px-3 py-2.5 shadow-[0_8px_24px_rgba(32,31,28,0.06)] backdrop-blur-sm sm:bottom-4 sm:left-4 sm:right-4 sm:px-4">
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={isPlaying ? "Pause Yak Ops walkthrough" : isComplete ? "Replay Yak Ops walkthrough" : "Play Yak Ops walkthrough"}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-solid border-[#D7D3CA] bg-white text-[#5E5B54] transition-colors duration-200 hover:border-[#BEB9AE] hover:text-[#181817]"
              >
                {isPlaying ? <PauseIcon /> : isComplete ? <ReplayIcon compact /> : <PlayIcon compact />}
              </button>

              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E2DED5]">
                <motion.div
                  className="h-full rounded-full bg-[#C96442]"
                  animate={{ width: `${Math.max(progress, isPlaying && activeStep === 0 ? 4 : progress)}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: HOME_EASE }}
                />
              </div>

              <span className="hidden min-w-[74px] text-right text-[10px] font-medium uppercase tracking-[0.1em] text-[#87837B] sm:block [font-family:'Yak_Sans',Arial,sans-serif]">
                {currentStep.label}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
