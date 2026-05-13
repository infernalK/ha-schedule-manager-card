import { LitElement, html, css } from 'lit';
import { PropertyValues } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import type { CardConfig, HomeAssistant } from './types';
import {
  DEFAULT_CARD_HEADER_TITLE,
  SCHEDULE_MANAGER_STATUS_ENTITY_ID,
} from './types';
import { collatorLocale, msg } from './i18n';
import { entityIdFromPickerFilterArgument } from './ha-entity-picker-helpers';

/** Empreinte stable pour comparer la config affichée (alignée sur hasChanged de la carte). */
function editorConfigFingerprint(c?: CardConfig): string {
  if (!c) {
    return '';
  }
  return JSON.stringify({
    type: c.type,
    status_entity: c.status_entity,
    header_title: c.header_title,
    show_header: c.show_header,
    show_schedule_enable_toggle: c.show_schedule_enable_toggle,
    show_repeat_days_on_card: c.show_repeat_days_on_card,
    schedule_ids: c.schedule_ids ?? null,
  });
}

/** ha-switch / ha-checkbox (WebAwesome) : `target` peut être interne au shadow. */
function haFormControlCheckedFromChangeEvent(ev: Event): boolean {
  const host = ev.currentTarget as HTMLElement & { checked?: boolean };
  if (typeof host.checked === 'boolean') {
    return host.checked;
  }
  const inner = ev.target as HTMLElement & { checked?: boolean };
  return Boolean(inner.checked);
}

