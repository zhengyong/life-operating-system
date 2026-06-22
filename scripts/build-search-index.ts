import fs from 'node:fs';
import path from 'node:path';
import {bookArchitectureNodes, t as bookText} from '../lib/bookArchitecture';
import {bookPreviewConfigs, getBookPreviewChapters} from '../lib/bookPreview';
import {careerContent, ct as careerText} from '../lib/career';
import {getAllArticles, getArticle} from '../lib/content';
import {isPublicCompanySlug, isPublicPersonSlug} from '../lib/publicTopics';
import {siteUrl} from '../lib/site';
import {companies, people, text as topicText} from '../lib/topics';
import {Locale, locales} from '../lib/i18n';

const publicDirectory = path.join(process.cwd(), 'public');

type SearchType = 'article' | 'book' | 'book-chapter' | 'person' | 'company' | 'career';

type SearchIndexItem = {
  id: string;
  type: SearchType;
  typeLabel: string;
  title: string;
  summary: string;
  href: string;
  locale: Locale;
  category?: string;
  tags?: string[];
  keywords?: string[];
  date?: string;
  text: string;
};

const typeLabels: Record<Locale, Record<SearchType, string>> = {
  zh: {
    article: '文章',
    book: '书籍',
    'book-chapter': '书籍章节',
    person: '人物',
    company: '公司',
    career: '职场'
  },
  en: {
    article: 'Article',
    book: 'Book',
    'book-chapter': 'Book chapter',
    person: 'Person',
    company: 'Company',
    career: 'Career'
  }
};

function compactText(parts: Array<string | undefined | null | false>) {
  return parts
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function searchableArticleText(markdown: string) {
  return stripMarkdown(markdown).slice(0, 1200);
}

if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory, {recursive: true});
}

const articleIndex: SearchIndexItem[] = getAllArticles().map((article) => {
  const fullArticle = getArticle(article.locale, article.slug);
  const title = article.locale === 'en' && article.title_en ? article.title_en : article.title;
  const summary = article.locale === 'en' && article.summary_en ? article.summary_en : article.summary;

  return {
    id: `${article.locale}:article:${article.slug}`,
    type: 'article',
    typeLabel: typeLabels[article.locale].article,
    title,
    summary,
    href: `/${article.locale}/articles/${article.slug}/`,
    locale: article.locale,
    category: article.category,
    tags: article.tags,
    keywords: article.keywords ?? [],
    date: article.date,
    text: compactText([title, summary, article.category, ...article.tags, ...(article.keywords ?? []), searchableArticleText(fullArticle?.content ?? '')])
  };
});

const bookIndex: SearchIndexItem[] = locales.flatMap((locale) =>
  bookArchitectureNodes.map((node) => {
    const recommendations = node.recommendations.flatMap((recommendation) => [
      bookText(recommendation.title, locale),
      bookText(recommendation.author, locale),
      bookText(recommendation.note, locale)
    ]);
    const title = bookText(node.label, locale);
    const summary = bookText(node.summary, locale);

    return {
      id: `${locale}:book:${node.slug}`,
      type: 'book',
      typeLabel: typeLabels[locale].book,
      title,
      summary,
      href: `/${locale}/books/recommendations/${node.slug}/`,
      locale,
      text: compactText([title, summary, ...recommendations])
    };
  })
);

const bookChapterIndex: SearchIndexItem[] = locales.flatMap((locale) =>
  bookPreviewConfigs.flatMap((book) =>
    getBookPreviewChapters(book.slug, locale).map((chapter) => {
      const title = chapter.title;
      const summary = chapter.summary;
      return {
        id: `${locale}:book-chapter:${book.slug}:${chapter.slug}`,
        type: 'book-chapter',
        typeLabel: typeLabels[locale]['book-chapter'],
        title,
        summary,
        href: `/${locale}/books/recommendations/${book.slug}/preview/${chapter.slug}/`,
        locale,
        text: compactText([
          locale === 'zh' ? book.zhTitle : book.enTitle,
          title,
          chapter.section,
          summary,
          ...chapter.paragraphs
        ])
      };
    })
  )
);

const personIndex: SearchIndexItem[] = locales.flatMap((locale) =>
  people.filter((person) => isPublicPersonSlug(person.slug)).map((person) => {
    const title = topicText(person.name, locale);
    const summary = topicText(person.summary, locale);
    const relatedCompanies = person.relatedCompanies.join(' ');
    const advice = person.advice?.flatMap((item) => [
      topicText(item.title, locale),
      topicText(item.summary, locale),
      ...item.points.map((point) => topicText(point, locale))
    ]) ?? [];
    return {
      id: `${locale}:person:${person.slug}`,
      type: 'person',
      typeLabel: typeLabels[locale].person,
      title,
      summary,
      href: `/${locale}/people/${person.slug}/`,
      locale,
      text: compactText([
        title,
        topicText(person.role, locale),
        summary,
        relatedCompanies,
        ...person.learnFrom.map((item) => topicText(item, locale)),
        ...advice
      ])
    };
  })
);

