import fs from 'node:fs';
import path from 'node:path';
import {getAllArticles} from '../lib/content';

const publicDirectory = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory, {recursive: true});
}

const index = getAllArticles().map((article) => ({
  title: article.locale === 'en' && article.title_en ? article.title_en : article.title,
  summary: article.locale === 'en' && article.summary_en ? article.summary_en : article.summary,
  category: article.category,
  tags: article.tags,
  keywords: article.keywords ?? [],
  slug: article.slug,
  locale: article.locale,
  date: article.date
}));

fs.writeFileSync(path.join(publicDirectory, 'search-index.json'), JSON.stringify(index, null, 2));

const siteUrl = 'https://example.com';
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
console.log(`Built search index with ${index.length} articles.`);
