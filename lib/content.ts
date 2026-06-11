import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import {Locale, locales} from '@/lib/i18n';
import {
  architectureCapabilities,
  architectureFoundation,
  architectureMiddle,
  architectureTop,
  t as bookText
} from '@/lib/bookArchitecture';
import {educationContent, educationTaxonomy, et as educationText} from '@/lib/education';
import {companies, people, stockModules, text as topicText} from '@/lib/topics';
import {slugify} from '@/lib/utils';

export {locales};

const rootDirectory = process.cwd();
const articlesDirectory = path.join(rootDirectory, 'content', 'articles');

export const categories = [
  'Life OS',
  'World Models',
  'Methods and Judgment',
  'Learning and Growth',
  'Education',
  'People and Leadership',
  'Company Research',
  'Investing',
  'AI and Technology',
  'Civilization'
] as const;

export type Category = (typeof categories)[number];

export type ArticleFrontMatter = {
  title: string;
  title_en?: string;
  date: string;
  summary: string;
  summary_en?: string;
  category: Category;
  tags: string[];
  keywords?: string[];
  language: Locale;
  draft?: boolean;
};

export type Article = ArticleFrontMatter & {
  slug: string;
  locale: Locale;
  content: string;
};

export type ArticleMeta = Omit<Article, 'content'>;

export type TaxonomyRelatedItem = {
  title: string;
  summary: string;
  href: string;
  type: string;
};

export type TaxonomyEntry = {
  name: string;
  count: number;
  articleCount: number;
  relatedItems: TaxonomyRelatedItem[];
};

export function slugFromFilename(filename: string) {
  return filename.replace(/\.mdx?$/, '');
}

function readArticleFile(locale: Locale, filename: string): Article {
  const slug = slugFromFilename(filename);
  const fullPath = path.join(articlesDirectory, locale, filename);
  const source = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(source);

  return {
    ...(data as ArticleFrontMatter),
    slug,
    locale,
    content
  };
}

export function getArticles(locale?: Locale, includeDrafts = false): ArticleMeta[] {
  const targetLocales = locale ? [locale] : locales;
  const articles = targetLocales.flatMap((targetLocale) => {
    const directory = path.join(articlesDirectory, targetLocale);
    if (!fs.existsSync(directory)) {
      return [];
    }

    return fs
      .readdirSync(directory)
      .filter((filename) => /\.mdx?$/.test(filename))
      .map((filename) => readArticleFile(targetLocale, filename))
      .filter((article) => includeDrafts || !article.draft);
  });

  return articles
    .map(({content, ...article}) => article)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllArticles(includeDrafts = false): ArticleMeta[] {
  return getArticles(undefined, includeDrafts);
}

export function getArticle(locale: Locale, slug: string): Article | null {
  const directory = path.join(articlesDirectory, locale);
  const candidates = [`${slug}.md`, `${slug}.mdx`];
  const filename = candidates.find((candidate) => fs.existsSync(path.join(directory, candidate)));

  if (!filename) {
    return null;
  }

  const article = readArticleFile(locale, filename);
  if (article.draft) {
    return null;
  }

  return article;
}

export function getRelatedArticles(article: ArticleMeta, limit = 3): ArticleMeta[] {
  return getArticles(article.locale)
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => article.tags.includes(tag)).length;
      const sameCategory = candidate.category === article.category ? 2 : 0;
      const score = sameCategory + sharedTags;

      return {article: candidate, score};
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
    })
    .slice(0, limit)
    .map(({article: relatedArticle}) => relatedArticle);
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString().replace(/<img /g, '<img loading="lazy" decoding="async" ');
}