const companyIndex: SearchIndexItem[] = locales.flatMap((locale) =>
  companies.filter((company) => isPublicCompanySlug(company.slug)).map((company) => {
    const title = topicText(company.name, locale);
    const summary = topicText(company.summary, locale);
    const productSegments = company.productSegments?.flatMap((segment) => [
      topicText(segment.title, locale),
      segment.revenueLabel ? topicText(segment.revenueLabel, locale) : null,
      topicText(segment.summary, locale),
      ...segment.products.map((product) => topicText(product, locale))
    ]) ?? [];
    const cultureModel = company.cultureModel?.dimensions.flatMap((dimension) => [
      topicText(dimension.title, locale),
      topicText(dimension.summary, locale),
      topicText(dimension.whyDifferent, locale),
      ...dimension.practices.map((practice) => topicText(practice, locale))
    ]) ?? [];

    return {
      id: `${locale}:company:${company.slug}`,
      type: 'company',
      typeLabel: typeLabels[locale].company,
      title,
      summary,
      href: `/${locale}/companies/${company.slug}/`,
      locale,
      text: compactText([
        title,
        topicText(company.category, locale),
        summary,
        ...company.officialLinks.map((link) => topicText(link.label, locale)),
        ...company.timeline.map((item) => compactText([item.year, topicText(item.event, locale)])),
        ...company.products.map((product) => topicText(product, locale)),
        ...productSegments,
        ...company.businessModel.map((item) => topicText(item, locale)),
        ...company.culture.map((item) => topicText(item, locale)),
        company.cultureModel ? topicText(company.cultureModel.thesis, locale) : null,
        ...cultureModel,
        ...company.moat.map((item) => topicText(item, locale)),
        ...company.watchlist.map((item) => topicText(item, locale)),
        ...company.futureQuestions.map((item) => topicText(item, locale))
      ])
    };
  })
);

const careerIndex: SearchIndexItem[] = locales.flatMap((locale) => {
  const cards = [
    ...careerContent.philosophy.map((item) => ({
      title: careerText(item.title, locale),
      summary: careerText(item.summary, locale),
      href: `/${locale}/career/#career-philosophy`,
      textParts: [careerText(item.category, locale), ...item.tags.map((tag) => careerText(tag, locale))]
    })),
    ...careerContent.talentPaths.map((item) => ({
      title: careerText(item.title, locale),
      summary: careerText(item.summary, locale),
      href: `/${locale}/career/#career-path`,
      textParts: [careerText(item.category, locale), ...item.tags.map((tag) => careerText(tag, locale))]
    })),
    ...careerContent.growth.map((item) => ({
      title: careerText(item.title, locale),
      summary: careerText(item.summary, locale),
      href: `/${locale}/career/#career-growth`,
      textParts: [...item.practices.map((practice) => careerText(practice, locale)), ...item.tags.map((tag) => careerText(tag, locale))]
    })),
    ...careerContent.entrepreneurship.map((item) => ({
      title: careerText(item.title, locale),
      summary: careerText(item.summary, locale),
      href: `/${locale}/career/#entrepreneurship`,
      textParts: [careerText(item.category, locale), ...item.tags.map((tag) => careerText(tag, locale))]
    }))
  ];

  return cards.map((item, index) => ({
    id: `${locale}:career:${index}`,
    type: 'career' as SearchType,
    typeLabel: typeLabels[locale].career,
    title: item.title,
    summary: item.summary,
    href: item.href,
    locale,
    text: compactText([item.title, item.summary, ...item.textParts])
  }));
});

const index: SearchIndexItem[] = [
  ...articleIndex,
  ...bookIndex,
  ...bookChapterIndex,
  ...personIndex,
  ...companyIndex,
  ...careerIndex
];

fs.writeFileSync(path.join(publicDirectory, 'search-index.json'), JSON.stringify(index, null, 2));

const rssItems = getAllArticles()
  .map((article) => {
    const title = article.locale === 'en' && article.title_en ? article.title_en : article.title;
    const summary = article.locale === 'en' && article.summary_en ? article.summary_en : article.summary;
    const url = `${siteUrl}/${article.locale}/articles/${article.slug}/`;

    return `<item>
  <title><![CDATA[${title}]]></title>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${new Date(article.date).toUTCString()}</pubDate>
  <description><![CDATA[${summary}]]></description>
</item>`;
  })
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Yong Zheng's Life Operating System</title>
  <link>${siteUrl}</link>
  <description>A bilingual personal knowledge website for Life OS.</description>
  ${rssItems}
</channel>
</rss>`;

fs.writeFileSync(path.join(publicDirectory, 'rss.xml'), rss);
console.log(`Built search index with ${index.length} items.`);
