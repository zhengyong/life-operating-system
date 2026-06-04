import fs from 'node:fs';
import path from 'node:path';
import {getAllArticles} from '../lib/content';

const summaryDirectory = path.join(process.cwd(), 'public', 'article-summaries');
const manifestPath = path.join(summaryDirectory, 'manifest.json');
const manifest: Record<string, {src: string; width: number; height: number}> = {};

for (const article of getAllArticles()) {
  const relativePath = path.join(article.locale, `${article.slug}.png`);
  const fullPath = path.join(summaryDirectory, relativePath);

  if (fs.existsSync(fullPath)) {
    manifest[`${article.locale}/${article.slug}`] = {
      src: `/article-summaries/${article.locale}/${article.slug}.png`,
      width: 1254,
      height: 1254
    };
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Built article summary image manifest with ${Object.keys(manifest).length} image(s).`);
