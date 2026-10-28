const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'AI for Data Platform', href: '/product' },
      { label: 'Collate vs OSS OpenMetadata', href: '/comparison' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact Us', href: '/contact-sales' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: 'https://docs.getcollate.io' },
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Privacy Policy', href: '/privacypolicy' },
      { label: 'Terms and Conditions', href: '/terms' },
      { label: 'Trust Center', href: 'https://trustcenter.getcollate.io' },
    ],
  },
] as const;

const socialLinks = [
  {
    label: 'Collate on X',
    href: 'https://twitter.com/collatedata',
    width: 18,
    height: 18,
    viewBox: '0 0 18 18',
    path: 'M10.712 7.622 17.413 0h-1.588l-5.818 6.618L5.36 0H0l7.027 10.007L0 18h1.588l6.144-6.989L12.64 18H18L10.712 7.622Zm-2.175 2.474-.712-.997L2.16 1.17H4.6l4.571 6.4.712.996 5.943 8.319h-2.439l-4.85-6.788Z',
  },
  {
    label: 'Collate on LinkedIn',
    href: 'https://www.linkedin.com/company/collateinc',
    width: 18,
    height: 18,
    viewBox: '0 0 18 18',
    path: 'M17.25 17.25v-6.869a4.225 4.225 0 0 0-4.225-4.225c-1.102 0-2.385.674-3.007 1.685V6.402H6.402V17.25h3.616v-6.39c0-.997.804-1.814 1.802-1.814a1.815 1.815 0 0 1 1.814 1.815v6.389h3.616ZM2.19 4.368A2.177 2.177 0 0 0 4.368 2.19C4.368.985 3.396 0 2.19 0A2.19 2.19 0 0 0 0 2.19c0 1.206.985 2.178 2.19 2.178ZM3.992 17.25V6.402H.402V17.25h3.59Z',
  },
  {
    label: 'Collate on YouTube',
    href: 'https://www.youtube.com/@CollateData',
    width: 20,
    height: 14,
    viewBox: '0 0 20 14',
    path: 'm8 10 5.19-3L8 4v6Zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L20 7c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L10 14c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L0 7c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73C2.64.31 3.5.22 4.82.16c1.3-.07 2.49-.1 3.59-.1L10 0c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73Z',
  },
] as const;

const complianceBadges = [
  { label: 'SOC2 Type 1', image: 'soc2.svg' },
  { label: 'GDPR', image: 'gdpr.svg' },
  { label: 'CCPA', image: 'ccpa.svg' },
  { label: 'Linux Foundation', image: 'linux-foundation.svg' },
] as const;

function referenceHref(href: string) {
  // Most reference routes do not exist on the Yak Ops website yet.
  return href.startsWith('https://') ? href : `https://www.getcollate.io${href}`;
}

/**
 * Shared marketing footer. Text, badges, imagery and links are reference
 * content and should be replaced during the Yak Ops branding pass.
 */
export default function MarketingFooter() {
  return (
    <footer className="mt-auto bg-white px-5 py-20 text-black sm:px-10 md:py-16">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mx-auto grid grid-cols-1 gap-8 text-left md:gap-0 lg:grid-cols-5">
          <div className="col-span-2 mb-4 flex justify-start lg:mb-0">
            <a aria-label="Collate home" className="inline-flex items-center" href="/">
              <img
                alt="Collate: Data Collaboration for Teams"
                className="h-[50px] w-[200px] cursor-pointer object-contain object-left"
                decoding="async"
                height={50}
                loading="lazy"
                src="https://www.getcollate.io/images/collate-logo.svg"
                width={200}
              />
            </a>
          </div>
          <nav
            aria-label="Footer navigation"
            className="col-span-3 grid grid-cols-2 gap-8 md:flex md:flex-row md:justify-between md:gap-10"
          >
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="m-0 text-[18px] font-semibold">{group.title}</h2>
                <ul className="m-0 list-none pt-4 pl-0 sm:pt-5">
                  {group.links.map((link) => (
                    <li className="py-2" key={link.label}>
                      <a
                        aria-label={link.label}
                        className="text-[14px] font-normal text-black transition-colors duration-300 hover:text-[#73718a] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1366bf]"
                        href={referenceHref(link.href)}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-row items-center justify-between gap-8 border-b border-[#e5e7eb] pb-10 md:mt-12 md:gap-12">
          <nav aria-label="Social media">
            <ul className="m-0 flex list-none justify-start pt-4 pl-0 sm:pt-8">
              {socialLinks.map((social) => (
                <li
                  className="mr-2 flex items-center justify-center rounded-[6px] bg-gradient-to-r from-[#f5f0ff] to-[#edf5ff] px-[6px] py-1.5 transition-colors duration-300 hover:bg-[#e8e8ee]"
                  key={social.label}
                >
                  <a
                    aria-label={social.label}
                    className="text-[#73718a] hover:text-[#383651] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1366bf]"
                    href={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      aria-hidden="true"
                      fill="currentColor"
                      height={social.height}
                      viewBox={social.viewBox}
                      width={social.width}
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            aria-label="Compliance and community badges"
            className="flex flex-wrap items-center justify-start gap-3 md:gap-5"
          >
            {complianceBadges.map((badge) => (
              <img
                alt={badge.label}
                className="block h-[60px] w-[50px] object-contain md:w-[60px]"
                decoding="async"
                height={60}
                key={badge.label}
                loading="lazy"
                src={`https://www.getcollate.io/images/compliance/${badge.image}`}
                width={60}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 text-left md:flex-row md:justify-between md:gap-12">
          <div className="text-sm font-normal text-black">
            <p className="m-0">Copyright © 2026 Collate. All Rights Reserved</p>
            <p className="m-0">Collate® is a registered trademark of Collate, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
