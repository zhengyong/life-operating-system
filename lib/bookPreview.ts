import cognitiveMindsetPreview from '@/content/books/cognitive-mindset-preview.json';
import cognitiveMindsetPreviewEn from '@/content/books/cognitive-mindset-preview.en.json';
import knowledgeFoundationPreview from '@/content/books/knowledge-foundation-preview.json';
import knowledgeFoundationPreviewEn from '@/content/books/knowledge-foundation-preview.en.json';
import breakthroughMethodsPreview from '@/content/books/breakthrough-methods-preview.json';
import breakthroughMethodsPreviewEn from '@/content/books/breakthrough-methods-preview.en.json';
import lifeOperatingSystemPreview from '@/content/books/life-operating-system-preview.json';
import lifeOperatingSystemPreviewEn from '@/content/books/life-operating-system-preview.en.json';
import productivityToolsPreview from '@/content/books/productivity-tools-preview.json';
import productivityToolsPreviewEn from '@/content/books/productivity-tools-preview.en.json';
import worldModelsPreview from '@/content/books/world-models-preview.json';
import worldModelsPreviewEn from '@/content/books/world-models-preview.en.json';
import type {Locale} from '@/lib/i18n';

export type BookPreviewChapter = {
  slug: string;
  section: string;
  title: string;
  summary: string;
  paragraphs: string[];
};

export type BookPreviewConfig = {
  slug: string;
  zhTitle: string;
  enTitle: string;
  zhScope: string;
  enScope: string;
  chapters: Record<Locale, BookPreviewChapter[]>;
};

export const bookPreviewConfigs: BookPreviewConfig[] = [
  {
    slug: 'life-operating-system',
    zhTitle: '《人生操作系统》',
    enTitle: 'Life Operating System',
    zhScope: '序言 + 第一部分 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: {
      zh: lifeOperatingSystemPreview as BookPreviewChapter[],
      en: lifeOperatingSystemPreviewEn as BookPreviewChapter[]
    }
  },
  {
    slug: 'cognitive-mindset',
    zhTitle: '《认知心法》',
    enTitle: 'Cognitive Mindset',
    zhScope: '序言 + 第一部 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: {
      zh: cognitiveMindsetPreview as BookPreviewChapter[],
      en: cognitiveMindsetPreviewEn as BookPreviewChapter[]
    }
  },
  {
    slug: 'knowledge-foundation',
    zhTitle: '《知识底座》',
    enTitle: 'Knowledge Foundation',
    zhScope: '序言 + 第一部分 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: {
      zh: knowledgeFoundationPreview as BookPreviewChapter[],
      en: knowledgeFoundationPreviewEn as BookPreviewChapter[]
    }
  },
  {
    slug: 'world-models',
    zhTitle: '《世界模型》',
    enTitle: 'World Models',
    zhScope: '序言 + 第一部 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: {
      zh: worldModelsPreview as BookPreviewChapter[],
      en: worldModelsPreviewEn as BookPreviewChapter[]
    }
  },
  {
    slug: 'breakthrough-methods',
    zhTitle: '《破局方法》',
    enTitle: 'Breakthrough Methods',
    zhScope: '序言 + 第一部 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: {
      zh: breakthroughMethodsPreview as BookPreviewChapter[],
      en: breakthroughMethodsPreviewEn as BookPreviewChapter[]
    }
  },
  {
    slug: 'productivity-tools',
    zhTitle: '《效率兵器》',
    enTitle: 'Productivity Tools',
    zhScope: '序言 + 第一部 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: {
      zh: productivityToolsPreview as BookPreviewChapter[],
      en: productivityToolsPreviewEn as BookPreviewChapter[]
    }
  }
];

export function getBookPreviewConfig(slug: string) {
  return bookPreviewConfigs.find((config) => config.slug === slug) ?? null;
}

export function getBookPreviewChapters(bookSlug: string, locale: Locale) {
  return getBookPreviewConfig(bookSlug)?.chapters[locale] ?? [];
}

export function getBookPreviewChapter(bookSlug: string, chapterSlug: string, locale: Locale) {
  return getBookPreviewChapters(bookSlug, locale).find((chapter) => chapter.slug === chapterSlug) ?? null;
}
