const serviceOptions = [
  {
    eyebrow: 'OpenMetadata · Open source and open standards',
    title: 'Run it yourself',
    description: 'The full open context platform, built and supported by a community of 14,000+.',
    benefits: [
      'Metadata, meaning and memory primitives',
      '130+ connectors and column-level lineage',
      'Community support and a public roadmap',
    ],
    href: 'https://open-metadata.org#try-openmetadata',
    action: 'Deploy the open source',
    managed: false,
  },
  {
    eyebrow: 'Collate · A fully managed service for OpenMetadata',
    title: 'Let us run it',
    description: 'OpenMetadata, fully managed, with AI agents and enterprise capabilities.',
    benefits: [
      'Everything in OpenMetadata, fully managed',
      'AI agents, Conversational AI, AI Studio',
      'SOC 2 Type II, SCIM 2.0 and 99.9% SLA',
    ],
    href: '/welcome',
    action: 'Start free',
    managed: true,
  },
] as const;

/**
 * Two service options styled after the provided Collate reference.
 * Original copy and destinations are retained until the Yak Ops content pass.
 */
export default function HomeServiceOptionsSection() {
  return (
    <section aria-labelledby="home-service-options-heading" className="relative bg-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[40%] bg-[linear-gradient(180deg,#222345_0%,#02468f_57%,#2b8bf3_100%)] md:top-[45%]"
      />
      <div className="relative mx-auto w-full max-w-[1140px] px-4 pt-12 pb-16 sm:px-12 md:pt-16 md:pb-20 lg:px-6">
        <h2
          className="m-0 text-center text-[28px] leading-tight tracking-[0.01em] font-normal text-black sm:text-[40px]"
          id="home-service-options-heading"
        >
          Choose the right service for your needs
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2">
          {serviceOptions.map((option) => (
            <article className="rounded-[28px] bg-white/40 p-3 backdrop-blur-md" key={option.title}>
              <div className="flex h-full flex-col rounded-[20px] bg-gradient-to-br from-[#d8ebff] to-[#b9d9f7] px-6 py-8 md:px-14">
                <p
                  className={`m-0 text-xs font-semibold tracking-wide uppercase ${option.managed ? 'text-[#1359b7]' : 'text-[#7659b2]'}`}
                >
                  {option.eyebrow}
                </p>
                <h3 className="m-0 mt-4 text-xl font-normal text-black">{option.title}</h3>
                <p className="m-0 mt-3 text-base leading-6 text-[#374151]">{option.description}</p>

                <ul className="m-0 mt-5 list-none space-y-2 p-0">
                  {option.benefits.map((benefit) => (
                    <li className="flex gap-2 text-base text-[#374151]" key={benefit}>
                      <span aria-hidden="true" className={option.managed ? 'text-[#1359b7]' : 'text-[#7955e9]'}>
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <a
                  className={`mt-8 w-fit rounded-md px-5 py-2 text-base font-semibold text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1359b7] ${option.managed ? 'bg-[#1559b9] hover:bg-[#2c7fe1]' : 'bg-[#7955e9] hover:bg-[#9475ef]'}`}
                  href={option.href}
                  rel="noopener noreferrer"
                  target={option.managed ? undefined : '_blank'}
                >
                  {option.action}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
