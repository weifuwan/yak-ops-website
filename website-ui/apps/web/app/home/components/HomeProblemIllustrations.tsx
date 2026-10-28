import { useInView } from 'framer-motion';
import { useRef } from 'react';

import './HomeProblemIllustrations.css';

function useIllustrationAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  return {
    ref,
    className: visible
      ? 'h-full w-full yak-problem-illustration'
      : 'h-full w-full yak-problem-illustration yak-problem-paused',
  };
}

/**
 * Yak Ops-specific product illustrations for the three data engineering pain points.
 * SVG is kept local so the website does not depend on Collate's external assets.
 */

type FragmentationLayer = 'back' | 'middle' | 'front';

const pipelineRows = [
  { name: 'Source', state: 'Ready', time: '08:42', color: '#6DBCA7' },
  { name: 'Transform', state: 'Running', time: '08:43', color: '#77A7EA' },
  { name: 'Schedule', state: 'Queued', time: '—', color: '#BDCADB' },
] as const;

/** A restrained, product-like view of the same workflow in different tools. */
function FragmentationWindow({
  x,
  y,
  width,
  height,
  rotation,
  layer,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  layer: FragmentationLayer;
}) {
  const front = layer === 'front';

  return (
    <g transform={`rotate(${rotation} ${x + width / 2} ${y + height / 2})`}>
      <g className={`yak-fragmentation-stack yak-fragmentation-stack--${layer}`}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx="14"
          fill="#FFFFFF"
          stroke={front ? '#BCCDE1' : layer === 'back' ? '#8BB9FA' : '#CEDCEB'}
          strokeWidth={front ? 2 : 1.5}
        />
        <rect x={x + 1} y={y + 1} width={width - 2} height="37" rx="13" fill={front ? '#EAF2FD' : '#F3F7FD'} />
        <rect x={x + 1} y={y + 25} width={width - 2} height="13" fill={front ? '#EAF2FD' : '#F3F7FD'} />
        <circle cx={x + 20} cy={y + 19} r="3.3" fill="#B6C7DE" />
        <text
          x={x + 33}
          y={y + 24}
          fontFamily="Arial, sans-serif"
          fontSize="13"
          fontWeight="600"
          fill={front ? '#253853' : '#8899B1'}
        >
          orders_daily
        </text>

        {front ? (
          <>
            {[
              { label: 'STEP', dx: 18 },
              { label: 'STATUS', dx: 121 },
              { label: 'UPDATED', dx: 232 },
            ].map((column) => (
              <text
                key={column.label}
                x={x + column.dx}
                y={y + 55}
                fontFamily="Arial, sans-serif"
                fontSize="10"
                fontWeight="600"
                fill="#8292A7"
              >
                {column.label}
              </text>
            ))}
            <path
              d={`M${x + 17} ${y + 63}H${x + width - 17}`}
              stroke="#E6ECF4"
            />
            <rect
              className="yak-fragmentation-row-highlight"
              x={x + 11}
              y={y + 101}
              width={width - 22}
              height="35"
              rx="5"
              fill="#EAF3FF"
            />
            {pipelineRows.map((row, i) => {
              const baseline = y + 85 + i * 36;
              return (
                <g key={row.name}>
                  <text x={x + 18} y={baseline} fontFamily="Arial, sans-serif" fontSize="12" fill="#4B5B72">
                    {row.name}
                  </text>
                  <circle cx={x + 123} cy={baseline - 4} r="3" fill={row.color} />
                  <text x={x + 132} y={baseline} fontFamily="Arial, sans-serif" fontSize="11" fill="#677A93">
                    {row.state}
                  </text>
                  <text x={x + 233} y={baseline} fontFamily="Arial, sans-serif" fontSize="11" fill="#8898AD">
                    {row.time}
                  </text>
                  <path d={`M${x + 17} ${baseline + 13}H${x + width - 17}`} stroke="#E6ECF4" />
                </g>
              );
            })}
          </>
        ) : (
          <>
            <rect x={x + 18} y={y + 54} width="143" height="7" rx="3.5" fill="#E3EBF6" />
            <rect x={x + 18} y={y + 72} width="91" height="7" rx="3.5" fill="#EDF2F9" />
            {[0, 1, 2].map((row) => (
              <g key={row}>
                <path
                  d={`M${x + 17} ${y + 96 + row * 32}H${x + width - 17}`}
                  stroke="#E5ECF5"
                />
                <rect x={x + 22} y={y + 108 + row * 32} width={68 + row * 7} height="6" rx="3" fill="#E4ECF7" />
                <rect x={x + 127} y={y + 108 + row * 32} width={81 - row * 8} height="6" rx="3" fill="#E8EFF9" />
              </g>
            ))}
          </>
        )}
      </g>
    </g>
  );
}

