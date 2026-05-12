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
import { domainsForActionType, entityMatchesDomains } from './entity-domains';
import {
  blockTimelineFill,
  blocksToTimelineSegments,
  MINUTES_PER_DAY,
  minutesToHaTime,
  nowPercentOfDay,
  SCHEDULE_MANAGER_COLOR_KEY,
  touchBoundariesBetweenBlocks,
  type TouchBoundary,
} from './timeline-helpers';

import './editor';

const DEFAULT_STATUS_ENTITY = 'sensor.schedule_manager_status';

const WEEKDAY_LABELS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const;

/** Graduations alignées sur la journée (comme le planning clim intégré HA). */
const TIMELINE_SCALE_TICKS: {
  pct: number;
  label: string;
  align: 'start' | 'center' | 'end';
}[] = [
  { pct: 0, label: '00:00', align: 'start' },
  { pct: 25, label: '06:00', align: 'center' },
  { pct: 50, label: '12:00', align: 'center' },
  { pct: 75, label: '18:00', align: 'center' },
  { pct: 100, label: '24:00', align: 'end' },
];

/** Pastilles de couleur rapides (+ valeur du sélecteur). */
const BLOCK_COLOR_PRESETS = [
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#9C27B0',
  '#00BCD4',
  '#E91E63',
  '#795548',
  '#607D8B',
] as const;

function payloadWithoutEntityId(payload: unknown): Record<string, unknown> {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {};
  }
  const rec = { ...(payload as Record<string, unknown>) };
  delete rec.entity_id;
  return rec;
}

/** JSON éditable : sans entity_id ni couleur (couleur = champ dédié). */
function payloadForJsonEditor(payload: unknown): Record<string, unknown> {
  const rec = payloadWithoutEntityId(payload);
  delete rec[SCHEDULE_MANAGER_COLOR_KEY];
  return rec;
}

/** Empêcher qu’une même couleur fasse doublon avec une autre plage identique en action. */
function payloadForDuplicateCheck(payload: unknown): Record<string, unknown> {
  const rec = payloadWithoutEntityId(payload);
  delete rec[SCHEDULE_MANAGER_COLOR_KEY];
  return rec;
}

function entityIdsFromPayload(payload: unknown): string[] {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return [];
  }
  const e = (payload as Record<string, unknown>).entity_id;
  if (typeof e === 'string') {
    return [e];
  }
  if (Array.isArray(e)) {
    return e.filter((x): x is string => typeof x === 'string');
  }
  return [];
}

function defaultNewBlock(): TimeBlock {
  return {
    start_time: '12:00:00',
    end_time: '13:00:00',
    action_type: 'climate.set_preset_mode',
    action_payload: { preset_mode: 'comfort' },
  };
}

function findDuplicateBlockIndex(blocks: TimeBlock[]): number {
  const seen = new Set<string>();
  for (let i = 0; i < blocks.length; i++) {
    const fp = blockFingerprint(blocks[i]);
    if (seen.has(fp)) {
      return i;
    }
    seen.add(fp);
  }
  return -1;
}

interface VisualEditState {
  scheduleId: string;
  blocks: TimeBlock[];
  repeatDays: number[];
  selectedIndex: number;
}

/** Format HH:MM[:SS] pour les services HA (évite `<input type="time">` = crash app Mac Catalyst). */
function normalizeTimeForHa(t: string): string {
  const s = t.trim();
  if (!s) {
    return '00:00:00';
  }
  const p = s.split(':').map((x) => x.trim());
  if (p.length < 2) {
    return '00:00:00';
  }
  const h = Math.min(23, Math.max(0, parseInt(p[0] ?? '0', 10)));
  const m = Math.min(59, Math.max(0, parseInt(p[1] ?? '0', 10)));
  const sec =
    p[2] !== undefined && p[2] !== ''
      ? Math.min(59, Math.max(0, parseInt(p[2] ?? '0', 10)))
      : 0;
  if ([h, m, sec].some((n) => Number.isNaN(n))) {
    return '00:00:00';
  }
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function haTimeToHHMM(t: string): string {
  return normalizeTimeForHa(t).slice(0, 5);
}

function sortKeysDeep(value: unknown): unknown {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(sortKeysDeep);
  }
  const rec = value as Record<string, unknown>;
  const keys = Object.keys(rec).sort();
  const out: Record<string, unknown> = {};
  for (const k of keys) {
    out[k] = sortKeysDeep(rec[k]);
  }
  return out;
}

