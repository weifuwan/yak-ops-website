import { BookOpen, FileText, List } from 'lucide-react';
import { Link } from 'react-router-dom';

type QuickLink = {
  title: string;
  href: string;
  external?: boolean;
};

type LinkGroup = {
  title: string;
  icon: typeof List;
  links: readonly QuickLink[];
};

const linkGroups: readonly LinkGroup[] = [
  {
    title: 'AI Features',
    icon: List,
    links: [
      { title: 'Collate AI Chat', href: 'https://www.getcollate.io/askcollate', external: true },
      { title: 'AI Analytics', href: 'https://docs.getcollate.io/ai-2-0/collate-ai/ai-analytics', external: true },
      { title: 'AI Automations', href: 'https://docs.getcollate.io/ai-2-0/collate-ai/ai-automations', external: true },
      { title: 'AI Studio', href: 'https://docs.getcollate.io/ai-2-0/collate-ai/ai-studio', external: true },
    ],
  },
  {
    title: 'Blogs & Articles',
    icon: BookOpen,
    links: [
      {
        title: 'Collate’s New Workflow System',
        href: 'https://www.getcollate.io/blog/how-collates-new-workflow-system-automates-data-governance',
        external: true,
      },
      {
        title: 'Collate Metadata Automations',
        href: 'https://www.getcollate.io/blog/data-governance-that-runs-itself-with-collate-metadata-automations',
        external: true,
      },
      {
        title: 'Data Diff in OpenMetadata and Collate',
        href: 'https://www.getcollate.io/blog/data-diff-in-openmetadata-and-collate',
        external: true,
      },
      {
        title: 'Model Context Protocol Use cases',
        href: 'https://www.getcollate.io/blog/mcp-uses-in-collate',
        external: true,
      },
    ],
  },
  {
    title: 'Release Note',
    icon: FileText,
    links: [
      { title: 'Release 2.0', href: '/docs/release-2.0' },
      { title: 'Release v1.13', href: 'https://www.getcollate.io/product-updates#v1.13.4', external: true },
      { title: 'Release v1.12', href: 'https://www.getcollate.io/product-updates#v1.12.14', external: true },
      { title: 'Release v1.11', href: 'https://www.getcollate.io/product-updates#v1.11.0', external: true },
    ],
  },
];

const linkClassName =
  'block w-fit max-w-full text-[15px] leading-[1.55] font-normal text-[#536dfe] no-underline transition-colors hover:text-[#004cd3] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] sm:text-[16px]';

export default function DocsQuickLinks() {
  return (
    <section
      aria-labelledby="docs-quick-links-title"
      className="mx-auto w-full max-w-[1300px] px-5 pt-12 pb-24 text-center sm:px-12"
    >
      <span className="inline-flex items-center justify-center rounded-full bg-[#f0f9ff] px-5 py-2 text-[14px] font-medium text-[#0ba5ec]">
        Quick Links
      </span>
      <h2
        className="m-0 mt-6 text-[clamp(30px,3.5vw,40px)] leading-[1.2] font-medium tracking-[-0.025em] text-[#181d27]"
        id="docs-quick-links-title"
      >
        Trending Quick Links
      </h2>
      <p className="mx-auto mt-4 max-w-[850px] text-[16px] leading-[1.5] text-[#717680] sm:text-[18px]">
        Explore the most popular resources and links, handpicked by the Collate community.
      </p>

      <div className="mx-auto mt-12 grid w-full max-w-[850px] grid-cols-1 gap-x-12 gap-y-10 text-left sm:grid-cols-2 lg:grid-cols-[0.93fr_1.5fr_0.85fr] lg:gap-x-14">
        {linkGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div className="min-w-0" key={group.title}>
              <h3 className="m-0 flex items-center gap-2.5 text-[18px] leading-7 font-medium text-[#252b37] sm:text-[20px]">
                <Icon aria-hidden="true" className="shrink-0 text-[#414651]" size={20} strokeWidth={1.9} />
                {group.title}
              </h3>
              <div className="mt-4 flex flex-col items-start gap-3">
                {group.links.map((item) =>
                  item.external ? (
                    <a
                      className={linkClassName}
                      href={item.href}
                      key={item.title}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link className={linkClassName} key={item.title} to={item.href}>
                      {item.title}
                    </Link>
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
