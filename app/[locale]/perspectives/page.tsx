import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {JsonLd} from '@/components/JsonLd';
import {PageShell} from '@/components/PageShell';
import {PerspectiveAtlas} from '@/components/PerspectiveAtlas';
import {PerspectiveProfiles} from '@/components/PerspectiveProfiles';
import {PerspectiveShare} from '@/components/PerspectiveShare';
import {jensenHuangPerspective} from '@/content/perspectives/jensen-huang';
import {perspectiveEvents} from '@/content/perspectives';
import {getArticle} from '@/lib/content';
import {getDictionary, isLocale, type Locale} from '@/lib/i18n';
import {breadcrumbJsonLd, localizedPageMetadata} from '@/lib/seo';
import {pageUrl, siteUrl} from '@/lib/site';

type PageProps = {params: {locale: string}};

function loadSeries(locale: Locale, slugs: string[]) {
  return slugs.flatMap((slug) => {
    const article = getArticle(locale, slug);
    if (!article) return [];
    const title = locale === 'en' ? article.title_en ?? article.title : article.title;
    return [{href: `/${locale}/articles/${slug}/`, title: title.split(/\s*[|｜]\s*/).at(-1) ?? title, summary: locale === 'en' ? article.summary_en ?? article.summary : article.summary, date: article.date}];
  });
}

export function generateMetadata({params: {locale}}: PageProps): Metadata {
  if (!isLocale(locale)) return {};
  const metadata = localizedPageMetadata({
    locale,
    path: 'perspectives',
    title: `${jensenHuangPerspective.title[locale]} · ${getDictionary(locale).perspectives.title}`,
    description: jensenHuangPerspective.description[locale]
  });
  const image = `${siteUrl}/og/perspectives-${locale}.png`;
  return {
    ...metadata,
    openGraph: {...metadata.openGraph, images: [{url: image, width: 1200, height: 630, alt: jensenHuangPerspective.title[locale]}]},
    twitter: {...metadata.twitter, images: [image]},
    ...(jensenHuangPerspective.prototype ? {robots: {index: false, follow: true}} : {})
  };
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
    articleHref: article ? `/${locale}/articles/${article.slug}/` : undefined,
    opinion: article?.authorOpinion
  } : undefined;
  const series = event.articleSeries ? Object.fromEntries(Object.entries(event.articleSeries).map(([side, slugs]) => [side, loadSeries(locale, slugs)])) : undefined;

  return (
    <PageShell locale={locale}>
      <JsonLd data={breadcrumbJsonLd([
        {name: dictionary.nav.home, url: pageUrl(locale)},
        {name: dictionary.perspectives.title, url: pageUrl(`${locale}/perspectives`)}
      ])} />
      <PerspectiveAtlas
        event={event}
        locale={locale}
        labels={dictionary.perspectives}
        author={author}
        series={series}
        profiles={<PerspectiveProfiles events={perspectiveEvents} locale={locale} />}
        share={<PerspectiveShare locale={locale} eventTitle={dictionary.perspectives.title} title={event.title[locale]} summary={`${event.description[locale]} ${dictionary.perspectives.prototypeNote}`} sources={event.timeline.filter((entry) => entry.verification === 'verified').slice(-2).map((entry) => ({label: entry.sources[0].label[locale], href: entry.sources[0].href}))} articleHref={`/${locale}/perspectives/`} />}
        comparisonShare={<PerspectiveShare locale={locale} eventTitle={event.title[locale]} kind="comparison" title={locale === 'zh' ? '创始人领导力，还是组织接班能力？' : 'Founder leadership, or the institution’s ability to succeed?'} summary={locale === 'zh' ? '作者用八篇文章对照两种判断：黄仁勋的战略领导力难以复制；成熟的英伟达也应具备超越个人的能力。观点不同，不代表当事人直接回应。' : 'Eight essays examine two arguments: Huang’s strategic leadership is hard to reproduce, while a mature NVIDIA should be able to outlast any individual. This is the author’s comparison, not an exchange between public figures.'} articleHref={`/${locale}/perspectives/#atlas-reading`} />}
        authorShare={author ? <PerspectiveShare locale={locale} eventTitle={event.title[locale]} kind="article" title={author.title ?? dictionary.perspectives['my-view']} summary={author.opinion?.conclusion ?? author.summary} articleHref={author.articleHref} /> : undefined}
      >
        <Breadcrumbs items={[
          {label: dictionary.nav.home, href: `/${locale}/`},
          {label: dictionary.perspectives.title}
        ]} />
      </PerspectiveAtlas>
    </PageShell>
  );
}
