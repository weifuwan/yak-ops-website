import { Link } from "react-router-dom";

export default function HomeClosingSection() {
  return (
    <section className="border-t border-solid border-[#DCE6F5] bg-[#EEF5FF]">
      <div className="mx-auto flex w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] flex-col items-start justify-between gap-10 py-[clamp(5rem,4.25rem+3.75vw,7.5rem)] lg:flex-row lg:items-end">
        <div>
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0B5CFF]">
            Start simple
          </p>
          <h2 className="m-0 mt-5 max-w-[13ch] text-[clamp(2.5rem,2.05rem+2.25vw,4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[#101828]">
            Ready to run your data operations?
          </h2>
          <p className="m-0 mt-6 max-w-[36rem] text-[16px] leading-7 text-[#667085]">
            Deploy Yak Ops, connect a database, and move your first dataset through
            the same path you will use in production.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/docs/getting-started/quick-start"
            className="inline-flex h-12 items-center justify-center rounded-[9px] bg-[#0B5CFF] px-6 text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#004CE6] hover:!text-white"
          >
            Quick start
          </Link>
          <a
            href="https://github.com/weifuwan/yak-ops"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-[9px] border border-solid border-[#B9C9DE] bg-white px-6 text-[15px] font-semibold text-[#344054] no-underline transition-colors duration-200 hover:border-[#98A9C1] hover:!text-[#101828]"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
