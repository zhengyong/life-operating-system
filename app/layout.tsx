import type {Metadata} from 'next';
import {JsonLd} from '@/components/JsonLd';
import {siteUrl} from '@/lib/site';
import './globals.css';

const siteTitle = "Yong Zheng's Life Operating System";
const siteDescription =
  'A bilingual personal knowledge website about Life OS, first principles, systems thinking, education, investing, technology, and civilization.';

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml'
    }
  },
  icons: {
    icon: '/brand-mark.svg'
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
    alternateLocale: ['zh_CN']
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    alternateName: ['Life OS', '郑勇的人生操作系统'],
    url: siteUrl,
    inLanguage: ['en', 'zh-CN'],
    description: siteDescription,
    publisher: {
      '@type': 'Person',
      name: 'Yong Zheng',
      url: `${siteUrl}/en/about/`
    }
  };

  return (
    <html lang="en">
      <body>
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
