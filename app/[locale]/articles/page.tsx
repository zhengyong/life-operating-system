import type {Metadata} from 'next';
import {ArticleExplorePanel} from '@/components/ArticleExplorePanel';
import {ArticleListView} from '@/components/ArticleListView';
import {PageShell} from '@/components/PageShell';
import {getArticles} from '@/lib/content';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {localizedPageMetadata} from '@/lib/seo';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  return localizedPageMetadata({
    locale,
    path: 'articles',
    title: t.articles.title,
    description: t.articles.subtitle
  });
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

        <ArticleExplorePanel articles={articles} locale={locale} />
        <ArticleListView articles={articles} locale={locale} />
      </main>
    </PageShell>
  );
}
