import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { isValidElement, type ReactNode, useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

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
    <div className="yak-docs-code-block">
      <button className="yak-docs-code-block__copy" onClick={handleCopy} type="button">
        {copied ? <CheckOutlined /> : <CopyOutlined />}
        <span>{copied ? '已复制' : '复制'}</span>
      </button>
      <pre>{children}</pre>
    </div>
  );
}

const markdownComponents: Components = {
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  a: ({ href, children, ...props }) => {
    if (href?.startsWith('/docs/')) {
      return <Link to={href}>{children}</Link>;
    }
    const external = Boolean(href && /^(https?:)?\/\//.test(href));
    return (
      <a
        {...props}
        href={href}
        rel={external ? 'noreferrer noopener' : undefined}
        target={external ? '_blank' : undefined}
      >
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
    <article className="yak-docs-markdown">
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
