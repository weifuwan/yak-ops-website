import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

const featured = [
  [
    'Company',
    'AI for data needs a context layer. See how OpenAI and Anthropic do it.',
    'https://cloudmate-test.s3.us-east-1.amazonaws.com/res/hashnode/image/upload/v1781056382090/ad1c39ab-da12-4752-8f3b-23f355c2b000.png',
    'ai-for-data-needs-a-context-layer-see-how-openai-and-anthropic-do-it',
  ],
  [
    'Company',
    'Forrester Just Defined the Context Layer. Memory Is The Hard Part.',
    'https://cdn.hashnode.com/uploads/covers/68f7e5e9cd62a42c206feaa6/fb1455d7-8601-40e3-95ad-ef4361cacc14.png',
    'forrester-context-layer-definition-memory',
  ],
  [
    '',
    'Token Efficiency in Production: Lessons from a Multi-Agent Platform',
    'https://cdn.hashnode.com/uploads/gql/6ab9dbfe2580a39e3de210ea/bb7577df-10bf-4a97-818b-17256ec3187c.png',
    'token-efficiency-in-production-multi-agent-platform',
  ],
] as const;
const posts = [
  [
    'Product',
    'Context Layers, From First Principles',
    'Every vendor in this category now calls some part of its product a "context layer" or an "ontology." The word has stopped telling buyers anything, because each vendor defines it, grades itself against…',
    'https://cdn.hashnode.com/uploads/covers/68f7e5e9cd62a42c206feaa6/245c6e55-e6e3-4ae3-ab89-f5d42b941157.png',
    'context-layers-first-principles-independent-verdict',
  ],
  [
    'Company',
    "Why We Built a Native Agentic Harness for Data on Top of Collate's Context Platform",
    'Claude Code and Codex are usually described as coding agents. That description is accurate, but it leaves out a large part of why they are useful. A strong model is clearly important, but the model is…',
    'https://cdn.hashnode.com/uploads/covers/68f7e5e9cd62a42c206feaa6/a6e860d2-9655-4ed2-a461-06cc86f296bd.png',
    'why-we-built-a-native-agentic-harness-for-data',
  ],
  [
    'Company',
    'Forrester Just Defined the Context Layer. Memory Is The Hard Part.',
    'How OpenAI and Anthropic built context layers for their own data agents. In June, Anthropic published a post on how they built self-service analytics on Claude. Without the curated Skills layer they bu…',
    'https://cdn.hashnode.com/uploads/covers/68f7e5e9cd62a42c206feaa6/fb1455d7-8601-40e3-95ad-ef4361cacc14.png',
    'forrester-context-layer-definition-memory',
  ],
  [
    'Release',
    'Announcing Collate 2.0: Build Trusted Context, Then Put It to Work',
    'Ask an AI agent any business question ("which regions missed our quarterly revenue plan?"), and it will find a sales table in your data warehouse, write valid SQL, and hand you a number. However, whet…',
    'https://cdn.hashnode.com/res/hashnode/image/upload/v1787503968669/b9269dc5-c527-4103-9159-2c1416e46977.png',
    'announcing-collate-20',
  ],
  [
    'Product',
    'Introducing AI Governance Studio: Govern the AI Your Enterprise Runs',
    'Governing enterprise data has historically meant knowing what data you had, who owned it, and what it was allowed to do. Now, the same challenges apply to the AI reading that data. Every LLM, MCP serv…',
    'https://cloudmate-test.s3.us-east-1.amazonaws.com/res/hashnode/image/upload/v1785179538662/b8740475-bc0c-4a13-8542-6060e74e440b.png',
    'introducing-ai-governance-studio',
  ],
  [
    'Company',
    'Collate Governs Enterprise AI Wherever It Runs',
    'Menlo Park, Calif. — August 25, 2026 — Collate Inc., the AI for Data company, today announced AI Governance Studio, a new capability that gives organizations the power to discover, organize, and gover…',
    'https://cdn.hashnode.com/res/hashnode/image/upload/v1785179281986/52bb95cc-f702-4569-a32e-e47f559d22b3.png',
    'collate-governs-enterprise-ai-wherever-it-runs',
  ],
] as const;
const tags = [
  ['Data Governance', 37, 'data-governance'],
  ['Metadata', 21, 'metadata'],
  ['OpenMetadata', 19, 'openmetadata'],
  ['Data Engineering', 17, 'data-engineering'],
  ['Data Quality', 16, 'data-quality'],
  ['Data Discovery', 14, 'data-discovery'],
  ['AI Agents', 13, 'ai-agents'],
  ['Data Observability', 13, 'data-observability'],
] as const;
const stories = [
  [
    'Loggi 16,000 dashboards removed for huge cost savings',
    'loggi',
    'https://open-metadata.org/case-study/loggi',
    'Learn More',
  ],
  ['Gorgias 45K+ Data assets cataloged', 'gorgias', 'https://open-metadata.org/case-study/gorgias', 'Read More'],
  [
    '7 business domains, managed with 30+ analytics process per domain',
    'freenow',
    'https://medium.com/breaking-data-silos-lineage-for-cross-domain/data-management-at-freenow-the-lineage-and-announcements-approach-177f387a9180',
    'Read More',
  ],
] as const;

