import type { SVGProps } from 'react';

type ArchitectureIconProps = SVGProps<SVGSVGElement>;

/**
 * Semantic 24px endpoint icons for the homepage architecture.
 * Parent SVG owns the frame, placement and animated connectors.
 */
function IconBase({ children, ...props }: ArchitectureIconProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#91A6C8"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function DatabaseSourceIcon(props: ArchitectureIconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v12.5c0 1.7 3.6 3 8 3s8-1.3 8-3V5.5" />
      <path d="M4 11.5c0 1.7 3.6 3 8 3s8-1.3 8-3M4 16.5c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </IconBase>
  );
}

export function WarehouseSourceIcon(props: ArchitectureIconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 9 12 4l9 5v11H3V9Z" />
      <path d="M7 20v-8h10v8M7 16h10M12 12v8" />
    </IconBase>
  );
}

export function ApplicationSourceIcon(props: ArchitectureIconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
      <circle cx="6.8" cy="6.5" r="0.65" fill="#91A6C8" stroke="none" />
      <circle cx="9.6" cy="6.5" r="0.65" fill="#91A6C8" stroke="none" />
      <rect x="6.5" y="12" width="5" height="5" rx="0.8" />
      <path d="M14.5 12.5h3M14.5 16h3" />
    </IconBase>
  );
}

export function ComputeSourceIcon(props: ArchitectureIconProps) {
  return (
    <IconBase {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="0.7" />
      <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
    </IconBase>
  );
}

export function BusinessTeamsIcon(props: ArchitectureIconProps) {
  return (
    <IconBase {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19v-1.2c0-3.1 2.4-4.8 5.5-4.8s5.5 1.7 5.5 4.8V19H3.5Z" />
      <path d="M16 5.4a3 3 0 0 1 0 5.8M17 13.2c2.3.4 3.5 2 3.5 4.4V19h-3.4" />
    </IconBase>
  );
}

export function AnalyticsBiIcon(props: ArchitectureIconProps) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M7 16.5l3.2-3.6 3 1.8L17 9M14.7 9H17v2.3" />
      <path d="M7 7.5h4" />
    </IconBase>
  );
}

export function DataProductsIcon(props: ArchitectureIconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5 20 8l-8 4.5L4 8l8-4.5Z" />
      <path d="M4 8v9l8 4.5 8-4.5V8M12 12.5v9" />
      <path d="m8 6 8 4.5" />
    </IconBase>
  );
}

export function AiInnovationIcon(props: ArchitectureIconProps) {
  return (
    <IconBase {...props}>
      <path d="m11 3 1.8 6.2L19 11l-6.2 1.8L11 19l-1.8-6.2L3 11l6.2-1.8L11 3Z" />
      <path d="m19 17 .6 1.4L21 19l-1.4.6L19 21l-.6-1.4L17 19l1.4-.6L19 17Z" />
    </IconBase>
  );
}
