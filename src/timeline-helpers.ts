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
  /** Index de la plage dans `time_blocks` (identique pour les 2 segments si passage minuit). */
  blockIndex: number;
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

  const list = blocks || [];
  for (let bi = 0; bi < list.length; bi++) {
    const b = list[bi];
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
        blockIndex: bi,
      });
    } else if (end < start) {
      const w1 = day - start;
      const w2 = end;
      out.push({
        leftPct: (start / day) * 100,
        widthPct: (w1 / day) * 100,
        label,
        hue,
        blockIndex: bi,
      });
      out.push({
        leftPct: 0,
        widthPct: (w2 / day) * 100,
        label,
        hue,
        blockIndex: bi,
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

export function minutesToHaTime(totalMinutes: number): string {
  let m = Math.round(totalMinutes) % MINUTES_PER_DAY;
  if (m < 0) {
    m += MINUTES_PER_DAY;
  }
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}:00`;
}

function isOvernightBlock(b: TimeBlock): boolean {
  const s = parseToMinutes(b.start_time);
  const e = parseToMinutes(b.end_time);
  return e < s;
}

/** Frontière draggable entre deux plages consécutives sur la frise (sans passage minuit). */
export interface TouchBoundary {
  /** Position du séparateur en % (0–100). */
  pct: number;
  leftBlockIndex: number;
  rightBlockIndex: number;
  minMinute: number;
  maxMinute: number;
}

export function touchBoundariesBetweenBlocks(blocks: TimeBlock[]): TouchBoundary[] {
  const list = blocks || [];
  const segments = blocksToTimelineSegments(list);
  if (segments.length < 2) {
    return [];
  }
  const sorted = [...segments].sort((a, b) => a.leftPct - b.leftPct);
  const eps = 0.12;
  const out: TouchBoundary[] = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i];
    const b = sorted[i + 1];
    const endA = a.leftPct + a.widthPct;
    if (Math.abs(endA - b.leftPct) > eps) {
      continue;
    }
    if (a.blockIndex === b.blockIndex) {
      continue;
    }
    const L = list[a.blockIndex];
    const R = list[b.blockIndex];
    if (!L || !R || isOvernightBlock(L) || isOvernightBlock(R)) {
      continue;
    }
    const minM = Math.floor(parseToMinutes(L.start_time)) + 1;
    const maxM = Math.ceil(parseToMinutes(R.end_time)) - 1;
    if (minM >= maxM) {
      continue;
    }
    const boundaryMin = Math.round(
      (parseToMinutes(L.end_time) + parseToMinutes(R.start_time)) / 2
    );
    const pct = (boundaryMin / MINUTES_PER_DAY) * 100;
    out.push({
      pct,
      leftBlockIndex: a.blockIndex,
      rightBlockIndex: b.blockIndex,
      minMinute: minM,
      maxMinute: maxM,
    });
  }

  return out;
}
