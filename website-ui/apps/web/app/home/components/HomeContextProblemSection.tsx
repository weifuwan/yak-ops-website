import {
  BlindSpotsIllustration,
  FragmentationIllustration,
  ManualWorkIllustration,
} from './HomeProblemIllustrations';

const dataEngineeringProblems = [
  {
    name: 'Fragmentation',
    question: 'Why does one data workflow need so many tools?',
    description:
      'Data integration, development, scheduling, and monitoring are scattered across different systems.',
    illustration: FragmentationIllustration,
  },
  {
    name: 'Manual Work',
    question: 'Why does delivering data take so long?',
    description:
      'Repeated setup, manual configuration, and disconnected workflows slow down every delivery.',
    illustration: ManualWorkIllustration,
  },
  {
    name: 'Blind Spots',
    question: "Why is it so hard to know what's happening?",
    description:
      'When data pipelines fail, finding the cause often means searching through logs, tasks, and systems.',
    illustration: BlindSpotsIllustration,
  },
] as const;

/**
 * The Yak Ops homepage pain points: disconnected tools, repeated manual work,
 * and limited visibility across data engineering workflows.
 */
export default function HomeContextProblemSection() {
  return (
    <section
      aria-labelledby="home-data-engineering-problems-heading"
      className="bg-white py-16 text-[#181d27] sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-[1120px] text-center">
          <h2
            className="m-0 text-[28px] leading-[1.2] font-normal tracking-[-0.02em] sm:text-[38px] lg:text-[44px]"
            id="home-data-engineering-problems-heading"
          >
            <span className="block">Big Data Is Hard.</span>
            <span className="block">Your Tools Shouldn&apos;t Make It Harder.</span>
          </h2>
          <p className="mx-auto mb-0 mt-4 max-w-[900px] text-[16px] leading-[1.6] text-[#5d6675] sm:text-[18px]">
            Disconnected tools, repetitive work, and limited visibility slow down data engineering.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {dataEngineeringProblems.map((problem) => {
            const Illustration = problem.illustration;

            return (
              <article
                className="flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#e9f0f8] bg-gradient-to-b from-[#e8f4ff] via-[#f8fbff] to-white"
                key={problem.name}
              >
                <div className="aspect-[416/258] w-full overflow-hidden">
                  <Illustration />
                </div>
                <div className="flex flex-1 flex-col px-5 pt-5 pb-8 sm:px-6">
                  <p className="m-0 text-[15px] font-medium text-[#167bf7] sm:text-base">{problem.name}</p>
                  <h3 className="m-0 mt-2 text-[20px] leading-[1.35] font-semibold tracking-[-0.015em] text-[#151a23]">
                    {problem.question}
                  </h3>
                  <p className="mb-0 mt-4 text-[15px] leading-[1.65] text-[#475467] sm:text-base">
                    {problem.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
