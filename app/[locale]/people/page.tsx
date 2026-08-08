import type {Metadata} from 'next';
import {PageShell} from '@/components/PageShell';
import {TopicCard} from '@/components/TopicCard';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {isPublicPersonSlug} from '@/lib/publicTopics';
import {localizedPageMetadata} from '@/lib/seo';
import {people, text} from '@/lib/topics';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  return localizedPageMetadata({
    locale,
    path: 'people',
    title: t.topics.peopleTitle,
    description: t.topics.peopleSubtitle
  });
}

export default async function PeoplePage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);
  const visiblePeople = people.filter((person) => isPublicPersonSlug(person.slug));

  return (
    <PageShell locale={locale}>
      <main className="directory-page">
        <section className="directory-page__hero">
          <div className="directory-page__hero-inner">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.people}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
            {t.topics.peopleTitle}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{t.topics.peopleSubtitle}</p>
          </div>
        </section>

        <section className="directory-grid">
          {visiblePeople.map((person) => (
            <TopicCard
              key={person.slug}
              href={`/${locale}/people/${person.slug}/`}
              eyebrow={text(person.role, locale)}
              title={text(person.name, locale)}
              summary={text(person.summary, locale)}
              actionLabel={t.topics.readTopic}
              variant="directory"
            />
          ))}
        </section>
      </main>
    </PageShell>
  );
}
