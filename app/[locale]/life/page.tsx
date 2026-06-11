import type {Metadata} from 'next';
import {
  Activity,
  Brain,
  BriefcaseBusiness,
  CircleDollarSign,
  Compass,
  GitBranch,
  HeartHandshake,
  Home,
  Layers,
  Network,
  RefreshCcw,
  Scale,
  Sparkles
} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {
  lifeContent,
  lt,
  type LifeCaseStudy,
  type LifeDecision,
  type LifeModule,
  type LifeReviewItem,
  type TaggedLifeItem
} from '@/lib/life';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {siteUrl} from '@/lib/site';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const title = locale === 'zh' ? 'Life 人生' : 'Life';
  const description = lt(lifeContent.hero.subtitle, locale);

  return {
    title,
    description,
    keywords:
      locale === 'zh'
        ? ['Life', '人生', '幸福', '成长', '婚姻', '家庭', '财富', '终身学习', '人生操作系统']
        : ['Life', 'happiness', 'growth', 'marriage', 'family', 'wealth', 'lifelong learning', 'Life OS'],
    alternates: {
      canonical: `${siteUrl}/${locale}/life/`,
      languages: {
        en: `${siteUrl}/en/life/`,
        zh: `${siteUrl}/zh/life/`
      }
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/life/`,
      type: 'website'
    }
  };
}

export default async function LifePage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);
  const sectionNav = [
    {id: 'philosophy', label: lifeContent.sections.philosophy},
    {id: 'self-awareness', label: lifeContent.sections.awareness},
    {id: 'relationships', label: lifeContent.sections.relationships},
    {id: 'marriage-family', label: lifeContent.sections.family},
    {id: 'wealth-happiness', label: lifeContent.sections.wealth},
    {id: 'health-growth', label: lifeContent.sections.health},
    {id: 'major-decisions', label: lifeContent.sections.decisions},
    {id: 'life-case-studies', label: lifeContent.sections.cases},
    {id: 'life-review', label: lifeContent.sections.review}
  ];

  return (
    <PageShell locale={locale}>
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-14 md:pb-16 md:pt-20">
          <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.life}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-ink md:text-6xl">
                {lt(lifeContent.hero.title, locale)}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{lt(lifeContent.hero.subtitle, locale)}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {lifeContent.hero.categories.map((category) => (
                  <span
                    key={lt(category, locale)}
                    className="rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-muted"
                  >
                    {lt(category, locale)}
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
                  {locale === 'zh' ? '人生定位' : 'Life Thesis'}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{lt(lifeContent.hero.thesis, locale)}</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {lifeContent.hero.tags.map((tag) => (
                  <span key={lt(tag, locale)} className="rounded-md bg-soft px-3 py-2 text-sm font-medium text-ink">
                    #{lt(tag, locale)}
                  </span>
                ))}
              </div>
            </aside>
          </div>

          <nav className="mt-10 flex gap-2 overflow-x-auto border-y border-line py-3" aria-label={locale === 'zh' ? '人生页面导航' : 'Life page navigation'}>
            {sectionNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-soft hover:text-accent"
              >
                {lt(item.label, locale)}
              </a>
            ))}
          </nav>
        </section>

        <SectionBand id="life-system" muted>
          <div className="mx-auto max-w-6xl px-5 py-14">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <SectionIntro
                icon={<Layers className="h-5 w-5" />}
                title={locale === 'zh' ? '人生操作系统模型图' : 'Life Operating System Model'}
                body={
                  locale === 'zh'
                    ? '人生不是追求单一目标，而是在物质财富、精神财富、家庭关系和个人成长之间持续动态平衡。'
                    : 'Life is not the pursuit of one single target. It is the continuous balancing of material wealth, spiritual wealth, family relationships, and personal growth.'
                }
              />
              <LifeSystemModel locale={locale} />
            </div>
          </div>
        </SectionBand>

        <SectionBand id="philosophy">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Sparkles className="h-5 w-5" />}
              title={lt(lifeContent.sections.philosophy, locale)}
              body={lt(lifeContent.sectionIntros.philosophy, locale)}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {lifeContent.philosophy.map((item) => (
                <KnowledgeCard key={lt(item.title, locale)} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="self-awareness" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Brain className="h-5 w-5" />}
              title={lt(lifeContent.sections.awareness, locale)}
              body={lt(lifeContent.sectionIntros.awareness, locale)}
            />
            <div>
              <div className="grid gap-4 md:grid-cols-2">
                {lifeContent.awareness.map((item) => (
                  <KnowledgeCard key={lt(item.title, locale)} item={item} locale={locale} />
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-line bg-white p-5">
                <p className="text-sm font-semibold text-ink">
                  {locale === 'zh' ? '持续迭代原则' : 'Iteration Principle'}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {locale === 'zh'
                    ? '人生定位并非固定不变。每一次能力升级、家庭阶段变化、行业迁移和重大选择，都会要求重新校准定位。'
                    : 'Life positioning is not fixed. Each capability upgrade, family-stage change, industry shift, and major choice calls for recalibration.'}
                </p>
              </div>
            </div>
          </div>
        </SectionBand>

        <SectionBand id="relationships">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Network className="h-5 w-5" />}
              title={lt(lifeContent.sections.relationships, locale)}
              body={lt(lifeContent.sectionIntros.relationships, locale)}
            />
            <RelationshipGraph modules={lifeContent.relationships} locale={locale} />
          </div>
        </SectionBand>

        <SectionBand id="marriage-family" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Home className="h-5 w-5" />}
              title={lt(lifeContent.sections.family, locale)}
              body={lt(lifeContent.sectionIntros.family, locale)}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {lifeContent.family.map((item) => (
                <KnowledgeCard key={lt(item.title, locale)} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="wealth-happiness">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<CircleDollarSign className="h-5 w-5" />}
              title={lt(lifeContent.sections.wealth, locale)}
              body={lt(lifeContent.sectionIntros.wealth, locale)}
            />
            <div>
              <div className="grid gap-4 md:grid-cols-2">
                {lifeContent.wealth.map((item) => (
                  <KnowledgeCard key={lt(item.title, locale)} item={item} locale={locale} />
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-line bg-white p-5">
                <p className="text-sm font-semibold text-ink">
                  {locale === 'zh' ? '关联视角：投资' : 'Related Lens: Investing'}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {locale === 'zh'
                    ? '投资版块研究公司、资产和风险；人生版块只讨论财富如何服务自由、家庭、责任和幸福。'
                    : 'The investing area studies companies, assets, and risk. The life area focuses on how wealth serves freedom, family, responsibility, and happiness.'}
                </p>
              </div>
            </div>
          </div>
        </SectionBand>

        <SectionBand id="health-growth" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Activity className="h-5 w-5" />}
              title={lt(lifeContent.sections.health, locale)}
              body={lt(lifeContent.sectionIntros.health, locale)}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {lifeContent.health.map((item) => (
                <KnowledgeCard key={lt(item.title, locale)} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="major-decisions">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Scale className="h-5 w-5" />}
              title={lt(lifeContent.sections.decisions, locale)}
              body={lt(lifeContent.sectionIntros.decisions, locale)}
            />
            <div className="grid gap-4">
              {lifeContent.decisions.map((decision) => (
                <DecisionCard key={lt(decision.title, locale)} decision={decision} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="life-case-studies" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              title={lt(lifeContent.sections.cases, locale)}
              body={lt(lifeContent.sectionIntros.cases, locale)}
            />
            <div className="grid gap-5 md:grid-cols-3">
              {lifeContent.caseStudies.map((item) => (
                <CaseStudyCard key={lt(item.type, locale)} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="life-review">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<RefreshCcw className="h-5 w-5" />}
              title={lt(lifeContent.sections.review, locale)}
              body={lt(lifeContent.sectionIntros.review, locale)}
            />
            <ReviewTimeline items={lifeContent.reviewTimeline} locale={locale} />
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

function LifeSystemModel({locale}: {locale: Locale}) {
  return (
    <div className="grid gap-5">
      <div className="rounded-lg border border-line bg-white p-5">
        <div className="grid gap-3 md:grid-cols-3">
          {lifeContent.operatingModel.map((step, index) => (
            <article key={step.key} className="min-h-40 rounded-md bg-soft p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-sm font-semibold text-accent">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-normal text-ink">{lt(step.title, locale)}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{lt(step.summary, locale)}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-line bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">
            <GitBranch className="h-5 w-5" />
          </span>
          <h3 className="text-xl font-semibold tracking-normal text-ink">
            {locale === 'zh' ? '动态平衡模型' : 'Dynamic Balance Model'}
          </h3>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {lifeContent.balanceModel.map((item) => (
            <article key={lt(item.title, locale)} className="rounded-md border border-line p-4">
              <h4 className="text-base font-semibold tracking-normal text-ink">{lt(item.title, locale)}</h4>
              <p className="mt-2 text-sm leading-6 text-muted">{lt(item.summary, locale)}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function KnowledgeCard({item, locale}: {item: TaggedLifeItem; locale: Locale}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">{lt(item.category, locale)}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-normal text-ink">{lt(item.title, locale)}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{lt(item.summary, locale)}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={lt(tag, locale)} className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
            #{lt(tag, locale)}
          </span>
        ))}
      </div>
    </article>
  );
}

function RelationshipGraph({modules, locale}: {modules: LifeModule[]; locale: Locale}) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div className="rounded-md bg-soft p-5">
          <div className="flex h-28 items-center justify-center rounded-md border border-line bg-white text-center">
            <div>
              <p className="text-sm font-semibold text-accent">{locale === 'zh' ? '核心' : 'Core'}</p>
              <p className="mt-2 text-xl font-semibold tracking-normal text-ink">
                {locale === 'zh' ? '长期信任关系' : 'Long-Term Trust'}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            {locale === 'zh'
              ? '亲情、友情、社交和社区关系都围绕信任、边界、价值交换和共同成长展开。'
              : 'Family affection, friendship, social ties, and community revolve around trust, boundaries, value exchange, and shared growth.'}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map((module) => (
            <article key={module.key} className="rounded-md bg-soft p-4">
              <h3 className="text-base font-semibold tracking-normal text-ink">{lt(module.title, locale)}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{lt(module.summary, locale)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {module.items.map((item) => (
                  <span key={lt(item, locale)} className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-muted">
                    {lt(item, locale)}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function DecisionCard({decision, locale}: {decision: LifeDecision; locale: Locale}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-normal text-ink">{lt(decision.title, locale)}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{lt(decision.context, locale)}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          {decision.tags.map((tag) => (
            <span key={lt(tag, locale)} className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
              #{lt(tag, locale)}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ListBlock title={locale === 'zh' ? '分析问题' : 'Analysis Questions'} items={decision.questions} locale={locale} />
        <ListBlock title={locale === 'zh' ? '案例形式' : 'Case Forms'} items={decision.cases} locale={locale} />
      </div>
    </article>
  );
}

function CaseStudyCard({item, locale}: {item: LifeCaseStudy; locale: Locale}) {
  return (
    <article className="h-full rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <span className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">{lt(item.type, locale)}</span>
      <h3 className="mt-4 text-lg font-semibold tracking-normal text-ink">{lt(item.title, locale)}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{lt(item.summary, locale)}</p>
      <ListBlock title={locale === 'zh' ? '样本' : 'Samples'} items={item.examples} locale={locale} compact />
      <ListBlock title={locale === 'zh' ? '观察维度' : 'Study Lens'} items={item.lens} locale={locale} compact />
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={lt(tag, locale)} className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
            #{lt(tag, locale)}
          </span>
        ))}
      </div>
    </article>
  );
}

function ReviewTimeline({items, locale}: {items: LifeReviewItem[]; locale: Locale}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:block" />
      <div className="space-y-5">
        {items.map((item, index) => (
          <article key={lt(item.period, locale)} className="relative rounded-lg border border-line bg-white p-5 md:ml-12">
            <span className="absolute -left-12 top-6 hidden h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-sm font-semibold text-accent md:flex">
              {index + 1}
            </span>
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-accent">{lt(item.period, locale)}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-normal text-ink">{lt(item.title, locale)}</h3>
              </div>
              <span className="w-fit rounded-md bg-soft px-3 py-1 text-sm font-medium text-muted">
                {lt(item.period, locale)}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{lt(item.summary, locale)}</p>
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
          <li key={lt(item, locale)} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{lt(item, locale)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
