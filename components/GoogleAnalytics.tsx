'use client';

import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useRef} from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type GoogleAnalyticsProps = {
  measurementId: string;
};

export function GoogleAnalytics({measurementId}: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasSkippedInitialPageView = useRef(false);

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    if (!hasSkippedInitialPageView.current) {
      hasSkippedInitialPageView.current = true;
      return;
    }

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    let attempts = 0;

    const reportPageView = () => {
      if (typeof window.gtag !== 'function') {
        attempts += 1;
        return attempts >= 20;
      }

      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title
      });

      return true;
    };

    if (reportPageView()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (reportPageView()) {
        window.clearInterval(intervalId);
      }
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [measurementId, pathname, searchParams]);

  if (!measurementId) {
    return null;
  }

  return null;
}
