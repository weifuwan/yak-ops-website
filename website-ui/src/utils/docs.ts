import GithubSlugger from 'github-slugger';

export type DocsTocItem = {
  id: string;
  title: string;
  level: number;
};

const stripHeadingMarkdown = (value: string) =>
  value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/[~*_]/g, '')
    .trim();

export function extractDocsToc(markdown: string): DocsTocItem[] {
  const slugger = new GithubSlugger();
  const items: DocsTocItem[] = [];
  let inFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }

    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) {
      continue;
    }

    const level = match[1].length;
    const title = stripHeadingMarkdown(match[2]);
    const id = `doc-${slugger.slug(title)}`;

    if (level === 2 || level === 3) {
      items.push({ id, title, level });
    }
  }

  return items;
}
