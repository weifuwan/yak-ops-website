import type { ReactNode } from 'react';

const STATUS_STYLES = {
  success: 'bg-[#4D7C5B]',
  running: 'bg-[#C96442]',
  neutral: 'bg-[#9C9A92]',
} as const;

export function StatusDot({ tone }: { tone: keyof typeof STATUS_STYLES }) {
  return <span aria-hidden="true" className={`inline-block h-2 w-2 rounded-full ${STATUS_STYLES[tone]}`} />;
}

export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-[#F5F4ED] px-3 py-2.5">
      <div className="text-[15px] font-medium text-[#181817]">{value}</div>
      <div className="mt-1 text-[9px] text-[#73726C]">{label}</div>
    </div>
  );
}

export function UseCaseResultSurface({ children }: { children: ReactNode }) {
  return (
    <div className="aspect-[5/4] w-full overflow-hidden rounded-xl bg-white">
      <div className="h-full min-h-0">{children}</div>
    </div>
  );
}
