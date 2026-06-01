import Link from 'next/link';
import {ChevronRight} from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({items}: {items: BreadcrumbItem[]}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="font-medium hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'line-clamp-1 max-w-[18rem] text-ink sm:max-w-md' : undefined}>{item.label}</span>
            )}
            {!isLast ? <ChevronRight className="h-3.5 w-3.5 text-muted/70" aria-hidden="true" /> : null}
          </span>
        );
      })}
    </nav>
  );
}
