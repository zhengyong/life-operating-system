import type {Metadata} from 'next';
import {PageShell} from '@/components/PageShell';
import {TopicCard} from '@/components/TopicCard';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {isPublicCompanySlug} from '@/lib/publicTopics';
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
  const visibleCompanies = companies.filter((company) => isPublicCompanySlug(company.slug));

  return (
    <PageShell locale={locale}>
      <main className="directory-page">
        <section className="directory-page__hero">
          <div className="directory-page__hero-inner">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.companies}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
            {t.topics.companiesTitle}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{t.topics.companiesSubtitle}</p>
          </div>
        </section>

        <section className="directory-grid">
          {visibleCompanies.map((company) => (
            <TopicCard
              key={company.slug}
              href={`/${locale}/companies/${company.slug}/`}
              eyebrow={text(company.category, locale)}
              title={text(company.name, locale)}
              summary={text(company.summary, locale)}
              actionLabel={t.topics.readTopic}
              variant="directory"
            />
          ))}
        </section>
      </main>
    </PageShell>
  );
}
