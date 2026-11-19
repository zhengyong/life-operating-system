'use client';

import Link from 'next/link';
import {ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, ChevronDown, ExternalLink} from 'lucide-react';
import {useEffect, useState} from 'react';
import type {KeyboardEvent, MouseEvent, ReactNode} from 'react';
import type {getDictionary, Locale} from '@/lib/i18n';
import type {ArticleAuthorOpinion} from '@/lib/content';
import {perspectiveWeek} from '@/lib/perspectives';
import type {DebateEntry, PerspectiveEvent, PerspectiveStatement, TimelineEntry} from '@/lib/perspectives';
import styles from './PerspectiveAtlas.module.css';

const views = ['timeline', 'pk', 'profiles', 'my-view'] as const;
const readingId = 'atlas-reading';
type View = (typeof views)[number];
type Labels = ReturnType<typeof getDictionary>['perspectives'];

type Props = {
  event: PerspectiveEvent;
  locale: Locale;
  labels: Labels;
  author?: {title?: string; summary: string; date?: string; articleHref?: string; opinion?: ArticleAuthorOpinion};
  series?: Record<string, Array<{href: string; title: string; summary?: string; date?: string}>>;
  profiles?: ReactNode;
  share?: ReactNode;
  comparisonShare?: ReactNode;
  authorShare?: ReactNode;
  children: ReactNode;
};

const englishDay = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', timeZone: 'UTC'});
const englishDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'});

function displayDate(date: string, locale: Locale, short = false) {
  if (locale === 'zh') return (short ? date.slice(5) : date.slice(0, 10)).replaceAll('-', '.');
  return (short ? englishDay : englishDate).format(new Date(date));
}

function DateStamp({date, locale, short}: {date: string; locale: Locale; short?: boolean}) {
  return <time dateTime={date}>{displayDate(date, locale, short)}</time>;
}

function Sources({entry, locale, label, verifiedLabel, pendingLabel}: {entry: PerspectiveStatement; locale: Locale; label: string; verifiedLabel: string; pendingLabel: string}) {
  return (
    <details className={styles.sources}>
      <summary>{label} <span className={styles.sourceStatus} data-status={entry.verification ?? 'pending'}>{entry.verification === 'verified' ? verifiedLabel : pendingLabel}</span> <ChevronDown size={15} aria-hidden="true" /></summary>
      {entry.note ? <p>{entry.note[locale]}</p> : null}
      <ul>
        {entry.sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noopener noreferrer">
              {source.label[locale]} <span className={styles.sourceMark} data-status={source.verification ?? 'pending'}>{source.verification === 'verified' ? verifiedLabel : pendingLabel}</span> <ExternalLink size={13} aria-hidden="true" />
            </a>
            {source.checkedAt ? <span className={styles.checkedDate}>{source.checkedAt}</span> : null}
          </li>
        ))}
      </ul>
    </details>
  );
}

function Speaker({name, locale, profilePath}: {name: string; locale: Locale; profilePath?: string}) {
  return profilePath ? <Link href={`/${locale}/${profilePath}`}>{name}</Link> : <span>{name}</span>;
}

function focusSection(id: string) {
  const section = document.getElementById(id);
  section?.focus({preventScroll: true});
  section?.scrollIntoView({block: 'start'});
}