export function FragmentationIllustration() {
  const animation = useIllustrationAnimation();

  return (
    <svg {...animation} aria-hidden="true" viewBox="0 0 416 270" fill="none">
      <rect width="416" height="270" fill="#E8F4FF" />
      <FragmentationWindow x={18} y={24} width={295} height={199} rotation={-10} layer="back" />
      <FragmentationWindow x={57} y={46} width={299} height={197} rotation={-4} layer="middle" />
      <FragmentationWindow x={76} y={74} width={318} height={187} rotation={0} layer="front" />
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
        <text x="208" y="52" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" textAnchor="middle" fill="#365170">
          Pipeline setup
        </text>

        <g className="yak-manual-row yak-manual-row--one">
        <rect x="94" y="80" width="229" height="35" rx="8" fill="#F4F8FF" />
        <rect x="107" y="90" width="14" height="14" rx="4" fill="#D9E9FB" stroke="#A2C4E9" />
        <path d="M111 97L114 100L119 94" stroke="#2B87EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="132" y="102" fontFamily="Arial, sans-serif" fontSize="12" fill="#3C587A">Configure sources</text>
        <path d="M283 97H307" stroke="#B7CBE5" strokeWidth="2" strokeLinecap="round" />
        </g>

        <g className="yak-manual-row yak-manual-row--two">
        <rect x="94" y="123" width="229" height="35" rx="8" fill="#F4F8FF" />
        <rect x="107" y="133" width="14" height="14" rx="4" fill="#D9E9FB" stroke="#A2C4E9" />
        <path d="M111 140L114 143L119 137" stroke="#2B87EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="132" y="145" fontFamily="Arial, sans-serif" fontSize="12" fill="#3C587A">Set up schedules</text>
        <path d="M283 140H307" stroke="#B7CBE5" strokeWidth="2" strokeLinecap="round" />
        </g>

        <g className="yak-manual-row yak-manual-row--three">
        <rect x="94" y="166" width="229" height="35" rx="8" fill="#F4F8FF" />
        <rect x="107" y="176" width="14" height="14" rx="4" fill="#D9E9FB" stroke="#A2C4E9" />
        <path d="M111 183L114 186L119 180" stroke="#2B87EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="132" y="188" fontFamily="Arial, sans-serif" fontSize="12" fill="#3C587A">Verify and deploy</text>
        <path d="M283 183H307" stroke="#B7CBE5" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      <g className="yak-manual-repeat">
      <rect x="144" y="211" width="128" height="33" rx="16.5" fill="#E9F3FF" stroke="#B8D6F6" />
      <path d="M159 228C159 222.5 166 220.5 170 224M170 224V220M170 224H166M171 228C171 233.5 164 235.5 160 232M160 232V236M160 232H164" stroke="#3189E8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <text x="181" y="232" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#2E6FB9">
        Repeat setup
      </text>
      </g>
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
      <path className="yak-blind-links" d="M104 67H179M237 67H312" stroke="#84AED9" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
      <circle className="yak-blind-data-dot" cx="113" cy="67" r="5.5" fill="#237EEA" />
      <path className="yak-blind-error-marker" d="M253 58L264 76M264 58L253 76" stroke="#D6455E" strokeWidth="2.5" strokeLinecap="round" />
      <g filter="url(#blind-shadow)">
        <rect x="30" y="40" width="88" height="54" rx="10" fill="white" stroke="#D6E4F7" />
        <rect x="45" y="54" width="17" height="17" rx="4" fill="#DCEFFF" />
        <path d="M49 60H58M49 65H58" stroke="#2288E5" strokeWidth="1.6" strokeLinecap="round" />
        <text x="69" y="64" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="600" fill="#365170">Source</text>
        <rect x="46" y="80" width="52" height="4" rx="2" fill="#DBE7F6" />

        <rect x="166" y="37" width="84" height="60" rx="10" fill="white" stroke="#D6E4F7" />
        <rect x="179" y="51" width="17" height="17" rx="4" fill="#DFEAFE" />
        <path d="M183 59H192M187.5 54V64" stroke="#5484DA" strokeWidth="1.5" strokeLinecap="round" />
        <text x="202" y="62" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="600" fill="#365170">Task</text>
        <rect x="180" y="79" width="52" height="4" rx="2" fill="#DBE7F6" />

        <rect x="303" y="40" width="84" height="54" rx="10" fill="white" stroke="#D6E4F7" />
        <rect x="316" y="54" width="17" height="17" rx="4" fill="#E8F7F1" />
        <path d="M320 59H329M320 64H329" stroke="#4DAD94" strokeWidth="1.6" strokeLinecap="round" />
        <text x="339" y="64" fontSize="10.5" fontFamily="Arial, sans-serif" fontWeight="600" fill="#365170">Sink</text>
        <rect x="317" y="80" width="52" height="4" rx="2" fill="#DBE7F6" />

        <rect x="59" y="119" width="298" height="112" rx="13" fill="white" stroke="#D6E4F7" />
        <rect x="59" y="119" width="298" height="33" rx="13" fill="#F9FBFF" />
        <path d="M59 141V152H357V141" fill="#F9FBFF" />
        <circle className="yak-blind-status-dot" cx="80" cy="136" r="5.5" fill="#E25569" />
        <text x="94" y="140" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="600" fill="#394F6E">
          Pipeline failed
        </text>
        <rect className="yak-blind-error-badge" x="284" y="127" width="57" height="18" rx="9" fill="#FFF0F2" />
        <text x="312" y="140" textAnchor="middle" fontSize="10.5" fontFamily="Arial, sans-serif" fontWeight="600" fill="#D04963">
          Error
        </text>
        <rect x="79" y="165" width="20" height="5" rx="2.5" fill="#9DB5D4" />
        <rect x="109" y="165" width="197" height="5" rx="2.5" fill="#D9E5F4" />
        <rect x="79" y="181" width="20" height="5" rx="2.5" fill="#9DB5D4" />
        <rect x="109" y="181" width="170" height="5" rx="2.5" fill="#D9E5F4" />
        <g className="yak-blind-error-log">
          <rect x="79" y="197" width="20" height="5" rx="2.5" fill="#E8A3B0" />
          <rect x="109" y="197" width="208" height="5" rx="2.5" fill="#F1CBD4" />
        </g>
        <rect x="79" y="213" width="20" height="5" rx="2.5" fill="#9DB5D4" />
        <rect x="109" y="213" width="146" height="5" rx="2.5" fill="#D9E5F4" />
      </g>
    </svg>
  );
}
