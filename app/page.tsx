import type {Metadata} from 'next';
import {siteUrl} from '@/lib/site';

const title = "Yong Zheng's Life Operating System";
const description = 'A bilingual personal knowledge system for growth, education, technology, and civilization.';
const chineseTitle = '\u90d1\u52c7\u7684\u4eba\u751f\u64cd\u4f5c\u7cfb\u7edf';
const redirectScript = `
  (function () {
    var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    var prefersEnglish = languages.some(function (language) {
      return String(language).toLowerCase().indexOf('en') === 0;
    });
    window.location.replace(prefersEnglish ? '/en/' : '/zh/');
  })();
`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/zh/',
    languages: {
      en: '/en/',
      zh: '/zh/',
      'x-default': '/zh/'
    }
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/zh/`,
    title,
    description,
    siteName: title
  },
  twitter: {
    card: 'summary',
    title,
    description
  }
};

export default function RootPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
      <meta httpEquiv="refresh" content="1; url=/zh/" />
      <script dangerouslySetInnerHTML={{__html: redirectScript}} />
      <h1 className="text-2xl font-semibold tracking-normal text-ink">{chineseTitle}</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        Redirecting to the Chinese homepage. English browsers will open{' '}
        <a className="text-accent underline" href="/en/">
          /en/
        </a>
        . If nothing happens, open{' '}
        <a className="text-accent underline" href="/zh/">
          /zh/
        </a>
        .
      </p>
    </main>
  );
}
