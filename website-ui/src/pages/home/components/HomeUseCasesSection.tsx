import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";
import HomeUseCasesHeader from "./useCases/HomeUseCasesHeader";
import HomeUseCaseStage from "./useCases/HomeUseCaseStage";
import HomeUseCasesTabs from "./useCases/HomeUseCasesTabs";
import { HOME_USE_CASES, type HomeUseCaseId } from "./useCases";

export default function HomeUseCasesSection() {
  const [activeId, setActiveId] = useState<HomeUseCaseId>(HOME_USE_CASES[0].id);
  const shouldReduceMotion = useReducedMotion();
  const activeUseCase =
    HOME_USE_CASES.find((item) => item.id === activeId) ?? HOME_USE_CASES[0];

  return (
    <section className="relative border-t border-solid border-[#F0EEE6] bg-white">
      <div className="h-[clamp(6rem,5.42857rem+2.85714vw,8rem)]" />

      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem]">
        <HomeUseCasesHeader />
      </div>

      <div className="h-[clamp(6rem,5.42857rem+2.85714vw,8rem)]" />

      <div className="mx-auto grid w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] grid-cols-1 gap-y-0 lg:grid-cols-12 lg:gap-x-8">
        <HomeUseCasesTabs
          activeId={activeId}
          useCases={HOME_USE_CASES}
          onChange={setActiveId}
        />

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
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{
                duration: shouldReduceMotion ? 0.15 : 0.38,
                ease: HOME_EASE,
              }}
            >
              <HomeUseCaseStage useCase={activeUseCase} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="h-[clamp(6rem,5.42857rem+2.85714vw,8rem)]" />
    </section>
  );
}
