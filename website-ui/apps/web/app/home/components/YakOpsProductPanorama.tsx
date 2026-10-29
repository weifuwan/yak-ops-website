import { useEffect, useState } from 'react';

type FlowConnectorProps = {
  x: number;
  startY: number;
  endY: number;
  phaseSeconds: number;
  reducedMotion: boolean;
};

const SOURCE_NAMES = ['Databases', 'Data Warehouses', 'Applications', 'Compute Platforms'] as const;
const CONSUMER_NAMES = ['Business Teams', 'Analytics & BI', 'Data Products', 'AI & Innovation'] as const;
const CONNECTOR_CENTERS = [130, 310, 490, 670] as const;
const CAPABILITY_CENTERS = [255, 390, 530, 675] as const;
const ROW_CENTERS = [188, 243, 298] as const;

const CAPABILITY_ROWS = [
  {
    name: 'Develop',
    color: '#2468CB',
    items: ['Data Integration', 'Intelligent Modeling', 'Data Development', 'Data Services'],
  },
  {
    name: 'Govern',
    color: '#7652B5',
    items: ['Data Quality', 'Data Assets', 'Data Lineage', 'Data Standards'],
  },
  {
    name: 'Operations Center',
    color: '#28738C',
    items: ['Scheduling', 'Monitoring', 'Diagnostics', 'Recovery'],
  },
] as const;

/**
 * Keep the dotted guide stationary while a single blue dash travels along it.
 * Reduced-motion users see the dash without animation.
 */
function FlowConnector({ x, startY, endY, phaseSeconds, reducedMotion }: FlowConnectorProps) {
  const path = `M${x} ${startY}V${endY}`;

  return (
    <g fill="none">
      <path d={path} stroke="#9AABC7" strokeDasharray="2 5" strokeWidth="1.4" />
      <path
        d={path}
        pathLength={100}
        stroke="#2F6FED"
        strokeDasharray="22 178"
        strokeDashoffset="-40"
        strokeLinecap="round"
        strokeWidth="3"
      >
        {!reducedMotion && (
          <animate
            attributeName="stroke-dashoffset"
            begin={`-${phaseSeconds.toFixed(2)}s`}
            dur="1.8s"
            from="25"
            repeatCount="indefinite"
            to="-100"
          />
        )}
      </path>
    </g>
  );
}

/**
 * A compact business-facing view of Yak Ops: data sources flow into the
 * platform's development, governance, and operations capabilities, then out
 * to the teams and products that use the data.
 */
export default function YakOpsProductPanorama() {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <svg
      aria-labelledby="yak-ops-panorama-title"
      className="block h-auto w-full"
      role="img"
      viewBox="0 0 800 490"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="yak-ops-panorama-title">Yak Ops data platform overview</title>

      <text x="24" y="22" fill="#7A8499" fontSize="11" fontWeight="700" letterSpacing="1.2">
        DATA SOURCES
      </text>

      {SOURCE_NAMES.map((name, index) => (
        <g key={name}>
          <text x={CONNECTOR_CENTERS[index]} y="56" fill="#263653" fontSize="13.5" fontWeight="600" textAnchor="middle">
            {name}
          </text>
          <FlowConnector
            x={CONNECTOR_CENTERS[index]}
            startY={68}
            endY={100}
            phaseSeconds={index * 0.23}
            reducedMotion={reducedMotion}
          />
        </g>
      ))}

      <rect x="24" y="103" width="752" height="237" rx="14" fill="#EDF4FF" stroke="#2F6FED" strokeWidth="1.6" />

      <g transform="translate(43 121)" fill="none" stroke="#2F6FED" strokeLinejoin="round" strokeWidth="2">
        <path d="m0 4 8-4 8 4-8 4z" />
        <path d="m0 9 8 4 8-4M0 14l8 4 8-4" />
      </g>
      <text x="67" y="139" fill="#172B52" fontSize="18" fontWeight="800" letterSpacing="1.4">
        YAK OPS
      </text>
      <path d="M153 119v24" stroke="#B7C7DF" strokeWidth="1.2" />
      <text x="171" y="136" fill="#4B5E7D" fontSize="14">
        Unified Data Platform
      </text>
      <path d="M43 158H757" stroke="#D2DFF2" strokeWidth="1.2" />

      <path d="M42 215H758M42 270H758" stroke="#D2DFF2" strokeWidth="1.1" />
      <path d="M190 171V322" stroke="#D2DFF2" strokeWidth="1.1" />

      {CAPABILITY_ROWS.map((row, rowIndex) => (
        <g key={row.name}>
          <text
            x="47"
            y={ROW_CENTERS[rowIndex] + 5}
            fill={row.color}
            fontSize={row.name === 'Operations Center' ? '13.5' : '15'}
            fontWeight="700"
          >
            {row.name}
          </text>
          {row.items.map((item, itemIndex) => (
            <text
              key={item}
              x={CAPABILITY_CENTERS[itemIndex]}
              y={ROW_CENTERS[rowIndex] + 4}
              fill="#263653"
              fontSize="13.2"
              fontWeight="500"
              textAnchor="middle"
            >
              {item}
            </text>
          ))}
        </g>
      ))}

      {CONSUMER_NAMES.map((name, index) => (
        <g key={name}>
          <FlowConnector
            x={CONNECTOR_CENTERS[index]}
            startY={343}
            endY={412}
            phaseSeconds={0.16 + index * 0.21}
            reducedMotion={reducedMotion}
          />
          <text
            x={CONNECTOR_CENTERS[index]}
            y="438"
            fill="#263653"
            fontSize="13.5"
            fontWeight="600"
            textAnchor="middle"
          >
            {name}
          </text>
        </g>
      ))}

      <text x="24" y="480" fill="#7A8499" fontSize="11" fontWeight="700" letterSpacing="1.2">
        BUSINESS &amp; DATA CONSUMERS
      </text>
    </svg>
  );
}
