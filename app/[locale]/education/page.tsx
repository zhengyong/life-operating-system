import type {Metadata} from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Brain,
  Compass,
  FileText,
  GraduationCap,
  Lightbulb,
  Network,
  Route
} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {educationContent, et, type EducationStage, type TaggedEducationItem} from '@/lib/education';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {siteUrl} from '@/lib/site';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const title = locale === 'zh' ? 'Education 教育' : 'Education';
  const description = et(educationContent.hero.subtitle, locale);

  return {
    title,
    description,
    keywords:
      locale === 'zh'
        ? ['教育', '教育哲学', '终身学习', '因材施教', 'AI 学习', 'Life OS']
        : ['education', 'education philosophy', 'lifelong learning', 'personalized education', 'AI learning', 'Life OS'],
    alternates: {
      canonical: `${siteUrl}/${locale}/education/`,
      languages: {
        en: `${siteUrl}/en/education/`,
        zh: `${siteUrl}/zh/education/`
      }
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/education/`,
      type: 'website'
    }
  };
}

export default async function EducationPage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);
  const sectionNav = [
    {id: 'philosophy', label: educationContent.sections.philosophy},
    {id: 'framework', label: educationContent.sections.framework},
    {id: 'stages', label: educationContent.sections.stages},
    {id: 'practice', label: educationContent.sections.practice},
    {id: 'case-studies', label: educationContent.sections.cases},
    {id: 'resources', label: educationContent.sections.resources}
  ];

  return (
    <PageShell locale={locale}>
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-14 md:pb-16 md:pt-20">
          <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.education}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-ink md:text-6xl">
                {et(educationContent.hero.title, locale)}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{et(educationContent.hero.subtitle, locale)}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {educationContent.hero.categories.map((category) => (
                  <span
                    key={et(category, locale)}
                    className="rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-muted"
                  >
                    {et(category, locale)}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border border-line bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">
                  <Compass className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold tracking-normal text-ink">
                  {locale === 'zh' ? '教育定位' : 'Education Thesis'}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{et(educationContent.hero.thesis, locale)}</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {educationContent.hero.tags.map((tag) => (
                  <span
                    key={et(tag, locale)}
                    className="rounded-md bg-soft px-3 py-2 text-sm font-medium text-ink"
                  >
                    #{et(tag, locale)}
                  </span>
                ))}
              </div>
            </aside>
          </div>

          <nav className="mt-10 flex gap-2 overflow-x-auto border-y border-line py-3" aria-label={locale === 'zh' ? '教育页面导航' : 'Education page navigation'}>
            {sectionNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-soft hover:text-accent"
              >
                {et(item.label, locale)}
              </a>
            ))}
          </nav>
        </section>

        <SectionBand id="philosophy">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Lightbulb className="h-5 w-5" />}
              title={educationContent.sections.philosophy}
              body={educationContent.sectionIntros.philosophy}
              locale={locale}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {educationContent.philosophy.map((item) => (
                <KnowledgeCard key={et(item.title, locale)} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="framework" muted>
          <div className="mx-auto max-w-6xl px-5 py-14">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <SectionIntro
                icon={<Route className="h-5 w-5" />}
                title={educationContent.sections.framework}
                body={educationContent.sectionIntros.framework}
                locale={locale}
              />
              <LearningFlow locale={locale} />
            </div>
            <CapabilityModel locale={locale} />
          </div>
        </SectionBand>

        <SectionBand id="stages">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<GraduationCap className="h-5 w-5" />}
              title={educationContent.sections.stages}
              body={educationContent.sectionIntros.stages}
              locale={locale}
            />
            <Timeline stages={educationContent.stages} locale={locale} />
          </div>
        </SectionBand>

        <SectionBand id="practice" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<FileText className="h-5 w-5" />}
              title={educationContent.sections.practice}
              body={educationContent.sectionIntros.practice}
              locale={locale}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {educationContent.practice.map((item) => (
                <KnowledgeCard key={et(item.title, locale)} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="case-studies">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Network className="h-5 w-5" />}
              title={educationContent.sections.cases}
              body={educationContent.sectionIntros.cases}
              locale={locale}
            />
            <div className="grid gap-5 md:grid-cols-3">
              {educationContent.caseStudies.map((item) => (
                <CaseStudyCard key={et(item.title, locale)} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="resources" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<BookOpen className="h-5 w-5" />}
              title={educationContent.sections.resources}
              body={educationContent.sectionIntros.resources}
              locale={locale}
            />
            <Link href={`/${locale}/books/`} className="group block rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
              <div className="mb-5 flex flex-col gap-2 border-b border-line pb-4 md:flex-row md:items-center md:justify-between">
                <p className="text-sm font-semibold text-ink">{locale === 'zh' ? '进入框架体系' : 'Open Framework System'}</p>
                <span className="text-sm font-medium text-accent">{t.nav.books}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {educationContent.resources.map((resource) => (
                  <article key={et(resource.type, locale)} className="rounded-md bg-soft p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-accent">
                        <BookOpen className="h-4 w-4" />
                      </span>
                      <div>
                        <h2 className="text-lg font-semibold tracking-normal text-ink">{et(resource.type, locale)}</h2>
                        <p className="mt-2 text-sm leading-6 text-muted">{et(resource.summary, locale)}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {resource.items.map((item) => (
                        <span key={et(item, locale)} className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-muted">
                          {et(item, locale)}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </Link>
          </div>
        </SectionBand>
      </main>
    </PageShell>
  );
}

function SectionBand({children, id, muted = false}: {children: React.ReactNode; id: string; muted?: boolean}) {
  return (
    <section id={id} className={`${muted ? 'border-y border-line bg-soft/70' : 'bg-white'} scroll-mt-24`}>
      {children}
    </section>
  );
}

function SectionIntro({
  icon,
  title,
  body,
  locale
}: {
  icon: React.ReactNode;
  title: {zh: string; en: string};
  body: {zh: string; en: string};
  locale: Locale;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-accent shadow-sm ring-1 ring-line">
          {icon}
        </span>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{et(title, locale)}</p>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal text-ink md:text-4xl">{et(title, locale)}</h2>
      <p className="mt-4 text-sm leading-7 text-muted">{et(body, locale)}</p>
    </div>
  );
}

function KnowledgeCard({item, locale, compact = false}: {item: TaggedEducationItem; locale: Locale; compact?: boolean}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">{et(item.category, locale)}</span>
      </div>
      <h3 className={`${compact ? 'text-lg' : 'text-xl'} mt-4 font-semibold tracking-normal text-ink`}>{et(item.title, locale)}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{et(item.summary, locale)}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={et(tag, locale)}
            className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted"
          >
            #{et(tag, locale)}
          </span>
        ))}
      </div>
    </article>
  );
}

function CaseStudyCard({item, locale}: {item: TaggedEducationItem; locale: Locale}) {
  const href = item.category.en === 'People' ? `/${locale}/people/` : item.category.en === 'Companies' ? `/${locale}/companies/` : null;
  const card = (
    <article className="h-full rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">{et(item.category, locale)}</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-normal text-ink">{et(item.title, locale)}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{et(item.summary, locale)}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={et(tag, locale)} className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
            #{et(tag, locale)}
          </span>
        ))}
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {card}
    </Link>
  ) : (
    card
  );
}

function LearningFlow({locale}: {locale: Locale}) {
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-3">
        {educationContent.framework.map((step, index) => (
          <article key={step.key} className="relative min-h-40 rounded-lg border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-soft text-sm font-semibold text-accent">
                {index + 1}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-normal text-ink">{et(step.title, locale)}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{et(step.summary, locale)}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-line bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">{locale === 'zh' ? '学习成长路径图' : 'Learning Growth Path'}</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {locale === 'zh'
                ? '从输入到迭代，每一轮学习都沉淀为下一轮更好的判断、行动和自我管理。'
                : 'From input to evolution, each learning cycle becomes better judgment, action, and self-management for the next one.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-medium text-accent">
            <span className="rounded-md bg-soft px-3 py-1.5">Input</span>
            <span className="rounded-md bg-soft px-3 py-1.5">Output</span>
            <span className="rounded-md bg-soft px-3 py-1.5">Upgrade</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilityModel({locale}: {locale: Locale}) {
  return (
    <section className="mt-8 rounded-lg border border-line bg-white p-5">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">
              <Brain className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-semibold tracking-normal text-ink">
              {locale === 'zh' ? '能力成长模型图' : 'Capability Growth Model'}
            </h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">
            {locale === 'zh'
              ? '教育目标不是单点知识，而是让学习能力、思考能力、创造能力和自我管理形成相互增强的系统。'
              : 'The educational target is not isolated knowledge, but a reinforcing system of learning, thinking, creation, and self-management.'}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {educationContent.capabilities.map((capability) => (
            <article key={et(capability.title, locale)} className="rounded-md bg-soft p-4">
              <h3 className="text-base font-semibold tracking-normal text-ink">{et(capability.title, locale)}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{et(capability.summary, locale)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline({stages, locale}: {stages: EducationStage[]; locale: Locale}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:block" />
      <div className="space-y-5">
        {stages.map((stage) => (
          <article key={stage.age} className="relative rounded-lg border border-line bg-white p-5 md:ml-12">
            <span className="absolute -left-12 top-6 hidden h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-xs font-semibold text-accent md:flex">
              {stage.age.split('-')[0]}
            </span>
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-accent">{stage.age}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-normal text-ink">{et(stage.title, locale)}</h3>
              </div>
              <span className="w-fit rounded-md bg-soft px-3 py-1 text-sm font-medium text-muted">{stage.age}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{et(stage.goal, locale)}</p>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <StageList title={locale === 'zh' ? '关键能力' : 'Key Abilities'} items={stage.abilities} locale={locale} />
              <StageList title={locale === 'zh' ? '推荐方法' : 'Recommended Methods'} items={stage.methods} locale={locale} />
              <StageList title={locale === 'zh' ? '推荐书籍' : 'Recommended Books'} items={stage.books} locale={locale} />
              <StageList title={locale === 'zh' ? '实践案例' : 'Practice Case'} items={stage.cases} locale={locale} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function StageList({title, items, locale}: {title: string; items: {zh: string; en: string}[]; locale: Locale}) {
  return (
    <div className="rounded-md bg-soft p-4">
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={et(item, locale)} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{et(item, locale)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
