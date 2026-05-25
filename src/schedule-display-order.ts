import type { CardConfig } from './types';

/** Identifiants visibles + ordre d’affichage (filtre `schedule_ids` + `schedule_order`). */
export function resolveOrderedScheduleIds(
  config: Pick<CardConfig, 'schedule_ids' | 'schedule_order'>,
  availableIds: string[],
  compareIds: (a: string, b: string) => number
): string[] {
  const available = new Set(availableIds);
  const filter = (config.schedule_ids ?? [])
    .map((id) => String(id).trim())
    .filter((id) => id && available.has(id));
  const pool = filter.length > 0 ? filter : availableIds.filter((id) => available.has(id));

  const explicitOrder = (config.schedule_order ?? [])
    .map((id) => String(id).trim())
    .filter((id) => pool.includes(id));

  const ordered: string[] = [];
  for (const id of explicitOrder) {
    if (!ordered.includes(id)) {
      ordered.push(id);
    }
  }
  const remainder = pool.filter((id) => !ordered.includes(id));
  remainder.sort(compareIds);
  return [...ordered, ...remainder];
}
