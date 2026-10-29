import { ArrowLeft, ArrowRight, BookOpen, GitBranch, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DocsRelease2() {
  return (
    <main className="min-h-[calc(100vh-158px)] bg-white px-5 pb-24 text-[#1b2842] sm:px-8">
      <div className="mx-auto max-w-[900px] pt-16 sm:pt-24">
        <Link
          className="inline-flex items-center gap-2 text-[14px] font-medium text-[#647794] no-underline hover:text-[#0768df]"
          to="/docs"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Documentation Home
        </Link>
        <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-[#d9e8fb] bg-[#f0f7ff] px-4 py-1.5 text-[12px] font-semibold tracking-wide text-[#166bdf]">
          <Rocket aria-hidden="true" size={15} />
          RELEASE NOTES
        </div>
        <h1 className="m-0 mt-5 text-[clamp(42px,6vw,64px)] leading-[1.12] font-semibold tracking-[-0.04em]">
          Release <span className="text-[#078ef0]">2.0</span>
        </h1>
        <p className="mt-6 max-w-[690px] text-[17px] leading-[1.85] text-[#65738a]">
          Welcome to the Yak Ops 2.0 release overview. This page is a starting point for release notes, important
          changes, and upgrade guidance.
        </p>
        <div className="mt-10 rounded-2xl border border-[#e5eaf3] bg-[#f8fbff] px-7 py-8 sm:px-9">
          <div className="flex items-start gap-4">
            <BookOpen aria-hidden="true" className="mt-0.5 shrink-0 text-[#1677f4]" size={24} />
            <div>
              <h2 className="m-0 text-[20px] font-semibold">Release details are being prepared</h2>
              <p className="mb-0 mt-3 text-[15px] leading-7 text-[#6a7890]">
                The full changelog, migration notes, and compatibility information will be published here. Until then,
                explore the existing documentation and deployment guide.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            className="group flex items-center gap-4 rounded-xl border border-[#e4ebf5] p-5 no-underline hover:border-[#bddbff] hover:bg-[#f8fbff]"
            to="/docs/deploy/docker-compose"
          >
            <GitBranch aria-hidden="true" className="text-[#1677f4]" size={22} />
            <span className="flex-1">
              <span className="block font-semibold">Deployment guide</span>
              <span className="mt-1 block text-[13px] text-[#7a8799]">Docker Compose setup</span>
            </span>
            <ArrowRight aria-hidden="true" size={17} className="text-[#8ea5c0] group-hover:text-[#1677f4]" />
          </Link>
          <Link
            className="group flex items-center gap-4 rounded-xl border border-[#e4ebf5] p-5 no-underline hover:border-[#bddbff] hover:bg-[#f8fbff]"
            to="/developers/quick-start"
          >
            <BookOpen aria-hidden="true" className="text-[#1677f4]" size={22} />
            <span className="flex-1">
              <span className="block font-semibold">Get started</span>
              <span className="mt-1 block text-[13px] text-[#7a8799]">Explore Yak Ops basics</span>
            </span>
            <ArrowRight aria-hidden="true" size={17} className="text-[#8ea5c0] group-hover:text-[#1677f4]" />
          </Link>
        </div>
      </div>
    </main>
  );
}
