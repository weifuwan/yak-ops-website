import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type DocsCatalogCardProps = {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
  headingId?: string;
};

export default function DocsCatalogCard({ to, title, description, icon, headingId }: DocsCatalogCardProps) {
  return (
    <Link
      className="group flex min-h-[136px] items-start gap-4 rounded-2xl bg-white px-6 py-5 text-[#1D2939] no-underline shadow-[0_5px_14px_rgba(15,23,42,0.09)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_15px_28px_rgba(15,23,42,0.17)] focus-visible:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] motion-reduce:transform-none motion-reduce:transition-none"
      to={to}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#2675DB]">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block scroll-mt-[190px] text-[16px] leading-6 font-semibold text-[#1D2939]" id={headingId}>
          {title}
        </span>
        <span className="mt-1 block text-[15px] leading-6 text-[#667085]">{description}</span>
      </span>
    </Link>
  );
}
