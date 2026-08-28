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
  let fenceMarker: string | undefined;

  for (const line of markdown.split(/\r?\n/)) {
    const fence = /^\s*(`{3,}|~{3,})/.exec(line);
    if (fence) {
      const marker = fence[1][0];
      if (!fenceMarker) {
        fenceMarker = marker;
      } else if (fenceMarker === marker) {
        fenceMarker = undefined;
      }
      continue;
    }
    if (fenceMarker) {
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
