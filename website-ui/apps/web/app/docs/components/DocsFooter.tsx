import { Linkedin, Youtube } from 'lucide-react';

const legalLinks = [
  { title: 'Terms of Service', href: 'https://www.getcollate.io/terms' },
  { title: 'Privacy Policy', href: 'https://www.getcollate.io/privacypolicy' },
  { title: 'Trust Center', href: 'https://trustcenter.getcollate.io' },
  { title: 'Contact Us', href: 'https://www.getcollate.io/contact-sales' },
] as const;

const socialLinkClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-md text-[#1677f4] no-underline transition-colors hover:bg-[#f1f7ff] hover:text-[#005bd2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677f4]';

/** Reference footer for Collate-specific content on the Docs landing page. */
export default function DocsFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1260px] px-5 pt-9 pb-10 sm:px-8 sm:pt-12">
      <div className="grid items-center gap-x-10 gap-y-6 text-[14px] text-[#717680] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <p className="m-0 text-center leading-6 md:text-left">©2026 Collate. All rights reserved.</p>

        <nav
          aria-label="Legal and contact links"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {legalLinks.map((link) => (
            <a
              className="whitespace-nowrap text-[14px] leading-6 text-[#252b37] no-underline transition-colors hover:text-[#086cf5] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677f4]"
              href={link.href}
              key={link.title}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.title}
            </a>
          ))}
        </nav>

        <nav aria-label="Social media" className="flex items-center justify-center gap-2 md:justify-end">
          <a
            aria-label="Collate on LinkedIn"
            className={socialLinkClass}
            href="https://www.linkedin.com/company/collateinc"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Linkedin aria-hidden="true" size={18} fill="currentColor" strokeWidth={1.4} />
          </a>
          <a
            aria-label="Collate on YouTube"
            className={socialLinkClass}
            href="https://www.youtube.com/@CollateData"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Youtube aria-hidden="true" size={19} fill="currentColor" stroke="white" strokeWidth={1.7} />
          </a>
          <a
            aria-label="Collate on X"
            className={socialLinkClass}
            href="https://twitter.com/collatedata"
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" fill="currentColor" height="18" viewBox="0 0 18 18" width="18">
              <path d="M10.712 7.622 17.413 0h-1.588l-5.818 6.618L5.36 0H0l7.027 10.007L0 18h1.588l6.144-6.989L12.64 18H18L10.712 7.622Zm-2.175 2.474-.712-.997L2.16 1.17H4.6l4.571 6.4.712.996 5.943 8.319h-2.439l-4.85-6.788Z" />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
}
