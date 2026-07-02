import type {Metadata} from 'next';
import {TopicCard} from '@/components/TopicCard';
import {PageShell} from '@/components/PageShell';
import {isLocale, Locale} from '@/lib/i18n';
import {seoTopics, getSeoTopicContent, getSeoTopicHref} from '@/lib/seoTopics';
import {siteUrl} from '@/lib/site';

const labels: Record<Locale, {title: string; description: string; intro: string; action: string; meta: string}> = {
  zh: {
    title: '专题学习',
    description: '围绕人生操作系统、第一性原理、终身学习、企业文化、家庭教育建立的主题学习入口。',
    intro: '这些主题页把分散文章、标签和栏目重新组织成可连续阅读的路径，方便搜索引擎和读者理解本站的核心知识结构。',
    action: '进入主题',
    meta: 'SEO 主题页'
  },
  en: {
    title: 'Focused Topics',
    description:
      'Topic hubs for Life Operating System, first-principles thinking, lifelong learning, company culture, and family education.',
    intro:
      'These topic pages reorganize articles, tags, and sections into readable paths for both readers and search engines.',
    action: 'Open topic',
    meta: 'SEO topic hub'
  }
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const copy = labels[locale];
  const canonical = `${siteUrl}/${locale}/topics/`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en/topics/`,
        zh: `${siteUrl}/zh/topics/`
      }
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: copy.title,
      description: copy.description,
      siteName: "Yong Zheng's Life Operating System",
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: [locale === 'zh' ? 'en_US' : 'zh_CN']
    },
    twitter: {
      card: 'summary',
      title: copy.title,
      description: copy.description
    }
  };
}

export default function TopicsPage({params}: {params: {locale: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const copy = labels[locale];

  return (
    <PageShell locale={locale}>
      <main>
        <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Topics</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-ink md:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted">{copy.intro}</p>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {seoTopics.map((topic) => {
              const content = getSeoTopicContent(topic, locale);

              return (
                <TopicCard
                  key={topic.slug}
                  href={getSeoTopicHref(topic, locale)}
                  eyebrow={content.eyebrow}
                  title={content.title}
                  summary={content.summary}
                  actionLabel={copy.action}
                  meta={copy.meta}
                />
              );
            })}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