@customElement('schedule-manager-card-editor')
export class ScheduleManagerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  /** HA met à jour cette référence au rechargement du dashboard ; sert à resynchroniser la config. */
  @property({ attribute: false }) public lovelace?: unknown;

  /** Contexte d’édition Lovelace (chemin de carte, etc.) ; mis à jour à l’ouverture du panneau. */
  @property({ attribute: false }) public context?: unknown;

  /**
   * Config telle que Lovelace la connaît (aperçu, YAML, etc.).
   * Pas de `hasChanged` personnalisé : avec une empreinte métier, HA peut pousser une nouvelle
   * référence d’objet sans déclencher de mise à jour, ce qui laissait l’éditeur et l’aperçu désynchronisés.
   */
  @property({ attribute: false }) public config?: CardConfig;

  /** Copie éditable ; @state pour que setConfig / _patchConfig déclenchent bien un re-render Lovelace. */
  @state() private _config?: CardConfig;

  /** True si l’utilisateur a vidé le capteur — ne pas réappliquer le défaut automatiquement. */
  @state() private _userClearedStatusEntity = false;

  /** Brouillon titre : évite que les re-renders / ha-textfield réinitialisent la frappe. */
  @state() private _headerTitleDraft = '';

  private _headerTitleRef = createRef<HTMLInputElement>();

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }
    ha-entity-picker {
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
    ha-textfield {
      display: block;
      width: 100%;
    }
    .sm-config-title-input {
      width: 100%;
      box-sizing: border-box;
      padding: 12px 16px;
      font-size: 1rem;
      font-family: inherit;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--ha-card-background, #fff));
      color: var(--primary-text-color);
    }
    .sm-config-title-input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color);
    }
    .sm-sub-label {
      display: block;
      margin-top: 12px;
      margin-bottom: 4px;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
  `;

  setConfig(config: CardConfig) {
    this._applyIncomingConfigRecord(config);
    this._userClearedStatusEntity = false;
    // Référence distincte : évite que Lovelace et Lit partagent la même référence mutable.
    this.config = { ...(this._config as object) } as CardConfig;
    this.requestUpdate();
  }

  /** Normalise une config HA → état local `_config` (sans toucher à `this.config`). */
  private _applyIncomingConfigRecord(config: CardConfig) {
    const base = this._configWithoutUndefinedKeys(
      config as unknown as Record<string, unknown>
    );
    const sid = base.schedule_ids;
    if (Array.isArray(sid)) {
      base.schedule_ids = [...sid];
    }
    this._config = {
      ...base,
      type: 'custom:schedule-manager-card',
    } as CardConfig;
    const te = this._headerTitleRef.value;
    if (document.activeElement !== te) {
      this._headerTitleDraft = this._config.header_title ?? '';
    }
    if (this._config.status_entity?.trim()) {
      this._userClearedStatusEntity = false;
    }
  }

  /** `hui-element-editor` vit dans le shadow parent ; HA peut ne pas rappeler `setConfig` si `deepEqual` est vrai. */
  private _editorParentHost(): (HTMLElement & { value?: unknown }) | null {
    const root = this.getRootNode();
    if (!(root instanceof ShadowRoot)) {
      return null;
    }
    const host = root.host;
    if (!(host instanceof HTMLElement) || !('value' in host)) {
      return null;
    }
    return host as HTMLElement & { value?: unknown };
  }

  /**
   * Recharge l’état local depuis la valeur du conteneur Lovelace lorsqu’elle diffère de `_config`
   * (réouverture de l’éditeur, rechargement du YAML, etc.).
   */
  private _pullConfigFromEditorHostIfStale() {
    const host = this._editorParentHost();
    if (!host) {
      return;
    }
    const raw = host.value;
    if (!raw || typeof raw !== 'object') {
      return;
    }
    const remoteFp = editorConfigFingerprint(raw as CardConfig);
    const localFp = editorConfigFingerprint(this._config);
    if (remoteFp === localFp) {
      return;
    }
    this.setConfig(raw as CardConfig);
  }

  connectedCallback() {
    super.connectedCallback();
    queueMicrotask(() => this._pullConfigFromEditorHostIfStale());
  }

  protected firstUpdated(_changed: PropertyValues) {
    super.firstUpdated(_changed);
    queueMicrotask(() => this._pullConfigFromEditorHostIfStale());
  }

  /** Retire les clés `undefined` : le spread les copierait et effacerait `schedule_ids` / `header_title`. */
  private _configWithoutUndefinedKeys(
    c: CardConfig | Record<string, unknown> | undefined
  ): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    if (!c || typeof c !== 'object') {
      return out;
    }
    for (const [k, v] of Object.entries(c)) {
      if (v !== undefined) {
        out[k] = v;
      }
    }
    return out;
  }

  updated(changed: PropertyValues) {
    super.updated(changed);
    // Pas de _pull sur lovelace/context : host.value peut être obsolète et écraser l’édition locale.
    // Lovelace met parfois à jour `config` sans rappeler `setConfig` (aperçu, réouverture).
    if (changed.has('config') && this.config) {
      const prev = changed.get('config') as CardConfig | undefined;
      if (this.config !== prev) {
        if (editorConfigFingerprint(this.config) !== editorConfigFingerprint(this._config)) {
          this._applyIncomingConfigRecord(this.config);
        }
      }
    }
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
      .sort((a, b) =>
        a.name.localeCompare(b.name, collatorLocale(this.hass), { sensitivity: 'base' })
      );
  }

  private _allScheduleIds(): string[] {
    return this._scheduleEntries().map((e) => e.id);
  }

  private _normScheduleId(id: string): string {
    return String(id).trim().toLowerCase();
  }

  /** Liste explicite de plannings affichés (défini = filtre actif). */
  private _explicitScheduleIds(): string[] | undefined {
    const raw = (this._config?.schedule_ids ?? this.config?.schedule_ids) as unknown;
    if (raw == null) {
      return undefined;
    }
    if (Array.isArray(raw)) {
      const ids = raw.map((x) => String(x).trim()).filter(Boolean);
      return ids.length ? ids : undefined;
    }
    if (typeof raw === 'string') {
      const s = raw.trim();
      if (!s) {
        return undefined;
      }
      return s
        .split(/[\s,]+/)
        .map((x: string) => x.trim())
        .filter(Boolean);
    }
    return undefined;
  }

  /** Filtrage actif uniquement si `schedule_ids` est une liste non vide. */
  private _isScheduleChecked(scheduleId: string): boolean {
    const explicit = this._explicitScheduleIds();
    if (!explicit || explicit.length === 0) {
      return true;
    }
    const needle = this._normScheduleId(scheduleId);
    return explicit.some((id) => this._normScheduleId(String(id)) === needle);
  }

  private _onScheduleCheck(ev: Event, scheduleId: string) {
    const t = ev.currentTarget as unknown as { checked: boolean };
    const checked = haFormControlCheckedFromChangeEvent(ev);
    const allIds = this._allScheduleIds();
    if (allIds.length === 0) {
      return;
    }

    const explicit = this._explicitScheduleIds();
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

  /** Filtre le sélecteur du capteur d’état (entité avec attribut `schedules`). */
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
      return html`<div class="card-config">${msg(undefined, 'editor.loading')}</div>`;
    }

    const entries = this._scheduleEntries();
    const entityMissing = !hass.states[this._resolvedStatusEntityId()];

    return html`
      <div class="card-config">
        <div class="field-block">
          <div class="schedule-list-title">${msg(hass, 'editor.card_title_section')}</div>
          <ha-formfield label=${msg(hass, 'editor.show_title_switch')}>
            <ha-switch
              .checked=${this._config?.show_header !== false}
              @change=${this._onShowHeaderChange}
            ></ha-switch>
          </ha-formfield>
          ${this._config?.show_header !== false
            ? html`
                <label class="sm-sub-label" for="sm-editor-card-title"
                  >${msg(hass, 'editor.custom_title_optional')}</label
                >
                <input
                  id="sm-editor-card-title"
                  class="sm-config-title-input"
                  type="text"
                  name="schedule_manager_card_title"
                  autocomplete="off"
                  placeholder=${DEFAULT_CARD_HEADER_TITLE}
                  .value=${this._headerTitleDraft}
                  ${ref(this._headerTitleRef)}
                  @input=${this._onHeaderTitleInput}
                  @blur=${this._onHeaderTitleBlur}
                />
                <p class="hint">
                  ${msg(hass, 'editor.title_apply_hint')}
                  <code class="inline">${DEFAULT_CARD_HEADER_TITLE}</code>.
                </p>
              `
            : html`
                <p class="hint">
                  ${msg(hass, 'editor.title_disabled_hint')}
                </p>
              `}
        </div>
        <div class="field-block">
          <ha-formfield label=${msg(hass, 'editor.schedule_toggle_label')}>
            <ha-switch
              .checked=${this._config?.show_schedule_enable_toggle !== false}
              @change=${this._onShowScheduleEnableToggleChange}
            ></ha-switch>
          </ha-formfield>
          <p class="hint">
            ${msg(hass, 'editor.schedule_toggle_hint')}
          </p>
        </div>
        <div class="field-block">
          <ha-formfield label=${msg(hass, 'editor.show_repeat_days_on_card_label')}>
            <ha-switch
              .checked=${this._config?.show_repeat_days_on_card !== false}
              @change=${this._onShowRepeatDaysOnCardChange}
            ></ha-switch>
          </ha-formfield>
          <p class="hint">
            ${msg(hass, 'editor.show_repeat_days_on_card_hint')}
          </p>
        </div>
        <div class="field-block">
          <ha-entity-picker
            .hass=${hass}
            label=${msg(hass, 'editor.status_entity_label')}
            .value=${this._statusEntityPickerValue()}
            .includeDomains=${['sensor']}
            .entityFilter=${this._statusEntityFilter}
            .allowCustomEntity=${true}
            @value-changed=${this._statusEntityChanged}
          ></ha-entity-picker>
          ${entityMissing
            ? html`
                <p class="hint">
                  ${msg(hass, 'editor.entity_missing_before_first_code')}
                  <code class="inline">${this._resolvedStatusEntityId()}</code>
                  ${msg(hass, 'editor.entity_missing_between_codes')}
                  <code class="inline">${SCHEDULE_MANAGER_STATUS_ENTITY_ID}</code>
                  ${msg(hass, 'editor.entity_missing_after_second_code')}
                </p>
              `
            : html``}
        </div>
        ${!entityMissing
          ? html`
              <div class="field-block">
                ${entries.length === 0
                  ? html`
                      <p class="hint">
                        ${msg(hass, 'editor.no_schedules_hint', {
                          service: 'schedule_manager.create_schedule',
                        })}
                      </p>
                    `
                  : html`
                      <div class="schedule-list-title">${msg(hass, 'editor.schedules_on_card_title')}</div>
                      <p class="hint">
                        ${msg(hass, 'editor.schedules_on_card_hint')}
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
            `
          : html``}
      </div>
    `;
  }

  private _patchConfig(patch: Partial<CardConfig>) {
    const merged: Record<string, unknown> = {
      type: 'custom:schedule-manager-card',
      ...(this._config as Record<string, unknown> | undefined),
      ...patch,
    };
    for (const [key, val] of Object.entries(patch)) {
      if (val === undefined) {
        delete merged[key];
      }
    }
    for (const k of Object.keys(merged)) {
      if (merged[k] === undefined) {
        delete merged[k];
      }
    }
    /** Même référence que `detail.config` : le parent HA supprime les clés `undefined` sur cet objet. */
    const outgoing = { ...(merged as object) } as CardConfig;
    this._config = outgoing;
    const te = this._headerTitleRef.value;
    if (document.activeElement !== te) {
      this._headerTitleDraft = this._config.header_title ?? '';
    }
    this.config = outgoing;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        bubbles: true,
        composed: true,
        detail: { config: outgoing },
      })
    );
  }

  private _onShowHeaderChange(ev: Event) {
    const checked = haFormControlCheckedFromChangeEvent(ev);
    this._patchConfig({ show_header: checked ? undefined : false });
  }

  private _onShowScheduleEnableToggleChange(ev: Event) {
    const checked = haFormControlCheckedFromChangeEvent(ev);
    this._patchConfig({
      show_schedule_enable_toggle: checked ? undefined : false,
    });
  }

  private _onShowRepeatDaysOnCardChange(ev: Event) {
    const checked = haFormControlCheckedFromChangeEvent(ev);
    this._patchConfig({
      show_repeat_days_on_card: checked ? undefined : false,
    });
  }

  private _onHeaderTitleInput(ev: Event) {
    const t = ev.target as HTMLInputElement;
    this._headerTitleDraft = t.value;
  }

  private _onHeaderTitleBlur() {
    const v = this._headerTitleDraft.trim();
    this._patchConfig({ header_title: v ? v : undefined });
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

}
