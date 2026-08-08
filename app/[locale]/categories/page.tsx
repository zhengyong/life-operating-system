import type {Metadata} from 'next';
import Link from 'next/link';
import {PageShell} from '@/components/PageShell';
import {getTaxonomy} from '@/lib/content';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {localizedPageMetadata} from '@/lib/seo';
import {getCategoryLabel} from '@/lib/taxonomy';
import {slugify} from '@/lib/utils';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  return localizedPageMetadata({
    locale,
    path: 'categories',
    title: t.taxonomy.categoriesTitle,
    description:
      locale === 'zh'
        ? '按主题分类浏览郑勇的人生操作系统知识库。'
        : "Browse Yong Zheng's Life Operating System knowledge base by category."
  });
}

export default async function CategoriesPage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);
  const taxonomy = getTaxonomy(locale, 'category');

  return (
    <PageShell locale={locale}>
      <main className="directory-page">
        <section className="directory-page__hero">
          <div className="directory-page__hero-inner">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Categories</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">{t.taxonomy.categoriesTitle}</h1>
          </div>
        </section>
        <section className="directory-grid">
          {taxonomy.map((item) => (
            <Link
              key={item.name}
              href={`/${locale}/categories/${slugify(item.name)}/`}
              className="taxonomy-directory-card"
            >
              <span className="taxonomy-directory-card__title">{getCategoryLabel(item.name, locale)}</span>
              <span className="taxonomy-directory-card__meta">
                {item.count} {locale === 'zh' ? '项内容' : 'items'} / {item.articleCount} {t.taxonomy.articleCount}
              </span>
            </Link>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
