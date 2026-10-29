import { useState } from 'react';

type SummitLogoProps = {
  alt: string;
  fallback: string;
  height: number;
  src: string;
  width: number;
};

function SummitLogo({ alt, fallback, height, src, width }: SummitLogoProps) {
  const [failed, setFailed] = useState(false);

  return failed ? (
    <span className="whitespace-nowrap text-[13px] font-bold tracking-[0.08em] text-white">{fallback}</span>
  ) : (
    <img
      alt={alt}
      className="block max-w-full shrink-0 object-contain"
      height={height}
      onError={() => setFailed(true)}
      src={src}
      width={width}
    />
  );
}

/**
 * External community event banner adapted from the supplied Collate Summit
 * reference. Branding and the destination intentionally identify Collate.
 */
export default function DocsSummit() {
  return (
    <section aria-labelledby="docs-summit-title" className="mx-auto mb-[72px] w-full max-w-[1200px] px-5 pt-5">
      <div className="flex w-max max-w-full items-center gap-5 rounded-tl-[32px] rounded-tr-[80px] bg-[#224] px-5 pt-[9px] pb-[10px] sm:px-[45px]">
        <SummitLogo
          alt="Collate"
          fallback="COLLATE"
          height={14}
          src="https://mintcdn.com/collatedocs/qgslKCiS8vDK3Zn0/public/images/collate-white.svg?fit=max&auto=format&n=qgslKCiS8vDK3Zn0&q=85&s=78498777aae9d06c5aeacbfcee9f8c4b"
          width={84}
        />
        <span aria-hidden="true" className="text-[20px] leading-[18px] font-light text-white/90">
          ×
        </span>
        <SummitLogo
          alt="OpenMetadata"
          fallback="OpenMetadata"
          height={25}
          src="https://mintcdn.com/collatedocs/qgslKCiS8vDK3Zn0/public/images/om-white.svg?fit=max&auto=format&n=qgslKCiS8vDK3Zn0&q=85&s=e0700f79dbe545e5edb3f974109352af"
          width={64}
        />
      </div>
      <div
        className="relative isolate flex w-full flex-col items-start justify-between gap-6 overflow-hidden rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] bg-[linear-gradient(115deg,#e5e7ff_0%,#e9f0ff_44%,#c9f5fb_100%)] px-6 py-7 sm:flex-row sm:items-center sm:px-11"
        style={{
          backgroundImage:
            "url('https://mintcdn.com/collatedocs/qgslKCiS8vDK3Zn0/public/images/banner-bg.png'), linear-gradient(115deg, #e5e7ff 0%, #e9f0ff 44%, #c9f5fb 100%)",
          backgroundPosition: 'center',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="min-w-0">
          <h2
            className="m-0 text-[clamp(32px,5vw,48px)] leading-[1.08] font-normal tracking-[-0.025em] text-[#224]"
            id="docs-summit-title"
          >
            Collate Summit ‘26
          </h2>
          <p className="m-0 mt-2 text-[18px] leading-[1.5] text-[#224] sm:text-[20px]">Data &amp; AI in Production</p>
        </div>
        <a
          className="inline-flex shrink-0 items-center justify-center rounded-[6px] bg-[#fbe200] px-5 py-[11px] text-[18px] leading-7 font-semibold whitespace-nowrap text-black no-underline transition-colors hover:bg-[#f3d600] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#224]"
          href="https://getcollate.io/summit2026"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
