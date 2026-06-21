import type {ArticleMeta} from '@/lib/content';

type ExploreFacet = {
  name: string;
  count: number;
};

function byCountThenName(a: ExploreFacet, b: ExploreFacet) {
  if (b.count !== a.count) {
    return b.count - a.count;
  }

  return a.name.localeCompare(b.name);
}

export function getArticleExploreFacets(articles: ArticleMeta[]) {
  const categoryCounts = new Map<string, number>();
  const tagCounts = new Map<string, number>();

  articles.forEach((article) => {
    categoryCounts.set(article.category, (categoryCounts.get(article.category) ?? 0) + 1);
    article.tags.forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1));
  });

  return {
    categories: [...categoryCounts.entries()]
      .map(([name, count]) => ({name, count}))
      .sort(byCountThenName)
      .slice(0, 8),
    tags: [...tagCounts.entries()]
      .map(([name, count]) => ({name, count}))
      .sort(byCountThenName)
      .slice(0, 12)
  };
}
