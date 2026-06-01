import {ArticleCard} from '@/components/ArticleCard';
import {PaginationNav} from '@/components/PaginationNav';
import {ArticleMeta} from '@/lib/content';
import {Locale, getDictionary} from '@/lib/i18n';
import {getArticlePageHref, paginate} from '@/lib/pagination';

export function ArticleListView({articles, locale, page = 1}: {articles: ArticleMeta[]; locale: Locale; page?: number}) {
  const t = getDictionary(locale);
  const pageData = paginate(articles, page);

  return (
    <>
      {pageData.items.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {pageData.items.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-lg border border-line bg-white p-8 text-center text-muted">{t.articles.empty}</p>
      )}

      <PaginationNav
        currentPage={pageData.currentPage}
        pageCount={pageData.pageCount}
        getHref={(targetPage) => getArticlePageHref(locale, targetPage)}
        locale={locale}
      />
    </>
  );
}
