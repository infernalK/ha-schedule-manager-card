import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { CardConfig, HomeAssistant } from './types';
import { SCHEDULE_MANAGER_STATUS_ENTITY_ID } from './types';

@customElement('schedule-manager-card-editor')
export class ScheduleManagerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public config!: CardConfig;

  private _config?: CardConfig;

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }
    ha-entity-picker,
    ha-textfield {
      display: block;
      width: 100%;
    }
    .field-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .hint {
      margin: 0;
      font-size: 0.82rem;
      line-height: 1.45;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
    }
    code.inline {
      font-size: 0.85em;
      padding: 1px 5px;
      border-radius: 4px;
      background: rgba(127, 127, 127, 0.2);
      word-break: break-all;
    }
  `;

  setConfig(config: CardConfig) {
    this._config = {
      ...config,
      type: 'custom:schedule-manager-card',
    };
  }

  /** Réduit la liste aux capteurs « Schedule Manager » (nom ou attribut schedules). */
  private _statusEntityFilter = (entityId: string): boolean => {
    if (entityId === SCHEDULE_MANAGER_STATUS_ENTITY_ID) {
      return true;
    }
    if (entityId.includes('schedule_manager')) {
      return true;
    }
    const st = this.hass?.states[entityId];
    const attrs = st?.attributes as Record<string, unknown> | undefined;
    const schedules = attrs?.schedules;
    return (
      schedules != null &&
      typeof schedules === 'object' &&
      !Array.isArray(schedules)
    );
  };

  render() {
    const hass = this.hass as HomeAssistant | undefined;
    if (!hass) {
      return html`<div class="card-config">Chargement du tableau de bord…</div>`;
    }

    return html`
      <div class="card-config">
        <div class="field-block">
          <ha-entity-picker
            .hass=${hass}
            label="Capteur d’état Schedule Manager"
            .value=${this._config?.status_entity ?? ''}
            .includeDomains=${['sensor']}
            .entityFilter=${this._statusEntityFilter}
            .allowCustomEntity=${true}
            @value-changed=${this._statusEntityChanged}
          ></ha-entity-picker>
          <p class="hint">
            Choisissez le capteur créé par l’intégration
            <strong>Schedule Manager</strong>, en principe
            <code class="inline">${SCHEDULE_MANAGER_STATUS_ENTITY_ID}</code>.
            Il expose les plannings dans ses attributs — ce n’est pas un capteur « statut » quelconque
            (Prusa, Pi-hole, etc.). Laissez le champ vide pour utiliser cette valeur par défaut.
          </p>
        </div>
        <div class="field-block">
          <ha-textfield
            label="ID de groupe (optionnel)"
            .value=${this._config?.group_id ?? ''}
            @input=${this._groupIdChanged}
          ></ha-textfield>
          <p class="hint">
            Renseignez l’UUID d’un <strong>groupe</strong> défini dans Schedule Manager pour n’afficher
            que ce groupe (excluant la liste ci‑dessous). Sinon laissez vide : la carte affiche une
            liste de plannings selon le champ suivant.
          </p>
        </div>
        <div class="field-block">
          <ha-textfield
            label="Plannings à afficher (optionnel)"
            .value=${this._config?.schedule_ids?.join(', ') ?? ''}
            placeholder="Vide = tous les plannings"
            @input=${this._scheduleIdsChanged}
          ></ha-textfield>
          <p class="hint">
            Une ou plusieurs UUID de plannings, séparées par des virgules.
            <strong>Vide</strong> = afficher <strong>tous</strong> les plannings du capteur.
            Les UUID se trouvent sous
            <code class="inline">schedules</code> dans les attributs du capteur (Outils de développement
            → États), ou dans le fichier de stockage de l’intégration.
          </p>
        </div>
      </div>
    `;
  }

  private _patchConfig(patch: Partial<CardConfig>) {
    this._config = {
      type: 'custom:schedule-manager-card',
      ...(this._config ?? {}),
      ...patch,
    };
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        bubbles: true,
        composed: true,
        detail: { config: this._config },
      })
    );
  }

  private _statusEntityChanged(ev: CustomEvent<{ value?: string }>) {
    const value = String(ev.detail?.value ?? '').trim();
    this._patchConfig({ status_entity: value || undefined });
  }

  private _groupIdChanged(ev: Event) {
    const value = ((ev.target as HTMLInputElement).value ?? '').trim();
    this._patchConfig({ group_id: value || undefined });
  }

  private _scheduleIdsChanged(ev: Event) {
    const raw = (ev.target as HTMLInputElement).value ?? '';
    const ids = String(raw)
      .split(',')
      .map((id: string) => id.trim())
      .filter((id: string) => id.length > 0);
    this._patchConfig({ schedule_ids: ids.length ? ids : undefined });
  }
}
