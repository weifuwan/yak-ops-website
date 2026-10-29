import { useEffect, useId, useState, type SVGProps } from 'react';

export type YakOpsArchitectureProps = SVGProps<SVGSVGElement> & {
  /** Optional accessible title. */
  title?: string;
};

type FlowConnectorProps = {
  d: string;
  reversed?: boolean;
  phaseSeconds?: number;
  reducedMotion: boolean;
};

/**
 * Keep the dotted guide stationary while a single blue dash travels along it.
 * A 200-unit dash pattern avoids a second dash appearing before the first exits.
 * With reduced motion, the centered dash remains visible without an animation.
 */
function FlowConnector({ d, reversed = false, phaseSeconds = 0, reducedMotion }: FlowConnectorProps) {
  return (
    <g fill="none">
      <path d={d} stroke="#858BAB" strokeWidth="1.4" strokeDasharray="2 4" />
      <path
        d={d}
        pathLength={100}
        stroke="#2F6FED"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="30 170"
        strokeDashoffset="-35"
      >
        {!reducedMotion && (
          <animate
            attributeName="stroke-dashoffset"
            from={reversed ? '-100' : '30'}
            to={reversed ? '30' : '-100'}
            dur="1.33s"
            begin={`-${phaseSeconds.toFixed(2)}s`}
            repeatCount="indefinite"
          />
        )}
      </path>
    </g>
  );
}

/**
 * Yak Ops business architecture adapted from the previous CollateArchitecture
 * SVG composition. Keep its two-layer geometry and animated flow connectors.
 */
