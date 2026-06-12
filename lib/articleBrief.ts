export type ArticleBriefData = {
  abstract: string;
  conclusion?: string;
  summary?: string;
  quote?: string;
  mainContent: string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripInlineMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/[*_`#]/g, '')
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function extractConclusion(markdown: string) {
  const match = markdown.match(
    /(?:^|\n)\s*\*\*\s*(?:\u4e00\u53e5\u8bdd\u7ed3\u8bba|One-sentence conclusion)\s*[:\uff1a]\s*([^\n]+?)\s*\*\*\s*(?=\n|$)/i
  );

  return match ? stripInlineMarkdown(match[1]) : undefined;
}

function removeConclusion(markdown: string) {
  return markdown.replace(
    /(?:^|\n)\s*\*\*\s*(?:\u4e00\u53e5\u8bdd\u7ed3\u8bba|One-sentence conclusion)\s*[:\uff1a]\s*[^\n]+?\s*\*\*\s*(?=\n|$)/i,
    '\n'
  );
}

function getSectionPattern(headings: string[]) {
  return new RegExp(
    `(?:^|\\n)##\\s*(?:${headings.map(escapeRegExp).join('|')})\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|\\s*$)`,
    'i'
  );
}

function extractSection(markdown: string, headings: string[]) {
  const match = markdown.match(getSectionPattern(headings));

  return match ? stripInlineMarkdown(match[1]) : undefined;
}

function removeSection(markdown: string, headings: string[]) {
  return markdown.replace(getSectionPattern(headings), '\n');
}

function compactMarkdown(markdown: string) {
  return markdown
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function prepareArticleBrief(content: string, abstract: string): ArticleBriefData {
  const conclusion = extractConclusion(content);
  const summary = extractSection(content, ['\u603b\u7ed3', 'Summary']);
  const quote = extractSection(content, ['\u91d1\u53e5', 'Quote']);
  const withoutConclusion = removeConclusion(content);
  const withoutSummary = removeSection(withoutConclusion, ['\u603b\u7ed3', 'Summary']);
  const mainContent = compactMarkdown(removeSection(withoutSummary, ['\u91d1\u53e5', 'Quote']));

  return {
    abstract,
    conclusion,
    summary,
    quote,
    mainContent
  };
}
