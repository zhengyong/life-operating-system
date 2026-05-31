'use client';

import Link from 'next/link';
import {X} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {Locale, getDictionary} from '@/lib/i18n';
import {getCategoryLabel} from '@/lib/taxonomy';

type SearchItem = {
  title: string;
  summary: string;
  category: string;
  tags: string[];
  keywords?: string[];
  slug: string;
  locale: Locale;
  date: string;
};

export function SearchBox({locale, onClose}: {locale: Locale; onClose: () => void}) {
  const t = getDictionary(locale);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchItem[]>([]);

  useEffect(() => {
    fetch('/search-index.json')
      .then((response) => response.json())
      .then((data: SearchItem[]) => setItems(data.filter((item) => item.locale === locale)))
      .catch(() => setItems([]));
  }, [locale]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return items.slice(0, 8);
    }

    return items
      .filter((item) => {
        const haystack = [item.title, item.summary, item.category, ...item.tags, ...(item.keywords ?? [])]
          .join(' ')
          .toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 12);
  }, [items, query]);

  return (
    <div className="fixed inset-0 z-50 bg-ink/20 px-4 py-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="mx-auto max-w-2xl rounded-lg border border-line bg-white shadow-soft">
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
        <div className="max-h-[70vh] overflow-y-auto p-3">
          {results.length > 0 ? (
            <div className="grid gap-2">
              {results.map((item) => (
                <Link
                  key={`${item.locale}-${item.slug}`}
                  href={`/${item.locale}/articles/${item.slug}/`}
                  onClick={onClose}
                  className="rounded-md p-3 transition hover:bg-soft"
                >
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">{item.summary}</p>
                  <p className="mt-2 text-xs text-muted">{getCategoryLabel(item.category, locale)}</p>
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
