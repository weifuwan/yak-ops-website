import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";

type IntegrationLogo = {
  name: string;
  image: string;
};

const VISIBLE_SLOT_COUNT = 9;
const ROTATION_INTERVAL = 1500;

const INTEGRATION_LOGOS: IntegrationLogo[] = [
  { name: "MySQL", image: "/images/integrations/MySQL.png" },
  { name: "Oracle", image: "/images/integrations/Oracle.png" },
  { name: "Doris", image: "/images/integrations/doris.png" },
  { name: "HDFS", image: "/images/integrations/HDFS.png" },
  { name: "Flink CDC", image: "/images/integrations/flink-cdc.png" },
  { name: "Spark", image: "/images/integrations/spark_logo.png" },
  { name: "Java", image: "/images/integrations/java.png" },
  { name: "Python", image: "/images/integrations/Python.png" },
  { name: "DingTalk", image: "/images/integrations/dingtalk.png" },
  { name: "KingBase", image: "/images/integrations/KingBase.png" },
  { name: "Dameng", image: "/images/integrations/dameng.png" },
];

function LogoSlot({
  logo,
  shouldReduceMotion,
}: {
  logo: IntegrationLogo;
  shouldReduceMotion: boolean;
}) {
  return (
    <div
      className="relative h-[84px] overflow-hidden sm:h-[92px] lg:h-[104px]"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
      }}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={logo.image}
          className="absolute inset-0 flex items-center justify-center px-2 sm:px-4"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 16,
                }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: -16,
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.15 : 0.42,
            ease: HOME_EASE,
          }}
        >
          <img
            src={logo.image}
            alt={logo.name}
            className="max-h-[54px] w-full max-w-[170px] object-contain sm:max-h-[60px] lg:max-h-[66px] lg:max-w-[190px]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function HomeDataStackSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [visibleLogos, setVisibleLogos] = useState<IntegrationLogo[]>(() =>
    INTEGRATION_LOGOS.slice(0, VISIBLE_SLOT_COUNT),
  );
  const nextSlotRef = useRef(0);
  const nextLogoRef = useRef(VISIBLE_SLOT_COUNT);

  useEffect(() => {
    if (shouldReduceMotion || INTEGRATION_LOGOS.length <= VISIBLE_SLOT_COUNT) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      const slotIndex = nextSlotRef.current;
      const nextLogo = INTEGRATION_LOGOS[nextLogoRef.current];

      setVisibleLogos((current) =>
        current.map((logo, index) => (index === slotIndex ? nextLogo : logo)),
      );

      nextSlotRef.current = (slotIndex + 1) % VISIBLE_SLOT_COUNT;
      nextLogoRef.current = (nextLogoRef.current + 1) % INTEGRATION_LOGOS.length;
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section className="relative border-t bg-[#FFFFFF]">
      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem]
       py-[clamp(7rem,6.142857rem+4.285714vw,10rem)]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.72fr)] 
        lg:gap-[clamp(4rem,2.857143rem+5.714286vw,8rem)]">
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.72,
              ease: HOME_EASE,
            }}
            className="rounded-[clamp(1.5rem,1.071429rem+2.142857vw,3rem)] bg-[#FAF9F5] px-[clamp(1rem,0.571429rem+2.142857vw,3rem)] py-[clamp(2rem,1.571429rem+2.142857vw,3.5rem)]"
          >
            <div
              className="grid grid-cols-3 gap-x-[clamp(0.5rem,0.214286rem+1.428571vw,1.5rem)] gap-y-[clamp(0.8rem,0.571429rem+1.142857vw,1.6rem)]"
              aria-label="Yak Ops data stack integrations"
            >
              {visibleLogos.map((logo, index) => (
                <LogoSlot
                  key={`integration-slot-${index}`}
                  logo={logo}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    x: 18,
                  }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.72,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: HOME_EASE,
            }}
            className="max-w-[31rem] lg:max-w-none"
          >
            <h2 className="m-0 text-[clamp(2.25rem,1.946429rem+1.517857vw,3.3125rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[#181817] [font-family:'Yak_Serif',Georgia,sans-serif]">
              Built to fit your stack
            </h2>

            <p className="mb-0 mt-6 text-[clamp(1rem,0.964286rem+0.178571vw,1.125rem)] leading-[1.62] text-[#66645F] [font-family:'Yak_Sans',Arial,sans-serif]">
              Connect the tools already running your data. Yak Ops gives them one place to work together.
            </p>

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
