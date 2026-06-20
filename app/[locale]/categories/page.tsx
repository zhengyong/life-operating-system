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
      <main className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="text-4xl font-semibold tracking-normal text-ink md:text-5xl">{t.taxonomy.categoriesTitle}</h1>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {taxonomy.map((item) => (
            <Link
              key={item.name}
              href={`/${locale}/categories/${slugify(item.name)}/`}
              className="flex items-center justify-between rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft"
            >
              <span className="font-medium text-ink">{getCategoryLabel(item.name, locale)}</span>
              <span className="text-sm text-muted">
                {item.count} {locale === 'zh' ? '项内容' : 'items'} / {item.articleCount} {t.taxonomy.articleCount}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
