import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useIllustrationAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const reducedMotion = useReducedMotion() ?? false;

  return { ref, className: 'h-full w-full', animate: visible && !reducedMotion };
}

function loopTransition(active: boolean, times: number[]) {
  return active ? { duration: 7, times, repeat: Infinity, ease: 'easeInOut' as const } : { duration: 0 };
}

const ROW_STAGES = [
  { times: [0, 0.15, 0.92, 1], opacity: [0.55, 1, 1, 0.55], x: [-5, 0, 0, -5] },
  { times: [0, 0.28, 0.38, 0.92, 1], opacity: [0.4, 0.4, 1, 1, 0.4], x: [-5, -5, 0, 0, -5] },
  { times: [0, 0.53, 0.64, 0.92, 1], opacity: [0.4, 0.4, 1, 1, 0.4], x: [-5, -5, 0, 0, -5] },
];

const REPEAT_SETUP = {
  times: [0, 0.7, 0.81, 0.92, 1],
  opacity: [0.65, 0.65, 1, 1, 0.65],
  y: [2, 2, -2, -2, 2],
};
const ERROR_HIGHLIGHT = {
  times: [0, 0.5, 0.61, 0.87, 1],
  opacity: [0.4, 0.4, 1, 1, 0.4],
};
const DATA_TRAVEL = {
  times: [0, 0.08, 0.13, 0.48, 0.57, 1],
  opacity: [0, 0, 1, 1, 0, 0],
  x: [0, 0, 0, 140, 145, 145],
};
const FAILURE_ALERT = {
  times: [0, 0.46, 0.54, 0.86, 1],
  opacity: [0.2, 0.2, 1, 1, 0.2],
  scale: [0.85, 0.85, 1.13, 1.13, 0.85],
};

/**
 * Yak Ops-specific product illustrations for the three data engineering pain points.
 * SVG is kept local so the website does not depend on Collate's external assets.
 */

const pipelineRows = [
  { name: 'Source', state: 'Ready', time: '08:42', color: '#6DBCA7' },
  { name: 'Transform', state: 'Running', time: '08:43', color: '#77A7EA' },
  { name: 'Schedule', state: 'Queued', time: '—', color: '#BDCADB' },
] as const;

const fragmentationPositions = [
  { x: 76, y: 74, rotate: 0, scale: 1 },
  { x: 52, y: 45, rotate: -4, scale: 0.94 },
  { x: 22, y: 26, rotate: -9, scale: 0.9 },
] as const;

/**
 * Opaque, product-like workflow panels. Back panels use a solid neutral surface
 * rather than opacity, so their contents never look washed out through the stack.
 */
function FragmentationWindow({ highlightedRow, depth }: { highlightedRow: number; depth: number }) {
  const front = depth === 0;
  const surface = front ? '#FFFFFF' : '#F8FAFD';
  const header = front ? '#EDF3FC' : '#F0F4F9';
  const border = front ? '#2F6FED' : '#C4D3E4';
  const primaryText = front ? '#243752' : '#657993';
  const secondaryText = front ? '#7588A2' : '#8B9BB0';
  const divider = front ? '#E2EAF4' : '#E7EDF5';

  return (
    <g filter={front ? 'url(#fragmentation-front-shadow)' : 'url(#fragmentation-back-shadow)'}>
      <rect x="0" y="0" width="318" height="187" rx="14" fill={surface} stroke={border} strokeWidth={front ? 2 : 1.5} />
      <path d="M14 1H304C311.18 1 317 6.82 317 14V37H1V14C1 6.82 6.82 1 14 1Z" fill={header} />
      <circle cx="19" cy="19" r="3.3" fill={front ? '#AFC1D9' : '#C4D1E2'} />
      <text x="32" y="24" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill={primaryText}>
        orders_daily
      </text>

      <text x="18" y="55" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill={secondaryText}>
        STEP
      </text>
      <text x="121" y="55" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill={secondaryText}>
        STATUS
      </text>
      <text x="232" y="55" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill={secondaryText}>
        UPDATED
      </text>
      <path d="M17 63H301" stroke={divider} />
      <rect x="11" y={66 + highlightedRow * 36} width="296" height="34" rx="5" fill={front ? '#E5EFFF' : '#EDF2F8'} />

      {pipelineRows.map((row, index) => {
        const baseline = 85 + index * 36;

        return (
          <g key={row.name}>
            <text x="18" y={baseline} fontFamily="Arial, sans-serif" fontSize="12" fill={primaryText}>
              {row.name}
            </text>
            <circle cx="123" cy={baseline - 4} r="3" fill={row.color} />
            <text x="132" y={baseline} fontFamily="Arial, sans-serif" fontSize="11" fill={primaryText}>
              {row.state}
            </text>
            <text x="233" y={baseline} fontFamily="Arial, sans-serif" fontSize="11" fill={secondaryText}>
              {row.time}
            </text>
            <path d={`M17 ${baseline + 13}H301`} stroke={divider} />
          </g>
        );
      })}
    </g>
  );
}

