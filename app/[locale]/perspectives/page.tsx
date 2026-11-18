import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {JsonLd} from '@/components/JsonLd';
import {PageShell} from '@/components/PageShell';
import {PerspectiveAtlas} from '@/components/PerspectiveAtlas';
import {jensenHuangPerspective} from '@/content/perspectives/jensen-huang';
import {getArticle} from '@/lib/content';
import {getDictionary, isLocale, type Locale} from '@/lib/i18n';
import {breadcrumbJsonLd, localizedPageMetadata} from '@/lib/seo';
import {pageUrl} from '@/lib/site';

type PageProps = {params: {locale: string}};

function loadSeries(locale: Locale, slugs: string[]) {
  return slugs.flatMap((slug) => {
    const article = getArticle(locale, slug);
    if (!article) return [];
    const title = locale === 'en' ? article.title_en ?? article.title : article.title;
    return [{href: `/${locale}/articles/${slug}/`, title: title.split(/\s*[|｜]\s*/).at(-1) ?? title}];
  });
}

export function generateMetadata({params: {locale}}: PageProps): Metadata {
  if (!isLocale(locale)) return {};
  return localizedPageMetadata({
    locale,
    path: 'perspectives',
    title: `${jensenHuangPerspective.title[locale]} · ${getDictionary(locale).perspectives.title}`,
    description: jensenHuangPerspective.description[locale]
  });
}

export default function PerspectivesPage({params: {locale}}: PageProps) {
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const event = jensenHuangPerspective;
  const opinion = event.author[locale];
  const article = opinion?.articleSlug ? getArticle(locale, opinion.articleSlug) : null;
  const summary = opinion?.summary ?? (locale === 'en' ? article?.summary_en : undefined) ?? article?.summary;
  const author = summary ? {
    summary,
    title: opinion?.title ?? (locale === 'en' ? article?.title_en : undefined) ?? article?.title,
    date: opinion?.date ?? article?.date,
    articleHref: article ? `/${locale}/articles/${article.slug}/` : undefined
  } : undefined;
  const series = event.articleSeries ? {
    handoff: loadSeries(locale, event.articleSeries.handoff),
    return: loadSeries(locale, event.articleSeries.return)
  } : undefined;

  return (
    <PageShell locale={locale}>
      <JsonLd data={breadcrumbJsonLd([
        {name: dictionary.nav.home, url: pageUrl(locale)},
        {name: dictionary.perspectives.title, url: pageUrl(`${locale}/perspectives`)}
      ])} />
      <PerspectiveAtlas event={event} locale={locale} labels={dictionary.perspectives} author={author} series={series}>
        <Breadcrumbs items={[
          {label: dictionary.nav.home, href: `/${locale}/`},
          {label: dictionary.perspectives.title}
        ]} />
      </PerspectiveAtlas>
    </PageShell>
  );
}
