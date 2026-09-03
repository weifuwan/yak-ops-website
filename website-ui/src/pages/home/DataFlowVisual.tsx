import { motion, useReducedMotion } from 'framer-motion';
import type { SVGProps } from 'react';

export interface DataFlowVisualProps extends SVGProps<SVGSVGElement> {
  accentColor?: string;
  foregroundColor?: string;
  cycleDuration?: number;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FLOW_PATHS = [
  {
    d: 'M70 246C132 225 178 242 226 292',
    start: 0.03,
    end: 0.18,
  },
  {
    d: 'M70 340C136 340 182 339 230 332',
    start: 0.06,
    end: 0.21,
  },
  {
    d: 'M70 438C132 460 180 420 226 378',
    start: 0.09,
    end: 0.24,
  },
  {
    d: `
      M226 292
      C272 247 321 246 361 277
      C402 309 401 358 366 384
      C331 410 286 397 279 359
      C272 322 305 294 342 302
      C380 310 405 352 444 373
    `,
    start: 0.15,
    end: 0.41,
  },
  {
    d: `
      M226 378
      C272 425 330 432 378 401
      C421 373 432 321 402 284
      C375 251 331 241 292 263
    `,
    start: 0.2,
    end: 0.46,
  },
  {
    d: `
      M444 373
      C501 397 548 370 568 322
      C588 273 582 225 618 183
      C642 155 663 139 687 131
    `,
    start: 0.38,
    end: 0.68,
  },
  {
    d: `
      M378 401
      C417 455 479 500 548 490
      C607 481 642 445 653 402
    `,
    start: 0.43,
    end: 0.72,
  },
] as const;

export default function DataFlowVisual({
  accentColor = '#d97757',
  foregroundColor = '#131314',
  cycleDuration = 4.8,
  className,
  style,
  width = '100%',
  height = '100%',
  viewBox = '0 0 720 680',
  preserveAspectRatio = 'xMidYMid meet',
  role,
  focusable = 'false',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-hidden': ariaHidden,
  ...svgProps
}: DataFlowVisualProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isDecorative = !ariaLabel && !ariaLabelledBy;

  const getPathMotion = (start: number, end: number) => {
    if (shouldReduceMotion) {
      return {
        initial: false as const,
        animate: { opacity: 1, pathLength: 1 },
      };
    }

    return {
      initial: { opacity: 0, pathLength: 0 },
      animate: {
        opacity: [0, 1, 1, 1, 0],
        pathLength: [0, 0, 1, 1, 1],
      },
      transition: {
        duration: cycleDuration,
        ease: EASE,
        repeat: Number.POSITIVE_INFINITY,
        times: [0, start, end, 0.9, 1],
      },
    };
  };

  return (
    <svg
      {...svgProps}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        ...style,
      }}
      role={role ?? (isDecorative ? undefined : 'img')}
      focusable={focusable}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-hidden={ariaHidden ?? (isDecorative ? true : undefined)}
    >
      <title>{ariaLabel ?? 'Yak Ops data operations flow'}</title>

      <motion.circle
        cx="350"
        fill={accentColor}
        initial={shouldReduceMotion ? false : { cy: 336, opacity: 0, r: 0 }}
        animate={
          shouldReduceMotion
            ? { cy: 332, opacity: 1, r: 56 }
            : {
                cy: [336, 336, 332, 330, 332, 336],
                opacity: [0, 0, 1, 1, 1, 0],
                r: [0, 0, 56, 56, 54, 52],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: cycleDuration,
                ease: EASE,
                repeat: Number.POSITIVE_INFINITY,
                times: [0, 0.06, 0.2, 0.58, 0.88, 1],
              }
        }
      />

      <g fill="none" stroke={foregroundColor} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
        {FLOW_PATHS.map((path) => (
          <motion.path key={path.d} d={path.d} {...getPathMotion(path.start, path.end)} />
        ))}
      </g>
    </svg>
  );
}
