import { trackPageView } from '@/services/traffic';

let lastTrackedPath: string | undefined;

export function onRouteChange({ location }: { location: { pathname: string } }) {
  const path = location.pathname || '/';
  if (path === lastTrackedPath) return;

  lastTrackedPath = path;
  trackPageView(path);
}
