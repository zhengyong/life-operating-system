import Link from 'next/link';
import {ArrowRight} from 'lucide-react';

type TopicCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  summary: string;
  actionLabel: string;
  meta?: string;
};

export function TopicCard({href, eyebrow, title, summary, actionLabel, meta}: TopicCardProps) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
        <span className="rounded-md bg-soft px-2.5 py-1">{eyebrow}</span>
        {meta ? <span>{meta}</span> : null}
      </div>
      <h2 className="mt-4 text-xl font-semibold tracking-normal text-ink">
        <Link href={href}>{title}</Link>
      </h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{summary}</p>
      <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink">
        {actionLabel} <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
