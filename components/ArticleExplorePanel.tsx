'use client';

import Link from 'next/link';
import {Search} from 'lucide-react';
import {useState} from 'react';
import {SearchBox} from '@/components/SearchBox';
import type {Locale} from '@/lib/i18n';
import {getCategoryHref, getCategoryLabel, getTagHref, getTagLabel} from '@/lib/taxonomy';

type ExploreFacet = {
  name: string;
  count: number;
};

export function ArticleExplorePanel({
  categories,
  tags,
  locale
}: {
  categories: ExploreFacet[];
  tags: ExploreFacet[];
  locale: Locale;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <section className="mt-10 rounded-lg border border-line bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">
            {locale === 'zh' ? '按主题阅读' : 'Read by Theme'}
          </p>
          <p className="mt-1 text-sm leading-6 text-muted">
            {locale === 'zh'
              ? '从分类、标签或关键词进入，保持文章之间的路径清楚。'
              : 'Use categories, tags, or keywords to move through the article system clearly.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-line px-3 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
        >
          <Search className="h-4 w-4" />
          {locale === 'zh' ? '搜索文章' : 'Search Articles'}
        </button>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {locale === 'zh' ? '分类' : 'Categories'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={getCategoryHref(category.name, locale)}
                prefetch={false}
                className="inline-flex min-h-9 items-center gap-2 rounded-md bg-soft px-3 py-1.5 text-sm font-medium text-ink transition hover:text-accent"
              >
                <span>{getCategoryLabel(category.name, locale)}</span>
                <span className="text-xs text-muted">{category.count}</span>
              </Link>
            ))}
            <Link
              href={`/${locale}/categories/`}
              prefetch={false}
              className="inline-flex min-h-9 items-center rounded-md border border-line px-3 py-1.5 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
            >
              {locale === 'zh' ? '全部分类' : 'All Categories'}
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {locale === 'zh' ? '标签' : 'Tags'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={getTagHref(tag.name, locale)}
                prefetch={false}
                className="inline-flex min-h-9 items-center gap-2 rounded-md bg-soft px-3 py-1.5 text-sm font-medium text-ink transition hover:text-accent"
              >
                <span>{getTagLabel(tag.name, locale)}</span>
                <span className="text-xs text-muted">{tag.count}</span>
              </Link>
            ))}
            <Link
              href={`/${locale}/tags/`}
              prefetch={false}
              className="inline-flex min-h-9 items-center rounded-md border border-line px-3 py-1.5 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
            >
              {locale === 'zh' ? '全部标签' : 'All Tags'}
            </Link>
          </div>
        </div>
      </div>

      {searchOpen ? <SearchBox locale={locale} onClose={() => setSearchOpen(false)} /> : null}
    </section>
  );
}
