import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { CardConfig, HomeAssistant } from './types';

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
  `;

  setConfig(config: CardConfig) {
    this._config = {
      type: 'custom:schedule-manager-card',
      ...config,
    };
  }

  render() {
    const hass = this.hass as HomeAssistant | undefined;
    if (!hass) {
      return html`<div class="card-config">Chargement du tableau de bord…</div>`;
    }

    return html`
      <div class="card-config">
        <ha-entity-picker
          .hass=${hass}
          label="Capteur Schedule Manager"
          .value=${this._config?.status_entity ?? ''}
          .includeDomains=${['sensor']}
          .allowCustomEntity=${true}
          @value-changed=${this._statusEntityChanged}
        ></ha-entity-picker>
        <ha-textfield
          label="ID de groupe (optionnel)"
          .value=${this._config?.group_id ?? ''}
          @input=${this._groupIdChanged}
        ></ha-textfield>
        <ha-textfield
          label="IDs de plannings (optionnel, virgules — vide = tous)"
          .value=${this._config?.schedule_ids?.join(', ') ?? ''}
          @input=${this._scheduleIdsChanged}
        ></ha-textfield>
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
