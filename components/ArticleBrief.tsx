import {BookOpen, CheckCircle2, Quote} from 'lucide-react';
import {ArticleBriefData} from '@/lib/articleBrief';
import {Locale} from '@/lib/i18n';

const labels = {
  zh: {
    eyebrow: '\u6587\u7ae0\u5bfc\u8bfb',
    abstract: '\u6458\u8981',
    conclusion: '\u4e00\u53e5\u8bdd\u7ed3\u8bba',
    summary: '\u603b\u7ed3',
    quote: '\u91d1\u53e5'
  },
  en: {
    eyebrow: 'Article Brief',
    abstract: 'Abstract',
    conclusion: 'One-Sentence Conclusion',
    summary: 'Summary',
    quote: 'Quote'
  }
} as const;

export function ArticleBrief({brief, locale}: {brief: ArticleBriefData; locale: Locale}) {
  const t = labels[locale];

  return (
    <section className="mt-7 border-y border-line bg-soft/60 px-0 py-5 md:mt-8 md:py-6">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase text-accent">
        <BookOpen className="h-4 w-4" />
        {t.eyebrow}
      </div>

      {brief.conclusion ? (
        <div className="mt-4 flex gap-3">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="text-sm font-semibold text-ink">{t.conclusion}</p>
            <p className="mt-1 text-base leading-7 text-ink">{brief.conclusion}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-ink">{t.abstract}</p>
          <p className="mt-2 text-sm leading-7 text-muted">{brief.abstract}</p>
        </div>

        {brief.summary ? (
          <div>
            <p className="text-sm font-semibold text-ink">{t.summary}</p>
            <p className="mt-2 text-sm leading-7 text-muted">{brief.summary}</p>
          </div>
        ) : null}
      </div>

      {brief.quote ? (
        <blockquote className="mt-5 flex gap-3 border-l-2 border-accent pl-4 text-base font-medium leading-7 text-ink">
          <Quote className="mt-1 h-5 w-5 shrink-0 text-accent" />
          <span>{brief.quote}</span>
        </blockquote>
      ) : null}
    </section>
  );
}
