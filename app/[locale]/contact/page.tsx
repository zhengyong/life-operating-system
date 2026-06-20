import type {Metadata} from 'next';
import {Mail, MessageCircle} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {getDictionary, isLocale, Locale} from '@/lib/i18n';
import {localizedPageMetadata} from '@/lib/seo';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  return localizedPageMetadata({
    locale,
    path: 'contact',
    title: t.contact.title,
    description: t.contact.subtitle
  });
}

export default async function ContactPage({params}: {params: {locale: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.nav.contact}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">{t.contact.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{t.contact.subtitle}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <section className="rounded-lg border border-line bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">
                <MessageCircle className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-semibold tracking-normal text-ink">{t.contact.wechat}</h2>
            </div>
            <p className="mt-5 select-all rounded-md bg-soft px-4 py-3 font-mono text-base text-ink">future_in_ai</p>
            <p className="mt-4 text-sm leading-6 text-muted">{t.contact.note}</p>
          </section>

          <section className="rounded-lg border border-line bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">
                <Mail className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-semibold tracking-normal text-ink">{t.contact.email}</h2>
            </div>
            <a
              href="mailto:zhengyong8797@gmail.com"
              className="mt-5 block break-all rounded-md bg-soft px-4 py-3 font-mono text-base text-ink transition hover:text-accent"
            >
              zhengyong8797@gmail.com
            </a>
          </section>
        </div>
      </main>
    </PageShell>
  );
}
