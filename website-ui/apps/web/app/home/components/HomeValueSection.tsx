const VALUES = [
  {
    title: "One place to operate",
    description:
      "Define data connections, build sync tasks, publish them, and watch runtime state without jumping between disconnected tools.",
  },
  {
    title: "Clear responsibility",
    description:
      "Data Integration owns definitions and publishing. Operations Center owns execution, stop, status, and instance history.",
  },
  {
    title: "Designed for real movement",
    description:
      "Move data with offline batch or MySQL CDC, with explicit write modes, checkpoints, and observable runtime metrics.",
  },
  {
    title: "Open by default",
    description:
      "Yak Ops is open source, deployable with Docker, and built so every release can be traced back to code and verification.",
  },
] as const;

export default function HomeValueSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] gap-12 py-[clamp(6rem,5rem+5vw,9rem)] lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
        <div className="max-w-[28rem]">
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0B5CFF]">
            Why Yak Ops
          </p>
          <h2 className="m-0 mt-5 text-[clamp(2.25rem,1.9rem+1.75vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#101828]">
            Complex systems.
            <br />
            Clear operations.
          </h2>
          <p className="m-0 mt-6 text-[17px] leading-7 text-[#667085]">
            Keep the platform powerful behind the scenes while giving data teams a
            direct, understandable operating surface.
          </p>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-solid border-[#E4E7EC] sm:grid-cols-2">
          {VALUES.map((item) => (
            <article
              key={item.title}
              className="min-h-[220px] border-b border-r border-solid border-[#E4E7EC] p-[clamp(1.5rem,1.25rem+1.25vw,2.5rem)]"
            >
              <h3 className="m-0 text-[20px] font-semibold leading-7 text-[#101828]">
                {item.title}
              </h3>
              <p className="m-0 mt-4 max-w-[31rem] text-[15px] leading-6 text-[#667085]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
