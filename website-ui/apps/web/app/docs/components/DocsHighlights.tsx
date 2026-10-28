import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

type Highlight = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

// These highlights refer to Collate 2.0 and link to its original documentation.
const highlights: readonly Highlight[] = [
  {"title":"Collate AI Chat","description":"Ask questions about your data in plain language and get back charts, insights, and answers — no SQL required.","href":"https://docs.getcollate.io/ai-2-0/collate-ai/collate-ai-chat","icon":"https://mintcdn.com/collatedocs/q9W0TCgsCU2-B-iR/public/images/homepage-icons/askcollate.svg?fit=max&auto=format&n=q9W0TCgsCU2-B-iR&q=85&s=af1a691644809f88bb7bd03aff793363"},
  {"title":"AI Studio","description":"Create and manage AI agents and personas to automate metadata discovery, governance reviews, and data quality workflows.","href":"https://docs.getcollate.io/ai-2-0/collate-ai/ai-studio","icon":"https://mintcdn.com/collatedocs/FeqjA3b-bWQ6FbVP/public/images/icons/ai-studio.png?fit=max&auto=format&n=FeqjA3b-bWQ6FbVP&q=85&s=8479d166484482d4d153c40da15607e7"},
  {"title":"Context Center","description":"Manage the knowledge base your AI agents draw from — articles, documents, and memories that keep every answer grounded in your organization’s context.","href":"https://docs.getcollate.io/ai-2-0/collate-ai/context-center","icon":"https://mintcdn.com/collatedocs/FeqjA3b-bWQ6FbVP/public/images/icons/context-center.png?fit=max&auto=format&n=FeqjA3b-bWQ6FbVP&q=85&s=e08ed1523f1e4d94745aecb80c9799db"},
  {"title":"AI Automations","description":"Automatically document, classify, test, and enrich your data assets on a schedule — no manual work required.","href":"https://docs.getcollate.io/ai-2-0/collate-ai/ai-automations","icon":"https://mintcdn.com/collatedocs/upR0ShcKvEojE0Rd/public/images/ai-2.0/ai-icons/ai-automation.png?fit=max&auto=format&n=upR0ShcKvEojE0Rd&q=85&s=7d4fa2cf97f6984f6cb7133b773e1e9c"},
  {"title":"AI Analytics","description":"Pin charts from Collate AI Chat to dashboards that refresh automatically and deliver results to your team on a schedule.","href":"https://docs.getcollate.io/ai-2-0/collate-ai/ai-analytics","icon":"https://mintcdn.com/collatedocs/q9W0TCgsCU2-B-iR/public/images/homepage-icons/insights.svg?fit=max&auto=format&n=q9W0TCgsCU2-B-iR&q=85&s=d14723743333262bdfbe31777c786301"},
  {"title":"MCP Server","description":"Connect Collate AI with Claude, Cursor, VS Code, and other MCP clients for AI-powered data access anywhere.","href":"https://docs.getcollate.io/ai-2-0/how-to-guides/mcp","icon":"https://mintcdn.com/collatedocs/upR0ShcKvEojE0Rd/public/images/ai-2.0/ai-icons/mcp-server.png?fit=max&auto=format&n=upR0ShcKvEojE0Rd&q=85&s=52e9f84ace82051e9261d3ee824feba1"},
];

function HighlightIcon({ highlight }: { highlight: Highlight }) {
  const [imageFailed, setImageFailed] = useState(false);

  return imageFailed ? (
    <Sparkles aria-hidden="true" className="text-[#087bf5]" size={48} strokeWidth={1.7} />
  ) : (
    <img
      alt=""
      aria-hidden="true"
      className="block h-12 w-12 shrink-0 object-contain"
      height={48}
      loading="lazy"
      onError={() => setImageFailed(true)}
      src={highlight.icon}
      width={48}
    />
  );
}

export default function DocsHighlights() {
  return (
    <section
      aria-labelledby="docs-highlights-title"
      className="mx-auto w-full max-w-[1300px] px-5 pt-12 pb-24 text-center sm:px-12"
    >
      <span className="inline-flex items-center justify-center rounded-full bg-[#f0f9ff] px-5 py-2 text-[14px] font-medium text-[#0ba5ec]">
        Highlights
      </span>
      <h2
        className="m-0 mt-6 text-[clamp(30px,3.5vw,40px)] leading-[1.2] font-medium tracking-[-0.025em] text-[#181d27]"
        id="docs-highlights-title"
      >
        What’s New at Collate 2.0
      </h2>
      <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-[1.5] text-[#717680] sm:text-[18px]">
        Stay up-to-date with the latest features, improvements, and updates to Collate.
      </p>

      <div className="mx-auto mt-[60px] grid w-full max-w-[850px] grid-cols-1 gap-8 text-left sm:grid-cols-2">
        {highlights.map((highlight) => (
          <article
            className="flex min-w-0 flex-col rounded-[20px] border border-[#edf0f5] bg-white p-7 shadow-[0_4px_12px_-1px_rgba(10,13,18,0.06)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#d6e8ff] hover:bg-[#fbfdff] hover:shadow-[0_6px_16px_-1px_rgba(10,13,18,0.09)]"
            key={highlight.title}
          >
            <HighlightIcon highlight={highlight} />
            <h3 className="m-0 mt-3 text-[20px] leading-[1.35] font-medium text-[#181d27]">
              {highlight.title}
            </h3>
            <p className="mt-3 mb-6 text-[15px] leading-[1.7] text-[#667085]">
              {highlight.description}
            </p>
            <a
              className="mt-auto inline-flex w-fit items-center gap-2 text-[15px] font-medium text-[#086cf5] no-underline hover:text-[#004cd3] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
              href={highlight.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              Learn More
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