export default function YakOpsArchitecture({
  title = 'Yak Ops data platform architecture',
  className,
  ...props
}: YakOpsArchitectureProps) {
  const id = useId().replace(/:/g, '');
  const gradient = `${id}-blue-gradient`;
  const shadow = `${id}-shadow`;
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 758"
      width="800"
      height="758"
      role="img"
      aria-label={title}
      className={`block h-auto w-full ${className ?? ''}`}
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1878E6" />
          <stop offset="1" stopColor="#10549E" />
        </linearGradient>
        <filter id={shadow} x="-20%" y="-30%" width="140%" height="170%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#9DA8C7" floodOpacity="0.19" />
        </filter>
      </defs>


      {/* External data systems: deliberately light-weight around the two layers. */}
      <text x="16" y="49" fontSize="16" fill="#161B30">
        Data Sources
      </text>
      {([
        { x: 255, name: 'Databases', icon: '▤' },
        { x: 380, name: 'Warehouses', icon: '▥' },
        { x: 505, name: 'Applications', icon: '◇' },
        { x: 630, name: 'Compute', icon: '✣' },
      ] as const).map((item, index) => (
        <g key={item.name}>
          <rect
            x={item.x - 17}
            y="21"
            width="34"
            height="34"
            rx="5"
            fill="#FFFFFF"
            stroke="#E2E6F6"
            filter={`url(#${shadow})`}
          />
          <text x={item.x} y="45" textAnchor="middle" fontSize="22" fill="#AEB6CE">
            {item.icon}
          </text>
          <text x={item.x} y="78" textAnchor="middle" fontSize="12.5" fill="#40516E">
            {item.name}
          </text>
          <FlowConnector
            d={`M${item.x} 84v19`}
            reversed={index % 2 === 0}
            phaseSeconds={index * 0.23}
            reducedMotion={reducedMotion}
          />
        </g>
      ))}


      {/* Product layer: preserve the old layout of two large blue cards and three small supporting cards. */}
      <rect x="16" y="111" width="768" height="270" rx="12" fill="#D3E4F8" stroke="#2F6FED" strokeWidth="1.7" />
      <g transform="translate(38 135)" fill="none" stroke="#0099F5" strokeWidth="2.3" strokeLinejoin="round">
        <path d="M0 5 8 0 16 5 8 10zM0 11l8 5 8-5M0 16l8 5 8-5" />
      </g>
      <text x="64" y="153" fontSize="19" letterSpacing="2" fontWeight="800" fill="#1F2A4B">
        YAK OPS
      </text>
      <text x="188" y="153" fontSize="16" fill="#161B30">
        Unified Data Platform
      </text>

      <rect x="38" y="190" width="339" height="91" rx="11" fill={`url(#${gradient})`} />
      <text x="207" y="227" fontSize="17" fontWeight="700" textAnchor="middle" fill="white">
        Data Integration
      </text>
      <text x="207" y="252" fontSize="14" textAnchor="middle" fill="white">
        Batch &amp; Real-time Sync
      </text>
      <FlowConnector d="M387 236h36" phaseSeconds={0.32} reducedMotion={reducedMotion} />
      <rect x="426" y="190" width="339" height="91" rx="11" fill={`url(#${gradient})`} />
      <text x="595" y="227" fontSize="17" fontWeight="700" textAnchor="middle" fill="white">
        Data Development
      </text>
      <text x="595" y="252" fontSize="14" textAnchor="middle" fill="white">
        Pipelines &amp; Workflows
      </text>

      {[
        { x: 38, w: 240, label: 'Intelligent Modeling' },
        { x: 292, w: 220, label: 'Data Services' },
        { x: 526, w: 239, label: 'Workflow Orchestration' },
      ].map((item) => (
        <g key={item.label}>
          <rect x={item.x} y="309" width={item.w} height="49" rx="11" fill="#FFF" stroke="#EBEFF8" strokeWidth="2" />
          <text x={item.x + item.w / 2} y="339" textAnchor="middle" fontWeight="700" fontSize="14" fill="#172B52">
            {item.label}
          </text>
        </g>
      ))}

      {/* Between layers */}
      {[274, 527].map((x, i) => (
        <FlowConnector
          key={x}
          d={`M${x} 386v42`}
          reversed={i === 0}
          phaseSeconds={i === 0 ? 0.18 : 0.77}
          reducedMotion={reducedMotion}
        />
      ))}


      {/* Governance and operations layer, using the original lilac cards and icons. */}
      <rect x="16" y="430" width="768" height="220" rx="12" fill="#E5DFFC" stroke="#7F46FF" strokeWidth="1.8" />
      <g transform="translate(40 449)" fill="none" stroke="#8557E8" strokeWidth="2.3" strokeLinejoin="round">
        <path d="M0 5 8 0 16 5 8 10zM0 11l8 5 8-5M0 16l8 5 8-5" />
      </g>
      <text x="73" y="476" fontSize="17" fontWeight="700" fill="#6941A5">
        Governance &amp; Operations
      </text>

      {[
        { x: 38, title: 'Data Quality', line1: 'Rules  |  Standards', icon: 'metadata' },
        { x: 296, title: 'Data Assets', line1: 'Catalog  |  Lineage', icon: 'meaning' },
        { x: 554, title: 'Operations Center', line1: 'Scheduling  |  Monitoring', icon: 'memory' },
      ].map((item) => (
        <g key={item.title}>
          <rect x={item.x} y="504" width="207" height="124" rx="11" fill="#F8FAFF" stroke="#E8EBFC" strokeWidth="2" />
          {item.icon === 'metadata' && (
            <g stroke="#834AFF" strokeWidth="2" fill="none">
              <path d={`M${item.x + 103} 529v28m-16-14 16-14 16 14-16 14-16-14 32 0-16 14-16-14`} />
              {[
                [103, 529],
                [87, 543],
                [119, 543],
                [103, 557],
                [87, 557],
                [119, 557],
              ].map(([dx, y]) => (
                <circle key={`${dx}-${y}`} cx={item.x + dx} cy={y} r="3.4" fill="#F8FAFF" />
              ))}
            </g>
          )}
          {item.icon === 'meaning' && (
            <g stroke="#834AFF" strokeWidth="2.2" strokeLinejoin="round" fill="none">
              <path d={`M${item.x + 91} 529h16l13 13-12 12-18-18z`} />
              <circle cx={item.x + 98} cy="536" r="2" />
              <path d={`M${item.x + 94} 523h15l13 12`} />
            </g>
          )}
          {item.icon === 'memory' && (
            <g stroke="#834AFF" strokeWidth="2.2" fill="none" strokeLinecap="round">
              <path d={`M${item.x + 91} 535a14 14 0 1 1-3 12`} />
              <path d={`M${item.x + 89} 534v10h10M${item.x + 103} 533v10l7 4`} />
            </g>
          )}
          <text
            x={item.x + 103.5}
            y="582"
            textAnchor="middle"

            fontWeight="700"
            fontSize={item.title === 'Operations Center' ? '16' : '18'}
            fill="#111"
          >
            {item.title}
          </text>
          <text
            x={item.x + 103.5}
            y="605"
            textAnchor="middle"

            fontSize="13.5"
            fill="#111"
          >
            {item.line1}
          </text>

        </g>
      ))}
      {[271, 529].map((x, i) => (
        <FlowConnector
          key={x}
          d={`M${x - 14} 566h30`}
          reversed={i === 0}
          phaseSeconds={i === 0 ? 0.4 : 0.85}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Business outcomes. Keep endpoint labels outside the platform panels. */}
      <text x="16" y="698" fontSize="15" fill="#161B30">
        Business &amp; Data
      </text>
      <text x="16" y="719" fontSize="15" fill="#161B30">
        Consumers
      </text>
      {([
        { x: 248, name: 'Business Teams', icon: '▣' },
        { x: 380, name: 'Analytics & BI', icon: '◈' },
        { x: 512, name: 'Data Products', icon: '▤' },
        { x: 644, name: 'AI & Innovation', icon: '✳' },
      ] as const).map((item, index) => (
        <g key={item.name}>
          <FlowConnector
            d={`M${item.x} 656v31`}
            reversed={index % 2 === 1}
            phaseSeconds={index * 0.2}
            reducedMotion={reducedMotion}
          />
          <rect
            x={item.x - 16}
            y="695"
            width="32"
            height="32"
            rx="5"
            fill="#FFFFFF"
            stroke="#E3E9F6"
            filter={`url(#${shadow})`}
          />
          <text x={item.x} y="718" fontSize="20" fill="#AEB6CE" textAnchor="middle">
            {item.icon}
          </text>
          <text x={item.x} y="748" textAnchor="middle" fontSize="12.5" fill="#40516E">
            {item.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
