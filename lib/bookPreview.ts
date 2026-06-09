import cognitiveMindsetPreview from '@/content/books/cognitive-mindset-preview.json';
import knowledgeFoundationPreview from '@/content/books/knowledge-foundation-preview.json';
import breakthroughMethodsPreview from '@/content/books/breakthrough-methods-preview.json';
import lifeOperatingSystemPreview from '@/content/books/life-operating-system-preview.json';
import productivityToolsPreview from '@/content/books/productivity-tools-preview.json';
import worldModelsPreview from '@/content/books/world-models-preview.json';

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
  chapters: BookPreviewChapter[];
};

export const bookPreviewConfigs: BookPreviewConfig[] = [
  {
    slug: 'life-operating-system',
    zhTitle: '《人生操作系统》',
    enTitle: 'Life Operating System',
    zhScope: '序言 + 第一部分 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: lifeOperatingSystemPreview as BookPreviewChapter[]
  },
  {
    slug: 'cognitive-mindset',
    zhTitle: '《认知心法》',
    enTitle: 'Cognitive Mindset',
    zhScope: '序言 + 第一部 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: cognitiveMindsetPreview as BookPreviewChapter[]
  },
  {
    slug: 'knowledge-foundation',
    zhTitle: '《知识底座》',
    enTitle: 'Knowledge Foundation',
    zhScope: '序言 + 第一部分 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: knowledgeFoundationPreview as BookPreviewChapter[]
  },
  {
    slug: 'world-models',
    zhTitle: '《世界模型》',
    enTitle: 'World Models',
    zhScope: '序言 + 第一部 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: worldModelsPreview as BookPreviewChapter[]
  },
  {
    slug: 'breakthrough-methods',
    zhTitle: '《破局方法》',
    enTitle: 'Breakthrough Methods',
    zhScope: '序言 + 第一部 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: breakthroughMethodsPreview as BookPreviewChapter[]
  },
  {
    slug: 'productivity-tools',
    zhTitle: '《效率兵器》',
    enTitle: 'Productivity Tools',
    zhScope: '序言 + 第一部 + 第二部分',
    enScope: 'Preface + Part One + Part Two',
    chapters: productivityToolsPreview as BookPreviewChapter[]
  }
];

export function getBookPreviewConfig(slug: string) {
  return bookPreviewConfigs.find((config) => config.slug === slug) ?? null;
}

export function getBookPreviewChapter(bookSlug: string, chapterSlug: string) {
  return getBookPreviewConfig(bookSlug)?.chapters.find((chapter) => chapter.slug === chapterSlug) ?? null;
}
