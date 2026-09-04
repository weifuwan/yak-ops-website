import { motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";

export default function HomeClosingSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-[#181817] text-[#F7F5EE]">
      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] py-[clamp(6rem,5.142857rem+4.285714vw,9rem)]">
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            ease: HOME_EASE,
          }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.65fr)] lg:items-end lg:gap-20"
        >
          <div>
            <p className="m-0 text-[12px] font-medium uppercase tracking-[0.18em] text-[#9C9991] [font-family:'Yak_Sans',Arial,sans-serif]">
              Open source data operations
            </p>

            <h2 className="m-0 mt-5 max-w-[12ch] text-[clamp(2.75rem,2.178571rem+2.857143vw,4.75rem)] font-medium leading-[1.02] [font-family:'Yak_Serif',Georgia,sans-serif]">
              Built in the open.
            </h2>
          </div>

          <div className="max-w-[34rem] lg:justify-self-end">
            <p className="m-0 text-[clamp(1rem,0.964286rem+0.178571vw,1.125rem)] leading-[1.65] text-[#B9B6AE] [font-family:'Yak_Sans',Arial,sans-serif]">
              Yak Ops is an open-source platform for connecting, moving, building,
              trusting, and operating data from one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://github.com/weifuwan/yak-ops"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F7F5EE] px-4 py-2.5 text-[14px] font-medium text-[#181817] no-underline transition-opacity duration-200 hover:opacity-85 [font-family:'Yak_Sans',Arial,sans-serif]"
              >
                View on GitHub
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg border  px-4 py-2.5 text-[14px] font-medium text-[#F7F5EE] no-underline transition-colors duration-200 hover:border-[#5A5750] hover:bg-[#232321] [font-family:'Yak_Sans',Arial,sans-serif]"
              >
                Read the docs
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-[clamp(5rem,4.428571rem+2.857143vw,7rem)]  border-[#34332F] pt-6">
          <div className="flex flex-col gap-3 text-[12px] text-[#8F8C85] sm:flex-row sm:items-center sm:justify-between [font-family:'Yak_Sans',Arial,sans-serif]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[15px] font-medium text-[#D8D4CA] [font-family:'Yak_Serif',Georgia,sans-serif]">
                Yak Ops
              </span>

              <span className="text-[#5F5D57]">·</span>

              <span>
                Built by{" "}
                <span className="text-[#B9B6AE]">
                  魏福万
                </span>
              </span>
            </div>

            <span>
              Open source · Self-hosted · Built for data operations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}