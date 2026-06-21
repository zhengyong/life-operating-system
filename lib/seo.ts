import type {Metadata} from 'next';
import type {Locale} from '@/lib/i18n';
import {siteUrl} from '@/lib/site';

type BreadcrumbJsonLdItem = {
  name: string;
  url: string;
};

type PageSeoInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
};

export function localizedPageMetadata({locale, path, title, description}: PageSeoInput): Metadata {
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  const suffix = normalizedPath ? `/${normalizedPath}/` : '/';
  const canonical = `${siteUrl}/${locale}${suffix}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en${suffix}`,
        zh: `${siteUrl}/zh${suffix}`
      }
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: "Yong Zheng's Life Operating System",
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: [locale === 'zh' ? 'en_US' : 'zh_CN']
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  };
}

export function breadcrumbJsonLd(items: BreadcrumbJsonLdItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
