'use client';

import type { ReactNode, SVGProps } from 'react';

import { StatusDot, UseCaseResultSurface } from './shared';
import type { HomeUseCaseDefinition } from './types';

type IconProps = SVGProps<SVGSVGElement>;

function WorkflowsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4 4.5H7M4 10H7M4 15.5H7M9 4.5H17M9 10H17M9 15.5H17"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M2.5 4.5L3.2 5.2L4.7 3.7M2.5 10L3.2 10.7L4.7 9.2M2.5 15.5L3.2 16.2L4.7 14.7"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.45" />
      <path
        d="M10 5.8V10.15L13 12"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.15 5.7C7.15 4.95 7.98 4.49 8.62 4.9L14.2 8.52C14.79 8.9 14.79 9.77 14.2 10.15L8.62 13.77C7.98 14.18 7.15 13.72 7.15 12.97V5.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.5 12H18.5M14.5 8L18.5 12L14.5 16"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A small, intentionally simplified PostgreSQL-style elephant mark.
 * It is kept as line art so the visual remains consistent with the rest
 * of the Yak Ops homepage illustration.
 */
function PostgreSQLIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1744" width="32" height="32">
      <path
        d="M955.99345 610.2c-10-11.4-26.8-8.4-40-5.8-31.4 5.6-65.8 12.2-96.2-1 54.4-86 97.4-179.8 121.4-278.8 8.8-37.6 15.4-76.2 14.2-115-1-21.6-4-44.8-17.2-62.8C905.19345 103.6 857.59345 72 805.19345 58c-65.6-17.8-135.8-12.4-200.2 7.4-5.4 1-10.6-1.4-15.8-2-58.4-11.8-123-7.2-173.6 26.6-60.8-22-126.4-35.2-191.2-28.4C176.19345 66.6 127.79345 89 100.19345 130 65.19345 181.4 60.39345 246.8 65.99345 306.8c11.2 79.6 30.6 158.2 55.4 234.6 16.2 47.6 34.2 95.8 63.2 137.4 14.8 20.4 34.2 41 60.6 44.4 23.4 2.8 44.6-11.6 58.8-28.8 24.8-29.6 50.2-58.8 76.8-87 17.2 8.4 36 13.4 55.2 14.8-10.4 12.4-19 28.4-35.4 33.2-22.2 8.6-48.4 7.4-68 22.2-11.4 8.2-11.8 25.8-1.6 35 18.4 17.8 45.6 21.6 70 23.8 34.6 2.6 69.8-9 96-31.8-0.2 55.2 0 110.4 6.2 165.2 3 32.2 17 64.2 41.4 85.8 23 20 55.8 24.2 85 19.2 28.6-5.4 58.2-14 80.6-33.6 23.8-21 34-52.6 38.6-83.2 8.6-54.6 15-109.2 21.2-164 61.2 10.4 130.6-1.4 176.4-46.2 9.8-9.2 19.2-25 9.6-37.6zM819.99345 91.8c36.8 14 69.4 38.2 94 69 11.6 14.6 13.2 34.4 14 52.4 0.6 43-8.2 85.4-19.2 126.8-21.2 76.6-53.2 149.8-93.4 218-4 6.8-8.4 13.2-13.2 19.4-0.4-1.8-1.2-5.6-1.4-7.6 5-13.2 12.4-25.6 15.2-39.6 10-39.4 1.6-80-2-119.6-3.8-37.4 9-73.8 8.6-111.2 1.4-18.2-5.8-35.6-12.8-52C784.39345 190.6 743.99345 140 691.99345 105.4c-12.6-8.6-26.8-14.8-39.4-23.4 55-11.8 114.2-10.2 167.4 9.8z m-33.6 319c3.2 44.2 16 91.8-4.8 133.8-28-55.6-64.2-108.8-76.8-170.8-3.6-19.8-4.4-44.6 13-58.4 22.2-15.8 51.2-12.2 77-10.6-1.2 35.4-12 70.2-8.4 106zM285.99345 673c-10 11.8-23.6 26-40.8 22.4-20-5.8-32.8-24-43.8-40.4-30.2-48.2-48.2-102.6-65-156.6-18.6-64-34.4-129-43.4-195-4.6-50.2-1.6-104.2 24-149C136.39345 120.6 172.39345 99 209.99345 91.8c60.4-11.6 122.4 0.8 180.4 18.4-25.6 28.2-45.6 61.2-57.2 97.4-15.8 48.4-23 99.8-19.2 150.8 2.2 35.8 1.2 71.8-3.8 107.4-6.2 46.4 12.4 94.2 46.8 125.4-23.4 27.6-48.2 53.8-71 81.8z m53-166.2c-6-26.2 1.8-52.8 2.6-79 2-29.8 0-59.6-0.6-89.4 27.8-18 60.4-32.2 94.2-30.2 17.4 0.8 33.6 13.2 37.8 30.4 15.4 61 20 129-9.2 186.8-10.2 22.4-18.6 45.4-25.8 68.8-48.8 0.4-90.4-41-99-87.4z m152 163.4c-30.6 41.6-92 49.4-136.4 26.8 21.8-10.2 47.4-9.4 68.6-21.8 20.4-11 28.6-35.2 47.6-47.6 20.8-3 36 28 20.2 42.6zM753.99345 621.6c-11.6 18.8-7.6 41.6-10.4 62.4-6.6 58.4-13.2 116.8-22.8 175-4.6 27.8-16.4 57.4-42.6 71.2-27 13.6-58.2 22.2-88.4 17.6-28.8-5-46.8-31.8-55-58-6-21.8-6.6-44.8-8.2-67.2-2.8-54.4-3-108.8-1.6-163.2 1.2-21.2-9.8-43.4-28.6-53.6-9.2-5.2-20-5.8-30.2-6.6 8-40 32.4-74.4 40.8-114.4 10.8-49.4 4.8-100.8-6.2-149.6-5.4-24.4-24-45.8-48.6-51.8-38-9.6-76.2 5.2-110.2 21.2 4.2-55.2 19-111.6 52.8-156.4 24.8-33.4 63.4-55.6 104.4-60.8 67.8-8.6 139.2 10 193 52.4 44.6 35.2 79.8 83 98.8 136.6-31.6-1.2-67.2-2.4-92.8 19.6-23.2 19.6-26.2 52.8-21 80.8 12 66.4 51.2 123 80.2 182.8 7.6 14 18 26.2 27.8 38.8-11.4 5.6-24.4 11.2-31.2 23.2z m81.2 47c-20.8 2.4-42.4 3.2-62.6-3.6 0-11.4-0.6-24.8 8.6-33.4 7.2-5.4 17.6-10.2 25.8-4.4 35.6 18.8 76.8 9.6 114.6 5-23 22.6-55 33-86.4 36.4zM725.99345 323.6c-7.4 6 0.6 15.2 7 18 15.4 9 36.6-3.6 37-21.2-14-6.4-31.4-5.8-44 3.2z m-272.8 28.2c6.6-3.8 13.6-14 6-20-10.8-8.8-26.6-10.4-39.8-7-4.2 1.4-8.8 4.4-7.8 9.6 3 17.6 26.6 28.4 41.6 17.4z"
        p-id="1745"
        fill="#8F8CB6"
      ></path>
    </svg>
  );
}

function TransformIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect x="11.5" y="3.75" width="9" height="8" rx="1.45" stroke="currentColor" strokeWidth="1.55" />
      <rect x="3.75" y="20.25" width="9" height="8" rx="1.45" stroke="currentColor" strokeWidth="1.55" />
      <rect x="19.25" y="20.25" width="9" height="8" rx="1.45" stroke="currentColor" strokeWidth="1.55" />
      <path
        d="M16 11.75V15.5M8.25 20.25V18.05C8.25 16.65 9.4 15.5 10.8 15.5H21.2C22.6 15.5 23.75 16.65 23.75 18.05V20.25"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WarehouseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <ellipse cx="16" cy="7.35" rx="9.4" ry="4" stroke="currentColor" strokeWidth="1.55" />
      <path
        d="M6.6 7.35V23.55C6.6 25.75 10.8 27.55 16 27.55C21.2 27.55 25.4 25.75 25.4 23.55V7.35"
        stroke="currentColor"
        strokeWidth="1.55"
      />
      <path
        d="M6.6 15.3C6.6 17.5 10.8 19.3 16 19.3C21.2 19.3 25.4 17.5 25.4 15.3"
        stroke="currentColor"
        strokeWidth="1.55"
      />
      <path
        d="M6.6 23.25C6.6 25.45 10.8 27.25 16 27.25C21.2 27.25 25.4 25.45 25.4 23.25"
        stroke="currentColor"
        strokeWidth="1.55"
      />
    </svg>
  );
}

function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.8 10.2L8.9 12.3L13.4 7.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle
        cx="10"
        cy="10"
        r="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2.4 3.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WaitingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

interface WorkflowNodeProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconClassName?: string;
}

function WorkflowNode({ icon, title, description, iconClassName = 'text-[#8F8CAD]' }: WorkflowNodeProps) {
  return (
    <div
      style={{ border: '1px solid #DEDEEC' }}
      className="group relative min-w-0 rounded-[13px]
      bg-white/90 px-4 py-4 shadow-[0_1px_1px_rgba(38,39,64,0.02)] transition-transform duration-300 "
    >
      <div className="absolute right-3.5 top-3.5">
        <StatusDot tone="success" />
      </div>

      <div className={iconClassName}>{icon}</div>

      <div className="mt-4 min-w-0">
        <div className="truncate text-[12px] font-semibold leading-none tracking-[-0.01em] text-[#272634]">{title}</div>
        <div className="mt-2.5 truncate text-[10px] leading-none text-[#77768A]">{description}</div>
      </div>
    </div>
  );
}

