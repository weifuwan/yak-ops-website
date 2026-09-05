import { MARKETING_LINK_UP_GITHUB_URL } from "@/config/marketingNavigation";

const CONNECTOR_GROUPS = [
  {
    key: "source",
    eyebrow: "SOURCE",
    title: "Sources",
    description: "Read bounded data into Link-up.",
    connectors: [
      {
        name: "JDBC",
        description: "Read relational data through JDBC-compatible databases.",
      },
      {
        name: "HTTP",
        description: "Read bounded data from HTTP APIs and endpoints.",
      },
    ],
  },
  {
    key: "sink",
    eyebrow: "SINK",
    title: "Sinks",
    description: "Deliver synchronized data to supported targets.",
    connectors: [
      {
        name: "JDBC",
        description: "Write batches to JDBC-compatible databases.",
      },
      {
        name: "Doris",
        description: "Load batches into Apache Doris with Stream Load.",
      },
    ],
  },
] as const;

const CONTRIBUTORS = [
  {
    handle: "weifuwan",
    href: "https://github.com/weifuwan",
    initials: "W",
  },
  {
    handle: "gitfortian",
    href: "https://github.com/gitfortian",
    initials: "G",
  },
] as const;

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M6 14L14 6M8 6H14V12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export default function LinkUpPage() {
  return (
    <main className="min-h-[calc(100vh-84px)] bg-[#faf9f5] text-[#181817]">
      <section className="border-0 border-b border-solid border-[#E4E1D9]">
        <div className="mx-auto w-full max-w-[90rem] px-8 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="max-w-[52rem]">
            <div className="mb-5 flex items-center gap-3 text-[12px] font-medium tracking-[0.15em] text-[#77746D]">
              <span className="h-2 w-2 rounded-full bg-[#D97757]" />
              LINK-UP
            </div>

            <h1 className="m-0 max-w-[12ch] [font-family:'Yak_Serif',Georgia,sans-serif] text-[clamp(3rem,2.4rem+3vw,5.5rem)] font-normal leading-[0.98] tracking-[-0.035em]">
              Move data from here to there.
            </h1>

            <p className="mt-7 max-w-[42rem] text-[18px] leading-8 text-[#5E5D59]">
              Link-up is the bounded data synchronization engine behind Yak Ops.
              Explore the connectors it can read from, write to, and the people
              building it.
            </p>

            <a
              className="mt-8 inline-flex items-center gap-2 rounded-[9px] border border-solid border-[#D8D5CC] px-4 py-2.5 text-[14px] font-medium text-[#242422] no-underline transition-colors duration-200 hover:border-[#C7C1B5] hover:bg-[#ECE8DF] hover:!text-[#181817]"
              href={MARKETING_LINK_UP_GITHUB_URL}
              rel="noreferrer"
              target="_blank"
            >
              View Link-up on GitHub
              <ExternalArrow />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[90rem] px-8 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mb-10 max-w-[42rem]">
          <p className="m-0 text-[12px] font-medium tracking-[0.15em] text-[#77746D]">
            CONNECTORS
          </p>
          <h2 className="mt-4 [font-family:'Yak_Serif',Georgia,sans-serif] text-[clamp(2.25rem,2rem+1.25vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.025em]">
            Supported sources and sinks
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-[#6F6F6B]">
            The current built-in connector surface stays intentionally small and
            focused on offline data movement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {CONNECTOR_GROUPS.map((group) => (
            <article
              className="rounded-[16px] border border-solid border-[#DEDAD0] bg-[#F6F4EF] p-6 sm:p-8"
              key={group.key}
            >
              <div className="flex items-start justify-between gap-5 border-0 border-b border-solid border-[#DEDAD0] pb-6">
                <div>
                  <p className="m-0 text-[11px] font-semibold tracking-[0.14em] text-[#8A8881]">
                    {group.eyebrow}
                  </p>
                  <h3 className="mt-2 text-[28px] font-medium leading-tight">
                    {group.title}
                  </h3>
                </div>
                <span className="rounded-full border border-solid border-[#D8D5CC] bg-[#FAF9F5] px-3 py-1 text-[12px] text-[#6F6F6B]">
                  {group.connectors.length} supported
                </span>
              </div>

              <p className="mt-5 text-[14px] leading-6 text-[#6F6F6B]">
                {group.description}
              </p>

              <div className="mt-6 divide-y divide-[#DEDAD0]">
                {group.connectors.map((connector) => (
                  <div
                    className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                    key={connector.name}
                  >
                    <div className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-[9px] border border-solid border-[#D8D5CC] bg-[#FAF9F5] text-[12px] font-semibold text-[#D97757]">
                      {connector.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="m-0 text-[16px] font-semibold text-[#242422]">
                        {connector.name}
                      </p>
                      <p className="mt-1 text-[14px] leading-6 text-[#6F6F6B]">
                        {connector.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-0 border-t border-solid border-[#E4E1D9] bg-[#F4F1EA]">
        <div className="mx-auto w-full max-w-[90rem] px-8 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div className="max-w-[32rem]">
              <p className="m-0 text-[12px] font-medium tracking-[0.15em] text-[#77746D]">
                CONTRIBUTORS
              </p>
              <h2 className="mt-4 [font-family:'Yak_Serif',Georgia,sans-serif] text-[clamp(2.25rem,2rem+1.25vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.025em]">
                Built in the open
              </h2>
              <p className="mt-4 text-[16px] leading-7 text-[#6F6F6B]">
                Link-up grows through the people who design, build, review, and
                improve its data synchronization engine.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CONTRIBUTORS.map((contributor) => (
                <a
                  className="group flex min-h-[116px] items-center justify-between gap-5 rounded-[14px] border border-solid border-[#D8D5CC] bg-[#FAF9F5] p-5 text-[#242422] no-underline transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#C7C1B5] hover:bg-white hover:!text-[#181817] motion-reduce:transform-none"
                  href={contributor.href}
                  key={contributor.handle}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-solid border-[#D8D5CC] bg-[#F1EFE8] text-[14px] font-semibold text-[#D97757]">
                      {contributor.initials}
                    </span>
                    <div>
                      <p className="m-0 text-[15px] font-semibold">
                        @{contributor.handle}
                      </p>
                      <p className="mt-1 text-[13px] text-[#8A8881]">
                        GitHub contributor
                      </p>
                    </div>
                  </div>
                  <span className="text-[#8A8881] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
                    <ExternalArrow />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
