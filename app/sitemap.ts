import type {MetadataRoute} from 'next';
import {bookArchitectureNodes} from '@/lib/bookArchitecture';
import {getAllArticles, getTaxonomy, locales} from '@/lib/content';
import {pageUrl} from '@/lib/site';
import {companies, people, personLessons} from '@/lib/topics';
import {slugify} from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = locales.flatMap((locale) =>
    ['', '/about', '/books', '/life', '/career', '/education', '/news', '/articles', '/people', '/companies', '/investment', '/stocks', '/categories', '/tags', '/contact'].map((path) => ({
      url: pageUrl(`${locale}${path}`),
      lastModified: new Date()
    }))
  );

  const articleRoutes = getAllArticles().map((article) => ({
    url: pageUrl(`${article.locale}/articles/${article.slug}`),
    lastModified: new Date(article.date)
  }));

  const taxonomyRoutes = locales.flatMap((locale) => [
    ...getTaxonomy(locale, 'category').map((category) => ({
      url: pageUrl(`${locale}/categories/${slugify(category.name)}`),
      lastModified: new Date()
    })),
    ...getTaxonomy(locale, 'tags').map((tag) => ({
      url: pageUrl(`${locale}/tags/${slugify(tag.name)}`),
      lastModified: new Date()
    }))
  ]);

  const peopleRoutes = locales.flatMap((locale) =>
    people.map((person) => ({
      url: pageUrl(`${locale}/people/${person.slug}`),
      lastModified: new Date()
    }))
  );

  const companyRoutes = locales.flatMap((locale) =>
    companies.flatMap((company) => [
      {
        url: pageUrl(`${locale}/companies/${company.slug}`),
        lastModified: new Date()
      },
      {
        url: pageUrl(`${locale}/companies/${company.slug}/timeline`),
        lastModified: new Date()
      }
    ])
  );

  const personLessonRoutes = locales.flatMap((locale) =>
    personLessons.map((lesson) => ({
      url: pageUrl(`${locale}/people/${lesson.personSlug}/lessons/${lesson.slug}`),
      lastModified: new Date()
    }))
  );

  const bookRecommendationRoutes = locales.flatMap((locale) =>
    bookArchitectureNodes.map((node) => ({
      url: pageUrl(`${locale}/books/recommendations/${node.slug}`),
      lastModified: new Date()
    }))
  );

  return [
    {url: pageUrl(), lastModified: new Date()},
    ...staticRoutes,
    ...articleRoutes,
    ...taxonomyRoutes,
    ...peopleRoutes,
    ...companyRoutes,
    ...personLessonRoutes,
    ...bookRecommendationRoutes
  ];
}
