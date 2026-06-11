import Link from 'next/link';
import {ArrowRight} from 'lucide-react';

export type LearningPathLink = {
  href: string;
  label: string;
  description: string;
};

type LearningPathPanelProps = {
  title: string;
  summary: string;
  stepsTitle: string;
  linksTitle: string;
  practiceTitle?: string;
  steps: string[];
  links: LearningPathLink[];
  exercises?: string[];
};

export function LearningPathPanel({
  title,
  summary,
  stepsTitle,
  linksTitle,
  practiceTitle,
  steps,
  links,
  exercises
}: LearningPathPanelProps) {
  return (
    <section className="mt-10 border-t border-line pt-8">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-normal text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{summary}</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="rounded-lg border border-line bg-white p-5">
          <h3 className="text-base font-semibold tracking-normal text-ink">{stepsTitle}</h3>
          <ol className="mt-4 grid gap-3">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-soft text-xs font-semibold text-accent">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border border-line bg-white p-5">
          <h3 className="text-base font-semibold tracking-normal text-ink">{linksTitle}</h3>
          <div className="mt-4 grid gap-3">
            {links.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="group rounded-md bg-soft p-4 transition hover:bg-white hover:shadow-soft"
              >
                <span className="flex items-center justify-between gap-3 text-sm font-semibold text-ink group-hover:text-accent">
                  {link.label}
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </span>
                <span className="mt-2 block text-sm leading-6 text-muted">{link.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {exercises && exercises.length > 0 ? (
        <div className="mt-5 rounded-lg border border-line bg-soft p-5">
          <h3 className="text-base font-semibold tracking-normal text-ink">{practiceTitle}</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {exercises.map((exercise) => (
              <p key={exercise} className="rounded-md bg-white px-4 py-3 text-sm leading-6 text-muted">
                {exercise}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
