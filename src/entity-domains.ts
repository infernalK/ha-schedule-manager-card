/**
 * Déduit les domaines d’entités « compatibles » avec un type d’action HA.
 * Si `domain.service` est fourni, un seul domaine ; sinon heuristiques pour les noms de service seuls.
 */
export function domainsForActionType(actionType: string): string[] {
  const t = actionType.trim().toLowerCase();
  if (!t) {
    return [];
  }
  if (t.includes('.')) {
    const dom = t.split('.')[0];
    return dom ? [dom] : [];
  }

  const map: Record<string, string[]> = {
    set_preset_mode: ['climate'],
    set_temperature: ['climate'],
    set_hvac_mode: ['climate'],
    turn_on: ['switch', 'light', 'climate', 'input_boolean', 'group', 'fan'],
    turn_off: ['switch', 'light', 'climate', 'input_boolean', 'group', 'fan'],
    toggle: ['switch', 'light', 'input_boolean'],
    open_cover: ['cover'],
    close_cover: ['cover'],
    set_cover_position: ['cover'],
    stop_cover: ['cover'],
    lock: ['lock'],
    unlock: ['lock'],
    alarm_arm_home: ['alarm_control_panel'],
    alarm_arm_away: ['alarm_control_panel'],
    alarm_disarm: ['alarm_control_panel'],
  };

  return map[t] ?? [];
}

export function entityMatchesDomains(entityId: string, domains: string[]): boolean {
  if (!domains.length) {
    return true;
  }
  const dom = entityId.split('.')[0];
  return domains.includes(dom);
}

/**
 * Indique si une entité peut être associée à une action `domain.service`.
 * Comportement strict : si la carte ne connaît pas le service, on se rabat sur l’égalité
 * du domaine de l’entité avec le domaine du service (jamais « tout autoriser »).
 */
export function entityCompatibleWithAction(
  entityId: string,
  actionType: string
): boolean {
  if (!entityId.includes('.')) {
    return false;
  }
  const entityDom = entityId.split('.')[0] ?? '';
  const t = String(actionType ?? '').trim().toLowerCase();
  if (!t) {
    return false;
  }

  const compat = domainsForActionType(t);
  if (compat.length > 0) {
    return compat.includes(entityDom);
  }

  const firstDot = t.indexOf('.');
  if (firstDot > 0) {
    const serviceDomain = t.slice(0, firstDot);
    return entityDom === serviceDomain;
  }

  return false;
}
