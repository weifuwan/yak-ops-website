import brandLogo from '@/assets/img/logo2.png';
import { MARKETING_GITHUB_ISSUES_URL, MARKETING_HEADER_ACTIONS } from '@/config/marketingNavigation';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  EllipsisVertical,
  Headphones,
  Menu,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

type DocsHeaderProps = {
  onOpenNavigation: () => void;
};

type DocsTab = {
  label: string;
  href: string;
  description: string;
  external?: boolean;
};

const DOCS_TABS: readonly DocsTab[] = [
  { label: 'Home', href: '/docs', description: 'Documentation home' },
  { label: 'Release 2.0', href: '/blog', description: 'Latest product updates and release notes' },
  { label: 'Get Started', href: '/docs/deploy/docker-compose', description: 'Start using Yak Ops' },
  { label: 'Connectors', href: '/product/data-sources', description: 'Connect your data sources' },
  { label: 'Products', href: '/product/data-development', description: 'Explore Yak Ops capabilities' },
  { label: 'Collate AI', href: '/developers/api', description: 'Explore APIs and integrations' },
  { label: 'How-to Guides', href: '/docs/deploy/docker-compose', description: 'Practical setup guides' },
  { label: 'Admin', href: '/developers/configuration', description: 'Configure and manage Yak Ops' },
  { label: 'Developers', href: '/developers/quick-start', description: 'Developer tools and workflows' },
  { label: 'SQL Studio', href: '/product/data-development', description: 'Data development tools' },
  { label: 'Data Insights', href: '/product/metrics', description: 'Metrics and data insights' },
  { label: 'Data Discovery', href: '/product/data-sources', description: 'Find and explore data' },
  { label: 'Data Collaboration', href: '/product/workflows', description: 'Collaborate across data workflows' },
  {
    label: 'Data Quality & Observability',
    href: '/product/data-quality',
    description: 'Monitor data quality and reliability',
  },
  { label: 'Data Lineage', href: '/product/lineage', description: 'Understand data dependencies' },
  { label: 'Data Governance', href: '/product/data-assets', description: 'Govern data assets' },
  { label: 'Data Marketplace', href: '/product/datasets', description: 'Discover reusable data products' },
  { label: 'Data Contracts', href: '/developers/api', description: 'Interfaces and integration contracts' },
  { label: 'Guide for Data Users', href: '/docs/deploy/docker-compose', description: 'Guides for everyday users' },
  {
    label: 'Customer Support',
    href: MARKETING_GITHUB_ISSUES_URL,
    description: 'Ask questions and report issues',
    external: true,
  },
  { label: 'SSO', href: '/developers/configuration', description: 'Authentication configuration' },
  { label: 'MCP Server', href: '/developers/api', description: 'API and integration reference' },
  { label: 'Deployment', href: '/developers/deployment', description: 'Deployment options and setup' },
];

