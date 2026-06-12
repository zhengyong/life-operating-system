import type {Metadata} from 'next';
import {notFound, redirect} from 'next/navigation';
import {ArticleExplorePanel} from '@/components/ArticleExplorePanel';
import {ArticleListView} from '@/components/ArticleListView';
import {PageShell} from '@/components/PageShell';
import {getArticles} from '@/lib/content';
import {getDictionary, isLocale, Locale, locales} from '@/lib/i18n';
import {getPageCount} from '@/lib/pagination';

export const metadata: Metadata = {
  title: 'Articles'
};

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const pageCount = getPageCount(getArticles(locale).length);
    return Array.from({length: Math.max(0, pageCount - 1)}, (_, index) => ({
      locale,
      page: String(index + 2)
    }));
  });
}

export default async function ArticlesPaginatedPage({params}: {params: {locale: string; page: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const currentPage = Number(params.page);

  if (!Number.isInteger(currentPage) || currentPage < 1) {
    notFound();
  }

  if (currentPage === 1) {
    redirect(`/${locale}/articles/`);
  }

  const t = getDictionary(locale);
  const articles = getArticles(locale);
  const pageCount = getPageCount(articles.length);

  if (currentPage > pageCount) {
    notFound();
  }

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.articles}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">{t.articles.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{t.articles.subtitle}</p>
        </div>

        <ArticleExplorePanel articles={articles} locale={locale} />
        <ArticleListView articles={articles} locale={locale} page={currentPage} />
      </main>
    </PageShell>
  );
}
