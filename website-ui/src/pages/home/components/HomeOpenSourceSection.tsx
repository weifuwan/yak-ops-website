const OPEN_SOURCE_LINKS = [
  {
    label: "GitHub",
    description: "Read the source, open an issue, or contribute.",
    href: "https://github.com/weifuwan/yak-ops",
    internal: false,
  },
  {
    label: "v1.0.0 Release",
    description: "Download the verified distribution and release evidence.",
    href: "https://github.com/weifuwan/yak-ops/releases/tag/v1.0.0",
    internal: false,
  },
  {
    label: "Documentation",
    description: "Deployment, architecture, configuration, and contribution guides.",
    href: "/docs",
    internal: true,
  },
] as const;

export default function HomeOpenSourceSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] gap-12 py-[clamp(6rem,5rem+5vw,9rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div className="rounded-[22px] bg-[#0F172A] p-[clamp(2rem,1.5rem+2.5vw,4rem)] text-white">
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#8FB4FF]">
            Open source
          </p>
          <h2 className="m-0 mt-5 max-w-[12ch] text-[clamp(2.25rem,1.9rem+1.75vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Built in the open. Ready to run.
          </h2>
          <p className="m-0 mt-6 max-w-[36rem] text-[16px] leading-7 text-[#CBD5E1]">
            Every release is tied to a specific commit, verified distribution, and
            container image. Start with Docker or inspect exactly how Yak Ops works.
          </p>

          <div className="mt-10 rounded-[14px] border border-solid border-white/10 bg-white/[0.06] p-5 font-mono text-[14px] leading-7 text-[#E2E8F0]">
            <div>$ docker pull weifuwan/yak-ops:1.0.0</div>
            <div>$ docker pull weifuwan/yak-ops-api:1.0.0</div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {OPEN_SOURCE_LINKS.map((item) => {
            const content = (
              <>
                <div>
                  <div className="text-[17px] font-semibold text-[#101828]">{item.label}</div>
                  <div className="mt-1 text-[14px] leading-6 text-[#667085]">
                    {item.description}
                  </div>
                </div>
                <span className="text-[20px] text-[#98A2B3]" aria-hidden="true">
                  ↗
                </span>
              </>
            );

            return item.internal ? (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between gap-6 border-b border-solid border-[#E4E7EC] py-6 no-underline transition-colors duration-200 hover:text-[#0B5CFF]"
              >
                {content}
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-6 border-b border-solid border-[#E4E7EC] py-6 no-underline transition-colors duration-200 hover:text-[#0B5CFF]"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
