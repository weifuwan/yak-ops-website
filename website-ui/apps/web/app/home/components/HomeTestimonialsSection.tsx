import { useEffect, useState } from 'react';

// Keep the source testimonials and assets until the Yak Ops content pass.
const testimonials = [
  {
    name: 'Bonnie Xu',
    role: 'Tech Lead, Data Productivity',
    quote:
      'The hard part is getting the right context, knowing what data exists, what it means, and how it relates to the business. This is where OpenMetadata has been so foundational.',
    person: 'bonnie-xu.webp',
    logo: 'customer-gallery/header/openai-logo.svg',
    company: 'OpenAI',
    logoWidth: 111,
    href: 'https://open-metadata.org/case-study/openai',
  },
  {
    name: 'Angelita Frozza Sanches',
    role: 'Head of Data Platform Engineering',
    quote: 'We all talk about AI, but the real product is not AI. Context is the real product. AI just multiplies it.',
    person: 'angelita-frozza-sanches.webp',
    logo: 'summit/scout24.svg',
    company: 'Scout24',
    logoWidth: 98,
    href: 'https://www.getcollate.io/customers/scout24',
  },
  {
    name: 'Jeppe Johansen',
    role: 'Senior Manager, Data Platform',
    quote:
      "For years our metadata was something people read, not something a system or agent could call. That's the difference between waiting on a review and just shipping.",
    person: 'jeppe-johansen.webp',
    logo: 'summit-recap/unity-dark.svg',
    company: 'Unity',
    logoWidth: 83,
    href: 'https://www.getcollate.io/customers/unity',
  },
] as const;

const slidePositions = ['translate-x-0', '-translate-x-full', '-translate-x-[200%]'] as const;

export default function HomeTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(query.matches);
    syncPreference();
    query.addEventListener('change', syncPreference);
    return () => query.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(interval);
  }, [paused, reducedMotion]);

  return (
    <section
      aria-label="Customer testimonials"
      className="bg-[linear-gradient(90deg,#2e90fa_0%,#b5d8ff_65%)] py-12 md:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-12">
        <h2 className="m-0 text-center text-[28px] leading-tight tracking-[0.01em] font-normal text-black sm:text-[32px]">
          The most advanced AI teams run their agents on us
        </h2>

        <div className="mt-8 rounded-[24px] bg-white/40 p-4 md:mt-10 md:p-2">
          <div aria-roledescription="carousel" className="overflow-hidden rounded-[16px]">
            <div
              className={`flex transition-transform duration-500 ease-in-out motion-reduce:transition-none ${slidePositions[activeIndex]}`}
            >
              {testimonials.map((item, index) => (
                <div
                  aria-hidden={activeIndex !== index}
                  aria-label={`${index + 1} of ${testimonials.length}`}
                  aria-roledescription="slide"
                  className="grid w-full shrink-0 grid-cols-1 bg-[linear-gradient(90deg,#b5d8ff_0%,#eef6fd_100%)] md:grid-cols-[2fr_3fr]"
                  key={item.name}
                  role="group"
                >
                  <div className="relative mt-10 hidden min-h-[280px] md:block">
                    <img
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-contain object-bottom"
                      decoding="async"
                      loading="lazy"
                      src={`https://www.getcollate.io/images/testimonials/${item.person}`}
                    />
                  </div>

                  <div className="flex flex-col justify-start px-6 pt-8 pb-10 md:justify-center md:py-12 md:pr-12 md:pl-0">
                    <p className="m-0 max-w-[540px] text-lg leading-normal text-black italic md:text-xl md:leading-6">
                      “{item.quote}”
                    </p>
                    <div className="mt-5 flex items-center gap-4">
                      <div className="relative h-[120px] w-[88px] shrink-0 md:hidden">
                        <img
                          alt={item.name}
                          className="absolute inset-0 h-full w-full object-contain object-bottom"
                          decoding="async"
                          loading="lazy"
                          src={`https://www.getcollate.io/images/testimonials/${item.person}`}
                        />
                      </div>
                      <div>
                        <p className="m-0 font-semibold text-black md:text-lg">{item.name}</p>
                        <p className="m-0 text-black md:text-lg">{item.role}</p>
                        <div className="mt-3 md:mt-5">
                          <img
                            alt={item.company}
                            className="block h-[30px] max-w-full object-contain object-left"
                            decoding="async"
                            height={30}
                            loading="lazy"
                            src={`https://www.getcollate.io/images/${item.logo}`}
                            width={item.logoWidth}
                          />
                        </div>
                      </div>
                    </div>
                    <a
                      className="mt-6 w-fit rounded-md bg-[#ed4158] px-8 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#dc314b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed4158] md:mt-5 md:px-4 md:py-2 md:text-sm"
                      href={item.href}
                      rel="noopener noreferrer"
                      tabIndex={activeIndex === index ? 0 : -1}
                      target="_blank"
                    >
                      Read the Case Study
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-6 flex justify-center gap-1" role="group" aria-label="Choose a testimonial">
          {testimonials.map((item, index) => (
            <button
              aria-current={activeIndex === index ? 'true' : 'false'}
              aria-label={`Go to testimonial ${index + 1}`}
              className="grid h-6 w-6 cursor-pointer place-items-center rounded-full border-0 bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1265be]"
              key={item.name}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span
                className={`h-3 w-3 rounded-full transition-colors ${activeIndex === index ? 'bg-[#1454a8]' : 'bg-white/75'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
