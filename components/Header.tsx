'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Menu, Search} from 'lucide-react';
import {useState} from 'react';
import {alternateLocale, getDictionary, Locale, localizePath} from '@/lib/i18n';
import {SearchBox} from '@/components/SearchBox';

type HeaderProps = {
  locale: Locale;
};

export function Header({locale}: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const t = getDictionary(locale);
  const otherLocale = alternateLocale(locale);
  const nav = [
    {href: `/${locale}/`, label: t.nav.home},
    {href: `/${locale}/about/`, label: t.nav.about},
    {href: `/${locale}/books/`, label: t.nav.books},
    {href: `/${locale}/articles/`, label: t.nav.articles},
    {href: `/${locale}/people/`, label: t.nav.people},
    {href: `/${locale}/companies/`, label: t.nav.companies},
    {href: `/${locale}/stocks/`, label: t.nav.stocks},
    {href: `/${locale}/categories/`, label: t.nav.categories},
    {href: `/${locale}/tags/`, label: t.nav.tags},
    {href: `/${locale}/contact/`, label: t.nav.contact}
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href={`/${locale}/`} className="flex min-w-0 items-center gap-3">
          <img src="/brand-mark.svg" alt="Life OS" className="h-9 w-9 shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{t.brandShort}</p>
            <p className="truncate text-xs text-muted">{t.brand}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-soft hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted transition hover:border-accent hover:text-accent"
            onClick={() => setSearchOpen(true)}
            aria-label={t.search.open}
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            href={localizePath(pathname ?? `/${locale}/`, otherLocale)}
            className="rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
          >
            {otherLocale === 'en' ? 'EN' : '中文'}
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted transition hover:border-accent hover:text-accent lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-white px-5 py-3 lg:hidden">
          <nav className="mx-auto grid max-w-6xl gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-soft hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}

      {searchOpen ? <SearchBox locale={locale} onClose={() => setSearchOpen(false)} /> : null}
    </header>
  );
}
