/**
 * Compact homepage proof points, matching the supplied Collate reference.
 * Copy and metrics are retained for the later homepage content pass.
 */
const metrics = [
  {
    value: '7x',
    lines: ['fewer wrong answers', 'vs. an ungrounded agent'],
  },
  {
    value: '4,000+',
    lines: ['enterprise deployments'],
  },
  {
    value: '130+',
    lines: ['connectors across every', 'cloud and BI platform'],
  },
] as const;

export default function HomeMetricsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-12 lg:px-24 lg:py-16">
        <div className="mx-auto grid max-w-[900px] grid-cols-1 text-center max-sm:gap-8 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              className="flex flex-col items-center sm:border-r sm:border-[#d9daee] sm:px-4 sm:last:border-r-0"
              key={metric.value}
            >
              <p className="m-0 bg-gradient-to-b from-[#1e3a5f] to-[#1151a9] bg-clip-text pb-1 text-[48px] leading-none font-semibold text-transparent md:text-[56px]">
                {metric.value}
              </p>
              <p className="m-0 mt-2 text-base leading-6 text-[#595770]">
                {metric.lines.map((line) => (
                  <span className="md:block" key={line}>
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
