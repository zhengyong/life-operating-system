import type {Metadata} from 'next';
import {PageShell} from '@/components/PageShell';
import {TopicCard} from '@/components/TopicCard';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {localizedPageMetadata} from '@/lib/seo';
import {companies, text} from '@/lib/topics';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  return localizedPageMetadata({
    locale,
    path: 'companies',
    title: t.topics.companiesTitle,
    description: t.topics.companiesSubtitle
  });
}

export default async function CompaniesPage({params}: {params: {locale: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.companies}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
            {t.topics.companiesTitle}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{t.topics.companiesSubtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {companies.map((company) => (
            <TopicCard
              key={company.slug}
              href={`/${locale}/companies/${company.slug}/`}
              eyebrow={text(company.category, locale)}
              title={text(company.name, locale)}
              summary={text(company.summary, locale)}
              actionLabel={t.topics.readTopic}
            />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
