'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import type {Locale} from '@/lib/i18n';

type TagCloudItem = {
  name: string;
  label: string;
  href: string;
  count: number;
};

type SphereNode = TagCloudItem & {
  x: number;
  y: number;
  z: number;
  tone: number;
};

type PointerState = {
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  moved: boolean;
  href?: string;
};

type Rotation = {
  x: number;
  y: number;
  z: number;
};

const tones = [
  'border-accent/25 bg-white text-accent',
  'border-line bg-white text-ink',
  'border-gold/30 bg-white text-gold',
  'border-line bg-soft text-muted'
];

function rotatePoint(point: Pick<SphereNode, 'x' | 'y' | 'z'>, rotation: Rotation) {
  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  const cosZ = Math.cos(rotation.z);
  const sinZ = Math.sin(rotation.z);

  const y1 = point.y * cosX - point.z * sinX;
  const z1 = point.y * sinX + point.z * cosX;
  const x1 = point.x;

  const x2 = x1 * cosY + z1 * sinY;
  const z2 = -x1 * sinY + z1 * cosY;
  const y2 = y1;

  return {
    x: x2 * cosZ - y2 * sinZ,
    y: x2 * sinZ + y2 * cosZ,
    z: z2
  };
}

function createSphereNodes(items: TagCloudItem[]) {
  const sortedItems = [...items].sort((a, b) => a.label.localeCompare(b.label));
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const lastIndex = Math.max(1, sortedItems.length - 1);

  return sortedItems.map((item, index) => {
    const y = 1 - (index / lastIndex) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = index * goldenAngle;

    return {
      ...item,
      x: Math.cos(theta) * radiusAtY,
      y,
      z: Math.sin(theta) * radiusAtY,
      tone: index % tones.length
    };
  });
}

export function TagCloudPlayground({items, locale}: {items: TagCloudItem[]; locale: Locale}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<PointerState | null>(null);
  const lastDragEndRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const [diameter, setDiameter] = useState(0);
  const [rotation, setRotation] = useState<Rotation>({x: -0.18, y: 0.42, z: 0});

  const nodes = useMemo(() => createSphereNodes(items), [items]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setDiameter(Math.floor(Math.min(rect.width, rect.height)));
    };

    window.requestAnimationFrame(updateSize);
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    window.addEventListener('orientationchange', updateSize);
    window.addEventListener('resize', updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener('orientationchange', updateSize);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const tick = (time: number) => {
      const lastFrame = lastFrameRef.current ?? time;
      const delta = Math.min(32, time - lastFrame);
      lastFrameRef.current = time;

      if (!pointerRef.current && !isHoveringRef.current) {
        setRotation((current) => ({
          x: current.x,
          y: current.y + delta * 0.000055,
          z: current.z
        }));
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const target = event.target instanceof Element ? event.target.closest('a') : null;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
      href: target?.getAttribute('href') ?? undefined
    };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current;
    if (!pointer || pointer.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - pointer.lastX;
    const dy = event.clientY - pointer.lastY;
    const totalMove = Math.abs(event.clientX - pointer.startX) + Math.abs(event.clientY - pointer.startY);

    if (totalMove > 6) {
      event.preventDefault();
      pointer.moved = true;
    }

    setRotation((current) => ({
      x: current.x - dy * 0.008,
      y: current.y + dx * 0.008,
      z: current.z
    }));

    pointer.lastX = event.clientX;
    pointer.lastY = event.clientY;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current;
    if (pointer?.pointerId === event.pointerId && pointer.moved) {
      lastDragEndRef.current = Date.now();
    } else if (pointer?.pointerId === event.pointerId && pointer.href) {
      window.location.href = pointer.href;
    }
    pointerRef.current = null;
  }

  const radius = diameter * (diameter < 440 ? 0.34 : 0.38);

  return (
    <section className="mt-10">
      <p className="mb-5 max-w-2xl text-sm leading-6 text-muted">
        {locale === 'zh'
          ? '拖动球体可以旋转知识标签；轻点任意关键词进入对应内容。'
          : 'Drag the sphere to rotate the knowledge tags; tap any keyword to open its content.'}
      </p>

      <div className="rounded-lg border border-line bg-white p-4 shadow-soft sm:p-6">
        <div
          ref={containerRef}
          className="relative mx-auto aspect-square w-full max-w-[640px] overflow-hidden rounded-full border border-line bg-white shadow-soft touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') {
              isHoveringRef.current = true;
            }
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse') {
              isHoveringRef.current = false;
            }
          }}
          onPointerCancel={() => {
            pointerRef.current = null;
          }}
          aria-label={locale === 'zh' ? '可旋转标签球' : 'Rotatable tag sphere'}
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_36%_30%,rgba(255,255,255,0.96),rgba(15,118,110,0.08)_48%,rgba(17,24,39,0.05)_100%)]" />
          <div className="pointer-events-none absolute inset-[8%] rounded-full border border-line/60" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line/70" />

          {diameter === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
              {locale === 'zh' ? '正在生成标签球...' : 'Generating tag sphere...'}
            </div>
          ) : null}

          {nodes.map((node) => {
            const point = rotatePoint(node, rotation);
            const depth = (point.z + 1) / 2;
            const scale = 0.72 + depth * 0.42;
            const opacity = 0.34 + depth * 0.64;

            return (
              <a
                key={node.name}
                href={node.href}
                onClick={(event) => {
                  if (Date.now() - lastDragEndRef.current < 250) {
                    event.preventDefault();
                  }
                }}
                className={`absolute left-1/2 top-1/2 select-none whitespace-nowrap rounded-md border px-2.5 py-1 text-center text-[11px] font-semibold leading-5 shadow-sm transition-colors hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:px-3 sm:text-sm ${tones[node.tone]}`}
                style={{
                  opacity,
                  zIndex: Math.round(depth * 1000),
                  transform: `translate(-50%, -50%) translate3d(${point.x * radius}px, ${point.y * radius}px, 0) scale(${scale})`,
                  willChange: 'transform, opacity'
                }}
              >
                {node.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
