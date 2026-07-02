import type {Metadata} from 'next';
import {Suspense} from 'react';
import {GoogleAnalytics} from '@/components/GoogleAnalytics';
import {JsonLd} from '@/components/JsonLd';
import {siteUrl} from '@/lib/site';
import './globals.css';

const siteTitle = "Yong Zheng's Life Operating System";
const chineseSiteTitle = '\u90d1\u52c7\u7684\u4eba\u751f\u64cd\u4f5c\u7cfb\u7edf';
const siteDescription =
  'A bilingual personal knowledge website about Life OS, first principles, systems thinking, education, technology, and civilization.';
const googleAnalyticsMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-8XMBMD0T2L';

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
  verification: {
    other: {
      'baidu-site-verification': 'codeva-ABDSJ3FWOv'
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
    alternateName: ['Life OS', chineseSiteTitle],
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
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`} />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsMeasurementId}');
            `
          }}
        />
        <Suspense fallback={null}>
          <GoogleAnalytics measurementId={googleAnalyticsMeasurementId} />
        </Suspense>
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
