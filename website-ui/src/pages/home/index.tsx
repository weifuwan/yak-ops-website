"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import DataFlowVisualBasketball from "./DataFlowVisualBasketball";
import DataFlowVisualFootball from "./DataFlowVisualFootball";

const SWITCH_INTERVAL = 7000;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type VisualType = "basketball" | "football";

export default function HomePage() {
  const [visual, setVisual] = useState<VisualType>("basketball");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisual((current) =>
        current === "basketball" ? "football" : "basketball",
      );
    }, SWITCH_INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="min-h-[calc(100vh-84px)] overflow-hidden bg-[#faf9f5] text-[#181817] [font-family:var(--yak-font-marketing)]">
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
        {/* Hero Content */}
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

        {/* Visual */}
        <div className="flex min-h-[420px] items-center justify-center pb-4 lg:min-h-0 lg:pb-0">
          <div className="relative flex w-full items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
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
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
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
                  ease: EASE,
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

      <section style={{ background: "#F0EEE6" }}>
        <div
          style={{
            background: "#D1CFC5",
            height: 1,
          }}
        />

        <div style={{ width: "100%", height: 128 }} />
      </section>
    </main>
  );
}