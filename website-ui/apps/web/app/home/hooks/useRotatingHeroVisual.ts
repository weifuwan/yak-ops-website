import { useEffect, useState } from 'react';

import { HERO_VISUAL_SWITCH_INTERVAL } from '../constants';

export type HeroVisualType = 'basketball' | 'football';

export function useRotatingHeroVisual() {
  const [visual, setVisual] = useState<HeroVisualType>('basketball');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisual((current) => (current === 'basketball' ? 'football' : 'basketball'));
    }, HERO_VISUAL_SWITCH_INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  return visual;
}
