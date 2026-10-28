/**
 * Industry evidence for the operational cost of maintaining data pipelines.
 *
 * Metrics are from Fivetran's 2026 Enterprise Data Infrastructure Benchmark
 * Report, not Yak Ops performance claims.
 */
export default function HomeContextRiskSection() {
  return (
    <section className="bg-[#1f2545] text-white" aria-labelledby="home-context-risk-heading">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-12 lg:px-24 lg:py-16">
        <h2
          className="m-0 mx-auto max-w-[760px] px-3 text-center text-[28px] leading-tight tracking-[0.01em] font-normal sm:px-0 sm:text-[40px]"
          id="home-context-risk-heading"
        >
          The real challenge isn&apos;t building pipelines. It&apos;s keeping them running.
        </h2>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 md:mt-16 lg:grid-cols-2 lg:gap-16">
          <p className="m-0 max-w-[540px] text-lg leading-7">
            As data sources and dependencies grow, teams spend more time fixing pipelines and less time building what
            matters.
          </p>

          <div>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <p className="m-0 text-[48px] leading-none font-semibold text-[#FFE500] sm:text-[64px]">53%</p>
                <p className="m-0 mt-3 text-base leading-6 md:max-w-[260px]">
                  of engineering time goes to pipeline maintenance.
                </p>
                <div className="mt-5 flex min-h-8 items-center">
                  <a
                    className="text-sm text-white/75 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    href="https://www.fivetran.com/resources/reports/the-enterprise-data-infrastructure-benchmark-report-2026"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Fivetran · 2026
                  </a>
                </div>
              </div>
              <div>
                <p className="m-0 text-[48px] leading-none font-semibold text-[#FFE500] sm:text-[64px]">97%</p>
                <p className="m-0 mt-3 text-base leading-6 md:max-w-[260px]">
                  of surveyed data leaders say pipeline failures slowed analytics or AI initiatives.
                </p>
                <div className="mt-5 flex min-h-8 items-center">
                  <a
                    className="text-sm text-white/75 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    href="https://www.fivetran.com/press/data-pipeline-failures-cost-enterprises-3-million-per-month-fivetran-benchmark-finds"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Fivetran · 2026
                  </a>
                </div>
              </div>
            </div>
            <p className="m-0 mt-5 text-xs leading-5 text-white/65">
              Based on a survey of 500 senior data and technology leaders at enterprises with 5,000+ employees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
