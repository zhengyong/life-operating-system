import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft, ArrowUpRight, BookOpen} from 'lucide-react';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {PageShell} from '@/components/PageShell';
import {bookArchitectureNodes, getBookArchitectureNode, t as archText} from '@/lib/bookArchitecture';
import {getBookPreviewChapters, getBookPreviewConfig} from '@/lib/bookPreview';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';

export function generateStaticParams() {
  return bookArchitectureNodes.flatMap((node) => [
    {locale: 'en', slug: node.slug},
    {locale: 'zh', slug: node.slug}
  ]);
}

export async function generateMetadata({params}: {params: {locale: string; slug: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const node = getBookArchitectureNode(params.slug);

  if (!node) {
    return {};
  }

  return {
    title: locale === 'zh' ? `${archText(node.label, locale)}：推荐书籍` : `${archText(node.label, locale)}: Recommended Books`,
    description: archText(node.summary, locale)
  };
}

export default async function BookRecommendationsPage({params}: {params: {locale: string; slug: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  const node = getBookArchitectureNode(params.slug);

  if (!node) {
    notFound();
  }

  const previewConfig = getBookPreviewConfig(node.slug);
  const previewChapters = previewConfig ? getBookPreviewChapters(node.slug, locale) : [];
  const previewTitle = previewConfig ? (locale === 'zh' ? previewConfig.zhTitle : previewConfig.enTitle) : '';
  const title = locale === 'zh' ? `${archText(node.label, locale)}：推荐书籍` : `${archText(node.label, locale)}: Recommended Books`;
  const previewIntro =
    locale === 'zh'
      ? '这里开放序言、第一部分、第二部分的试读内容。其余部分和章节暂不公开展示。'
      : 'The preface, Part One, and Part Two are open for preview. Other parts and chapters are not listed publicly.';

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-5xl px-5 py-10 md:py-16">
        <Breadcrumbs
          items={[
            {label: t.nav.home, href: `/${locale}/`},
            {label: t.nav.books, href: `/${locale}/books/`},
            {label: archText(node.label, locale)}
          ]}
        />

        <section className="mt-8">
          <Link href={`/${locale}/books/`} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink">
            <ArrowLeft className="h-4 w-4" />
            {locale === 'zh' ? '返回书籍架构' : 'Back to book architecture'}
          </Link>
          <h1 className="mt-5 text-3xl font-semibold tracking-normal text-ink md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{archText(node.summary, locale)}</p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {node.recommendations.map((book) => (
            <article key={archText(book.title, locale)} className="rounded-lg border border-line bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-normal text-ink">{archText(book.title, locale)}</h2>
              <p className="mt-2 text-sm font-medium text-accent">{archText(book.author, locale)}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{archText(book.note, locale)}</p>
            </article>
          ))}
        </section>

        {previewConfig ? (
          <>
            <section className="mt-12 rounded-lg border border-line bg-white p-5 md:p-7">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-medium text-accent">{locale === 'zh' ? '我的书稿试读' : 'Book Preview'}</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-normal text-ink">
                    {locale === 'zh' ? `${previewTitle}开放试读章节` : `${previewTitle} Preview Chapters`}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{previewIntro}</p>
                </div>
                <div className="rounded-md bg-soft px-3 py-2 text-xs font-medium text-muted">
                  {locale === 'zh' ? previewConfig.zhScope : previewConfig.enScope}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {previewChapters.map((chapter) => (
                  <Link
                    key={chapter.slug}
                    href={`/${locale}/books/recommendations/${previewConfig.slug}/preview/${chapter.slug}/`}
                    className="group rounded-lg border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-accent">{chapter.section}</p>
                        <h3 className="mt-2 text-base font-semibold leading-6 tracking-normal text-ink">{chapter.title}</h3>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-muted transition group-hover:text-accent" />
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">{chapter.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </main>
    </PageShell>
  );
}
