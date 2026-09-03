function DataFlowVisual() {
  const primaryPath =
    'M122 328 C172 246 224 235 252 319 C278 396 322 413 354 326 C384 245 430 233 460 318 C486 391 528 404 570 326';
  const outerPath =
    'M585 154 C511 174 480 226 486 286 C491 337 527 359 520 412 C512 477 470 520 409 536 C345 553 278 532 238 490';
  const returnPath =
    'M360 162 C365 220 355 269 328 308 C300 349 283 391 302 438 C319 480 352 504 390 512';

  return (
    <svg
      aria-label="Animated Yak Ops data flow"
      className="mx-auto block h-auto w-full max-w-[690px] overflow-visible"
      role="img"
      viewBox="0 0 720 640"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="360" cy="118" fill="#fe2c55" opacity="0.08" r="64">
        <animate
          attributeName="r"
          dur="4.8s"
          repeatCount="indefinite"
          values="60;70;60"
        />
        <animate
          attributeName="opacity"
          dur="4.8s"
          repeatCount="indefinite"
          values="0.05;0.12;0.05"
        />
      </circle>
      <circle cx="360" cy="118" fill="#fe2c55" r="46" />

      <path
        d={primaryPath}
        fill="none"
        stroke="#181817"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="15"
      />
      <path
        d={returnPath}
        fill="none"
        stroke="#181817"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="15"
      />
      <path
        d={outerPath}
        fill="none"
        stroke="#181817"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="15"
      />

      <path
        className="motion-reduce:hidden"
        d={primaryPath}
        fill="none"
        pathLength="1"
        stroke="#fe2c55"
        strokeDasharray="0.025 0.975"
        strokeLinecap="round"
        strokeWidth="15"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="3.6s"
          from="0"
          repeatCount="indefinite"
          to="-1"
        />
      </path>

      <path
        className="motion-reduce:hidden"
        d={outerPath}
        fill="none"
        pathLength="1"
        stroke="#fe2c55"
        strokeDasharray="0.018 0.982"
        strokeLinecap="round"
        strokeWidth="15"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="5.4s"
          from="0"
          repeatCount="indefinite"
          to="-1"
        />
      </path>

      <g className="motion-reduce:hidden">
        <circle cx="360" cy="118" fill="#181817" opacity="0.11" r="6">
          <animate
            attributeName="cy"
            dur="3.8s"
            repeatCount="indefinite"
            values="185;202;185"
          />
          <animate
            attributeName="opacity"
            dur="3.8s"
            repeatCount="indefinite"
            values="0.05;0.18;0.05"
          />
        </circle>
      </g>

      <circle cx="118" cy="328" fill="#faf9f5" r="10" stroke="#181817" strokeWidth="5" />
      <circle cx="570" cy="326" fill="#faf9f5" r="10" stroke="#181817" strokeWidth="5" />
      <circle cx="238" cy="490" fill="#faf9f5" r="10" stroke="#181817" strokeWidth="5" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-84px)] overflow-hidden bg-[#faf9f5] text-[#181817] [font-family:var(--yak-font-marketing)]">
      <section className="mx-auto grid min-h-[calc(100vh-84px)] w-[calc(100%-clamp(2rem,calc(1.428571rem+2.857143vw),4rem)*2)] max-w-[90rem] grid-cols-1 items-center gap-8 py-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-6 lg:py-0">
        <div className="relative z-10 max-w-[39rem] py-8 lg:py-0">
          <h1 className="m-0 max-w-[12ch] text-[clamp(3.35rem,5.6vw,6.25rem)] font-normal leading-[0.92] tracking-[-0.055em] text-[#181817] [font-family:var(--yak-font-serif)]">
            One control plane for your data work.
          </h1>
          <p className="mt-8 max-w-[35rem] text-[clamp(1.05rem,1.3vw,1.35rem)] font-normal leading-[1.55] tracking-[-0.012em] text-[#65635f]">
            Connect, build, orchestrate, validate, and serve data from one open-source workspace.
          </p>
        </div>

        <div className="flex min-h-[420px] items-center justify-center pb-4 lg:min-h-0 lg:pb-0">
          <DataFlowVisual />
        </div>
      </section>
    </main>
  );
}
