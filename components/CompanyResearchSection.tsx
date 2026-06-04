'use client';

import {ReactNode, useEffect, useRef, useState} from 'react';

export function CompanyResearchSection({children, questions}: {children: ReactNode; questions: ReactNode}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      setActive(true);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const focusLine = window.innerHeight * 0.42;
      setActive(rect.top <= focusLine && rect.bottom >= focusLine);
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, {passive: true});
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      {children}
      <div
        className={`transition duration-300 ease-out lg:sticky lg:top-24 ${
          active ? 'lg:translate-y-0 lg:opacity-100' : 'lg:pointer-events-none lg:translate-y-3 lg:opacity-0'
        }`}
      >
        {questions}
      </div>
    </section>
  );
}
