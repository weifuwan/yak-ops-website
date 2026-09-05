import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import loginHeroVideo from "@/assets/video/login-hero3.mp4";
import { HOME_EASE } from "../constants";

function ActionIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" aria-hidden="true">
      <rect
        x="8"
        y="9"
        width="25"
        height="30"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14 17H27M14 23H25M14 29H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="31.5"
        cy="30.5"
        r="7.5"
        fill="#FAF9F5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M37 36L42 41"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <path
        d="M8.5 6.75V17.25L17 12L8.5 6.75Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <path
        d="M9 7V17M15 7V17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HomeInActionSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
      }

      void video.play();
      return;
    }

    video.pause();
  };

  return (
    <section className="relative border-t border-solid border-[#E3E0D7] bg-[#FAF9F5] text-[#181817]">
      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] py-[clamp(7rem,6.142857rem+4.285714vw,10rem)]">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: Boolean(shouldReduceMotion), amount: 0.45 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            ease: HOME_EASE,
          }}
          className="flex flex-col items-center text-center"
        >
          <div className="text-[#262522]">
            <ActionIcon />
          </div>

          <h2 className="m-0 mt-8 text-[clamp(2.75rem,2.178571rem+2.857143vw,4.75rem)] font-medium leading-[1.02] text-[#181817] [font-family:'Yak_Serif',Georgia,sans-serif]">
            See Yak Ops in action
          </h2>

          <p className="mb-0 mt-6 max-w-[46rem] text-[clamp(1.05rem,0.985714rem+0.321429vw,1.275rem)] leading-[1.6] text-[#66645F] [font-family:'Yak_Sans',Arial,sans-serif]">
            See how Yak Ops brings data operations into one place, from connecting data to running and operating workflows.
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: Boolean(shouldReduceMotion), amount: 0.15 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.8,
            delay: shouldReduceMotion ? 0 : 0.08,
            ease: HOME_EASE,
          }}
          className="group relative mx-auto mt-[clamp(4.5rem,4.071429rem+2.142857vw,6rem)] aspect-[16/9] max-w-[75rem] overflow-hidden rounded-[clamp(1.5rem,1.071429rem+2.142857vw,3rem)] border border-solid border-[#CFC8BA] bg-[#DED8CB]"
        >
          <video
            ref={videoRef}
            className="h-full w-full cursor-pointer object-cover"
            muted
            playsInline
            preload="auto"
            aria-label="Yak Ops product walkthrough"
            onClick={togglePlayback}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={loginHeroVideo} type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause Yak Ops video" : "Play Yak Ops video"}
            className={`absolute left-1/2 top-1/2 flex h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-solid border-black/10 bg-[#FAF9F5]/95 text-[#5F5B53] shadow-[0_8px_24px_rgba(24,24,23,0.08)] backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] hover:text-[#181817] ${
              isPlaying
                ? "opacity-0 group-hover:opacity-100 focus:opacity-100"
                : "opacity-100"
            }`}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
