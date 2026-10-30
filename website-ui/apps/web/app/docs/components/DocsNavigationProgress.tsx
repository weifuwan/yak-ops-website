import { useCallback, useEffect, useRef, useState } from 'react';

type ProgressPhase = 'idle' | 'loading' | 'finishing' | 'fading';

type ProgressState = {
  phase: ProgressPhase;
  value: number;
};

type ProgressTimers = {
  show: number | null;
  trickle: number | null;
  fade: number | null;
  reset: number | null;
};

const INITIAL_PROGRESS: ProgressState = { phase: 'idle', value: 0 };
const SHOW_DELAY_MS = 120;

export function useDocsNavigationProgress() {
  const [progress, setProgress] = useState<ProgressState>(INITIAL_PROGRESS);
  const pendingRef = useRef(false);
  const shownRef = useRef(false);
  const timersRef = useRef<ProgressTimers>({ show: null, trickle: null, fade: null, reset: null });

  const clearTimers = useCallback(() => {
    const timers = timersRef.current;
    if (timers.show !== null) window.clearTimeout(timers.show);
    if (timers.trickle !== null) window.clearInterval(timers.trickle);
    if (timers.fade !== null) window.clearTimeout(timers.fade);
    if (timers.reset !== null) window.clearTimeout(timers.reset);
    timersRef.current = { show: null, trickle: null, fade: null, reset: null };
  }, []);

  const start = useCallback(() => {
    clearTimers();
    pendingRef.current = true;
    shownRef.current = false;
    setProgress(INITIAL_PROGRESS);

    // Avoid flashing the bar for instant client-side navigations.
    timersRef.current.show = window.setTimeout(() => {
      if (!pendingRef.current) return;

      shownRef.current = true;
      setProgress({ phase: 'loading', value: 22 });

      // Progress is illustrative, never a fabricated measure of bytes loaded.
      timersRef.current.trickle = window.setInterval(() => {
        setProgress((current) => ({
          phase: 'loading',
          value: Math.min(90, current.value + Math.max(1, (90 - current.value) * 0.12)),
        }));
      }, 350);
    }, SHOW_DELAY_MS);
  }, [clearTimers]);

  const startIfIdle = useCallback(() => {
    if (!pendingRef.current) start();
  }, [start]);

  const complete = useCallback(() => {
    if (!pendingRef.current) return;

    pendingRef.current = false;
    clearTimers();
    if (!shownRef.current) {
      setProgress(INITIAL_PROGRESS);
      return;
    }

    setProgress({ phase: 'finishing', value: 100 });
    timersRef.current.fade = window.setTimeout(() => {
      setProgress({ phase: 'fading', value: 100 });
    }, 300);
    timersRef.current.reset = window.setTimeout(() => {
      shownRef.current = false;
      setProgress(INITIAL_PROGRESS);
    }, 550);
  }, [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  return { progress, start, startIfIdle, complete };
}

export default function DocsNavigationProgress({ progress }: { progress: ProgressState }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[2000] h-[3px]">
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,#00c9ff_0%,#327bff_40%,#8056ff_75%,#c157f8_100%)] transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none"
        style={{
          opacity: progress.phase === 'idle' || progress.phase === 'fading' ? 0 : 1,
          transform: `scaleX(${progress.value / 100})`,
        }}
      />
    </div>
  );
}
