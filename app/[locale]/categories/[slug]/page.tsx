import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ChevronLeft} from 'lucide-react';
import {ArticleCard} from '@/components/ArticleCard';
import {PageShell} from '@/components/PageShell';
import {TopicCard} from '@/components/TopicCard';
import {findCategoryBySlug, getArticles, getTaxonomy, locales} from '@/lib/content';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {getCategoryLabel} from '@/lib/taxonomy';
import {slugify} from '@/lib/utils';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getTaxonomy(locale, 'category').map((item) => ({
      locale,
      slug: slugify(item.name)
    }))
  );
}

export async function generateMetadata({params}: {params: {locale: string; slug: string}}): Promise<Metadata> {
  const category = findCategoryBySlug(params.slug);
  return {
    title: category ? `Category: ${category}` : 'Category'
  };
}

export default async function CategoryDetailPage({params}: {params: {locale: string; slug: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  const category = findCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const articles = getArticles(locale).filter((article) => article.category === category);
  const taxonomyItem = getTaxonomy(locale, 'category').find((item) => item.name === category);
  const relatedItems = taxonomyItem?.relatedItems ?? [];

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <Link
          href={`/${locale}/categories/`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          {t.taxonomy.categoriesTitle}
        </Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.common.category}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
            {getCategoryLabel(category, locale)}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {(taxonomyItem?.count ?? articles.length)} {locale === 'zh' ? '项内容' : 'items'} / {articles.length} {t.taxonomy.articleCount}
          </p>
        </div>
        {articles.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.nav.articles}</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
        {relatedItems.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{locale === 'zh' ? '相关专题' : 'Related topics'}</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {relatedItems.map((item) => (
                <TopicCard
                  key={`${item.type}-${item.href}-${item.title}`}
                  href={item.href}
                  eyebrow={item.type}
                  title={item.title}
                  summary={item.summary}
                  actionLabel={t.topics.readTopic}
                />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </PageShell>
  );
}