const origin = 'https://www.getcollate.io';
const articleUrl = (slug: string) => origin + '/blog/' + slug;

function FeaturedArticle({ item, large = false }: { item: (typeof featured)[number]; large?: boolean }) {
  const [category, title, image, slug] = item;
  return (
    <a
      className="group flex min-w-0 flex-col text-black no-underline"
      href={articleUrl(slug)}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-2xl">
        <img
          alt={title}
          className="absolute inset-0 h-full w-full scale-[1.025] object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
          decoding="async"
          loading={large ? 'eager' : 'lazy'}
          src={image}
        />
      </div>
      <div className={large ? 'px-1 pt-6 lg:px-4' : 'px-1 pt-5 lg:px-4'}>
        {category && (
          <span className="mb-3 inline-block w-fit rounded-[4px] border border-[#1658bb]/20 bg-white px-1.5 py-0.5 text-sm text-[#1658bb]">
            {category}
          </span>
        )}
        <h3
          className={`m-0 font-semibold tracking-[-0.01em] text-black ${large ? 'text-2xl leading-[1.2] md:text-3xl lg:text-[34px]' : 'text-lg leading-[1.3] md:text-xl'}`}
        >
          {title}
        </h3>
        <span
          className={`mt-5 inline-block rounded-[8px] bg-[#fff057] px-5 py-3 text-base font-semibold text-black transition-colors duration-200 group-hover:bg-[#ffe237] ${large ? '' : 'md:mt-2 md:bg-transparent md:p-0 md:text-[#1658bb] md:group-hover:bg-transparent'}`}
        >
          Read More
        </span>
      </div>
    </a>
  );
}

/**
 * Blog reference snapshot: first-page content comes from the supplied HTML.
 * External article and tag links remain on Collate until local content exists.
 */
