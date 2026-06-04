import fs from 'node:fs';
import path from 'node:path';
import {getAllArticles} from '../lib/content';
import {getCategoryLabel, getTagLabel} from '../lib/taxonomy';

const tmpDirectory = path.join(process.cwd(), 'tmp', 'imagegen');
const jsonlPath = path.join(tmpDirectory, 'article-summary-images.jsonl');

fs.mkdirSync(tmpDirectory, {recursive: true});

const jobs = getAllArticles().map((article) => {
  const locale = article.locale;
  const title = locale === 'en' && article.title_en ? article.title_en : article.title;
  const summary = locale === 'en' && article.summary_en ? article.summary_en : article.summary;
  const category = getCategoryLabel(article.category, locale);
  const tags = article.tags.map((tag) => getTagLabel(tag, locale)).join(', ');

  return {
    out: path.join(locale, `${article.slug}.png`).replace(/\\/g, '/'),
    size: '2048x1152',
    quality: 'medium',
    use_case: 'infographic-diagram',
    style: 'premium editorial illustration with subtle infographic composition',
    composition: '16:9 landscape article header image, clear central metaphor, generous spacing',
    constraints: 'no text, no labels, no captions, no watermark, no mind map, no node-link diagram, no busy chart, no brand logos, no identifiable faces',
    prompt: `Create a polished article summary image for a bilingual personal knowledge website.
It should help readers understand the article before reading.
Article title: "${title}"
Article summary: "${summary}"
Category: "${category}"
Tags: "${tags}"
Visual direction: calm long-term thinking, refined and trustworthy, warm white background, deep ink, teal accent, muted gold accent. Use a single strong visual metaphor rather than a literal diagram.`
  };
});

fs.writeFileSync(jsonlPath, jobs.map((job) => JSON.stringify(job)).join('\n'));
console.log(`Built ${jobs.length} image generation job(s): ${jsonlPath}`);
