import {notFound} from 'next/navigation';
import {isLocale, Locale} from '@/lib/i18n';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const {locale} = params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <div data-locale={locale as Locale}>{children}</div>;
}
