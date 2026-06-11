'use client';

import {ArrowUp} from 'lucide-react';
import {useEffect, useState} from 'react';
import type {Locale} from '@/lib/i18n';

export function BackToTopButton({locale}: {locale: Locale}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 520);
      });
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, {passive: true});
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      aria-label={locale === 'zh' ? '回到顶部' : 'Back to top'}
      title={locale === 'zh' ? '回到顶部' : 'Back to top'}
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-white/95 text-muted shadow-soft backdrop-blur transition duration-200 hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/30 md:bottom-6 md:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
