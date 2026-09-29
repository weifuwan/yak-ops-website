import heroImage from '@/assets/homepage-hero-data-core.png';

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
          <div className="flex max-w-[80rem] flex-col">
            <span className="mb-8 inline-flex items-center gap-2 text-[16px] font-medium text-[#0070FF] md:text-[22px]">
              数据集成
            </span>

            <h1 className="mb-8 max-w-[64rem] text-[40px] font-semibold leading-[1.04] tracking-[0.035em] text-[#101828] lg:text-[64px]">
              Data Integration
            </h1>

            <p className="mb-[64px] max-w-[64rem] text-[14px] font-light leading-7 text-[#667085] md:text-[18px]">
              统一管理数据源、离线同步、实时同步与任务运维
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://demo.yak-ops.com"
                target="_blank"
                rel="noreferrer"
                className="group relative isolate inline-flex h-auto cursor-pointer select-none items-center justify-center gap-4 overflow-hidden rounded-[8px] bg-transparent px-10 py-4 text-[18px] font-light text-white no-underline transition-all duration-300 ease-in-out before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-[linear-gradient(270deg,#0070FF_0%,#04F_100%)] before:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-[linear-gradient(0deg,#0070FF_0%,#0070FF_100%),linear-gradient(270deg,#0070FF_0%,#04F_100%)] after:opacity-0 after:transition-opacity after:duration-300 after:ease-in-out after:content-[''] hover:font-normal hover:after:opacity-100 hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0070FF] max-lg:h-10 max-lg:gap-2 max-lg:px-4 max-lg:py-2 max-lg:text-[14px]"
              >
                线上体验
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
