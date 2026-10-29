import { useRef, useState, type KeyboardEvent } from 'react';

const industries = [
  {
    id: 'financial-services',
    label: 'Financial Services',
    title: "Financial data can't afford to arrive late.",
    description: 'Keep transaction, account, and reporting data synchronized, with clear visibility into every task.',
    scenes: ['Transaction Data', 'Core Databases', 'Risk Reporting', 'Data Operations'],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    title: "Disconnected systems shouldn't mean disconnected data.",
    description: 'Connect clinical and operational data workflows, and make synchronization easier to manage.',
    scenes: ['Clinical Records', 'Hospital Systems', 'Operational Data', 'Reporting'],
  },
  {
    id: 'retail',
    label: 'Retail & Commerce',
    title: 'Orders move fast. Your data should keep up.',
    description: 'Synchronize orders, inventory, and sales data to support faster reporting and daily operations.',
    scenes: ['Orders', 'Inventory', 'Sales Data', 'Analytics'],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    title: 'Production visibility starts with connected data.',
    description: 'Bring production, inventory, and supply chain data into manageable workflows.',
    scenes: ['Production', 'Inventory', 'Supply Chain', 'Operations'],
  },
  {
    id: 'technology',
    label: 'Technology',
    title: "More services shouldn't mean more data chaos.",
    description: 'Connect databases, manage synchronization workflows, and monitor execution from one place.',
    scenes: ['Databases', 'Data Pipelines', 'Job Monitoring', 'Data Services'],
  },
] as const;

/**
 * Industry scenarios, not customer endorsements or claims of certified
 * industry solutions. All five tabs use the same business-first layout.
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
          Different industries. One need: reliable data.
        </h2>
        <p className="m-0 mt-3 text-center text-base text-black sm:text-lg">
          Connect systems, build data workflows, and keep them running.
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
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_70%,rgba(23,111,210,0.52),transparent_58%)]"
            />
            <div className="relative grid min-h-[350px] grid-cols-1 items-center gap-6 p-4 pb-8 md:grid-cols-[3fr_2fr] md:gap-10 md:p-12">
              <div className="grid grid-cols-2 gap-3" aria-label={`${industry.label} data scenarios`}>
                {industry.scenes.map((scene) => (
                  <div
                    className="flex h-[88px] items-center justify-center rounded-xl border border-white/60 bg-gradient-to-b from-white/95 to-[#E1EAF5]/95 px-4 text-center text-[15px] font-semibold leading-snug text-[#243752] shadow-sm md:h-[136px] md:text-[17px]"
                    key={scene}
                  >
                    {scene}
                  </div>
                ))}
              </div>
              <div className="text-white max-md:px-2">
                <h3 className="m-0 text-2xl leading-tight font-semibold md:text-[28px]">{industry.title}</h3>
                <p className="m-0 mt-4 text-base leading-7 text-[#E4EDF9] md:text-lg">{industry.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
