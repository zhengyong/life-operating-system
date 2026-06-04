import type {MetadataRoute} from 'next';
import {bookArchitectureNodes} from '@/lib/bookArchitecture';
import {getAllArticles, locales} from '@/lib/content';
import {siteUrl} from '@/lib/site';
import {companies, people, personLessons} from '@/lib/topics';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = locales.flatMap((locale) =>
    ['', '/about', '/books', '/articles', '/people', '/companies', '/stocks', '/categories', '/tags', '/contact'].map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date()
    }))
  );

  const articleRoutes = getAllArticles().map((article) => ({
    url: `${siteUrl}/${article.locale}/articles/${article.slug}`,
    lastModified: new Date(article.date)
  }));

  const peopleRoutes = locales.flatMap((locale) =>
    people.map((person) => ({
      url: `${siteUrl}/${locale}/people/${person.slug}`,
      lastModified: new Date()
    }))
  );

  const companyRoutes = locales.flatMap((locale) =>
    companies.flatMap((company) => [
      {
        url: `${siteUrl}/${locale}/companies/${company.slug}`,
        lastModified: new Date()
      },
      {
        url: `${siteUrl}/${locale}/companies/${company.slug}/timeline`,
        lastModified: new Date()
      }
    ])
  );

  const personLessonRoutes = locales.flatMap((locale) =>
    personLessons.map((lesson) => ({
      url: `${siteUrl}/${locale}/people/${lesson.personSlug}/lessons/${lesson.slug}`,
      lastModified: new Date()
    }))
  );

  const bookRecommendationRoutes = locales.flatMap((locale) =>
    bookArchitectureNodes.map((node) => ({
      url: `${siteUrl}/${locale}/books/recommendations/${node.slug}`,
      lastModified: new Date()
    }))
  );

  return [
    {url: siteUrl, lastModified: new Date()},
    ...staticRoutes,
    ...articleRoutes,
    ...peopleRoutes,
    ...companyRoutes,
    ...personLessonRoutes,
    ...bookRecommendationRoutes
  ];
}
