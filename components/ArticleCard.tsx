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
    <article className="article-row">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
        <span>{formatDate(article.date, locale)}</span>
        <span aria-hidden="true">/</span>
        <Link href={getCategoryHref(article.category, locale)} className="hover:text-accent">
          {getCategoryLabel(article.category, locale)}
        </Link>
      </div>
      <h2 className="article-row__title">
        <Link href={`/${locale}/articles/${article.slug}/`}>{title}</Link>
      </h2>
      <p className="article-row__summary">{summary}</p>
      <div className="article-row__tags">
        {article.tags.slice(0, 4).map((tag) => (
          <Link
            key={tag}
            href={getTagHref(tag, locale)}
            className="content-tag"
          >
            {getTagLabel(tag, locale)}
          </Link>
        ))}
      </div>
      <Link
        href={`/${locale}/articles/${article.slug}/`}
        className="article-row__action"
      >
        {t.articles.readMore}
      </Link>
    </article>
  );
}
