import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ChevronLeft} from 'lucide-react';
import {ArticleBrief} from '@/components/ArticleBrief';
import {ArticleCard} from '@/components/ArticleCard';
import {ArticleInteractions} from '@/components/ArticleInteractions';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {JsonLd} from '@/components/JsonLd';
import {PageShell} from '@/components/PageShell';
import {prepareArticleBrief} from '@/lib/articleBrief';
import {getAllArticles, getArticle, getRelatedArticles, markdownToHtml} from '@/lib/content';
import {alternateLocale, getDictionary, isLocale, Locale} from '@/lib/i18n';
import {siteUrl} from '@/lib/site';
import {getCategoryHref, getCategoryLabel, getTagHref, getTagLabel} from '@/lib/taxonomy';
import {formatDate} from '@/lib/utils';

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    locale: article.locale,
    slug: article.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: {locale: string; slug: string};
}): Promise<Metadata> {
  const {locale: rawLocale, slug} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const article = getArticle(locale, slug);

  if (!article) {
    return {};
  }

  const title = article.seoTitle ?? (locale === 'en' && article.title_en ? article.title_en : article.title);
  const description = article.seoDescription ?? (locale === 'en' && article.summary_en ? article.summary_en : article.summary);
  const canonical = `${siteUrl}/${locale}/articles/${slug}/`;
  const otherLocale = alternateLocale(locale);
  const hasAlternate = Boolean(getArticle(otherLocale, slug));

  return {
    title,
    description,
    keywords: article.keywords ?? article.tags,
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        ...(hasAlternate ? {[otherLocale]: `${siteUrl}/${otherLocale}/articles/${slug}/`} : {})
      }
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      siteName: "Yong Zheng's Life Operating System",
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      publishedTime: new Date(article.date).toISOString(),
      authors: ['Yong Zheng'],
      tags: article.tags
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  };
}

export default async function ArticlePage({params}: {params: {locale: string; slug: string}}) {
  const {locale: rawLocale, slug} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const article = getArticle(locale, slug);

  if (!article) {
    notFound();
  }

  const t = getDictionary(locale);
  const title = locale === 'en' && article.title_en ? article.title_en : article.title;
  const summary = locale === 'en' && article.summary_en ? article.summary_en : article.summary;
  const brief = prepareArticleBrief(article.content, summary);
  const contentHtml = await markdownToHtml(brief.mainContent);
  const relatedArticles = getRelatedArticles(article);
  const canonical = `${siteUrl}/${locale}/articles/${slug}/`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: summary,
    url: canonical,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    author: {
      '@type': 'Person',
      name: 'Yong Zheng',
      url: `${siteUrl}/${locale}/about/`
    },
    publisher: {
      '@type': 'Person',
      name: 'Yong Zheng',
      url: `${siteUrl}/${locale}/about/`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical
    },
    articleSection: article.category,
    keywords: [...article.tags, ...(article.keywords ?? [])].join(', ')
  };

  return (
    <PageShell locale={locale}>
      <JsonLd data={articleSchema} />
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-16">
        <Breadcrumbs
          items={[
            {label: t.nav.home, href: `/${locale}/`},
            {label: t.nav.articles, href: `/${locale}/articles/`},
            {label: title}
          ]}
        />

        <Link
          href={`/${locale}/articles/`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          {t.common.backToArticles}
        </Link>

        <article className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <span>{formatDate(article.date, locale)}</span>
            <span aria-hidden="true">/</span>
            <Link href={getCategoryHref(article.category, locale)} className="hover:text-accent">
              {getCategoryLabel(article.category, locale)}
            </Link>
          </div>
          <h1
            className="mt-4 break-words text-4xl font-semibold tracking-normal text-ink md:text-5xl"
            style={{overflowWrap: 'anywhere'}}
          >
            {title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={getTagHref(tag, locale)}
                className="rounded-md bg-soft px-2.5 py-1 text-xs text-muted transition hover:text-accent"
              >
                {getTagLabel(tag, locale)}
              </Link>
            ))}
          </div>
          <ArticleBrief brief={brief} locale={locale} />
          <div
            className="prose prose-lg mt-8 prose-neutral"
            dangerouslySetInnerHTML={{__html: contentHtml}}
          />
        </article>
        <ArticleInteractions locale={locale} />
        {relatedArticles.length > 0 ? (
          <section className="mt-14 border-t border-line pt-10">
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.articles.related}</h2>
            <div className="mt-6 grid gap-5">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.slug} article={relatedArticle} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </PageShell>
  );
}
