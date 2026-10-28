/**
 * Screenshot-faithful Collate hero recreation.
 *
 * The original background remains a video (not a screenshot). It is loaded
 * from Collate until the approved asset can be hosted by this website.
 * Copy and CTA destinations are intentionally unchanged for a later pass.
 */
export default function HomeHeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#1f2545] bg-[linear-gradient(105deg,#212642_30%,#093a78_100%)]"
      data-hero-section="true"
    >
      <video
        aria-hidden="true"
        autoPlay
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[50%_20%] motion-reduce:hidden"
        loop
        muted
        playsInline
        preload="auto"
        src="https://www.getcollate.io/images/bg-hero-v2.mp4"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 pt-[112px] pb-16 sm:px-12 sm:pt-[132px] lg:px-24 lg:pt-[146px] lg:pb-[88px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="m-0 text-[44px] leading-[1.1] tracking-[0.01em] font-normal text-white sm:text-[56px] lg:text-[64px]">
              Agentic AI
              <br />
              <span className="text-[#FFE500]">you can trust</span>
            </h1>

            <p className="mt-4 max-w-[400px] text-lg leading-8 text-white">
              Collate is the Agentic Data Platform, built on OpenMetadata. It gives AI the context to get its answers
              right.
            </p>

            <div className="mt-8 flex w-fit flex-row gap-3 whitespace-nowrap sm:gap-4">
              <a
                className="flex cursor-pointer items-center justify-center rounded-[8px] border border-[#FFE500] bg-[#FFE500] px-6 py-3 text-lg font-medium text-black transition-colors duration-200 hover:bg-[#F5D700] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href="/welcome"
                id="hero-try-collate-cta"
                rel="noopener noreferrer"
                target="_blank"
              >
                Try Collate
              </a>
              <a
                className="flex cursor-pointer items-center justify-center rounded-[8px] border border-white bg-transparent px-6 py-3 text-lg font-medium text-white transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href="/contact-sales"
                id="book-demo-cta-benchmark"
                rel="noopener noreferrer"
              >
                Book a Demo
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[600px] lg:mr-0">
            <div className="rounded-2xl border border-white/15 bg-[#0b1935]/70 px-4 pt-7 pb-4 backdrop-blur-md sm:px-7 sm:pt-10 sm:pb-6">
              <p className="m-0 flex items-center justify-center gap-3 text-white sm:gap-5">
                <span className="text-[56px] leading-none font-bold text-[#FFE500] sm:text-[80px]">7x</span>
                <span className="text-[28px] leading-none font-semibold sm:text-[40px]">Fewer Errors</span>
              </p>

              <div className="mt-7 rounded-xl bg-[#07112a]/70 px-4 py-4 sm:mt-9 sm:px-6 sm:py-5">
                <p className="m-0 text-center text-base text-white sm:text-lg">Agent Accuracy</p>

                <div className="mt-3 sm:mt-4">
                  <p className="m-0 text-sm text-white sm:text-base">Opus + Collate</p>
                  <div className="mt-1.5 flex items-center gap-3 sm:gap-4">
                    <div
                      aria-hidden="true"
                      className="h-7 flex-1 overflow-hidden rounded-full bg-white/10 bg-[repeating-linear-gradient(120deg,transparent_0px,transparent_12px,rgba(255,255,255,0.15)_12px,rgba(255,255,255,0.15)_13px)] sm:h-9"
                    >
                      <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#1876D7] to-[#318FF6]" />
                    </div>
                    <span className="w-12 text-right text-lg font-semibold text-white sm:w-16 sm:text-2xl">94%</span>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4">
                  <p className="m-0 text-sm text-white sm:text-base">Opus alone</p>
                  <div className="mt-1.5 flex items-center gap-3 sm:gap-4">
                    <div
                      aria-hidden="true"
                      className="h-7 flex-1 overflow-hidden rounded-full bg-white/10 bg-[repeating-linear-gradient(120deg,transparent_0px,transparent_12px,rgba(255,255,255,0.15)_12px,rgba(255,255,255,0.15)_13px)] sm:h-9"
                    >
                      <div className="h-full w-[59%] rounded-full bg-[#a71d33]" />
                    </div>
                    <span className="w-12 text-right text-lg font-semibold text-white sm:w-16 sm:text-2xl">59%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
