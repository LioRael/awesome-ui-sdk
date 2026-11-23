'use client';

import { useEffect, useRef } from 'react';
import { mountInkDetail, type InkKind } from './ink-details';

export function InkDetail({ kind, selected = false }: { kind: InkKind; selected?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current || typeof ResizeObserver !== 'function') return;
    return mountInkDetail(canvas.current, kind, selected);
  }, [kind, selected]);
  const chapter = kind === 'shelf' || kind === 'tool' || kind === 'play';
  return <canvas ref={canvas} className={chapter ? 'ink-detail chapter-ink' : 'ink-detail'} aria-hidden="true" />;
}