interface StepRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}

function StepRow({ icon, label, value, valueClassName = 'text-[#77758A]' }: StepRowProps) {
  return (
    <div className="flex min-h-10 items-center gap-3 border-t border-[#E9E8F0] py-2.5 first:border-t-0">
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-[#35333F]">{label}</span>
      <span className={`shrink-0 text-[10px] font-medium ${valueClassName}`}>{value}</span>
    </div>
  );
}

export default function WorkflowsUseCase() {
  return (
    <UseCaseResultSurface>
      <div className="relative h-full min-h-[360px] overflow-hidden bg-[#FFFFFF]">
        {/* Soft lavender ambience from the reference image. */}
        <div className="pointer-events-none absolute -left-24 -top-28 h-64 w-64 rounded-full bg-white/90 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-[#E7EAF8]/80 blur-3xl" />
        <div className="pointer-events-none absolute right-[-9rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full border border-white/55" />
        <div className="pointer-events-none absolute right-[-12rem] top-[8rem] h-[22rem] w-[22rem] rounded-full border border-white/45" />

        <div className="relative flex h-full items-center justify-center p-2">
          <div className="w-full rounded-[18px] border border-[#C9CBDD] bg-white/90 px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-2.5 text-[#747293]">
                <ClockIcon className="h-[17px] w-[17px] shrink-0" />
                <span className="truncate text-[10.5px] font-medium tracking-[-0.01em]">Scheduled · 02:00 daily</span>
              </div>

              <button
                type="button"
                className="flex shrink-0 items-center gap-1.5 rounded-[9px] border border-[#CBCDE0] bg-white/60 px-3 py-2 text-[#64627D] shadow-[0_1px_1px_rgba(43,45,76,0.02)] transition-colors hover:bg-white"
              >
                <PlayIcon className="h-3.5 w-3.5" />
                <span className="text-[10px] font-medium">Run now</span>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)_24px_minmax(0,1fr)] items-center gap-2.5">
              <WorkflowNode
                icon={<PostgreSQLIcon className="h-8 w-8" />}
                title="PostgreSQL"
                description="Read orders"
                iconClassName="text-[#8F8CB6]"
              />

              <div className="flex justify-center">
                <ArrowIcon className="h-5 w-5 text-[#AAA9C6]" />
              </div>

              <WorkflowNode
                icon={<TransformIcon className="h-8 w-8" />}
                title="Transform"
                description="Revenue metrics"
                iconClassName="text-[#F3A04F]"
              />

              <div className="flex justify-center">
                <ArrowIcon className="h-5 w-5 text-[#AAA9C6]" />
              </div>

              <WorkflowNode
                icon={<WarehouseIcon className="h-8 w-8" />}
                title="Warehouse"
                description="Load to warehouse"
                iconClassName="text-[#8F8CB6]"
              />
            </div>

            <div className="mt-6 border-t border-[#E2E3EC] pt-5">
              <div className="flex items-center gap-2 text-[10px]">
                <StatusDot tone="running" />
                <span className="font-semibold text-[#34323E]">Running</span>
                <span className="text-[#AAA8B4]">·</span>
                <span className="text-[#77758A]">Started 02:00</span>
                <span className="hidden text-[#AAA8B4] sm:inline">·</span>
                <span className="hidden text-[#77758A] sm:inline">Duration 3m 24s</span>
                <span className="ml-auto font-medium text-[#65627E]">82%</span>
              </div>

              <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-[#ECECF2]">
                <div className="h-full w-[82%] rounded-full bg-[#F19A4B] shadow-[0_0_0_1px_rgba(225,127,48,0.06)]" />
              </div>

              <div className="mt-4">
                <StepRow
                  icon={<CheckIcon className="h-[17px] w-[17px] text-[#5D9A6B]" />}
                  label="Read data from PostgreSQL"
                  value="1m 12s"
                />
                <StepRow
                  icon={<SpinnerIcon className="h-[17px] w-[17px] text-[#8D89B8] motion-safe:animate-spin" />}
                  label="Transform revenue metrics"
                  value="Processing…"
                  valueClassName="text-[#8581B2]"
                />
                <StepRow
                  icon={<WaitingIcon className="h-[17px] w-[17px] text-[#AAA8BD]" />}
                  label="Load to warehouse"
                  value="Waiting…"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const workflowsUseCase: HomeUseCaseDefinition = {
  id: 'workflows',
  label: 'Workflows',
  prompt:
    'Create a daily revenue workflow. Read orders from PostgreSQL at 02:00, transform revenue metrics, load the warehouse, and retry failed transforms twice.',
  stageColor: '#CBCADB',
  Icon: WorkflowsIcon,
  Result: WorkflowsUseCase,
};
