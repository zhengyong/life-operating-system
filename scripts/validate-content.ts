import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {categories, ArticleAuthorOpinion, ArticleFrontMatter} from '../lib/content';
import {locales, Locale} from '../lib/i18n';

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');
const categorySet = new Set<string>(categories);
const errors: string[] = [];

function isNonEmptyString(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isStringArray(value: unknown) {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function validateAuthorOpinion(value: unknown, label: string) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    errors.push(`${label}: authorOpinion must be an object when provided.`);
    return;
  }

  const opinion = value as Partial<ArticleAuthorOpinion>;
  if (!isNonEmptyString(opinion.conclusion)) {
    errors.push(`${label}: authorOpinion.conclusion is required.`);
  }

  if (!isStringArray(opinion.evidence)) {
    errors.push(`${label}: authorOpinion.evidence must be a non-empty string array.`);
  }

  if (opinion.probability !== null && (typeof opinion.probability !== 'number' || !Number.isFinite(opinion.probability) || opinion.probability < 0 || opinion.probability > 1)) {
    errors.push(`${label}: authorOpinion.probability must be null or a number between 0 and 1.`);
  }

  if (opinion.probabilityStatus !== 'unspecified' && opinion.probabilityStatus !== 'estimated') {
    errors.push(`${label}: authorOpinion.probabilityStatus must be unspecified or estimated.`);
  }

  if ((opinion.probabilityStatus === 'unspecified' && opinion.probability !== null) || (opinion.probabilityStatus === 'estimated' && typeof opinion.probability !== 'number')) {
    errors.push(`${label}: authorOpinion.probability must agree with probabilityStatus.`);
  }

  if (!isStringArray(opinion.invalidationConditions)) {
    errors.push(`${label}: authorOpinion.invalidationConditions must be a non-empty string array.`);
  }

  if (opinion.retrospective !== 'pending' && opinion.retrospective !== 'completed') {
    errors.push(`${label}: authorOpinion.retrospective must be pending or completed.`);
  }

  if (!Array.isArray(opinion.related) || opinion.related.length === 0) {
    errors.push(`${label}: authorOpinion.related must be a non-empty array.`);
  } else {
    opinion.related.forEach((item, index) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        errors.push(`${label}: authorOpinion.related[${index}] must be an object.`);
        return;
      }

      const related = item as Partial<ArticleAuthorOpinion['related'][number]>;
      if (!['event', 'person', 'company', 'article'].includes(related.type ?? '')) {
        errors.push(`${label}: authorOpinion.related[${index}].type is invalid.`);
      }
      if (!isNonEmptyString(related.label) || !isNonEmptyString(related.href)) {
        errors.push(`${label}: authorOpinion.related[${index}] requires label and href.`);
      }
    });
  }
}

function readFrontMatter(locale: Locale, filename: string) {
  const fullPath = path.join(articlesDirectory, locale, filename);
  const {data} = matter(fs.readFileSync(fullPath, 'utf8'));
  return data as Partial<ArticleFrontMatter>;
}

function validateArticle(locale: Locale, filename: string) {
  const frontMatter = readFrontMatter(locale, filename);
  const label = `${locale}/${filename}`;

  if (!isNonEmptyString(frontMatter.title)) {
    errors.push(`${label}: title is required.`);
  }

  if (!isNonEmptyString(frontMatter.title_en)) {
    errors.push(`${label}: title_en is required for bilingual publishing.`);
  }

  if (!isNonEmptyString(frontMatter.summary)) {
    errors.push(`${label}: summary is required.`);
  }

  if (!isNonEmptyString(frontMatter.summary_en)) {
    errors.push(`${label}: summary_en is required for bilingual publishing.`);
  }

  if (!isNonEmptyString(frontMatter.date) || Number.isNaN(new Date(frontMatter.date ?? '').getTime())) {
    errors.push(`${label}: date must be a valid date string.`);
  }

  if (!isNonEmptyString(frontMatter.category) || !categorySet.has(frontMatter.category as string)) {
    errors.push(`${label}: category must be one of ${categories.join(', ')}.`);
  }

  if (!isStringArray(frontMatter.tags)) {
    errors.push(`${label}: tags must be a non-empty string array.`);
  }

  if (frontMatter.keywords !== undefined && !Array.isArray(frontMatter.keywords)) {
    errors.push(`${label}: keywords must be an array when provided.`);
  }

  if (frontMatter.keywords !== undefined && Array.isArray(frontMatter.keywords) && !frontMatter.keywords.every(isNonEmptyString)) {
    errors.push(`${label}: keywords must contain only non-empty strings.`);
  }

  if (frontMatter.language !== locale) {
    errors.push(`${label}: language must match its folder locale (${locale}).`);
  }

  if (frontMatter.draft !== undefined && typeof frontMatter.draft !== 'boolean') {
    errors.push(`${label}: draft must be a boolean when provided.`);
  }

  if (frontMatter.authorOpinion !== undefined) {
    validateAuthorOpinion(frontMatter.authorOpinion, label);
  }
}

const slugsByLocale = new Map<Locale, Set<string>>();

for (const locale of locales) {
  const directory = path.join(articlesDirectory, locale);
  const filenames = fs.existsSync(directory)
    ? fs.readdirSync(directory).filter((filename) => /\.mdx?$/.test(filename))
    : [];

  slugsByLocale.set(
    locale,
    new Set(filenames.map((filename) => filename.replace(/\.mdx?$/, '')))
  );

  filenames.forEach((filename) => validateArticle(locale, filename));
}

const allSlugs = new Set([...slugsByLocale.values()].flatMap((slugs) => [...slugs]));

for (const slug of allSlugs) {
  for (const locale of locales) {
    if (!slugsByLocale.get(locale)?.has(slug)) {
      errors.push(`${slug}: missing ${locale} article file.`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Content validation passed for ${allSlugs.size} bilingual article(s).`);
