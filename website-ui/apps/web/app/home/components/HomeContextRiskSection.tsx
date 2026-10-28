/**
 * Collate reference section; retain the original copy and attribution logos
 * until the Yak Ops content pass.
 */
export default function HomeContextRiskSection() {
  return (
    <section className="bg-[#1f2545] text-white" aria-labelledby="home-context-risk-heading">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-12 lg:px-24 lg:py-16">
        <h2
          className="m-0 mx-auto max-w-[660px] px-3 text-center text-[28px] leading-tight tracking-[0.01em] font-normal sm:px-0 sm:text-[40px]"
          id="home-context-risk-heading"
        >
          As AI scales, missing context becomes an enterprise-wide risk.
        </h2>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 md:mt-16 lg:grid-cols-2 lg:gap-16">
          <p className="m-0 max-w-[540px] text-lg leading-7">
            One unclear definition or unreliable dataset can spread errors across every AI workflow before anyone
            catches them.
          </p>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <p className="m-0 text-[48px] leading-none font-semibold text-[#FFE500] sm:text-[64px]">320x</p>
              <p className="m-0 mt-3 text-base leading-6 md:max-w-[260px]">
                Growth in enterprise AI reasoning workloads, year over year
              </p>
              <div className="mt-5 flex h-8 items-center">
                <img
                  alt="OpenAI"
                  className="block h-6 w-[88px] brightness-0 invert"
                  decoding="async"
                  height="24"
                  loading="lazy"
                  src="https://www.getcollate.io/images/customer-gallery/header/openai-logo.svg"
                  width="88"
                />
              </div>
            </div>
            <div>
              <p className="m-0 text-[48px] leading-none font-semibold text-[#FFE500] sm:text-[64px]">62%</p>
              <p className="m-0 mt-3 text-base leading-6 md:max-w-[260px]">
                Organizations are scaling or experimenting with AI agents
              </p>
              <div className="mt-5 flex h-8 items-center">
                <img
                  alt="McKinsey & Company"
                  className="block h-8 w-[102px] brightness-0 invert"
                  decoding="async"
                  height="32"
                  loading="lazy"
                  src="https://www.getcollate.io/images/context-risk/mckinsey.svg"
                  width="102"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