function stablePayloadString(payload: unknown): string {
  return JSON.stringify(sortKeysDeep(payload ?? {}));
}

/** Empêche deux entrées identiques (horaires + action + payload normalisé). */
function blockFingerprint(block: {
  start_time: string;
  end_time: string;
  action_type: string;
  action_payload?: unknown;
}): string {
  const st = normalizeTimeForHa(block.start_time);
  const et = normalizeTimeForHa(block.end_time);
  const at = String(block.action_type).trim();
  return `${st}|${et}|${at}|${stablePayloadString(payloadForDuplicateCheck(block.action_payload))}`;
}

@customElement('schedule-manager-card')
export class ScheduleManagerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  @state() private _newScheduleName = '';
  @state() private _creating = false;
  /** Éditeur plein écran (frise + détail plage), style config HA */
  @state() private _visualEdit: VisualEditState | null = null;
  @state() private _visualPayloadStr = '';
  @state() private _visualEntityPickerNonce = 0;

  /** Glisser-déposer sur la frise (pas @state : évite un render à chaque pixel). */
  private _boundaryDrag:
    | null
    | {
        pointerId: number;
        leftIdx: number;
        rightIdx: number;
        minM: number;
        maxM: number;
        rail: HTMLElement;
        handle: HTMLElement;
      } = null;

  private _onBoundaryMove = (ev: PointerEvent) => {
    const d = this._boundaryDrag;
    if (!d || !this._visualEdit || ev.pointerId !== d.pointerId) {
      return;
    }
    const rect = d.rail.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, ev.clientX - rect.left));
    const pct = (x / rect.width) * 100;
    let m = Math.round((pct / 100) * MINUTES_PER_DAY);
    m = Math.max(d.minM, Math.min(d.maxM, m));
    const ha = minutesToHaTime(m);
    const blocks = [...this._visualEdit.blocks];
    const L = blocks[d.leftIdx];
    const R = blocks[d.rightIdx];
    if (!L || !R) {
      return;
    }
    blocks[d.leftIdx] = { ...L, end_time: ha };
    blocks[d.rightIdx] = { ...R, start_time: ha };
    this._visualEdit = { ...this._visualEdit, blocks };
    this.requestUpdate();
  };

  private _onBoundaryUp = (ev: PointerEvent) => {
    const d = this._boundaryDrag;
    if (!d) {
      return;
    }
    window.removeEventListener('pointermove', this._onBoundaryMove);
    window.removeEventListener('pointerup', this._onBoundaryUp);
    window.removeEventListener('pointercancel', this._onBoundaryUp);
    if (ev.pointerId === d.pointerId) {
      try {
        d.handle.releasePointerCapture(ev.pointerId);
      } catch {
        /* ignore */
      }
    }
    this._boundaryDrag = null;
  };

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
    if (changed.has('_visualEdit') && this._visualEdit) {
      requestAnimationFrame(() => {
        const m = this.shadowRoot?.querySelector('.sm-modal') as HTMLElement | undefined;
        m?.focus();
      });
    }
  }

  private statusEntityId(): string {
    return this.config?.status_entity?.trim() || DEFAULT_STATUS_ENTITY;
  }

  /**
   * La clé de l’objet `attributes.schedules` est l’identifiant canonique côté stockage.
   * Si le champ `id` à l’intérieur diverge (fichier JSON édité, ancien bug), les actions / suppression
   * visaient le mauvais UUID — d’où un planning « fantôme » ou introuvable.
   */
  private withCanonicalId(storageKey: string, schedule: Schedule): Schedule {
    if (schedule.id === storageKey) {
      return schedule;
    }
    return { ...schedule, id: storageKey };
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
      <div>
        <ha-card class="card">
          <div class="card-header">Schedule Manager</div>
          <div class="card-content">
            ${groupId
              ? this.renderGroup(groupsMap[groupId], schedulesMap)
              : this.renderSchedulesList(scheduleIds, schedulesMap)}
          </div>
        </ha-card>
        ${this.renderVisualEditorOverlay()}
      </div>
    `;
  }

  private renderSchedulesList(scheduleIds: string[], schedulesMap: Record<string, Schedule>) {
    const totalCount = Object.keys(schedulesMap).length;
    const list: Schedule[] =
      scheduleIds.length > 0
        ? scheduleIds
            .map((id) => {
              const sch = schedulesMap[id];
              return sch ? this.withCanonicalId(id, sch) : undefined;
            })
            .filter((s): s is Schedule => Boolean(s))
        : Object.entries(schedulesMap).map(([id, sch]) =>
            this.withCanonicalId(id, sch)
          );

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

    const refs = group.schedules || [];
    const missing = refs.filter((id) => !schedulesMap[id]);

    return html`
      <div class="group">
        <h3>${group.name}</h3>
        ${missing.length
          ? html`<div class="empty-hint">
              Références de planning absentes du stockage :
              <code class="inline">${missing.join(', ')}</code>
            </div>`
          : null}
        ${refs
          .filter((scheduleId) => schedulesMap[scheduleId])
          .map((scheduleId) => {
            const schedule = schedulesMap[scheduleId]!;
            return this.renderSchedule(
              this.withCanonicalId(scheduleId, schedule),
              group
            );
          })}
      </div>
    `;
  }

  private renderTimelineScale() {
    return html`
      <div class="timeline-scale" aria-hidden="true">
        ${TIMELINE_SCALE_TICKS.map(
          (t) => html`
            <div
              class="timeline-scale-item timeline-scale-item--${t.align}"
              style="left:${t.pct}%"
            >
              <span class="timeline-scale-mark"></span>
              <span class="timeline-scale-label">${t.label}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  private renderDayTimeline(blocks: TimeBlock[]) {
    const segments = blocksToTimelineSegments(blocks);
    const nowPct = nowPercentOfDay();
    return html`
      <div
        class="timeline-frise timeline-frise--hvac"
        role="img"
        aria-label="Plages sur 24 heures"
      >
        <div class="timeline-rail timeline-rail--continuous">
          ${segments.map((s) => {
            const blk = blocks[s.blockIndex];
            const fill = blk ? blockTimelineFill(blk) : `hsl(${s.hue}, 58%, 42%)`;
            return html`
              <div
                class="timeline-segment timeline-segment--hvac"
                style="left:${s.leftPct}%;width:${s.widthPct}%;background:${fill}"
                title=${s.label}
              >
                <span class="timeline-segment-label">${s.label}</span>
              </div>
            `;
          })}
          <div class="timeline-now" style="left:${nowPct}%"></div>
        </div>
        ${this.renderTimelineScale()}
      </div>
    `;
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

        <button
          type="button"
          class="btn-open-config"
          @click=${() => this.openVisualEditor(schedule)}
        >
          Configurer les plages…
        </button>

        ${blocks.length
          ? html`
              <div class="subsection-title">Vue 24 h</div>
              <div class="timeline-hint">
                Aperçu graphique — ouvrez la configuration pour modifier les plages.
              </div>
              ${this.renderDayTimeline(blocks)}
            `
          : html`
              <div class="empty-hint">
                Aucune plage — utilisez « Configurer les plages… » pour définir des créneaux.
              </div>
            `}

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

  private openVisualEditor(schedule: Schedule) {
    const blocks = JSON.parse(
      JSON.stringify(schedule.time_blocks || [])
    ) as TimeBlock[];
    this._visualEdit = {
      scheduleId: schedule.id,
      blocks,
      repeatDays: [
        ...(schedule.repeat_days && schedule.repeat_days.length > 0
          ? schedule.repeat_days
          : [0, 1, 2, 3, 4, 5, 6]),
      ],
      selectedIndex: 0,
    };
    this.syncPayloadStrFromSelection();
  }

  private closeVisualEditor() {
    this.endBoundaryDrag();
    this._visualEdit = null;
    this._visualPayloadStr = '';
  }

  private endBoundaryDrag() {
    const d = this._boundaryDrag;
    window.removeEventListener('pointermove', this._onBoundaryMove);
    window.removeEventListener('pointerup', this._onBoundaryUp);
    window.removeEventListener('pointercancel', this._onBoundaryUp);
    if (d) {
      try {
        d.handle.releasePointerCapture(d.pointerId);
      } catch {
        /* ignore */
      }
    }
    this._boundaryDrag = null;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.endBoundaryDrag();
  }

  private onBoundaryPointerDown(ev: PointerEvent, tb: TouchBoundary) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!this._visualEdit) {
      return;
    }
    const rail = (ev.currentTarget as HTMLElement).closest(
      '.sm-editor-rail'
    ) as HTMLElement | null;
    if (!rail) {
      return;
    }
    this.endBoundaryDrag();
    const handle = ev.currentTarget as HTMLElement;
    this._boundaryDrag = {
      pointerId: ev.pointerId,
      leftIdx: tb.leftBlockIndex,
      rightIdx: tb.rightBlockIndex,
      minM: tb.minMinute,
      maxM: tb.maxMinute,
      rail,
      handle,
    };
    handle.setPointerCapture(ev.pointerId);
    window.addEventListener('pointermove', this._onBoundaryMove);
    window.addEventListener('pointerup', this._onBoundaryUp);
    window.addEventListener('pointercancel', this._onBoundaryUp);
  }

  private syncPayloadStrFromSelection() {
    if (!this._visualEdit) {
      this._visualPayloadStr = '{}';
      return;
    }
    const b = this._visualEdit.blocks[this._visualEdit.selectedIndex];
    if (!b) {
      this._visualPayloadStr = '{}';
      return;
    }
    try {
      this._visualPayloadStr = JSON.stringify(
        payloadForJsonEditor(b.action_payload),
        null,
        2
      );
    } catch {
      this._visualPayloadStr = '{}';
    }
  }

  private applyPayloadEditorToVisualBlocks(): boolean {
    if (!this._visualEdit) {
      return false;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    if (!block) {
      return true;
    }
    try {
      const raw = this._visualPayloadStr.trim() || '{}';
      const extra = JSON.parse(raw) as Record<string, unknown>;
      if (typeof extra !== 'object' || extra === null || Array.isArray(extra)) {
        throw new Error('invalid');
      }
      delete extra.entity_id;
      delete extra[SCHEDULE_MANAGER_COLOR_KEY];
      const entityIds = entityIdsFromPayload(block.action_payload);
      const action_payload: Record<string, unknown> = { ...extra };
      if (entityIds.length === 1) {
        action_payload.entity_id = entityIds[0];
      } else if (entityIds.length > 1) {
        action_payload.entity_id = [...entityIds];
      }
      const prevRec =
        typeof block.action_payload === 'object' && block.action_payload !== null
          ? (block.action_payload as Record<string, unknown>)
          : {};
      const prevColor = prevRec[SCHEDULE_MANAGER_COLOR_KEY];
      if (typeof prevColor === 'string') {
        action_payload[SCHEDULE_MANAGER_COLOR_KEY] = prevColor;
      }
      const nextBlocks = [...this._visualEdit.blocks];
      nextBlocks[sel] = { ...block, action_payload };
      this._visualEdit = { ...this._visualEdit, blocks: nextBlocks };
      return true;
    } catch {
      alert('Payload JSON invalide pour la plage sélectionnée (objet attendu).');
      return false;
    }
  }

  private visualToggleDay(day: number) {
    if (!this._visualEdit) {
      return;
    }
    let days = [...this._visualEdit.repeatDays];
    if (days.includes(day)) {
      days = days.filter((d) => d !== day);
    } else {
      days = [...days, day].sort((a, b) => a - b);
    }
    if (days.length === 0) {
      alert('Sélectionnez au moins un jour.');
      return;
    }
    this._visualEdit = { ...this._visualEdit, repeatDays: days };
  }

  private visualSelectBlock(index: number) {
    if (!this._visualEdit) {
      return;
    }
    if (!this.applyPayloadEditorToVisualBlocks()) {
      return;
    }
    const max = this._visualEdit.blocks.length - 1;
    const idx = Math.max(0, Math.min(index, max));
    this._visualEdit = { ...this._visualEdit, selectedIndex: idx };
    this.syncPayloadStrFromSelection();
  }

  private visualPatchSelected(patch: Partial<TimeBlock>) {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const cur = this._visualEdit.blocks[sel];
    if (!cur) {
      return;
    }
    const nextBlocks = [...this._visualEdit.blocks];
    nextBlocks[sel] = { ...cur, ...patch } as TimeBlock;
    this._visualEdit = { ...this._visualEdit, blocks: nextBlocks };
  }

  private visualAddBlock() {
    if (!this._visualEdit) {
      return;
    }
    if (!this.applyPayloadEditorToVisualBlocks()) {
      return;
    }
    const nb = defaultNewBlock();
    const nextBlocks = [...this._visualEdit.blocks, nb];
    const fp = blockFingerprint(nb);
    for (const b of this._visualEdit.blocks) {
      if (blockFingerprint(b) === fp) {
        alert('Une plage identique existe déjà — modifiez les horaires ou le service.');
        return;
      }
    }
    this._visualEdit = {
      ...this._visualEdit,
      blocks: nextBlocks,
      selectedIndex: nextBlocks.length - 1,
    };
    this.syncPayloadStrFromSelection();
    this._visualEntityPickerNonce += 1;
  }

  private visualRemoveSelected() {
    if (!this._visualEdit) {
      return;
    }
    if (!this.applyPayloadEditorToVisualBlocks()) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const nextBlocks = this._visualEdit.blocks.filter((_, i) => i !== sel);
    let nextSel = sel;
    if (nextSel >= nextBlocks.length) {
      nextSel = Math.max(0, nextBlocks.length - 1);
    }
    this._visualEdit = {
      ...this._visualEdit,
      blocks: nextBlocks,
      selectedIndex: nextSel,
    };
    this.syncPayloadStrFromSelection();
    this._visualEntityPickerNonce += 1;
  }

  private entityFilterVisualEditor(): (entityId: string) => boolean {
    if (!this._visualEdit) {
      return () => true;
    }
    const b = this._visualEdit.blocks[this._visualEdit.selectedIndex];
    const domains = domainsForActionType(b?.action_type ?? '');
    return (entityId: string) => entityMatchesDomains(entityId, domains);
  }

  private visualOnEntitySelected(ev: CustomEvent<{ value?: string }>) {
    const v = String(ev.detail?.value ?? '').trim();
    if (!v || !this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    if (!block) {
      return;
    }
    const ids = entityIdsFromPayload(block.action_payload);
    if (ids.includes(v)) {
      return;
    }
    const nextIds = [...ids, v];
    const base =
      typeof block.action_payload === 'object' && block.action_payload !== null
        ? { ...(block.action_payload as Record<string, unknown>) }
        : {};
    if (nextIds.length === 1) {
      base.entity_id = nextIds[0];
    } else {
      base.entity_id = nextIds;
    }
    this.visualPatchSelected({ action_payload: base });
    this._visualEntityPickerNonce += 1;
  }

  private visualRemoveEntity(entityId: string) {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    if (!block) {
      return;
    }
    const ids = entityIdsFromPayload(block.action_payload).filter((e) => e !== entityId);
    const base =
      typeof block.action_payload === 'object' && block.action_payload !== null
        ? { ...(block.action_payload as Record<string, unknown>) }
        : {};
    delete base.entity_id;
    if (ids.length === 1) {
      base.entity_id = ids[0];
    } else if (ids.length > 1) {
      base.entity_id = ids;
    }
    this.visualPatchSelected({ action_payload: base });
  }

  private async saveVisualEditor() {
    if (!this._visualEdit) {
      return;
    }
    if (!this.applyPayloadEditorToVisualBlocks()) {
      return;
    }
    const { scheduleId, blocks, repeatDays } = this._visualEdit;
    for (const b of blocks) {
      if (!String(b.action_type ?? '').trim()) {
        alert('Chaque plage doit avoir un type d’action (service).');
        return;
      }
    }
    const dupAt = findDuplicateBlockIndex(blocks);
    if (dupAt >= 0) {
      alert(
        `Deux plages identiques (horaires + action + payload) — modifiez l’entrée n° ${dupAt + 1}.`
      );
      return;
    }
    try {
      await this.services().updateSchedule(scheduleId, {
        repeat_days: repeatDays,
        time_blocks: this.blocksToPayload(blocks),
      });
      this.closeVisualEditor();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('schedule_manager.update_schedule failed', e);
    }
  }

  private renderClimatePresetSelect(selected: TimeBlock) {
    const modes = this.getClimatePresetModesForSelected();
    if (!modes?.length) {
      return html``;
    }
    const cur = String(
      (selected.action_payload as Record<string, unknown>)?.preset_mode ?? ''
    );
    const orphan = cur && !modes.includes(cur);
    return html`
      <label class="sm-form-label">
        Mode préréglé
        <select
          class="sm-select"
          .value=${cur}
          @change=${(e: Event) =>
            this.visualSetPresetMode((e.target as HTMLSelectElement).value)}
        >
          ${orphan ? html`<option value=${cur}>${cur} (actuel)</option>` : null}
          ${modes.map((m) => html`<option value=${m}>${m}</option>`)}
        </select>
      </label>
    `;
  }

  private getClimatePresetModesForSelected(): string[] | null {
    if (!this.hass || !this._visualEdit) {
      return null;
    }
    const block = this._visualEdit.blocks[this._visualEdit.selectedIndex];
    if (!block || block.action_type.trim() !== 'climate.set_preset_mode') {
      return null;
    }
    const ids = entityIdsFromPayload(block.action_payload);
    for (const id of ids) {
      if (!id.startsWith('climate.')) {
        continue;
      }
      const st = this.hass.states[id];
      if (!st) {
        continue;
      }
      const pm = st.attributes?.preset_modes;
      if (Array.isArray(pm) && pm.every((x): x is string => typeof x === 'string')) {
        return pm;
      }
    }
    return null;
  }

  private visualSetPresetMode(mode: string) {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    if (!block) {
      return;
    }
    const base =
      typeof block.action_payload === 'object' && block.action_payload !== null
        ? { ...(block.action_payload as Record<string, unknown>) }
        : {};
    base.preset_mode = mode;
    this.visualPatchSelected({ action_payload: base });
    this.syncPayloadStrFromSelection();
  }

  private hasCustomBlockColor(block: TimeBlock): boolean {
    const p = block.action_payload;
    if (!p || typeof p !== 'object') {
      return false;
    }
    return typeof (p as Record<string, unknown>)[SCHEDULE_MANAGER_COLOR_KEY] === 'string';
  }

  private blockColorPickerHex(block: TimeBlock): string {
    const p = block.action_payload;
    if (p && typeof p === 'object') {
      const c = (p as Record<string, unknown>)[SCHEDULE_MANAGER_COLOR_KEY];
      if (typeof c === 'string' && /^#[0-9A-Fa-f]{6}$/.test(c.trim())) {
        return c.trim();
      }
    }
    return '#2196F3';
  }

  private visualSetBlockColor(hex: string) {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    if (!block) {
      return;
    }
    const base =
      typeof block.action_payload === 'object' && block.action_payload !== null
        ? { ...(block.action_payload as Record<string, unknown>) }
        : {};
    base[SCHEDULE_MANAGER_COLOR_KEY] = hex;
    this.visualPatchSelected({ action_payload: base });
  }

  private visualClearBlockColor() {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    if (!block) {
      return;
    }
    const base =
      typeof block.action_payload === 'object' && block.action_payload !== null
        ? { ...(block.action_payload as Record<string, unknown>) }
        : {};
    delete base[SCHEDULE_MANAGER_COLOR_KEY];
    this.visualPatchSelected({ action_payload: base });
  }

  private renderBlockColorControls(block: TimeBlock) {
    const pickerVal = this.blockColorPickerHex(block);
    const custom = this.hasCustomBlockColor(block);
    return html`
      <div class="sm-form-label sm-color-field">
        <span class="sm-color-field-title">Couleur sur la frise</span>
        <div class="sm-color-row">
          <input
            type="color"
            class="sm-color-native"
            .value=${pickerVal}
            @input=${(e: Event) =>
              this.visualSetBlockColor((e.target as HTMLInputElement).value)}
          />
          <div class="sm-color-presets" aria-hidden="true">
            ${BLOCK_COLOR_PRESETS.map(
              (hex) => html`
                <button
                  type="button"
                  class="sm-color-swatch"
                  style="background:${hex}"
                  title=${hex}
                  aria-label="Appliquer la couleur ${hex}"
                  @click=${() => this.visualSetBlockColor(hex)}
                ></button>
              `
            )}
          </div>
          <button
            type="button"
            class="sm-color-reset"
            ?disabled=${!custom}
            @click=${() => this.visualClearBlockColor()}
          >
            Défaut
          </button>
        </div>
      </div>
    `;
  }

  private renderEditorTimeline(blocks: TimeBlock[], selectedIndex: number) {
    const segments = blocksToTimelineSegments(blocks);
    const boundaries = touchBoundariesBetweenBlocks(blocks);
    const nowPct = nowPercentOfDay();
    return html`
      <div
        class="timeline-frise sm-editor-frise timeline-frise--hvac"
        role="group"
        aria-label="Plages sur 24 heures — cliquer pour sélectionner, poignées pour ajuster"
      >
        <div class="sm-frise-heading">
          <span class="sm-frise-heading-label">Heure</span>
        </div>
        <div class="timeline-rail sm-editor-rail timeline-rail--continuous">
          ${segments.map((s) => {
            const blk = blocks[s.blockIndex];
            const fill = blk ? blockTimelineFill(blk) : `hsl(${s.hue}, 58%, 42%)`;
            return html`
              <div
                class="timeline-segment timeline-segment--hvac ${s.blockIndex === selectedIndex
                  ? 'is-selected'
                  : ''}"
                style="left:${s.leftPct}%;width:${s.widthPct}%;background:${fill}"
                title=${s.label}
                @click=${() => this.visualSelectBlock(s.blockIndex)}
              >
                <span class="timeline-segment-label">${s.label}</span>
              </div>
            `;
          })}
          ${boundaries.map(
            (tb) => html`
              <button
                type="button"
                class="timeline-boundary-handle"
                style="left:${tb.pct}%"
                aria-label="Ajuster la transition entre deux plages"
                title="Glisser pour déplacer la transition"
                @pointerdown=${(e: PointerEvent) => this.onBoundaryPointerDown(e, tb)}
              ></button>
            `
          )}
          <div class="timeline-now" style="left:${nowPct}%"></div>
        </div>
        ${this.renderTimelineScale()}
      </div>
    `;
  }

  private renderVisualEditorOverlay() {
    const v = this._visualEdit;
    if (!v || !this.hass) {
      return html``;
    }
    const schedulesMap = this.getSchedulesRecord();
    const raw = schedulesMap[v.scheduleId];
    if (!raw) {
      return html``;
    }
    const schedule = this.withCanonicalId(v.scheduleId, raw);
    const blocks = v.blocks;
    const sel = v.selectedIndex;
    const selected = blocks[sel];

    return html`
      <div
        class="sm-overlay"
        @click=${(e: Event) => {
          if (e.target === e.currentTarget) {
            this.closeVisualEditor();
          }
        }}
      >
        <div
        class="sm-modal"
        tabindex="-1"
        @click=${(e: Event) => e.stopPropagation()}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            this.closeVisualEditor();
          }
        }}
        >
          <div class="sm-modal-head">
            <h2>${schedule.name}</h2>
            <button
              type="button"
              class="sm-icon-btn"
              aria-label="Fermer"
              @click=${() => this.closeVisualEditor()}
            >
              ×
            </button>
          </div>
          <div class="sm-modal-sub">
            <span>Jours de répétition</span>
            <div class="sm-repeat-days">
              ${WEEKDAY_LABELS_FR.map(
                (label, day) => html`
                  <button
                    type="button"
                    class="sm-day ${v.repeatDays.includes(day) ? 'on' : ''}"
                    @click=${() => this.visualToggleDay(day)}
                  >
                    ${label}
                  </button>
                `
              )}
            </div>
          </div>
          <div class="sm-toolbar">
            <button type="button" class="sm-tool-btn sm-tool-accent" @click=${() => this.visualAddBlock()}>
              + Ajouter une plage
            </button>
            <button
              type="button"
              class="sm-tool-btn danger"
              ?disabled=${blocks.length === 0}
              @click=${() => this.visualRemoveSelected()}
            >
              Supprimer la plage
            </button>
          </div>
          ${this.renderEditorTimeline(blocks, sel)}
          ${blocks.length === 0
            ? html`
                <div class="sm-modal-body sm-modal-body-frise-placeholder">
                  <div class="empty-hint">
                    Aucune plage — utilisez « + Ajouter une plage » ci-dessus.
                  </div>
                </div>
              `
            : null}
          ${selected
            ? html`
                <div class="sm-modal-body">
                  <div class="sm-time-row">
                    <label>
                      Heure de début (HH:MM)
                      <input
                        type="text"
                        inputmode="numeric"
                        autocomplete="off"
                        maxlength="8"
                        .value=${haTimeToHHMM(selected.start_time)}
                        @input=${(e: Event) =>
                          this.visualPatchSelected({
                            start_time: normalizeTimeForHa(
                              (e.target as HTMLInputElement).value
                            ),
                          })}
                      />
                    </label>
                    <label>
                      Heure de fin (HH:MM)
                      <input
                        type="text"
                        inputmode="numeric"
                        autocomplete="off"
                        maxlength="8"
                        .value=${haTimeToHHMM(selected.end_time)}
                        @input=${(e: Event) =>
                          this.visualPatchSelected({
                            end_time: normalizeTimeForHa(
                              (e.target as HTMLInputElement).value
                            ),
                          })}
                      />
                    </label>
                  </div>
                  ${this.renderBlockColorControls(selected)}
                  <div class="sm-action-card">
                    <h4>Action pendant cette plage</h4>
                    <label class="sm-form-label">
                      Service (domaine.action)
                      <input
                        type="text"
                        placeholder="climate.set_preset_mode"
                        .value=${selected.action_type}
                        @input=${(e: Event) =>
                          this.visualPatchSelected({
                            action_type: (e.target as HTMLInputElement).value,
                          })}
                      />
                    </label>
                    <label class="sm-form-label">
                      Entités ciblées
                      <div class="entity-chips">
                        ${entityIdsFromPayload(selected.action_payload).map(
                          (eid) => html`
                            <span class="entity-chip">
                              <code>${eid}</code>
                              <button
                                type="button"
                                aria-label="Retirer"
                                @click=${() => this.visualRemoveEntity(eid)}
                              >
                                ×
                              </button>
                            </span>
                          `
                        )}
                      </div>
                      <ha-entity-picker
                        .hass=${this.hass}
                        .entityFilter=${this.entityFilterVisualEditor()}
                        .allowCustomEntity=${true}
                        label="Ajouter une entité"
                        .value=${''}
                        id=${`sm-viz-ep-${v.scheduleId}-${sel}-${this._visualEntityPickerNonce}`}
                        @value-changed=${(e: CustomEvent<{ value?: string }>) =>
                          this.visualOnEntitySelected(e)}
                      ></ha-entity-picker>
                    </label>
                    ${this.renderClimatePresetSelect(selected)}
                    <label class="sm-form-label sm-form-label-last">
                      Payload JSON (sans entity_id — géré par les puces)
                      <textarea
                        class="sm-payload-textarea"
                        .value=${this._visualPayloadStr}
                        @input=${(e: Event) => {
                          this._visualPayloadStr = (e.target as HTMLTextAreaElement).value;
                        }}
                      ></textarea>
                    </label>
                  </div>
                </div>
              `
            : null}
          <div class="sm-modal-footer">
            <button type="button" class="btn-text danger" @click=${() => this.closeVisualEditor()}>
              Annuler
            </button>
            <button type="button" class="btn-text primary" @click=${() => this.saveVisualEditor()}>
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    `;
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
