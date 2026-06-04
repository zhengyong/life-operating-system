import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft, BookOpen} from 'lucide-react';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {PageShell} from '@/components/PageShell';
import {bookArchitectureNodes, getBookArchitectureNode, t as archText} from '@/lib/bookArchitecture';
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
    title: `${archText(node.label, locale)} Recommended Books`,
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

  const title = locale === 'zh' ? `${archText(node.label, locale)}：推荐书籍` : `${archText(node.label, locale)}: Recommended Books`;

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
      </main>
    </PageShell>
  );
}
