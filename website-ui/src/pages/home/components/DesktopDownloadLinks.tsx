import { motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";

const DOWNLOAD_OPTIONS = [
  { label: "macOS", delay: 0.48 },
  { label: "Windows", delay: 0.58 },
  { label: "Windows (arm64)", delay: 0.68 },
];

const DOWNLOAD_BUTTON_CLASS = `
  inline-flex
  h-9
  items-center
  justify-center
  rounded-lg
  border
  border-[#D1CFC5]
  bg-[#E5E3DA]
  px-5
  font-medium
  text-[#343330]
  transition-[background-color,border-color,transform]
  duration-200
  hover:-translate-y-px
  hover:border-[#BDBAB0]
  hover:bg-[#DCDAD1]
`;

export default function DesktopDownloadLinks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.7,
        delay: shouldReduceMotion ? 0 : 0.35,
        ease: HOME_EASE,
      }}
      className="
        mt-8
        flex
        flex-col
        items-center
        justify-center
        gap-3
        text-[13px]
        text-[#343330]
        [font-family:'Yak_Sans',Arial,sans-serif]
        sm:flex-row
      "
    >
      <span className="mr-1 whitespace-nowrap">Download the desktop app:</span>

      {DOWNLOAD_OPTIONS.map((option) => (
        <motion.a
          key={option.label}
          target="_blank"
          rel="noreferrer"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: shouldReduceMotion ? 0 : option.delay,
            ease: HOME_EASE,
          }}
          className={DOWNLOAD_BUTTON_CLASS}
        >
          {option.label}
        </motion.a>
      ))}
    </motion.div>
  );
}
