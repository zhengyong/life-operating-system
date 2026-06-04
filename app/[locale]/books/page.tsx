import type {Metadata} from 'next';
import Link from 'next/link';
import {BookOpen, ArrowRight} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {
  architectureCapabilities,
  architectureFoundation,
  architectureMiddle,
  architectureTop,
  t as archText
} from '@/lib/bookArchitecture';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Books'
};

const knowledgeLayers = [
  {
    label: {zh: '基础学科', en: 'Foundations'},
    items: {
      zh: ['数学', '物理', '生物', '逻辑', '统计'],
      en: ['Math', 'Physics', 'Biology', 'Logic', 'Statistics']
    }
  },
  {
    label: {zh: '通识', en: 'General'},
    items: {
      zh: ['历史', '经济', '法律', '心理', '社会'],
      en: ['History', 'Economics', 'Law', 'Psychology', 'Society']
    }
  },
  {
    label: {zh: '专业 / 专家', en: 'Expertise'},
    items: {
      zh: ['技术', '投资', '教育', '管理', '产业'],
      en: ['Technology', 'Investing', 'Education', 'Management', 'Industry']
    }
  }
];

function NodeCard({
  href,
  label,
  summary,
  size = 'normal'
}: {
  href: string;
  label: string;
  summary?: string;
  size?: 'top' | 'normal' | 'small';
}) {
  const isTop = size === 'top';

  return (
    <article
      className={`flex h-full min-w-0 flex-col justify-between rounded-lg border border-line bg-white shadow-sm ${
        isTop ? 'p-4 md:p-6' : 'p-2 md:p-4'
      }`}
    >
      <div>
        <div className={`flex min-w-0 items-center ${isTop ? 'gap-3' : 'gap-1.5 md:gap-3'}`}>
          <div className={`${isTop ? 'h-10 w-10' : 'hidden h-8 w-8 md:flex'} shrink-0 items-center justify-center rounded-md bg-soft text-accent`}>
            <BookOpen className={`${isTop ? 'h-5 w-5' : 'h-4 w-4'}`} />
          </div>
          <h2
            className={`font-semibold tracking-normal ${
              isTop ? 'truncate text-2xl text-accent md:text-3xl' : 'text-[10px] leading-4 text-ink md:truncate md:text-base md:leading-6'
            }`}
          >
            {label}
          </h2>
        </div>
        {summary ? (
          <p className={`${isTop ? 'mt-3 text-lg md:mt-4 md:text-2xl' : 'mt-1 text-[9px] md:mt-3 md:text-sm'} font-semibold leading-4 text-ink md:truncate md:leading-7`}>
            {summary}
          </p>
        ) : null}
      </div>
      <Link
        href={href}
        aria-label="推荐书籍"
        className={`${isTop ? 'mt-3 md:mt-4' : 'mt-2 md:mt-4'} inline-flex h-7 w-7 items-center justify-center rounded-md bg-soft text-accent transition hover:bg-white hover:text-ink md:h-8 md:w-8`}
      >
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </article>
  );
}

function KnowledgeFoundation({locale}: {locale: Locale}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_92px] gap-2 md:grid-cols-[minmax(0,1fr)_190px] md:gap-3">
      <article className="rounded-lg border border-line bg-white p-2.5 shadow-sm md:p-4">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 md:gap-3">
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-md bg-soft text-accent md:flex">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="truncate text-sm font-semibold tracking-normal text-ink md:text-base">
              {archText(architectureFoundation.label, locale)}
            </h2>
          </div>
          <Link
            href={`/${locale}/books/recommendations/${architectureFoundation.slug}/`}
            aria-label="推荐书籍"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-soft text-accent transition hover:bg-white hover:text-ink md:h-8 md:w-8"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5 md:mt-4 md:gap-2">
          {knowledgeLayers.map((layer) => (
            <section key={archText(layer.label, locale)} className="rounded-md bg-soft p-2 md:p-3">
              <h3 className="truncate text-[11px] font-semibold text-ink md:text-sm">{archText(layer.label, locale)}</h3>
              <p className="mt-1 truncate text-[10px] leading-4 text-muted md:mt-2 md:text-xs md:leading-5">
                {layer.items[locale].join(' / ')}
              </p>
            </section>
          ))}
        </div>
      </article>

      <aside className="grid gap-1.5 rounded-lg border border-line bg-white p-2 shadow-sm md:gap-2 md:p-3">
        {architectureCapabilities.map((node) => (
          <Link
            key={node.slug}
            href={`/${locale}/books/recommendations/${node.slug}/`}
            className="flex items-center justify-between gap-1.5 rounded-md bg-soft px-2 py-2 text-xs font-semibold text-ink transition hover:bg-white hover:text-accent md:gap-2 md:px-3 md:py-3 md:text-sm"
          >
            <span className="min-w-0">
              <span className="block truncate">{archText(node.label, locale)}</span>
            </span>
            <ArrowRight className="h-3 w-3 shrink-0 text-accent md:h-3.5 md:w-3.5" />
          </Link>
        ))}
      </aside>
    </div>
  );
}

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export default async function BooksPage({params}: {params: {locale: string}}) {
  const {locale: rawLocale} = params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = getDictionary(locale);

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-7xl px-3 py-4 md:px-5 md:py-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.books}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal text-ink md:mt-2 md:text-4xl">{t.books.title}</h1>
        </div>

        <section className="mt-3 rounded-lg border border-line bg-soft/60 p-2.5 md:mt-6 md:p-5">
          <div className="mx-auto max-w-5xl">
            <NodeCard
              href={`/${locale}/books/recommendations/${architectureTop.slug}/`}
              label={archText(architectureTop.label, locale)}
              summary={archText(architectureTop.summary, locale)}
              size="top"
            />
          </div>

          <div className="mx-auto mt-2 max-w-5xl md:mt-4">
            <div className="grid grid-cols-5 gap-1.5 md:gap-3">
              {architectureMiddle.map((node) => (
                <NodeCard
                  key={node.slug}
                  href={`/${locale}/books/recommendations/${node.slug}/`}
                  label={archText(node.label, locale)}
                  summary={archText(node.summary, locale)}
                />
              ))}
            </div>
          </div>

          <div className="mx-auto mt-2 max-w-5xl md:mt-4">
            <KnowledgeFoundation locale={locale} />
          </div>
        </section>
      </main>
    </PageShell>
  );
}
