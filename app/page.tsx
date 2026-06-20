import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {siteUrl} from '@/lib/site';

const title = "Yong Zheng's Life Operating System";
const description = 'A bilingual personal knowledge system for growth, education, investing, technology, and civilization.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/',
    languages: {
      en: '/en/',
      zh: '/zh/',
      'x-default': '/'
    }
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
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
      <div className="mb-8 flex items-center gap-3">
        <img src="/brand-mark.svg" alt="Life OS" className="h-11 w-11" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Life OS</p>
          <p className="text-sm text-muted">郑勇的人生操作系统</p>
        </div>
      </div>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-ink md:text-6xl">
        Yong Zheng&apos;s Life Operating System
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        A bilingual personal knowledge system for growth, education, investing, technology, and civilization.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/en/"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-accent"
        >
          English <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/zh/"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
        >
          中文 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
