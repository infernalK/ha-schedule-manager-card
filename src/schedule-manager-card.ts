import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PropertyValues } from 'lit';
import { CardConfig, HomeAssistant, Schedule, ScheduleGroup, TimeBlock } from './types';
import { ScheduleManagerServices } from './services';
import { styles } from './styles';

import './editor';

const DEFAULT_STATUS_ENTITY = 'sensor.schedule_manager_status';

function parseTimeToMinutes(t: string): number {
  const parts = String(t).split(':').map((p) => Number(p));
  const h = parts[0] ?? 0;
  const m = parts[1] ?? 0;
  const s = parts[2] ?? 0;
  return h * 60 + m + s / 60;
}

function nowMinutes(): number {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;
}

@customElement('schedule-manager-card')
export class ScheduleManagerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  static get styles() {
    return styles;
  }

  static getConfigElement() {
    return document.createElement('schedule-manager-card-editor');
  }

  static getStubConfig() {
    return { type: 'custom:schedule-manager-card' };
  }

  protected updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('hass') && this.hass) {
      void this.requestUpdate();
    }
  }

  private statusEntityId(): string {
    return this.config?.status_entity?.trim() || DEFAULT_STATUS_ENTITY;
  }

  private getSchedulesRecord(): Record<string, Schedule> {
    const state = this.hass?.states[this.statusEntityId()];
    const attrs = state?.attributes as Record<string, unknown> | undefined;
    const raw = attrs?.schedules as Record<string, Schedule> | undefined;
    return raw && typeof raw === 'object' ? raw : {};
  }

  private getGroupsRecord(): Record<string, ScheduleGroup> {
    const state = this.hass?.states[this.statusEntityId()];
    const attrs = state?.attributes as Record<string, unknown> | undefined;
    const raw = attrs?.groups as Record<string, ScheduleGroup> | undefined;
    return raw && typeof raw === 'object' ? raw : {};
  }

  private getCurrentBlockId(): string | undefined {
    const state = this.hass?.states[this.statusEntityId()];
    const attrs = state?.attributes as Record<string, unknown> | undefined;
    const cur = attrs?.current_time_block as { id?: string } | null | undefined;
    return cur?.id;
  }

  private services(): ScheduleManagerServices {
    return new ScheduleManagerServices(this.hass);
  }

  render() {
    if (!this.hass || !this.config) {
      return html`<ha-card><div class="card-content">Chargement…</div></ha-card>`;
    }

    const groupId = this.config.group_id?.trim();
    const scheduleIds = this.config.schedule_ids || [];
    const schedulesMap = this.getSchedulesRecord();
    const groupsMap = this.getGroupsRecord();

    if (!this.hass.states[this.statusEntityId()]) {
      return html`
        <ha-card>
          <div class="card-header">Schedule Manager</div>
          <div class="card-content">
            Entité introuvable : <code>${this.statusEntityId()}</code>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card class="card">
        <div class="card-header">Schedule Manager</div>
        <div class="card-content">
          ${groupId
            ? this.renderGroup(groupsMap[groupId], schedulesMap)
            : this.renderSchedulesList(scheduleIds, schedulesMap)}
        </div>
      </ha-card>
    `;
  }

  private renderSchedulesList(scheduleIds: string[], schedulesMap: Record<string, Schedule>) {
    const list =
      scheduleIds.length > 0
        ? scheduleIds.map((id) => schedulesMap[id]).filter(Boolean)
        : Object.values(schedulesMap);

    if (!list.length) {
      return html`<div>Aucun planning à afficher. Créez-en via les services ou précisez des IDs dans la config.</div>`;
    }

    return html`${list.map((s) => this.renderSchedule(s, undefined))}`;
  }

  private renderGroup(
    group: ScheduleGroup | undefined,
    schedulesMap: Record<string, Schedule>
  ) {
    if (!group) {
      return html`<div>Groupe introuvable.</div>`;
    }

    return html`
      <div class="group">
        <h3>${group.name}</h3>
        ${group.schedules.map((scheduleId) => {
          const schedule = schedulesMap[scheduleId];
          return this.renderSchedule(schedule, group);
        })}
      </div>
    `;
  }

  private renderSchedule(schedule: Schedule | undefined, group: ScheduleGroup | undefined) {
    if (!schedule) {
      return html``;
    }

    return html`
      <div class="schedule">
        <div class="schedule-header">
          <span>${schedule.name}</span>
          <ha-switch
            .checked=${schedule.enabled}
            @change=${(e: Event) =>
              this.toggleSchedule(schedule.id, (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>
        ${(schedule.time_blocks || []).map((block) => html`
          <div class="time-block ${this.isActiveBlock(block) ? 'active' : ''}">
            <span>${block.start_time} – ${block.end_time}</span>
            <span>${block.action_type}</span>
          </div>
        `)}
        ${group?.exclusive
          ? html`
              <button
                type="button"
                @click=${() => this.setActiveSchedule(group.id, schedule.id)}
              >
                Définir comme actif
              </button>
            `
          : ''}
      </div>
    `;
  }

  private isActiveBlock(block: TimeBlock): boolean {
    const curId = this.getCurrentBlockId();
    if (curId && block.id === curId) {
      return true;
    }
    const start = parseTimeToMinutes(block.start_time);
    const end = parseTimeToMinutes(block.end_time);
    const now = nowMinutes();
    if (end > start) {
      return now >= start && now < end;
    }
    if (end < start) {
      return now >= start || now < end;
    }
    return false;
  }

  private async toggleSchedule(scheduleId: string, enabled: boolean) {
    try {
      if (enabled) {
        await this.services().enableSchedule(scheduleId);
      } else {
        await this.services().disableSchedule(scheduleId);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('schedule_manager service call failed', e);
    }
  }

  private async setActiveSchedule(groupId: string, scheduleId: string) {
    try {
      await this.services().setActiveSchedule(groupId, scheduleId);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('schedule_manager.set_active_schedule failed', e);
    }
  }

  setConfig(config: CardConfig) {
    if (!config.type) {
      throw new Error('Type must be defined');
    }
    this.config = config;
  }

  getCardSize() {
    return 3;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'schedule-manager-card': ScheduleManagerCard;
  }
}

const w = window as any;
w.customCards = w.customCards || [];
w.customCards.push({
  type: 'schedule-manager-card',
  name: 'Schedule Manager',
  description: 'Planning Schedule Manager',
});
