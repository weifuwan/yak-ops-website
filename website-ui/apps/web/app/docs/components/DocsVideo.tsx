/**
 * Featured video reproduced from the supplied Collate documentation reference.
 * The embedded recording is a Collate/OpenMetadata presentation, not a Yak Ops demo.
 */
export default function DocsVideo() {
  return (
    <section
      aria-labelledby="docs-video-title"
      className="mx-auto mt-8 mb-16 w-[90%] max-w-[1300px] rounded-[24px] bg-[linear-gradient(135deg,rgba(195,201,252,0.5)_0%,rgba(142,234,252,0.5)_100%)] px-5 py-9 sm:px-10 lg:px-20"
    >
      <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
        <div className="min-w-0 text-left">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/40 px-2 py-3 text-[12px] font-normal text-[#0086c9]">
            <span className="shrink-0 rounded-full bg-[#0ba5ec] px-[14px] py-2 text-[12px] font-medium text-white">
              Product Demo
            </span>
            <span className="pr-1 whitespace-nowrap">77 min watch</span>
          </div>
          <h2
            className="m-0 mt-6 mb-4 text-[clamp(30px,3.5vw,40px)] leading-[1.2] font-medium tracking-[-0.025em] text-[#181d27]"
            id="docs-video-title"
          >
            See Collate in Action
          </h2>
          <p className="m-0 max-w-[480px] text-[16px] leading-[1.5] text-[#414651] sm:text-[18px]">
            Want a quick overview? Take a quick tour – watch our detailed demo to learn how Collate works.
          </p>
        </div>
        <div className="mx-auto my-5 w-full max-w-[600px] min-w-0 px-0 sm:px-4">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="block aspect-video w-full rounded-[18px] border-0 bg-[#172c55] shadow-[0_5px_15px_rgba(25,61,125,0.15)]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src="https://www.youtube.com/embed/vwX69ZrknmI"
            title="Collate x OpenMetadata: Reimagine 2025 Virtual Summit - Full Recording"
          />
        </div>
      </div>
    </section>
  );
}
