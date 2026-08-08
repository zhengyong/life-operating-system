import Link from 'next/link';
import {Locale, getDictionary} from '@/lib/i18n';
import {companies} from '@/lib/topics';

const friendlyCompanies = ['nvidia', 'tesla', 'spacex', 'anthropic', 'openai', 'apple', 'tsmc'];

export function Footer({locale}: {locale: Locale}) {
  const t = getDictionary(locale);
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
  const companyLinks = friendlyCompanies
    .map((slug) => {
      const company = companies.find((item) => item.slug === slug);
      const href = company?.officialLinks.find((link) => link.href)?.href;
      return company && href ? {name: company.name[locale], href} : null;
    })
    .filter((link): link is {name: string; href: string} => Boolean(link));

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{locale === 'zh' ? '郑勇' : 'Yong Zheng'}</p>
          <p>
            {locale === 'zh'
              ? '长期记录关于人生、职场、教育、人物与公司的思考。'
              : 'Long-term notes on life, career, education, people, and companies.'}
          </p>
        </div>

        <div className="site-footer__group">
          <p className="site-footer__label">{locale === 'zh' ? '站内导航' : 'Navigation'}</p>
          <div className="site-footer__links">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="site-footer__group">
          <p className="site-footer__label">{locale === 'zh' ? '公司研究' : 'Company Research'}</p>
          <div className="site-footer__links">
            {companyLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="site-footer__legal">
          <p>© 2026 Zheng Yong</p>
          <div>
            <Link href={`/${locale}/privacy/`}>{locale === 'zh' ? '隐私政策' : 'Privacy Policy'}</Link>
            <span aria-hidden="true"> · </span>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
              浙ICP备2026047700号-1
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
