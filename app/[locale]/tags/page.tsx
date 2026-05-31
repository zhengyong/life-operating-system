import type {Metadata} from 'next';
import {PageShell} from '@/components/PageShell';
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
    count: item.count
  }));

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="text-4xl font-semibold tracking-normal text-ink md:text-5xl">{t.taxonomy.tagsTitle}</h1>
        <TagCloudPlayground items={tagItems} locale={locale} />
      </main>
    </PageShell>
  );
}
