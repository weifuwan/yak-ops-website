/**
 * Yak Ops homepage hero, based on the existing Collate visual reference.
 *
 * The original background video is retained until a Yak Ops-specific asset
 * is ready. The right-hand comparison presents the measured 4× time advantage.
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
          <div className="min-w-0">
            <h1 className="m-0 text-[44px] leading-[1.1] font-normal tracking-[-0.025em] text-white sm:text-[56px] lg:text-[64px]">
              <span className="block">Big Data.</span>
              <span className="block text-[#FFE500]">Under Control.</span>
            </h1>

            <p className="mt-6 max-w-[510px] text-[17px] leading-[1.65] text-white/95 sm:text-lg">
              Yak Ops is an open-source big data development and governance platform. It makes it easier to turn raw
              data into reliable, usable data.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[8px] border border-[#FFE500] bg-[#FFE500] px-5 py-3 text-base font-medium text-black no-underline transition-colors duration-200 hover:border-[#F5D700] hover:bg-[#F5D700] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6 sm:text-lg"
                href="/docs"
                id="hero-get-started-cta"
              >
                Get Started
              </a>
              <a
                className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[8px] border border-white bg-transparent px-5 py-3 text-base font-medium text-white no-underline transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6 sm:text-lg"
                href="https://github.com/weifuwan/yak-ops"
                id="hero-view-github-cta"
                rel="noopener noreferrer"
                target="_blank"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[600px] lg:mr-0">
            <div className="rounded-2xl border border-white/15 bg-[#0b1935]/70 px-4 pt-7 pb-4 backdrop-blur-md sm:px-7 sm:pt-10 sm:pb-6">
              <p className="m-0 flex items-center justify-center gap-3 text-white sm:gap-5">
                <span className="shrink-0 text-[48px] leading-none font-bold text-[#FFE500] sm:text-[80px]">4×</span>
                <span className="whitespace-nowrap text-[23px] leading-none font-semibold sm:text-[36px]">
                  Faster Delivery
                </span>
              </p>

              <div className="mt-7 rounded-xl bg-[#07112a]/70 px-4 py-4 sm:mt-9 sm:px-6 sm:py-5">
                <p className="m-0 text-center text-base font-medium text-white sm:text-lg">
                  Relative Delivery Time
                </p>

                <div className="mt-3 sm:mt-4">
                  <p className="m-0 text-sm text-white sm:text-base">Traditional Approach</p>
                  <div className="mt-1.5 flex items-center gap-3 sm:gap-4">
                    <div
                      aria-hidden="true"
                      className="h-7 flex-1 overflow-hidden rounded-full bg-white/10 bg-[repeating-linear-gradient(120deg,transparent_0px,transparent_12px,rgba(255,255,255,0.15)_12px,rgba(255,255,255,0.15)_13px)] sm:h-9"
                    >
                      <div className="h-full w-full rounded-full bg-[#a71d33]" />
                    </div>
                    <span className="w-12 text-right text-lg font-semibold text-white sm:w-16 sm:text-2xl">100%</span>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4">
                  <p className="m-0 text-sm text-white sm:text-base">With Yak Ops</p>
                  <div className="mt-1.5 flex items-center gap-3 sm:gap-4">
                    <div
                      aria-hidden="true"
                      className="h-7 flex-1 overflow-hidden rounded-full bg-white/10 bg-[repeating-linear-gradient(120deg,transparent_0px,transparent_12px,rgba(255,255,255,0.15)_12px,rgba(255,255,255,0.15)_13px)] sm:h-9"
                    >
                      <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-[#1876D7] to-[#318FF6]" />
                    </div>
                    <span className="w-12 text-right text-lg font-semibold text-white sm:w-16 sm:text-2xl">25%</span>
                  </div>
                </div>

                <p className="mb-0 mt-4 text-center text-xs leading-5 text-[#B4C4DD]">
                  Measured workflow · lower is better
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
