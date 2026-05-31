import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import {Locale, locales} from '@/lib/i18n';
import {slugify} from '@/lib/utils';

export {locales};

const rootDirectory = process.cwd();
const articlesDirectory = path.join(rootDirectory, 'content', 'articles');

export const categories = [
  'Life OS',
  'First Principles',
  'Mental Models',
  'Career',
  'Investing',
  'Education',
  'Technology',
  'Society',
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

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getTaxonomy(locale: Locale, key: 'category' | 'tags') {
  const articles = getArticles(locale);
  const counts = new Map<string, number>();

  articles.forEach((article) => {
    const values = key === 'category' ? [article.category] : article.tags;
    values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({name, count}))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function findCategoryBySlug(slug: string) {
  return categories.find((category) => slugify(category) === slug) ?? null;
}

export function findTagBySlug(locale: Locale, slug: string) {
  const tag = getTaxonomy(locale, 'tags').find((item) => slugify(item.name) === slug);
  return tag?.name ?? null;
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