function DocsTabLink({ item, active, onClick }: { item: DocsTab; active: boolean; onClick?: () => void }) {
  const className = [
    'group relative flex h-10 shrink-0 items-center gap-2 whitespace-nowrap text-sm font-medium no-underline transition-colors duration-150',
    active
      ? 'text-gray-900 dark:text-gray-100'
      : 'text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white',
  ].join(' ');

  const content = (
    <>
      {item.label}
      <span
        aria-hidden="true"
        className={[
          'absolute bottom-0 left-0 h-px w-full transition-colors',
          active
            ? 'bg-[#2563eb] dark:bg-blue-400'
            : 'bg-transparent group-hover:bg-gray-200 dark:group-hover:bg-gray-700',
        ].join(' ')}
      />
    </>
  );

  if (item.external) {
    return (
      <a
        aria-current={active ? 'page' : undefined}
        className={className}
        href={item.href}
        onClick={onClick}
        rel="noopener noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <Link aria-current={active ? 'page' : undefined} className={className} onClick={onClick} to={item.href}>
      {content}
    </Link>
  );
}

function ActionLink({
  href,
  children,
  external = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  onClick?: () => void;
}) {
  const className =
    'flex items-center gap-2 whitespace-nowrap rounded-xl bg-gray-950/[0.03] px-[14px] py-2 text-sm font-medium text-gray-800 no-underline transition-colors hover:bg-gray-950/10 hover:text-gray-950 dark:bg-white/[0.03] dark:text-gray-50 dark:hover:bg-white/10 dark:hover:text-white';

  return external ? (
    <a className={className} href={href} onClick={onClick} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  ) : (
    <Link className={className} onClick={onClick} to={href}>
      {children}
    </Link>
  );
}

export default function DocsHeader({ onOpenNavigation }: DocsHeaderProps) {
  const { pathname } = useLocation();
  const [activePanel, setActivePanel] = useState<'search' | 'assistant' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [versionOpen, setVersionOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const activeTab =
    DOCS_TABS.find((item) => item.href === pathname) ??
    DOCS_TABS.find((item) => item.href === '/docs' && pathname.startsWith('/docs/'));

  const filteredTabs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const available = query
      ? DOCS_TABS.filter(
          (item) => item.label.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
        )
      : DOCS_TABS.slice(0, activePanel === 'assistant' ? 5 : 8);

    return available.slice(0, 8);
  }, [activePanel, searchQuery]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setActivePanel('search');
        setSearchQuery('');
        setMoreOpen(false);
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'i') {
        event.preventDefault();
        setActivePanel('assistant');
        setSearchQuery('');
        setMoreOpen(false);
      }

      if (event.key === 'Escape') {
        setActivePanel(null);
        setVersionOpen(false);
        setMoreOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    setActivePanel(null);
    setVersionOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const closePanel = () => setActivePanel(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100">
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 lg:px-5">
        <div className="flex h-14 min-w-0 items-center gap-4 lg:px-1">
          <div className="flex min-w-0 flex-1 items-center gap-3 xl:gap-4">
            <Link aria-label="Yak Ops documentation home" className="shrink-0" to="/docs">
              <img
                alt="Yak Ops"
                className="block h-6 w-auto max-w-[130px] object-contain"
                draggable={false}
                src={brandLogo}
              />
            </Link>

            <div className="relative hidden items-center lg:flex">
              <button
                aria-expanded={versionOpen}
                aria-haspopup="menu"
                className="group flex h-8 max-w-[12.5rem] items-center gap-2 overflow-hidden whitespace-nowrap rounded-xl px-2.5 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-600/5 hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-gray-300 dark:hover:bg-gray-200/5 dark:hover:text-white"
                onClick={() => setVersionOpen(!versionOpen)}
                type="button"
              >
                <span className="truncate">AI 2.0</span>
                <ChevronRight
                  aria-hidden="true"
                  className={[
                    'h-3 w-3 shrink-0 text-gray-400 transition-transform',
                    versionOpen ? 'rotate-[270deg]' : 'rotate-90',
                  ].join(' ')}
                  strokeWidth={2}
                />
              </button>
              {versionOpen ? (
                <div
                  aria-label="Documentation version"
                  className="absolute top-full left-0 z-[80] mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-[0_12px_32px_rgba(15,23,42,0.14)] dark:border-gray-700 dark:bg-gray-900"
                  role="menu"
                >
                  <div className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    <span>AI 2.0</span>
                    <Check aria-label="Current version" className="text-blue-600 dark:text-blue-400" size={15} />
                  </div>
                  <div className="px-3 pb-2 text-xs text-gray-500 dark:text-gray-400">
                    Current documentation version
                  </div>
                  <Link
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 no-underline hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => setVersionOpen(false)}
                    role="menuitem"
                    to="/docs"
                  >
                    Getting Started
                    <ArrowUpRight aria-hidden="true" size={14} />
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative z-20 hidden min-w-0 flex-1 items-center gap-2.5 lg:flex">
            <button
              aria-label="Open documentation search"
              className="group/search flex h-9 w-full max-w-sm items-center justify-between gap-2 rounded-full bg-gray-950/[0.03] px-3.5 text-sm leading-6 text-gray-500 transition-colors hover:bg-gray-950/10 dark:bg-white/[0.03] dark:text-white/50 dark:hover:bg-white/10"
              onClick={() => {
                setActivePanel('search');
                setSearchQuery('');
              }}
              type="button"
            >
              <span className="flex min-w-0 items-center gap-2">
                <Search
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-gray-700 dark:text-gray-400"
                  strokeWidth={1.6}
                />
                <span className="truncate">Search...</span>
              </span>
              <span className="flex-none text-xs font-semibold">Ctrl K</span>
            </button>

            <button
              aria-label="Ask Assistant"
              className="hidden h-9 flex-none items-center justify-center gap-1.5 rounded-full bg-gray-950/[0.03] pl-3 pr-3.5 transition-colors hover:bg-gray-950/10 dark:bg-white/[0.03] dark:hover:bg-white/10 xl:flex"
              onClick={() => {
                setActivePanel('assistant');
                setSearchQuery('');
              }}
              type="button"
            >
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-gray-700 dark:text-gray-400"
                strokeWidth={1.6}
              />
              <span className="whitespace-nowrap text-sm text-gray-500 dark:text-white/50">Ask Assistant</span>
              <span className="flex-none text-xs font-semibold text-gray-500 dark:text-white/50">Ctrl+I</span>
            </button>
          </div>

          <div className="hidden flex-1 items-center justify-end lg:flex">
            <nav aria-label="Documentation actions" className="text-sm">
              <ul className="m-0 flex list-none items-center gap-2 p-0">
                <li>
                  <ActionLink external href={MARKETING_GITHUB_ISSUES_URL}>
                    <Headphones aria-hidden="true" className="h-4 w-4" />
                    Support
                  </ActionLink>
                </li>
                <li>
                  <ActionLink href="/blog">
                    <BookOpen aria-hidden="true" className="h-4 w-4" />
                    Blogs
                  </ActionLink>
                </li>
                <li>
                  <ActionLink external href={MARKETING_HEADER_ACTIONS.demo}>
                    Free Trial
                  </ActionLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="relative ml-auto flex shrink-0 items-center gap-3 lg:hidden">
            <button
              aria-label="Open documentation search"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              onClick={() => {
                setActivePanel('search');
                setSearchQuery('');
                setMoreOpen(false);
              }}
              type="button"
            >
              <Search aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              aria-label="Ask Assistant"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              onClick={() => {
                setActivePanel('assistant');
                setSearchQuery('');
                setMoreOpen(false);
              }}
              type="button"
            >
              <Sparkles aria-hidden="true" className="h-[18px] w-[18px]" />
            </button>
            <button
              aria-expanded={moreOpen}
              aria-label="More actions"
              className="relative flex h-8 w-7 items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setMoreOpen(!moreOpen)}
              type="button"
            >
              <EllipsisVertical aria-hidden="true" className="h-4 w-4" />
            </button>
            {moreOpen ? (
              <div className="absolute top-full right-0 z-[80] mt-3 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-[0_12px_32px_rgba(15,23,42,0.14)] dark:border-gray-700 dark:bg-gray-900">
                <a
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 no-underline hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  href={MARKETING_GITHUB_ISSUES_URL}
                  onClick={() => setMoreOpen(false)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Headphones aria-hidden="true" className="h-4 w-4" />
                  Support
                </a>
                <Link
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 no-underline hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setMoreOpen(false)}
                  to="/blog"
                >
                  <BookOpen aria-hidden="true" className="h-4 w-4" />
                  Blogs
                </Link>
                <a
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 no-underline hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  href={MARKETING_HEADER_ACTIONS.demo}
                  onClick={() => setMoreOpen(false)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Free Trial
                  <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4" />
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <nav aria-label="Documentation sections" className="hidden h-10 lg:block">
        <div className="mx-auto flex h-full max-w-[90rem] overflow-x-auto px-4 lg:px-5">
          <div className="flex h-full min-w-max items-center gap-x-6 px-1">
            {DOCS_TABS.map((item) => (
              <DocsTabLink active={activeTab?.label === item.label} item={item} key={item.label} />
            ))}
          </div>
        </div>
      </nav>

      <div className="flex h-14 items-center border-t border-gray-100 px-5 lg:hidden dark:border-gray-800">
        <button
          aria-label="Open documentation navigation"
          className="flex h-full w-full items-center text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-blue-600"
          onClick={onOpenNavigation}
          type="button"
        >
          <span className="flex items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Menu aria-hidden="true" className="h-4 w-4 shrink-0" />
          </span>
          <span className="ml-4 flex min-w-0 flex-1 items-center gap-3 overflow-hidden whitespace-nowrap text-sm leading-6">
            <span className="min-w-0 flex-1 truncate font-semibold text-gray-900 dark:text-gray-200">
              Yak Ops Documentation
            </span>
            {activeTab ? (
              <span className="max-w-[45%] truncate text-gray-500 dark:text-gray-400">{activeTab.label}</span>
            ) : null}
          </span>
        </button>
      </div>

      {activePanel ? (
        <div className="fixed inset-0 z-[1400] flex items-start justify-center bg-gray-950/25 px-4 pt-[14vh] backdrop-blur-[2px]">
          <button
            aria-label="Close dialog"
            className="absolute inset-0 h-full w-full cursor-default border-0 bg-transparent"
            onClick={closePanel}
            type="button"
          />
          <section
            aria-labelledby="docs-header-panel-title"
            aria-modal="true"
            className="relative z-10 w-full max-w-[600px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] dark:border-gray-700 dark:bg-gray-900"
            role="dialog"
          >
            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800">
              {activePanel === 'assistant' ? (
                <Sparkles aria-hidden="true" className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <Search aria-hidden="true" className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
              <div className="min-w-0 flex-1">
                <h2 className="m-0 text-sm font-semibold text-gray-900 dark:text-gray-100" id="docs-header-panel-title">
                  {activePanel === 'assistant' ? 'Ask Assistant' : 'Search documentation'}
                </h2>
                <p className="m-0 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {activePanel === 'assistant'
                    ? 'Find a relevant guide by asking about a topic.'
                    : 'Search docs, guides, and developer resources.'}
                </p>
              </div>
              <button
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                onClick={closePanel}
                type="button"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 px-5 py-4">
              <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                aria-label={activePanel === 'assistant' ? 'Ask about documentation' : 'Search documentation'}
                autoFocus
                className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:outline-none dark:text-gray-100"
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={activePanel === 'assistant' ? 'Ask about deployment, connectors...' : 'Search...'}
                value={searchQuery}
              />
              <kbd className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-[11px] text-gray-500 sm:inline-block dark:border-gray-700 dark:text-gray-400">
                ESC
              </kbd>
            </div>
            <div className="max-h-[min(50vh,420px)] overflow-y-auto border-t border-gray-100 p-2 dark:border-gray-800">
              {filteredTabs.length ? (
                filteredTabs.map((item) => (
                  <div key={item.label}>
                    {item.external ? (
                      <a
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 no-underline hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        href={item.href}
                        onClick={closePanel}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <BookOpen aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-400" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium">{item.label}</span>
                          <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
                            {item.description}
                          </span>
                        </span>
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-400" />
                      </a>
                    ) : (
                      <Link
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 no-underline hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        onClick={closePanel}
                        to={item.href}
                      >
                        <BookOpen aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-400" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium">{item.label}</span>
                          <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
                            {item.description}
                          </span>
                        </span>
                        <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-400" />
                      </Link>
                    )}
                  </div>
                ))
              ) : (
                <p className="m-0 px-3 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No matching documentation sections.
                </p>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 text-[11px] text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <span>{activePanel === 'assistant' ? 'Suggested documentation links' : 'Search results'}</span>
              <span>Press Esc to close</span>
            </div>
          </section>
        </div>
      ) : null}
    </header>
  );
}
