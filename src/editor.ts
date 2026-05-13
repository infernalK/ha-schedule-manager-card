import { LitElement, html, css } from 'lit';
import { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { CardConfig, HomeAssistant } from './types';
import { SCHEDULE_MANAGER_STATUS_ENTITY_ID } from './types';
import { entityIdFromPickerFilterArgument } from './ha-entity-picker-helpers';

@customElement('schedule-manager-card-editor')
export class ScheduleManagerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public config?: CardConfig;

  /** Copie éditable ; @state pour que setConfig / _patchConfig déclenchent bien un re-render Lovelace. */
  @state() private _config?: CardConfig;

  /** True si l’utilisateur a vidé le capteur — ne pas réappliquer le défaut automatiquement. */
  @state() private _userClearedStatusEntity = false;

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
    .schedule-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 4px;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: rgba(var(--rgb-primary-text-color, 221, 221, 221), 0.04);
    }
    .schedule-list-title {
      font-size: 0.88rem;
      font-weight: 600;
      margin-bottom: 6px;
      color: var(--primary-text-color);
    }
    ha-formfield {
      --mdc-theme-text-primary-on-background: var(--primary-text-color);
    }
  `;

  setConfig(config: CardConfig) {
    this._config = {
      ...config,
      type: 'custom:schedule-manager-card',
    };
    this.config = this._config;
    this._userClearedStatusEntity = false;
  }

  protected willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    // Certains flux HA posent uniquement la propriété `config` sans rappeler setConfig.
    if (changed.has('config') && this.config) {
      this._config = {
        ...this.config,
        type: 'custom:schedule-manager-card',
      };
    }
  }

  updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('hass') || changed.has('config') || changed.has('_config')) {
      this._maybeApplyDefaultStatusEntity();
    }
  }

  /** Présélectionne le capteur d’état standard si aucun n’est configuré et qu’il existe. */
  private _maybeApplyDefaultStatusEntity() {
    if (this._userClearedStatusEntity || !this.hass) {
      return;
    }
    if (!this.hass.states[SCHEDULE_MANAGER_STATUS_ENTITY_ID]) {
      return;
    }
    if (this._config?.status_entity?.trim()) {
      return;
    }
    this._patchConfig({ status_entity: SCHEDULE_MANAGER_STATUS_ENTITY_ID });
  }

  private _resolvedStatusEntityId(): string {
    return this._config?.status_entity?.trim() || SCHEDULE_MANAGER_STATUS_ENTITY_ID;
  }

  /** Valeur affichée dans le sélecteur (vide si l’utilisateur a explicitement retiré le capteur). */
  private _statusEntityPickerValue(): string {
    const v = this._config?.status_entity?.trim();
    if (v) {
      return v;
    }
    if (this._userClearedStatusEntity) {
      return '';
    }
    return SCHEDULE_MANAGER_STATUS_ENTITY_ID;
  }

  private _schedulesRecord(): Record<string, { name?: string }> {
    const st = this.hass?.states[this._resolvedStatusEntityId()];
    const raw = st?.attributes?.schedules as unknown;
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return {};
    }
    return raw as Record<string, { name?: string }>;
  }

  private _scheduleEntries(): { id: string; name: string }[] {
    const rec = this._schedulesRecord();
    return Object.entries(rec)
      .map(([id, sch]) => ({
        id,
        name: typeof sch?.name === 'string' && sch.name.trim() ? sch.name.trim() : id,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
  }

  private _allScheduleIds(): string[] {
    return this._scheduleEntries().map((e) => e.id);
  }

  /** Filtrage actif uniquement si `schedule_ids` est une liste non vide. */
  private _isScheduleChecked(scheduleId: string): boolean {
    const explicit = this._config?.schedule_ids;
    if (!explicit || explicit.length === 0) {
      return true;
    }
    return explicit.includes(scheduleId);
  }

  private _onScheduleCheck(ev: Event, scheduleId: string) {
    const t = ev.currentTarget as unknown as { checked: boolean };
    const checked = t.checked;
    const allIds = this._allScheduleIds();
    if (allIds.length === 0) {
      return;
    }

    const explicit = this._config?.schedule_ids;
    const selected = new Set<string>(
      explicit && explicit.length > 0 ? explicit : allIds
    );

    if (checked) {
      selected.add(scheduleId);
    } else {
      if (selected.size <= 1) {
        t.checked = true;
        return;
      }
      selected.delete(scheduleId);
    }

    const arr = Array.from(selected).sort();
    const allOn =
      arr.length === allIds.length && allIds.every((id) => selected.has(id));
    this._patchConfig({
      schedule_ids: allOn ? undefined : arr,
    });
  }

  /** Réduit la liste aux capteurs « Schedule Manager » (nom ou attribut schedules). */
  private _statusEntityFilter = (entity: unknown): boolean => {
    const entityId = entityIdFromPickerFilterArgument(entity);
    if (!entityId) {
      return false;
    }
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

    const entries = this._scheduleEntries();
    const entityMissing = !hass.states[this._resolvedStatusEntityId()];

    return html`
      <div class="card-config">
        <div class="field-block">
          <ha-entity-picker
            .hass=${hass}
            label="Capteur d’état Schedule Manager"
            .value=${this._statusEntityPickerValue()}
            .includeDomains=${['sensor']}
            .entityFilter=${this._statusEntityFilter}
            .allowCustomEntity=${true}
            @value-changed=${this._statusEntityChanged}
          ></ha-entity-picker>
          <p class="hint">
            En général une seule entité :
            <code class="inline">${SCHEDULE_MANAGER_STATUS_ENTITY_ID}</code>
            (présélectionnée si elle existe). Autre capteur seulement si vous avez plusieurs entrées
            Schedule Manager.
          </p>
        </div>
        <div class="field-block">
          <ha-textfield
            label="ID de groupe (optionnel)"
            .value=${this._config?.group_id ?? ''}
            @input=${this._groupIdChanged}
          ></ha-textfield>
          <p class="hint">
            UUID d’un groupe exclusif pour n’afficher que ce groupe. Vide = liste de plannings
            ci‑dessous.
          </p>
        </div>
        <div class="field-block">
          ${entityMissing
            ? html`
                <p class="hint">
                  Capteur
                  <code class="inline">${this._resolvedStatusEntityId()}</code>
                  introuvable — vérifiez l’intégration Schedule Manager.
                </p>
              `
            : entries.length === 0
              ? html`
                  <p class="hint">
                    Aucun planning dans les attributs du capteur pour l’instant. Créez un planning
                    depuis la carte ou le service
                    <code class="inline">schedule_manager.create_schedule</code>.
                  </p>
                `
              : html`
                  <div class="schedule-list-title">Plannings à afficher sur la carte</div>
                  <p class="hint">
                    Toutes les cases cochées = afficher tous les plannings. Décochez pour masquer un
                    planning (au moins un reste visible).
                  </p>
                  <div class="schedule-list">
                    ${entries.map(
                      (row) => html`
                        <ha-formfield label=${row.name}>
                          <ha-checkbox
                            .checked=${this._isScheduleChecked(row.id)}
                            @change=${(e: Event) => this._onScheduleCheck(e, row.id)}
                          ></ha-checkbox>
                        </ha-formfield>
                      `
                    )}
                  </div>
                `}
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
    if (!value) {
      this._userClearedStatusEntity = true;
      this._patchConfig({ status_entity: undefined });
      return;
    }
    this._userClearedStatusEntity = false;
    this._patchConfig({ status_entity: value });
  }

  private _groupIdChanged(ev: Event) {
    const value = ((ev.target as HTMLInputElement).value ?? '').trim();
    this._patchConfig({ group_id: value || undefined });
  }

}
