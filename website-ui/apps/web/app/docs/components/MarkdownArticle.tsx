import { Check, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isValidElement, type ReactNode, useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const ARTICLE_CLASS_NAME = [
  'max-w-none font-yak text-[16px] leading-[1.7] text-[#52525B]',
  '[&_h1]:mb-5 [&_h1]:mt-0 [&_h1]:text-[36px] [&_h1]:font-semibold [&_h1]:leading-[1.15] [&_h1]:tracking-[-0.025em] [&_h1]:text-[#18181B]',
  '[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:scroll-mt-[88px] [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:leading-[1.3] [&_h2]:tracking-[-0.015em] [&_h2]:text-[#18181B]',
  '[&_h3]:mb-2.5 [&_h3]:mt-8 [&_h3]:scroll-mt-[88px] [&_h3]:text-[19px] [&_h3]:font-semibold [&_h3]:leading-[1.35] [&_h3]:text-[#27272A]',
  '[&_p]:my-4',
  '[&_strong]:font-semibold [&_strong]:text-[#27272A]',
  '[&_a]:font-medium [&_a]:text-[#18181B] [&_a]:underline [&_a]:decoration-[#A1A1AA] [&_a]:underline-offset-[3px] hover:[&_a]:decoration-[#18181B]',
  '[&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6',
  '[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6',
  '[&_li]:pl-1',
  '[&_blockquote]:my-6 [&_blockquote]:rounded-r-xl [&_blockquote]:border-0 [&_blockquote]:border-l-[3px] [&_blockquote]:border-solid [&_blockquote]:border-[#D4D4D8] [&_blockquote]:bg-[#ECECEC] [&_blockquote]:px-5 [&_blockquote]:py-1 [&_blockquote]:text-[#52525B]',
  '[&_code]:rounded-md [&_code]:bg-[#E4E4E7] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-yak-mono [&_code]:text-[0.9em] [&_code]:text-[#27272A]',
  '[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm',
  '[&_th]:border-b [&_th]:border-solid [&_th]:border-[#D4D4D8] [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[#27272A]',
  '[&_td]:border-b [&_td]:border-solid [&_td]:border-[#E4E4E7] [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top',
  '[&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-solid [&_hr]:border-[#E4E4E7]',
  '[&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-xl',
].join(' ');

const nodeText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(nodeText).join('');
  }
  if (isValidElement(node)) {
    return nodeText((node.props as { children?: ReactNode }).children);
  }
  return '';
};

function CodeBlock({ children }: { children?: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const code = nodeText(children).replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-2xl bg-[#18181B] text-[#F4F4F5] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
      <button
        className="absolute right-3 top-3 z-10 inline-flex h-8 items-center gap-1.5 rounded-lg border border-solid border-white/10 bg-white/10 px-2.5 text-xs text-white/75 opacity-0 hover:bg-white/15 group-hover:opacity-100 focus-visible:opacity-100"
        onClick={handleCopy}
        type="button"
      >
        {copied ? <Check /> : <Copy />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <pre className="m-0 overflow-x-auto bg-transparent p-5 font-yak-mono text-[13px] leading-6 text-inherit [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
        {children}
      </pre>
    </div>
  );
}

const markdownComponents: Components = {
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  a: ({ href, children }) => {
    if (href?.startsWith('/docs/')) {
      return <Link to={href}>{children}</Link>;
    }
    const external = Boolean(href && /^(https?:)?\/\//.test(href));
    return (
      <a href={href} rel={external ? 'noreferrer noopener' : undefined} target={external ? '_blank' : undefined}>
        {children}
      </a>
    );
  },
};

type MarkdownArticleProps = {
  markdown: string;
};

export default function MarkdownArticle({ markdown }: MarkdownArticleProps) {
  return (
    <article className={ARTICLE_CLASS_NAME}>
      <ReactMarkdown
        components={markdownComponents}
        rehypePlugins={[[rehypeSlug, { prefix: 'doc-' }], rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
