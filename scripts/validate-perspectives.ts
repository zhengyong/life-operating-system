import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {perspectiveEvents} from '../content/perspectives';
import type {PerspectiveStatement} from '../lib/perspectives';

const locales = ['zh', 'en'] as const;
const errors: string[] = [];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const eventIds = new Set<string>();
const archiveOwners = new Map<string, string>();
const participantArchives = new Map<string, string>();
const checkedArticles = new Set<string>();

function nonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function fail(label: string, message: string) {
  errors.push(`${label}: ${message}`);
}

function localized(value: unknown, label: string) {
  const text = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  for (const locale of locales) {
    if (!nonEmpty(text[locale])) fail(`${label}.${locale}`, 'must be a non-empty string.');
  }
}

function isoDate(value: unknown, label: string) {
  if (!nonEmpty(value) || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    fail(label, 'must use the ISO date format YYYY-MM-DD.');
    return;
  }
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    fail(label, `is not a valid calendar date (${value}).`);
  }
}

function uniqueId(value: unknown, label: string, seen: Set<string>) {
  if (!nonEmpty(value)) {
    fail(label, 'is required.');
  } else if (seen.has(value)) {
    fail(label, `duplicates ID "${value}".`);
  } else {
    seen.add(value);
  }
}

function article(slug: unknown, label: string) {
  if (!nonEmpty(slug) || !slugPattern.test(slug)) {
    fail(label, 'must be a safe article slug using lowercase letters, digits and single hyphens.');
    return;
  }
  if (checkedArticles.has(slug)) return;
  checkedArticles.add(slug);
  for (const locale of locales) {
    const directory = path.join(process.cwd(), 'content', 'articles', locale);
    const filename = [`${slug}.md`, `${slug}.mdx`].find((name) => fs.existsSync(path.join(directory, name)));
    if (!filename) {
      fail(label, `missing ${locale} article file for "${slug}".`);
      continue;
    }
    try {
      const {data} = matter(fs.readFileSync(path.join(directory, filename), 'utf8'));
      if (data.draft !== false) fail(label, `${locale}/${filename} must explicitly set draft: false.`);
    } catch (error) {
      fail(label, `cannot read ${locale}/${filename}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

function statement(entry: PerspectiveStatement, label: string, recordIds: Set<string>) {
  for (const field of ['speaker', 'kind', 'title', 'summary'] as const) localized(entry[field], `${label}.${field}`);
  if (entry.note !== undefined) localized(entry.note, `${label}.note`);
  isoDate(entry.date, `${label}.date`);

  if (!Array.isArray(entry.sources) || entry.sources.length === 0) {
    fail(`${label}.sources`, 'must contain at least one source.');
  } else {
    entry.sources.forEach((source, index) => {
      const sourceLabel = `${label}.sources[${index}]`;
      localized(source.label, `${sourceLabel}.label`);
      try {
        const url = new URL(source.href);
        if (!['http:', 'https:'].includes(url.protocol)) throw new Error('unsupported protocol');
      } catch {
        fail(`${sourceLabel}.href`, 'must be an absolute http(s) URL.');
      }
      if (source.verification !== undefined && !['verified', 'pending'].includes(source.verification)) {
        fail(`${sourceLabel}.verification`, 'must be verified or pending.');
      }
      if (source.verification === 'verified' || source.checkedAt !== undefined) {
        isoDate(source.checkedAt, `${sourceLabel}.checkedAt`);
      }
    });
  }

  if (entry.verification !== undefined && !['verified', 'pending'].includes(entry.verification)) {
    fail(`${label}.verification`, 'must be verified or pending.');
  }
  if (entry.relationship !== undefined && !['statement', 'different-view', 'direct-reply', 'media-interpretation', 'update'].includes(entry.relationship)) {
    fail(`${label}.relationship`, 'is not a supported relationship type.');
  }
  if (entry.timelineId !== undefined && !recordIds.has(entry.timelineId)) {
    fail(`${label}.timelineId`, `references missing record "${entry.timelineId}".`);
  }
  if (entry.relatedTo !== undefined) {
    if (!Array.isArray(entry.relatedTo)) {
      fail(`${label}.relatedTo`, 'must be an array of record IDs.');
    } else {
      entry.relatedTo.forEach((id, index) => {
        if (!nonEmpty(id) || !recordIds.has(id)) fail(`${label}.relatedTo[${index}]`, `references missing record "${String(id)}".`);
      });
    }
  }
}

for (const [eventIndex, event] of perspectiveEvents.entries()) {
  const label = `events[${eventIndex}]${event.id ? ` (${event.id})` : ''}`;
  uniqueId(event.id, `${label}.id`, eventIds);
  for (const field of ['title', 'shortTitle', 'description', 'question'] as const) localized(event[field], `${label}.${field}`);
  const participantIds = new Set<string>();
  const groupIds = new Set<string>();
  const positionIds = new Set<string>();

  event.groups?.forEach((group, index) => {
    uniqueId(group.id, `${label}.groups[${index}].id`, groupIds);
    localized(group.label, `${label}.groups[${index}].label`);
  });
  event.positions?.forEach((position, index) => {
    uniqueId(position.id, `${label}.positions[${index}].id`, positionIds);
    localized(position.label, `${label}.positions[${index}].label`);
    localized(position.title, `${label}.positions[${index}].title`);
  });
  event.participants.forEach((participant, index) => {
    const participantLabel = `${label}.participants[${index}]`;
    uniqueId(participant.id, `${participantLabel}.id`, participantIds);
    localized(participant.label, `${participantLabel}.label`);
    if (participant.bio !== undefined) localized(participant.bio, `${participantLabel}.bio`);
    if (participant.group !== undefined && event.groups !== undefined && !groupIds.has(participant.group)) {
      fail(`${participantLabel}.group`, `references missing group "${participant.group}".`);
    }
    if (participant.archiveSlug !== undefined) {
      const slug = participant.archiveSlug;
      if (!slugPattern.test(slug)) fail(`${participantLabel}.archiveSlug`, 'must use lowercase letters, digits and single hyphens.');
      const owner = archiveOwners.get(slug);
      if (owner !== undefined && owner !== participant.id) {
        fail(`${participantLabel}.archiveSlug`, `"${slug}" already belongs to participant "${owner}".`);
      }
      const previousSlug = participantArchives.get(participant.id);
      if (previousSlug !== undefined && previousSlug !== slug) {
        fail(`${participantLabel}.archiveSlug`, `participant "${participant.id}" already uses "${previousSlug}" in another event.`);
      }
      archiveOwners.set(slug, participant.id);
      participantArchives.set(participant.id, slug);
    }
  });

  const timelineIds = new Set<string>();
  const debateIds = new Set<string>();
  event.timeline.forEach((entry, index) => uniqueId(entry.id, `${label}.timeline[${index}].id`, timelineIds));
  event.debate.forEach((entry, index) => uniqueId(entry.id, `${label}.debate[${index}].id`, debateIds));
  const recordIds = new Set([...timelineIds, ...debateIds]);

  // A shared record may also be displayed in the debate view, but it must retain its identity.
  const timelineById = new Map(event.timeline.map((entry) => [entry.id, entry]));
  event.debate.forEach((entry, index) => {
    const shared = timelineById.get(entry.id);
    if (shared && (shared.date !== entry.date || shared.participant !== entry.participant ||
      JSON.stringify(shared.speaker) !== JSON.stringify(entry.speaker) ||
      JSON.stringify(shared.title) !== JSON.stringify(entry.title) ||
      JSON.stringify(shared.summary) !== JSON.stringify(entry.summary))) {
      fail(`${label}.debate[${index}].id`, `"${entry.id}" conflicts with the shared timeline record.`);
    }
  });

  event.timeline.forEach((entry, index) => {
    const entryLabel = `${label}.timeline[${index}] (${entry.id})`;
    statement(entry, entryLabel, recordIds);
    if (!participantIds.has(entry.participant)) fail(`${entryLabel}.participant`, `references missing participant "${entry.participant}".`);
  });
  event.debate.forEach((entry, index) => {
    const entryLabel = `${label}.debate[${index}] (${entry.id})`;
    statement(entry, entryLabel, recordIds);
    if (!entry.participant || !participantIds.has(entry.participant)) fail(`${entryLabel}.participant`, `references missing participant "${String(entry.participant)}".`);
    if (!nonEmpty(entry.side) || (event.positions !== undefined && !positionIds.has(entry.side))) {
      fail(`${entryLabel}.side`, `references missing position "${entry.side}".`);
    }
  });

  event.milestones.forEach((milestone, index) => {
    localized(milestone.label, `${label}.milestones[${index}].label`);
    if (!timelineIds.has(milestone.timelineId)) fail(`${label}.milestones[${index}].timelineId`, `references missing timeline record "${milestone.timelineId}".`);
  });
  for (const [date, text] of Object.entries(event.weekLabels)) {
    isoDate(date, `${label}.weekLabels key`);
    localized(text, `${label}.weekLabels[${date}]`);
  }
  for (const [side, slugs] of Object.entries(event.articleSeries ?? {})) {
    if (event.positions !== undefined && !positionIds.has(side)) fail(`${label}.articleSeries.${side}`, 'references a missing position.');
    slugs.forEach((slug, index) => article(slug, `${label}.articleSeries.${side}[${index}]`));
  }
  for (const locale of locales) {
    const opinion = event.author[locale];
    if (!opinion) continue;
    if (opinion.date !== undefined) isoDate(opinion.date, `${label}.author.${locale}.date`);
    if (opinion.articleSlug !== undefined) article(opinion.articleSlug, `${label}.author.${locale}.articleSlug`);
  }
}

if (errors.length > 0) {
  console.error(`Perspective Atlas validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const timelineCount = perspectiveEvents.reduce((count, event) => count + event.timeline.length, 0);
console.log(`Perspective Atlas validation passed for ${perspectiveEvents.length} event(s), ${timelineCount} timeline record(s) and ${checkedArticles.size} bilingual article(s).`);
