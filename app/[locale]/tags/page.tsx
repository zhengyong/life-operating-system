import type {Metadata} from 'next';
import {PageShell} from '@/components/PageShell';
import {TagDirectory} from '@/components/TagDirectory';
import {TagCloudPlayground} from '@/components/TagCloudPlayground';
import {getTaxonomy} from '@/lib/content';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {getTagHref, getTagLabel} from '@/lib/taxonomy';

export const metadata: Metadata = {
  title: 'Tags'
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export default async function TagsPage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);
  const taxonomy = getTaxonomy(locale, 'tags');
  const tagItems = taxonomy.map((item) => ({
    name: item.name,
    label: getTagLabel(item.name, locale),
    href: getTagHref(item.name, locale),
    count: item.count,
    articleCount: item.articleCount
  })).sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }

    return a.label.localeCompare(b.label);
  });

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Life OS</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">{t.taxonomy.tagsTitle}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          {locale === 'zh'
            ? '用精选标签保持探索感，用完整目录承接持续增长的知识关键词。'
            : 'A focused sphere for exploration, and a full directory for the growing knowledge taxonomy.'}
        </p>
        <TagCloudPlayground items={tagItems} locale={locale} />
        <TagDirectory items={tagItems} locale={locale} />
      </main>
    </PageShell>
  );
}
