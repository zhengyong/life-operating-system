import fs from 'node:fs';
import path from 'node:path';

export type NewsTopic = {
  id: string;
  labelZh: string;
  labelEn: string;
  keywords?: string[];
};

export type NewsSource = {
  id: string;
  name: string;
  url?: string;
  homepage: string;
};

export type NewsItem = {
  id: string;
  title: string;
  summary?: string;
  url: string;
  publishedAt: string;
  source: NewsSource;
  topics: NewsTopic[];
};

export type NewsPayload = {
  generatedAt: string | null;
  retentionDays: number;
  sources: NewsSource[];
  watchTopics: NewsTopic[];
  status?: {
    ok: boolean;
    fallbackUsed: boolean;
    results: {
      ok: boolean;
      source: string;
      count: number;
      error?: string;
    }[];
  };
  items: NewsItem[];
};

const fallbackNews: NewsPayload = {
  generatedAt: null,
  retentionDays: 7,
  sources: [],
  watchTopics: [],
  items: []
};

export function getNewsPayload(): NewsPayload {
  const filePath = path.join(process.cwd(), 'public', 'news.json');

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw) as Partial<NewsPayload>;

    return {
      ...fallbackNews,
      ...parsed,
      sources: Array.isArray(parsed.sources) ? parsed.sources : [],
      watchTopics: Array.isArray(parsed.watchTopics) ? parsed.watchTopics : [],
      items: Array.isArray(parsed.items) ? parsed.items : []
    };
  } catch {
    return fallbackNews;
  }
}
