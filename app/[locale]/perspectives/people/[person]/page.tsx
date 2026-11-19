import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {JsonLd} from '@/components/JsonLd';
import {PageShell} from '@/components/PageShell';
import {PerspectiveProfiles} from '@/components/PerspectiveProfiles';
import styles from '@/components/PerspectiveProfiles.module.css';
import {perspectiveEvents} from '@/content/perspectives';
import {getDictionary, isLocale, locales} from '@/lib/i18n';
import {breadcrumbJsonLd, localizedPageMetadata} from '@/lib/seo';
import {pageUrl} from '@/lib/site';

type PageProps = {params: {locale: string; person: string}};

function findPerson(slug: string) {
  return perspectiveEvents.flatMap((event) => event.participants).find((person) => person.archiveSlug === slug);
}

export function generateStaticParams() {
  const slugs = Array.from(new Set(perspectiveEvents.flatMap((event) => event.participants.flatMap((person) => person.archiveSlug ? [person.archiveSlug] : []))));
  return locales.flatMap((locale) => slugs.map((person) => ({locale, person})));
}

export function generateMetadata({params: {locale, person: slug}}: PageProps): Metadata {
  if (!isLocale(locale)) return {};
  const person = findPerson(slug);
  if (!person) return {};
  const title = locale === 'zh' ? `${person.label[locale]} · 观点档案` : `${person.label[locale]} · Viewpoint Archive`;
  const description = locale === 'zh'
    ? `沿共享时间轴阅读${person.label[locale]}在已收录事件中的公开观点、后续补充与来源，也可与另一人物对照。`
    : `Read ${person.label[locale]}’s sourced remarks and follow-ups across collected topics, or compare them with another person on one timeline.`;
  return {
    ...localizedPageMetadata({locale, path: `perspectives/people/${slug}`, title, description})
  };
}

export default function PerspectivePersonPage({params: {locale, person: slug}}: PageProps) {
  if (!isLocale(locale)) notFound();
  const person = findPerson(slug);
  if (!person) notFound();
  const dictionary = getDictionary(locale);
  const title = locale === 'zh' ? `${person.label[locale]}的观点档案` : `${person.label[locale]}’s viewpoint archive`;

  return (
    <PageShell locale={locale}>
      <main className={styles.page} lang={locale}>
        <JsonLd data={breadcrumbJsonLd([
          {name: dictionary.nav.home, url: pageUrl(locale)},
          {name: dictionary.perspectives.title, url: pageUrl(`${locale}/perspectives`)},
          {name: person.label[locale], url: pageUrl(`${locale}/perspectives/people/${slug}`)}
        ])} />
        <Breadcrumbs items={[
          {label: dictionary.nav.home, href: `/${locale}/`},
          {label: dictionary.perspectives.title, href: `/${locale}/perspectives/#profiles`},
          {label: person.label[locale]}
        ]} />
        <header className={styles.pageHeading}>
          <h1>{title}</h1>
          <p>{person.bio?.[locale] ?? (locale === 'zh' ? '从具体事件、原始来源和后续记录出发，观察判断如何形成与补充。' : 'Follow how judgment develops through specific events, original sources and later records.')}</p>
          <div className={styles.prototypeNotice}>{locale === 'zh' ? '每条记录单独标注来源核验状态' : 'Each record shows its source verification status'}</div>
        </header>
        <PerspectiveProfiles key={slug} events={perspectiveEvents} locale={locale} initialPerson={slug} />
      </main>
    </PageShell>
  );
}
