import { motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../../constants";

function SectionPictogram() {
  return (
    <svg viewBox="0 0 96 96" fill="none" className="h-full w-full" aria-hidden="true">
      <path d="M33 69V41.5C33 37.9 35.9 35 39.5 35S46 37.9 46 41.5V52" stroke="#141413" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M46 51V31.5C46 27.9 48.9 25 52.5 25S59 27.9 59 31.5V50" stroke="#141413" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M59 49V34.5C59 30.9 61.9 28 65.5 28S72 30.9 72 34.5V53" stroke="#141413" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M72 50V42.5C72 38.9 74.9 36 78.5 36S85 38.9 85 42.5V58C85 72.9 74.9 82 60 82H47C39.3 82 33 75.7 33 68Z" stroke="#141413" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33 57L26.8 51.7C23.8 49.1 19.3 49.4 16.7 52.4C14.1 55.4 14.4 59.9 17.4 62.5L35.5 78" stroke="#141413" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M79 18L81.2 23.8L87 26L81.2 28.2L79 34L76.8 28.2L71 26L76.8 23.8L79 18Z" fill="#C96442" />
      <path d="M89 34L90.4 37.6L94 39L90.4 40.4L89 44L87.6 40.4L84 39L87.6 37.6L89 34Z" fill="#141413" />
    </svg>
  );
}

export default function HomeUseCasesHeader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: HOME_EASE }}
      className="flex flex-col items-center text-center"
    >
      <div className="h-[clamp(4rem,3.42857rem+2.85714vw,6rem)] w-[clamp(4rem,3.42857rem+2.85714vw,6rem)]">
        <SectionPictogram />
      </div>

      <h2 className="mt-8 max-w-[30ch] text-[clamp(2.125rem,1.80357rem+1.60714vw,3.25rem)] font-medium leading-[1.2] tracking-normal text-[#141413] [font-family:'Yak_Serif',Georgia,sans-serif]">
        How you can use Yak Ops
      </h2>
    </motion.div>
  );
}
