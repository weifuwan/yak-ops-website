import { motion, useReducedMotion } from 'framer-motion';

import { HOME_EASE } from '../constants';

const STEPS = [
  {
    number: '01',
    title: 'Connect',
    description: 'Bring reusable data sources and metadata into one operating context.',
  },
  {
    number: '02',
    title: 'Move',
    description: 'Run offline sync and realtime CDC without losing visibility across engines.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Develop tasks, compose workflows, and schedule the work that moves data forward.',
  },
  {
    number: '04',
    title: 'Trust',
    description: 'Profile datasets, apply quality rules, and catch issues before they spread.',
  },
  {
    number: '05',
    title: 'Operate',
    description: 'Trace lineage, inspect runtime state, and keep logs, metrics, and audit context visible.',
  },
  {
    number: '06',
    title: 'Serve',
    description: 'Turn trusted datasets into governed APIs and reusable data products.',
  },
] as const;

export default function HomeDataLifecycleSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-t  bg-[#F0EEE6] text-[#181817]">
      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] py-[clamp(7rem,6.142857rem+4.285714vw,10rem)]">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: Boolean(shouldReduceMotion), amount: 0.45 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            ease: HOME_EASE,
          }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(20rem,0.62fr)] lg:items-end lg:gap-20"
        >
          <div>
            <h2 className="m-0 mt-5 max-w-[13ch] text-[clamp(2.75rem,2.178571rem+2.857143vw,4.75rem)] font-medium leading-[1.02] [font-family:'Yak_Serif',Georgia,sans-serif]">
              One platform. Every step.
            </h2>
          </div>

          <p className="m-0 max-w-[36rem] text-[clamp(1.05rem,0.985714rem+0.321429vw,1.275rem)] leading-[1.6] text-[#66645F] [font-family:'Yak_Sans',Arial,sans-serif] lg:justify-self-end">
            From first connection to trusted data service, Yak Ops keeps your data work connected end to end.
          </p>
        </motion.div>

        <div className="relative mt-[clamp(5rem,4.428571rem+2.857143vw,7rem)]">
          <div aria-hidden="true" className="absolute left-0 right-0 top-[15px] hidden h-px bg-[#D0CCC2] lg:block" />

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
                viewport={{ once: Boolean(shouldReduceMotion), amount: 0.35 }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.55,
                  delay: shouldReduceMotion ? 0 : index * 0.055,
                  ease: HOME_EASE,
                }}
                className="relative lg:px-5 xl:px-6"
              >
                <div className="relative z-10 flex h-[30px] items-center lg:block">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-solid border-[#BBB7AD] bg-[#F0EEE6] text-[10px] font-medium tracking-[0.08em] text-[#6C6962] [font-family:'Yak_Sans',Arial,sans-serif]">
                    {step.number}
                  </span>
                </div>

                <h3 className="m-0 mt-7 text-[clamp(1.3rem,1.214286rem+0.428571vw,1.6rem)] font-medium leading-[1.2] [font-family:'Yak_Serif',Georgia,sans-serif]">
                  {step.title}
                </h3>

                <p className="mb-0 mt-3 max-w-[29ch] text-[14px] leading-[1.65] text-[#6C6962] [font-family:'Yak_Sans',Arial,sans-serif]">
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
