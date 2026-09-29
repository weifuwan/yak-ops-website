import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { HOME_EASE } from '../constants';

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: 'Build workflows visually',
    description: 'Connect sources, transformations, and destinations into clear, maintainable data workflows.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <circle cx="6" cy="6" r="2.25" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="18" cy="6" r="2.25" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="18" r="2.25" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M8.1 7.2L10.8 15.7M15.9 7.2L13.2 15.7M8.5 6H15.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Move data reliably',
    description: 'Run batch and real-time syncs across systems with reusable connectors, transforms, and validation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <rect x="3.5" y="5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="15" y="13.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M9 7.75H15.5C17.2 7.75 18.5 9.1 18.5 10.75V13.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M15.7 11.2L18.5 14L21.3 11.2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Keep data trustworthy',
    description:
      'Profile datasets, define quality rules, surface anomalies, and keep checks visible before bad data spreads.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M5 6H19M5 12H19M5 18H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M3 6L3.8 6.8L5.3 5.3M3 12L3.8 12.8L5.3 11.3M17 18L18.7 19.7L22 16.4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Trace every dependency',
    description: 'Follow lineage across jobs and datasets so teams can understand impact before making a change.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <rect x="3" y="4" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="15" y="15" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="15" y="4" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M9 6.5H15M6 9V13C6 15.5 8 17.5 10.5 17.5H15"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Turn data into services',
    description: 'Expose trusted data through APIs with authentication, rate limits, governance, and auditability.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M7 9L10 12L7 15M13.5 15H17"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Operate with confidence',
    description: 'Schedule jobs, monitor executions, inspect logs and metrics, and keep every data operation visible.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M3 20H21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="4.5" y="12.5" width="3.5" height="6" rx="0.9" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10.25" y="5" width="3.5" height="13.5" rx="0.9" stroke="currentColor" strokeWidth="1.4" />
        <rect x="16" y="8.5" width="3.5" height="10" rx="0.9" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];

export default function HomeFeatureList() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
      {FEATURES.map((item, index) => {
        const showTabletDivider = index % 2 === 1;
        const showDesktopDivider = index % 3 !== 0;

        return (
          <motion.article
            key={item.title}
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
              once: Boolean(shouldReduceMotion),
              amount: 0.3,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.6,
              delay: shouldReduceMotion ? 0 : (index % 3) * 0.08,
              ease: HOME_EASE,
            }}
            className="
              relative
              min-h-[214px]
              border-0
              px-8
              py-3
              sm:px-9
              lg:px-10
              xl:px-12
            "
          >
            {/* Tablet: 2 columns */}
            {showTabletDivider && (
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  hidden
                  w-px
                  bg-[#D1CFC5]
                  sm:block
                  lg:hidden
                "
              />
            )}

            {/* Desktop: 3 columns */}
            {showDesktopDivider && (
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  hidden
                  w-px
                  bg-[#D1CFC5]
                  lg:block
                "
              />
            )}

            <div className="text-[#6A6964]">{item.icon}</div>

            <h3
              className="
                m-0
                mt-10
                text-[clamp(1.2rem,1.08rem+0.35vw,1.45rem)]
                font-medium
                leading-[1.2]
                text-[#181817]
                [font-family:'Yak_Serif',Georgia,sans-serif]
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mb-0
                mt-3
                max-w-[36ch]
                text-[15px]
                leading-[1.62]
                text-[#66645F]
                [font-family:'Yak_Sans',Arial,sans-serif]
              "
            >
              {item.description}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}
