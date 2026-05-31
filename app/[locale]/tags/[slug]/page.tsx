import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ChevronLeft} from 'lucide-react';
import {ArticleCard} from '@/components/ArticleCard';
import {PageShell} from '@/components/PageShell';
import {findTagBySlug, getArticles, getTaxonomy, locales} from '@/lib/content';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {getTagLabel} from '@/lib/taxonomy';
import {slugify} from '@/lib/utils';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getTaxonomy(locale, 'tags').map((item) => ({
      locale,
      slug: slugify(item.name)
    }))
  );
}

export async function generateMetadata({params}: {params: {locale: string; slug: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const tag = findTagBySlug(locale, params.slug);
  return {
    title: tag ? `Tag: ${tag}` : 'Tag'
  };
}

export default async function TagDetailPage({params}: {params: {locale: string; slug: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  const tag = findTagBySlug(locale, params.slug);

  if (!tag) {
    notFound();
  }

  const articles = getArticles(locale).filter((article) => article.tags.includes(tag));

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <Link
          href={`/${locale}/tags/`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          {t.taxonomy.tagsTitle}
        </Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.common.tags}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
            {getTagLabel(tag, locale)}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {articles.length} {t.taxonomy.articleCount}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={locale} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
