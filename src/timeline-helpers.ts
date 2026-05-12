import type { TimeBlock } from './types';

export const MINUTES_PER_DAY = 24 * 60;

export interface TimelineSegment {
  /** Position gauche en % (0–100) */
  leftPct: number;
  /** Largeur en % */
  widthPct: number;
  label: string;
  /** Teinte CSS (0–360) pour hsl */
  hue: number;
}

function parseToMinutes(t: string): number {
  const parts = String(t).split(':').map((p) => Number(p));
  const h = parts[0] ?? 0;
  const m = parts[1] ?? 0;
  const s = parts[2] ?? 0;
  return h * 60 + m + s / 60;
}

export function segmentLabel(block: TimeBlock): string {
  const p = block.action_payload;
  if (p && typeof p === 'object') {
    const rec = p as Record<string, unknown>;
    if (rec.preset_mode !== undefined) {
      return String(rec.preset_mode);
    }
    if (rec.hvac_mode !== undefined) {
      return String(rec.hvac_mode);
    }
    if (rec.position !== undefined) {
      return `${String(rec.position)}%`;
    }
  }
  const tail = block.action_type.includes('.')
    ? block.action_type.split('.').pop()!
    : block.action_type;
  return tail.length > 14 ? `${tail.slice(0, 12)}…` : tail;
}

function hueFromLabel(label: string): number {
  let h = 0;
  for (let i = 0; i < label.length; i++) {
    h = (h * 31 + label.charCodeAt(i)) % 360;
  }
  return h;
}

/** Même teinte que les segments de la frise (pastilles liste / barres). */
export function hueForBlock(block: TimeBlock): number {
  const label = segmentLabel(block);
  return hueFromLabel(`${label}-${block.action_type}`);
}

/**
 * Découpe les plages en segments sur une journée (0:00–24:00), gère le passage minuit.
 */
export function blocksToTimelineSegments(blocks: TimeBlock[]): TimelineSegment[] {
  const out: TimelineSegment[] = [];
  const day = MINUTES_PER_DAY;

  for (const b of blocks || []) {
    const start = parseToMinutes(b.start_time);
    const end = parseToMinutes(b.end_time);
    const label = segmentLabel(b);
    const hue = hueForBlock(b);

    if (end > start) {
      const w = end - start;
      out.push({
        leftPct: (start / day) * 100,
        widthPct: (w / day) * 100,
        label,
        hue,
      });
    } else if (end < start) {
      const w1 = day - start;
      const w2 = end;
      out.push({
        leftPct: (start / day) * 100,
        widthPct: (w1 / day) * 100,
        label,
        hue,
      });
      out.push({
        leftPct: 0,
        widthPct: (w2 / day) * 100,
        label,
        hue,
      });
    }
  }

  return out;
}

export function nowPercentOfDay(): number {
  const d = new Date();
  const m = d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;
  return (m / MINUTES_PER_DAY) * 100;
}
