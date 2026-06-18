import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import Parser from 'rss-parser';

const rootDir = process.cwd();
const outputPath = path.join(rootDir, 'public', 'news.json');
const retentionDays = Number(process.env.NEWS_RETENTION_DAYS ?? 7);
const maxItemsPerSource = Number(process.env.NEWS_MAX_ITEMS_PER_SOURCE ?? 30);
const requestTimeoutMs = Number(process.env.NEWS_REQUEST_TIMEOUT_MS ?? 15000);

const sources = [
  {
    id: 'hacker-news',
    name: 'Hacker News',
    url: 'https://news.ycombinator.com/rss',
    homepage: 'https://news.ycombinator.com/'
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    homepage: 'https://techcrunch.com/'
  }
];

const watchTopics = [
  {
    id: 'geo-tech',
    labelZh: '地缘冲突与科技绑定',
    labelEn: 'Geopolitics and technology',
    keywords: ['geopolitics', 'export control', 'chip ban', 'semiconductor', 'taiwan', 'china', 'sanction', 'supply chain']
  },
  {
    id: 'macro-finance',
    labelZh: '全球宏观和金融底层信号',
    labelEn: 'Global macro and financial signals',
    keywords: ['fed', 'inflation', 'rates', 'bond', 'treasury', 'dollar', 'market', 'recession', 'macro', 'finance']
  },
  {
    id: 'big-tech-stocks',
    labelZh: '科技巨头股票',
    labelEn: 'Big tech stocks',
    keywords: ['nvidia', 'apple', 'microsoft', 'google', 'alphabet', 'amazon', 'meta', 'tesla', 'stock', 'earnings']
  },
  {
    id: 'ai-education',
    labelZh: 'AI教育',
    labelEn: 'AI education',
    keywords: ['ai education', 'learning', 'school', 'teacher', 'student', 'tutor', 'classroom']
  },
  {
    id: 'global-hotspots',
    labelZh: '全球热点',
    labelEn: 'Global hotspots',
    keywords: ['breaking', 'global', 'war', 'election', 'climate', 'energy', 'security']
  },
  {
    id: 'jensen-huang',
    labelZh: '黄仁勋',
    labelEn: 'Jensen Huang',
    keywords: ['jensen huang', 'huang', 'nvidia']
  },
  {
    id: 'ai-events',
    labelZh: 'AI大事件',
    labelEn: 'Major AI events',
    keywords: ['openai', 'anthropic', 'deepmind', 'chatgpt', 'claude', 'llm', 'agent', 'model', 'artificial intelligence']
  },
  {
    id: 'elon-musk',
    labelZh: '马斯克',
    labelEn: 'Elon Musk',
    keywords: ['elon musk', 'musk', 'tesla', 'spacex', 'xai', 'starlink', 'neuralink']
  }
];

const parser = new Parser({
  timeout: requestTimeoutMs,
  headers: {
    'User-Agent': 'life-os-site-news-bot/1.0 (+https://github.com/)'
  },
  customFields: {
    item: ['comments', 'content:encoded']
  }
});

function getCutoffDate(now = new Date()) {
  return new Date(now.getTime() - retentionDays * 24 * 60 * 60 * 1000);
}

function normalizeText(value) {
  return String(value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseDate(item) {
  const rawDate = item.isoDate ?? item.pubDate ?? item.date;
  const date = rawDate ? new Date(rawDate) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
}

function normalizeUrl(value) {
  try {
    const url = new URL(value);
    url.hash = '';
    return url.toString();
  } catch {
    return String(value ?? '').trim();
  }
}

function findTopics(text) {
  const haystack = text.toLowerCase();
  return watchTopics
    .filter((topic) => topic.keywords.some((keyword) => haystack.includes(keyword.toLowerCase())))
    .map(({id, labelZh, labelEn}) => ({id, labelZh, labelEn}));
}

async function readPreviousNews() {
  try {
    const raw = await fs.readFile(outputPath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
}

async function fetchSource(source, cutoffDate) {
  try {
    const feed = await parser.parseURL(source.url);
    const items = feed.items
      .map((item) => {
        const publishedAt = parseDate(item);
        if (!publishedAt || publishedAt < cutoffDate) {
          return null;
        }

        const title = normalizeText(item.title);
        const summary = normalizeText(item.contentSnippet ?? item.content ?? item['content:encoded'] ?? item.summary);
        const url = normalizeUrl(item.link || item.guid);
        if (!title || !url) {
          return null;
        }

        const textForTopics = `${title} ${summary}`;

        return {
          id: `${source.id}:${url}`,
          title,
          summary,
          url,
          publishedAt: publishedAt.toISOString(),
          source: {
            id: source.id,
            name: source.name,
            homepage: source.homepage
          },
          topics: findTopics(textForTopics)
        };
      })
      .filter(Boolean)
      .slice(0, maxItemsPerSource);

    return {
      ok: true,
      source: source.id,
      count: items.length,
      items
    };
  } catch (error) {
    return {
      ok: false,
      source: source.id,
      count: 0,
      items: [],
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

function uniqueByUrl(items) {
  const seen = new Set();

  return items.filter((item) => {
    const key = normalizeUrl(item.url);
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function keepRecent(items, cutoffDate) {
  return items.filter((item) => {
    const date = new Date(item.publishedAt);
    return !Number.isNaN(date.getTime()) && date >= cutoffDate;
  });
}

async function main() {
  const now = new Date();
  const cutoffDate = getCutoffDate(now);
  const results = await Promise.all(sources.map((source) => fetchSource(source, cutoffDate)));
  const freshItems = results.flatMap((result) => result.items);
  const previousItems = await readPreviousNews();
  const shouldUseFallback = freshItems.length === 0 && previousItems.length > 0;
  const mergedItems = shouldUseFallback ? previousItems : freshItems;
  const items = uniqueByUrl(keepRecent(mergedItems, cutoffDate)).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const payload = {
    generatedAt: now.toISOString(),
    retentionDays,
    sources: sources.map(({id, name, url, homepage}) => ({id, name, url, homepage})),
    watchTopics: watchTopics.map(({id, labelZh, labelEn, keywords}) => ({id, labelZh, labelEn, keywords})),
    status: {
      ok: results.some((result) => result.ok),
      fallbackUsed: shouldUseFallback,
      results: results.map(({ok, source, count, error}) => ({ok, source, count, error}))
    },
    items
  };

  await fs.mkdir(path.dirname(outputPath), {recursive: true});
  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  for (const result of results) {
    const suffix = result.ok ? `${result.count} items` : `failed: ${result.error}`;
    console.log(`${result.source}: ${suffix}`);
  }

  console.log(`Wrote ${items.length} recent news items to ${path.relative(rootDir, outputPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
