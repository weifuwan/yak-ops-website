import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';
import type { SVGProps } from 'react';

export interface DataFlowVisualProps extends SVGProps<SVGSVGElement> {
  /** Basketball fill color. */
  accentColor?: string;

  /** Main hand-drawn line color. */
  foregroundColor?: string;

  /** Total duration of the one-time drawing animation, in seconds. */
  cycleDuration?: number;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type DrawPath = {
  readonly d: string;
  readonly start: number;
  readonly end: number;
};

/**
 * The figure intentionally uses only three gestures:
 * one continuous body stroke, one rear leg, and one shooting arm.
 * This keeps the illustration close to the compact reference artwork.
 */
const FIGURE_PATHS: readonly DrawPath[] = [
  {
    d: `
      M94 409
      C141 388 185 352 228 327
      C250 314 270 315 282 328
      C294 341 291 356 283 373
      C274 391 256 406 252 421
      C248 434 261 441 282 438
      C314 434 347 428 369 441
      C390 454 386 476 369 499
      C352 522 332 544 318 560
      C309 571 317 580 338 589
    `,
    start: 0.02,
    end: 0.46,
  },
  {
    d: `
      M252 461
      C241 489 221 514 194 527
      C170 538 147 540 128 553
      C105 569 91 590 89 616
    `,
    start: 0.29,
    end: 0.56,
  },
  {
    d: `
      M326 307
      C350 325 382 323 409 304
      C438 284 455 251 460 215
      C463 197 463 188 468 178
    `,
    start: 0.2,
    end: 0.59,
  },
] as const;

const HOOP_FRAME_PATHS: readonly DrawPath[] = [
  {
    d: 'M698 54L698 286',
    start: 0.3,
    end: 0.53,
  },
  {
    d: `
      M511 211
      C551 201 616 201 683 207
      C649 220 555 223 511 211
      Z
    `,
    start: 0.38,
    end: 0.62,
  },
] as const;

const NET_PATHS: readonly DrawPath[] = [
  {
    d: 'M532 221C539 255 548 291 560 333',
    start: 0.53,
    end: 0.68,
  },
  {
    d: 'M659 218C651 256 641 294 628 334',
    start: 0.55,
    end: 0.7,
  },
  {
    d: 'M560 333C579 345 610 346 628 334',
    start: 0.66,
    end: 0.76,
  },
  {
    d: 'M542 237L613 335',
    start: 0.59,
    end: 0.75,
  },
  {
    d: 'M575 232L550 309',
    start: 0.61,
    end: 0.75,
  },
  {
    d: 'M611 230L569 336',
    start: 0.63,
    end: 0.79,
  },
  {
    d: 'M646 235L594 337',
    start: 0.65,
    end: 0.81,
  },
] as const;

const BALL_SEAM_PATHS: readonly DrawPath[] = [
  {
    d: `
      M438 79
      C453 106 461 136 457 163
      C454 181 446 198 435 211
    `,
    start: 0.78,
    end: 0.92,
  },
  {
    d: 'M377 129C414 111 461 109 506 124',
    start: 0.8,
    end: 0.93,
  },
  {
    d: 'M378 174C411 145 452 126 507 128',
    start: 0.82,
    end: 0.96,
  },
  {
    d: 'M451 79C462 105 481 145 506 181',
    start: 0.84,
    end: 0.98,
  },
] as const;

export default function DataFlowVisualBasketball({
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
  const rawTitleId = useId();
  const rawBallClipId = useId();
  const titleId = rawTitleId.replace(/:/g, '');
  const ballClipId = rawBallClipId.replace(/:/g, '');
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
      {!isDecorative && !ariaLabel && <title id={titleId}>Animated minimalist basketball illustration</title>}

      <defs>
        <clipPath id={ballClipId}>
          <circle cx="441" cy="143" r="60" />
        </clipPath>
      </defs>

      {/* Minimal running figure, drawn once and then held in place. */}
      <g fill="none" stroke={foregroundColor} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
        {FIGURE_PATHS.map((path) => (
          <motion.path key={path.d} d={path.d} {...getDrawMotion(path.start, path.end)} />
        ))}

        <motion.circle cx="298" cy="266" r="51" transform="rotate(-90 298 266)" {...getDrawMotion(0.1, 0.34)} />
      </g>

      {/* Compact rim and hand-drawn net from the reference. */}
      <g fill="none" stroke={foregroundColor} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
        {HOOP_FRAME_PATHS.map((path) => (
          <motion.path key={path.d} d={path.d} {...getDrawMotion(path.start, path.end)} />
        ))}
      </g>

      <g fill="none" stroke={foregroundColor} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        {NET_PATHS.map((path) => (
          <motion.path key={path.d} d={path.d} {...getDrawMotion(path.start, path.end)} />
        ))}
      </g>

      {/* The ball appears after the hand reaches its final position. */}
      <motion.circle
        cx="441"
        cy="143"
        r="60"
        fill={accentColor}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.76 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: introDuration * 0.16,
                delay: introDuration * 0.64,
                ease: EASE,
              }
        }
        style={{ transformOrigin: '441px 143px' }}
      />

      <g
        clipPath={`url(#${ballClipId})`}
        fill="none"
        stroke={foregroundColor}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {BALL_SEAM_PATHS.map((path) => (
          <motion.path key={path.d} d={path.d} {...getDrawMotion(path.start, path.end)} />
        ))}
      </g>
    </svg>
  );
}