export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);
  const filtering = query.trim() !== '' || topic !== '';
  const keyword = query.trim().toLowerCase();
  const results = posts.filter(([category, title, description]) => {
    const matchesText =
      !keyword || [category, title, description].some((value) => value.toLowerCase().includes(keyword));
    return matchesText && (!topic || topic === category);
  });

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mt-24 bg-gradient-to-t from-[#e6f2ff] to-white">
        <section
          aria-labelledby="blog-featured-heading"
          className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 xl:px-16"
        >
          <h2 className="m-0 mb-6 text-2xl font-semibold tracking-[-0.01em] md:text-3xl" id="blog-featured-heading">
            Featured
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] lg:gap-6">
            <FeaturedArticle item={featured[0]} large />
            <div className="flex min-w-0 flex-col gap-8">
              <FeaturedArticle item={featured[1]} />
              <FeaturedArticle item={featured[2]} />
            </div>
          </div>
        </section>
      </div>

      <section
        aria-label="Browse Collate blog articles"
        className="mx-auto max-w-[1440px] overflow-hidden px-5 py-10 md:px-10 xl:px-16"
      >
        <div className="mb-10 border-b border-[#e5e9ee] pb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-8">
            <div className="min-w-0 flex-1">
              <label className="mb-2 block text-[#505769]" htmlFor="blog-search">
                Search
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-[6px] border border-[#a9b0bd] bg-white px-4 py-3 pr-11 text-base outline-none placeholder:text-[#a2a9b8] focus:border-[#52637e]"
                  id="blog-search"
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Enter Keywords"
                  type="search"
                  value={query}
                />
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#717a8a]"
                  size={18}
                />
              </div>
            </div>
            <div className="md:w-[340px]">
              <label className="mb-2 block text-[#505769]" htmlFor="blog-topics">
                Topics
              </label>
              <div className="relative">
                <select
                  className="w-full cursor-pointer appearance-none rounded-[6px] border border-[#a9b0bd] bg-white px-4 py-3 pr-11 text-base text-[#505769] outline-none focus:border-[#52637e]"
                  id="blog-topics"
                  onChange={(event) => {
                    setTopic(event.target.value);
                    setPage(1);
                  }}
                  value={topic}
                >
                  <option value="">Select Topic</option>
                  <option value="Company">Company</option>
                  <option value="Product">Product</option>
                  <option value="Release">Release</option>
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#69738a]"
                  size={20}
                />
              </div>
            </div>
            <button
              className={`self-start whitespace-nowrap border-0 bg-transparent p-0 text-[#195fc1] hover:text-[#093f88] md:self-auto md:py-3 ${filtering ? 'cursor-pointer' : 'invisible'}`}
              disabled={!filtering}
              onClick={() => {
                setQuery('');
                setTopic('');
                setPage(1);
              }}
              type="button"
            >
              Clear all filters
            </button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
            <span className="mr-1 text-[#505769]">Popular tags</span>
            {tags.map(([label, count, slug]) => (
              <a
                className="inline-flex items-center gap-2 rounded-full border border-[#a9b0bd] bg-white px-4 py-1.5 text-[#525c6c] transition-colors hover:border-[#525f73]"
                href={origin + '/blog/tag/' + slug}
                key={slug}
                rel="noopener noreferrer"
                target="_blank"
              >
                {label}
                <span className="text-sm text-[#687387]">{count}</span>
              </a>
            ))}
            <a
              className="ml-1 text-[#606c7e] hover:text-black"
              href={origin + '/blog'}
              rel="noopener noreferrer"
              target="_blank"
            >
              View all tags →
            </a>
          </div>
        </div>
        <h1 className="m-0 text-left text-3xl font-medium">
          {filtering && page === 1 ? 'Blog search results' : `Page ${page} of Collate Blog`}
        </h1>
        {page === 1 ? (
          results.length > 0 ? (
            <div
              className="mt-10 grid w-full grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-3"
              id="blog-posts"
            >
              {results.map(([category, title, description, image, slug]) => (
                <article
                  className="flex w-full flex-col rounded-md bg-white p-4 shadow-[0_2px_16px_rgba(26,39,70,0.10)]"
                  key={slug}
                >
                  <a
                    className="flex h-full flex-col text-black no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#135fbe]"
                    href={articleUrl(slug)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="relative aspect-[500/275] w-full overflow-hidden rounded-md">
                      <img
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover"
                        decoding="async"
                        loading="lazy"
                        src={image}
                      />
                    </div>
                    <span className="mt-8 text-[#78808f]">{category}</span>
                    <h2 className="m-0 mt-2 text-[22px] leading-[1.35] font-semibold tracking-[0.01em]">{title}</h2>
                    <p className="m-0 mt-2 text-[#78808f]">{description}</p>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-[#667387]" role="status">
              No matching articles in the supplied first-page snapshot.
            </p>
          )
        ) : (
          <div className="mt-10 rounded-lg border border-[#e3e7ed] bg-[#f8fbff] p-8 text-[#5f6a7e]">
            The provided reference contains articles for page 1 only.
            <a
              className="ml-2 text-[#145cb9] underline"
              href={origin + '/blog'}
              rel="noopener noreferrer"
              target="_blank"
            >
              Browse the full blog on Collate
            </a>
          </div>
        )}
        {!filtering && (
          <nav aria-label="Blog pagination" className="mt-16 flex justify-end">
            <div className="inline-flex items-center overflow-hidden rounded-[6px] border border-[#e4e8ee] bg-white">
              <button
                aria-label="Previous page"
                className="grid h-10 w-10 cursor-pointer place-items-center disabled:opacity-40"
                disabled={page === 1}
                onClick={() => setPage(Math.max(1, page - 1))}
                type="button"
              >
                <ChevronLeft size={18} />
              </button>
              {[1, 2, 3, 12].map((value) => (
                <button
                  aria-current={page === value ? 'page' : undefined}
                  className={`h-10 w-10 cursor-pointer text-base font-medium ${page === value ? 'bg-[#f1f2f7] text-[#7652a9]' : 'text-[#919aa9] hover:bg-[#f7f9fc]'}`}
                  key={value}
                  onClick={() => setPage(value)}
                  type="button"
                >
                  {value}
                </button>
              ))}
              <button
                aria-label="Next page"
                className="grid h-10 w-10 cursor-pointer place-items-center disabled:opacity-40"
                disabled={page === 12}
                onClick={() => setPage(Math.min(12, page + 1))}
                type="button"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </nav>
        )}
      </section>

      <section className="bg-gradient-to-t from-[#e7f2ff] to-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 xl:px-16">
          <a
            className="text-black no-underline"
            href={origin + '/case-studies'}
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2 className="m-0 text-3xl font-semibold tracking-[-0.01em] sm:text-4xl">Collate Success Stories</h2>
          </a>
          <div className="mt-8 grid gap-6 sm:grid-cols-6">
            {stories.map(([title, asset, href, action]) => (
              <article
                className="flex h-full flex-col rounded-3xl border border-white bg-gradient-to-t from-[#e9eff5] to-white p-3 sm:col-span-3 md:p-5 lg:col-span-2"
                key={title}
              >
                <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    src={origin + '/images/customer-gallery/header/' + asset + '-bg.svg'}
                  />
                  <img
                    alt={asset}
                    className="absolute top-1/2 left-1/2 h-20 w-[55%] -translate-x-1/2 -translate-y-1/2 object-contain"
                    loading="lazy"
                    src={origin + '/images/customer-gallery/header/' + asset + '-logo.svg'}
                  />
                </div>
                <div className="my-4 flex flex-1 flex-col">
                  <h3 className="m-0 mt-4 text-xl font-medium tracking-[-0.02em] md:text-2xl lg:text-3xl">{title}</h3>
                  <div className="mt-auto pt-6">
                    <a
                      className="inline-flex min-h-10 items-center justify-center rounded-[8px] bg-[#1557b8] px-6 py-2 text-base font-medium text-white no-underline transition-colors hover:bg-[#0b418d]"
                      href={href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {action}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
