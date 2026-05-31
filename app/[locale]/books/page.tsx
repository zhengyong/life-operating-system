import type {Metadata} from 'next';
import {BookOpen} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {books} from '@/lib/content';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Books'
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export default async function BooksPage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.books}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">{t.books.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{t.books.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-4">
          {books.map((book) => (
            <article key={book.id} className="rounded-lg border border-line bg-white p-5 transition hover:shadow-soft">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-soft text-accent">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
                      {book.theme}
                    </span>
                    <span className="text-xs text-muted">Book {book.id}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-normal text-ink">
                    {locale === 'zh' ? book.title : book.titleEn}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {locale === 'zh' ? book.description : book.descriptionEn}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
