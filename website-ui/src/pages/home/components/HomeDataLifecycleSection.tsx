import { motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";

const STEPS = [
  {
    number: "01",
    title: "Connect",
    description: "Bring reusable data sources and metadata into one operating context.",
  },
  {
    number: "02",
    title: "Move",
    description: "Run offline sync and realtime CDC without losing visibility across engines.",
  },
  {
    number: "03",
    title: "Build",
    description: "Develop tasks, compose workflows, and schedule the work that moves data forward.",
  },
  {
    number: "04",
    title: "Trust",
    description: "Profile datasets, apply quality rules, and catch issues before they spread.",
  },
  {
    number: "05",
    title: "Operate",
    description: "Trace lineage, inspect runtime state, and keep logs, metrics, and audit context visible.",
  },
  {
    number: "06",
    title: "Serve",
    description: "Turn trusted datasets into governed APIs and reusable data products.",
  },
] as const;

export default function HomeDataLifecycleSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-t border-solid border-[#2B2A27] bg-[#181817] text-[#F7F5EE]">
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
          <p className="m-0 text-[13px] font-medium uppercase tracking-[0.18em] text-[#A9A69E] [font-family:'Yak_Sans',Arial,sans-serif]">
            The data lifecycle
          </p>

          <h2 className="m-0 mt-5 text-[clamp(2.5rem,2.035714rem+2.321429vw,4.125rem)] font-medium leading-[1.04] tracking-[-0.025em] [font-family:'Yak_Serif',Georgia,sans-serif]">
            One platform. Every step.
          </h2>

          <p className="mb-0 mt-5 max-w-[42rem] text-[clamp(1.05rem,0.985714rem+0.321429vw,1.275rem)] leading-[1.55] text-[#B9B6AE] [font-family:'Yak_Sans',Arial,sans-serif]">
            From the first connection to a trusted data service, Yak Ops keeps the operating context together.
          </p>
        </motion.div>

        <div className="relative mt-[clamp(5rem,4.428571rem+2.857143vw,7rem)]">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[15px] hidden h-px bg-[#3A3935] lg:block"
          />

          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-6 lg:gap-x-0 lg:gap-y-0">
            {STEPS.map((step, index) => (
              <motion.article
                key={step.title}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: 16,
                      }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.55,
                  delay: shouldReduceMotion ? 0 : index * 0.055,
                  ease: HOME_EASE,
                }}
                className="relative lg:px-5 xl:px-6"
              >
                <div className="relative z-10 flex h-[30px] items-center lg:block">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-solid border-[#514F49] bg-[#181817] text-[10px] font-medium tracking-[0.08em] text-[#D6D2C8] [font-family:'Yak_Sans',Arial,sans-serif]">
                    {step.number}
                  </span>
                </div>

                <h3 className="m-0 mt-7 text-[clamp(1.3rem,1.214286rem+0.428571vw,1.6rem)] font-medium leading-[1.2] [font-family:'Yak_Serif',Georgia,sans-serif]">
                  {step.title}
                </h3>

                <p className="mb-0 mt-3 max-w-[29ch] text-[14px] leading-[1.65] text-[#AAA79F] [font-family:'Yak_Sans',Arial,sans-serif]">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
