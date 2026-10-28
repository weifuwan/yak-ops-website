import { useRef, useState, type KeyboardEvent } from 'react';

const industries = [
  { id: 'financial-services', label: 'Financial services' },
  { id: 'healthcare', label: 'Healthcare & life sciences' },
  { id: 'retail', label: 'Retail & commerce' },
  { id: 'manufacturing', label: 'Manufacturing & mobility' },
  { id: 'technology', label: 'Technology & AI' },
] as const;

const financialCustomers = [
  {
    name: 'UnionBank',
    logo: 'summit-recap/union-bank-dark.svg',
    href: 'https://www.getcollate.io/customers/unionbank',
  },
  { name: 'Santander', logo: 'brands/Santander.webp' },
  { name: 'S&P Global', logo: 'industries/logos/sp-global.webp' },
  { name: 'Experian', logo: 'industries/logos/experian.svg' },
] as const;

/**
 * The reference HTML only includes the Financial services panel. Other industry
 * tabs use clearly provisional panels instead of made-up customer case studies.
 * Replace them once their reference assets and copy are supplied.
 */
export default function HomeIndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % industries.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + industries.length) % industries.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = industries.length - 1;
    else return;

    event.preventDefault();
    selectTab(next);
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-12 sm:px-12 lg:px-0 lg:py-20">
        <h2 className="m-0 text-center text-[28px] leading-tight tracking-[0.01em] font-normal text-black sm:text-[40px]">
          The cost of being wrong changes by industry.
        </h2>
        <p className="m-0 mt-3 text-center text-base text-black sm:text-lg">
          So does the context AI needs to get right.
        </p>

        <div
          aria-label="Industries"
          className="mt-8 flex overflow-x-auto overflow-y-hidden overscroll-x-contain border-b border-gray-200 [scrollbar-width:none] md:justify-center"
          role="tablist"
        >
          {industries.map((industry, index) => (
            <button
              aria-controls={`industry-panel-${industry.id}`}
              aria-selected={activeIndex === index}
              className={`-mb-px shrink-0 cursor-pointer whitespace-nowrap border-0 border-b-2 bg-transparent px-4 pb-3 text-sm transition-colors duration-200 ${activeIndex === index ? 'border-[#1268ce] font-semibold text-[#1268ce]' : 'border-transparent text-black hover:text-[#1268ce]'}`}
              id={`industry-tab-${industry.id}`}
              key={industry.id}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              tabIndex={activeIndex === index ? 0 : -1}
              type="button"
            >
              {industry.label}
            </button>
          ))}
        </div>

        {industries.map((industry, index) => (
          <div
            aria-labelledby={`industry-tab-${industry.id}`}
            className="relative mt-8 overflow-hidden rounded-[24px] bg-[#102341]"
            hidden={activeIndex !== index}
            id={`industry-panel-${industry.id}`}
            key={industry.id}
            role="tabpanel"
            tabIndex={0}
          >
            {index === 0 ? (
              <>
                <img
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover object-left"
                  decoding="async"
                  loading="lazy"
                  src="https://www.getcollate.io/images/industries/financial-services.webp"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#102341]/0 from-30% to-[#102341] to-75% md:bg-gradient-to-r" />
                <div className="relative grid grid-cols-1 items-center gap-6 p-4 pb-8 md:grid-cols-[3fr_2fr] md:gap-10 md:p-12">
                  <div className="grid grid-cols-2 gap-3">
                    {financialCustomers.map((customer) => (
                      <div key={customer.name}>
                        {'href' in customer ? (
                          <a
                            aria-label={`${customer.name} customer story`}
                            className="group relative flex h-[88px] items-center justify-center rounded-xl border border-white/60 bg-gradient-to-b from-white/90 to-white/70 px-4 backdrop-blur-sm transition-colors duration-200 hover:border-[#1268ce] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1268ce] md:h-[136px]"
                            href={customer.href}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <img
                              alt={customer.name}
                              className="block max-h-[40px] w-full max-w-[160px] object-contain"
                              decoding="async"
                              loading="lazy"
                              src={`https://www.getcollate.io/images/${customer.logo}`}
                            />
                            <svg
                              aria-hidden="true"
                              className="absolute right-3 bottom-3 text-[#1268ce]"
                              fill="none"
                              height="13"
                              viewBox="0 0 13 13"
                              width="13"
                            >
                              <path
                                d="M4.271.5h7.543m0 0v7.543m0-7.543L.5 11.814"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        ) : (
                          <div className="flex h-[88px] items-center justify-center rounded-xl border border-white/60 bg-gradient-to-b from-white/90 to-white/70 px-4 backdrop-blur-sm md:h-[136px]">
                            <img
                              alt={customer.name}
                              className="block max-h-[40px] w-full max-w-[160px] object-contain"
                              decoding="async"
                              loading="lazy"
                              src={`https://www.getcollate.io/images/${customer.logo}`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-white max-md:px-2">
                    <h3 className="m-0 text-2xl leading-tight font-semibold md:text-[28px]">
                      When every answer needs an audit trail.
                    </h3>
                    <p className="m-0 mt-4 text-base leading-7 md:text-lg">
                      AI must show the data, definitions, policies, and decisions behind it.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid min-h-[350px] grid-cols-1 items-center gap-8 p-8 text-white md:grid-cols-[3fr_2fr] md:p-12">
                <div aria-hidden="true" className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div
                      className="h-[88px] rounded-xl border border-white/30 bg-gradient-to-b from-white/15 to-white/5 md:h-[136px]"
                      key={i}
                    />
                  ))}
                </div>
                <div>
                  <h3 className="m-0 text-2xl leading-tight font-semibold md:text-[28px]">{industry.label}</h3>
                  <p className="m-0 mt-4 text-base leading-7 md:text-lg">
                    Industry-specific context and customer examples will be added here.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