export function getTaxonomy(locale: Locale, key: 'category' | 'tags') {
  const articles = getArticles(locale);
  const entries = new Map<string, TaxonomyEntry>();

  function ensureEntry(name: string) {
    const existing = entries.get(name);
    if (existing) {
      return existing;
    }

    const entry = {name, count: 0, articleCount: 0, relatedItems: []};
    entries.set(name, entry);
    return entry;
  }

  articles.forEach((article) => {
    const values = key === 'category' ? [article.category] : article.tags;
    values.forEach((value) => {
      const entry = ensureEntry(value);
      entry.count += 1;
      entry.articleCount += 1;
    });
  });

  getSiteTaxonomyItems(locale).forEach((item) => {
    const values = key === 'category' ? item.categories : item.tags;
    values.forEach((value) => {
      const entry = ensureEntry(value);
      entry.count += 1;
      entry.relatedItems.push({
        title: item.title,
        summary: item.summary,
        href: item.href,
        type: item.type
      });
    });
  });

  return Array.from(entries.values())
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function findCategoryBySlug(slug: string) {
  return categories.find((category) => slugify(category) === slug) ?? null;
}

export function findTagBySlug(locale: Locale, slug: string) {
  const tag = getTaxonomy(locale, 'tags').find((item) => slugify(item.name) === slug);
  return tag?.name ?? null;
}

function getSiteTaxonomyItems(locale: Locale) {
  const personTaxonomy: Record<string, {categories: Category[]; tags: string[]}> = {
    'jensen-huang': {
      categories: ['People and Leadership', 'Company Research', 'AI and Technology'],
      tags: ['Great People', 'Leadership', 'Platform Strategy', 'Developer Ecosystem', 'Public Narrative', 'AI']
    },
    'elon-musk': {
      categories: ['People and Leadership', 'Company Research', 'AI and Technology'],
      tags: ['Great People', 'Product Strategy', 'Long-Term Strategy', 'Technology Trend', 'Company Culture']
    },
    'steve-jobs': {
      categories: ['People and Leadership', 'Company Research'],
      tags: ['Great People', 'Product Strategy', 'Public Narrative', 'Company Culture']
    },
    'tim-cook': {
      categories: ['People and Leadership', 'Company Research'],
      tags: ['Leadership', 'Company Culture', 'Business Model', 'Long-Term Strategy']
    },
    'sam-altman': {
      categories: ['People and Leadership', 'AI and Technology', 'Company Research'],
      tags: ['AI', 'Platform Strategy', 'Public Narrative', 'Leadership', 'Technology Trend']
    },
    'dario-amodei': {
      categories: ['People and Leadership', 'AI and Technology', 'Company Research'],
      tags: ['AI', 'Leadership', 'Company Culture', 'Technology Trend']
    },
    'morris-chang': {
      categories: ['People and Leadership', 'Company Research'],
      tags: ['Great People', 'Business Model', 'Competitive Moat', 'Long-Term Strategy']
    },
    'cc-wei': {
      categories: ['People and Leadership', 'Company Research'],
      tags: ['Leadership', 'Competitive Moat', 'Business Model', 'Long-Term Strategy']
    },
    'warren-buffett': {
      categories: ['People and Leadership', 'Investing'],
      tags: ['Great People', 'Investment Framework', 'Capital Allocation', 'Competitive Moat', 'Long-Term Strategy']
    },
    'charlie-munger': {
      categories: ['People and Leadership', 'Investing', 'World Models'],
      tags: ['Great People', 'Mental Models', 'Investment Framework', 'Capital Allocation', 'World Models']
    },
    'duan-yongping': {
      categories: ['People and Leadership', 'Investing'],
      tags: ['Investment Framework', 'Business Model', 'Company Culture', 'Long-Term Strategy']
    }
  };

  const companyTaxonomy: Record<string, {categories: Category[]; tags: string[]}> = {
    nvidia: {
      categories: ['Company Research', 'AI and Technology', 'Investing'],
      tags: ['Great Companies', 'AI', 'Platform Strategy', 'Developer Ecosystem', 'Competitive Moat', 'Business Model']
    },
    tesla: {
      categories: ['Company Research', 'AI and Technology', 'Investing'],
      tags: ['Great Companies', 'Product Strategy', 'Technology Trend', 'Business Model', 'Competitive Moat', 'Company Culture']
    },
    openai: {
      categories: ['Company Research', 'AI and Technology'],
      tags: ['AI', 'Platform Strategy', 'Developer Ecosystem', 'Business Model', 'Technology Trend']
    },
    spacex: {
      categories: ['Company Research', 'AI and Technology'],
      tags: ['Great Companies', 'Technology Trend', 'Business Model', 'Competitive Moat', 'Long-Term Strategy']
    },
    apple: {
      categories: ['Company Research', 'Investing', 'AI and Technology'],
      tags: ['Great Companies', 'Product Strategy', 'Business Model', 'Competitive Moat', 'Company Culture']
    },
    anthropic: {
      categories: ['Company Research', 'AI and Technology'],
      tags: ['AI', 'Business Model', 'Company Culture', 'Technology Trend', 'Competitive Moat']
    },
    tsmc: {
      categories: ['Company Research', 'AI and Technology', 'Investing'],
      tags: ['Great Companies', 'Competitive Moat', 'Business Model', 'Technology Trend', 'Long-Term Strategy']
    },
    google: {
      categories: ['Company Research', 'AI and Technology', 'Investing'],
      tags: ['Great Companies', 'AI', 'Platform Strategy', 'Business Model', 'Competitive Moat']
    },
    'berkshire-hathaway': {
      categories: ['Company Research', 'Investing'],
      tags: ['Great Companies', 'Investment Framework', 'Capital Allocation', 'Business Model', 'Competitive Moat']
    }
  };

  const bookTaxonomy: Record<string, {categories: Category[]; tags: string[]}> = {
    'life-operating-system': {
      categories: ['Life OS', 'Civilization'],
      tags: ['Life OS', 'Operating System', 'Civilization', 'Long-Term Strategy']
    },
    'cognitive-mindset': {
      categories: ['Methods and Judgment', 'World Models'],
      tags: ['Cognitive Models', 'Mental Models', 'First-Principles Thinking', 'Decision Making']
    },
    'world-models': {
      categories: ['World Models'],
      tags: ['World Models', 'Knowledge Foundation', 'Mental Models', 'Civilization']
    },
    'breakthrough-methods': {
      categories: ['Methods and Judgment'],
      tags: ['Problem Decomposition', 'Decision Making', 'Analysis', 'First-Principles Thinking']
    },
    'productivity-tools': {
      categories: ['AI and Technology', 'Learning and Growth'],
      tags: ['AI Tools', 'Operating System', 'Systems Thinking', 'Product Strategy']
    },
    'problem-decomposition': {
      categories: ['Methods and Judgment'],
      tags: ['Problem Decomposition', 'Public Narrative', 'Decision Making', 'Analysis']
    },
    'knowledge-foundation': {
      categories: ['Learning and Growth', 'World Models'],
      tags: ['Knowledge Foundation', 'World Models', 'Lifelong Learning', 'Civilization']
    },
    'cognition-system': {
      categories: ['Learning and Growth', 'World Models'],
      tags: ['Cognitive Models', 'Knowledge Foundation', 'Lifelong Learning']
    },
    'method-system': {
      categories: ['Methods and Judgment'],
      tags: ['Problem Decomposition', 'Systems Thinking', 'Decision Making']
    },
    'practice-system': {
      categories: ['Learning and Growth', 'Life OS'],
      tags: ['Lifelong Learning', 'Operating System', 'Compound Interest']
    }
  };

  const stockItems = stockModules.map((module) => ({
    title: topicText(module.title, locale),
    summary: topicText(module.summary, locale),
    href: `/${locale}/stocks/`,
    type: locale === 'zh' ? '股票模块' : 'Stock module',
    categories: ['Investing' as Category],
    tags: ['Investment Framework', 'Business Model', 'Capital Allocation', 'Decision Making']
  }));

  const personItems = people.map((person) => {
    const taxonomy = personTaxonomy[person.slug] ?? {
      categories: ['People and Leadership' as Category],
      tags: ['Great People', 'Leadership', 'Long-Term Strategy']
    };
    return {
      title: topicText(person.name, locale),
      summary: topicText(person.summary, locale),
      href: `/${locale}/people/${person.slug}/`,
      type: locale === 'zh' ? '人物专题' : 'Person study',
      ...taxonomy
    };
  });

  const companyItems = companies.map((company) => {
    const taxonomy = companyTaxonomy[company.slug] ?? {
      categories: ['Company Research' as Category],
      tags: ['Great Companies', 'Business Model', 'Competitive Moat']
    };
    return {
      title: topicText(company.name, locale),
      summary: topicText(company.summary, locale),
      href: `/${locale}/companies/${company.slug}/`,
      type: locale === 'zh' ? '公司专题' : 'Company study',
      ...taxonomy
    };
  });

  const bookItems = [architectureTop, ...architectureMiddle, architectureFoundation, ...architectureCapabilities].map((node) => {
    const taxonomy = bookTaxonomy[node.slug] ?? {
      categories: ['Life OS' as Category],
      tags: ['Life OS', 'Knowledge Foundation']
    };
    return {
      title: bookText(node.label, locale),
      summary: bookText(node.summary, locale),
      href: `/${locale}/books/recommendations/${node.slug}/`,
      type: locale === 'zh' ? '书籍架构' : 'Book architecture',
      ...taxonomy
    };
  });

  const educationModuleItems = educationTaxonomy.map((item) => ({
    title: educationText(item.title, locale),
    summary: educationText(item.summary, locale),
    href: `/${locale}/education/${item.href}`,
    type: locale === 'zh' ? '教育模块' : 'Education module',
    categories: [...item.categories] as Category[],
    tags: [...item.tags]
  }));

  const educationCardItems = [
    ...educationContent.philosophy.map((item) => ({
      item,
      href: `/${locale}/education/#philosophy`,
      type: locale === 'zh' ? '教育哲学' : 'Education philosophy'
    })),
    ...educationContent.practice.map((item) => ({
      item,
      href: `/${locale}/education/#practice`,
      type: locale === 'zh' ? '教育实践' : 'Education practice'
    })),
    ...educationContent.caseStudies.map((item) => ({
      item,
      href: `/${locale}/education/#case-studies`,
      type: locale === 'zh' ? '教育案例' : 'Education case'
    }))
  ].map(({item, href, type}) => ({
    title: educationText(item.title, locale),
    summary: educationText(item.summary, locale),
    href,
    type,
    categories: ['Education' as Category, 'Learning and Growth' as Category],
    tags: item.tags.map((tag) => educationText(tag, 'en'))
  }));

  return [...personItems, ...companyItems, ...bookItems, ...stockItems, ...educationModuleItems, ...educationCardItems];
}

export const books = [
  {
    id: 1,
    title: '人生操作系统总引之认知心法：模型、方法与工具的关系',
    titleEn: 'Life OS Introduction: The Relationship Between Models, Methods, and Tools',
    theme: 'Life OS',
    description:
      '建立人生操作系统的总入口，解释模型、方法、工具三者如何构成可执行的认知体系。',
    descriptionEn:
      'The entry point to Life OS, explaining how models, methods, and tools form an executable cognitive system.'
  },
  {
    id: 2,
    title: '人生操作系统之世界模型：理解现实的结构、规律与常识',
    titleEn: 'Life OS: World Models',
    theme: 'World Models',
    description: '梳理理解现实世界所需的基础结构、规律、常识与跨学科框架。',
    descriptionEn:
      'A foundation for understanding reality through structures, laws, common sense, and interdisciplinary frameworks.'
  },
  {
    id: 3,
    title: '人生操作系统之破局方法：分析、判断与行动的实践体系',
    titleEn: 'Life OS: Breakthrough Methods',
    theme: 'Action',
    description: '面向复杂问题的分析、判断、决策与行动训练。',
    descriptionEn:
      'A practical system for analysis, judgment, decision-making, and action in complex situations.'
  },
  {
    id: 4,
    title: '人生操作系统之效率兵器：工具、流程与 AI 辅助实践',
    titleEn: 'Life OS: Productivity Arsenal',
    theme: 'AI Tools',
    description: '结合工具、流程与 AI，构建个人效率与知识生产系统。',
    descriptionEn:
      'A practical guide to personal productivity and knowledge production with tools, workflows, and AI.'
  },
  {
    id: 5,
    title: '人生操作系统之高手怎么拆问题：公共表达、冲突案例与现实判断训练',
    titleEn: 'Life OS: How Experts Decompose Problems',
    theme: 'Judgment',
    description: '通过表达、冲突案例与现实判断训练，提升问题拆解能力。',
    descriptionEn:
      'Training problem decomposition through public expression, conflict cases, and real-world judgment.'
  },
  {
    id: 6,
    title: '人生操作系统：以价值、责任与文明为中心的成长框架',
    titleEn: 'Life OS: A Growth Framework Centered on Values, Responsibility, and Civilization',
    theme: 'Civilization',
    description: '从价值、责任与文明角度重新组织个人成长框架。',
    descriptionEn:
      'A growth framework reorganized around values, responsibility, and civilization.'
  },
  {
    id: 7,
    title: '知识底座：构建现代人的学科结构、跨学科理解与科学素养',
    titleEn: 'Knowledge Foundation',
    theme: 'Education',
    description: '构建现代人所需的学科结构、跨学科理解与科学素养。',
    descriptionEn:
      'A foundation for modern disciplinary structure, interdisciplinary understanding, and scientific literacy.'
  }
];
