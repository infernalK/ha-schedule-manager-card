import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PropertyValues } from 'lit';
import {
  CardConfig,
  HomeAssistant,
  Schedule,
  ScheduleGroup,
  TimeBlock,
  TimeBlockServicePayload,
} from './types';
import { ScheduleManagerServices } from './services';
import { styles } from './styles';

import './editor';

const DEFAULT_STATUS_ENTITY = 'sensor.schedule_manager_status';

const DEFAULT_BLOCK_DRAFT = {
  start: '08:00',
  end: '09:00',
  actionType: 'set_preset_mode',
  payloadStr: '{"preset_mode":"comfort"}',
};

type BlockDraft = typeof DEFAULT_BLOCK_DRAFT;

function normalizeTimeForHa(t: string): string {
  const s = t.trim();
  if (!s) {
    return '00:00:00';
  }
  const p = s.split(':');
  if (p.length === 2) {
    return `${p[0]}:${p[1]}:00`;
  }
  return s;
}

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

  @state() private _newScheduleName = '';
  @state() private _creating = false;
  /** Brouillon pour le formulaire « ajouter une plage » par planning */
  @state() private _drafts: Record<string, BlockDraft> = {};

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
    const raw = attrs?.schedules;
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return {};
    }
    return raw as Record<string, Schedule>;
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
    const totalCount = Object.keys(schedulesMap).length;
    const list =
      scheduleIds.length > 0
        ? scheduleIds.map((id) => schedulesMap[id]).filter(Boolean)
        : Object.values(schedulesMap);

    if (!list.length) {
      if (scheduleIds.length > 0 && totalCount > 0) {
        return html`
          <div class="empty-hint">
            Aucun planning ne correspond aux
            <code class="inline">schedule_ids</code>
            de la carte. Vérifiez les UUID dans les attributs du capteur
            <code class="inline">schedules</code>.
          </div>
        `;
      }
      if (totalCount === 0) {
        return html`
          <div class="empty-hint">
            Aucun planning enregistré pour l’instant. Créez-en un ci-dessous ou via
            <strong>Outils de développement → Actions</strong> :
            <code class="inline">schedule_manager.create_schedule</code>
            (service <code class="inline">name</code> obligatoire).
          </div>
          <div class="create-row">
            <input
              type="text"
              placeholder="Nom du planning (ex. Semaine)"
              .value=${this._newScheduleName}
              @input=${(e: Event) => {
                this._newScheduleName = (e.target as HTMLInputElement).value;
              }}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                  void this.createScheduleFromInput();
                }
              }}
            />
            <button
              type="button"
              ?disabled=${this._creating || !this._newScheduleName.trim()}
              @click=${() => this.createScheduleFromInput()}
            >
              ${this._creating ? 'Création…' : 'Créer le planning'}
            </button>
          </div>
        `;
      }
      return html`<div class="empty-hint">Aucun élément à afficher.</div>`;
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

  private draftFor(scheduleId: string): BlockDraft {
    return this._drafts[scheduleId] ?? DEFAULT_BLOCK_DRAFT;
  }

  private patchDraft(scheduleId: string, patch: Partial<BlockDraft>) {
    const prev = this._drafts[scheduleId] ?? { ...DEFAULT_BLOCK_DRAFT };
    this._drafts = { ...this._drafts, [scheduleId]: { ...prev, ...patch } };
  }

  private blocksToPayload(blocks: TimeBlock[]): TimeBlockServicePayload[] {
    return (blocks || []).map((b) => ({
      start_time: String(b.start_time),
      end_time: String(b.end_time),
      action_type: b.action_type,
      action_payload:
        typeof b.action_payload === 'object' && b.action_payload !== null
          ? (b.action_payload as Record<string, unknown>)
          : {},
      ...(b.id ? { id: b.id } : {}),
    }));
  }

  private renderSchedule(schedule: Schedule | undefined, group: ScheduleGroup | undefined) {
    if (!schedule) {
      return html``;
    }

    const draft = this.draftFor(schedule.id);
    const blocks = schedule.time_blocks || [];

    return html`
      <div class="schedule">
        <div class="schedule-header">
          <span>${schedule.name}</span>
          <div class="schedule-actions">
            <ha-switch
              .checked=${schedule.enabled}
              @change=${(e: Event) =>
                this.toggleSchedule(schedule.id, (e.target as HTMLInputElement).checked)}
            ></ha-switch>
            <button
              type="button"
              class="btn-danger"
              @click=${() => this.deletePlanning(schedule)}
            >
              Supprimer
            </button>
          </div>
        </div>

        <div class="subsection-title">Plages horaires</div>
        ${blocks.length === 0
          ? html`<div class="empty-hint">Aucune plage — ajoutez-en une ci-dessous.</div>`
          : null}
        ${blocks.map(
          (block, index) => html`
            <div class="time-block ${this.isActiveBlock(block) ? 'active' : ''}">
              <div class="time-block-col">
                <span
                  ><strong>${block.start_time}</strong> →
                  <strong>${block.end_time}</strong></span
                >
                <span>${block.action_type}</span>
                <span class="payload-preview"
                  >${JSON.stringify(block.action_payload ?? {})}</span
                >
              </div>
              <button
                type="button"
                class="block-remove"
                @click=${() => this.removeBlockAt(schedule, index)}
              >
                Retirer
              </button>
            </div>
          `
        )}

        <div class="add-block-form">
          <label>
            Début
            <input
              type="time"
              .value=${draft.start}
              @input=${(e: Event) =>
                this.patchDraft(schedule.id, {
                  start: (e.target as HTMLInputElement).value,
                })}
            />
          </label>
          <label>
            Fin
            <input
              type="time"
              .value=${draft.end}
              @input=${(e: Event) =>
                this.patchDraft(schedule.id, { end: (e.target as HTMLInputElement).value })}
            />
          </label>
          <label class="full-row">
            Type d’action
            <input
              type="text"
              placeholder="set_preset_mode"
              .value=${draft.actionType}
              @input=${(e: Event) =>
                this.patchDraft(schedule.id, {
                  actionType: (e.target as HTMLInputElement).value,
                })}
            />
          </label>
          <label class="full-row">
            Payload JSON
            <textarea
              .value=${draft.payloadStr}
              @input=${(e: Event) =>
                this.patchDraft(schedule.id, {
                  payloadStr: (e.target as HTMLTextAreaElement).value,
                })}
            ></textarea>
          </label>
          <button type="button" class="add-plage" @click=${() => this.addBlockToSchedule(schedule)}>
            Ajouter la plage
          </button>
        </div>

        ${group?.exclusive
          ? html`
              <button
                type="button"
                style="margin-top:10px"
                @click=${() => this.setActiveSchedule(group.id, schedule.id)}
              >
                Définir comme actif (groupe exclusif)
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

  private async deletePlanning(schedule: Schedule) {
    if (
      !confirm(
        `Supprimer définitivement le planning « ${schedule.name} » ?`
      )
    ) {
      return;
    }
    try {
      await this.services().deleteSchedule(schedule.id);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('schedule_manager.delete_schedule failed', e);
    }
  }

  private async removeBlockAt(schedule: Schedule, index: number) {
    const next = [...(schedule.time_blocks || [])];
    next.splice(index, 1);
    try {
      await this.services().updateSchedule(schedule.id, {
        time_blocks: this.blocksToPayload(next),
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('schedule_manager.update_schedule failed', e);
    }
  }

  private async addBlockToSchedule(schedule: Schedule) {
    const d = this.draftFor(schedule.id);
    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(d.payloadStr.trim() || '{}');
      if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
        throw new Error('payload doit être un objet JSON');
      }
    } catch {
      alert('Payload JSON invalide (objet attendu, ex. {"preset_mode":"comfort"})');
      return;
    }
    const actionType = d.actionType.trim();
    if (!actionType) {
      alert('Indiquez un type d’action.');
      return;
    }
    const newBlock: TimeBlockServicePayload = {
      start_time: normalizeTimeForHa(d.start),
      end_time: normalizeTimeForHa(d.end),
      action_type: actionType,
      action_payload: payload,
    };
    const merged = [...this.blocksToPayload(schedule.time_blocks || []), newBlock];
    try {
      await this.services().updateSchedule(schedule.id, { time_blocks: merged });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('schedule_manager.update_schedule failed', e);
    }
  }

  private async createScheduleFromInput() {
    const name = this._newScheduleName.trim();
    if (!name || this._creating) {
      return;
    }
    this._creating = true;
    try {
      await this.services().createSchedule(name);
      this._newScheduleName = '';
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('schedule_manager.create_schedule failed', e);
    } finally {
      this._creating = false;
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
