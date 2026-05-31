import type {Metadata} from 'next';
import Link from 'next/link';
import {PageShell} from '@/components/PageShell';
import {getTaxonomy} from '@/lib/content';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {slugify} from '@/lib/utils';

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

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="text-4xl font-semibold tracking-normal text-ink md:text-5xl">{t.taxonomy.tagsTitle}</h1>
        <div className="mt-10 flex flex-wrap gap-3">
          {taxonomy.map((item) => (
            <Link
              key={item.name}
              href={`/${locale}/articles/?tag=${slugify(item.name)}`}
              className="rounded-md border border-line bg-white px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
            >
              {item.name} <span className="text-xs">({item.count})</span>
            </Link>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
