const contextProblems = [
  {
    name: 'Metadata',
    question: 'Which “revenue” table is right?',
    description: 'Multiple tables. Some are deprecated. The right one isn’t obvious.',
    illustration: 'metadata.svg',
  },
  {
    name: 'Meaning',
    question: 'What does "active customer" mean?',
    description: 'Without a shared ontology and knowledge graph, business terms stay disconnected from data.',
    illustration: 'meaning.svg',
  },
  {
    name: 'Memory',
    question: 'Does AI learn from your team?',
    description: 'Turn team knowledge into context every agent can use.',
    illustration: 'memory.svg',
  },
] as const;

/**
 * Reference layout for the three parts of the context platform.
 * The original Collate animated SVG assets and copy are intentionally
 * retained until approved Yak Ops content/illustrations are available.
 */
export default function HomeContextProblemSection() {
  return (
    <section className="bg-white text-black" aria-labelledby="home-context-problem-heading">
      <div className="px-20 py-28 max-sm:px-4 max-sm:py-0 md:py-16 lg:px-0 lg:py-24">
        <div className="flex items-center justify-center max-md:py-10 max-sm:px-0 lg:px-12 xl:px-28 min-[1440px]:px-0">
          <div className="flex w-full flex-col max-md:mt-10 max-md:max-w-full min-[1440px]:max-w-[1440px] min-[1440px]:self-center">
            <div className="text-center text-black lg:whitespace-nowrap">
              <h2
                className="m-0 text-[28px] leading-tight tracking-[0.01em] font-normal sm:text-[44px]"
                id="home-context-problem-heading"
              >
                AI can find your data. It doesn&apos;t understand it.
              </h2>
              <p className="m-0 mt-3 text-xl md:mt-1">
                Agents can&apos;t tell what&apos;s trusted, what your terms mean, or what your team already knows
              </p>
            </div>

            <div className="my-10 mt-16 max-md:mt-10 min-[1440px]:max-w-[1440px]">
              <div className="mx-auto grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-6">
                {contextProblems.map((problem) => (
                  <article
                    className="flex w-full flex-col overflow-hidden rounded-[20px] border border-white bg-gradient-to-b from-[#e8f4ff] to-white lg:row-span-3 lg:grid lg:grid-rows-[subgrid] lg:gap-0"
                    key={problem.name}
                  >
                    <div className="aspect-[416/270] overflow-hidden">
                      <object
                        aria-hidden="true"
                        className="pointer-events-none block h-full w-full"
                        data={`https://www.getcollate.io/images/platform/${problem.illustration}`}
                        tabIndex={-1}
                        type="image/svg+xml"
                      />
                    </div>
                    <div className="px-5 pt-6 sm:px-6">
                      <p className="m-0 text-base font-medium text-[#167bf7]">{problem.name}</p>
                      <h3 className="m-0 mt-1 text-[21px] leading-8 font-semibold text-black">{problem.question}</h3>
                    </div>
                    <p className="m-0 px-5 pt-3 pb-8 text-base leading-6 text-black sm:px-6">{problem.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
