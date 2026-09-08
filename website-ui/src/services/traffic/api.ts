export function trackPageView(path: string): void {
  void fetch('/api/v1/traffic/page-view', {
    method: 'POST',
    credentials: 'include',
    keepalive: true,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path }),
  }).catch(() => undefined);
}
