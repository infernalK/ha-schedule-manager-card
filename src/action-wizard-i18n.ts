import type { HomeAssistant } from './types';

/** Libellé FR pour un domaine (navigation type « Thermostat », « Lumière »). */
export function domainLabelFr(domain: string): string {
  const map: Record<string, string> = {
    alarm_control_panel: 'Alarme',
    automation: 'Automatisation',
    binary_sensor: 'Capteur binaire',
    button: 'Bouton',
    camera: 'Caméra',
    climate: 'Climat',
    cover: 'Volet / store',
    fan: 'Ventilateur',
    humidifier: 'Humidificateur',
    input_boolean: 'Interrupteur virtuel',
    input_button: 'Bouton virtuel',
    input_number: 'Nombre',
    input_select: 'Liste déroulante',
    input_text: 'Texte',
    light: 'Lumière',
    lock: 'Serrure',
    media_player: 'Média',
    number: 'Nombre',
    scene: 'Scène',
    script: 'Script',
    select: 'Liste',
    sensor: 'Capteur',
    switch: 'Interrupteur',
    sun: 'Soleil',
    update: 'Mise à jour',
    vacuum: 'Aspirateur',
    valve: 'Vanne',
    water_heater: 'Chauffe-eau',
    weather: 'Météo',
    zone: 'Zone',
  };
  return map[domain] ?? domain.replace(/_/g, ' ');
}

export function domainIcon(domain: string): string {
  const map: Record<string, string> = {
    alarm_control_panel: 'mdi:shield-home',
    automation: 'mdi:robot',
    binary_sensor: 'mdi:toggle-switch',
    button: 'mdi:gesture-tap-button',
    camera: 'mdi:cctv',
    climate: 'mdi:thermostat',
    cover: 'mdi:window-open',
    fan: 'mdi:fan',
    humidifier: 'mdi:air-humidifier',
    input_boolean: 'mdi:toggle-switch-outline',
    input_button: 'mdi:gesture-tap',
    input_number: 'mdi:numeric',
    input_select: 'mdi:format-list-bulleted',
    input_text: 'mdi:form-textbox',
    light: 'mdi:lightbulb',
    lock: 'mdi:lock',
    media_player: 'mdi:speaker',
    number: 'mdi:numeric',
    scene: 'mdi:palette',
    script: 'mdi:script-text',
    select: 'mdi:format-list-checkbox',
    sensor: 'mdi:eye',
    switch: 'mdi:light-switch',
    vacuum: 'mdi:robot-vacuum',
    valve: 'mdi:pipe-valve',
    water_heater: 'mdi:water-boiler',
    weather: 'mdi:weather-partly-cloudy',
  };
  return map[domain] ?? 'mdi:shape-outline';
}

/** Titre principal pour une ligne de service (FR quand on connaît le couple domain/service). */
export function servicePrimaryLabel(domain: string, service: string): string {
  const known: Record<string, string> = {
    'climate.turn_on': 'Allumer',
    'climate.turn_off': 'Éteindre',
    'climate.toggle': 'Basculer',
    'climate.set_preset_mode': 'Choisir un mode préréglé',
    'climate.set_temperature': 'Régler la température',
    'climate.set_hvac_mode': 'Régler le mode HVAC',
    'climate.set_fan_mode': 'Régler le mode ventilation',
    'light.turn_on': 'Allumer',
    'light.turn_off': 'Éteindre',
    'light.toggle': 'Basculer',
    'switch.turn_on': 'Allumer',
    'switch.turn_off': 'Éteindre',
    'switch.toggle': 'Basculer',
    'fan.turn_on': 'Allumer',
    'fan.turn_off': 'Éteindre',
    'cover.open_cover': 'Ouvrir',
    'cover.close_cover': 'Fermer',
    'cover.stop_cover': 'Arrêter',
    'cover.set_cover_position': 'Régler la position',
    'lock.lock': 'Verrouiller',
    'lock.unlock': 'Déverrouiller',
    'media_player.media_play': 'Lecture',
    'media_player.media_pause': 'Pause',
    'media_player.turn_on': 'Allumer',
    'media_player.turn_off': 'Éteindre',
    'vacuum.start': 'Démarrer',
    'vacuum.pause': 'Pause',
    'vacuum.return_to_base': 'Retour à la base',
    'script.turn_on': 'Exécuter',
    'scene.turn_on': 'Activer la scène',
    'input_boolean.turn_on': 'Activer',
    'input_boolean.turn_off': 'Désactiver',
    'input_boolean.toggle': 'Basculer',
    'humidifier.set_humidity': 'Régler l’humidité',
    'humidifier.turn_on': 'Allumer',
    'humidifier.turn_off': 'Éteindre',
    'water_heater.set_temperature': 'Régler la température',
  };
  const k = `${domain}.${service}`;
  if (known[k]) {
    return known[k];
  }
  const t = service.replace(/_/g, ' ');
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function serviceSecondaryHint(domain: string, service: string): string {
  return `${domain}.${service}`;
}

export function friendlyEntityName(hass: HomeAssistant, entityId: string): string {
  const fn = hass.states[entityId]?.attributes?.friendly_name;
  return typeof fn === 'string' && fn.trim() ? fn.trim() : entityId;
}

export function entityIcon(hass: HomeAssistant, entityId: string): string | undefined {
  const ic = hass.states[entityId]?.attributes?.icon;
  return typeof ic === 'string' ? ic : undefined;
}

/** Domaines ayant au moins une entité et des services HA connus. */
export function listSelectableDomains(hass: HomeAssistant): string[] {
  const svc = hass.services || {};
  const doms = new Set<string>();
  for (const eid of Object.keys(hass.states)) {
    const d = eid.includes('.') ? eid.split('.')[0]! : '';
    if (!d || !svc[d] || Object.keys(svc[d]).length === 0) {
      continue;
    }
    doms.add(d);
  }
  return [...doms].sort((a, b) =>
    domainLabelFr(a).localeCompare(domainLabelFr(b), 'fr', { sensitivity: 'base' })
  );
}

export function listEntitiesInDomain(hass: HomeAssistant, domain: string): string[] {
  const prefix = `${domain}.`;
  return Object.keys(hass.states)
    .filter((id) => id.startsWith(prefix))
    .sort((a, b) =>
      friendlyEntityName(hass, a).localeCompare(friendlyEntityName(hass, b), 'fr', {
        sensitivity: 'base',
      })
    );
}
