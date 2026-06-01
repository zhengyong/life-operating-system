import Link from 'next/link';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Locale, getDictionary} from '@/lib/i18n';

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

  const pages = Array.from({length: pageCount}, (_, index) => index + 1);
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted transition hover:border-accent hover:text-accent"
            aria-label={t.pagination.previous}
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : null}
        {pages.map((page) => (
          <Link
            key={page}
            href={getHref(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`inline-flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition ${
              page === currentPage
                ? 'border-ink bg-ink text-white'
                : 'border-line text-muted hover:border-accent hover:text-accent'
            }`}
          >
            {page}
          </Link>
        ))}
        {currentPage < pageCount ? (
          <Link
            href={getHref(nextPage)}
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
