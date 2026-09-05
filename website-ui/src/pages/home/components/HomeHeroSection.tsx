import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import DataFlowVisualBasketball from "../DataFlowVisualBasketball";
import DataFlowVisualFootball from "../DataFlowVisualFootball";
import { HOME_EASE } from "../constants";
import { useRotatingHeroVisual } from "../hooks/useRotatingHeroVisual";

export default function HomeHeroSection() {
  const visual = useRotatingHeroVisual();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="
        mx-auto
        grid
        min-h-[calc(100vh-84px)]
        w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)]
        max-w-[90rem]
        grid-cols-1
        items-center
        gap-8
        py-12
        lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]
        lg:gap-6
        lg:py-0
      "
    >
      <div
        data-animate-hero-heading=""
        className="hero_home_heading_wrap text-[#141413]"
      >
        <div
          className="
            mb-3
            flex
            min-w-full
            max-w-[16ch]
            flex-col
            items-start
            justify-center
            text-left
            [font-family:'Yak_Serif',Georgia,sans-serif]
          "
        >
          <h1 className="mb-0 leading-[62px]">
            <span className="text-[clamp(2.25rem,1.75rem+2.5vw,4rem)]">
              Run&nbsp;
            </span>
            <span className="text-[clamp(2.25rem,1.75rem+2.5vw,4rem)]">
              your
            </span>
            <br />
            <span className="text-[clamp(2.25rem,1.75rem+2.5vw,4rem)]">
              data&nbsp;
            </span>
            <span className="text-[clamp(2.25rem,1.75rem+2.5vw,4rem)]">
              operations
            </span>
          </h1>
        </div>

        <div
          className="
            min-w-full
            max-w-[24ch]
            text-left
            text-[clamp(1.1875rem,1.169643rem+0.089286vw,1.25rem)]
            leading-[1.6]
            tracking-normal
            text-[#5e5d59]
            [font-family:'Yak_Sans',Arial,sans-serif]
          "
        >
          <p>Build, move, govern, and operate data with confidence.</p>
        </div>
      </div>

      <div className="flex min-h-[420px] items-center justify-center pb-4 lg:min-h-0 lg:pb-0">
        <div className="relative flex w-full items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={visual}
              className="flex w-full items-center justify-center"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 12,
                      scale: 0.985,
                    }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -8,
                      scale: 0.99,
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.65,
                ease: HOME_EASE,
              }}
            >
              {visual === "basketball" ? (
                <DataFlowVisualBasketball />
              ) : (
                <DataFlowVisualFootball />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