export function PerspectiveAtlas({event, locale, labels, author, series, profiles, share, comparisonShare, authorShare, children}: Props) {
  const [view, setView] = useState<View>('timeline');
  const [selected, setSelected] = useState<string[]>([]);
  const [newest, setNewest] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [pendingFocus, setPendingFocus] = useState<string>();
  const positions = event.positions ?? [
    {id: 'handoff', label: {[locale]: labels.handoff}, title: {[locale]: labels.handoffTitle}, tone: 'red'},
    {id: 'return', label: {[locale]: labels.return}, title: {[locale]: labels.returnTitle}, tone: 'blue'}
  ];
  const camps = positions.filter((position) => position.id !== 'context');
  const readingGroups = Object.entries(series ?? {});

  useEffect(() => {
    function readLocation() {
      const hash = window.location.hash.slice(1);
      if (hash === readingId) {
        setView('pk');
        setPendingFocus(readingId);
        return;
      }
      const match = event.timeline.find((record) => record.id === hash);
      const matchedView = views.find((item) => item === hash);
      setView(matchedView ?? 'timeline');
      setPendingFocus(match?.id ?? matchedView);
    }

    readLocation();
    window.addEventListener('hashchange', readLocation);
    window.addEventListener('popstate', readLocation);
    return () => {window.removeEventListener('hashchange', readLocation); window.removeEventListener('popstate', readLocation);};
  }, [event.timeline]);

  useEffect(() => {
    if (!pendingFocus) return;
    const match = event.timeline.find((record) => record.id === pendingFocus);

    if (match && verifiedOnly && match.verification !== 'verified') {
      setVerifiedOnly(false);
      return;
    }
    if (match && selected.length > 0 && !selected.includes(match.participant) && !selected.includes(event.participants.find((person) => person.id === match.participant)?.group ?? '')) {
      setSelected([...selected, match.participant]);
      return;
    }

    focusSection(pendingFocus);
    setPendingFocus(undefined);
  }, [event.timeline, event.participants, pendingFocus, selected, verifiedOnly]);

  function chooseView(next: View) {
    setPendingFocus(undefined);
    setView(next);
    if (window.location.hash !== `#${next}`) window.history.pushState(null, '', `#${next}`);
  }

  function handleViewKey(key: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    const nextIndex = {
      ArrowLeft: (currentIndex + views.length - 1) % views.length,
      ArrowRight: (currentIndex + 1) % views.length,
      Home: 0,
      End: views.length - 1
    }[key.key];
    if (nextIndex === undefined) return;

    key.preventDefault();
    const nextView = views[nextIndex];
    chooseView(nextView);
    document.getElementById(`atlas-tab-${nextView}`)?.focus();
  }

  function recordLink(click: MouseEvent<HTMLAnchorElement>, record: TimelineEntry) {
    if (click.ctrlKey || click.metaKey || click.shiftKey || click.altKey) return;
    click.preventDefault();
    setView('timeline');
    setPendingFocus(record.id);
    if (window.location.hash !== `#${record.id}`) window.history.pushState(null, '', `#${record.id}`);
  }

  function timelineLink(id: string | undefined, label: string) {
    const record = event.timeline.find((item) => item.id === id);
    if (!record) return null;
    return (
      <a className={styles.recordLink} href={`#${record.id}`} onClick={(click) => recordLink(click, record)}>
        {label} <ArrowDownRight size={15} aria-hidden="true" />
      </a>
    );
  }

  const visible = event.timeline.filter((item) => {
    if (verifiedOnly && item.verification !== 'verified') return false;
    if (selected.length === 0) return true;
    const participant = event.participants.find((candidate) => candidate.id === item.participant);
    return selected.includes(item.participant) || Boolean(participant?.group && selected.includes(participant.group));
  });
  visible.sort((a, b) => b.date.localeCompare(a.date));
  if (!newest) visible.reverse();
  const weeks = new Map<string, {end: string; entries: TimelineEntry[]}>();
  for (const entry of visible) {
    const {start, end} = perspectiveWeek(entry.date);
    const week = weeks.get(start);
    if (week) week.entries.push(entry);
    else weeks.set(start, {end, entries: [entry]});
  }

  function debateCards(side: DebateEntry['side']) {
    return event.debate.filter((entry) => entry.side === side).sort((a, b) => a.priority - b.priority).map((entry) => (
      <article key={entry.id} className={styles.position} data-role={entry.role}>
        <div className={styles.positionMeta}>
          <span className={styles.roleLabel}>{labels.roles[entry.role]}</span>
          <DateStamp date={entry.date} locale={locale} />
        </div>
        <p className={styles.positionSpeaker}><Speaker name={entry.speaker[locale]} locale={locale} profilePath={entry.profilePath} /></p>
        <p className={styles.positionKind}>{entry.kind[locale]}</p>
        <p className={styles.positionTitle}>{entry.title[locale]}</p>
        <p className={styles.summary}>{entry.summary[locale]}</p>
        <p className={styles.relationship}>{labels.relationships[entry.relationship ?? 'different-view']}</p>
        <Sources entry={entry} locale={locale} label={labels.sources} verifiedLabel={labels.verified} pendingLabel={labels.pending} />
        {timelineLink(entry.timelineId, labels.timelineLink)}
      </article>
    ));
  }

  return (
    <main className={styles.atlas} lang={locale}>
      <div className={styles.frame}>
        {children}

        <nav className={styles.events} aria-label={labels.eventLinks}>
          <a href="#event" aria-current="true">{event.shortTitle[locale]}</a>
          {event.prototype ? <span className={styles.prototypeTag}>{labels.prototype}</span> : null}
        </nav>

        <header className={styles.eventHeading} id="event">
          <h1>{event.title[locale]}</h1>
          <p>{event.description[locale]}</p>
          {share}
        </header>

        {series ? (
          <section className={styles.collision} aria-labelledby="atlas-collision-title">
            <div className={styles.collisionHeading}>
              <p>{labels.collision} <span>01 / PERSPECTIVE ATLAS</span></p>
              <h2 id="atlas-collision-title">{locale === 'zh' ? '英伟达的未来，\n有多依赖黄仁勋？' : 'How much does NVIDIA’s future depend on Jensen Huang?'}</h2>
            </div>
            <div className={styles.collisionGrid}>
              {readingGroups.slice(0, 2).map(([side, articles]) => {
                const position = positions.find((candidate) => candidate.id === side);
                const first = articles[0];
                return first ? (
                  <Link key={side} className={styles.collisionCard} data-tone={position?.tone ?? 'neutral'} href={first.href}>
                    <span>{side === 'handoff' ? labels.seriesHandoff : side === 'return' ? labels.seriesReturn : position?.label[locale]}</span>
                    <h3>{first.title}</h3>
                    <p>{first.summary}</p>
                    <span className={styles.collisionAction}>{labels.readArticle} <ArrowRight size={15} aria-hidden="true" /></span>
                  </Link>
                ) : null;
              })}
              <span className={styles.collisionVs} aria-hidden="true">VS</span>
            </div>
            <div className={styles.collisionFooter}>
              <p>{labels.collisionHint}</p>
              {comparisonShare}
            </div>
          </section>
        ) : null}

        <div className={styles.readingBanner}>
          <p>{labels.allNine}</p>
          <a href={`#${readingId}`} onClick={(click) => {click.preventDefault(); chooseView('pk'); setPendingFocus(readingId); window.history.replaceState(null, '', `#${readingId}`);}}>{labels.browseNine} <ArrowRight size={16} aria-hidden="true" /></a>
        </div>

        <p className={styles.verificationNote}>{labels.prototypeNote}</p>

        <nav className={styles.milestones} aria-label={labels.milestones}>
          {event.milestones.map(({timelineId, label}) => {
            const record = event.timeline.find((entry) => entry.id === timelineId);
            if (!record) return null;
            return (
              <a key={timelineId} href={`#${timelineId}`} onClick={(click) => recordLink(click, record)}>
                <DateStamp date={record.date} locale={locale} short />
                <span>{label[locale]}</span>
              </a>
            );
          })}
        </nav>

        <div className={styles.views} role="tablist" aria-label={labels.views}>
          {views.map((item, index) => (
            <button
              key={item}
              id={`atlas-tab-${item}`}
              type="button"
              role="tab"
              aria-selected={view === item}
              aria-controls={item}
              tabIndex={view === item ? 0 : -1}
              onClick={() => chooseView(item)}
              onKeyDown={(key) => handleViewKey(key, index)}
            >
              {labels[item]}
            </button>
          ))}
        </div>

        <section id="timeline" tabIndex={-1} role="tabpanel" aria-labelledby="atlas-tab-timeline" hidden={view !== 'timeline'}>
          <div className={styles.filters} role="group" aria-label={labels.filters}>
            <button type="button" className={styles.chip} aria-pressed={selected.length === 0} onClick={() => setSelected([])}>
              {labels.all}
            </button>
            {(event.groups ?? event.participants).map((group) => {
              const ids = event.groups ? event.participants.filter((participant) => participant.group === group.id).map((participant) => participant.id) : [group.id];
              const active = selected.includes(group.id);
              return (
              <button
                key={group.id}
                type="button"
                className={styles.chip}
                data-role={group.role}
                aria-pressed={active}
                onClick={() => setSelected((current) => active ? current.filter((item) => item !== group.id && !ids.includes(item)) : [...current, group.id])}
              >
                {group.label[locale]}
              </button>
              );
            })}
          </div>

          <details className={styles.personFilters}>
            <summary>{labels.peopleFilter} <ChevronDown size={14} aria-hidden="true" /></summary>
            <div className={styles.filters}>
              {event.participants.filter((person) => person.archiveSlug).map((person) => (
                <button key={person.id} type="button" className={styles.chip} data-role={person.role} aria-pressed={selected.includes(person.id)} onClick={() => setSelected((current) => current.includes(person.id) ? current.filter((id) => id !== person.id) : [...current.filter((id) => id !== person.group), person.id])}>{person.label[locale]}</button>
              ))}
            </div>
          </details>

          <div className={styles.options}>
            <p role="status">{labels.count.replace('{count}', String(visible.length))}</p>
            <label className={styles.verifiedFilter}><input type="checkbox" checked={verifiedOnly} onChange={(change) => setVerifiedOnly(change.target.checked)} />{labels.onlyVerified}</label>
            <button type="button" onClick={() => setNewest((value) => !value)}>
              {newest ? labels.newest : labels.oldest}
              {newest ? <ArrowDown size={17} aria-hidden="true" /> : <ArrowUp size={17} aria-hidden="true" />}
            </button>
          </div>

          <ol className={styles.timeline}>
            {Array.from(weeks, ([start, {end, entries}]) => (
              <li key={start} className={styles.week}>
                <h2 className={styles.weekHeading}>
                  <span className={styles.weekDates}><DateStamp date={start} locale={locale} /> — <DateStamp date={end} locale={locale} short /></span>
                  {event.weekLabels[start] ? <span>{event.weekLabels[start][locale]}</span> : null}
                </h2>
                {entries.map((entry) => {
                  const participant = event.participants.find((item) => item.id === entry.participant);
                  return (
                    <article key={entry.id} id={entry.id} tabIndex={-1} className={styles.record} data-role={participant?.role}>
                      <header className={styles.recordHeading}>
                        <div className={styles.recordMeta}>
                          <p>
                            <strong><Speaker name={entry.speaker[locale]} locale={locale} profilePath={participant?.profilePath} /></strong>
                            <span> · {entry.kind[locale]}</span>
                          </p>
                          <DateStamp date={entry.date} locale={locale} />
                        </div>
                        <h3>{entry.title[locale]}</h3>
                      </header>
                      <div className={styles.recordBody}>
                        <p className={styles.relationship}>{labels.relationships[entry.relationship ?? 'statement']}</p>
                        <p className={styles.summary}>{entry.summary[locale]}</p>
                        {participant?.archiveSlug ? <Link className={styles.archiveLink} href={`/${locale}/perspectives/people/${participant.archiveSlug}/`}>{labels.profileArchive} · {participant.label[locale]} <ArrowRight size={13} aria-hidden="true" /></Link> : null}
                        <Sources entry={entry} locale={locale} label={labels.sources} verifiedLabel={labels.verified} pendingLabel={labels.pending} />
                        {timelineLink(entry.timelineId, labels.relatedLink)}
                      </div>
                    </article>
                  );
                })}
              </li>
            ))}
          </ol>
          {visible.length === 0 ? <p className={styles.empty}>{labels.emptyTimeline}</p> : null}
        </section>

        <section className={styles.panel} id="pk" tabIndex={-1} role="tabpanel" aria-labelledby="atlas-tab-pk" hidden={view !== 'pk'}>
          <h2>{event.question[locale]}</h2>
          <div className={styles.debateIntro}>
            <p className={styles.order}>{labels.rankOrder}</p>
            {series ? (
              <button type="button" className={styles.recordLink} onClick={() => focusSection(readingId)}>
                {labels.readingJump} <ArrowDownRight size={15} aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <div className={styles.campShortcuts}>
            {camps.map((position) => (
              <button key={position.id} type="button" aria-controls={`atlas-${position.id}`} data-tone={position.tone} onClick={() => focusSection(`atlas-${position.id}`)}>
                {position.label[locale]} <ArrowDownRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.debateGrid}>
            {camps.map((position) => (
              <section key={position.id} id={`atlas-${position.id}`} tabIndex={-1} className={styles.camp} data-tone={position.tone} aria-label={position.label[locale]}>
                <header className={styles.campHeading}><p>{position.label[locale]}</p><h3>{position.title[locale]}</h3></header>
                <div className={styles.campCards}>{debateCards(position.id)}</div>
              </section>
            ))}
          </div>

          {series ? (
            <section id={readingId} tabIndex={-1} className={styles.reading} aria-labelledby="atlas-reading-title">
              <h3 id="atlas-reading-title">{labels.reading}</h3>
              <div className={styles.contextGrid}>
                {readingGroups.map(([side, articles]) => (
                  <div key={side} className={styles.readingGroup} data-tone={positions.find((position) => position.id === side)?.tone ?? 'neutral'}>
                    <h4>{side === 'handoff' ? labels.seriesHandoff : side === 'return' ? labels.seriesReturn : positions.find((position) => position.id === side)?.label[locale]}</h4>
                    <ol>
                      {articles.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{item.title}</Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
              {author?.articleHref ? (
                <Link className={styles.recordLink} href={author.articleHref}>
                  {labels.readFinale} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ) : null}
            </section>
          ) : null}

          <section className={styles.context} aria-labelledby="atlas-context-heading">
            <h3 id="atlas-context-heading">{labels.otherViews}</h3>
            <div className={styles.contextGrid}>{debateCards('context')}</div>
          </section>
        </section>

        <section className={styles.panel} id="profiles" tabIndex={-1} role="tabpanel" aria-labelledby="atlas-tab-profiles" hidden={view !== 'profiles'}>
          {profiles}
        </section>

        <section className={styles.panel} id="my-view" tabIndex={-1} role="tabpanel" aria-labelledby="atlas-tab-my-view" hidden={view !== 'my-view'}>
          <h2>{labels['my-view']}</h2>
          <div className={styles.author}>
            <p className={styles.authorLabel}>{labels.authorLabel}</p>
            {author?.title ? <h3>{author.title}</h3> : null}
            {author?.date ? <DateStamp date={author.date} locale={locale} /> : null}
            <p className={styles.summary}>{author?.summary ?? labels.emptyAuthor}</p>
            {author?.opinion ? (
              <div className={styles.judgment}>
                <h4>{labels.conclusion}</h4><p>{author.opinion.conclusion}</p>
                <h4>{labels.evidence}</h4><ul>{author.opinion.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className={styles.judgmentFacts}><div><h4>{labels.probability}</h4><p>{author.opinion.probability === null ? labels.unspecified : `${Math.round(author.opinion.probability * 100)}%`}</p></div><div><h4>{labels.retrospective}</h4><p>{author.opinion.retrospective === 'pending' ? labels.pendingReview : locale === 'zh' ? '已复盘，见原文' : 'Reviewed; see the full article'}</p></div></div>
                <h4>{labels.invalidation}</h4><ul>{author.opinion.invalidationConditions.map((item) => <li key={item}>{item}</li>)}</ul>
                <h4>{labels.related}</h4><div className={styles.relatedLinks}>{author.opinion.related.map((item) => <Link key={item.href} href={item.href}>{item.label} <ArrowRight size={13} aria-hidden="true" /></Link>)}</div>
              </div>
            ) : null}
            {author?.articleHref ? (
              <Link className={styles.recordLink} href={author.articleHref}>
                {labels.readArticle} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ) : null}
            {authorShare}
          </div>
        </section>
      </div>
    </main>
  );
}
