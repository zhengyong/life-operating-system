import Link from 'next/link';
import {ArticleMeta} from '@/lib/content';
import {Locale, getDictionary} from '@/lib/i18n';
import {getCategoryHref, getCategoryLabel, getTagHref, getTagLabel} from '@/lib/taxonomy';
import {formatDate} from '@/lib/utils';

export function ArticleCard({article, locale}: {article: ArticleMeta; locale: Locale}) {
  const t = getDictionary(locale);
  const title = locale === 'en' && article.title_en ? article.title_en : article.title;
  const summary = locale === 'en' && article.summary_en ? article.summary_en : article.summary;

  return (
    <article className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
        <span>{formatDate(article.date, locale)}</span>
        <span aria-hidden="true">/</span>
        <Link href={getCategoryHref(article.category, locale)} className="hover:text-accent">
          {getCategoryLabel(article.category, locale)}
        </Link>
      </div>
      <h2 className="mt-3 text-xl font-semibold tracking-normal text-ink">
        <Link href={`/${locale}/articles/${article.slug}/`}>{title}</Link>
      </h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.slice(0, 4).map((tag) => (
          <Link
            key={tag}
            href={getTagHref(tag, locale)}
            className="rounded-md bg-soft px-2.5 py-1 text-xs text-muted transition hover:text-accent"
          >
            {getTagLabel(tag, locale)}
          </Link>
        ))}
      </div>
      <Link
        href={`/${locale}/articles/${article.slug}/`}
        className="mt-5 inline-flex text-sm font-medium text-accent hover:text-ink"
      >
        {t.articles.readMore}
      </Link>
    </article>
  );
}
