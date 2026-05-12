import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { CardConfig, HomeAssistant } from './types';

@customElement('schedule-manager-card-editor')
export class ScheduleManagerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  private _config?: CardConfig;

  setConfig(config: CardConfig) {
    this._config = config;
  }

  render() {
    return html`
      <div class="card-config">
        <paper-input
          label="Entité statut (optionnel)"
          .value=${this._config?.status_entity || ''}
          @value-changed=${this._statusEntityChanged}
        ></paper-input>
        <paper-input
          label="ID de groupe (optionnel)"
          .value=${this._config?.group_id || ''}
          @value-changed=${this._groupIdChanged}
        ></paper-input>
        <paper-input
          label="IDs de plannings (séparés par des virgules)"
          .value=${this._config?.schedule_ids?.join(',') || ''}
          @value-changed=${this._scheduleIdsChanged}
        ></paper-input>
      </div>
    `;
  }

  private _statusEntityChanged(ev: CustomEvent) {
    const value = (ev.detail?.value ?? '').trim();
    this._config = {
      ...(this._config || { type: 'custom:schedule-manager-card' }),
      status_entity: value || undefined,
    };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  private _groupIdChanged(ev: CustomEvent) {
    const value = (ev.detail?.value ?? '').trim();
    this._config = {
      ...(this._config || { type: 'custom:schedule-manager-card' }),
      group_id: value || undefined,
    };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  private _scheduleIdsChanged(ev: CustomEvent) {
    const raw = ev.detail?.value ?? '';
    const ids = String(raw)
      .split(',')
      .map((id: string) => id.trim())
      .filter((id: string) => id);
    this._config = {
      ...(this._config || { type: 'custom:schedule-manager-card' }),
      schedule_ids: ids.length ? ids : undefined,
    };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }
}