import { useState } from 'react';

type MenuKey = 'meet' | 'platform' | 'solutions' | 'pricing' | 'resources';

interface MenuLink {
  label: string;
  href: string;
}

interface MenuColumn {
  title?: string;
  links: MenuLink[];
}

interface MenuConfig {
  key: MenuKey;
  label: string;
  triggerClassName: string;
  dropdownClassName: string;
  panelClassName: string;
  columns: MenuColumn[];
}

const CLAUDE_LOGIN_URL =
  'https://claude.ai/redirect/claudedotcom.v1.98d0c45f-2907-4e66-856d-97fb079290e6/login';

const CLAUDE_TRY_URL =
  'https://claude.ai/redirect/claudedotcom.v1.98d0c45f-2907-4e66-856d-97fb079290e6';

const MENUS: MenuConfig[] = [
  {
    key: 'meet',
    label: 'Meet Claude',
    triggerClassName: 'w-[106px]',
    dropdownClassName: 'left-0',
    panelClassName: 'w-[790px] grid-cols-4',
    columns: [
      {
        title: 'Products',
        links: [
          { label: 'Claude', href: 'https://claude.com/product/overview' },
          {
            label: 'Claude Code',
            href: 'https://claude.com/product/claude-code',
          },
          {
            label: 'Claude Cowork',
            href: 'https://claude.com/product/cowork',
          },
          { label: '@Claude', href: 'https://claude.com/product/tag' },
        ],
      },
      {
        title: 'Features',
        links: [
          {
            label: 'Claude in Chrome',
            href: 'https://claude.com/claude-in-chrome',
          },
          {
            label: 'Claude for Microsoft 365',
            href: 'https://claude.com/claude-for-microsoft-365',
          },
          { label: 'Skills', href: 'https://claude.com/skills' },
        ],
      },
      {
        title: 'Claude apps built for',
        links: [
          { label: 'Design', href: 'https://claude.com/product/design' },
          {
            label: 'Science',
            href: 'https://claude.com/product/claude-science',
          },
          {
            label: 'Security',
            href: 'https://claude.com/product/claude-security',
          },
        ],
      },
      {
        title: 'Models',
        links: [
          {
            label: 'Mythos',
            href: 'https://www.anthropic.com/claude/mythos',
          },
          {
            label: 'Fable',
            href: 'https://www.anthropic.com/claude/fable',
          },
          {
            label: 'Opus',
            href: 'https://www.anthropic.com/claude/opus',
          },
          {
            label: 'Sonnet',
            href: 'https://www.anthropic.com/claude/sonnet',
          },
          {
            label: 'Haiku',
            href: 'https://www.anthropic.com/claude/haiku',
          },
        ],
      },
    ],
  },
  {
    key: 'platform',
    label: 'Platform',
    triggerClassName: 'w-[76px]',
    dropdownClassName: 'left-0',
    panelClassName: 'w-[420px] grid-cols-2',
    columns: [
      {
        title: 'Build on Claude',
        links: [
          { label: 'Overview', href: 'https://claude.com/platform/api' },
          { label: 'Pricing', href: 'https://claude.com/pricing#api' },
          {
            label: 'Developer docs',
            href: 'https://platform.claude.com/docs',
          },
          { label: 'Console login', href: 'https://platform.claude.com/' },
        ],
      },
      {
        title: 'Works with Claude',
        links: [
          { label: 'Ecosystem', href: 'https://claude.com/ecosystem' },
          {
            label: 'Marketplace',
            href: 'https://claude.com/platform/marketplace',
          },
          { label: 'Connectors', href: 'https://claude.com/connectors' },
          { label: 'Plugins', href: 'https://claude.com/plugins' },
        ],
      },
    ],
  },
  {
    key: 'solutions',
    label: 'Solutions',
    triggerClassName: 'w-[82px]',
    dropdownClassName: 'left-[-210px]',
    panelClassName: 'w-[800px] grid-cols-4',
    columns: [
      {
        title: 'Use cases',
        links: [
          { label: 'AI agents', href: 'https://claude.com/solutions/agents' },
          { label: 'Coding', href: 'https://claude.com/solutions/coding' },
        ],
      },
      {
        title: 'Company size',
        links: [
          {
            label: 'Enterprise',
            href: 'https://claude.com/solutions/enterprise',
          },
          { label: 'Startups', href: 'https://claude.com/programs/startups' },
        ],
      },
      {
        title: 'Departments',
        links: [
          {
            label: 'Cybersecurity',
            href: 'https://claude.com/solutions/cybersecurity',
          },
          { label: 'Legal', href: 'https://claude.com/solutions/legal' },
        ],
      },
      {
        title: 'Industries',
        links: [
          {
            label: 'Customer support',
            href: 'https://claude.com/solutions/customer-support',
          },
          {
            label: 'Financial services',
            href: 'https://claude.com/solutions/financial-services',
          },
          {
            label: 'Government',
            href: 'https://claude.com/solutions/government',
          },
          {
            label: 'Healthcare',
            href: 'https://claude.com/solutions/healthcare',
          },
          {
            label: 'Higher education',
            href: 'https://claude.com/solutions/education',
          },
          {
            label: 'K-12 teachers',
            href: 'https://claude.com/solutions/teachers',
          },
          {
            label: 'Life sciences',
            href: 'https://claude.com/solutions/life-sciences',
          },
          {
            label: 'Nonprofits',
            href: 'https://claude.com/solutions/nonprofits',
          },
        ],
      },
    ],
  },
  {
    key: 'pricing',
    label: 'Pricing',
    triggerClassName: 'w-[64px]',
    dropdownClassName: 'left-0',
    panelClassName: 'w-[220px] grid-cols-1',
    columns: [
      {
        links: [
          { label: 'Overview', href: 'https://claude.com/pricing' },
          { label: 'API', href: 'https://claude.com/pricing#api' },
        ],
      },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    triggerClassName: 'w-[90px]',
    dropdownClassName: 'right-0',
    panelClassName: 'w-[600px] grid-cols-3',
    columns: [
      {
        title: 'Insights',
        links: [
          { label: 'Blog', href: 'https://claude.com/blog' },
          {
            label: 'Customer stories',
            href: 'https://claude.com/customers',
          },
          {
            label: 'Anthropic news',
            href: 'https://www.anthropic.com/news',
          },
        ],
      },
      {
        title: 'Learn',
        links: [
          {
            label: 'Anthropic Academy',
            href: 'https://academy.claude.com',
          },
          {
            label: 'Courses',
            href: 'https://academy.claude.com/courses',
          },
          {
            label: 'Tutorials',
            href: 'https://academy.claude.com/tutorials',
          },
          {
            label: 'Use cases',
            href: 'https://academy.claude.com/use-cases',
          },
        ],
      },
      {
        title: 'Connect',
        links: [
          { label: 'Events', href: 'https://www.anthropic.com/events' },
          { label: 'Community', href: 'https://claude.com/community' },
        ],
      },
    ],
  },
];

function ClaudeLogo() {
  return (
    <a
      href="https://claude.com"
      aria-label="Claude home"
      className="inline-flex shrink-0 items-center gap-[9px] text-[#141413] no-underline"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 125 125"
        className="h-[30px] w-[30px] shrink-0 text-[#d97757]"
        fill="none"
      >
        <path
          d="M54.375 118.75L56.125 111L58.125 101L59.75 93L61.25 83.125L62.125 79.875L62 79.625L61.375 79.75L53.875 90L42.5 105.375L33.5 114.875L31.375 115.75L27.625 113.875L28 110.375L30.125 107.375L42.5 91.5L50 81.625L54.875 76L54.75 75.25H54.5L21.5 96.75L15.625 97.5L13 95.125L13.375 91.25L14.625 90L24.5 83.125L49.125 69.375L49.5 68.125L49.125 67.5H47.875L43.75 67.25L29.75 66.875L17.625 66.375L5.75 65.75L2.75 65.125L0 61.375L0.25 59.5L2.75 57.875L6.375 58.125L14.25 58.75L26.125 59.5L34.75 60L47.5 61.375H49.5L49.75 60.5L49.125 60L48.625 59.5L36.25 51.25L23 42.5L16 37.375L12.25 34.75L10.375 32.375L9.625 27.125L13 23.375L17.625 23.75L18.75 24L23.375 27.625L33.25 35.25L46.25 44.875L48.125 46.375L49 45.875V45.5L48.125 44.125L41.125 31.375L33.625 18.375L30.25 13L29.375 9.75C29.0417 8.625 28.875 7.375 28.875 6L32.75 0.750006L34.875 0L40.125 0.750006L42.25 2.625L45.5 10L50.625 21.625L58.75 37.375L61.125 42.125L62.375 46.375L62.875 47.75H63.75V47L64.375 38L65.625 27.125L66.875 13.125L67.25 9.125L69.25 4.375L73.125 1.87501L76.125 3.25L78.625 6.875L78.25 9.125L76.875 18.75L73.875 33.875L72 44.125H73.125L74.375 42.75L79.5 36L88.125 25.25L91.875 21L96.375 16.25L99.25 14H104.625L108.5 19.875L106.75 26L101.25 33L96.625 38.875L90 47.75L86 54.875L86.375 55.375H87.25L102.125 52.125L110.25 50.75L119.75 49.125L124.125 51.125L124.625 53.125L122.875 57.375L112.625 59.875L100.625 62.25L82.75 66.5L82.5 66.625L82.75 67L90.75 67.75L94.25 68H102.75L118.5 69.125L122.625 71.875L125 75.125L124.625 77.75L118.25 80.875L109.75 78.875L89.75 74.125L83 72.5H82V73L87.75 78.625L98.125 88L111.25 100.125L111.875 103.125L110.25 105.625L108.5 105.375L97 96.625L92.5 92.75L82.5 84.375H81.875V85.25L84.125 88.625L96.375 107L97 112.625L96.125 114.375L92.875 115.5L89.5 114.875L82.25 104.875L74.875 93.5L68.875 83.375L68.25 83.875L64.625 121.625L63 123.5L59.25 125L56.125 122.625L54.375 118.75Z"
          fill="currentColor"
        />
      </svg>

      <span className="font-serif text-[29px] font-medium leading-none tracking-[-0.045em]">
        Claude
      </span>
    </a>
  );
}

function ChevronDown({ open = false }: { open?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`h-4 w-4 shrink-0 text-[#595955] transition-transform duration-150 ${
        open ? 'rotate-180' : ''
      }`}
    >
      <path
        d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function MarketingHeader() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="relative z-50 w-full bg-[#faf9f5] font-sans text-[#141413] antialiased"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="mx-auto hidden h-[74px] w-full max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-9 lg:grid">
        <div className="flex min-w-0 items-center justify-start">
          <ClaudeLogo />
        </div>

        <nav
          aria-label="Primary navigation"
          className="flex h-full items-center justify-center"
        >
          <div className="relative flex h-full items-center">
            {MENUS.map((menu, index) => {
              const open = activeMenu === menu.key;

              return (
                <div
                  key={menu.key}
                  className={`relative flex h-full items-center ${
                    index === MENUS.length - 1 ? 'mr-[25px]' : 'mr-6'
                  }`}
                  onMouseEnter={() => setActiveMenu(menu.key)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={open}
                    className={`flex h-[38px] items-center justify-between border-0 bg-transparent p-0 text-[15px] font-normal leading-5 tracking-[-0.012em] text-[#141413] outline-none transition-opacity duration-150 hover:opacity-60 focus-visible:opacity-60 ${menu.triggerClassName}`}
                    onClick={() =>
                      setActiveMenu((current) =>
                        current === menu.key ? null : menu.key,
                      )
                    }
                  >
                    <span>{menu.label}</span>
                    <ChevronDown open={open} />
                  </button>

                  <div
                    className={`absolute top-full z-50 pt-3 transition-all duration-150 ${menu.dropdownClassName} ${
                      open
                        ? 'pointer-events-auto translate-y-0 opacity-100 visible'
                        : 'pointer-events-none -translate-y-1 opacity-0 invisible'
                    }`}
                  >
                    <div
                      className={`grid overflow-hidden rounded-xl border border-[#dedbd3] bg-[#fffefa] px-5 py-[22px] shadow-[0_18px_55px_rgba(27,27,24,0.10)] ${menu.panelClassName}`}
                    >
                      {menu.columns.map((column, columnIndex) => (
                        <section
                          key={`${menu.key}-${column.title ?? columnIndex}`}
                          className={`min-w-0 px-[18px] ${
                            columnIndex > 0 ? 'border-l border-[#e5e2da]' : ''
                          } ${columnIndex === 0 ? 'pl-1' : ''} ${
                            columnIndex === menu.columns.length - 1 ? 'pr-1' : ''
                          }`}
                        >
                          <div className="mb-3 min-h-4 text-[11px] font-semibold uppercase leading-4 tracking-[0.07em] text-[#77746d]">
                            {column.title ?? '\u00A0'}
                          </div>

                          <div className="flex flex-col gap-px">
                            {column.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                className="block rounded-md py-[7px] text-[15px] leading-[1.35] tracking-[-0.01em] text-[#141413] no-underline transition-opacity duration-150 hover:text-[#141413] hover:opacity-55"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <a
              href={CLAUDE_LOGIN_URL}
              className="inline-flex h-[38px] items-center text-[15px] font-normal leading-5 tracking-[-0.012em] text-[#141413] no-underline transition-opacity duration-150 hover:text-[#141413] hover:opacity-60"
            >
              Login
            </a>
          </div>
        </nav>

        <div className="flex items-center justify-end gap-[10px]">
          <a
            href="https://claude.com/contact-sales"
            className="inline-flex h-[38px] w-[132px] items-center justify-center rounded-[9px] border border-[#d1cfc5] bg-transparent text-[15px] font-normal leading-5 tracking-[-0.012em] text-[#30302e] no-underline transition-colors duration-150 hover:border-[#b6b3aa] hover:bg-[#f4f2ed] hover:text-[#30302e]"
          >
            Contact sales
          </a>

          <a
            href={CLAUDE_TRY_URL}
            className="inline-flex h-[38px] w-[111px] items-center justify-center rounded-[9px] border border-[#141413] bg-[#141413] text-[15px] font-semibold leading-5 tracking-[-0.012em] text-white no-underline transition-colors duration-150 hover:border-[#30302e] hover:bg-[#30302e] hover:text-white"
          >
            Try Claude
          </a>
        </div>
      </div>

      <div className="flex h-[72px] items-center justify-between px-5 lg:hidden">
        <ClaudeLogo />

        <div className="flex items-center gap-[10px]">
          <a
            href={CLAUDE_TRY_URL}
            className="inline-flex h-[38px] items-center justify-center rounded-[9px] bg-[#141413] px-4 text-[15px] font-semibold text-white no-underline"
          >
            Try Claude
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            className="inline-flex h-[38px] w-[38px] flex-col items-center justify-center gap-[4px] rounded-[9px] border border-[#d1cfc5] bg-transparent text-[#141413]"
            onClick={() => setMobileOpen((current) => !current)}
          >
            <span className="block h-[1.5px] w-[15px] rounded-full bg-current" />
            <span className="block h-[1.5px] w-[15px] rounded-full bg-current" />
            <span className="block h-[1.5px] w-[15px] rounded-full bg-current" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 top-[72px] w-full border-t border-[#e5e2da] bg-[#faf9f5] shadow-[0_20px_40px_rgba(0,0,0,0.06)] lg:hidden">
          <div className="max-h-[calc(100vh-72px)] overflow-y-auto px-5 pb-6 pt-[18px]">
            {MENUS.map((menu) => (
              <details
                key={menu.key}
                className="group border-b border-[#e5e2da]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between py-[15px] text-[16px] [&::-webkit-details-marker]:hidden">
                  <span>{menu.label}</span>
                  <span className="transition-transform duration-150 group-open:rotate-180">
                    <ChevronDown />
                  </span>
                </summary>

                <div className="pb-[14px] pt-[2px]">
                  {menu.columns.map((column, columnIndex) => (
                    <div
                      key={`${menu.key}-mobile-${
                        column.title ?? columnIndex
                      }`}
                      className={columnIndex > 0 ? 'mt-[14px]' : ''}
                    >
                      {column.title && (
                        <div className="mb-[6px] text-[11px] font-semibold uppercase leading-4 tracking-[0.07em] text-[#77746d]">
                          {column.title}
                        </div>
                      )}

                      {column.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="block py-2 text-[15px] text-[#141413] no-underline"
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}

            <a
              href={CLAUDE_LOGIN_URL}
              className="flex min-h-12 items-center border-b border-[#e5e2da] text-[16px] text-[#141413] no-underline"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </a>

            <a
              href="https://claude.com/contact-sales"
              className="flex min-h-12 items-center text-[16px] text-[#141413] no-underline"
              onClick={() => setMobileOpen(false)}
            >
              Contact sales
            </a>
          </div>
        </div>
      )}
    </header>
  );
}