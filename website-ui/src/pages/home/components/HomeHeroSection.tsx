import heroImage from "@/assets/homepage-hero-data-core.png";

export default function HomeHeroSection() {
  return (
    <section className="relative h-[320px] w-full overflow-hidden bg-[#EDF4FF] sm:h-[380px] lg:h-[488px]">
      <img
        src={heroImage}
        alt="Yak Ops data operations hero"
        className="block h-full w-full select-none object-cover object-[72%_65%]"
        draggable={false}
      />

      <div className="absolute inset-0">
        <div className="mx-auto flex h-full w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] items-center">
          <div className="max-w-[42rem]">
            <p className="m-0 text-[clamp(1rem,0.92rem+0.4vw,1.25rem)] font-semibold text-[#0B5CFF]">
              数据集成
            </p>

            <h1 className="m-0 mt-4 text-[clamp(2.75rem,2rem+3.75vw,5.25rem)] font-semibold leading-[1] tracking-[-0.045em] text-[#101828]">
              Data Integration
            </h1>

            <p className="m-0 mt-6 text-[clamp(0.95rem,0.91rem+0.2vw,1.125rem)] leading-7 text-[#667085]">
              统一管理数据源、离线同步、实时同步与任务运维
            </p>

            <a
              href="https://demo.yak-ops.com"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-[9px] bg-[#0B5CFF] px-6 text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#004CE6] hover:!text-white focus-visible:bg-[#004CE6] focus-visible:outline-none"
            >
              线上体验
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
