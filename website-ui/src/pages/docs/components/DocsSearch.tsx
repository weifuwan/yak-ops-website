import { SearchOutlined } from '@ant-design/icons';
import { Input, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { searchDocs, type DocsSearchHit } from '@/services/docs';
import { ApiError } from '@/services/http/client';

type DocsSearchProps = {
  onSelect: (slug: string) => void;
  onUnauthorized: () => void;
};

export default function DocsSearch({ onSelect, onUnauthorized }: DocsSearchProps) {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<DocsSearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
          if (!cancelled && error instanceof ApiError && error.status === 401) {
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
    <div className="yak-docs-search">
      <Input
        allowClear
        aria-label="搜索文档"
        maxLength={80}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="搜索文档"
        prefix={<SearchOutlined />}
        value={query}
      />

      {open && query.trim() ? (
        <div className="yak-docs-search-panel">
          {loading ? (
            <div className="yak-docs-search-panel__state">
              <Spin size="small" />
              <span>搜索中…</span>
            </div>
          ) : hits.length ? (
            hits.map((hit) => (
              <button
                className="yak-docs-search-hit"
                key={hit.slug}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(hit.slug)}
                type="button"
              >
                <div className="yak-docs-search-hit__meta">{hit.section}</div>
                <div className="yak-docs-search-hit__title">{hit.title}</div>
                <div className="yak-docs-search-hit__snippet">{hit.snippet}</div>
              </button>
            ))
          ) : (
            <div className="yak-docs-search-panel__state">没有找到相关文档</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
