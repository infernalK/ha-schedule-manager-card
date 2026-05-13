export interface BlockAction {
  id: string;
  action_type: string;
  action_payload: unknown;
}

export interface TimeBlock {
  id?: string;
  start_time: string;
  end_time: string;
  actions: BlockAction[];
}

/** Sous-ensemble de l’objet `hass` Lovelace (pas de dépendance runtime au paquet websocket). */
export interface HomeAssistant {
  states: Record<
    string,
    { state: string; attributes: Record<string, unknown> }
  >;
  /** Domaines → services exposés par HA (carte Lovelace). */
  services?: Record<string, Record<string, unknown>>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>
  ): Promise<unknown>;
  /** Langue BCP‑47 (ex. `fr`, `en-GB`) — fournie par Lovelace / Home Assistant. */
  locale?: { language: string };
}

export interface Schedule {
  id: string;
  name: string;
  time_blocks: TimeBlock[];
  enabled: boolean;
  repeat_days: number[];
}

/** Une entrée d’action dans le payload service (aligné sur l’intégration HA). */
export interface BlockActionServicePayload {
  action_type: string;
  action_payload: Record<string, unknown>;
  id?: string;
}

/** Payload envoyé aux services create/update (horaires en chaînes HA). */
export interface TimeBlockServicePayload {
  start_time: string;
  end_time: string;
  actions: BlockActionServicePayload[];
  id?: string;
}

/** Capteur créé par l’intégration Schedule Manager (`attributes.schedules`). */
export const SCHEDULE_MANAGER_STATUS_ENTITY_ID = 'sensor.schedule_manager_status';

export interface CardConfig {
  type: string;
  schedule_ids?: string[];
  /** Capteur Schedule Manager exposant l’attribut `schedules` (défaut: sensor.schedule_manager_status) */
  status_entity?: string;
  /** Si `false`, la barre de titre au-dessus du contenu est masquée (défaut: affichée). */
  show_header?: boolean;
  /** Texte du titre ; vide ou absent = `DEFAULT_CARD_HEADER_TITLE`. */
  header_title?: string;
  /** Si `false`, masque l’interrupteur actif/inactif sur chaque planning (défaut: affiché). */
  show_schedule_enable_toggle?: boolean;
  /** Si `false`, masque la ligne des jours de répétition sous chaque planning (défaut: affichée). */
  show_repeat_days_on_card?: boolean;
}

/** Titre affiché lorsque `header_title` est vide / absent. */
export const DEFAULT_CARD_HEADER_TITLE = 'Schedule Manager';
