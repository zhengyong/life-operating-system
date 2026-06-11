import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowRight, BriefcaseBusiness, Building2, Home, Landmark, LineChart, Layers, UserRound} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {investmentContent, it, type InvestmentItem} from '@/lib/investment';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {siteUrl} from '@/lib/site';
import {companies, stockModules, text} from '@/lib/topics';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const title = locale === 'zh' ? 'Investment 投资' : 'Investment';
  const description = it(investmentContent.hero.subtitle, locale);

  return {
    title,
    description,
    keywords:
      locale === 'zh'
        ? ['Investment', '投资', '股票', 'ETF', '房地产', '企业', '自我投资', '资产配置']
        : ['Investment', 'investing', 'stocks', 'ETF', 'real estate', 'business', 'self-investment', 'asset allocation'],
    alternates: {
      canonical: `${siteUrl}/${locale}/investment/`,
      languages: {
        en: `${siteUrl}/en/investment/`,
        zh: `${siteUrl}/zh/investment/`
      }
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/investment/`,
      type: 'website'
    }
  };
}

export default async function InvestmentPage({params}: {params: {locale: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  return (
    <PageShell locale={locale}>
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-14 md:pb-16 md:pt-20">
          <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.investment}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-ink md:text-6xl">
                {it(investmentContent.hero.title, locale)}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{it(investmentContent.hero.subtitle, locale)}</p>
            </div>
            <aside className="rounded-lg border border-line bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">
                  <Landmark className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold tracking-normal text-ink">
                  {locale === 'zh' ? '投资定位' : 'Investment Thesis'}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{it(investmentContent.hero.thesis, locale)}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {investmentContent.assets.map((asset) => (
                  <span key={it(asset.title, locale)} className="rounded-md bg-soft px-3 py-2 text-sm font-medium text-ink">
                    {it(asset.title, locale)}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <SectionBand id="investment-system" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<Layers className="h-5 w-5" />}
              title={it(investmentContent.sections.architecture, locale)}
              body={
                locale === 'zh'
                  ? '投资不是单一资产选择，而是现金流、风险承受力、时间周期、认知能力和家庭责任的组合。'
                  : 'Investing is not a single asset choice. It combines cash flow, risk capacity, time horizon, judgment, and family responsibility.'
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              {investmentContent.assets.map((asset) => (
                <InvestmentCard key={it(asset.title, locale)} asset={asset} locale={locale} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand id="asset-classes">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<LineChart className="h-5 w-5" />}
              title={locale === 'zh' ? '股票研究模块' : 'Stock Research Modules'}
              body={locale === 'zh' ? '股票仍然是投资版块的重要组成部分，但不再等同于整个投资体系。' : 'Stocks remain an important part of investment, but no longer represent the whole investment system.'}
            />
            <div className="grid gap-5 md:grid-cols-2">
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
          </div>
        </SectionBand>

        <SectionBand id="career-link" muted>
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionIntro
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              title={it(investmentContent.sections.career, locale)}
              body={
                locale === 'zh'
                  ? '职业与投资双向关联：职业提升现金流和能力，投资放大长期资产和选择权。'
                  : 'Career and investment reinforce each other: career improves cash flow and capability; investment expands assets and optionality.'
              }
            />
            <div className="rounded-lg border border-line bg-white p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Link href={`/${locale}/career/`} className="rounded-md bg-soft p-5 transition hover:text-accent">
                  <UserRound className="h-5 w-5 text-accent" />
                  <h3 className="mt-4 text-lg font-semibold tracking-normal text-ink">{t.nav.career}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {locale === 'zh' ? '用职业系统创造现金流、能力和信用。' : 'Use the career system to create cash flow, capability, and trust.'}
                  </p>
                </Link>
                <Link href={`/${locale}/companies/`} className="rounded-md bg-soft p-5 transition hover:text-accent">
                  <Building2 className="h-5 w-5 text-accent" />
                  <h3 className="mt-4 text-lg font-semibold tracking-normal text-ink">{t.nav.companies}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {locale === 'zh' ? '通过公司研究理解股票、企业和资本配置。' : 'Use company research to understand stocks, businesses, and capital allocation.'}
                  </p>
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {companies.map((company) => (
                  <Link
                    key={company.slug}
                    href={`/${locale}/companies/${company.slug}/`}
                    className="rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
                  >
                    {text(company.name, locale)}
                  </Link>
                ))}
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

function InvestmentCard({asset, locale}: {asset: InvestmentItem; locale: Locale}) {
  const Icon = asset.title.en === 'Real Estate' ? Home : asset.title.en === 'Self-Investment' ? UserRound : asset.title.en === 'Businesses' ? Building2 : LineChart;

  return (
    <article className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <Icon className="h-5 w-5 text-accent" />
      <h3 className="mt-4 text-xl font-semibold tracking-normal text-ink">{it(asset.title, locale)}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{it(asset.summary, locale)}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {asset.items.map((item) => (
          <span key={it(item, locale)} className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
            {it(item, locale)}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {asset.tags.map((tag) => (
          <span key={it(tag, locale)} className="rounded-md bg-soft px-2.5 py-1 text-xs font-medium text-muted">
            #{it(tag, locale)}
          </span>
        ))}
      </div>
    </article>
  );
}
