export const ARTICLES_PER_PAGE = 12;

export function getPageCount(totalItems: number, perPage = ARTICLES_PER_PAGE) {
  return Math.max(1, Math.ceil(totalItems / perPage));
}

export function paginate<T>(items: T[], page: number, perPage = ARTICLES_PER_PAGE) {
  const pageCount = getPageCount(items.length, perPage);
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const start = (currentPage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    currentPage,
    pageCount
  };
}

export function getArticlePageHref(locale: string, page: number) {
  return page <= 1 ? `/${locale}/articles/` : `/${locale}/articles/page/${page}/`;
}
