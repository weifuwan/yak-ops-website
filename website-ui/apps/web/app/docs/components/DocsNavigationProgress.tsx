import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type ProgressPhase = 'idle' | 'loading' | 'finishing' | 'fading';

type ProgressState = {
  phase: ProgressPhase;
  value: number;
  sequence: number;
};

type ProgressTimers = {
  advance: number | null;
  trickle: number | null;
  finish: number | null;
  fade: number | null;
  reset: number | null;
};

const INITIAL_PROGRESS: ProgressState = { phase: 'idle', value: 0, sequence: 0 };
const MIN_VISIBLE_MS = 400;

export function useDocsNavigationProgress(pathname: string) {
  const [progress, setProgress] = useState<ProgressState>(INITIAL_PROGRESS);
  const activeRef = useRef(false);
  const startedAtRef = useRef(0);
  const previousPathRef = useRef<string | null>(null);
  const timersRef = useRef<ProgressTimers>({
    advance: null,
    trickle: null,
    finish: null,
    fade: null,
    reset: null,
  });

  const clearTimers = useCallback(() => {
    const timers = timersRef.current;
    if (timers.advance !== null) window.clearTimeout(timers.advance);
    if (timers.trickle !== null) window.clearInterval(timers.trickle);
    if (timers.finish !== null) window.clearTimeout(timers.finish);
    if (timers.fade !== null) window.clearTimeout(timers.fade);
    if (timers.reset !== null) window.clearTimeout(timers.reset);
    timersRef.current = { advance: null, trickle: null, finish: null, fade: null, reset: null };
  }, []);

  const start = useCallback(() => {
    clearTimers();
    activeRef.current = true;
    startedAtRef.current = performance.now();

    // Restart at a fresh bar for every route change, even during a previous fade-out.
    setProgress((current) => ({ phase: 'loading', value: 12, sequence: current.sequence + 1 }));
    timersRef.current.advance = window.setTimeout(() => {
      setProgress((current) =>
        current.phase === 'loading' ? { ...current, value: Math.max(current.value, 65) } : current,
      );
    }, 40);

    // This is visual feedback, not a claimed percentage of the API response.
    timersRef.current.trickle = window.setInterval(() => {
      setProgress((current) =>
        current.phase === 'loading'
          ? { ...current, value: Math.min(90, current.value + Math.max(1, (90 - current.value) * 0.12)) }
          : current,
      );
    }, 350);
  }, [clearTimers]);

  // React Router location changes are the source of truth, including Back/Forward
  // and programmatic navigation. Hash-only changes do not start another animation.
  useLayoutEffect(() => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;
    start();
  }, [pathname, start]);

  const complete = useCallback(() => {
    if (!activeRef.current) return;
    activeRef.current = false;

    // Finish only after both the destination is ready and the animation has been visible.
    const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAtRef.current));
    timersRef.current.finish = window.setTimeout(() => {
      if (timersRef.current.advance !== null) window.clearTimeout(timersRef.current.advance);
      if (timersRef.current.trickle !== null) window.clearInterval(timersRef.current.trickle);
      timersRef.current.advance = null;
      timersRef.current.trickle = null;

      setProgress((current) => ({ ...current, phase: 'finishing', value: 100 }));
      timersRef.current.fade = window.setTimeout(() => {
        setProgress((current) => ({ ...current, phase: 'fading' }));
      }, 300);
      timersRef.current.reset = window.setTimeout(() => {
        setProgress((current) => ({ ...INITIAL_PROGRESS, sequence: current.sequence }));
      }, 650);
    }, remaining);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  return { progress, complete };
}

export default function DocsNavigationProgress({ progress }: { progress: ProgressState }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[2000] h-[3px]">
      <div
        key={progress.sequence}
        className="h-full origin-left bg-[linear-gradient(90deg,#00c9ff_0%,#327bff_40%,#8056ff_75%,#c157f8_100%)] transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none"
        style={{
          opacity: progress.phase === 'idle' || progress.phase === 'fading' ? 0 : 1,
          transform: `scaleX(${progress.value / 100})`,
        }}
      />
    </div>
  );
}
