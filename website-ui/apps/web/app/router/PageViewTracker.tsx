import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { trackPageView } from '@/services/traffic';

export default function PageViewTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef<string>();

  useEffect(() => {
    const path = location.pathname || '/';
    if (path === lastTrackedPath.current) return;

    lastTrackedPath.current = path;
    trackPageView(path);
  }, [location.pathname]);

  return null;
}
