import type {MetadataRoute} from 'next';
import {getAllArticles, locales} from '@/lib/content';

const baseUrl = 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = locales.flatMap((locale) =>
    ['', '/about', '/books', '/articles', '/categories', '/tags'].map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date()
    }))
  );

  const articleRoutes = getAllArticles().map((article) => ({
    url: `${baseUrl}/${article.locale}/articles/${article.slug}`,
    lastModified: new Date(article.date)
  }));

  return [{url: baseUrl, lastModified: new Date()}, ...staticRoutes, ...articleRoutes];
}
