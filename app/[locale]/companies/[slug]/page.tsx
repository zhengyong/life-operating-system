import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowRight, ExternalLink} from 'lucide-react';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {CompanyResearchSection} from '@/components/CompanyResearchSection';
import {PageShell} from '@/components/PageShell';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {companies, getCompany, text} from '@/lib/topics';

export function generateStaticParams() {
  return companies.flatMap((company) => [
    {locale: 'en', slug: company.slug},
    {locale: 'zh', slug: company.slug}
  ]);
}

export async function generateMetadata({params}: {params: {locale: string; slug: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const company = getCompany(params.slug);

  if (!company) {
    return {};
  }

  return {
    title: text(company.name, locale),
    description: text(company.summary, locale)
  };
}

function SectionList({title, items, locale}: {title: string; items: Array<{zh: string; en: string}>; locale: Locale}) {
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <h2 className="text-2xl font-semibold tracking-normal text-ink">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={text(item, locale)} className="rounded-md bg-soft p-4 text-sm leading-7 text-muted">
            {text(item, locale)}
          </p>
        ))}
      </div>
    </section>
  );
}

function DeepQuestions({
  intro,
  questions,
  title,
  locale
}: {
  intro: string;
  questions?: Array<{zh: string; en: string}>;
  title: string;
  locale: Locale;
}) {
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-md border border-line bg-soft p-4">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{intro}</p>
      <div className="mt-4 grid gap-2">
        {questions.map((question) => (
          <p key={text(question, locale)} className="rounded-md bg-white px-3 py-2 text-sm leading-6 text-muted">
            {text(question, locale)}
          </p>
        ))}
      </div>
    </aside>
  );
}

