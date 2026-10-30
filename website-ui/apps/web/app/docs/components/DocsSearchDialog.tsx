import { ArrowDown, ArrowUp, CornerDownLeft, FileText, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  clearDocsSearchHistory,
  getDocsNavigation,
  getDocsSearchHistory,
  saveDocsSearchHistory,
  type DocsNavigation,
  type DocsSearchHistoryItem,
  type DocsSearchHistoryRequest,
} from '@/service/docs';

type Props = { onClose: () => void };
type SearchItem = { key: string; title: string; slug: string | null; query: string; anchor?: string | null };

const LOCAL_HISTORY_KEY = 'yak-ops-docs-search-history';
const MAX_RECENT = 10;

function readLocalHistory(): DocsSearchHistoryItem[] {
  try {
    const value: unknown = JSON.parse(sessionStorage.getItem(LOCAL_HISTORY_KEY) || '[]');
    if (!Array.isArray(value)) return [];
    return value
      .filter((item): item is DocsSearchHistoryItem =>
        Boolean(item && typeof item === 'object' && typeof item.searchQuery === 'string'),
      )
      .slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

function rememberLocal(entry: DocsSearchHistoryRequest): DocsSearchHistoryItem[] {
  const next: DocsSearchHistoryItem = {
    searchQuery: entry.searchQuery,
    documentSlug: entry.documentSlug || null,
    anchor: entry.anchor || null,
    updatedAt: new Date().toISOString(),
  };
  const previous = readLocalHistory();
  const unique = (item: DocsSearchHistoryItem) =>
    next.documentSlug
      ? item.documentSlug !== next.documentSlug
      : item.documentSlug || item.searchQuery.toLowerCase() !== next.searchQuery.toLowerCase();
  const updated = [next, ...previous.filter(unique)].slice(0, MAX_RECENT);
  try {
    sessionStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // Storage may be unavailable; public search must remain usable.
  }
  return updated;
}

function breadcrumbs(slug: string, title: string, navigation?: DocsNavigation): string[] {
  const section = navigation?.sections.find((part) => part.items.some((item) => item.slug === slug));
  const intermediate = slug
    .split('/')
    .slice(1, -1)
    .map((name) => name.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()));
  const labels = [section?.title || 'Documentation', ...intermediate, title].filter(
    (name, index, values) => index === 0 || name.toLowerCase() !== values[index - 1].toLowerCase(),
  );
  return labels.length > 4 ? ['…', ...labels.slice(-3)] : labels;
}

function highlightMatches(text: string, search: string) {
  const term = search.trim().toLowerCase();
  if (!term) return text;

  const lowerText = text.toLowerCase();
  const parts: React.ReactNode[] = [];
  let offset = 0;
  let match = lowerText.indexOf(term);

  while (match !== -1) {
    if (match > offset) parts.push(text.slice(offset, match));
    parts.push(
      <mark className="bg-transparent font-semibold text-[#086cf5]" key={match}>
        {text.slice(match, match + term.length)}
      </mark>,
    );
    offset = match + term.length;
    match = lowerText.indexOf(term, offset);
  }

  if (offset < text.length) parts.push(text.slice(offset));
  return parts.length ? parts : text;
}

function SearchResult({
  item,
  selected,
  navigation,
  searchTerm,
  onOpen,
  onHighlight,
  id,
}: {
  item: SearchItem;
  selected: boolean;
  navigation?: DocsNavigation;
  searchTerm: string;
  onOpen: () => void;
  onHighlight: () => void;
  id: string;
}) {
  return (
    <button
      aria-selected={selected}
      className={[
        'flex w-full min-w-0 cursor-pointer items-start gap-2.5 rounded-xl border-0 px-3 py-2 text-left transition-colors',
        selected ? 'bg-[#F2F6FF]' : 'bg-transparent hover:bg-[#F7F9FC]',
      ].join(' ')}
      id={id}
      onClick={onOpen}
      onMouseEnter={onHighlight}
      role="option"
      type="button"
    >
      <FileText aria-hidden="true" className="mt-0.5 shrink-0 text-[#667085]" size={17} strokeWidth={1.7} />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-[14px] leading-5 font-medium text-[#1D2939]">
          {highlightMatches(item.title, searchTerm)}
        </span>
        {item.slug ? (
          <span className="flex min-w-0 items-center gap-1 overflow-hidden text-[12px] leading-4 text-[#7A8291]">
            {breadcrumbs(item.slug, item.title, navigation).map((crumb, index) => (
              <span className="flex min-w-0 items-center gap-1" key={index}>
                {index ? <span className="shrink-0 text-[#A6ADBB]">›</span> : null}
                <span className="truncate">{highlightMatches(crumb, searchTerm)}</span>
              </span>
            ))}
          </span>
        ) : (
          <span className="text-[12px] leading-4 text-[#7A8291]">Search again</span>
        )}
      </span>
    </button>
  );
}

export default function DocsSearchDialog({ onClose }: Props) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [navigation, setNavigation] = useState<DocsNavigation>();
  const [recent, setRecent] = useState<DocsSearchHistoryItem[]>([]);
  const [selected, setSelected] = useState(0);
  const [navigationError, setNavigationError] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const normalized = query.trim();

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    getDocsNavigation()
      .then((result) => {
        if (!cancelled) setNavigation(result);
      })
      .catch(() => {
        if (!cancelled) setNavigationError(true);
      });
    setRecent(readLocalHistory());
    getDocsSearchHistory()
      .then((results) => {
        if (!cancelled) {
          setRecent(results);
          setIsAnonymous(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsAnonymous(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [normalized]);

  const items = useMemo<SearchItem[]>(() => {
    if (normalized) {
      const term = normalized.toLowerCase();
      // Only published navigation titles are searchable. Filtering them locally
      // avoids clearing results or waiting for an API response on each keystroke.
      return (
        navigation?.sections
          .flatMap((section) => section.items)
          .filter((item) => item.title.toLowerCase().includes(term))
          .sort((left, right) => Number(right.title.toLowerCase() === term) - Number(left.title.toLowerCase() === term))
          .slice(0, 12)
          .map((item) => ({ key: item.slug, title: item.title, slug: item.slug, query: normalized })) ?? []
      );
    }
    return recent.map((entry, index) => {
      const document = navigation?.sections
        .flatMap((part) => part.items)
        .find((item) => item.slug === entry.documentSlug);
      return {
        key: entry.documentSlug || entry.searchQuery + index,
        title: document?.title || entry.documentSlug?.split('/').at(-1)?.replaceAll('-', ' ') || entry.searchQuery,
        slug: entry.documentSlug,
        query: entry.searchQuery,
        anchor: entry.anchor,
      };
    });
  }, [navigation, normalized, recent]);

  const recordHistory = (entry: DocsSearchHistoryRequest) => {
    if (isAnonymous) {
      setRecent(rememberLocal(entry));
      return;
    }
    void saveDocsSearchHistory(entry).catch(() => {
      setRecent(rememberLocal(entry));
    });
  };

  const openItem = (item: SearchItem) => {
    if (!item.slug) {
      setQuery(item.query);
      return;
    }
    recordHistory({ searchQuery: normalized || item.query, documentSlug: item.slug, anchor: item.anchor || undefined });
    onClose();
    navigate('/docs/' + item.slug + (item.anchor ? '#' + item.anchor : ''));
  };

  const handleKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelected((current) => (items.length ? (current + 1) % items.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelected((current) => (items.length ? (current - 1 + items.length) % items.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = items[selected];
      if (item) openItem(item);
      else if (normalized && navigation) recordHistory({ searchQuery: normalized });
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };

  const clearHistory = () => {
    setRecent([]);
    try {
      sessionStorage.removeItem(LOCAL_HISTORY_KEY);
    } catch {
      /* Ignore disabled storage. */
    }
    if (!isAnonymous) {
      void clearDocsSearchHistory().catch(() => {
        // Search works without persistence; on next open the API can be retried.
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[1400] overflow-y-auto bg-[#9a9a9a]/65 px-4 pt-[6vh] sm:pt-[6vh]">
      <button
        aria-label="Close search"
        className="fixed inset-0 h-full w-full cursor-default border-0 bg-transparent"
        onClick={onClose}
        type="button"
      />
      <section
        aria-label="Search documentation"
        aria-modal="true"
        className="relative mx-auto w-full max-w-[640px] overflow-hidden rounded-[20px] bg-white shadow-[0_25px_75px_rgba(15,23,42,0.17)]"
        role="dialog"
      >
        <div className="p-1.5">
          <div className="flex h-12 items-center gap-2 rounded-[14px] border border-[#EAECF0] px-3">
            <Search aria-hidden="true" className="shrink-0 text-[#667085]" size={18} strokeWidth={1.7} />
            <input
              aria-activedescendant={items.length ? 'docs-search-item-' + selected : undefined}
              aria-autocomplete="list"
              aria-controls="docs-search-result-list"
              aria-expanded="true"
              aria-label="Search documentation"
              autoComplete="off"
              autoFocus
              className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-[#1D2939] outline-none placeholder:text-[#98A2B3]"
              maxLength={80}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeys}
              placeholder="Search documentation..."
              ref={inputRef}
              role="combobox"
              spellCheck={false}
              value={query}
            />
            {normalized ? (
              <button
                aria-label="Clear search"
                className="rounded p-1 text-[#98A2B3] hover:bg-[#F2F4F7]"
                onClick={() => setQuery('')}
                type="button"
              >
                <X size={15} />
              </button>
            ) : (
              <span className="rounded-md bg-[#F2F4F7] px-2 py-1 text-[11px] font-medium text-[#667085]">ESC</span>
            )}
          </div>
        </div>
        <div className="h-[min(55vh,420px)] overflow-y-auto px-1.5 pb-2">
          <div className="flex items-center justify-between px-3 py-2 text-[12px] text-[#98A2B3]">
            <span>{normalized ? 'Search results' : 'Recent searches'}</span>
            {!normalized && recent.length ? (
              <button
                className="border-0 bg-transparent text-[12px] text-[#667085] hover:text-[#086cf5]"
                onClick={clearHistory}
                type="button"
              >
                Clear history
              </button>
            ) : null}
          </div>
          <div
            aria-label={normalized ? 'Search results' : 'Recent searches'}
            id="docs-search-result-list"
            role="listbox"
          >
            {items.map((item, index) => (
              <SearchResult
                id={'docs-search-item-' + index}
                item={item}
                key={item.key}
                navigation={navigation}
                searchTerm={normalized}
                onHighlight={() => setSelected(index)}
                onOpen={() => openItem(item)}
                selected={selected === index}
              />
            ))}
            {!items.length ? (
              <p className="m-0 px-3 py-8 text-center text-[13px] text-[#98A2B3]">
                {navigationError
                  ? 'Search is temporarily unavailable.'
                  : normalized && !navigation
                    ? 'Loading documentation…'
                    : normalized
                      ? 'No matching documents found.'
                      : 'Search guides, connectors, and product documentation.'}
              </p>
            ) : null}
          </div>
        </div>
        <footer className="flex items-center gap-4 border-t border-[#EAECF0] px-4 py-3 text-[11px] font-medium text-[#98A2B3]">
          <span className="flex items-center gap-1">
            <ArrowUp aria-hidden="true" size={13} />
            <ArrowDown aria-hidden="true" size={13} /> Select
          </span>
          <span className="flex items-center gap-1">
            <CornerDownLeft aria-hidden="true" size={13} /> Open
          </span>
          <span className="ml-auto">ESC Close</span>
        </footer>
      </section>
    </div>
  );
}
