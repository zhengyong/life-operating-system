import fs from 'node:fs';
import path from 'node:path';
import {getAllArticles} from '../lib/content';

const summaryDirectory = path.join(process.cwd(), 'public', 'article-summaries');
const manifestPath = path.join(summaryDirectory, 'manifest.json');
const manifest: Record<string, {src: string; width: number; height: number}> = {};
const supportedExtensions = ['png', 'svg'] as const;

function getPngDimensions(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  const pngSignature = '89504e470d0a1a0a';

  if (buffer.subarray(0, 8).toString('hex') !== pngSignature) {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function getSvgDimensions(filePath: string) {
  const source = fs.readFileSync(filePath, 'utf8');
  const widthMatch = source.match(/\bwidth="(\d+(?:\.\d+)?)"/);
  const heightMatch = source.match(/\bheight="(\d+(?:\.\d+)?)"/);

  if (widthMatch && heightMatch) {
    return {
      width: Math.round(Number(widthMatch[1])),
      height: Math.round(Number(heightMatch[1]))
    };
  }

  const viewBoxMatch = source.match(/\bviewBox="[\d.-]+\s+[\d.-]+\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)"/);
  if (!viewBoxMatch) {
    return null;
  }

  return {
    width: Math.round(Number(viewBoxMatch[1])),
    height: Math.round(Number(viewBoxMatch[2]))
  };
}

function getImageDimensions(filePath: string, extension: (typeof supportedExtensions)[number]) {
  const dimensions = extension === 'png' ? getPngDimensions(filePath) : getSvgDimensions(filePath);

  return dimensions ?? {
    width: 1600,
    height: 900
  };
}

for (const article of getAllArticles()) {
  const extension = supportedExtensions.find((candidate) =>
    fs.existsSync(path.join(summaryDirectory, article.locale, `${article.slug}.${candidate}`))
  );

  if (!extension) {
    continue;
  }

  const relativePath = path.join(article.locale, `${article.slug}.${extension}`);
  const fullPath = path.join(summaryDirectory, relativePath);
  const dimensions = getImageDimensions(fullPath, extension);

  manifest[`${article.locale}/${article.slug}`] = {
    src: `/article-summaries/${article.locale}/${article.slug}.${extension}`,
    width: dimensions.width,
    height: dimensions.height
  };
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Built article summary image manifest with ${Object.keys(manifest).length} image(s).`);
