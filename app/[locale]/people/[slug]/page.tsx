import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowRight, ExternalLink} from 'lucide-react';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {PageShell} from '@/components/PageShell';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {companies, getPerson, getPersonLessons, people, text} from '@/lib/topics';

const archiveTypes = ['speech', 'interview', 'launch', 'book'] as const;

export function generateStaticParams() {
  return people.flatMap((person) => [
    {locale: 'en', slug: person.slug},
    {locale: 'zh', slug: person.slug}
  ]);
}

export async function generateMetadata({params}: {params: {locale: string; slug: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const person = getPerson(params.slug);

  if (!person) {
    return {};
  }

  return {
    title: text(person.name, locale),
    description: text(person.summary, locale)
  };
}

export default async function PersonPage({params}: {params: {locale: string; slug: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  const person = getPerson(params.slug);

  if (!person) {
    notFound();
  }

  const relatedCompanies = companies.filter((company) => person.relatedCompanies.includes(company.slug));
  const recentNews = person.content.filter((item) => item.type === 'news');
  const archive = person.content.filter((item) => item.type !== 'news');
  const lessons = getPersonLessons(person.slug);
  const getMatchingLesson = (title: string) => lessons.find((lesson) => text(lesson.title, locale) === title);
  const archiveGroups = archiveTypes
    .map((type) => ({
      type,
      items: archive.filter((item) => item.type === type)
    }))
    .filter((group) => group.items.length > 0);

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-5xl px-5 py-10 md:py-16">
        <Breadcrumbs
          items={[
            {label: t.nav.home, href: `/${locale}/`},
            {label: t.nav.people, href: `/${locale}/people/`},
            {label: text(person.name, locale)}
          ]}
        />

        <section className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{text(person.role, locale)}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
            {text(person.name, locale)}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{text(person.summary, locale)}</p>
        </section>

        <section className="mt-10 rounded-lg border border-line bg-white p-6">
          <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.learnFrom}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {person.learnFrom.map((item) => {
              const title = text(item, locale);
              const lesson = getMatchingLesson(title);

              return lesson ? (
                <Link
                  key={title}
                  href={`/${locale}/people/${person.slug}/lessons/${lesson.slug}/`}
                  className="group flex min-h-28 flex-col justify-between rounded-md bg-soft p-4 text-sm leading-6 text-muted transition hover:bg-white hover:shadow-soft"
                >
                  <span className="font-medium text-ink group-hover:text-accent">{title}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-accent">
                    {t.topics.readTopic} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ) : (
                <div key={title} className="rounded-md bg-soft p-4 text-sm leading-6 text-muted">
                  {title}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-line bg-white p-6">
          <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.recentNews}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {recentNews.map((item) => (
              <article key={text(item.title, locale)} className="flex min-h-64 flex-col rounded-md border border-line p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
                  {item.date ? <span>{item.date}</span> : null}
                  <span>{text(item.source, locale)}</span>
                </div>
                <h3 className="mt-3 font-semibold text-ink">{text(item.title, locale)}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{text(item.note, locale)}</p>
                {item.href ? (
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent"
                  >
                    {t.topics.viewSource} <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {archiveGroups.map((group) => (
          <section key={group.type} className="mt-8 rounded-lg border border-line bg-white p-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.contentTypes[group.type]}</h2>
              <span className="rounded-md bg-soft px-2 py-1 text-xs font-medium text-muted">{group.items.length}</span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <article key={text(item.title, locale)} className="flex min-h-56 flex-col rounded-md bg-soft p-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
                    {item.date ? <span>{item.date}</span> : null}
                    <span>{text(item.source, locale)}</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-ink">{text(item.title, locale)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted">{text(item.note, locale)}</p>
                  {item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent"
                    >
                      {t.topics.viewSource} <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}

        {person.advice ? (
          <section className="mt-8 rounded-lg border border-line bg-white p-6">
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.lifeAdvice}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{t.topics.lifeAdviceSubtitle}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {person.advice.map((item) => (
                <article key={text(item.title, locale)} className="flex min-h-72 flex-col rounded-md bg-soft p-4">
                  <h3 className="text-lg font-semibold text-ink">{text(item.title, locale)}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{text(item.summary, locale)}</p>
                  <div className="mt-4 grid gap-2">
                    {item.points.map((point) => (
                      <p key={text(point, locale)} className="rounded-md bg-white px-3 py-2 text-sm leading-6 text-muted">
                        {text(point, locale)}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {person.companyGroups || relatedCompanies.length > 0 ? (
          <section className="mt-8 rounded-lg border border-line bg-white p-6">
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.topics.relatedCompanies}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{t.topics.relatedCompaniesSubtitle}</p>
            {person.companyGroups ? (
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {person.companyGroups.map((group) => (
                  <article key={text(group.title, locale)} className="rounded-md bg-soft p-4">
                    <h3 className="font-semibold text-ink">{text(group.title, locale)}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{text(group.summary, locale)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.links.map((link) => {
                        const href = link.companySlug ? `/${locale}/companies/${link.companySlug}/` : link.href ?? '#';

                        return (
                          <Link
                            key={link.name}
                            href={href}
                            target={link.companySlug ? undefined : '_blank'}
                            rel={link.companySlug ? undefined : 'noopener noreferrer'}
                            className="rounded-md bg-white px-3 py-2 text-sm font-medium text-muted transition hover:text-accent"
                          >
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-5 flex flex-wrap gap-3">
                {relatedCompanies.map((company) => (
                  <Link
                    key={company.slug}
                    href={`/${locale}/companies/${company.slug}/`}
                    className="rounded-md border border-line bg-soft px-3 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
                  >
                    {text(company.name, locale)}
                  </Link>
                ))}
              </div>
            )}
          </section>
        ) : null}
      </main>
    </PageShell>
  );
}
