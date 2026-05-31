import Link from 'next/link';
import {Locale, getDictionary} from '@/lib/i18n';

export function Footer({locale}: {locale: Locale}) {
  const t = getDictionary(locale);

  return (
    <footer className="mt-20 border-t border-line bg-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-ink">{t.brand}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            {locale === 'zh'
              ? '一个面向长期成长的数字化思想资产库。'
              : 'A digital thought asset base for long-term growth.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          <Link href={`/${locale}/articles/`} className="hover:text-accent">
            {t.nav.articles}
          </Link>
          <Link href={`/${locale}/books/`} className="hover:text-accent">
            {t.nav.books}
          </Link>
          <Link href="/rss.xml" className="hover:text-accent">
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}
