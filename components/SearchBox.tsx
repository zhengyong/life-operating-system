'use client';

import Link from 'next/link';
import {X} from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-ink/20 px-4 py-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="mx-auto max-w-3xl rounded-lg border border-line bg-white shadow-soft">
        <div className="flex items-center gap-3 border-b border-line p-4">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.search.placeholder}
            aria-label={t.search.label}
            className="min-w-0 flex-1 rounded-md border border-line px-3 py-2 text-base outline-none transition focus:border-accent"
          />
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted transition hover:border-accent hover:text-accent"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto border-b border-line px-4 py-3">
          <button
            type="button"
            onClick={() => setActiveType('all')}
            className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              activeType === 'all' ? 'bg-ink text-white' : 'bg-soft text-muted hover:text-accent'
            }`}
          >
            {locale === 'zh' ? '全部' : 'All'}
          </button>
          {typeFilters.map((filter) => (
            <button
              key={filter.type}
              type="button"
              onClick={() => setActiveType(filter.type)}
              className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                activeType === filter.type ? 'bg-ink text-white' : 'bg-soft text-muted hover:text-accent'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-3">
          {results.length > 0 ? (
            <div className="grid gap-2">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-md p-3 transition hover:bg-soft"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                      {item.typeLabel}
                    </span>
                    {item.category ? (
                      <span className="text-[11px] text-muted">{item.category}</span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">{item.summary}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="p-8 text-center text-sm text-muted">{t.search.empty}</p>
          )}
        </div>
      </div>
    </div>
  );
}
