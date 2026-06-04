import fs from 'node:fs';
import path from 'node:path';
import {getAllArticles} from '../lib/content';
import {getCategoryLabel, getTagLabel} from '../lib/taxonomy';

const outputDirectory = path.join(process.cwd(), 'public', 'article-summaries', 'prompts');

fs.rmSync(outputDirectory, {recursive: true, force: true});
fs.mkdirSync(outputDirectory, {recursive: true});

for (const article of getAllArticles()) {
  const locale = article.locale;
  const title = locale === 'en' && article.title_en ? article.title_en : article.title;
  const summary = locale === 'en' && article.summary_en ? article.summary_en : article.summary;
  const category = getCategoryLabel(article.category, locale);
  const tags = article.tags.map((tag) => getTagLabel(tag, locale)).join(', ');
  const filename = `${locale}-${article.slug}.txt`;
  const prompt = `Use case: infographic-diagram
Asset type: static article summary image for a bilingual personal knowledge website
Primary request: Create a polished editorial summary image for this article. It should help readers understand the core idea before reading.
Article title: "${title}"
Article summary: "${summary}"
Category: "${category}"
Tags: "${tags}"
Style/medium: premium editorial illustration blended with subtle infographic design, not a mind map, not a flowchart, not a screenshot
Composition/framing: 16:9 landscape composition, clear central metaphor, generous spacing, suitable for an article header
Lighting/mood: calm, intelligent, long-term thinking, refined and trustworthy
Color palette: warm white background, deep ink, teal accent, muted gold accent, restrained neutral tones
Text: no text, no labels, no captions, no watermark
Constraints: visually summarize the article concept; avoid literal mind maps, node-link diagrams, busy charts, tiny unreadable text, brand logos, people with identifiable faces
Output target: save as public/article-summaries/${locale}/${article.slug}.png, 1600x900`;

  fs.writeFileSync(path.join(outputDirectory, filename), prompt);
}

console.log(`Built ${getAllArticles().length} article summary image prompt(s).`);
