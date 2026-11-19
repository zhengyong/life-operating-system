import type {Locale} from '@/lib/i18n';

export type LocalizedText = Record<Locale, string>;
export type PerspectiveRole = 'subject' | 'company' | 'media' | 'investor' | 'entrepreneur' | 'official' | 'institution';

export type PerspectiveSource = {
  label: LocalizedText;
  href: string;
  verification?: 'verified' | 'pending';
  checkedAt?: string;
};

export type PerspectiveRelationship = 'statement' | 'different-view' | 'direct-reply' | 'media-interpretation' | 'update';

export type PerspectiveParticipant = {
  id: string;
  label: LocalizedText;
  role: PerspectiveRole;
  group?: string;
  profilePath?: string;
  archiveSlug?: string;
  bio?: LocalizedText;
};

export type PerspectiveStatement = {
  id: string;
  speaker: LocalizedText;
  date: string;
  kind: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  sources: [PerspectiveSource, ...PerspectiveSource[]];
  note?: LocalizedText;
  timelineId?: string;
  relationship?: PerspectiveRelationship;
  relatedTo?: string[];
  verification?: 'verified' | 'pending';
};

export type TimelineEntry = PerspectiveStatement & {participant: string};

export type DebateEntry = PerspectiveStatement & {
  role: PerspectiveRole;
  side: string;
  participant?: string;
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
  id?: string;
  prototype?: boolean;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  question: LocalizedText;
  participants: PerspectiveParticipant[];
  groups?: Array<{id: string; label: LocalizedText; role: PerspectiveRole}>;
  positions?: Array<{id: string; label: LocalizedText; title: LocalizedText; tone: 'red' | 'blue' | 'neutral'}>;
  milestones: Array<{timelineId: string; label: LocalizedText}>;
  weekLabels: Record<string, LocalizedText>;
  timeline: TimelineEntry[];
  debate: DebateEntry[];
  articleSeries?: Record<string, string[]>;
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
