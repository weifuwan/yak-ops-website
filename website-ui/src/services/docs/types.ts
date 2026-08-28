export type DocsNavigationItem = {
  slug: string;
  title: string;
  description: string;
};

export type DocsNavigationSection = {
  title: string;
  items: DocsNavigationItem[];
};

export type DocsNavigation = {
  defaultSlug: string;
  sections: DocsNavigationSection[];
};

export type DocsDocument = {
  slug: string;
  title: string;
  section: string;
  markdown: string;
  previous?: DocsNavigationItem | null;
  next?: DocsNavigationItem | null;
};

export type DocsSearchHit = {
  slug: string;
  title: string;
  section: string;
  snippet: string;
};

export type DocsSearchResponse = {
  query: string;
  hits: DocsSearchHit[];
};
