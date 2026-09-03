import { motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";

const FEATURES = [
  {
    title: "Build workflows visually",
    description:
      "Connect sources, transformations, and destinations into clear, maintainable data workflows.",
    icon: (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle
          cx="5"
          cy="5"
          r="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle
          cx="15"
          cy="5"
          r="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle
          cx="10"
          cy="15"
          r="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M6.8 6.2L9 12.8M13.2 6.2L11 12.8M7 5H13"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Operate with confidence",
    description:
      "Schedule jobs, monitor executions, inspect logs, and keep every data operation visible.",
    icon: (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M3 16.5H17"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <rect
          x="4"
          y="10"
          width="2.5"
          height="5"
          rx="0.7"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <rect
          x="8.75"
          y="5"
          width="2.5"
          height="10"
          rx="0.7"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <rect
          x="13.5"
          y="7.5"
          width="2.5"
          height="7.5"
          rx="0.7"
          stroke="currentColor"
          strokeWidth="1.1"
        />
      </svg>
    ),
  },
  {
    title: "Turn data into services",
    description:
      "Expose trusted data through APIs with authentication, rate limits, governance, and auditability.",
    icon: (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="4"
          width="14"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M6 8L8 10L6 12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 12H14"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function HomeFeatureList() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col">
      {FEATURES.map((item, index) => (
        <motion.div
          key={item.title}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.65,
            delay: shouldReduceMotion ? 0 : index * 0.12,
            ease: HOME_EASE,
          }}
          className="border-t border-solid border-[#D1CFC5] py-8 first:mt-0"
        >
          <div className="flex gap-3 items-center text-[#181817]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center text-[#5E5D59]">
              {item.icon}
            </div>

            <h3
              className="
                m-0
                text-[clamp(1.125rem,1rem+0.4vw,1.35rem)]
                font-medium
                leading-6
                [font-family:'Yak_Serif',Georgia,sans-serif]
              "
            >
              {item.title}
            </h3>
          </div>

          <p
            className="
              mb-0
              mt-4
              max-w-[31ch]
              text-[15px]
              leading-[1.6]
              text-[#5E5D59]
              [font-family:'Yak_Sans',Arial,sans-serif]
            "
          >
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
