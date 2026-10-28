const articles = [
  {
    title: 'Token Efficiency in Production: Lessons from a Multi-Agent Platform',
    description:
      'In Why We Built a Native Agentic Harness for Data, our CTO and co-founder, Harsha Chintalapani made the case that the model is only one component of an agent. Around it sits a harness that manages con…',
    href: '/blog/token-efficiency-in-production-multi-agent-platform',
    image: 'https://cdn.hashnode.com/uploads/gql/6ab9dbfe2580a39e3de210ea/bb7577df-10bf-4a97-818b-17256ec3187c.png',
  },
  {
    title: 'Context Layers, From First Principles',
    description:
      'Every vendor in this category now calls some part of its product a "context layer" or an "ontology." The word has stopped telling buyers anything, because each vendor defines it, grades itself against…',
    href: '/blog/context-layers-first-principles-independent-verdict',
    image: 'https://cdn.hashnode.com/uploads/covers/68f7e5e9cd62a42c206feaa6/245c6e55-e6e3-4ae3-ab89-f5d42b941157.png',
  },
  {
    title: "Why We Built a Native Agentic Harness for Data on Top of Collate's Context Platform",
    description:
      'Claude Code and Codex are usually described as coding agents. That description is accurate, but it leaves out a large part of why they are useful. A strong model is clearly important, but the model is…',
    href: '/blog/why-we-built-a-native-agentic-harness-for-data',
    image: 'https://cdn.hashnode.com/uploads/covers/68f7e5e9cd62a42c206feaa6/a6e860d2-9655-4ed2-a461-06cc86f296bd.png',
  },
  {
    title: 'Forrester Just Defined the Context Layer. Memory Is The Hard Part.',
    description:
      'How OpenAI and Anthropic built context layers for their own data agents. In June, Anthropic published a post on how they built self-service analytics on Claude. Without the curated Skills layer they bu…',
    href: '/blog/forrester-context-layer-definition-memory',
    image: 'https://cdn.hashnode.com/uploads/covers/68f7e5e9cd62a42c206feaa6/fb1455d7-8601-40e3-95ad-ef4361cacc14.png',
  },
  {
    title: 'Announcing Collate 2.0: Build Trusted Context, Then Put It to Work',
    description:
      'Ask an AI agent any business question ("which regions missed our quarterly revenue plan?"), and it will find a sales table in your data warehouse, write valid SQL, and hand you a number. However, whet…',
    href: '/blog/announcing-collate-20',
    image:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1787503968669/b9269dc5-c527-4103-9159-2c1416e46977.png',
  },
] as const;

/**
 * Reference knowledge-center cards. The supplied excerpts are truncated;
 * use the source article links and covers until Yak Ops publishes its own.
 */
export default function HomeKnowledgeCenterSection() {
  return (
    <section aria-label="Knowledge center articles" className="max-sm:px-4 md:pl-10 lg:px-0">
      <div className="mx-auto max-w-[1440px]">
        <div className="px-6 pt-12 pb-24 md:px-10 md:pt-20 lg:px-0">
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:flex lg:items-stretch lg:overflow-x-auto lg:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {articles.map((article) => (
              <article className="mb-2 flex min-w-0 flex-col lg:w-[400px] lg:min-w-[400px]" key={article.href}>
                <a
                  className="flex h-full flex-col text-black no-underline hover:text-black focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1268ce]"
                  href={`https://www.getcollate.io${article.href}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md">
                    <img
                      alt={article.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      decoding="async"
                      loading="lazy"
                      src={article.image}
                    />
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col gap-6 px-1 pt-6 pb-4 md:gap-0 md:pb-12">
                    <h3 className="m-0 text-[18px] leading-6 font-semibold text-black">{article.title}</h3>
                    <p className="m-0 flex-1 text-[14px] text-black md:mt-6">{article.description}</p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
