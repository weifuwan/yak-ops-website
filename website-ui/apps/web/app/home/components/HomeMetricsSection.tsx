import { useEffect, useState } from 'react';

import { fetchGitHubProjectStats, type GitHubProjectStats } from '@/service/github/stats';

// Publicly verified on 2026-10-29; used only until GitHub returns live data.
const VERIFIED_SNAPSHOT: GitHubProjectStats = { stars: 59, forks: 19, downloads: 6 };

const metrics = [
  {
    key: 'stars',
    label: 'GitHub Stars',
    description: 'Community interest',
    href: 'https://github.com/weifuwan/yak-ops/stargazers',
  },
  {
    key: 'forks',
    label: 'GitHub Forks',
    description: 'Open-source collaboration',
    href: 'https://github.com/weifuwan/yak-ops/forks',
  },
  {
    key: 'downloads',
    label: 'Downloads',
    description: 'GitHub Release packages',
    href: 'https://github.com/weifuwan/yak-ops/releases',
  },
] as const;

/** Live GitHub community stats, with a dated snapshot when the API is unavailable. */
export default function HomeMetricsSection() {
  const [stats, setStats] = useState<GitHubProjectStats>(VERIFIED_SNAPSHOT);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetchGitHubProjectStats(controller.signal)
      .then((next) => {
        if (!controller.signal.aborted) {
          setStats(next);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Public GitHub API requests may fail or be rate-limited.
        // Continue to display the verified, dated snapshot in that case.
      });

    return () => controller.abort();
  }, []);

  return (
    <section aria-label="Yak Ops open-source community metrics" className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-12 lg:px-24 lg:py-16">
        <div className="mx-auto grid max-w-[900px] grid-cols-1 text-center max-sm:gap-8 sm:grid-cols-3">
          {metrics.map((metric) => (
            <a
              className="group flex flex-col items-center no-underline sm:border-r sm:border-[#d9daee] sm:px-4 sm:last:border-r-0 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F6FED]"
              href={metric.href}
              key={metric.key}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="bg-gradient-to-b from-[#1e3a5f] to-[#1151a9] bg-clip-text pb-1 text-[48px] leading-none font-semibold text-transparent md:text-[56px]">
                {stats[metric.key].toLocaleString('en-US')}
              </span>
              <span className="mt-2 text-base leading-6 font-medium text-[#343C56] transition-colors duration-200 group-hover:text-[#1151a9]">
                {metric.label}
              </span>
              <span className="text-sm leading-6 text-[#595770]">{metric.description}</span>
            </a>
          ))}
        </div>
        <p className="m-0 mt-5 text-center text-xs leading-5 text-[#737B93]">
          {isLive
            ? 'Source: GitHub API · Downloads count versioned Release packages only.'
            : 'GitHub snapshot: October 29, 2026 · Live figures may differ.'}
        </p>
      </div>
    </section>
  );
}
