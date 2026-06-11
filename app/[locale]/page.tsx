import Link from 'next/link';
import {ArrowRight, BookOpen, Building2, Compass, Layers, LineChart, UserRound} from 'lucide-react';
import {ArticleCard} from '@/components/ArticleCard';
import {PageShell} from '@/components/PageShell';
import {categories, getArticles} from '@/lib/content';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {getCategoryHref, getCategoryLabel} from '@/lib/taxonomy';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export default async function HomePage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);
  const latest = getArticles(locale).slice(0, 3);

  return (
    <PageShell locale={locale}>
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-16 md:pb-20 md:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.brandShort}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-normal text-ink md:text-6xl">
                {t.home.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{t.home.heroSubtitle}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/articles/`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-accent"
                >
                  {t.nav.articles} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/${locale}/books/`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
                >
                  {t.nav.books}
                </Link>
              </div>
            </div>
            <div className="rounded-lg border border-line bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <Compass className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold text-ink">{t.home.introTitle}</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{t.home.introBody}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-soft p-3">
                  <BookOpen className="mb-2 h-4 w-4 text-gold" />
                  <span className="font-medium text-ink">{t.nav.books}</span>
                </div>
                <div className="rounded-md bg-soft p-3">
                  <Layers className="mb-2 h-4 w-4 text-accent" />
                  <span className="font-medium text-ink">Models</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-start">
              <div>
                <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.home.systemTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{t.home.systemBody}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={getCategoryHref(category, locale)}
                    className="rounded-md border border-line bg-soft px-3 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
                  >
                    {getCategoryLabel(category, locale)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.home.topicsTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{t.home.topicsBody}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {href: `/${locale}/people/`, label: t.nav.people, icon: UserRound},
                {href: `/${locale}/companies/`, label: t.nav.companies, icon: Building2},
                {href: `/${locale}/stocks/`, label: t.nav.stocks, icon: LineChart}
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <p className="mt-4 font-semibold text-ink">{item.label}</p>
                    <ArrowRight className="mt-4 h-4 w-4 text-muted" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-7 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.home.latest}</h2>
            <Link href={`/${locale}/articles/`} className="text-sm font-medium text-accent hover:text-ink">
              {t.common.allArticles}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} />
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
