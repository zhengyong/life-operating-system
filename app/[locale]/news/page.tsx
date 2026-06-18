import type {Metadata} from 'next';
import {Clock3, ExternalLink, Newspaper, Radio, Rss} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {getNewsPayload, type NewsItem, type NewsTopic} from '@/lib/news';
import {siteUrl} from '@/lib/site';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const title = locale === 'zh' ? 'News 新闻' : 'News';
  const description =
    locale === 'zh'
      ? '每周从 Hacker News 和 TechCrunch 更新的科技、AI、宏观与全球热点新闻。'
      : 'Weekly technology, AI, macro, and global signal updates from Hacker News and TechCrunch.';

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/news/`,
      languages: {
        en: `${siteUrl}/en/news/`,
        zh: `${siteUrl}/zh/news/`
      }
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/news/`,
      type: 'website'
    }
  };
}

export default async function NewsPage({params}: {params: {locale: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  const news = getNewsPayload();
  const featured = news.items.slice(0, 4);
  const remaining = news.items.slice(4);

  return (
    <PageShell locale={locale}>
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:pb-14 md:pt-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent ring-1 ring-line">
                  <Newspaper className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.news}</p>
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-normal text-ink md:text-6xl">
                {locale === 'zh' ? '每周新闻信号' : 'Weekly News Signals'}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                {locale === 'zh'
                  ? '关注 AI、科技公司、全球宏观、金融市场和关键人物，把最近一周值得回看的新闻放在一个页面。'
                  : 'A compact weekly view of AI, technology companies, global macro, financial markets, and key builders.'}
              </p>
            </div>

            <aside className="rounded-lg border border-line bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">
                  <Rss className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold tracking-normal text-ink">
                  {locale === 'zh' ? '新闻来源' : 'News Sources'}
                </h2>
              </div>
              <div className="mt-5 grid gap-3">
                {news.sources.map((source) => (
                  <a
                    key={source.id}
                    href={source.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-md bg-soft px-3 py-2 text-sm font-medium text-muted transition hover:text-accent"
                  >
                    <span>{source.name}</span>
                    <ExternalLink className="h-4 w-4 shrink-0" />
                  </a>
                ))}
              </div>
              <dl className="mt-6 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                  <dt className="text-muted">{locale === 'zh' ? '保留时间' : 'Window'}</dt>
                  <dd className="font-semibold text-ink">
                    {locale === 'zh' ? `最近 ${news.retentionDays} 天` : `Last ${news.retentionDays} days`}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">{locale === 'zh' ? '更新时间' : 'Updated'}</dt>
                  <dd className="text-right font-semibold text-ink">{formatDate(news.generatedAt, locale)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="border-y border-line bg-soft/70">
          <div className="mx-auto max-w-6xl px-5 py-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Radio className="h-5 w-5 text-accent" />
                <h2 className="text-xl font-semibold tracking-normal text-ink">
                  {locale === 'zh' ? '关注主题' : 'Watch Topics'}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {news.watchTopics.map((topic) => (
                  <span key={topic.id} className="rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-muted">
                    {topicLabel(topic, locale)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12">
          {news.items.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div className="grid gap-4">
                {featured.map((item) => (
                  <NewsCard key={item.id} item={item} locale={locale} featured />
                ))}
              </div>
              <div className="grid gap-4">
                {remaining.map((item) => (
                  <NewsCard key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-line bg-white p-8 text-center">
              <Newspaper className="mx-auto h-8 w-8 text-accent" />
              <h2 className="mt-4 text-2xl font-semibold tracking-normal text-ink">
                {locale === 'zh' ? '暂无最近新闻' : 'No Recent News Yet'}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted">
                {locale === 'zh'
                  ? '下一次 GitHub Actions 运行后，这里会显示最近 7 天内抓取到的新闻。'
                  : 'Recent items will appear here after the next GitHub Actions run.'}
              </p>
            </div>
          )}
        </section>
      </main>
    </PageShell>
  );
}

function NewsCard({item, locale, featured = false}: {item: NewsItem; locale: Locale; featured?: boolean}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
        <span className="rounded-md bg-soft px-2.5 py-1">{item.source.name}</span>
        <span className="inline-flex items-center gap-1 rounded-md bg-soft px-2.5 py-1">
          <Clock3 className="h-3.5 w-3.5" />
          {formatDate(item.publishedAt, locale)}
        </span>
      </div>
      <h2 className={`${featured ? 'text-2xl' : 'text-xl'} mt-4 font-semibold tracking-normal text-ink`}>
        <a href={item.url} target="_blank" rel="noreferrer" className="transition hover:text-accent">
          {item.title}
        </a>
      </h2>
      {item.summary ? <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">{item.summary}</p> : null}
      <div className="mt-5 flex flex-wrap gap-2">
        {(item.topics.length > 0 ? item.topics : [genericTopic(locale)]).map((topic) => (
          <span key={topic.id} className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
            #{topicLabel(topic, locale)}
          </span>
        ))}
      </div>
    </article>
  );
}

function topicLabel(topic: NewsTopic, locale: Locale) {
  return locale === 'zh' ? topic.labelZh : topic.labelEn;
}

function genericTopic(locale: Locale): NewsTopic {
  return {
    id: 'general',
    labelZh: '综合',
    labelEn: locale === 'zh' ? '综合' : 'General'
  };
}

function formatDate(value: string | null | undefined, locale: Locale) {
  if (!value) {
    return locale === 'zh' ? '等待更新' : 'Pending';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return locale === 'zh' ? '未知时间' : 'Unknown';
  }

  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}
