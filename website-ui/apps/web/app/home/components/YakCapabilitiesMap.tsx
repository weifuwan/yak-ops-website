import brandLogo from '@/assets/img/logo2.png';
import { motion, useReducedMotion } from 'framer-motion';

import { HOME_EASE } from '../constants';

const CENTER = {
  x: 460,
  y: 370,
};

const GROUPS = [
  {
    title: 'Workflow orchestration',
    x: 210,
    y: 215,
    nodes: [
      { label: 'Scheduling', x: 122, y: 80 },
      { label: 'DAGs', x: 52, y: 195 },
      { label: 'Dependencies', x: 175, y: 335 },
      { label: 'Retries', x: 345, y: 130 },
      { label: 'Parameters', x: 330, y: 265 },
    ],
  },
  {
    title: 'Data integration',
    x: 660,
    y: 175,
    nodes: [
      { label: 'Connectors', x: 650, y: 48 },
      { label: 'Batch sync', x: 815, y: 110 },
      { label: 'CDC', x: 845, y: 235 },
      { label: 'Transforms', x: 715, y: 305 },
      { label: 'Destinations', x: 565, y: 280 },
    ],
  },
  {
    title: 'Data quality',
    x: 735,
    y: 430,
    nodes: [
      { label: 'Validation', x: 870, y: 350 },
      { label: 'Rules', x: 870, y: 485 },
      { label: 'Alerts', x: 750, y: 560 },
      { label: 'Profiling', x: 625, y: 510 },
      { label: 'Reports', x: 620, y: 395 },
    ],
  },
  {
    title: 'Data services',
    x: 565,
    y: 620,
    nodes: [
      { label: 'APIs', x: 720, y: 665 },
      { label: 'Authentication', x: 600, y: 725 },
      { label: 'Rate limits', x: 445, y: 720 },
      { label: 'Blacklists', x: 425, y: 610 },
      { label: 'Access control', x: 555, y: 545 },
    ],
  },
  {
    title: 'Operations',
    x: 215,
    y: 570,
    nodes: [
      { label: 'Monitoring', x: 80, y: 480 },
      { label: 'Logs', x: 55, y: 620 },
      { label: 'Audit', x: 165, y: 710 },
      { label: 'Notifications', x: 335, y: 675 },
      { label: 'Metrics', x: 345, y: 530 },
    ],
  },
];

export default function YakCapabilitiesMap() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              scale: 0.985,
            }
      }
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.7,
        ease: HOME_EASE,
      }}
      className="relative min-h-[520px] w-full sm:min-h-[640px] lg:min-h-[720px]"
    >
      <svg
        viewBox="0 0 920 760"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-label="Yak Ops capabilities map"
      >
        {GROUPS.map((group, groupIndex) => (
          <motion.line
            key={`main-line-${group.title}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={group.x}
            y2={group.y}
            stroke="#D1CFC5"
            strokeWidth="1"
            initial={
              shouldReduceMotion
                ? false
                : {
                    pathLength: 0,
                    opacity: 0,
                  }
            }
            whileInView={{ pathLength: 1, opacity: 0.62 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : 0.15 + groupIndex * 0.1,
              ease: HOME_EASE,
            }}
          />
        ))}

        {GROUPS.flatMap((group, groupIndex) =>
          group.nodes.map((node, nodeIndex) => (
            <motion.line
              key={`${group.title}-${node.label}-line`}
              x1={group.x}
              y1={group.y}
              x2={node.x}
              y2={node.y}
              stroke="#DEDCD1"
              strokeWidth="1"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      pathLength: 0,
                      opacity: 0,
                    }
              }
              whileInView={{ pathLength: 1, opacity: 0.72 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: shouldReduceMotion ? 0 : 0.65 + groupIndex * 0.1 + nodeIndex * 0.045,
                ease: HOME_EASE,
              }}
            />
          )),
        )}

        {GROUPS.map((group, groupIndex) => (
          <motion.g
            key={group.title}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.9,
                  }
            }
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.55,
              delay: shouldReduceMotion ? 0 : 0.25 + groupIndex * 0.1,
              ease: HOME_EASE,
            }}
            style={{ transformOrigin: `${group.x}px ${group.y}px` }}
          >
            <circle cx={group.x} cy={group.y} r="53" fill="#F5F4ED" opacity="0.96" />
            <text
              x={group.x}
              y={group.y + 4}
              textAnchor="middle"
              fill="#181817"
              fontSize="14"
              fontWeight="500"
              style={{ fontFamily: "'Yak_Serif', Georgia, serif" }}
            >
              {group.title}
            </text>
          </motion.g>
        ))}

        {GROUPS.flatMap((group, groupIndex) =>
          group.nodes.map((node, nodeIndex) => (
            <motion.g
              key={`${group.title}-${node.label}`}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 6,
                    }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.45,
                delay: shouldReduceMotion ? 0 : 0.8 + groupIndex * 0.1 + nodeIndex * 0.045,
                ease: HOME_EASE,
              }}
            >
              <circle cx={node.x} cy={node.y} r="28" fill="#F5F4ED" opacity="0.95" />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill="#5E5D59"
                fontSize="11.5"
                fontWeight="400"
                style={{ fontFamily: "'Yak_Sans', Arial, sans-serif" }}
              >
                {node.label}
              </text>
            </motion.g>
          )),
        )}

        <circle cx={CENTER.x} cy={CENTER.y} r="112" fill="#F5F4ED" opacity="0.96" />

        <motion.g
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.92,
                }
          }
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.65,
            ease: HOME_EASE,
          }}
          style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        >
          <img src={brandLogo} />
        </motion.g>
      </svg>
    </motion.div>
  );
}
