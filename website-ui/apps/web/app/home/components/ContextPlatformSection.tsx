import type { HTMLAttributes } from 'react';

import CollateArchitecture from './CollateArchitecture';

export interface ContextPlatformSectionProps extends HTMLAttributes<HTMLElement> {
  ontologyHref?: string;
  productHref?: string;
}

export default function ContextPlatformSection({
  ontologyHref = '/blog/ground-your-ai-in-standards-based-knowledge-with-ontology-explorer',
  productHref = '/product',
  className = '',
  ...props
}: ContextPlatformSectionProps) {
  return (
    <section className={`bg-[#F3F4FB] ${className}`} {...props}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-12 lg:px-24 lg:py-16">
        <h2 className="text-center text-[28px] leading-tight tracking-[0.01em] font-normal text-black sm:text-[40px]">
          One platform. From data integration to operations.
        </h2>

        <p className="mx-auto mt-4 max-w-[600px] text-center text-base leading-6 text-black">
          Connect sources, build pipelines, orchestrate workflows, and monitor execution—all in one place.
        </p>

        {/* Architecture diagram */}
        <div className="mx-auto mt-8 max-w-[800px]">
          <CollateArchitecture />
        </div>

        {/* Ontology information */}
        <div className="mx-auto mt-6 flex max-w-[820px] flex-col gap-2 rounded-md border border-[#1680F8] bg-white px-3 py-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              aria-hidden="true"
              className="shrink-0 text-[#1680F8]"
            >
              <circle cx="5.6" cy="6.7" r="3.1" />
              <circle cx="19.6" cy="7.3" r="2.9" />
              <circle cx="12.6" cy="17.8" r="3.45" fill="currentColor" stroke="none" />
              <path d="m8.7 6.83 8 .35M7.25 9.32l5.35 8.48m5.39-8.09L12.6 17.8" />
            </svg>

            <p className="text-sm text-black md:text-base">
              An Ontology links business terms to the data assets they describe.
            </p>
          </div>

          <a
            href={ontologyHref}
            rel="noopener noreferrer"
            className="whitespace-nowrap text-base font-semibold text-[#1680F8] hover:underline sm:ml-auto"
          >
            Discover Ontology Explorer →
          </a>
        </div>

        <p className="mt-8 text-center text-base text-black">
          Learn more about the{' '}
          <a href={productHref} rel="noopener noreferrer" className="text-[#1680F8] hover:underline">
            Collate Agentic Data Platform
          </a>
        </p>
      </div>
    </section>
  );
}
