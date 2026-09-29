import { Link } from "@umijs/max";

function ExternalArrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M7 13 13 7M8.5 7H13v4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-solid border-[#DCE6F5] bg-[linear-gradient(112deg,#F4F8FF_0%,#EAF3FF_48%,#F8FBFF_100%)]">
      <div className="pointer-events-none absolute -left-24 bottom-[-8rem] h-[22rem] w-[22rem] rounded-full bg-[#B7D5FF]/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[9%] top-[8%] h-[14rem] w-[14rem] rounded-full bg-white/80 blur-3xl" />

      <div className="relative mx-auto grid min-h-[610px] w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] grid-cols-1 items-center gap-12 py-[clamp(4.5rem,3.7rem+4vw,7rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="max-w-[42rem]">
          <a
            href="https://github.com/weifuwan/yak-ops/releases/tag/v1.0.0"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-solid border-[#BED2F7] bg-white/70 px-3.5 py-2 text-[13px] font-semibold text-[#175CD3] no-underline backdrop-blur-sm"
          >
            Yak Ops v1.0.0 is live
            <ExternalArrow />
          </a>

          <h1 className="m-0 mt-8 max-w-[12ch] text-[clamp(3.2rem,2.45rem+3.75vw,6rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0F172A]">
            Data operations,
            <br />
            made clear.
          </h1>

          <p className="m-0 mt-7 max-w-[38rem] text-[clamp(1.05rem,0.98rem+0.35vw,1.3rem)] leading-[1.65] text-[#5F6B7A]">
            Build, move, and operate data with confidence. Yak Ops brings data
            connections, offline sync, realtime CDC, and runtime operations into one
            open-source platform.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/docs"
              className="inline-flex h-12 items-center justify-center rounded-[9px] bg-[#0B5CFF] px-6 text-[15px] font-semibold text-white no-underline transition-all duration-200 hover:bg-[#004CE6] hover:!text-white"
            >
              Get started
            </Link>
            <a
              href="https://github.com/weifuwan/yak-ops"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[9px] border border-solid border-[#B8C7DD] bg-white/70 px-6 text-[15px] font-semibold text-[#344054] no-underline transition-all duration-200 hover:border-[#98A9C1] hover:bg-white hover:!text-[#101828]"
            >
              View on GitHub
              <ExternalArrow />
            </a>
          </div>
        </div>

        <div className="relative flex min-h-[390px] items-center justify-center lg:min-h-[470px]">
          <div className="relative aspect-[16/10] w-full max-w-[760px] overflow-hidden rounded-[24px] border border-solid border-[#C9D9EE] bg-white/50 shadow-[0_28px_80px_rgba(67,104,154,0.16)] backdrop-blur-sm">
            <div className="absolute inset-5 rounded-[18px] border border-dashed border-[#AFC7E8] bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(225,238,255,0.72))]">
              <div className="absolute left-[9%] top-[18%] h-[26%] w-[38%] rounded-[18px] border border-solid border-white/80 bg-white/70 shadow-sm" />
              <div className="absolute right-[8%] top-[12%] h-[38%] w-[35%] rounded-full bg-[#72A8FF]/22 blur-2xl" />
              <div className="absolute bottom-[17%] right-[10%] h-[32%] w-[52%] rounded-[22px] border border-solid border-white/80 bg-white/65 shadow-sm" />

              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <div className="rounded-[12px] border border-solid border-[#BDD0EB] bg-white/90 px-5 py-4 shadow-sm">
                  <div className="text-[13px] font-semibold text-[#344054]">
                    Hero visual placeholder
                  </div>
                  <div className="mt-1 text-[12px] text-[#7B8798]">
                    Replace with generated artwork · recommended 16:10
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#7F8EA3]">
              Visual slot
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
