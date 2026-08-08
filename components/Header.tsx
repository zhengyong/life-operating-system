'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Menu, Search, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {SearchBox} from '@/components/SearchBox';
import {alternateLocale, getDictionary, Locale, localizePath} from '@/lib/i18n';

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
    {href: `/${locale}/life/`, label: t.nav.life},
    {href: `/${locale}/career/`, label: t.nav.career},
    {href: `/${locale}/education/`, label: t.nav.education},
    {href: `/${locale}/people/`, label: t.nav.people},
    {href: `/${locale}/companies/`, label: t.nav.companies},
    {href: `/${locale}/articles/`, label: t.nav.articles},
    {href: `/${locale}/categories/`, label: t.nav.categories},
    {href: `/${locale}/tags/`, label: t.nav.tags},
    {href: `/${locale}/contact/`, label: t.nav.contact}
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === `/${locale}/`) return pathname === href;
    return pathname?.startsWith(href) ?? false;
  };

  const localeHref = localizePath(pathname ?? `/${locale}/`, otherLocale);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link href={`/${locale}/`} className="site-brand" aria-label={t.brand}>
            {locale === 'zh' ? '郑勇' : 'Yong Zheng'}
          </Link>

          <nav className="site-nav" aria-label={locale === 'zh' ? '主导航' : 'Primary navigation'}>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? 'site-nav__link is-active' : 'site-nav__link'}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__utilities">
            <button
              className="site-header__icon"
              onClick={() => setSearchOpen(true)}
              aria-label={t.search.open}
              title={t.search.open}
            >
              <Search aria-hidden="true" />
            </button>
            <Link href={localeHref} className="site-header__locale">
              ZH / EN
            </Link>
            <button
              className="site-header__icon site-header__menu-button"
              onClick={() => setOpen(true)}
              aria-label={locale === 'zh' ? '打开菜单' : 'Open menu'}
              aria-expanded={open}
              title={locale === 'zh' ? '菜单' : 'Menu'}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={locale === 'zh' ? '移动导航' : 'Mobile navigation'}>
          <div className="mobile-menu__header">
            <Link href={`/${locale}/`} className="site-brand">
              {locale === 'zh' ? '郑勇' : 'Yong Zheng'}
            </Link>
            <button
              className="mobile-menu__close"
              onClick={() => setOpen(false)}
              aria-label={locale === 'zh' ? '关闭菜单' : 'Close menu'}
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <nav className="mobile-menu__nav">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? 'mobile-menu__link is-active' : 'mobile-menu__link'}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__utilities">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
            >
              {t.search.label}
            </button>
            <Link href={localeHref}>ZH / EN</Link>
          </div>
        </div>
      ) : null}

      {searchOpen ? <SearchBox locale={locale} onClose={() => setSearchOpen(false)} /> : null}
    </>
  );
}
