import type { HTMLAttributes } from 'react';

import YakOpsProductPanorama from './YakOpsProductPanorama';

export type ContextPlatformSectionProps = HTMLAttributes<HTMLElement>;

export default function ContextPlatformSection({ className = '', ...props }: ContextPlatformSectionProps) {
  return (
    <section
      aria-labelledby="yak-ops-platform-heading"
      className={['bg-[#F3F4FB]', className].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-12 sm:py-12 lg:px-20 lg:py-14">
        <h2
          className="m-0 mx-auto max-w-[850px] text-center text-[28px] leading-tight tracking-[0.01em] font-normal text-[#171B2C] sm:text-[40px]"
          id="yak-ops-platform-heading"
        >
          One platform. From data integration to operations.
        </h2>
        <p className="m-0 mx-auto mt-3 max-w-[680px] text-center text-base leading-7 text-[#536079]">
          Connect data, build workflows, and deliver trusted data—all in one place.
        </p>

        <div className="mx-auto mt-6 max-w-[860px] sm:mt-8">
          <YakOpsProductPanorama />
        </div>

        <p className="m-0 mx-auto mt-4 max-w-[720px] text-center text-xs leading-5 text-[#7A8499]">
          Product direction. Check the{' '}
          <a
            className="text-[#2F6FED] underline underline-offset-4 hover:text-[#174EAB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F6FED]"
            href="https://github.com/weifuwan/yak-ops/releases"
            rel="noopener noreferrer"
            target="_blank"
          >
            release notes
          </a>{' '}
          for current availability.
        </p>
      </div>
    </section>
  );
}
