import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowRight, LineChart} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {companies, stockModules, text} from '@/lib/topics';

export const metadata: Metadata = {
  title: 'Investment Studies'
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export default async function StocksPage({params}: {params: {locale: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.investment}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
            {t.topics.stocksTitle}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{t.topics.stocksSubtitle}</p>
          <Link href={`/${locale}/investment/`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink">
            {locale === 'zh' ? '进入新版投资体系' : 'Open the Investment system'} <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 rounded-md border border-line bg-white px-4 py-3 text-sm leading-6 text-muted">
            {t.topics.notAdvice}
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.stockModules}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {stockModules.map((module) => (
              <article key={text(module.title, locale)} className="rounded-lg border border-line bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-soft text-accent">
                    <LineChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-normal text-ink">{text(module.title, locale)}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{text(module.summary, locale)}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3">
                  {module.lessons.map((lesson) => (
                    <p key={text(lesson, locale)} className="rounded-md bg-soft p-3 text-sm leading-6 text-muted">
                      {text(lesson, locale)}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-line bg-white p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.companiesTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {locale === 'zh'
                  ? '先从公司理解股票，再从股票反过来检验市场预期。'
                  : 'Understand stocks through companies first, then use stocks to test market expectations.'}
              </p>
            </div>
            <Link href={`/${locale}/companies/`} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink">
              {t.nav.companies} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {companies.map((company) => (
              <Link
                key={company.slug}
                href={`/${locale}/companies/${company.slug}/`}
                className="rounded-md border border-line bg-soft px-3 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
              >
                {text(company.name, locale)}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
