import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowRight, BookOpen, CheckCircle2, Tags} from 'lucide-react';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {JsonLd} from '@/components/JsonLd';
import {PageShell} from '@/components/PageShell';
import {getSeoTopic, getSeoTopicArticles, getSeoTopicContent, getSeoTopicHref, getRelatedSeoTopics, seoTopics} from '@/lib/seoTopics';
import {breadcrumbJsonLd} from '@/lib/seo';
import {siteUrl} from '@/lib/site';
import {isLocale, locales, Locale} from '@/lib/i18n';
import {getTagHref} from '@/lib/taxonomy';
import {formatDate} from '@/lib/utils';

const labels: Record<
  Locale,
  {
    home: string;
    topics: string;
    path: string;
    articles: string;
    tags: string;
    relatedLinks: string;
    relatedTopics: string;
    read: string;
    topic: string;
  }
> = {
  zh: {
    home: '首页',
    topics: '专题学习',
    path: '主题路径',
    articles: '相关文章',
    tags: '相关标签',
    relatedLinks: '相关栏目',
    relatedTopics: '继续阅读',
    read: '阅读文章',
    topic: '主题页'
  },
  en: {
    home: 'Home',
    topics: 'Topics',
    path: 'Reading Path',
    articles: 'Related Articles',
    tags: 'Related Tags',
    relatedLinks: 'Related Sections',
    relatedTopics: 'Continue Reading',
    read: 'Read article',
    topic: 'Topic hub'
  }
};

export function generateStaticParams() {
  return locales.flatMap((locale) => seoTopics.map((topic) => ({locale, slug: topic.slug})));
}

export async function generateMetadata({
  params
}: {
  params: {locale: string; slug: string};
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const topic = getSeoTopic(params.slug);

  if (!topic) {
    return {};
  }

  const content = getSeoTopicContent(topic, locale);
  const canonical = `${siteUrl}/${locale}/topics/${topic.slug}/`;

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en/topics/${topic.slug}/`,
        zh: `${siteUrl}/zh/topics/${topic.slug}/`
      }
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: content.title,
      description: content.description,
      siteName: "Yong Zheng's Life Operating System",
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: [locale === 'zh' ? 'en_US' : 'zh_CN']
    },
    twitter: {
      card: 'summary',
      title: content.title,
      description: content.description
    }
  };
}

export default function SeoTopicPage({params}: {params: {locale: string; slug: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const topic = getSeoTopic(params.slug);

  if (!topic) {
    notFound();
  }

  const copy = labels[locale];
  const content = getSeoTopicContent(topic, locale);
  const relatedArticles = getSeoTopicArticles(topic, locale);
  const relatedTopics = getRelatedSeoTopics(topic);
  const canonical = `${siteUrl}/${locale}/topics/${topic.slug}/`;
  const breadcrumbs = [
    {label: copy.home, href: `/${locale}/`},
    {label: copy.topics, href: `/${locale}/topics/`},
    {label: content.title}
  ];
  const breadcrumbSchema = breadcrumbJsonLd([
    {name: copy.home, url: `${siteUrl}/${locale}/`},
    {name: copy.topics, url: `${siteUrl}/${locale}/topics/`},
    {name: content.title, url: canonical}
  ]);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.title,
    headline: content.title,
    description: content.description,
    url: canonical,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    about: content.keywords,
    author: {
      '@type': 'Person',
      name: 'Yong Zheng',
      url: `${siteUrl}/${locale}/about/`
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: relatedArticles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/${locale}/articles/${article.slug}/`,
        name: locale === 'en' && article.title_en ? article.title_en : article.title
      }))
    }
  };

  return (
    <PageShell locale={locale}>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <main>
        <section className="mx-auto max-w-6xl px-5 py-10 md:py-16">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{content.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-ink md:text-5xl">{content.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{content.summary}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {content.keywords.slice(0, 7).map((keyword) => (
                  <span key={keyword} className="rounded-md bg-soft px-3 py-1.5 text-sm text-muted">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <aside className="rounded-lg border border-line bg-white p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-accent" />
                <p className="font-semibold text-ink">{copy.topic}</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{content.thesis}</p>
            </aside>
          </div>
        </section>

        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{copy.path}</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {content.sections.map((section) => (
                <article key={section.heading} className="rounded-lg border border-line bg-soft p-5">
                  <h3 className="text-lg font-semibold tracking-normal text-ink">{section.heading}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{section.body}</p>
                  <ul className="mt-5 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-6 text-muted">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{copy.articles}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{content.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
              {topic.relatedTags.slice(0, 6).map((tag, index) => (
                <Link
                  key={tag}
                  href={getTagHref(tag, locale)}
                  className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
                >
                  <Tags className="h-3.5 w-3.5" />
                  {content.tagLabels[index] ?? tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((article) => {
              const title = locale === 'en' && article.title_en ? article.title_en : article.title;
              const summary = locale === 'en' && article.summary_en ? article.summary_en : article.summary;

              return (
                <article key={article.slug} className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
                    <span>{formatDate(article.date, locale)}</span>
                    <span aria-hidden="true">/</span>
                    <span>{article.category}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-normal text-ink">
                    <Link href={`/${locale}/articles/${article.slug}/`}>{title}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{summary}</p>
                  <Link
                    href={`/${locale}/articles/${article.slug}/`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink"
                  >
                    {copy.read} <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{copy.relatedLinks}</h2>
            <div className="mt-6 grid gap-4">
              {content.relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft"
                >
                  <p className="font-semibold text-ink">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{copy.relatedTopics}</h2>
            <div className="mt-6 grid gap-4">
              {relatedTopics.slice(0, 4).map((relatedTopic) => {
                const relatedContent = getSeoTopicContent(relatedTopic, locale);

                return (
                  <Link
                    key={relatedTopic.slug}
                    href={getSeoTopicHref(relatedTopic, locale)}
                    className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft"
                  >
                    <p className="text-sm font-medium text-accent">{relatedContent.eyebrow}</p>
                    <p className="mt-2 font-semibold text-ink">{relatedContent.title}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{relatedContent.summary}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
