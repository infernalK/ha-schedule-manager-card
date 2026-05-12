import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from 'home-assistant-js-websocket';
import { CardConfig, Schedule, ScheduleGroup } from './types';
import { ScheduleManagerServices } from './services';
import { styles } from './styles';

@customElement('schedule-manager-card')
export class ScheduleManagerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  private services: ScheduleManagerServices;

  constructor() {
    super();
    this.services = new ScheduleManagerServices(this.hass);
  }

  static get styles() {
    return styles;
  }

  render() {
    const groupId = this.config.group_id;
    const scheduleIds = this.config.schedule_ids || [];

    // For simplicity, assume we get schedules from hass.states or config
    // In real implementation, fetch from backend entities
    const schedules: Schedule[] = []; // Placeholder
    const groups: ScheduleGroup[] = []; // Placeholder

    return html`
      <ha-card class="card">
        <div class="card-header">Schedule Manager</div>
        <div class="card-content">
          ${groupId ? this.renderGroup(groups.find(g => g.id === groupId)) : this.renderSchedules(schedules.filter(s => scheduleIds.includes(s.id)))}
        </div>
      </ha-card>
    `;
  }

  private renderGroup(group?: ScheduleGroup) {
    if (!group) return html`<div>No group found</div>`;

    return html`
      <div class="group">
        <h3>${group.name}</h3>
        ${group.schedules.map(scheduleId => {
          const schedule = this.getScheduleById(scheduleId);
          return this.renderSchedule(schedule, group);
        })}
      </div>
    `;
  }

  private renderSchedules(schedules: Schedule[]) {
    return schedules.map(schedule => this.renderSchedule(schedule));
  }

  private renderSchedule(schedule?: Schedule, group?: ScheduleGroup) {
    if (!schedule) return html``;

    return html`
      <div class="schedule">
        <div class="schedule-header">
          <span>${schedule.name}</span>
          <ha-switch
            .checked=${schedule.enabled}
            @change=${(e: Event) => this.toggleSchedule(schedule.id, (e.target as any).checked)}
          ></ha-switch>
        </div>
        ${schedule.time_blocks.map(block => html`
          <div class="time-block ${this.isActiveBlock(block) ? 'active' : ''}">
            <span>${block.start_time} - ${block.end_time}</span>
            <span>${block.action_type}</span>
          </div>
        `)}
        ${group?.exclusive ? html`
          <button @click=${() => this.setActiveSchedule(group.id, schedule.id)}>Set Active</button>
        ` : ''}
      </div>
    `;
  }

  private isActiveBlock(block: any): boolean {
    // Placeholder: implement logic to check if block is current
    return false;
  }

  private getScheduleById(id: string): Schedule | undefined {
    // Placeholder: implement fetching schedule
    return undefined;
  }

  private async toggleSchedule(scheduleId: string, enabled: boolean) {
    if (enabled) {
      await this.services.enableSchedule(scheduleId);
    } else {
      await this.services.disableSchedule(scheduleId);
    }
  }

  private async setActiveSchedule(groupId: string, scheduleId: string) {
    await this.services.setActiveSchedule(groupId, scheduleId);
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