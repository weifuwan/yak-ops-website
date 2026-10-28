import { useId, type SVGProps } from 'react';

export type CollateArchitectureProps = SVGProps<SVGSVGElement> & {
  /** Optional accessible title. */
  title?: string;
};

/**
 * Editable React SVG recreation of Collate's context-platform diagram.
 * Reconstructed from a screenshot; this is not a verbatim conversion of the source SVG.
 * All labels, nodes, shapes, and connectors are native SVG elements.
 */
export default function CollateArchitecture({
  title = 'Collate agentic data platform architecture',
  className,
  ...props
}: CollateArchitectureProps) {
  const id = useId().replace(/:/g, '');
  const gradient = `${id}-blue-gradient`;
  const shadow = `${id}-shadow`;

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 752"
      width="800"
      height="752"
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

      {/* External agents */}
      <text x="16" y="50" fontFamily="Arial, sans-serif" fontSize="16" fill="#111118">
        External Agents
      </text>
      <text x="630" y="91" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#82839C">
        MCP, AI SDK
      </text>
      {([265, 328, 390, 453, 515] as const).map((x, i) => (
        <g key={x}>
          <rect x={x - 17} y="25" width="34" height="34" rx="5" fill="#FFFFFF" stroke="#E2E6F6" />
          <text x={x} y="48" textAnchor="middle" fontSize="21" fontFamily="Arial, sans-serif" fill="#B5BBD0">
            {['✺', '✳', '⬡', '❀', '▥'][i]}
          </text>
          <path d={`M${x} 70v32`} stroke="#5D6584" strokeDasharray="2 4" strokeWidth="1.4" />
          <path d={`M${x} 70v9`} stroke="#1685F8" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}

      {/* Collate layer */}
      <rect x="16" y="111" width="768" height="270" rx="12" fill="#D3E4F8" stroke="#087CFF" strokeWidth="1.7" />
      <g transform="translate(38 135)" fill="none" stroke="#00A0FF" strokeWidth="2.3" strokeLinejoin="round">
        <path d="M0 5 8 0 16 5 8 10zM0 11l8 5 8-5M0 16l8 5 8-5" />
      </g>
      <text
        x="64"
        y="153"
        fontSize="19"
        letterSpacing="2.3"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        fill="#1F2A4B"
      >
        COLLATE
      </text>
      <text x="175" y="153" fontSize="16" fontFamily="Arial, sans-serif" fill="#101116">
        The Agentic Data Platform
      </text>
      <text
        x="400"
        y="184"
        textAnchor="middle"
        fontSize="13"
        fontStyle="italic"
        fontFamily="Arial, sans-serif"
        fill="#777D97"
      >
        Continuous learning powered by shared memory
      </text>

      <rect x="38" y="199" width="339" height="81" rx="11" fill={`url(#${gradient})`} />
      <text
        x="207"
        y="233"
        fontSize="17"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        textAnchor="middle"
        fill="white"
      >
        Build custom agents
      </text>
      <text x="207" y="256" fontSize="14" fontFamily="Arial, sans-serif" textAnchor="middle" fill="white">
        AI Studio | Skills | Plugins
      </text>
      <path d="M387 240h18" stroke="#1989F7" strokeWidth="3" strokeLinecap="round" />
      <path d="M411 240h12" stroke="#727F9A" strokeDasharray="2 4" />
      <rect x="426" y="199" width="339" height="81" rx="11" fill={`url(#${gradient})`} />
      <text
        x="595"
        y="226"
        fontSize="17"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        textAnchor="middle"
        fill="white"
      >
        Collate agents
      </text>
      <text x="595" y="247" fontSize="13.5" fontFamily="Arial, sans-serif" textAnchor="middle" fill="white">
        AI Automations | Description Agent
      </text>
      <text x="595" y="265" fontSize="13.5" fontFamily="Arial, sans-serif" textAnchor="middle" fill="white">
        Tiering Agent | Quality Agent | AI Analytics
      </text>
      <text
        x="400"
        y="302"
        fontSize="13"
        fontStyle="italic"
        fontFamily="Arial, sans-serif"
        textAnchor="middle"
        fill="#7C839A"
      >
        Automated by Collate agents
      </text>
      {[
        { x: 38, w: 240, label: 'Governance & lineage' },
        { x: 292, w: 220, label: 'Data quality & observability' },
        { x: 526, w: 239, label: 'Connectivity & security' },
      ].map((item) => (
        <g key={item.label}>
          <rect x={item.x} y="317" width={item.w} height="41" rx="11" fill="#FFF" stroke="#EBEFF8" strokeWidth="2" />
          <text
            x={item.x + item.w / 2}
            y="342"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="13.5"
            fill="#161616"
          >
            {item.label}
          </text>
        </g>
      ))}

      {/* Between layers */}
      {[274, 527].map((x) => (
        <g key={x}>
          <path d={`M${x} 386v42`} stroke="#8890AC" strokeDasharray="2 4" strokeWidth="1.6" />
          <path d={`M${x} 386v12`} stroke="#1685F8" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}

      {/* OpenMetadata layer */}
      <rect x="16" y="430" width="768" height="220" rx="12" fill="#E5DFFC" stroke="#7F46FF" strokeWidth="1.8" />
      <g transform="translate(40 451)" stroke="#8557E8" strokeWidth="4" fill="none" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="11" ry="5" />
        <path d="M1 5v19q11 12 22 0V5M1 15q11 9 22 0M12 18v10" />
      </g>
      <text x="76" y="465" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#8254F5">
        Open
      </text>
      <text x="76" y="484" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#8254F5">
        Metadata
      </text>
      <text x="173" y="475" fontFamily="Arial, sans-serif" fontSize="16" fill="#141414">
        The Open Context Platform | Apache 2.0
      </text>

      {[
        { x: 38, title: 'Metadata', line1: 'Schemas  |  Usage', icon: 'metadata' },
        { x: 296, title: 'Meaning', line1: 'Semantics  |  Ontology', line2: 'Knowledge graph', icon: 'meaning' },
        { x: 554, title: 'Memory', line1: 'History  |  Feedback loops', icon: 'memory' },
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
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="18"
            fill="#111"
          >
            {item.title}
          </text>
          <text
            x={item.x + 103.5}
            y="605"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="13.5"
            fill="#111"
          >
            {item.line1}
          </text>
          {item.line2 && (
            <text
              x={item.x + 103.5}
              y="622"
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize="13.5"
              fill="#111"
            >
              {item.line2}
            </text>
          )}
        </g>
      ))}
      {[271, 529].map((x) => (
        <g key={x}>
          <path d={`M${x - 14} 566h26`} stroke="#8186AA" strokeDasharray="2 4" strokeWidth="1.2" />
          <path d={`M${x} 566h16`} stroke="#148BFF" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}

      {/* Data systems */}
      <text x="16" y="692" fontSize="16" fontFamily="Arial, sans-serif" fill="#111">
        Data &amp; Semantic
      </text>
      <text x="16" y="712" fontSize="16" fontFamily="Arial, sans-serif" fill="#111">
        Sources, Systems
      </text>
      <text x="16" y="732" fontSize="16" fontFamily="Arial, sans-serif" fill="#111">
        of Knowledge
      </text>
      {([234, 289, 344, 399, 454, 509, 564] as const).map((x, i) => (
        <g key={x}>
          <path d={`M${x} 658v29`} stroke="#858BAB" strokeDasharray="2 4" strokeWidth="1.3" />
          <path d={`M${x} 658v10`} stroke="#1685F8" strokeWidth="3" strokeLinecap="round" />
          <rect
            x={x - 17}
            y="701"
            width="34"
            height="34"
            rx="5"
            fill="white"
            stroke="#E3E9F6"
            filter={`url(#${shadow})`}
          />
          <text x={x} y="725" fontFamily="Arial, sans-serif" fontSize="22" fill="#AEB6CE" textAnchor="middle">
            {['▱', '❄', '▲', '▣', '✣', '☁', '♧'][i]}
          </text>
        </g>
      ))}
    </svg>
  );
}
