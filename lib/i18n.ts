import en from '@/messages/en.json';
import zh from '@/messages/zh.json';

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {en, zh};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function alternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'zh' : 'en';
}

export function localizePath(pathname: string, locale: Locale) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0])) {
    parts[0] = locale;
    return `/${parts.join('/')}/`;
  }
  return `/${locale}${pathname === '/' ? '' : pathname}`;
}
