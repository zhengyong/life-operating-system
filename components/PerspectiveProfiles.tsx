'use client';

import Link from 'next/link';
import {ArrowDown, ArrowUp, ArrowUpRight, ChevronDown, ExternalLink, Users} from 'lucide-react';
import {useId, useMemo, useState} from 'react';
import type {Locale} from '@/lib/i18n';
import type {PerspectiveEvent, PerspectiveParticipant, PerspectiveRelationship, TimelineEntry} from '@/lib/perspectives';
import styles from './PerspectiveProfiles.module.css';

type Props = {
  events: PerspectiveEvent[];
  locale: Locale;
  initialPerson?: string;
};

type Profile = PerspectiveParticipant & {archiveSlug: string};
type ProfileRecord = {event: PerspectiveEvent; eventKey: string; entry: TimelineEntry; person: Profile};

const copy = {
  zh: {
    title: '人物观点档案',
    intro: '看一个人的前后判断，也把两个人放回同一条时间轴。',
    coverage: '这里只展示已收录、附有来源的记录；没有记录，代表尚未收录。',
    archive: '查看档案', first: '主要人物', second: '对照人物', none: '不添加对照',
    choose: '选择人物', event: '事件专题', allEvents: '全部已收录事件',
    comparison: '共享时间轴', newest: '最新在前', oldest: '最早在前',
    records: '条记录', events: '个专题', empty: '所选人物在这个专题下暂无已收录记录。',
    sources: '查看公开来源', verified: '已有来源核验', pending: '待核验',
    sourceVerified: '来源已核验', sourcePending: '来源待核验', checked: '核验日期',
    eventLink: '回到事件', profileLink: '人物研究', related: '查看相关记录',
    history: '后续记录不自动代表立场反转；请结合原始发言与具体语境阅读。',
    statement: '公开表态', different: '不同观点', reply: '直接回应', media: '媒体解读', update: '后续补充',
    selected: '当前人物', compareHint: '选择第二个人，即可按同一时间顺序对照。'
  },
  en: {
    title: 'Viewpoint archives',
    intro: 'Follow one person’s judgment over time, or compare two people on a shared timeline.',
    coverage: 'Only collected, sourced records appear here. An empty archive means a record has not been collected.',
    archive: 'Open archive', first: 'Primary person', second: 'Compare with', none: 'No comparison',
    choose: 'Choose a person', event: 'Topic', allEvents: 'All collected topics',
    comparison: 'Shared timeline', newest: 'Newest first', oldest: 'Oldest first',
    records: 'records', events: 'topics', empty: 'No collected records match these people and this topic.',
    sources: 'View public sources', verified: 'Source checked', pending: 'Pending verification',
    sourceVerified: 'Source verified', sourcePending: 'Source pending', checked: 'Checked',
    eventLink: 'Back to topic', profileLink: 'Person study', related: 'See the related record',
    history: 'A later record does not by itself mean a reversal. Read the original remarks in context.',
    statement: 'Public statement', different: 'Different view', reply: 'Direct response', media: 'Media interpretation', update: 'Follow-up',
    selected: 'Selected person', compareHint: 'Choose a second person to compare their records in the same date order.'
  }
};

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
  }).format(new Date(date));
}

