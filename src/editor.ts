import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from 'home-assistant-js-websocket';
import { CardConfig } from './types';

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
          label="Group ID (optional)"
          .value=${this._config?.group_id || ''}
          @value-changed=${this._groupIdChanged}
        ></paper-input>
        <paper-input
          label="Schedule IDs (comma separated)"
          .value=${this._config?.schedule_ids?.join(',') || ''}
          @value-changed=${this._scheduleIdsChanged}
        ></paper-input>
      </div>
    `;
  }

  private _groupIdChanged(ev: any) {
    this._config = { ...this._config!, group_id: ev.detail.value };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  private _scheduleIdsChanged(ev: any) {
    const ids = ev.detail.value.split(',').map((id: string) => id.trim()).filter((id: string) => id);
    this._config = { ...this._config!, schedule_ids: ids };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }
}