import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ChevronLeft, ExternalLink} from 'lucide-react';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {PageShell} from '@/components/PageShell';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {isPublicCompanySlug} from '@/lib/publicTopics';
import {companies, getCompany, text} from '@/lib/topics';

export function generateStaticParams() {
  return companies
    .filter((company) => isPublicCompanySlug(company.slug))
    .flatMap((company) => [
      {locale: 'en', slug: company.slug},
      {locale: 'zh', slug: company.slug}
    ]);
}

export async function generateMetadata({params}: {params: {locale: string; slug: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const company = getCompany(params.slug);

  if (!company || !isPublicCompanySlug(company.slug)) {
    return {};
  }

  return {
    title: `${text(company.name, locale)} ${locale === 'zh' ? '发展历程' : 'Timeline'}`,
    description: text(company.summary, locale)
  };
}

export default async function CompanyTimelinePage({params}: {params: {locale: string; slug: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  const company = getCompany(params.slug);

  if (!company || !isPublicCompanySlug(company.slug)) {
    notFound();
  }

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-5xl px-5 py-10 md:py-16">
        <Breadcrumbs
          items={[
            {label: t.nav.home, href: `/${locale}/`},
            {label: t.nav.companies, href: `/${locale}/companies/`},
            {label: text(company.name, locale), href: `/${locale}/companies/${company.slug}/`},
            {label: t.topics.timeline}
          ]}
        />

        <Link
          href={`/${locale}/companies/${company.slug}/`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          {text(company.name, locale)}
        </Link>

        <section className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{text(company.name, locale)}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">{t.topics.timeline}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{t.topics.timelineSubtitle}</p>
        </section>

        <section className="mt-12">
          <div className="relative border-l border-line pl-6 md:pl-10">
            {company.timeline.map((item) => (
              <article key={`${item.year}-${text(item.event, locale)}`} className="relative mb-8 last:mb-0">
                <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-white md:-left-[47px]" />
                <div className="grid gap-4 rounded-lg border border-line bg-white p-5 md:grid-cols-[180px_1fr]">
                  <div>
                    <p className="text-2xl font-semibold tracking-normal text-accent">{item.year}</p>
                    <div className="mt-4 flex min-h-28 items-center justify-center rounded-md border border-dashed border-line bg-soft p-3 text-center text-xs leading-5 text-muted">
                      {item.imageHint ? text(item.imageHint, locale) : t.topics.imagePlaceholder}
                    </div>
                  </div>
                  <div>
                    <p className="text-base leading-8 text-ink">{text(item.event, locale)}</p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink"
                      >
                        {t.topics.viewSource} <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
