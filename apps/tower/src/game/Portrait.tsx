import { useEffect, useRef } from 'react';
import type { EnemyLook } from '@tower';
import { basePose, drawChar } from './chars';

export interface PortraitSubject { readonly look: EnemyLook; readonly scarf: string | null; readonly headband: string | null }

/** A character drawn on a little canvas, idling. */
export function Portrait({ c, size, dim = false, eyes }: { c: PortraitSubject; size: number; dim?: boolean; eyes?: 'normal' | 'angry' | 'smug' }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      const pose = basePose(t / 1000);
      pose.bob = Math.sin(t / 400) * 1.2;
      if (eyes) pose.eyes = eyes;
      if (dim) { pose.tint = '#0b0d12'; pose.tintAmount = 0.75; }
      drawChar(ctx, c.look, size * 0.5, size * 0.93, size / 125, 1, pose, { scarf: c.scarf, headband: c.headband });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [c, size, dim, eyes]);
  return <canvas ref={ref} style={{ width: size, height: size }} />;
}

