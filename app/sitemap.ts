import type {MetadataRoute} from 'next';
import {getAllArticles, locales} from '@/lib/content';
import {siteUrl} from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = locales.flatMap((locale) =>
    ['', '/about', '/books', '/articles', '/categories', '/tags', '/contact'].map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date()
    }))
  );

  const articleRoutes = getAllArticles().map((article) => ({
    url: `${siteUrl}/${article.locale}/articles/${article.slug}`,
    lastModified: new Date(article.date)
  }));

  return [{url: siteUrl, lastModified: new Date()}, ...staticRoutes, ...articleRoutes];
}