export function FragmentationIllustration() {
  const ref = useRef<SVGSVGElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    if (!visible || reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActivePanel((current) => (current + 1) % fragmentationPositions.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [visible, reducedMotion]);

  // Draw the back panel first and the active, fully opaque panel last.
  const panels = fragmentationPositions
    .map((_, index) => ({
      index,
      depth: (index - activePanel + fragmentationPositions.length) % fragmentationPositions.length,
    }))
    .sort((a, b) => b.depth - a.depth);

  return (
    <svg ref={ref} aria-hidden="true" className="h-full w-full" viewBox="0 0 416 270" fill="none">
      <defs>
        <filter id="fragmentation-front-shadow" x="-12%" y="-12%" width="124%" height="132%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#34557D" floodOpacity="0.14" />
        </filter>
        <filter id="fragmentation-back-shadow" x="-12%" y="-12%" width="124%" height="132%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#34557D" floodOpacity="0.05" />
        </filter>
      </defs>
      <rect width="416" height="270" fill="#F0F5FB" />
      {panels.map((panel) => {
        const position = fragmentationPositions[panel.depth];

        return (
          <motion.g
            key={panel.index}
            className="origin-center [transform-box:fill-box]"
            initial={false}
            animate={position}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <FragmentationWindow highlightedRow={panel.index} depth={panel.depth} />
          </motion.g>
        );
      })}
    </svg>
  );
}

export function ManualWorkIllustration() {
  const animation = useIllustrationAnimation();

  return (
    <svg {...animation} aria-hidden="true" viewBox="0 0 416 270" fill="none">
      <defs>
        <linearGradient id="manual-surface" x1="208" y1="0" x2="208" y2="258" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7F3FF" />
          <stop offset="1" stopColor="#F5FAFF" />
        </linearGradient>
        <filter id="manual-shadow" x="50" y="5" width="320" height="235" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="9" stdDeviation="12" floodColor="#4777B5" floodOpacity=".13" />
        </filter>
      </defs>
      <rect width="416" height="270" fill="url(#manual-surface)" />
      <circle cx="326" cy="70" r="46" fill="#D5EAFE" opacity=".75" />
      <circle cx="84" cy="196" r="58" fill="#DFEEFF" opacity=".65" />

      <g filter="url(#manual-shadow)">
        <rect x="76" y="31" width="265" height="191" rx="14" fill="white" stroke="#CFE1F7" />
        <path d="M76 45C76 37.268 82.268 31 90 31H327C334.732 31 341 37.268 341 45V65H76V45Z" fill="#F7FAFF" />
        <circle cx="94" cy="48" r="4" fill="#FFB7A6" />
        <circle cx="107" cy="48" r="4" fill="#F9D680" />
        <circle cx="120" cy="48" r="4" fill="#9DDECE" />
        <text
          x="208"
          y="52"
          fontFamily="Arial, sans-serif"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
          fill="#365170"
        >
          Pipeline setup
        </text>

        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={animation.animate ? { opacity: ROW_STAGES[0].opacity, x: ROW_STAGES[0].x } : { opacity: 1, x: 0 }}
          transition={loopTransition(animation.animate, ROW_STAGES[0].times)}
        >
          <rect x="94" y="80" width="229" height="35" rx="8" fill="#F4F8FF" />
          <rect x="107" y="90" width="14" height="14" rx="4" fill="#D9E9FB" stroke="#A2C4E9" />
          <path
            d="M111 97L114 100L119 94"
            stroke="#2B87EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="132" y="102" fontFamily="Arial, sans-serif" fontSize="12" fill="#3C587A">
            Configure sources
          </text>
          <path d="M283 97H307" stroke="#B7CBE5" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={animation.animate ? { opacity: ROW_STAGES[1].opacity, x: ROW_STAGES[1].x } : { opacity: 1, x: 0 }}
          transition={loopTransition(animation.animate, ROW_STAGES[1].times)}
        >
          <rect x="94" y="123" width="229" height="35" rx="8" fill="#F4F8FF" />
          <rect x="107" y="133" width="14" height="14" rx="4" fill="#D9E9FB" stroke="#A2C4E9" />
          <path
            d="M111 140L114 143L119 137"
            stroke="#2B87EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="132" y="145" fontFamily="Arial, sans-serif" fontSize="12" fill="#3C587A">
            Set up schedules
          </text>
          <path d="M283 140H307" stroke="#B7CBE5" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={animation.animate ? { opacity: ROW_STAGES[2].opacity, x: ROW_STAGES[2].x } : { opacity: 1, x: 0 }}
          transition={loopTransition(animation.animate, ROW_STAGES[2].times)}
        >
          <rect x="94" y="166" width="229" height="35" rx="8" fill="#F4F8FF" />
          <rect x="107" y="176" width="14" height="14" rx="4" fill="#D9E9FB" stroke="#A2C4E9" />
          <path
            d="M111 183L114 186L119 180"
            stroke="#2B87EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="132" y="188" fontFamily="Arial, sans-serif" fontSize="12" fill="#3C587A">
            Verify and deploy
          </text>
          <path d="M283 183H307" stroke="#B7CBE5" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </g>

      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={animation.animate ? { opacity: REPEAT_SETUP.opacity, y: REPEAT_SETUP.y } : { opacity: 1, y: 0 }}
        transition={loopTransition(animation.animate, REPEAT_SETUP.times)}
      >
        <rect x="144" y="211" width="128" height="33" rx="16.5" fill="#E9F3FF" stroke="#B8D6F6" />
        <path
          d="M159 228C159 222.5 166 220.5 170 224M170 224V220M170 224H166M171 228C171 233.5 164 235.5 160 232M160 232V236M160 232H164"
          stroke="#3189E8"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="181" y="232" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#2E6FB9">
          Repeat setup
        </text>
      </motion.g>
    </svg>
  );
}

export function BlindSpotsIllustration() {
  const animation = useIllustrationAnimation();

  return (
    <svg {...animation} aria-hidden="true" viewBox="0 0 416 270" fill="none">
      <defs>
        <linearGradient id="blind-surface" x1="208" y1="0" x2="208" y2="258" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7F3FF" />
          <stop offset="1" stopColor="#F5FAFF" />
        </linearGradient>
        <filter id="blind-shadow" x="10" y="0" width="395" height="248" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="9" stdDeviation="11" floodColor="#4777B5" floodOpacity=".12" />
        </filter>
      </defs>
      <rect width="416" height="270" fill="url(#blind-surface)" />
      <path d="M104 67H179M237 67H312" stroke="#84AED9" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
      <motion.circle
        cx="113"
        cy="67"
        r="5.5"
        fill="#237EEA"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={animation.animate ? { opacity: DATA_TRAVEL.opacity, x: DATA_TRAVEL.x } : { opacity: 1, x: 0 }}
        transition={loopTransition(animation.animate, DATA_TRAVEL.times)}
      />
      <motion.path
        d="M253 58L264 76M264 58L253 76"
        stroke="#D6455E"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={
          animation.animate ? { opacity: FAILURE_ALERT.opacity, scale: FAILURE_ALERT.scale } : { opacity: 1, scale: 1 }
        }
        transition={loopTransition(animation.animate, FAILURE_ALERT.times)}
      />
      <g filter="url(#blind-shadow)">
        <rect x="30" y="40" width="88" height="54" rx="10" fill="white" stroke="#D6E4F7" />
        <text
          x="74"
          y="65"
          textAnchor="middle"
          fontSize="12"
          fontFamily="Arial, sans-serif"
          fontWeight="600"
          fill="#365170"
        >
          Source
        </text>
        <rect x="46" y="80" width="52" height="4" rx="2" fill="#DBE7F6" />

        <rect x="166" y="37" width="84" height="60" rx="10" fill="white" stroke="#D6E4F7" />
        <text
          x="208"
          y="65"
          textAnchor="middle"
          fontSize="12"
          fontFamily="Arial, sans-serif"
          fontWeight="600"
          fill="#365170"
        >
          Task
        </text>
        <rect x="180" y="79" width="52" height="4" rx="2" fill="#DBE7F6" />

        <rect x="303" y="40" width="84" height="54" rx="10" fill="white" stroke="#D6E4F7" />
        <text
          x="345"
          y="65"
          textAnchor="middle"
          fontSize="12"
          fontFamily="Arial, sans-serif"
          fontWeight="600"
          fill="#365170"
        >
          Sink
        </text>
        <rect x="317" y="80" width="52" height="4" rx="2" fill="#DBE7F6" />

        <rect x="59" y="119" width="298" height="112" rx="13" fill="white" stroke="#D6E4F7" />
        <rect x="59" y="119" width="298" height="33" rx="13" fill="#F9FBFF" />
        <path d="M59 141V152H357V141" fill="#F9FBFF" />
        <motion.circle
          cx="80"
          cy="136"
          r="5.5"
          fill="#E25569"
          animate={animation.animate ? { opacity: ERROR_HIGHLIGHT.opacity } : { opacity: 1 }}
          transition={loopTransition(animation.animate, ERROR_HIGHLIGHT.times)}
        />
        <text x="94" y="140" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="600" fill="#394F6E">
          Pipeline failed
        </text>
        <motion.rect
          x="284"
          y="127"
          width="57"
          height="18"
          rx="9"
          fill="#FFF0F2"
          animate={animation.animate ? { opacity: ERROR_HIGHLIGHT.opacity } : { opacity: 1 }}
          transition={loopTransition(animation.animate, ERROR_HIGHLIGHT.times)}
        />
        <text
          x="312"
          y="140"
          textAnchor="middle"
          fontSize="10.5"
          fontFamily="Arial, sans-serif"
          fontWeight="600"
          fill="#D04963"
        >
          Error
        </text>
        <rect x="79" y="165" width="20" height="5" rx="2.5" fill="#9DB5D4" />
        <rect x="109" y="165" width="197" height="5" rx="2.5" fill="#D9E5F4" />
        <rect x="79" y="181" width="20" height="5" rx="2.5" fill="#9DB5D4" />
        <rect x="109" y="181" width="170" height="5" rx="2.5" fill="#D9E5F4" />
        <motion.g
          animate={animation.animate ? { opacity: ERROR_HIGHLIGHT.opacity } : { opacity: 1 }}
          transition={loopTransition(animation.animate, ERROR_HIGHLIGHT.times)}
        >
          <rect x="79" y="197" width="20" height="5" rx="2.5" fill="#E8A3B0" />
          <rect x="109" y="197" width="208" height="5" rx="2.5" fill="#F1CBD4" />
        </motion.g>
        <rect x="79" y="213" width="20" height="5" rx="2.5" fill="#9DB5D4" />
        <rect x="109" y="213" width="146" height="5" rx="2.5" fill="#D9E5F4" />
      </g>
    </svg>
  );
}
