import type {Metadata} from 'next';
import {BriefcaseBusiness, GraduationCap, Lightbulb, Network, Sparkles} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {getAboutProfile} from '@/lib/about';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'About'
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export default async function AboutPage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);
  const profile = getAboutProfile(locale);

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-6xl px-5 py-12 md:py-18">
        <section className="grid gap-8 border-b border-line pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.about}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-6xl">{profile.title}</h1>
            <p className="mt-4 text-xl leading-8 text-muted">{profile.summary}</p>
            <p className="mt-6 inline-flex rounded-md bg-soft px-3 py-2 text-sm font-medium text-ink">
              {profile.years}
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-accent" />
              <p className="text-sm font-semibold text-ink">{locale === 'zh' ? '个人定位' : 'Profile'}</p>
            </div>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              {profile.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 border-b border-line py-10 md:grid-cols-4">
          {profile.belief.map((item) => (
            <div key={item} className="rounded-lg border border-line bg-white p-5">
              <p className="text-sm font-medium text-muted">{item}</p>
            </div>
          ))}
        </section>

        <section className="py-12">
          <SectionTitle icon={<Lightbulb className="h-5 w-5" />} title={profile.competenciesTitle} />
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {profile.competencies.map((competency) => (
              <article key={competency.title} className="rounded-lg border border-line bg-white p-6">
                <h2 className="text-xl font-semibold tracking-normal text-ink">{competency.title}</h2>
                {competency.description ? (
                  <p className="mt-3 text-sm leading-7 text-muted">{competency.description}</p>
                ) : null}
                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {competency.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {competency.closing ? (
                  <p className="mt-5 border-t border-line pt-4 text-sm leading-7 text-muted">{competency.closing}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-line py-12">
          <SectionTitle icon={<BriefcaseBusiness className="h-5 w-5" />} title={profile.experienceTitle} />
          <div className="mt-8 space-y-5">
            {profile.experiences.map((experience) => (
              <article key={`${experience.company}-${experience.period}`} className="rounded-lg border border-line bg-white p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold tracking-normal text-ink">{experience.company}</h2>
                    <p className="mt-1 text-sm font-medium text-accent">{experience.role}</p>
                  </div>
                  <p className="rounded-md bg-soft px-3 py-1 text-sm text-muted">{experience.period}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">{experience.description}</p>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {experience.responsibilities ? (
                    <ListBlock title={locale === 'zh' ? '主要工作' : 'Key Responsibilities'} items={experience.responsibilities} />
                  ) : null}
                  {experience.achievements ? (
                    <ListBlock title={locale === 'zh' ? '核心成果' : 'Key Achievements'} items={experience.achievements} />
                  ) : null}
                </div>
                {experience.takeaway ? (
                  <p className="mt-5 rounded-md bg-soft p-4 text-sm leading-7 text-muted">{experience.takeaway}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-t border-line py-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle icon={<GraduationCap className="h-5 w-5" />} title={profile.educationTitle} />
            <div className="mt-6 rounded-lg border border-line bg-white p-6">
              <h2 className="text-xl font-semibold tracking-normal text-ink">{profile.education.school}</h2>
              <p className="mt-2 text-sm text-muted">{profile.education.degree}</p>
              <p className="mt-4 rounded-md bg-soft px-3 py-1 text-sm text-muted">{profile.education.period}</p>
            </div>
          </div>
          <div>
            <SectionTitle icon={<Network className="h-5 w-5" />} title={profile.researchTitle} />
            <p className="mt-4 text-sm leading-7 text-muted">{profile.researchIntro}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {profile.research.map((area) => (
                <article key={area.title} className="rounded-lg border border-line bg-white p-5">
                  <h2 className="text-lg font-semibold tracking-normal text-ink">{area.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{area.body}</p>
                  {area.items ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {area.items.map((item) => (
                        <span key={item} className="rounded-md bg-soft px-2.5 py-1 text-xs text-muted">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line py-12">
          <h2 className="text-2xl font-semibold tracking-normal text-ink">{profile.valuesTitle}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {profile.values.map((value) => (
              <span key={value} className="rounded-md border border-line bg-white px-4 py-2 text-sm font-medium text-muted">
                {value}
              </span>
            ))}
          </div>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink">{profile.valuesClosing}</p>
        </section>
      </main>
    </PageShell>
  );
}

function SectionTitle({icon, title}: {icon: React.ReactNode; title: string}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">{icon}</span>
      <h2 className="text-2xl font-semibold tracking-normal text-ink">{title}</h2>
    </div>
  );
}

function ListBlock({title, items}: {title: string; items: string[]}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
