'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';
import type {Locale} from '@/lib/i18n';

type TagCloudItem = {
  name: string;
  label: string;
  href: string;
  count: number;
};

type CloudNode = TagCloudItem & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  tone: number;
};

type DragState = {
  index: number;
  pointerId: number;
  offsetX: number;
  offsetY: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  moved: boolean;
};

const tones = [
  'border-accent/25 bg-white text-accent shadow-soft',
  'border-line bg-white text-ink shadow-soft',
  'border-gold/25 bg-white text-gold shadow-soft',
  'border-line bg-soft text-muted shadow-soft'
];

export function TagCloudPlayground({items, locale}: {items: TagCloudItem[]; locale: Locale}) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [bounds, setBounds] = useState({width: 0, height: 0});
  const [nodes, setNodes] = useState<CloudNode[]>([]);

  const sortedItems = useMemo(() => [...items].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label)), [items]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const updateBounds = () => {
      const rect = element.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      if (width < 240 || height < 300) {
        return;
      }

      setBounds({
        width,
        height
      });
    };

    window.requestAnimationFrame(updateBounds);
    const observer = new ResizeObserver(updateBounds);
    observer.observe(element);
    window.addEventListener('orientationchange', updateBounds);
    window.addEventListener('resize', updateBounds);
    return () => {
      observer.disconnect();
      window.removeEventListener('orientationchange', updateBounds);
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  useEffect(() => {
    if (bounds.width === 0 || bounds.height === 0) {
      return;
    }

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;
    const isCompact = bounds.width < 520;
    const padding = isCompact ? 10 : 14;
    const radius = Math.min(bounds.width, bounds.height) * (isCompact ? 0.24 : 0.34);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    setNodes(
      sortedItems.map((item, index) => {
        const spiralRadius = radius * Math.sqrt((index + 1) / Math.max(1, sortedItems.length));
        const angle = index * goldenAngle;
        const size = isCompact ? Math.min(58, Math.max(42, 38 + item.count * 4)) : Math.min(72, Math.max(44, 42 + item.count * 7));
        const maxX = bounds.width - size - padding;
        const maxY = bounds.height - size - padding;

        return {
          ...item,
          x: Math.max(padding, Math.min(maxX, centerX + Math.cos(angle) * spiralRadius - size / 2)),
          y: Math.max(padding, Math.min(maxY, centerY + Math.sin(angle) * spiralRadius - size / 2)),
          vx: Math.cos(angle + 1) * (isCompact ? 0.06 : 0.18),
          vy: Math.sin(angle + 1) * (isCompact ? 0.06 : 0.18),
          size,
          tone: index % tones.length
        };
      })
    );
  }, [bounds.height, bounds.width, sortedItems]);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      if (bounds.width === 0 || bounds.height === 0) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      setNodes((current) =>
        current.map((node, index) => {
          if (dragRef.current?.index === index) {
            return node;
          }

          let nextX = node.x + node.vx;
          let nextY = node.y + node.vy;
          let nextVx = node.vx * 0.996;
          let nextVy = node.vy * 0.996;
          const padding = bounds.width < 520 ? 10 : 6;
          const maxX = bounds.width - node.size - padding;
          const maxY = bounds.height - node.size - padding;

          nextVx += Math.sin(Date.now() / 1800 + index) * 0.002;
          nextVy += Math.cos(Date.now() / 2100 + index) * 0.002;

          if (nextX < 6 || nextX > maxX) {
            nextVx *= -0.78;
            nextX = Math.max(padding, Math.min(maxX, nextX));
          }

          if (nextY < padding || nextY > maxY) {
            nextVy *= -0.78;
            nextY = Math.max(padding, Math.min(maxY, nextY));
          }

          return {
            ...node,
            x: Math.max(padding, Math.min(maxX, nextX)),
            y: Math.max(padding, Math.min(maxY, nextY)),
            vx: Math.max(bounds.width < 520 ? -0.35 : -1.2, Math.min(bounds.width < 520 ? 0.35 : 1.2, nextVx)),
            vy: Math.max(bounds.width < 520 ? -0.35 : -1.2, Math.min(bounds.width < 520 ? 0.35 : 1.2, nextVy))
          };
        })
      );

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [bounds.height, bounds.width]);

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>, index: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const node = nodes[index];
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      index,
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left - node.x,
      offsetY: event.clientY - rect.top - node.y,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
      moved: false
    };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!drag || !rect || drag.pointerId !== event.pointerId) {
      return;
    }

    const now = performance.now();
    const dx = event.clientX - drag.lastX;
    const dy = event.clientY - drag.lastY;
    const dt = Math.max(16, now - drag.lastTime);

    if (Math.abs(dx) + Math.abs(dy) > 3) {
      drag.moved = true;
    }

    setNodes((current) =>
      current.map((node, index) => {
        if (index !== drag.index) {
          return node;
        }

        const padding = bounds.width < 520 ? 10 : 6;
        const maxX = bounds.width - node.size - padding;
        const maxY = bounds.height - node.size - padding;

        return {
          ...node,
          x: Math.max(padding, Math.min(maxX, event.clientX - rect.left - drag.offsetX)),
          y: Math.max(padding, Math.min(maxY, event.clientY - rect.top - drag.offsetY)),
          vx: (dx / dt) * 18,
          vy: (dy / dt) * 18
        };
      })
    );

    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.lastTime = now;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLButtonElement>, item: TagCloudItem) {
    const drag = dragRef.current;
    dragRef.current = null;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    if (!drag.moved) {
      router.push(item.href);
    }
  }

  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          {locale === 'zh'
            ? '拖拽标签可以重新排列知识地图；轻点任意标签进入对应文章。'
            : 'Drag tags to rearrange the knowledge map; tap any tag to open matching articles.'}
        </p>
        <p className="text-xs text-muted">
          {items.length} {locale === 'zh' ? '个标签' : 'tags'}
        </p>
      </div>
      <div
        ref={containerRef}
        className="relative h-[500px] w-full max-w-full overflow-hidden rounded-lg border border-line bg-white shadow-soft touch-none sm:h-[520px]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.08),transparent_56%)]" />
        {bounds.width === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
            {locale === 'zh' ? '正在生成标签地图...' : 'Generating tag map...'}
          </div>
        ) : null}
        {nodes.map((node, index) => (
          <button
            key={node.name}
            type="button"
            onPointerDown={(event) => handlePointerDown(event, index)}
            onPointerMove={handlePointerMove}
            onPointerUp={(event) => handlePointerUp(event, node)}
            onPointerCancel={() => {
              dragRef.current = null;
            }}
            className={`absolute flex select-none items-center justify-center rounded-lg border px-3 text-center text-xs font-semibold leading-tight transition-transform hover:scale-105 active:scale-95 ${tones[node.tone]}`}
            style={{
              width: node.size,
              height: node.size,
              transform: `translate3d(${node.x}px, ${node.y}px, 0)`
            }}
            aria-label={`${node.label}, ${node.count}`}
          >
            <span>
              {node.label}
              <span className="mt-1 block text-[10px] font-medium opacity-60">{node.count}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