/** Archives share the event registry, so a newly collected topic can appear without a separate person dataset. */
export function PerspectiveProfiles({events, locale, initialPerson}: Props) {
  const t = copy[locale];
  const controlId = useId();
  const {people, records} = useMemo(() => {
    const bySlug = new Map<string, Profile>();
    const collected: ProfileRecord[] = [];
    events.forEach((event, index) => {
      const eventKey = event.id ?? String(index);
      event.participants.forEach((participant) => {
        if (participant.archiveSlug && !bySlug.has(participant.archiveSlug)) {
          bySlug.set(participant.archiveSlug, {...participant, archiveSlug: participant.archiveSlug});
        }
      });
      event.timeline.forEach((entry) => {
        const participant = event.participants.find((person) => person.id === entry.participant);
        if (!participant?.archiveSlug) return;
        collected.push({event, eventKey, entry, person: {...participant, archiveSlug: participant.archiveSlug}});
      });
    });
    return {people: Array.from(bySlug.values()), records: collected};
  }, [events]);

  const defaultFirst = initialPerson ?? people.find((person) => person.archiveSlug === 'duan-yongping')?.archiveSlug ?? people[0]?.archiveSlug ?? '';
  const [first, setFirst] = useState(defaultFirst);
  const [second, setSecond] = useState(initialPerson ? '' : people.find((person) => person.archiveSlug === 'dan-bin' && person.archiveSlug !== defaultFirst)?.archiveSlug ?? '');
  const [topic, setTopic] = useState('all');
  const [newest, setNewest] = useState(true);

  const visible = records.filter(({person, eventKey}) =>
    (person.archiveSlug === first || person.archiveSlug === second) && (topic === 'all' || topic === eventKey)
  ).sort((a, b) => newest ? b.entry.date.localeCompare(a.entry.date) : a.entry.date.localeCompare(b.entry.date));

  const relationLabels: Record<PerspectiveRelationship, string> = {
    statement: t.statement, 'different-view': t.different, 'direct-reply': t.reply,
    'media-interpretation': t.media, update: t.update
  };

  function chooseFirst(next: string) {
    setFirst(next);
    if (second === next) setSecond('');
  }

  return (
    <section className={styles.profiles} aria-labelledby={`${controlId}-title`}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}><Users size={16} aria-hidden="true" /> {locale === 'zh' ? '人物 × 事件 × 时间' : 'People × Topics × Time'}</p>
        <h2 id={`${controlId}-title`}>{t.title}</h2>
        <p>{t.intro}</p>
      </header>

      {!initialPerson ? <div className={styles.people}>
        {people.map((person) => {
          const personal = records.filter((record) => record.person.archiveSlug === person.archiveSlug);
          const topicCount = new Set(personal.map((record) => record.eventKey)).size;
          return (
            <article key={person.archiveSlug} className={styles.person} data-selected={first === person.archiveSlug || second === person.archiveSlug}>
              <div className={styles.personTop}>
                <span className={styles.avatar} aria-hidden="true">{person.label[locale].slice(0, 1)}</span>
                <div>
                  <h3>{person.label[locale]}</h3>
                  <p>{personal.length} {t.records} · {topicCount} {t.events}</p>
                </div>
              </div>
              {person.bio ? <p className={styles.bio}>{person.bio[locale]}</p> : null}
              <Link className={styles.archiveLink} href={`/${locale}/perspectives/people/${person.archiveSlug}/`}>
                {t.archive} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div> : null}

      <div className={styles.comparison}>
        <h3>{t.comparison}</h3>
        <p className={styles.hint}>{t.compareHint}</p>
        <div className={styles.controls}>
          <label htmlFor={`${controlId}-first`}>
            <span>{t.first}</span>
            <select id={`${controlId}-first`} value={first} onChange={(event) => chooseFirst(event.target.value)}>
              {people.length === 0 ? <option value="">{t.choose}</option> : null}
              {people.map((person) => <option key={person.archiveSlug} value={person.archiveSlug}>{person.label[locale]}</option>)}
            </select>
          </label>
          <label htmlFor={`${controlId}-second`}>
            <span>{t.second}</span>
            <select id={`${controlId}-second`} value={second} onChange={(event) => setSecond(event.target.value)}>
              <option value="">{t.none}</option>
              {people.filter((person) => person.archiveSlug !== first).map((person) => <option key={person.archiveSlug} value={person.archiveSlug}>{person.label[locale]}</option>)}
            </select>
          </label>
          {events.length > 1 ? (
            <label htmlFor={`${controlId}-topic`}>
              <span>{t.event}</span>
              <select id={`${controlId}-topic`} value={topic} onChange={(event) => setTopic(event.target.value)}>
                <option value="all">{t.allEvents}</option>
                {events.map((event, index) => <option key={event.id ?? index} value={event.id ?? String(index)}>{event.shortTitle[locale]}</option>)}
              </select>
            </label>
          ) : null}
        </div>
        <div className={styles.options}>
          <p role="status" aria-live="polite">{visible.length} {t.records}</p>
          <button type="button" onClick={() => setNewest((value) => !value)}>
            {newest ? t.newest : t.oldest} {newest ? <ArrowDown size={16} aria-hidden="true" /> : <ArrowUp size={16} aria-hidden="true" />}
          </button>
        </div>

        {visible.length === 0 ? <p className={styles.empty}>{t.empty}</p> : (
          <ol className={styles.timeline}>
            {visible.map(({entry, event, eventKey, person}) => {
              const earlierId = entry.timelineId ?? entry.relatedTo?.[0];
              const previous = earlierId ? event.timeline.find((record) => record.id === earlierId) : undefined;
              return (
                <li key={`${eventKey}-${entry.id}`} className={styles.record} data-person={person.archiveSlug === first ? 'first' : 'second'}>
                  <div className={styles.recordMeta}>
                    <span className={styles.personName}>{person.label[locale]}</span>
                    <time dateTime={entry.date}>{formatDate(entry.date, locale)}</time>
                  </div>
                  <div className={styles.badges}>
                    <span>{relationLabels[entry.relationship ?? 'statement']}</span>
                    <span data-verification={entry.verification ?? 'pending'}>{entry.verification === 'verified' ? t.verified : t.pending}</span>
                  </div>
                  <h4>{entry.title[locale]}</h4>
                  <p className={styles.summary}>{entry.summary[locale]}</p>
                  <details className={styles.sources}>
                    <summary>{t.sources} <ChevronDown size={14} aria-hidden="true" /></summary>
                    {entry.note ? <p>{entry.note[locale]}</p> : null}
                    <ul>
                      {entry.sources.map((source) => (
                        <li key={source.href}>
                          <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label[locale]} <ExternalLink size={12} aria-hidden="true" /></a>
                          <span className={styles.sourceStatus}>{source.verification === 'verified' ? t.sourceVerified : t.sourcePending}{source.checkedAt ? ` · ${t.checked} ${source.checkedAt}` : ''}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                  <div className={styles.recordLinks}>
                    <a href={`/${locale}/perspectives/#${entry.id}`}>{t.eventLink} · {event.shortTitle[locale]} <ArrowUpRight size={13} aria-hidden="true" /></a>
                    {person.profilePath ? <Link href={`/${locale}/${person.profilePath}`}>{t.profileLink} <ArrowUpRight size={13} aria-hidden="true" /></Link> : null}
                    {previous ? <a href={`/${locale}/perspectives/#${previous.id}`}>{t.related} <ArrowUpRight size={13} aria-hidden="true" /></a> : null}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
        <p className={styles.footnote}>{t.history} {t.coverage}</p>
      </div>
    </section>
  );
}
