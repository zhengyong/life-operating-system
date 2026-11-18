import type {Locale} from '@/lib/i18n';

export type LocalizedText = Record<Locale, string>;
export type PerspectiveRole = 'subject' | 'company' | 'media' | 'investor' | 'entrepreneur' | 'official' | 'institution';

type Source = {
  label: LocalizedText;
  href: string;
};

export type PerspectiveStatement = {
  id: string;
  speaker: LocalizedText;
  date: string;
  kind: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  sources: [Source, ...Source[]];
  note?: LocalizedText;
  timelineId?: string;
};

export type TimelineEntry = PerspectiveStatement & {participant: string};

export type DebateEntry = PerspectiveStatement & {
  role: PerspectiveRole;
  side: 'handoff' | 'return' | 'context';
  // Lower values lead their side based on decision-making authority and public prominence.
  priority: number;
  profilePath?: string;
};

export type AuthorOpinion = {
  title?: string;
  summary?: string;
  date?: string;
  articleSlug?: string;
};

export type PerspectiveEvent = {
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  question: LocalizedText;
  participants: Array<{id: string; label: LocalizedText; role: PerspectiveRole; profilePath?: string}>;
  milestones: Array<{timelineId: string; label: LocalizedText}>;
  weekLabels: Record<string, LocalizedText>;
  timeline: TimelineEntry[];
  debate: DebateEntry[];
  author: Partial<Record<Locale, AuthorOpinion>>;
};

export function perspectiveWeek(date: string) {
  const monday = new Date(`${date}T00:00:00Z`);
  monday.setUTCDate(monday.getUTCDate() - (monday.getUTCDay() + 6) % 7);
  const sunday = new Date(monday);
  sunday.setUTCDate(sunday.getUTCDate() + 6);

  return {
    start: monday.toISOString().slice(0, 10),
    end: sunday.toISOString().slice(0, 10)
  };
}
