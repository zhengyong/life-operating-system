import type {Metadata} from 'next';
import {ArticleCard} from '@/components/ArticleCard';
import {PageShell} from '@/components/PageShell';
import {getArticles} from '@/lib/content';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Articles'
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export default async function ArticlesPage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);
  const articles = getArticles(locale);

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.articles}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">{t.articles.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{t.articles.subtitle}</p>
        </div>

        {articles.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-lg border border-line bg-white p-8 text-center text-muted">{t.articles.empty}</p>
        )}
      </main>
    </PageShell>
  );
}
