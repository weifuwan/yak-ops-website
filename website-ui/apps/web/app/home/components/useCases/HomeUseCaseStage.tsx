import type { HomeUseCaseDefinition } from './types';

function ReferenceTexture() {
  return (
    <svg
      viewBox="0 0 1462 674"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full text-white/10"
      aria-hidden="true"
    >
      <path
        d="M-40 560C110 485 198 610 330 520C480 418 452 232 635 270C805 306 840 474 1015 396C1165 329 1205 194 1515 178"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M-70 145C108 226 204 104 365 174C540 250 508 404 704 346C882 294 918 120 1098 176C1252 224 1314 333 1518 260"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path d="M160 -80C252 62 180 190 286 318C374 424 510 490 552 736" stroke="currentColor" strokeWidth="5" />
      <path d="M1030 -60C918 94 952 212 1004 314C1060 423 1180 505 1192 744" stroke="currentColor" strokeWidth="5" />
    </svg>
  );
}

function PromptCard({ prompt }: { prompt: string }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-[#141413] p-4 text-[#FAF9F5]">
      <div className="text-[11px] font-medium leading-[1.6] [font-family:'Yak_Sans',Arial,sans-serif]">Prompt</div>
      <p className="m-0 text-[11px] leading-[1.6] text-[#B0AEA5] [font-family:'Yak_Sans',Arial,sans-serif]">{prompt}</p>
    </div>
  );
}

export default function HomeUseCaseStage({ useCase }: { useCase: HomeUseCaseDefinition }) {
  const Result = useCase.Result;

  return (
    <div className="relative overflow-hidden lg:aspect-[16/9]">
      <ReferenceTexture />

      <div className="relative z-10 grid min-h-[620px] grid-cols-1 lg:h-full lg:min-h-0 lg:grid-cols-12">
        <div className="flex items-center justify-center p-6 sm:p-10 lg:col-start-1 lg:col-end-9 lg:p-16">
          <Result />
        </div>

        <aside className="flex flex-col justify-center px-6 pb-8 sm:px-10 lg:col-start-9 lg:col-end-13 lg:px-0 lg:py-8 lg:pr-16">
          <PromptCard prompt={useCase.prompt} />
        </aside>
      </div>
    </div>
  );
}
