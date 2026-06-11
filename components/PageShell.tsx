import {BackToTopButton} from '@/components/BackToTopButton';
import {Footer} from '@/components/Footer';
import {Header} from '@/components/Header';
import {Locale} from '@/lib/i18n';

export function PageShell({children, locale}: {children: React.ReactNode; locale: Locale}) {
  return (
    <>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
      <BackToTopButton locale={locale} />
    </>
  );
}
