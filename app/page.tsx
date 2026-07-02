import type {Metadata} from 'next';
import {siteUrl} from '@/lib/site';

const title = "Yong Zheng's Life Operating System";
const description = 'A bilingual personal knowledge system for growth, education, technology, and civilization.';

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
      <meta httpEquiv="refresh" content="0; url=/zh/" />
      <script dangerouslySetInnerHTML={{__html: "window.location.replace('/zh/');"}} />
      <h1 className="text-2xl font-semibold tracking-normal text-ink">郑勇的人生操作系统</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        正在进入中文首页。如果没有自动跳转，请打开 <a className="text-accent underline" href="/zh/">/zh/</a>。
      </p>
    </main>
  );
}
