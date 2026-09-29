import { motion, useReducedMotion } from 'framer-motion';
import type { SVGProps } from 'react';

export interface WorkflowCodeVisualProps extends SVGProps<SVGSVGElement> {
  /** Main outline color. */
  foregroundColor?: string;

  /** Color of the travelling workflow signal. */
  accentColor?: string;

  /** Duration of one signal pass, in seconds. */
  cycleDuration?: number;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function WorkflowCodeVisual({
  foregroundColor = '#181817',
  accentColor = '#ff6b3d',
  cycleDuration = 3.8,
  width = 120,
  height = 96,
  style,
  ...props
}: WorkflowCodeVisualProps) {
  const shouldReduceMotion = useReducedMotion();

  const visible = { opacity: 1, pathLength: 1 };

  return (
    <svg
      viewBox="0 0 120 96"
      width={width}
      height={height}
      fill="none"
      role="img"
      aria-label="Animated workflow connected to a code node"
      style={{ display: 'block', overflow: 'visible', ...style }}
      {...props}
    >
      {/* Input node */}
      <motion.rect
        x="14"
        y="16"
        width="25"
        height="14"
        rx="7"
        stroke={foregroundColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.42, ease: EASE }}
        style={{ transformOrigin: '26.5px 23px' }}
      />

      {/* Upper workflow route */}
      <motion.path
        d="M39 23H57C68 23 75 28 79 36"
        stroke={foregroundColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={shouldReduceMotion ? false : { opacity: 0, pathLength: 0 }}
        animate={visible}
        transition={{ delay: 0.12, duration: 0.62, ease: EASE }}
      />

      {/* Decision node: entrance once, then a very small idle movement */}
      <motion.g
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.56, duration: 0.38, ease: EASE }}
        style={{ transformOrigin: '80px 42.5px' }}
      >
        <motion.path
          d="M79 34L87 42L80 51L72 43Z"
          stroke={foregroundColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          animate={shouldReduceMotion ? undefined : { rotate: [0, 2.5, 0, -2.5, 0], y: [0, -0.7, 0] }}
          transition={{
            delay: 1.2,
            duration: 4.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '80px 42.5px' }}
        />
      </motion.g>

      {/* Lower route loops back and enters the code node */}
      <motion.path
        d="M76 50C72 57 64 60 53 60H30C20 60 15 64 15 70C15 77 21 80 31 80H53"
        stroke={foregroundColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={shouldReduceMotion ? false : { opacity: 0, pathLength: 0 }}
        animate={visible}
        transition={{ delay: 0.72, duration: 0.82, ease: EASE }}
      />

      {/* Code node */}
      <motion.g
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.86, y: 3 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.48, ease: EASE }}
        style={{ transformOrigin: '75px 80.5px' }}
      >
        <motion.g
          animate={shouldReduceMotion ? undefined : { y: [0, -1.2, 0] }}
          transition={{
            delay: 1.8,
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <rect
            x="52"
            y="68"
            width="46"
            height="25"
            rx="12.5"
            fill="white"
            stroke={foregroundColor}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <motion.path
            d="M66 76L61 80.5L66 85"
            stroke={foregroundColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={shouldReduceMotion ? false : { opacity: 0, pathLength: 0 }}
            animate={visible}
            transition={{ delay: 1.52, duration: 0.32, ease: EASE }}
          />

          <motion.path
            d="M73 75L69.5 86"
            stroke={foregroundColor}
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={shouldReduceMotion ? false : { opacity: 0, pathLength: 0 }}
            animate={visible}
            transition={{ delay: 1.62, duration: 0.32, ease: EASE }}
          />

          <motion.path
            d="M77 76L82 80.5L77 85"
            stroke={foregroundColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={shouldReduceMotion ? false : { opacity: 0, pathLength: 0 }}
            animate={visible}
            transition={{ delay: 1.72, duration: 0.32, ease: EASE }}
          />
        </motion.g>
      </motion.g>

      {/* A small signal repeatedly travels through the workflow. */}
      {!shouldReduceMotion && (
        <motion.circle
          r="2.3"
          fill={accentColor}
          initial={{ cx: 39, cy: 23, opacity: 0, scale: 0.7 }}
          animate={{
            cx: [39, 56, 72, 80, 76, 62, 31, 15, 31, 53],
            cy: [23, 23, 29, 42, 51, 60, 60, 70, 80, 80],
            opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            scale: [0.7, 1, 1, 1.08, 1, 1, 1, 1, 1, 0.7],
          }}
          transition={{
            delay: 1.8,
            duration: cycleDuration,
            times: [0, 0.1, 0.22, 0.33, 0.43, 0.55, 0.68, 0.79, 0.9, 1],
            repeat: Infinity,
            repeatDelay: 0.55,
            ease: 'linear',
          }}
          style={{ transformOrigin: 'center' }}
        />
      )}
    </svg>
  );
}
