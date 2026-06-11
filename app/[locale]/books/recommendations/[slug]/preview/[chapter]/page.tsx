import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft} from 'lucide-react';
import {ArticleInteractions} from '@/components/ArticleInteractions';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {PageShell} from '@/components/PageShell';
import {StaticPracticeBlock} from '@/components/StaticPracticeBlock';
import {getBookArchitectureNode, t as archText} from '@/lib/bookArchitecture';
import {bookPreviewConfigs, getBookPreviewChapter, getBookPreviewConfig} from '@/lib/bookPreview';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';

function isHeading(paragraph: string, index: number) {
  return (
    index === 0 ||
    paragraph.startsWith('序言｜') ||
    paragraph.startsWith('第一部｜') ||
    paragraph.startsWith('第二部分｜') ||
    paragraph.startsWith('第一章｜') ||
    paragraph.startsWith('第二章｜') ||
    paragraph.startsWith('第三章｜') ||
    paragraph.startsWith('第四章｜') ||
    paragraph.startsWith('第五章｜') ||
    paragraph.startsWith('第六章｜') ||
    paragraph.startsWith('第七章｜') ||
    paragraph.startsWith('第八章｜') ||
    paragraph.startsWith('第九章｜') ||
    paragraph.startsWith('第十章｜') ||
    paragraph.startsWith('第十一章｜')
  );
}

export function generateStaticParams() {
  return bookPreviewConfigs.flatMap((config) =>
    config.chapters.flatMap((chapter) => [
      {locale: 'en', slug: config.slug, chapter: chapter.slug},
      {locale: 'zh', slug: config.slug, chapter: chapter.slug}
    ])
  );
}

export async function generateMetadata({
  params
}: {
  params: {locale: string; slug: string; chapter: string};
}): Promise<Metadata> {
  const chapter = getBookPreviewChapter(params.slug, params.chapter);

  if (!chapter) {
    return {};
  }

  return {
    title: chapter.title,
    description: chapter.summary
  };
}

export default async function BookPreviewChapterPage({
  params
}: {
  params: {locale: string; slug: string; chapter: string};
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  const node = getBookArchitectureNode(params.slug);
  const previewConfig = getBookPreviewConfig(params.slug);
  const chapter = getBookPreviewChapter(params.slug, params.chapter);
  const bookTitle = previewConfig ? (locale === 'zh' ? previewConfig.zhTitle : previewConfig.enTitle) : '';

  if (!node || !previewConfig || !chapter) {
    notFound();
  }

  const chapterIndex = previewConfig.chapters.findIndex((item) => item.slug === chapter.slug);
  const previousChapter = chapterIndex > 0 ? previewConfig.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex >= 0 && chapterIndex < previewConfig.chapters.length - 1 ? previewConfig.chapters[chapterIndex + 1] : null;

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-16">
        <Breadcrumbs
          items={[
            {label: t.nav.home, href: `/${locale}/`},
            {label: t.nav.books, href: `/${locale}/books/`},
            {
              label: archText(node.label, locale),
              href: `/${locale}/books/recommendations/${previewConfig.slug}/`
            },
            {label: chapter.title}
          ]}
        />

        <section className="mt-8">
          <Link
            href={`/${locale}/books/recommendations/${previewConfig.slug}/`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {locale === 'zh' ? `返回${bookTitle.replace(/[《》]/g, '')}` : `Back to ${bookTitle}`}
          </Link>

          <p className="mt-8 text-sm font-medium text-accent">{chapter.section}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-ink md:text-5xl">{chapter.title}</h1>
          <p className="mt-5 text-base leading-8 text-muted">{chapter.summary}</p>
        </section>

        <article className="mt-10 rounded-lg border border-line bg-white px-5 py-6 md:px-8 md:py-8">
          <div className="space-y-5 text-base leading-8 text-ink">
            {chapter.paragraphs.map((paragraph, index) =>
              isHeading(paragraph, index) ? (
                <h2 key={`${paragraph}-${index}`} className="pt-3 text-xl font-semibold tracking-normal text-ink first:pt-0">
                  {paragraph}
                </h2>
              ) : (
                <p key={`${paragraph}-${index}`} className="text-justify">
                  {paragraph}
                </p>
              )
            )}
          </div>
        </article>

        <StaticPracticeBlock locale={locale} />

        <nav className="mt-8 grid gap-3 sm:grid-cols-3" aria-label={locale === 'zh' ? '章节导航' : 'Chapter navigation'}>
          {previousChapter ? (
            <Link
              href={`/${locale}/books/recommendations/${previewConfig.slug}/preview/${previousChapter.slug}/`}
              className="rounded-lg border border-line bg-white p-4 text-sm transition hover:border-accent hover:text-accent"
            >
              <span className="block text-xs font-medium text-muted">{locale === 'zh' ? '上一章' : 'Previous'}</span>
              <span className="mt-2 block font-semibold text-ink">{previousChapter.title}</span>
            </Link>
          ) : (
            <span className="rounded-lg border border-line bg-soft p-4 text-sm text-muted">{locale === 'zh' ? '已经是第一章' : 'First chapter'}</span>
          )}
          <Link
            href={`/${locale}/books/recommendations/${previewConfig.slug}/`}
            className="rounded-lg border border-line bg-ink p-4 text-center text-sm font-semibold text-white transition hover:bg-accent"
          >
            {locale === 'zh' ? '返回书稿目录' : 'Back to Book Contents'}
          </Link>
          {nextChapter ? (
            <Link
              href={`/${locale}/books/recommendations/${previewConfig.slug}/preview/${nextChapter.slug}/`}
              className="rounded-lg border border-line bg-white p-4 text-sm transition hover:border-accent hover:text-accent sm:text-right"
            >
              <span className="block text-xs font-medium text-muted">{locale === 'zh' ? '下一章' : 'Next'}</span>
              <span className="mt-2 block font-semibold text-ink">{nextChapter.title}</span>
            </Link>
          ) : (
            <span className="rounded-lg border border-line bg-soft p-4 text-sm text-muted sm:text-right">{locale === 'zh' ? '已经是最后一章' : 'Last chapter'}</span>
          )}
        </nav>

        <section className="mt-8 rounded-lg border border-line bg-soft p-5">
          <p className="text-sm leading-7 text-muted">
            {locale === 'zh'
              ? '当前页面仅开放指定试读范围。其余部分和章节需要付费阅读，支持作者后可回到书籍页面添加微信继续交流。'
              : 'This page only opens the selected preview range. Other parts and chapters require paid access.'}
          </p>
        </section>

        <ArticleInteractions locale={locale} />
      </main>
    </PageShell>
  );
}
