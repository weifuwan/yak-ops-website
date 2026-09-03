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
    d: 'M82 370C98 314 112 260 144 246C164 237 171 259 160 294L143 337',
    start: 0.02,
    end: 0.17,
  },
  {
    d: 'M124 352C143 289 181 222 207 228C230 233 209 274 190 313L172 346',
    start: 0.06,
    end: 0.21,
  },
  {
    d: 'M170 356C194 299 226 239 251 247C278 256 246 307 224 343L206 368',
    start: 0.1,
    end: 0.25,
  },
  {
    d: `
      M206 368
      C236 319 271 300 305 303
      C335 306 348 326 335 343
      C322 360 286 357 268 377
      C249 399 251 428 268 441
      C287 456 316 449 329 425
      C344 397 340 363 320 350
      C301 338 280 351 279 373
      C278 394 300 416 315 432
    `,
    start: 0.15,
    end: 0.37,
  },
  {
    d: `
      M315 432
      C306 469 281 493 269 528
      C261 551 264 579 281 594
      C327 634 411 641 488 620
      C552 603 598 564 603 514
      C607 477 593 448 567 433
      C548 422 524 418 507 408
      C489 397 480 382 481 365
    `,
    start: 0.27,
    end: 0.52,
  },
  {
    d: `
      M481 365
      C481 340 500 322 497 297
      C494 273 469 265 468 242
      C467 220 482 207 505 194
      C529 180 536 160 545 132
      C556 98 586 70 626 54
    `,
    start: 0.36,
    end: 0.57,
  },
  {
    d: 'M329 303C334 277 332 247 334 219',
    start: 0.2,
    end: 0.32,
  },
] as const;

export default function DataFlowVisual({
  accentColor = '#d97757',
  foregroundColor = '#131314',
  cycleDuration = 3.8,
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
        pathLength: [0, 0, 1, 1, 0],
      },
      transition: {
        duration: cycleDuration,
        ease: EASE,
        repeat: Number.POSITIVE_INFINITY,
        times: [0, start, end, 0.86, 1],
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

      <g fill="none" stroke={foregroundColor} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
        {FLOW_PATHS.map((path) => (
          <motion.path key={path.d} d={path.d} {...getPathMotion(path.start, path.end)} />
        ))}
      </g>

      <motion.circle
        cx="334"
        fill={accentColor}
        initial={shouldReduceMotion ? false : { cy: 150, opacity: 0, r: 0 }}
        animate={
          shouldReduceMotion
            ? { cy: 150, opacity: 1, r: 58 }
            : {
                cy: [150, 150, 146, 150, 147, 150],
                opacity: [0, 0, 1, 1, 1, 0],
                r: [0, 0, 58, 58, 56, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: cycleDuration,
                ease: EASE,
                repeat: Number.POSITIVE_INFINITY,
                times: [0, 0.08, 0.21, 0.52, 0.82, 1],
              }
        }
      />
    </svg>
  );
}
