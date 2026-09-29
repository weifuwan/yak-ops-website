import { useEffect, useRef, useState } from 'react';
import { isDocsUnauthorizedError, searchDocs, type DocsSearchHit } from '@/service/docs';

type DocsSearchProps = {
  onSelect: (slug: string) => void;
  onUnauthorized: () => void;
  className?: string;
};

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 18 18">
      <circle cx="7.75" cy="7.75" r="5" stroke="currentColor" strokeWidth="1.45" />
      <path d="M11.3 11.3L15.25 15.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.45" />
    </svg>
  );
}

export default function DocsSearch({ onSelect, onUnauthorized, className }: DocsSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<DocsSearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [shortcutLabel, setShortcutLabel] = useState('Ctrl K');

  useEffect(() => {
    const isMac = /Mac|iPhone|iPad|iPod/i.test(window.navigator.platform);
    setShortcutLabel(isMac ? '⌘K' : 'Ctrl K');

    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (event.key === 'Escape') {
        inputRef.current?.blur();
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    const normalized = query.trim();
    if (!normalized) {
      setHits([]);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      setLoading(true);
      searchDocs(normalized)
        .then((response) => {
          if (!cancelled) {
            setHits(response.hits);
          }
        })
        .catch((error) => {
          if (!cancelled && isDocsUnauthorizedError(error)) {
            onUnauthorized();
            return;
          }
          if (!cancelled) {
            setHits([]);
          }
        })
        .finally(() => {
          if (!cancelled) {
            setLoading(false);
          }
        });
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  const handleSelect = (slug: string) => {
    setOpen(false);
    setQuery('');
    setHits([]);
    onSelect(slug);
  };

  return (
    <div className={`relative ${className ?? ''}`}>
      <div className="flex h-9 items-center rounded-xl border border-solid border-[#cfcac0] bg-[#faf9f5] px-3 text-[#66645f] focus-within:border-[#98948a]">
        <SearchIcon />
        <input
          aria-label="Search documentation"
          className="min-w-0 flex-1 border-0 bg-transparent px-2 text-sm text-[#2c2c29] outline-none placeholder:text-[#77756f]"
          maxLength={80}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search..."
          ref={inputRef}
          type="search"
          value={query}
        />
        <span className="shrink-0 text-[11px] font-semibold text-[#88867f]">{shortcutLabel}</span>
      </div>

      {open && query.trim() ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-solid border-[#dedbd2] bg-white p-2 shadow-[0_18px_48px_rgba(20,20,19,0.14)]">
          {loading ? (
            <div className="flex min-h-20 items-center justify-center gap-2 text-sm text-[#77756f]">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-[#d9d6ce] border-t-[#55544f]" />
              <span>Searching…</span>
            </div>
          ) : hits.length ? (
            <div className="max-h-[360px] overflow-y-auto">
              {hits.map((hit) => (
                <button
                  className="block w-full rounded-xl border-0 bg-transparent px-3 py-2.5 text-left hover:bg-[#f3f1eb]"
                  key={hit.slug}
                  onClick={() => handleSelect(hit.slug)}
                  onMouseDown={(event) => event.preventDefault()}
                  type="button"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-yak-brand">{hit.section}</div>
                  <div className="mt-0.5 text-sm font-semibold text-[#242421]">{hit.title}</div>
                  <div className="mt-1 line-clamp-2 text-xs leading-5 text-[#77756f]">{hit.snippet}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex min-h-20 items-center justify-center text-sm text-[#77756f]">No matching documentation</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
