import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ChevronLeft} from 'lucide-react';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {PageShell} from '@/components/PageShell';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {getPerson, getPersonLesson, people, personLessons, text} from '@/lib/topics';

export function generateStaticParams() {
  return personLessons.flatMap((lesson) => [
    {locale: 'en', slug: lesson.personSlug, lesson: lesson.slug},
    {locale: 'zh', slug: lesson.personSlug, lesson: lesson.slug}
  ]);
}

export async function generateMetadata({
  params
}: {
  params: {locale: string; slug: string; lesson: string};
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const lesson = getPersonLesson(params.slug, params.lesson);

  if (!lesson) {
    return {};
  }

  return {
    title: text(lesson.title, locale),
    description: text(lesson.summary, locale)
  };
}

export default async function PersonLessonPage({
  params
}: {
  params: {locale: string; slug: string; lesson: string};
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  const person = getPerson(params.slug);
  const lesson = getPersonLesson(params.slug, params.lesson);

  if (!person || !lesson) {
    notFound();
  }

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-16">
        <Breadcrumbs
          items={[
            {label: t.nav.home, href: `/${locale}/`},
            {label: t.nav.people, href: `/${locale}/people/`},
            {label: text(person.name, locale), href: `/${locale}/people/${person.slug}/`},
            {label: text(lesson.title, locale)}
          ]}
        />

        <Link
          href={`/${locale}/people/${person.slug}/`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          {text(person.name, locale)}
        </Link>

        <article className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{text(person.name, locale)}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
            {text(lesson.title, locale)}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{text(lesson.summary, locale)}</p>

          <section className="mt-10 rounded-lg border border-line bg-white p-6">
            <h2 className="text-2xl font-semibold tracking-normal text-ink">
              {locale === 'zh' ? '关键学习点' : 'Key Takeaways'}
            </h2>
            <div className="mt-5 grid gap-3">
              {lesson.keyTakeaways.map((item) => (
                <p key={text(item, locale)} className="rounded-md bg-soft p-4 text-sm leading-7 text-muted">
                  {text(item, locale)}
                </p>
              ))}
            </div>
          </section>

          <div className="prose prose-lg mt-10 prose-neutral">
            {lesson.sections.map((section) => (
              <section key={text(section.title, locale)} className="mt-10">
                <h2>{text(section.title, locale)}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={text(paragraph, locale)}>{text(paragraph, locale)}</p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
    </PageShell>
  );
}
