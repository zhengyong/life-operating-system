import Link from 'next/link';
import {Locale, getDictionary} from '@/lib/i18n';
import {companies} from '@/lib/topics';

const friendlyCompanies = [
  'nvidia',
  'tesla',
  'spacex',
  'anthropic',
  'openai',
  'apple',
  'tsmc',
  'berkshire-hathaway'
];

export function Footer({locale}: {locale: Locale}) {
  const t = getDictionary(locale);
  const companyLinks = friendlyCompanies
    .map((slug) => {
      const company = companies.find((item) => item.slug === slug);
      const href = company?.officialLinks.find((link) => link.href)?.href;

      return company && href
        ? {
            name: company.name[locale],
            href
          }
        : null;
    })
    .filter((link): link is {name: string; href: string} => Boolean(link));

  return (
    <footer className="mt-20 border-t border-line bg-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-7 px-5 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-ink">{t.brand}</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              {locale === 'zh'
                ? '一个面向长期成长的数字化思想资产库。普通人的逆袭之路。'
                : 'A digital thought asset base for long-term growth.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted">
            <Link href={`/${locale}/books/`} className="hover:text-accent">
              {t.nav.books}
            </Link>
            <Link href={`/${locale}/life/`} className="hover:text-accent">
              {t.nav.life}
            </Link>
            <Link href={`/${locale}/career/`} className="hover:text-accent">
              {t.nav.career}
            </Link>
            <Link href={`/${locale}/education/`} className="hover:text-accent">
              {t.nav.education}
            </Link>
            <Link href={`/${locale}/investment/`} className="hover:text-accent">
              {t.nav.investment}
            </Link>
            <Link href={`/${locale}/people/`} className="hover:text-accent">
              {t.nav.people}
            </Link>
            <Link href={`/${locale}/companies/`} className="hover:text-accent">
              {t.nav.companies}
            </Link>
            <Link href={`/${locale}/articles/`} className="hover:text-accent">
              {t.nav.articles}
            </Link>
            <Link href={`/${locale}/contact/`} className="hover:text-accent">
              {t.nav.contact}
            </Link>
          </div>
        </div>

        <div className="border-t border-line pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {locale === 'zh' ? '友情链接' : 'Company Links'}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            {companyLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