export default async function CompanyPage({params}: {params: {locale: string; slug: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  const company = getCompany(params.slug);

  if (!company) {
    notFound();
  }

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-16">
        <Breadcrumbs
          items={[
            {label: t.nav.home, href: `/${locale}/`},
            {label: t.nav.companies, href: `/${locale}/companies/`},
            {label: text(company.name, locale)}
          ]}
        />

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{text(company.category, locale)}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
              {text(company.name, locale)}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{text(company.summary, locale)}</p>
          </div>
          <aside className="rounded-lg border border-line bg-white p-5">
            <h2 className="text-lg font-semibold text-ink">{t.topics.officialLinks}</h2>
            <div className="mt-4 grid gap-3">
              {company.officialLinks.map((link) => (
                <Link
                  key={text(link.label, locale)}
                  href={link.href ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
                >
                  {text(link.label, locale)} <ExternalLink className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <div className="mt-10 grid gap-8">
          <CompanyResearchSection
            questions={
              <DeepQuestions
                intro={t.topics.deepQuestionsIntro}
                questions={company.deepQuestions?.timeline}
                title={t.topics.futureQuestions}
                locale={locale}
              />
            }
          >
            <div className="rounded-lg border border-line bg-white p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.timeline}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{t.topics.timelineSubtitle}</p>
                </div>
                <Link
                  href={`/${locale}/companies/${company.slug}/timeline/`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink"
                >
                  {t.topics.viewTimeline} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-5 grid gap-4">
                {company.timeline.slice(0, 3).map((item) => (
                  <div key={`${item.year}-${text(item.event, locale)}`} className="grid gap-2 rounded-md bg-soft p-4 sm:grid-cols-[80px_1fr]">
                    <span className="text-sm font-semibold text-accent">{item.year}</span>
                    <p className="text-sm leading-7 text-muted">{text(item.event, locale)}</p>
                  </div>
                ))}
              </div>
            </div>
          </CompanyResearchSection>

          <CompanyResearchSection
            questions={
              <DeepQuestions
                intro={t.topics.deepQuestionsIntro}
                questions={company.deepQuestions?.products}
                title={t.topics.futureQuestions}
                locale={locale}
              />
            }
          >
            <div className="rounded-lg border border-line bg-white p-6">
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.products}</h2>
              {company.productSegments ? (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {company.productSegments.map((segment) => (
                    <article key={text(segment.title, locale)} className="rounded-md bg-soft p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-ink">{text(segment.title, locale)}</h3>
                        {segment.revenueLabel ? (
                          <span className="rounded-md bg-white px-2 py-1 text-xs font-medium text-muted">
                            {text(segment.revenueLabel, locale)}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted">{text(segment.summary, locale)}</p>
                      <div className="mt-4 grid gap-2">
                        {segment.products.map((product) => (
                          <p key={text(product, locale)} className="rounded-md bg-white px-3 py-2 text-sm leading-6 text-muted">
                            {text(product, locale)}
                          </p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-5 grid gap-3">
                  {company.products.map((item) => (
                    <p key={text(item, locale)} className="rounded-md bg-soft p-4 text-sm leading-7 text-muted">
                      {text(item, locale)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </CompanyResearchSection>

          <CompanyResearchSection
            questions={
              <DeepQuestions
                intro={t.topics.deepQuestionsIntro}
                questions={company.deepQuestions?.businessModel}
                title={t.topics.futureQuestions}
                locale={locale}
              />
            }
          >
            <div className="rounded-lg border border-line bg-white p-6">
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.businessModel}</h2>
              <div className="mt-5 grid gap-3">
                {company.businessModel.map((item) => (
                  <p key={text(item, locale)} className="rounded-md bg-soft p-4 text-sm leading-7 text-muted">
                    {text(item, locale)}
                  </p>
                ))}
              </div>
            </div>
          </CompanyResearchSection>

          <CompanyResearchSection
            questions={
              <DeepQuestions
                intro={t.topics.deepQuestionsIntro}
                questions={company.deepQuestions?.culture}
                title={t.topics.futureQuestions}
                locale={locale}
              />
            }
          >
            <div className="rounded-lg border border-line bg-white p-6">
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.culture}</h2>
              {company.cultureModel ? (
                <>
                  <div className="mt-5 rounded-md bg-soft p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t.topics.cultureThesis}</p>
                    <p className="mt-3 text-sm leading-7 text-muted">{text(company.cultureModel.thesis, locale)}</p>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {company.cultureModel.dimensions.map((dimension) => (
                      <article key={text(dimension.title, locale)} className="rounded-md border border-line p-5">
                        <h3 className="text-lg font-semibold tracking-normal text-ink">{text(dimension.title, locale)}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted">{text(dimension.summary, locale)}</p>
                        <div className="mt-4 grid gap-2">
                          {dimension.practices.map((practice) => (
                            <p key={text(practice, locale)} className="rounded-md bg-soft px-3 py-2 text-sm leading-6 text-muted">
                              {text(practice, locale)}
                            </p>
                          ))}
                        </div>
                        <div className="mt-4 rounded-md bg-soft p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{t.topics.whyDifferent}</p>
                          <p className="mt-2 text-sm leading-6 text-muted">{text(dimension.whyDifferent, locale)}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-5 grid gap-3">
                  {company.culture.map((item) => (
                    <p key={text(item, locale)} className="rounded-md bg-soft p-4 text-sm leading-7 text-muted">
                      {text(item, locale)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </CompanyResearchSection>

          <CompanyResearchSection
            questions={
              <DeepQuestions
                intro={t.topics.deepQuestionsIntro}
                questions={company.deepQuestions?.moat}
                title={t.topics.futureQuestions}
                locale={locale}
              />
            }
          >
            <div className="rounded-lg border border-line bg-white p-6">
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.moat}</h2>
              <div className="mt-5 grid gap-3">
                {company.moat.map((item) => (
                  <p key={text(item, locale)} className="rounded-md bg-soft p-4 text-sm leading-7 text-muted">
                    {text(item, locale)}
                  </p>
                ))}
              </div>
            </div>
          </CompanyResearchSection>

          <CompanyResearchSection
            questions={
              <DeepQuestions
                intro={t.topics.deepQuestionsIntro}
                questions={company.deepQuestions?.watchlist}
                title={t.topics.futureQuestions}
                locale={locale}
              />
            }
          >
            <div className="rounded-lg border border-line bg-white p-6">
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.watchlist}</h2>
              <div className="mt-5 grid gap-3">
                {company.watchlist.map((item) => (
                  <p key={text(item, locale)} className="rounded-md bg-soft p-4 text-sm leading-7 text-muted">
                    {text(item, locale)}
                  </p>
                ))}
              </div>
            </div>
          </CompanyResearchSection>
        </div>
      </main>
    </PageShell>
  );
}
