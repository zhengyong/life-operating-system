'use client';

import Link from 'next/link';
import {ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, ChevronDown, ExternalLink} from 'lucide-react';
import {useEffect, useState} from 'react';
import type {KeyboardEvent, MouseEvent, ReactNode} from 'react';
import type {getDictionary, Locale} from '@/lib/i18n';
import {perspectiveWeek} from '@/lib/perspectives';
import type {DebateEntry, PerspectiveEvent, PerspectiveStatement, TimelineEntry} from '@/lib/perspectives';
import styles from './PerspectiveAtlas.module.css';

const views = ['timeline', 'pk', 'my-view'] as const;
const sides = ['handoff', 'return'] as const;
const readingId = 'atlas-reading';
type View = (typeof views)[number];
type Labels = ReturnType<typeof getDictionary>['perspectives'];

type Props = {
  event: PerspectiveEvent;
  locale: Locale;
  labels: Labels;
  author?: {title?: string; summary: string; date?: string; articleHref?: string};
  series?: Record<(typeof sides)[number], Array<{href: string; title: string}>>;
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

function Sources({entry, locale, label}: {entry: PerspectiveStatement; locale: Locale; label: string}) {
  return (
    <details className={styles.sources}>
      <summary>{label} <ChevronDown size={15} aria-hidden="true" /></summary>
      {entry.note ? <p>{entry.note[locale]}</p> : null}
      <ul>
        {entry.sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noopener noreferrer">
              {source.label[locale]} <ExternalLink size={13} aria-hidden="true" />
            </a>
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

export function PerspectiveAtlas({event, locale, labels, author, series, children}: Props) {
  const [view, setView] = useState<View>('timeline');
  const [selected, setSelected] = useState<string[]>([]);
  const [newest, setNewest] = useState(true);
  const [pendingFocus, setPendingFocus] = useState<string>();

  useEffect(() => {
    function readLocation() {
      const hash = window.location.hash.slice(1);
      if (hash === readingId) {
        setView('pk');
        setPendingFocus(readingId);
        return;
      }
      const match = event.timeline.find((record) => record.id === hash);
      setView(views.find((item) => item === hash) ?? 'timeline');
      setPendingFocus(match?.id);
    }

    readLocation();
    window.addEventListener('hashchange', readLocation);
    return () => window.removeEventListener('hashchange', readLocation);
  }, [event.timeline]);

  useEffect(() => {
    if (!pendingFocus) return;
    const match = event.timeline.find((record) => record.id === pendingFocus);

    if (match && selected.length > 0 && !selected.includes(match.participant)) {
      setSelected([...selected, match.participant]);
      return;
    }

    focusSection(pendingFocus);
    setPendingFocus(undefined);
  }, [event.timeline, pendingFocus, selected]);

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

  const visible = event.timeline.filter((item) => selected.length === 0 || selected.includes(item.participant));
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
        <Sources entry={entry} locale={locale} label={labels.sources} />
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
          <span>{labels.comingSoon}</span>
          <span>{labels.comingSoon}</span>
        </nav>

        <header className={styles.eventHeading} id="event">
          <h1>{event.title[locale]}</h1>
          <p>{event.description[locale]}</p>
        </header>

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

        <section id="timeline" role="tabpanel" aria-labelledby="atlas-tab-timeline" hidden={view !== 'timeline'}>
          <div className={styles.filters} role="group" aria-label={labels.filters}>
            <button type="button" className={styles.chip} aria-pressed={selected.length === 0} onClick={() => setSelected([])}>
              {labels.all}
            </button>
            {event.participants.map(({id, label, role}) => (
              <button
                key={id}
                type="button"
                className={styles.chip}
                data-role={role}
                aria-pressed={selected.includes(id)}
                onClick={() => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])}
              >
                {label[locale]}
              </button>
            ))}
          </div>

          <div className={styles.options}>
            <p role="status">{labels.count.replace('{count}', String(visible.length))}</p>
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
                        <p className={styles.summary}>{entry.summary[locale]}</p>
                        <Sources entry={entry} locale={locale} label={labels.sources} />
                        {timelineLink(entry.timelineId, labels.relatedLink)}
                      </div>
                    </article>
                  );
                })}
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.panel} id="pk" role="tabpanel" aria-labelledby="atlas-tab-pk" hidden={view !== 'pk'}>
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
            {sides.map((side) => (
              <button key={side} type="button" aria-controls={`atlas-${side}`} data-side={side} onClick={() => focusSection(`atlas-${side}`)}>
                {labels[side]} <ArrowDownRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.debateGrid}>
            <section id="atlas-handoff" tabIndex={-1} className={styles.camp} data-side="handoff" aria-label={labels.handoff}>
              <header className={styles.campHeading}>
                <p>{labels.handoff}</p>
                <h3>{labels.handoffTitle}</h3>
              </header>
              <div className={styles.campCards}>{debateCards('handoff')}</div>
            </section>

            <span className={styles.versus} aria-hidden="true">VS</span>

            <section id="atlas-return" tabIndex={-1} className={styles.camp} data-side="return" aria-label={labels.return}>
              <header className={styles.campHeading}>
                <p>{labels.return}</p>
                <h3>{labels.returnTitle}</h3>
              </header>
              <div className={styles.campCards}>{debateCards('return')}</div>
            </section>
          </div>

          {series ? (
            <section id={readingId} tabIndex={-1} className={styles.reading} aria-labelledby="atlas-reading-title">
              <h3 id="atlas-reading-title">{labels.reading}</h3>
              <div className={styles.contextGrid}>
                {sides.map((side) => (
                  <div key={side} className={styles.readingGroup} data-side={side}>
                    <h4>{side === 'handoff' ? labels.seriesHandoff : labels.seriesReturn}</h4>
                    <ol>
                      {series[side].map((item) => (
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

        <section className={styles.panel} id="my-view" role="tabpanel" aria-labelledby="atlas-tab-my-view" hidden={view !== 'my-view'}>
          <h2>{labels['my-view']}</h2>
          <div className={styles.author}>
            {author?.title ? <h3>{author.title}</h3> : null}
            {author?.date ? <DateStamp date={author.date} locale={locale} /> : null}
            <p className={styles.summary}>{author?.summary ?? labels.emptyAuthor}</p>
            {author?.articleHref ? (
              <Link className={styles.recordLink} href={author.articleHref}>
                {labels.readArticle} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
