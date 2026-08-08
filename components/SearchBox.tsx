'use client';

import Link from 'next/link';
import {Search, X} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {Locale, getDictionary} from '@/lib/i18n';

type SearchItem = {
  id: string;
  type: 'article' | 'book' | 'book-chapter' | 'person' | 'company' | 'career';
  typeLabel: string;
  title: string;
  summary: string;
  href: string;
  category?: string;
  tags?: string[];
  keywords?: string[];
  locale: Locale;
  date?: string;
  text: string;
};

type PreparedSearchItem = SearchItem & {
  searchTitle: string;
  searchSummary: string;
  searchMetadata: string;
  searchText: string;
};

function prepareSearchItem(item: SearchItem): PreparedSearchItem {
  return {
    ...item,
    searchTitle: item.title.toLowerCase(),
    searchSummary: item.summary.toLowerCase(),
    searchMetadata: [item.typeLabel, item.category, ...(item.tags ?? []), ...(item.keywords ?? [])].join(' ').toLowerCase(),
    searchText: item.text.toLowerCase()
  };
}

export function SearchBox({locale, onClose}: {locale: Locale; onClose: () => void}) {
  const t = getDictionary(locale);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<PreparedSearchItem[]>([]);
  const [activeType, setActiveType] = useState<SearchItem['type'] | 'all'>('all');

  useEffect(() => {
    fetch(`/search-index.json?v=${Date.now()}`, {cache: 'no-store'})
      .then((response) => response.json())
      .then((data: SearchItem[]) => setItems(data.filter((item) => item.locale === locale).map(prepareSearchItem)))
      .catch(() => setItems([]));
  }, [locale]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  const typeFilters = useMemo(() => {
    const seen = new Map<SearchItem['type'], string>();
    items.forEach((item) => {
      seen.set(item.type, item.typeLabel);
    });

    return Array.from(seen.entries()).map(([type, label]) => ({type, label}));
  }, [items]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const scopedItems = activeType === 'all' ? items : items.filter((item) => item.type === activeType);

    if (!normalized) {
      return scopedItems.slice(0, 10);
    }

    const tokens = normalized.split(/\s+/).filter(Boolean);

    return scopedItems
      .map((item) => {
        let score = 0;

        tokens.forEach((token) => {
          if (item.searchTitle.includes(token)) score += 12;
          if (item.searchSummary.includes(token)) score += 6;
          if (item.searchMetadata.includes(token)) score += 4;
          if (item.searchText.includes(token)) score += 2;
        });

        if (item.searchTitle.includes(normalized)) score += 18;
        if (item.searchSummary.includes(normalized)) score += 8;
        if (item.searchText.includes(normalized)) score += 4;

        return {item, score};
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return a.item.title.localeCompare(b.item.title);
      })
      .slice(0, 16)
      .map((result) => result.item);
  }, [activeType, items, query]);

  return (
    <div className="search-dialog" role="dialog" aria-modal="true" aria-label={t.search.label}>
      <div className="search-dialog__panel">
        <div className="search-dialog__top">
          <label className="search-dialog__input-wrap">
            <Search aria-hidden="true" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.search.placeholder}
              aria-label={t.search.label}
            />
          </label>
          <button onClick={onClose} className="search-dialog__close" aria-label={locale === 'zh' ? '关闭搜索' : 'Close search'}>
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="search-dialog__filters">
          <button
            type="button"
            onClick={() => setActiveType('all')}
            className={activeType === 'all' ? 'is-active' : undefined}
          >
            {locale === 'zh' ? '全部' : 'All'}
          </button>
          {typeFilters.map((filter) => (
            <button
              key={filter.type}
              type="button"
              onClick={() => setActiveType(filter.type)}
              className={activeType === filter.type ? 'is-active' : undefined}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="search-dialog__results">
          {results.length > 0 ? (
            <div>
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="search-result"
                >
                  <div className="search-result__meta">
                    <span>{item.typeLabel}</span>
                    {item.category ? <span>{item.category}</span> : null}
                  </div>
                  <p className="search-result__title">{item.title}</p>
                  <p className="search-result__summary">{item.summary}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="search-dialog__empty">{t.search.empty}</p>
          )}
        </div>
      </div>
    </div>
  );
}
