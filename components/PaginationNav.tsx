import Link from 'next/link';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Locale, getDictionary} from '@/lib/i18n';

function getVisiblePages(currentPage: number, pageCount: number) {
  const pages = new Set<number>([1, pageCount]);

  for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
    if (page > 1 && page < pageCount) {
      pages.add(page);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export function PaginationNav({
  currentPage,
  pageCount,
  getHref,
  locale
}: {
  currentPage: number;
  pageCount: number;
  getHref: (page: number) => string;
  locale: Locale;
}) {
  const t = getDictionary(locale);

  if (pageCount <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, pageCount);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" aria-label={t.pagination.label}>
      <p className="text-sm text-muted">
        {t.pagination.page} {currentPage} / {pageCount}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {currentPage > 1 ? (
          <Link
            href={getHref(previousPage)}
            prefetch={false}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted transition hover:border-accent hover:text-accent"
            aria-label={t.pagination.previous}
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : null}
        {pages.map((page, index) => {
          const previousVisiblePage = pages[index - 1];
          const showGap = previousVisiblePage !== undefined && page - previousVisiblePage > 1;

          return (
            <span key={page} className="inline-flex items-center gap-2">
              {showGap ? <span className="px-1 text-sm text-muted">...</span> : null}
              <Link
                href={getHref(page)}
                prefetch={false}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition ${
                  page === currentPage
                    ? 'border-ink bg-ink text-white'
                    : 'border-line text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {page}
              </Link>
            </span>
          );
        })}
        {currentPage < pageCount ? (
          <Link
            href={getHref(nextPage)}
            prefetch={false}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted transition hover:border-accent hover:text-accent"
            aria-label={t.pagination.next}
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
