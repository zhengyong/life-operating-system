import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowRight, ExternalLink} from 'lucide-react';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {CompanyResearchSection} from '@/components/CompanyResearchSection';
import {LearningPathPanel} from '@/components/LearningPathPanel';
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

  const researchPath = {
    title: locale === 'zh' ? `${text(company.name, locale)}研究路径` : `${text(company.name, locale)} Research Path`,
    summary:
      locale === 'zh'
        ? '先看时间线和产品，再看商业模式、文化与护城河，把公司研究变成可复用的判断框架。'
        : 'Start with timeline and products, then study business model, culture, and moat as a reusable judgment frame.',
    stepsTitle: locale === 'zh' ? '推荐顺序' : 'Suggested Order',
    linksTitle: locale === 'zh' ? '继续跳转' : 'Continue Reading',
    practiceTitle: locale === 'zh' ? '静态练习' : 'Static Practice',
    steps: [
      locale === 'zh' ? '先看发展时间线，找出关键转折点。' : 'Read the timeline first and identify key turning points.',
      locale === 'zh' ? '再看产品、客户和商业模式，理解它怎么赚钱。' : 'Then study products, customers, and business model.',
      locale === 'zh' ? '最后看文化、护城河和观察清单，形成自己的判断。' : 'Finally study culture, moat, and watchlist to form your own view.'
    ],
    links: [
      {
        href: `/${locale}/companies/${company.slug}/timeline/`,
        label: t.topics.timeline,
        description: t.topics.timelineSubtitle
      },
      {
        href: `/${locale}/companies/`,
        label: t.nav.companies,
        description: locale === 'zh' ? '回到公司专题，横向比较商业模式。' : 'Return to company studies and compare business models.'
      },
      {
        href: `/${locale}/investment/`,
        label: t.nav.investment,
        description: locale === 'zh' ? '把公司研究连接到长期投资框架。' : 'Connect company research to a long-term investing framework.'
      },
      {
        href: `/${locale}/tags/business-model/`,
        label: locale === 'zh' ? '商业模式' : 'Business Model',
        description: locale === 'zh' ? '继续阅读商业模式相关内容。' : 'Continue reading through business model topics.'
      }
    ],
    exercises: [
      locale === 'zh' ? '用三句话写清楚这家公司怎么赚钱。' : 'Explain how this company makes money in three sentences.',
      locale === 'zh' ? '列出它最重要的一个护城河和一个风险。' : 'List its most important moat and one major risk.',
      locale === 'zh' ? '写下你未来 6 个月要观察的一个信号。' : 'Write one signal to watch over the next six months.'
    ]
  };

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

        <LearningPathPanel {...researchPath} />

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
