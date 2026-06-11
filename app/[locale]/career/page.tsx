import type {Metadata} from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  Compass,
  GitBranch,
  Layers,
  Network,
  RefreshCcw,
  Rocket,
  Route,
  Scale,
  TrendingUp
} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {
  careerContent,
  ct,
  type CareerCapability,
  type CareerCaseStudy,
  type CareerDecision,
  type CareerPathStage,
  type CareerReviewItem,
  type TaggedCareerItem
} from '@/lib/career';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {siteUrl} from '@/lib/site';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const title = locale === 'zh' ? 'Career 职场' : 'Career';
  const description = ct(careerContent.hero.subtitle, locale);

  return {
    title,
    description,
    keywords:
      locale === 'zh'
        ? ['Career', '职场', '职业发展', '职业规划', '成长', '创业', '管理', '投资', 'Life OS']
        : ['Career', 'career development', 'career planning', 'growth', 'entrepreneurship', 'management', 'investing', 'Life OS'],
    alternates: {
      canonical: `${siteUrl}/${locale}/career/`,
      languages: {
        en: `${siteUrl}/en/career/`,
        zh: `${siteUrl}/zh/career/`
      }
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/career/`,
      type: 'website'
    }
  };
}

export default async function CareerPage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);
  const sectionNav = [
    {id: 'career-philosophy', label: careerContent.sections.philosophy},
    {id: 'career-path', label: careerContent.sections.path},
    {id: 'career-growth', label: careerContent.sections.growth},
    {id: 'company-choice', label: careerContent.sections.company},
    {id: 'entrepreneurship', label: careerContent.sections.entrepreneurship},
    {id: 'career-operating-system', label: careerContent.sections.model},
    {id: 'career-case-studies', label: careerContent.sections.cases},
    {id: 'career-review', label: careerContent.sections.review}
  ];

  return (
    <PageShell locale={locale}>
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-14 md:pb-16 md:pt-20">
          <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.career}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-ink md:text-6xl">
                {ct(careerContent.hero.title, locale)}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{ct(careerContent.hero.subtitle, locale)}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {careerContent.hero.categories.map((category) => (
                  <span
                    key={ct(category, locale)}
                    className="rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-muted"
                  >
                    {ct(category, locale)}
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
                  {locale === 'zh' ? '职场定位' : 'Career Thesis'}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{ct(careerContent.hero.thesis, locale)}</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {careerContent.hero.tags.map((tag) => (
                  <span key={ct(tag, locale)} className="rounded-md bg-soft px-3 py-2 text-sm font-medium text-ink">
                    #{ct(tag, locale)}
                  </span>
                ))}
              </div>
            </aside>
          </div>

          <nav className="mt-10 flex gap-2 overflow-x-auto border-y border-line py-3" aria-label={locale === 'zh' ? '职场页面导航' : 'Career page navigation'}>
            {sectionNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-soft hover:text-accent"
              >
                {ct(item.label, locale)}
              </a>
            ))}
          </nav>
        </section>

        <SectionBand id="career-philosophy">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              title={ct(careerContent.sections.philosophy, locale)}
              body={ct(careerContent.sectionIntros.philosophy, locale)}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {careerContent.philosophy.map((item) => (
                <KnowledgeCard key={ct(item.title, locale)} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="career-path" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Route className="h-5 w-5" />}
              title={ct(careerContent.sections.path, locale)}
              body={ct(careerContent.sectionIntros.path, locale)}
            />
            <div>
              <CareerPathTimeline stages={careerContent.pathStages} locale={locale} />
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {careerContent.talentPaths.map((item) => (
                  <KnowledgeCard key={ct(item.title, locale)} item={item} locale={locale} />
                ))}
              </div>
            </div>
          </div>
        </SectionBand>

        <SectionBand id="career-growth">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<TrendingUp className="h-5 w-5" />}
              title={ct(careerContent.sections.growth, locale)}
              body={ct(careerContent.sectionIntros.growth, locale)}
            />
            <div>
              <CapabilityGrid capabilities={careerContent.growth} locale={locale} />
              <div className="mt-5 rounded-lg border border-line bg-white p-5">
                <p className="text-sm font-semibold text-ink">
                  {locale === 'zh' ? '深度优于频繁跳槽' : 'Depth Beats Frequent Job Hopping'}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {locale === 'zh'
                    ? '跳槽可以改变环境，但真正的职业复利来自在关键问题上形成深度、作品和可迁移能力。'
                    : 'Changing jobs can change environment, but real career compounding comes from depth, artifacts, and transferable capability around important problems.'}
                </p>
              </div>
            </div>
          </div>
        </SectionBand>

        <SectionBand id="company-choice" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Building2 className="h-5 w-5" />}
              title={ct(careerContent.sections.company, locale)}
              body={ct(careerContent.sectionIntros.company, locale)}
            />
            <div className="grid gap-4">
              {careerContent.companyChoices.map((choice) => (
                <DecisionCard key={ct(choice.title, locale)} decision={choice} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="entrepreneurship">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Rocket className="h-5 w-5" />}
              title={ct(careerContent.sections.entrepreneurship, locale)}
              body={ct(careerContent.sectionIntros.entrepreneurship, locale)}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {careerContent.entrepreneurship.map((item) => (
                <KnowledgeCard key={ct(item.title, locale)} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="career-operating-system" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Layers className="h-5 w-5" />}
              title={ct(careerContent.sections.model, locale)}
              body={ct(careerContent.sectionIntros.model, locale)}
            />
            <CareerOperatingModel locale={locale} />
          </div>
        </SectionBand>

        <SectionBand id="career-case-studies">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Network className="h-5 w-5" />}
              title={ct(careerContent.sections.cases, locale)}
              body={ct(careerContent.sectionIntros.cases, locale)}
            />
            <div className="grid gap-5 md:grid-cols-2">
              {careerContent.caseStudies.map((item) => (
                <CaseStudyCard key={ct(item.type, locale)} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="career-review" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<RefreshCcw className="h-5 w-5" />}
              title={ct(careerContent.sections.review, locale)}
              body={ct(careerContent.sectionIntros.review, locale)}
            />
            <ReviewTimeline items={careerContent.reviewTimeline} locale={locale} />
          </div>
        </SectionBand>

        <SectionBand id="career-investment-link">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <div className="rounded-lg border border-line bg-white p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">
                      <Scale className="h-5 w-5" />
                    </span>
                    <h2 className="text-2xl font-semibold tracking-normal text-ink">
                      {locale === 'zh' ? 'Career 与 Investment 联动' : 'Career and Investment Link'}
                    </h2>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    {locale === 'zh'
                      ? '职业创造现金流、能力和信用；投资把现金流和认知转化为长期资产。两者互相增强，但不能互相替代。'
                      : 'Career creates cash flow, capability, and trust; investing turns cash flow and judgment into long-term assets. They reinforce each other, but do not replace each other.'}
                  </p>
                </div>
                <Link
                  href={`/${locale}/investment/`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-line px-4 py-3 text-sm font-medium text-accent transition hover:border-accent hover:text-ink"
                >
                  {t.nav.investment} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
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

function SectionIntro({icon, title, body}: {icon: React.ReactNode; title: string; body: string}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-accent shadow-sm ring-1 ring-line">
          {icon}
        </span>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{title}</p>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal text-ink md:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-muted">{body}</p>
    </div>
  );
}

function KnowledgeCard({item, locale}: {item: TaggedCareerItem; locale: Locale}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <span className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">{ct(item.category, locale)}</span>
      <h3 className="mt-4 text-xl font-semibold tracking-normal text-ink">{ct(item.title, locale)}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{ct(item.summary, locale)}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={ct(tag, locale)} className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
            #{ct(tag, locale)}
          </span>
        ))}
      </div>
    </article>
  );
}

function CareerPathTimeline({stages, locale}: {stages: CareerPathStage[]; locale: Locale}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:block" />
      <div className="space-y-5">
        {stages.map((stage) => (
          <article key={ct(stage.title, locale)} className="relative rounded-lg border border-line bg-white p-5 md:ml-12">
            <span className="absolute -left-12 top-6 hidden h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-xs font-semibold text-accent md:flex">
              {ct(stage.period, locale).slice(0, 2)}
            </span>
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-accent">{ct(stage.period, locale)}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-normal text-ink">{ct(stage.title, locale)}</h3>
              </div>
              <span className="w-fit rounded-md bg-soft px-3 py-1 text-sm font-medium text-muted">
                {ct(stage.period, locale)}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{ct(stage.summary, locale)}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ListBlock title={locale === 'zh' ? '阶段重点' : 'Stage Focus'} items={stage.focus} locale={locale} />
              <ListBlock title={locale === 'zh' ? '阶段产出' : 'Stage Outputs'} items={stage.outputs} locale={locale} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CapabilityGrid({capabilities, locale}: {capabilities: CareerCapability[]; locale: Locale}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {capabilities.map((capability) => (
        <article key={capability.key} className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
          <h3 className="text-xl font-semibold tracking-normal text-ink">{ct(capability.title, locale)}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{ct(capability.summary, locale)}</p>
          <ListBlock title={locale === 'zh' ? '训练方式' : 'Practice'} items={capability.practices} locale={locale} compact />
          <div className="mt-5 flex flex-wrap gap-2">
            {capability.tags.map((tag) => (
              <span key={ct(tag, locale)} className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
                #{ct(tag, locale)}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function DecisionCard({decision, locale}: {decision: CareerDecision; locale: Locale}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <h3 className="text-xl font-semibold tracking-normal text-ink">{ct(decision.title, locale)}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{ct(decision.context, locale)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ListBlock title={locale === 'zh' ? '判断问题' : 'Judgment Questions'} items={decision.questions} locale={locale} />
        <div className="rounded-md bg-soft p-4">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-accent" />
            <h4 className="text-sm font-semibold text-ink">{locale === 'zh' ? '建议' : 'Recommendation'}</h4>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{ct(decision.recommendation, locale)}</p>
        </div>
      </div>
    </article>
  );
}

function CareerOperatingModel({locale}: {locale: Locale}) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <div className="grid gap-3 md:grid-cols-3">
        {careerContent.operatingModel.map((step, index) => (
          <article key={step.key} className="min-h-40 rounded-md bg-soft p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-sm font-semibold text-accent">
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold tracking-normal text-ink">{ct(step.title, locale)}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{ct(step.summary, locale)}</p>
          </article>
        ))}
      </div>
      <div className="mt-5 rounded-md border border-line p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-soft text-accent">
            <GitBranch className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-normal text-ink">
              {locale === 'zh' ? '职业成长路线图' : 'Career Growth Roadmap'}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {locale === 'zh'
                ? '每一轮职业成长，都应该让下一轮的感知更准确、认知更清晰、决策更稳、执行更强。'
                : 'Each career cycle should make the next cycle sharper in perception, clearer in cognition, steadier in decision, and stronger in execution.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard({item, locale}: {item: CareerCaseStudy; locale: Locale}) {
  return (
    <article className="h-full rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <span className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">{ct(item.type, locale)}</span>
      <h3 className="mt-4 text-lg font-semibold tracking-normal text-ink">{ct(item.title, locale)}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{ct(item.summary, locale)}</p>
      <ListBlock title={locale === 'zh' ? '样本' : 'Samples'} items={item.examples} locale={locale} compact />
      <ListBlock title={locale === 'zh' ? '分析维度' : 'Analysis Lens'} items={item.lens} locale={locale} compact />
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={ct(tag, locale)} className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
            #{ct(tag, locale)}
          </span>
        ))}
      </div>
    </article>
  );
}

function ReviewTimeline({items, locale}: {items: CareerReviewItem[]; locale: Locale}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:block" />
      <div className="space-y-5">
        {items.map((item) => (
          <article key={ct(item.title, locale)} className="relative rounded-lg border border-line bg-white p-5 md:ml-12">
            <span className="absolute -left-12 top-6 hidden h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-xs font-semibold text-accent md:flex">
              {ct(item.moment, locale).slice(0, 2)}
            </span>
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-accent">{ct(item.moment, locale)}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-normal text-ink">{ct(item.title, locale)}</h3>
              </div>
              <span className="w-fit rounded-md bg-soft px-3 py-1 text-sm font-medium text-muted">
                {ct(item.moment, locale)}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{ct(item.summary, locale)}</p>
            <ListBlock title={locale === 'zh' ? '复盘问题' : 'Review Questions'} items={item.checkpoints} locale={locale} />
          </article>
        ))}
      </div>
    </div>
  );
}

function ListBlock({
  title,
  items,
  locale,
  compact = false
}: {
  title: string;
  items: {zh: string; en: string}[];
  locale: Locale;
  compact?: boolean;
}) {
  return (
    <div className={`${compact ? 'mt-5' : ''} rounded-md bg-soft p-4`}>
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={ct(item, locale)} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{ct(item, locale)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
