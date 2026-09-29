import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';
import type { SVGProps } from 'react';

export interface DataFlowVisualProps extends SVGProps<SVGSVGElement> {
  /** Head and small accent details. */
  accentColor?: string;

  /** Main line-art color. */
  foregroundColor?: string;

  /**
   * Total duration of the one-time entrance animation, in seconds.
   * The name is kept for compatibility with the previous component.
   */
  cycleDuration?: number;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BODY_PATHS = [
  {
    d: `
      M320 182
      C289 170 254 175 222 191
      C184 211 151 241 116 270
      L88 294
      C75 306 78 323 91 330
      C108 339 130 329 150 316
      L229 266
      C250 253 269 246 282 254
      C294 262 295 276 292 294
      L282 351
    `,
    start: 0.02,
    end: 0.35,
  },
  {
    d: `
      M320 182
      C348 190 370 210 387 238
      C406 269 423 299 454 309
      C481 318 498 332 494 356
    `,
    start: 0.09,
    end: 0.38,
  },
  {
    d: `
      M292 294
      C286 329 294 368 313 399
      C331 429 343 457 336 492
      L320 592
    `,
    start: 0.22,
    end: 0.55,
  },
  {
    d: `
      M320 592
      C310 608 322 618 351 619
      C377 620 397 612 392 602
      C385 591 350 586 320 592
    `,
    start: 0.43,
    end: 0.61,
  },
  {
    d: `
      M309 399
      C350 410 386 428 420 452
      C451 475 480 500 514 516
      C532 524 548 524 563 518
      C576 513 586 518 587 528
      C588 540 573 549 553 551
    `,
    start: 0.36,
    end: 0.7,
  },
  {
    d: `
      M308 443
      C343 453 377 467 411 487
      C449 509 488 541 530 548
      C548 551 570 545 582 535
    `,
    start: 0.43,
    end: 0.75,
  },
] as const;

const BALL_PANEL_PATHS = [
  {
    d: 'M620 506L635 517L629 535H611L605 517Z',
    start: 0.83,
    end: 0.96,
  },
  {
    d: 'M620 506L620 480',
    start: 0.86,
    end: 0.97,
  },
  {
    d: 'M635 517L659 505',
    start: 0.87,
    end: 0.98,
  },
  {
    d: 'M629 535L646 557',
    start: 0.88,
    end: 0.99,
  },
  {
    d: 'M611 535L594 557',
    start: 0.89,
    end: 1,
  },
  {
    d: 'M605 517L581 505',
    start: 0.9,
    end: 1,
  },
] as const;

export default function DataFlowVisualFootball({
  accentColor = '#d97757',
  foregroundColor = '#131314',
  cycleDuration = 2.4,
  className,
  style,
  width = '80%',
  height = '100%',
  viewBox = '0 0 800 680',
  preserveAspectRatio = 'xMidYMid meet',
  role,
  focusable = 'false',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-hidden': ariaHidden,
  ...svgProps
}: DataFlowVisualProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const titleId = useId();
  const isDecorative = !ariaLabel && !ariaLabelledBy;
  const introDuration = Math.max(cycleDuration, 1.2);

  const getDrawMotion = (start: number, end: number) => {
    if (shouldReduceMotion) {
      return {
        initial: false as const,
        animate: { opacity: 1, pathLength: 1 },
      };
    }

    return {
      initial: { opacity: 0, pathLength: 0 },
      animate: { opacity: 1, pathLength: 1 },
      transition: {
        duration: Math.max((end - start) * introDuration, 0.16),
        delay: start * introDuration,
        ease: EASE,
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
        width: '80%',
        height: '100%',
        overflow: 'visible',
        ...style,
      }}
      role={role ?? (isDecorative ? undefined : 'img')}
      focusable={focusable}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy ?? (!isDecorative && !ariaLabel ? titleId : undefined)}
      aria-hidden={ariaHidden ?? (isDecorative ? true : undefined)}
    >
      {!isDecorative && !ariaLabel && <title id={titleId}>Animated football kick illustration</title>}

      <motion.ellipse
        cx="390"
        cy="625"
        rx="230"
        ry="10"
        fill={foregroundColor}
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0.7 }}
        animate={{ opacity: 0.055, scaleX: 1 }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: introDuration * 0.24,
                delay: introDuration * 0.48,
                ease: EASE,
              }
        }
        style={{ transformOrigin: '390px 625px' }}
      />

      <g fill="none" stroke={foregroundColor} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
        {BODY_PATHS.map((path) => (
          <motion.path key={path.d} d={path.d} {...getDrawMotion(path.start, path.end)} />
        ))}
      </g>

      <motion.circle
        cx="357"
        cy="108"
        r="50"
        fill={accentColor}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: introDuration * 0.2,
                delay: introDuration * 0.08,
                ease: EASE,
              }
        }
        style={{ transformOrigin: '357px 108px' }}
      />

      <motion.circle
        cx="620"
        cy="523"
        r="43"
        fill="none"
        stroke={foregroundColor}
        strokeWidth="11"
        strokeLinecap="round"
        transform="rotate(-90 620 523)"
        {...getDrawMotion(0.72, 0.9)}
      />

      <g fill="none" stroke={foregroundColor} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        {BALL_PANEL_PATHS.map((path) => (
          <motion.path key={path.d} d={path.d} {...getDrawMotion(path.start, path.end)} />
        ))}
      </g>

      <motion.g
        fill="none"
        stroke={accentColor}
        strokeWidth="7"
        strokeLinecap="round"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.75 }}
        animate={{ opacity: 0.68, scale: 1 }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: introDuration * 0.14,
                delay: introDuration * 0.86,
                ease: EASE,
              }
        }
        style={{ transformOrigin: '570px 514px' }}
      >
        <path d="M574 491L564 480" />
        <path d="M568 507L552 504" />
        <path d="M572 522L560 532" />
      </motion.g>
    </svg>
  );
}
