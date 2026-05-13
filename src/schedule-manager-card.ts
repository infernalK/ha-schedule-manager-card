import { LitElement, html } from 'lit';
import { live } from 'lit/directives/live.js';
import { customElement, property, state } from 'lit/decorators.js';
import { PropertyValues } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import {
  BlockAction,
  CardConfig,
  HomeAssistant,
  Schedule,
  TimeBlock,
  TimeBlockServicePayload,
  SCHEDULE_MANAGER_STATUS_ENTITY_ID,
} from './types';
import {
  newEmptyAction,
  normalizeScheduleTimeBlocks,
  normalizeTimeBlock,
} from './block-model';
import { ScheduleManagerServices } from './services';
import { styles } from './styles';
import {
  applyDefaultFieldsForService,
  parseDomainService,
  servicesForDomain,
  stripPayloadForNewService,
} from './action-service-helpers';
import {
  domainIcon,
  domainLabelFr,
  entityIcon,
  friendlyEntityName,
  listEntitiesInDomain,
  listEntityIdsForAction,
  listSelectableDomains,
  servicePrimaryLabel,
  serviceSecondaryHint,
} from './action-wizard-i18n';
import { entityCompatibleWithAction } from './entity-domains';
import {
  blockTimelineFill,
  blocksToTimelineSegments,
  DEFAULT_TIMELINE_SCALE_TICKS,
  hasOverlappingSameDayBlocks,
  isOvernightBlock,
  HA_END_OF_DAY_TIME,
  MINUTES_PER_DAY,
  minuteToHaTimeForSchedule,
  nowPercentOfDay,
  sameDayBlockIntervalExclusiveEnd,
  SCHEDULE_MANAGER_COLOR_KEY,
  snapMinutesToGrid,
  suggestGapIntervalMinutes,
  TIMELINE_DRAG_SNAP_MINUTES,
  timelineResizeHandlesForSelection,
  timelineScaleTicksForWidth,
  timeStringToMinutes,
  tryInsertSlotAtDayStart,
  applyDragMoveWithOptionalSwap,
  type TimelineResizeHandle,
  type TimelineSegment,
} from './timeline-helpers';

import './editor';

const WEEKDAY_LABELS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const;

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
    const t = e.trim();
    return t && t.includes('.') ? [t] : [];
  }
  if (Array.isArray(e)) {
    const raw = e
      .filter((x): x is string => typeof x === 'string')
      .map((x) => x.trim())
      .filter((x) => x.includes('.'));
    return [...new Set(raw)];
  }
  return [];
}

/** Ouverture éditeur ou planning vide : une plage couvrant la journée, action à définir par l’assistant. */
function defaultFullDayBlock(): TimeBlock {
  return {
    start_time: '00:00:00',
    end_time: HA_END_OF_DAY_TIME,
    actions: [newEmptyAction()],
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
  /** Action en cours d’édition dans la plage sélectionnée. */
  selectedActionIndex: number;
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
  const hRaw = parseInt(p[0] ?? '0', 10);
  const mRaw = parseInt(p[1] ?? '0', 10);
  if (Number.isNaN(hRaw) || Number.isNaN(mRaw)) {
    return '00:00:00';
  }
  const secRaw =
    p[2] !== undefined && p[2] !== ''
      ? parseInt(p[2] ?? '0', 10)
      : 0;
  const sec =
    p[2] !== undefined && p[2] !== ''
      ? Number.isNaN(secRaw)
        ? 0
        : Math.min(59, Math.max(0, secRaw))
      : 0;

  /** `cv.time` n’accepte pas 24:00:00 — tout instant ≥ fin de journée → dernière seconde HA. */
  const totalMinutes = hRaw * 60 + mRaw + sec / 60;
  if (totalMinutes >= MINUTES_PER_DAY) {
    return HA_END_OF_DAY_TIME;
  }

  const h = Math.min(23, Math.max(0, hRaw));
  const m = Math.min(59, Math.max(0, mRaw));
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

/** Empêche deux entrées identiques (horaires + toutes les actions + payloads normalisés). */
function blockFingerprint(block: TimeBlock): string {
  const st = normalizeTimeForHa(block.start_time);
  const et = normalizeTimeForHa(block.end_time);
  const parts = [...(block.actions || [])]
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(
      (a) =>
        `${String(a.action_type).trim()}|${stablePayloadString(
          payloadForDuplicateCheck(a.action_payload)
        )}`
    );
  return `${st}|${et}|${parts.join('||')}`;
}

@customElement('schedule-manager-card')
export class ScheduleManagerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  @state() private _newScheduleName = '';
  @state() private _creating = false;
  /** Éditeur plein écran (frise + détail plage), style config HA */
  @state() private _visualEdit: VisualEditState | null = null;
  /** Assistant « Choisir une action » : domaine → service → entité compatible. */
  @state() private _actionWizardOpen = false;
  @state() private _actionWizardStep:
    | 'domain'
    | 'service'
    | 'entity'
    | 'climate_preset' = 'domain';
  @state() private _actionWizardSearch = '';
  @state() private _actionWizardDomain: string | null = null;
  /** Nom court du service sélectionné (ex. turn_on) avant le choix de l’entité. */
  @state() private _actionWizardServiceShort: string | null = null;
  @state() private _actionWizardEntityId: string | null = null;
  /** `${blockIdx}-${actionIdx}` quand le panneau d’ajout d’entité (bouton +) est ouvert. */
  @state() private _entityAddPickerOpenKey: string | null = null;
  /** Panneau « remplacer cette entité » après clic sur une puce. */
  @state() private _entityPickerReplace: {
    blockIdx: number;
    actionIdx: number;
    oldEntityId: string;
  } | null = null;
  /** Filtre texte pour la liste manuelle d’entités (remplace ha-entity-picker dans le modal). */
  @state() private _entityManualListSearch = '';
  /** Réglé à l’ouverture de l’assistant : action à mettre à jour (évite décalage avec selectedActionIndex). */
  private _actionWizardTargetActionIndex = 0;
  /** Largeur du bandeau éditeur pour graduations adaptatives (pattern scheduler-card). */
  @state() private _editorFriseWidth = 0;

  private _editorFriseResizeObserver?: ResizeObserver;

  /** Déplacement horizontal de la plage sélectionnée (durée conservée). */
  private _segmentDrag:
    | null
    | {
        pointerId: number;
        blockIdx: number;
        rail: HTMLElement;
        slotEl: HTMLElement;
        startClientX: number;
        origStartM: number;
        origEndM: number;
      } = null;

  private _suppressSlotClick = false;

  /** Glisser-déposer sur la frise (pas @state : évite un render à chaque pixel). */
  private _boundaryDrag:
    | null
    | ({
        pointerId: number;
        minM: number;
        maxM: number;
        rail: HTMLElement;
        handle: HTMLElement;
      } & (
        | { mode: 'junction'; leftIdx: number; rightIdx: number }
        | { mode: 'start'; blockIdx: number }
        | { mode: 'end'; blockIdx: number }
      )) = null;

  private _onBoundaryMove = (ev: PointerEvent) => {
    const d = this._boundaryDrag;
    if (!d || !this._visualEdit || ev.pointerId !== d.pointerId) {
      return;
    }
    const rect = d.rail.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, ev.clientX - rect.left));
    const pct = (x / rect.width) * 100;
    let m = Math.round((pct / 100) * MINUTES_PER_DAY);
    m = snapMinutesToGrid(m, TIMELINE_DRAG_SNAP_MINUTES);
    m = Math.max(d.minM, Math.min(d.maxM, m));
    const ha = minuteToHaTimeForSchedule(m);
    const blocks = [...this._visualEdit.blocks];

    if (d.mode === 'junction') {
      const L = blocks[d.leftIdx];
      const R = blocks[d.rightIdx];
      if (!L || !R) {
        return;
      }
      blocks[d.leftIdx] = { ...L, end_time: ha };
      blocks[d.rightIdx] = { ...R, start_time: ha };
    } else if (d.mode === 'start') {
      const B = blocks[d.blockIdx];
      if (!B) {
        return;
      }
      blocks[d.blockIdx] = { ...B, start_time: ha };
    } else {
      const B = blocks[d.blockIdx];
      if (!B) {
        return;
      }
      blocks[d.blockIdx] = { ...B, end_time: ha };
    }

    if (hasOverlappingSameDayBlocks(blocks)) {
      return;
    }
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
    if (changed.has('_visualEdit')) {
      if (this._visualEdit) {
        this._syncEditorFriseObserver();
        requestAnimationFrame(() => {
          const m = this.shadowRoot?.querySelector('.sm-modal') as HTMLElement | undefined;
          m?.focus();
        });
      } else {
        this._detachEditorFriseObserver();
        this._editorFriseWidth = 0;
      }
    }
  }

  private statusEntityId(): string {
    return this.config?.status_entity?.trim() || SCHEDULE_MANAGER_STATUS_ENTITY_ID;
  }

  /**
   * La clé de l’objet `attributes.schedules` est l’identifiant canonique côté stockage.
   * Si le champ `id` à l’intérieur diverge (fichier JSON édité, ancien bug), les actions / suppression
   * visaient le mauvais UUID — d’où un planning « fantôme » ou introuvable.
   */
  private withCanonicalId(storageKey: string, schedule: Schedule): Schedule {
    const base =
      schedule.id === storageKey ? schedule : { ...schedule, id: storageKey };
    return normalizeScheduleTimeBlocks(base);
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

  private services(): ScheduleManagerServices {
    return new ScheduleManagerServices(this.hass);
  }

  render() {
    if (!this.hass || !this.config) {
      return html`<ha-card><div class="card-content">Chargement…</div></ha-card>`;
    }

    const scheduleIds = this.config.schedule_ids || [];
    const schedulesMap = this.getSchedulesRecord();

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
            ${this.renderSchedulesList(scheduleIds, schedulesMap)}
          </div>
        </ha-card>
        ${this.renderVisualEditorOverlay()}
        ${this.renderActionWizardOverlay()}
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

    return html`${list.map((s) => this.renderSchedule(s))}`;
  }

  /**
   * Barre d’heures sous la frise (même structure que scheduler-card : flex 18px de haut).
   */
  private renderSchedulerTimeScale(mode: 'dashboard' | 'editor') {
    const ticks =
      mode === 'editor'
        ? timelineScaleTicksForWidth(this._editorFriseWidth)
        : DEFAULT_TIMELINE_SCALE_TICKS;
    return html`
      <div class="sm-time-bar" aria-hidden="true">
        ${ticks.map((t, i) => {
          const cls =
            i === 0
              ? 'sm-time-bar-label sm-time-bar-label--left'
              : i === ticks.length - 1
                ? 'sm-time-bar-label sm-time-bar-label--right'
                : 'sm-time-bar-label';
          return html`<span class=${cls}>${t.label}</span>`;
        })}
      </div>
    `;
  }

  /** Ordre de peinture : plages plus étroites au-dessus (données anciennes encore chevauchées). */
  private sortTimelineSegmentsForPaint(segments: TimelineSegment[]): TimelineSegment[] {
    return [...segments].sort((a, b) =>
      a.leftPct !== b.leftPct ? a.leftPct - b.leftPct : b.widthPct - a.widthPct
    );
  }

  /** Positionnement réel sur la journée (le flex-grow seul faisait occuper toute la barre à un seul bloc). */
  private schedulerSlotAbsoluteStyle(leftPct: number, widthPct: number, fill: string) {
    return styleMap({
      position: 'absolute',
      left: `${leftPct}%`,
      width: `${widthPct}%`,
      top: '0',
      height: '100%',
      boxSizing: 'border-box',
      background: fill,
    });
  }

  /** Coins arrondis uniquement sur le premier / dernier segment visible (gauche → droite). */
  private segmentCapIndices(segments: TimelineSegment[]): {
    capStart: Set<number>;
    capEnd: Set<number>;
  } {
    if (!segments.length) {
      return { capStart: new Set(), capEnd: new Set() };
    }
    let minLeft = Infinity;
    let maxRight = -Infinity;
    let iStart = 0;
    let iEnd = 0;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (seg.leftPct < minLeft) {
        minLeft = seg.leftPct;
        iStart = i;
      }
      const right = seg.leftPct + seg.widthPct;
      if (right > maxRight) {
        maxRight = right;
        iEnd = i;
      }
    }
    return {
      capStart: new Set([iStart]),
      capEnd: new Set([iEnd]),
    };
  }

  private renderDayTimeline(blocks: TimeBlock[]) {
    const segments = this.sortTimelineSegmentsForPaint(blocksToTimelineSegments(blocks));
    const caps = this.segmentCapIndices(segments);
    const showNow = segments.length > 0;
    const nowPct = nowPercentOfDay();
    return html`
      <div class="timeline-frise sm-scheduler-frise" role="img" aria-label="Plages sur 24 heures">
        <div class="sm-scheduler-track">
          <div class="sm-scheduler-bar">
            ${segments.map((s, i) => {
              const blk = blocks[s.blockIndex];
              const fill = blk ? blockTimelineFill(blk) : `hsl(${s.hue}, 58%, 42%)`;
              const capS = caps.capStart.has(i) ? 'sm-slot--cap-start' : '';
              const capE = caps.capEnd.has(i) ? 'sm-slot--cap-end' : '';
              return html`
                <div
                  class="sm-slot ${capS} ${capE}"
                  style=${this.schedulerSlotAbsoluteStyle(s.leftPct, s.widthPct, fill)}
                  title=${s.label}
                >
                  <span class="sm-slot-label">${s.label}</span>
                </div>
              `;
            })}
          </div>
          ${showNow
            ? html`<div
                class="timeline-now"
                style="position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;left:${nowPct}%"
              ></div>`
            : null}
        </div>
        ${this.renderSchedulerTimeScale('dashboard')}
      </div>
    `;
  }

  private blocksToPayload(blocks: TimeBlock[]): TimeBlockServicePayload[] {
    return (blocks || []).map((b) => {
      const actions = (b.actions || [])
        .filter((a) => String(a.action_type ?? '').trim())
        .map((a) => ({
          action_type: a.action_type,
          action_payload:
            typeof a.action_payload === 'object' && a.action_payload !== null
              ? (a.action_payload as Record<string, unknown>)
              : {},
          ...(a.id ? { id: a.id } : {}),
        }));
      return {
        start_time: normalizeTimeForHa(String(b.start_time)),
        end_time: normalizeTimeForHa(String(b.end_time)),
        actions,
        ...(b.id ? { id: b.id } : {}),
      };
    });
  }

  private renderSchedule(schedule: Schedule | undefined) {
    if (!schedule) {
      return html``;
    }

    const blocks = schedule.time_blocks || [];
    const totalSchedules = Object.keys(this.getSchedulesRecord()).length;
    const deleteLocked = totalSchedules <= 1;

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
              ?disabled=${deleteLocked}
              title=${deleteLocked
                ? 'Créez un autre planning avant de pouvoir supprimer celui-ci.'
                : `Supprimer le planning « ${schedule.name} »`}
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

  private async deletePlanning(schedule: Schedule) {
    const schedulesMap = this.getSchedulesRecord();
    if (Object.keys(schedulesMap).length <= 1) {
      alert(
        'Impossible de supprimer le dernier planning. Créez d’abord un autre planning (Paramètres → Schedule Manager → Configurer, ou depuis cette carte), puis supprimez celui-ci.'
      );
      return;
    }
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
    let blocks = JSON.parse(JSON.stringify(schedule.time_blocks || [])) as TimeBlock[];
    if (!blocks.length) {
      blocks = [defaultFullDayBlock()];
    } else {
      blocks = blocks.map((b) => {
        const n = normalizeTimeBlock(b as unknown as Record<string, unknown>);
        return {
          ...n,
          start_time: normalizeTimeForHa(String(n.start_time ?? '')),
          end_time: normalizeTimeForHa(String(n.end_time ?? '')),
        };
      });
    }
    this._visualEdit = {
      scheduleId: schedule.id,
      blocks,
      repeatDays: [
        ...(schedule.repeat_days && schedule.repeat_days.length > 0
          ? schedule.repeat_days
          : [0, 1, 2, 3, 4, 5, 6]),
      ],
      selectedIndex: 0,
      selectedActionIndex: 0,
    };
  }

  private closeVisualEditor() {
    this.endBoundaryDrag();
    this.endSegmentDrag();
    this._detachEditorFriseObserver();
    this._editorFriseWidth = 0;
    this._visualEdit = null;
    this._actionWizardOpen = false;
    this.closeEntityAddPicker();
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
    this.endSegmentDrag();
    this._detachEditorFriseObserver();
  }

  private endSegmentDrag() {
    window.removeEventListener('pointermove', this._onSegmentDragMove);
    window.removeEventListener('pointerup', this._onSegmentDragUp);
    window.removeEventListener('pointercancel', this._onSegmentDragUp);
    const d = this._segmentDrag;
    if (d) {
      try {
        d.slotEl.releasePointerCapture(d.pointerId);
      } catch {
        /* ignore */
      }
    }
    this._segmentDrag = null;
  }

  private _onSegmentDragMove = (ev: PointerEvent) => {
    const d = this._segmentDrag;
    if (!d || !this._visualEdit || ev.pointerId !== d.pointerId) {
      return;
    }
    const rect = d.rail.getBoundingClientRect();
    const rawDelta =
      ((ev.clientX - d.startClientX) / Math.max(1, rect.width)) * MINUTES_PER_DAY;
    const deltaM = snapMinutesToGrid(Math.round(rawDelta), TIMELINE_DRAG_SNAP_MINUTES);
    const dur = d.origEndM - d.origStartM;
    if (dur <= 0) {
      return;
    }
    let newStart = d.origStartM + deltaM;
    let newEnd = newStart + dur;
    newStart = snapMinutesToGrid(Math.round(newStart), TIMELINE_DRAG_SNAP_MINUTES);
    newEnd = newStart + dur;
    const maxStart = MINUTES_PER_DAY - dur;
    newStart = Math.max(0, Math.min(maxStart, newStart));
    newEnd = newStart + dur;
    if (newEnd > MINUTES_PER_DAY) {
      newEnd = MINUTES_PER_DAY;
      newStart = Math.max(0, newEnd - dur);
    }

    const resolved = applyDragMoveWithOptionalSwap(
      this._visualEdit.blocks,
      d.blockIdx,
      newStart,
      newEnd,
      d.origStartM,
      d.origEndM
    );
    if (!resolved) {
      return;
    }
    this._visualEdit = { ...this._visualEdit, blocks: resolved };
    this.requestUpdate();
  };

  private _onSegmentDragUp = (ev: PointerEvent) => {
    const d = this._segmentDrag;
    if (d && ev.pointerId === d.pointerId) {
      const rect = d.rail.getBoundingClientRect();
      const rawDelta =
        ((ev.clientX - d.startClientX) / Math.max(1, rect.width)) * MINUTES_PER_DAY;
      if (Math.abs(rawDelta) > 4) {
        this._suppressSlotClick = true;
      }
    }
    this.endSegmentDrag();
  };

  private onSlotPointerDown(ev: PointerEvent, blockIdx: number) {
    if (!this._visualEdit || blockIdx !== this._visualEdit.selectedIndex) {
      return;
    }
    if (ev.button !== 0) {
      return;
    }
    const b = this._visualEdit.blocks[blockIdx];
    if (!b || isOvernightBlock(b)) {
      return;
    }
    const rail = (ev.currentTarget as HTMLElement).closest('.sm-scheduler-track') as HTMLElement | null;
    if (!rail) {
      return;
    }
    const s0 = timeStringToMinutes(b.start_time);
    const e0 = timeStringToMinutes(b.end_time);
    if (e0 <= s0) {
      return;
    }
    this.endBoundaryDrag();
    this.endSegmentDrag();
    const slotEl = ev.currentTarget as HTMLElement;
    this._segmentDrag = {
      pointerId: ev.pointerId,
      blockIdx,
      rail,
      slotEl,
      startClientX: ev.clientX,
      origStartM: s0,
      origEndM: e0,
    };
    try {
      slotEl.setPointerCapture(ev.pointerId);
    } catch {
      /* ignore */
    }
    window.addEventListener('pointermove', this._onSegmentDragMove);
    window.addEventListener('pointerup', this._onSegmentDragUp);
    window.addEventListener('pointercancel', this._onSegmentDragUp);
  }

  private onSlotClick(ev: Event, blockIdx: number) {
    if (this._suppressSlotClick) {
      this._suppressSlotClick = false;
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.visualSelectBlock(blockIdx);
  }

  private _detachEditorFriseObserver() {
    this._editorFriseResizeObserver?.disconnect();
    this._editorFriseResizeObserver = undefined;
  }

  private _syncEditorFriseObserver() {
    this._detachEditorFriseObserver();
    if (!this._visualEdit) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this._visualEdit) {
        return;
      }
      const el = this.shadowRoot?.querySelector('.sm-editor-frise');
      if (!el) {
        return;
      }
      const ro = new ResizeObserver((entries) => {
        const w = entries[0]?.contentRect.width ?? 0;
        if (Math.abs(w - this._editorFriseWidth) > 0.5) {
          this._editorFriseWidth = w;
        }
      });
      ro.observe(el);
      this._editorFriseResizeObserver = ro;
      const w = el.getBoundingClientRect().width;
      if (w > 0 && Math.abs(w - this._editorFriseWidth) > 0.5) {
        this._editorFriseWidth = w;
      }
    });
  }

  private onResizePointerDown(ev: PointerEvent, h: TimelineResizeHandle) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!this._visualEdit) {
      return;
    }
    const rail = (ev.currentTarget as HTMLElement).closest(
      '.sm-scheduler-track'
    ) as HTMLElement | null;
    if (!rail) {
      return;
    }
    this.endBoundaryDrag();
    this.endSegmentDrag();
    const handle = ev.currentTarget as HTMLElement;
    if (h.kind === 'junction') {
      this._boundaryDrag = {
        pointerId: ev.pointerId,
        mode: 'junction',
        leftIdx: h.leftBlockIndex,
        rightIdx: h.rightBlockIndex,
        minM: h.minMinute,
        maxM: h.maxMinute,
        rail,
        handle,
      };
    } else if (h.kind === 'start') {
      this._boundaryDrag = {
        pointerId: ev.pointerId,
        mode: 'start',
        blockIdx: h.blockIndex,
        minM: h.minMinute,
        maxM: h.maxMinute,
        rail,
        handle,
      };
    } else {
      this._boundaryDrag = {
        pointerId: ev.pointerId,
        mode: 'end',
        blockIdx: h.blockIndex,
        minM: h.minMinute,
        maxM: h.maxMinute,
        rail,
        handle,
      };
    }
    handle.setPointerCapture(ev.pointerId);
    window.addEventListener('pointermove', this._onBoundaryMove);
    window.addEventListener('pointerup', this._onBoundaryUp);
    window.addEventListener('pointercancel', this._onBoundaryUp);
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
    const max = this._visualEdit.blocks.length - 1;
    const idx = Math.max(0, Math.min(index, max));
    if (idx === this._visualEdit.selectedIndex) {
      return;
    }
    this.closeEntityAddPicker();
    this._visualEdit = {
      ...this._visualEdit,
      selectedIndex: idx,
      selectedActionIndex: 0,
    };
  }

  private visualPatchBlockFields(
    patch: Partial<Pick<TimeBlock, 'start_time' | 'end_time' | 'id'>>
  ) {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const cur = this._visualEdit.blocks[sel];
    if (!cur) {
      return;
    }
    const next = { ...cur, ...patch } as TimeBlock;
    if (!isOvernightBlock(next) && !sameDayBlockIntervalExclusiveEnd(next)) {
      alert(
        'Pour une plage sur une même journée, l’heure de fin doit être strictement après le début.'
      );
      return;
    }
    const trial = [...this._visualEdit.blocks];
    trial[sel] = next;
    if (hasOverlappingSameDayBlocks(trial)) {
      alert('Les plages horaires ne peuvent pas se chevaucher.');
      return;
    }
    this._visualEdit = { ...this._visualEdit, blocks: trial };
  }

  private visualPatchSelectedAction(
    patch: Partial<BlockAction>,
    actionIndexOverride?: number
  ) {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const maxAi = Math.max(0, (this._visualEdit.blocks[sel]?.actions?.length ?? 1) - 1);
    const ai = Math.min(
      actionIndexOverride !== undefined
        ? actionIndexOverride
        : this._visualEdit.selectedActionIndex,
      maxAi
    );
    const cur = this._visualEdit.blocks[sel];
    if (!cur?.actions?.length) {
      return;
    }
    const actions = cur.actions.map((a, i) =>
      i === ai ? ({ ...a, ...patch } as BlockAction) : a
    );
    const next = { ...cur, actions };
    const trial = [...this._visualEdit.blocks];
    trial[sel] = next;
    this._visualEdit = { ...this._visualEdit, blocks: trial };
  }

  private visualSelectAction(ai: number) {
    if (!this._visualEdit) {
      return;
    }
    const b = this._visualEdit.blocks[this._visualEdit.selectedIndex];
    if (!b?.actions?.length) {
      return;
    }
    const max = b.actions.length - 1;
    const next = Math.max(0, Math.min(ai, max));
    if (next === this._visualEdit.selectedActionIndex) {
      return;
    }
    this.closeEntityAddPicker();
    this._visualEdit = {
      ...this._visualEdit,
      selectedActionIndex: next,
    };
  }

  private visualAddAction() {
    if (!this._visualEdit) {
      return;
    }
    const bi = this._visualEdit.selectedIndex;
    const b = this._visualEdit.blocks[bi];
    if (!b) {
      return;
    }
    const actions = [...b.actions, newEmptyAction()];
    const next = { ...b, actions };
    const trial = [...this._visualEdit.blocks];
    trial[bi] = next;
    this.closeEntityAddPicker();
    this._visualEdit = {
      ...this._visualEdit,
      blocks: trial,
      selectedActionIndex: actions.length - 1,
    };
  }

  private visualRemoveAction(ai: number) {
    if (!this._visualEdit) {
      return;
    }
    const bi = this._visualEdit.selectedIndex;
    const b = this._visualEdit.blocks[bi];
    if (!b || b.actions.length <= 1) {
      alert('Chaque plage doit conserver au moins une action.');
      return;
    }
    const actions = b.actions.filter((_, i) => i !== ai);
    const next = { ...b, actions };
    const trial = [...this._visualEdit.blocks];
    trial[bi] = next;
    let selectedActionIndex = this._visualEdit.selectedActionIndex;
    if (selectedActionIndex >= actions.length) {
      selectedActionIndex = actions.length - 1;
    } else if (ai < selectedActionIndex) {
      selectedActionIndex -= 1;
    }
    this.closeEntityAddPicker();
    this._visualEdit = { ...this._visualEdit, blocks: trial, selectedActionIndex };
  }

  private visualAddBlock() {
    if (!this._visualEdit) {
      return;
    }
    const gap = suggestGapIntervalMinutes(this._visualEdit.blocks, 60);
    let nb: TimeBlock;
    let nextBlocks: TimeBlock[];
    let selectedIndex: number;

    if (gap) {
      nb = {
        start_time: minuteToHaTimeForSchedule(gap.start),
        end_time: minuteToHaTimeForSchedule(gap.end),
        actions: [newEmptyAction()],
      };
      nextBlocks = [...this._visualEdit.blocks, nb];
      selectedIndex = nextBlocks.length - 1;
      if (hasOverlappingSameDayBlocks(nextBlocks)) {
        alert(
          'Impossible d’ajouter cette plage sans chevauchement. Modifiez les horaires existants.'
        );
        return;
      }
    } else {
      const split = tryInsertSlotAtDayStart(
        this._visualEdit.blocks,
        TIMELINE_DRAG_SNAP_MINUTES
      );
      if (!split) {
        alert(
          'La journée est déjà entièrement couverte. Supprimez ou raccourcissez une plage avant d’en ajouter une autre.'
        );
        return;
      }
      nextBlocks = split;
      selectedIndex = 0;
      nb = split[0];
    }

    const fp = blockFingerprint(nb);
    for (const b of this._visualEdit.blocks) {
      if (blockFingerprint(b) === fp) {
        alert('Une plage identique existe déjà — modifiez les horaires ou le service.');
        return;
      }
    }
    this.closeEntityAddPicker();
    this._visualEdit = {
      ...this._visualEdit,
      blocks: nextBlocks,
      selectedIndex,
      selectedActionIndex: 0,
    };
  }

  private visualRemoveSelected() {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const nextBlocks = this._visualEdit.blocks.filter((_, i) => i !== sel);
    let nextSel = sel;
    if (nextSel >= nextBlocks.length) {
      nextSel = Math.max(0, nextBlocks.length - 1);
    }
    this.closeEntityAddPicker();
    this._visualEdit = {
      ...this._visualEdit,
      blocks: nextBlocks,
      selectedIndex: nextSel,
      selectedActionIndex: 0,
    };
  }

  /** Première entité ciblée dans le payload (pour l’UI et les services). */
  private primaryEntityFromAction(action: BlockAction): string {
    return entityIdsFromPayload(action.action_payload)[0] ?? '';
  }

  /** Entités `hass.states` compatibles avec l’action, hors `excludeEntityIds` (déjà ciblées). */
  private compatibleEntityChoicesForAction(
    action: BlockAction,
    excludeEntityIds: readonly string[]
  ): { id: string; name: string }[] {
    const hass = this.hass;
    if (!hass) {
      return [];
    }
    const actionType = String(action.action_type ?? '').trim();
    const omit = new Set(excludeEntityIds.filter((id) => id.includes('.')));
    return listEntityIdsForAction(hass, actionType)
      .filter((id) => !omit.has(id))
      .map((id) => ({ id, name: friendlyEntityName(hass, id) }));
  }

  private quickPickEntityAppend(actionIndex: number, entityId: string) {
    const ev = new CustomEvent<{ value: string }>('value-changed', {
      detail: { value: entityId },
    });
    if (this.visualAppendEntityAt(actionIndex, ev as CustomEvent<{ value?: string }>)) {
      this.closeEntityAddPicker();
    }
  }

  private quickPickEntityReplace(actionIndex: number, oldEntityId: string, entityId: string) {
    const ev = new CustomEvent<{ value: string }>('value-changed', {
      detail: { value: entityId },
    });
    if (this.visualReplaceEntityAt(actionIndex, oldEntityId, ev as CustomEvent<{ value?: string }>)) {
      this.closeEntityAddPicker();
    }
  }

  private renderQuickEntityPickerPanel(
    action: BlockAction,
    actionIndex: number,
    mode: 'append' | 'replace',
    oldEntityId?: string
  ) {
    const hass = this.hass;
    if (!hass) {
      return html``;
    }
    const payloadIds = entityIdsFromPayload(action.action_payload);
    const exclude = payloadIds;
    const rows = this.compatibleEntityChoicesForAction(action, exclude);
    const q = this._entityManualListSearch.trim().toLowerCase();
    const filtered =
      q === ''
        ? rows
        : rows.filter(
            (r) =>
              r.id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
          );
    return html`
      <div class="sm-entity-manual-picker">
        <div class="sm-entity-manual-search">
          <ha-icon class="sm-entity-manual-search-icon" icon="mdi:magnify"></ha-icon>
          <input
            type="search"
            class="sm-entity-manual-filter"
            autocomplete="off"
            spellcheck="false"
            aria-label="Rechercher des entités"
            placeholder="Rechercher des entités"
            .value=${this._entityManualListSearch}
            @input=${(e: Event) => {
              this._entityManualListSearch = (e.target as HTMLInputElement).value;
            }}
          />
        </div>
        <div class="sm-entity-manual-list" role="listbox" aria-label="Entités compatibles">
          ${filtered.length === 0
            ? html`<p class="sm-entity-manual-empty">
                Aucune entité compatible${q ? ' pour cette recherche' : ''}. Vérifiez le type
                d’action ou utilisez « Modifier l’action ».
              </p>`
            : filtered.map((r) => {
                const st = hass.states[r.id];
                const dom = r.id.includes('.') ? (r.id.split('.')[0] ?? '') : '';
                return html`
                  <button
                    type="button"
                    role="option"
                    class="sm-entity-manual-row"
                    @click=${() => {
                      if (mode === 'append') {
                        this.quickPickEntityAppend(actionIndex, r.id);
                      } else if (oldEntityId) {
                        this.quickPickEntityReplace(actionIndex, oldEntityId, r.id);
                      }
                    }}
                  >
                    ${st
                      ? html`<state-badge
                          class="sm-entity-manual-badge"
                          .hass=${hass}
                          .stateObj=${st}
                        ></state-badge>`
                      : html`<div class="sm-entity-manual-icon-fallback">
                          <ha-icon
                            icon=${entityIcon(hass, r.id) ??
                            (dom ? domainIcon(dom) : 'mdi:shape-outline')}
                          ></ha-icon>
                        </div>`}
                    <div class="sm-entity-manual-row-text">
                      <span class="sm-entity-manual-row-name">${r.name}</span>
                      <span class="sm-entity-manual-row-id">${r.id}</span>
                    </div>
                  </button>
                `;
              })}
        </div>
      </div>
    `;
  }

  private visualAppendEntity(
    ev: CustomEvent<{ value?: string }>,
    actionIndexOverride?: number
  ): boolean {
    if (!this._visualEdit || !this.hass) {
      return false;
    }
    const raw =
      ev.detail?.value ??
      ((ev.target as unknown as { value?: string })?.value ?? '');
    const v = String(raw).trim();
    if (!v) {
      return false;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    const maxAi = Math.max(0, (block?.actions?.length ?? 1) - 1);
    const ai = Math.min(
      actionIndexOverride !== undefined
        ? Math.max(0, Math.min(actionIndexOverride, maxAi))
        : Math.min(this._visualEdit.selectedActionIndex, maxAi),
      maxAi
    );
    const action = block?.actions?.[ai];
    if (!block || !action || !String(action.action_type ?? '').trim()) {
      return false;
    }
    const ids = entityIdsFromPayload(action.action_payload);
    if (ids.includes(v)) {
      return false;
    }
    const base =
      typeof action.action_payload === 'object' && action.action_payload !== null
        ? { ...(action.action_payload as Record<string, unknown>) }
        : {};
    const nextIds = [...ids, v];
    base.entity_id = nextIds.length === 1 ? nextIds[0] : nextIds;
    this.visualPatchSelectedAction({ action_payload: base }, ai);
    return true;
  }

  private visualReplaceEntity(
    oldEntityId: string,
    ev: CustomEvent<{ value?: string }>,
    actionIndexOverride?: number
  ): boolean {
    if (!this._visualEdit || !this.hass) {
      return false;
    }
    const raw =
      ev.detail?.value ??
      ((ev.target as unknown as { value?: string })?.value ?? '');
    const v = String(raw).trim();
    if (!v || v === oldEntityId) {
      return false;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    const maxAi = Math.max(0, (block?.actions?.length ?? 1) - 1);
    const ai = Math.min(
      actionIndexOverride !== undefined
        ? Math.max(0, Math.min(actionIndexOverride, maxAi))
        : Math.min(this._visualEdit.selectedActionIndex, maxAi),
      maxAi
    );
    const action = block?.actions?.[ai];
    if (!block || !action || !String(action.action_type ?? '').trim()) {
      return false;
    }
    const ids = entityIdsFromPayload(action.action_payload);
    if (!ids.includes(oldEntityId) || ids.includes(v)) {
      return false;
    }
    const nextIds = ids.map((id) => (id === oldEntityId ? v : id));
    const base =
      typeof action.action_payload === 'object' && action.action_payload !== null
        ? { ...(action.action_payload as Record<string, unknown>) }
        : {};
    base.entity_id = nextIds.length === 1 ? nextIds[0] : nextIds;
    this.visualPatchSelectedAction({ action_payload: base }, ai);
    return true;
  }

  private visualRemoveEntityChip(
    entityId: string,
    actionIndexOverride?: number
  ) {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    const maxAi = Math.max(0, (block?.actions?.length ?? 1) - 1);
    const ai = Math.min(
      actionIndexOverride !== undefined
        ? Math.max(0, Math.min(actionIndexOverride, maxAi))
        : Math.min(this._visualEdit.selectedActionIndex, maxAi),
      maxAi
    );
    const action = block?.actions?.[ai];
    if (!block || !action) {
      return;
    }
    const ids = entityIdsFromPayload(action.action_payload).filter((e) => e !== entityId);
    if (ids.length === 0) {
      alert(
        'Conservez au moins une entité, ou utilisez « Modifier l’action » pour tout reconfigurer.'
      );
      return;
    }
    const base =
      typeof action.action_payload === 'object' && action.action_payload !== null
        ? { ...(action.action_payload as Record<string, unknown>) }
        : {};
    base.entity_id = ids.length === 1 ? ids[0] : ids;
    this.visualPatchSelectedAction({ action_payload: base }, ai);
  }

  /** Modes préréglés exposés par l’entité climate (pour l’étape assistant). */
  private climatePresetModesForEntityId(entityId: string): string[] | null {
    const st = this.hass?.states[entityId];
    const pm = st?.attributes?.preset_modes;
    if (Array.isArray(pm) && pm.length && pm.every((x): x is string => typeof x === 'string')) {
      return pm;
    }
    return null;
  }

  private applyWizardSelection(
    entityId: string,
    serviceShort: string,
    climatePresetMode?: string
  ) {
    if (!this._visualEdit || !this.hass || !entityId.includes('.')) {
      return;
    }
    const domain = entityId.split('.')[0] ?? '';
    if (!domain) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const maxAi = Math.max(0, (this._visualEdit.blocks[sel]?.actions?.length ?? 1) - 1);
    const ai = Math.min(Math.max(0, this._actionWizardTargetActionIndex), maxAi);
    const block = this._visualEdit.blocks[sel];
    const curAction = block?.actions?.[ai];
    if (!block || !curAction) {
      return;
    }

    const payload = stripPayloadForNewService(
      curAction.action_payload,
      entityId,
      SCHEDULE_MANAGER_COLOR_KEY
    );
    if (
      domain === 'climate' &&
      serviceShort === 'set_preset_mode' &&
      climatePresetMode !== undefined
    ) {
      payload.preset_mode = climatePresetMode;
    } else {
      applyDefaultFieldsForService(domain, serviceShort, entityId, payload, this.hass);
    }

    this.visualPatchSelectedAction(
      {
        action_type: `${domain}.${serviceShort}`,
        action_payload: payload,
      },
      ai
    );
    this.closeActionWizard();
  }

  private openActionWizard() {
    if (!this._visualEdit || !this.hass) {
      return;
    }
    this.closeEntityAddPicker();
    const bi = this._visualEdit.selectedIndex;
    const n = this._visualEdit.blocks[bi]?.actions?.length ?? 0;
    const maxAi = Math.max(0, n - 1);
    this._actionWizardTargetActionIndex = Math.min(
      Math.max(0, this._visualEdit.selectedActionIndex),
      maxAi
    );
    this._actionWizardOpen = true;
    this._actionWizardStep = 'domain';
    this._actionWizardSearch = '';
    this._actionWizardDomain = null;
    this._actionWizardServiceShort = null;
    this._actionWizardEntityId = null;
  }

  private closeActionWizard() {
    this._actionWizardOpen = false;
  }

  private actionWizardBack() {
    if (this._actionWizardStep === 'climate_preset') {
      this._actionWizardStep = 'entity';
      this._actionWizardEntityId = null;
      this._actionWizardSearch = '';
      return;
    }
    if (this._actionWizardStep === 'entity') {
      this._actionWizardStep = 'service';
      this._actionWizardEntityId = null;
      this._actionWizardSearch = '';
      return;
    }
    if (this._actionWizardStep === 'service') {
      this._actionWizardStep = 'domain';
      this._actionWizardDomain = null;
      this._actionWizardServiceShort = null;
      this._actionWizardSearch = '';
    }
  }

  private actionWizardPickDomain(domain: string) {
    this._actionWizardDomain = domain;
    this._actionWizardServiceShort = null;
    this._actionWizardStep = 'service';
    this._actionWizardSearch = '';
  }

  private actionWizardPickService(serviceShort: string) {
    this._actionWizardServiceShort = serviceShort;
    this._actionWizardStep = 'entity';
    this._actionWizardEntityId = null;
    this._actionWizardSearch = '';
  }

  private actionWizardPickEntity(eid: string) {
    const domain = this._actionWizardDomain;
    const svc = this._actionWizardServiceShort;
    if (!domain || !svc) {
      return;
    }
    this._actionWizardEntityId = eid;
    if (svc === 'set_preset_mode' && domain === 'climate') {
      const modes = this.climatePresetModesForEntityId(eid);
      if (modes && modes.length > 0) {
        this._actionWizardStep = 'climate_preset';
        this._actionWizardSearch = '';
        return;
      }
    }
    this.applyWizardSelection(eid, svc);
  }

  private actionWizardApplyClimatePreset(presetMode: string) {
    const id = this._actionWizardEntityId;
    const svc = this._actionWizardServiceShort;
    if (!id || svc !== 'set_preset_mode') {
      return;
    }
    this.applyWizardSelection(id, 'set_preset_mode', presetMode);
  }

  private _onWizardSearchInput(ev: Event) {
    this._actionWizardSearch = (ev.target as HTMLInputElement).value;
  }

  private _onWizardOverlayKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      ev.stopPropagation();
      this.closeActionWizard();
    }
  }

  private renderActionSummary(selected: BlockAction) {
    if (!String(selected.action_type ?? '').trim()) {
      return html``;
    }
    const hass = this.hass;
    if (!hass) {
      return html``;
    }
    const primary = this.primaryEntityFromAction(selected);
    const parsed = parseDomainService(selected.action_type);
    const primaryDomain = primary.includes('.')
      ? primary.split('.')[0] ?? ''
      : '';
    const icon = primary
      ? entityIcon(hass, primary) ??
        (primaryDomain ? domainIcon(primaryDomain) : undefined) ??
        'mdi:gesture-tap-button'
      : 'mdi:gesture-tap-button';
    const title = primary
      ? friendlyEntityName(hass, primary)
      : 'Aucune entité sélectionnée';
    const actionLine = parsed
      ? servicePrimaryLabel(parsed.domain, parsed.service)
      : selected.action_type || '—';

    return html`
      <div class="sm-action-summary">
        <ha-icon class="sm-action-summary-icon" .icon=${icon}></ha-icon>
        <div class="sm-action-summary-text">
          <div class="sm-action-summary-title">${title}</div>
          <div class="sm-action-summary-sub">
            <span>${actionLine}</span>
            ${selected.action_type
              ? html`<code class="sm-action-tech">${selected.action_type}</code>`
              : null}
          </div>
        </div>
      </div>
    `;
  }

  private formatActionTabTitle(action: BlockAction, index: number): string {
    const t = String(action.action_type ?? '').trim();
    if (!t) {
      return `Action ${index + 1}`;
    }
    const segs = t.split('.');
    const tail = t.includes('.') ? segs[segs.length - 1] ?? t : t;
    return tail.length > 20 ? `${tail.slice(0, 18)}…` : tail;
  }

  /** Une seule action encore sans service : pas de liste — uniquement le bouton principal. */
  private isSinglePlaceholderAction(selected: TimeBlock): boolean {
    const actions = selected.actions || [];
    return (
      actions.length === 1 && !String(actions[0]?.action_type ?? '').trim()
    );
  }

  private openActionWizardAt(actionIndex: number) {
    this.visualSelectAction(actionIndex);
    this.openActionWizard();
  }

  private visualAppendEntityAt(
    actionIndex: number,
    ev: CustomEvent<{ value?: string }>
  ): boolean {
    return this.visualAppendEntity(ev, actionIndex);
  }

  private visualReplaceEntityAt(
    actionIndex: number,
    oldEntityId: string,
    ev: CustomEvent<{ value?: string }>
  ): boolean {
    return this.visualReplaceEntity(oldEntityId, ev, actionIndex);
  }

  private entityAddPickerKey(blockIdx: number, actionIdx: number): string {
    return `${blockIdx}-${actionIdx}`;
  }

  private closeEntityAddPicker(): void {
    this._entityAddPickerOpenKey = null;
    this._entityPickerReplace = null;
    this._entityManualListSearch = '';
  }

  private toggleEntityAddPicker(blockIdx: number, actionIdx: number): void {
    const k = this.entityAddPickerKey(blockIdx, actionIdx);
    if (this._entityAddPickerOpenKey === k) {
      this.closeEntityAddPicker();
      return;
    }
    this._entityPickerReplace = null;
    this._entityManualListSearch = '';
    this._entityAddPickerOpenKey = k;
  }

  private openEntityReplacePicker(blockIdx: number, actionIdx: number, oldEntityId: string) {
    this._entityAddPickerOpenKey = null;
    this._entityManualListSearch = '';
    this._entityPickerReplace = { blockIdx, actionIdx, oldEntityId };
  }

  private entityReplacePanelActive(blockIdx: number, actionIdx: number): boolean {
    const r = this._entityPickerReplace;
    return Boolean(r && r.blockIdx === blockIdx && r.actionIdx === actionIdx);
  }

  private visualRemoveEntityAt(actionIndex: number, entityId: string) {
    this.visualRemoveEntityChip(entityId, actionIndex);
  }

  private visualSetPresetModeAt(actionIndex: number, mode: string) {
    this.visualSelectAction(actionIndex);
    this.visualSetPresetMode(mode);
  }

  private renderActionWizardOverlay() {
    if (!this._actionWizardOpen || !this.hass || !this._visualEdit) {
      return html``;
    }

    const hass = this.hass;
    const step = this._actionWizardStep;
    const qRaw = this._actionWizardSearch.trim().toLowerCase();
    const domainF = this._actionWizardDomain;
    const svcPick = this._actionWizardServiceShort;
    const entityPick = this._actionWizardEntityId;

    const matches = (text: string) =>
      !qRaw || text.toLowerCase().includes(qRaw);

    let body = html``;

    if (step === 'domain') {
      const domains = listSelectableDomains(hass).filter(
        (d) => matches(domainLabelFr(d)) || matches(d)
      );
      body =
        domains.length === 0
          ? html`<p class="sm-ap-empty">Aucun résultat.</p>`
          : html`<div class="sm-ap-scroll">
              ${domains.map(
                (d) => html`
                  <button
                    type="button"
                    class="sm-ap-row"
                    @click=${() => this.actionWizardPickDomain(d)}
                  >
                    <ha-icon class="sm-ap-row-icon" .icon=${domainIcon(d)}></ha-icon>
                    <div class="sm-ap-row-text">
                      <span class="sm-ap-row-primary">${domainLabelFr(d)}</span>
                      <span class="sm-ap-row-secondary">${d}</span>
                    </div>
                    <span class="sm-ap-chevron" aria-hidden="true">›</span>
                  </button>
                `
              )}
            </div>`;
    } else if (step === 'service' && domainF) {
      const dom = domainF;
      const svcList = servicesForDomain(hass, dom).filter(
        (s) =>
          matches(s) ||
          matches(servicePrimaryLabel(dom, s)) ||
          matches(serviceSecondaryHint(dom, s))
      );
      body =
        svcList.length === 0
          ? html`<p class="sm-ap-empty">Aucun service pour ce domaine.</p>`
          : html`<div class="sm-ap-scroll">
              ${svcList.map(
                (s) => html`
                  <button
                    type="button"
                    class="sm-ap-row sm-ap-row--dense"
                    @click=${() => this.actionWizardPickService(s)}
                  >
                    <ha-icon class="sm-ap-row-icon" .icon=${domainIcon(dom)}></ha-icon>
                    <div class="sm-ap-row-text">
                      <span class="sm-ap-row-primary">${servicePrimaryLabel(dom, s)}</span>
                      <span class="sm-ap-row-secondary">${serviceSecondaryHint(dom, s)}</span>
                    </div>
                    <span class="sm-ap-chevron" aria-hidden="true">›</span>
                  </button>
                `
              )}
            </div>`;
    } else if (step === 'entity' && domainF && svcPick) {
      const actionFull = `${domainF}.${svcPick}`;
      let entities = listEntitiesInDomain(hass, domainF).filter(
        (eid) =>
          matches(friendlyEntityName(hass, eid)) || matches(eid)
      );
      entities = entities.filter((eid) =>
        entityCompatibleWithAction(eid, actionFull, hass)
      );
      body =
        entities.length === 0
          ? html`<p class="sm-ap-empty">
              Aucune entité compatible avec l’action <code>${actionFull}</code> dans ce domaine.
            </p>`
          : html`<div class="sm-ap-scroll">
              ${entities.map(
                (eid) => html`
                  <button
                    type="button"
                    class="sm-ap-row"
                    @click=${() => this.actionWizardPickEntity(eid)}
                  >
                    <ha-icon
                      class="sm-ap-row-icon"
                      .icon=${entityIcon(hass, eid) ?? domainIcon(domainF)}
                    ></ha-icon>
                    <div class="sm-ap-row-text">
                      <span class="sm-ap-row-primary">${friendlyEntityName(hass, eid)}</span>
                      <span class="sm-ap-row-secondary">${eid}</span>
                    </div>
                    <span class="sm-ap-chevron" aria-hidden="true">›</span>
                  </button>
                `
              )}
            </div>`;
    } else if (step === 'climate_preset' && entityPick) {
      const modes = this.climatePresetModesForEntityId(entityPick) ?? [];
      const filtered = modes.filter((m) => matches(m));
      body =
        filtered.length === 0
          ? html`<p class="sm-ap-empty">
              Aucun mode préréglé trouvé pour cette entité. Utilisez Retour ou fermez.
            </p>`
          : html`<div class="sm-ap-scroll">
              ${filtered.map(
                (mode) => html`
                  <button
                    type="button"
                    class="sm-ap-row"
                    @click=${() => this.actionWizardApplyClimatePreset(mode)}
                  >
                    <ha-icon
                      class="sm-ap-row-icon"
                      .icon=${entityIcon(hass, entityPick) ?? domainIcon('climate')}
                    ></ha-icon>
                    <div class="sm-ap-row-text">
                      <span class="sm-ap-row-primary">${mode}</span>
                      <span class="sm-ap-row-secondary">Mode préréglé · climate.set_preset_mode</span>
                    </div>
                    <span class="sm-ap-chevron" aria-hidden="true">›</span>
                  </button>
                `
              )}
            </div>`;
    }

    const context =
      step === 'domain'
        ? 'Étape 1 — choisissez un type d’appareil (domaine)'
        : step === 'service' && domainF
          ? html`Étape 2 — quelle action · domaine
              <strong>${domainLabelFr(domainF)}</strong> ?`
          : step === 'entity' && domainF && svcPick
            ? html`Étape 3 — quelle entité pour
                <code>${domainF}.${svcPick}</code>
                ? Seules les entités compatibles sont listées.`
            : step === 'climate_preset' && entityPick
              ? html`Étape 4 — mode préréglé pour «
                  <strong>${friendlyEntityName(hass, entityPick)}</strong> »`
              : '';

    return html`
      <div
        class="sm-action-wizard-overlay"
        tabindex="-1"
        @keydown=${this._onWizardOverlayKeydown}
        @click=${(e: Event) => {
          if (e.target === e.currentTarget) {
            this.closeActionWizard();
          }
        }}
      >
        <div
          class="sm-action-wizard-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sm-ap-heading"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <div class="sm-action-wizard-head">
            <button
              type="button"
              class="sm-ap-nav-btn"
              aria-label="Retour"
              ?disabled=${step === 'domain'}
              @click=${() => this.actionWizardBack()}
            >
              ‹
            </button>
            <h3 id="sm-ap-heading" class="sm-ap-heading">Choisir une action</h3>
            <button
              type="button"
              class="sm-ap-nav-btn"
              aria-label="Fermer"
              @click=${() => this.closeActionWizard()}
            >
              ×
            </button>
          </div>
          <p class="sm-ap-context">${context}</p>
          <input
            type="search"
            class="sm-ap-search"
            placeholder="Rechercher"
            aria-label="Filtrer la liste"
            .value=${this._actionWizardSearch}
            @input=${this._onWizardSearchInput}
          />
          ${body}
        </div>
      </div>
    `;
  }

  private renderActionPlanningControls(selected: TimeBlock) {
    if (!this.hass || !this._visualEdit) {
      return html``;
    }
    const hass = this.hass;

    if (this.isSinglePlaceholderAction(selected)) {
      return html`
        <div class="sm-action-entry">
          <button
            type="button"
            class="sm-action-primary-btn"
            @click=${() => this.openActionWizardAt(0)}
          >
            + Choisir une action
          </button>
        </div>
      `;
    }

    const blockIdx = this._visualEdit.selectedIndex;

    return html`
      <div class="sm-action-entry">
        <div class="sm-actions-stack" role="list" aria-label="Liste des actions du créneau">
          ${selected.actions.map((action, i) => {
            const primary = this.primaryEntityFromAction(action);
            const parsed = parseDomainService(action.action_type);
            const dom = primary.includes('.') ? primary.split('.')[0] ?? '' : '';
            const hasAction = Boolean(String(action.action_type ?? '').trim());
            const unknownService = Boolean(
              hasAction &&
                primary &&
                parsed &&
                dom &&
                parsed.domain === dom &&
                !servicesForDomain(hass, parsed.domain).includes(parsed.service)
            );

            return html`
              <div class="sm-action-block" role="listitem">
                <div class="sm-action-block-head">
                  <span class="sm-action-block-title">${this.formatActionTabTitle(action, i)}</span>
                  ${selected.actions.length > 1
                    ? html`
                        <button
                          type="button"
                          class="sm-action-block-remove"
                          aria-label="Supprimer cette action"
                          title="Supprimer cette action"
                          @click=${() => this.visualRemoveAction(i)}
                        >
                          Supprimer
                        </button>
                      `
                    : null}
                </div>
                ${hasAction ? this.renderActionSummary(action) : null}
                ${hasAction
                  ? html`
                      <div class="sm-action-entities-quick">
                        <span class="sm-action-entities-quick-title">Entités ciblées</span>
                        <p class="sm-action-entities-quick-hint">
                          Cliquez sur une entité pour la remplacer, × pour la retirer, ou « + » puis
                          choisissez dans la liste (recherche et lignes avec icône comme le sélecteur
                          d’entités Home Assistant) —
                          compatible avec <code>${action.action_type}</code>.
                        </p>
                        <div class="entity-chips">
                          ${entityIdsFromPayload(action.action_payload).map(
                            (eid) => html`
                              <span class="entity-chip" title=${eid}>
                                <button
                                  type="button"
                                  class="entity-chip-main"
                                  aria-label="Remplacer ${friendlyEntityName(hass, eid)}"
                                  @click=${() => this.openEntityReplacePicker(blockIdx, i, eid)}
                                >
                                  <span class="entity-chip-text">
                                    <span class="entity-chip-name">${friendlyEntityName(hass, eid)}</span>
                                    <span class="entity-chip-id">${eid}</span>
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  class="entity-chip-remove"
                                  aria-label="Retirer ${friendlyEntityName(hass, eid)}"
                                  @click=${(ev: Event) => {
                                    ev.stopPropagation();
                                    this.visualRemoveEntityAt(i, eid);
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            `
                          )}
                        </div>
                        ${this.entityReplacePanelActive(blockIdx, i) &&
                        this._entityPickerReplace
                          ? html`
                              <div class="sm-entity-replace-block">
                                <div class="sm-entity-add-row">
                                  <span class="sm-entity-add-heading">Remplacer l’entité</span>
                                  <button
                                    type="button"
                                    class="sm-entity-add-dismiss"
                                    aria-label="Fermer le sélecteur"
                                    @click=${() => this.closeEntityAddPicker()}
                                  >
                                    Fermer
                                  </button>
                                </div>
                                <div class="sm-entity-picker-shell sm-entity-picker-shell--popover">
                                  ${this.renderQuickEntityPickerPanel(
                                    action,
                                    i,
                                    'replace',
                                    this._entityPickerReplace.oldEntityId
                                  )}
                                </div>
                              </div>
                            `
                          : null}
                        <div class="sm-entity-add-block">
                          <div class="sm-entity-add-row">
                            <span class="sm-entity-add-heading">Ajouter une entité</span>
                            ${this._entityAddPickerOpenKey === this.entityAddPickerKey(blockIdx, i)
                              ? html`
                                  <button
                                    type="button"
                                    class="sm-entity-add-dismiss"
                                    aria-label="Fermer le sélecteur d’entité"
                                    @click=${() => this.closeEntityAddPicker()}
                                  >
                                    Fermer
                                  </button>
                                `
                              : html`
                                  <button
                                    type="button"
                                    class="sm-entity-add-plus"
                                    title="Choisir une entité à ajouter"
                                    aria-label="Ajouter une entité"
                                    @click=${() => this.toggleEntityAddPicker(blockIdx, i)}
                                  >
                                    +
                                  </button>
                                `}
                          </div>
                          ${this._entityAddPickerOpenKey === this.entityAddPickerKey(blockIdx, i)
                            ? html`
                                <div class="sm-entity-picker-shell sm-entity-picker-shell--popover">
                                  ${this.renderQuickEntityPickerPanel(action, i, 'append')}
                                </div>
                              `
                            : null}
                        </div>
                      </div>
                    `
                  : null}
                ${this.renderClimatePresetForAction(action, i)}
                ${unknownService
                  ? html`<p class="sm-field-hint">
                      Action personnalisée : <code>${action.action_type}</code>
                    </p>`
                  : null}
                <button
                  type="button"
                  class="sm-action-primary-btn sm-action-block-wizard"
                  @click=${() => this.openActionWizardAt(i)}
                >
                  ${hasAction ? 'Modifier l’action' : '+ Choisir une action'}
                </button>
              </div>
            `;
          })}
        </div>
        <button
          type="button"
          class="sm-action-add-another-btn"
          @click=${() => this.visualAddAction()}
        >
          + Ajouter une autre action
        </button>
      </div>
    `;
  }

  private getClimatePresetModesForAction(action: BlockAction): string[] | null {
    if (!this.hass || action.action_type.trim() !== 'climate.set_preset_mode') {
      return null;
    }
    const ids = entityIdsFromPayload(action.action_payload);
    for (const id of ids) {
      if (!id.startsWith('climate.')) {
        continue;
      }
      const st = this.hass.states[id];
      if (!st) {
        continue;
      }
      const pm = st.attributes?.preset_modes;
      if (Array.isArray(pm) && pm.length > 0 && pm.every((x): x is string => typeof x === 'string')) {
        return pm;
      }
    }
    return null;
  }

  private renderClimatePresetForAction(action: BlockAction, actionIndex: number) {
    const modes = this.getClimatePresetModesForAction(action);
    if (!modes?.length) {
      return html``;
    }
    const cur = String(
      (action.action_payload as Record<string, unknown>)?.preset_mode ?? ''
    );
    const orphan = cur && !modes.includes(cur);
    return html`
      <label class="sm-form-label sm-form-label-last sm-action-climate-preset">
        Mode préréglé
        <select
          class="sm-select"
          .value=${live(cur)}
          @change=${(e: Event) =>
            this.visualSetPresetModeAt(
              actionIndex,
              (e.target as HTMLSelectElement).value
            )}
        >
          ${orphan ? html`<option value=${cur}>${cur} (actuel)</option>` : null}
          ${modes.map((m) => html`<option value=${m}>${m}</option>`)}
        </select>
      </label>
    `;
  }

  private async saveVisualEditor() {
    if (!this._visualEdit) {
      return;
    }
    const { scheduleId, blocks, repeatDays } = this._visualEdit;
    for (const b of blocks) {
      const ok = (b.actions || []).some((a) => String(a.action_type ?? '').trim());
      if (!ok) {
        alert(
          'Chaque plage doit avoir au moins une action avec un service défini (assistant « Choisir une action »).'
        );
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
    if (hasOverlappingSameDayBlocks(blocks)) {
      alert(
        'Des plages se chevauchent sur la journée. Corrigez les horaires avant d’enregistrer.'
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

  private visualSetPresetMode(mode: string) {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    const ai = Math.min(
      this._visualEdit.selectedActionIndex,
      Math.max(0, (block?.actions?.length ?? 1) - 1)
    );
    const action = block?.actions?.[ai];
    if (!block || !action) {
      return;
    }
    const base =
      typeof action.action_payload === 'object' && action.action_payload !== null
        ? { ...(action.action_payload as Record<string, unknown>) }
        : {};
    base.preset_mode = mode;
    this.visualPatchSelectedAction({ action_payload: base });
  }

  /** Couleur affichée sur la frise : métadonnée sur la première action du créneau. */
  private hasCustomBlockColor(block: TimeBlock): boolean {
    const p = block.actions?.[0]?.action_payload;
    if (!p || typeof p !== 'object') {
      return false;
    }
    return typeof (p as Record<string, unknown>)[SCHEDULE_MANAGER_COLOR_KEY] === 'string';
  }

  private blockColorPickerHex(block: TimeBlock): string {
    const p = block.actions?.[0]?.action_payload;
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
    if (!block?.actions?.length) {
      return;
    }
    const actions = block.actions.map((a, i) => {
      if (i !== 0) {
        return a;
      }
      const base =
        typeof a.action_payload === 'object' && a.action_payload !== null
          ? { ...(a.action_payload as Record<string, unknown>) }
          : {};
      base[SCHEDULE_MANAGER_COLOR_KEY] = hex;
      return { ...a, action_payload: base };
    });
    const next = { ...block, actions };
    const trial = [...this._visualEdit.blocks];
    trial[sel] = next;
    this._visualEdit = { ...this._visualEdit, blocks: trial };
  }

  private visualClearBlockColor() {
    if (!this._visualEdit) {
      return;
    }
    const sel = this._visualEdit.selectedIndex;
    const block = this._visualEdit.blocks[sel];
    if (!block?.actions?.length) {
      return;
    }
    const actions = block.actions.map((a, i) => {
      if (i !== 0) {
        return a;
      }
      const base =
        typeof a.action_payload === 'object' && a.action_payload !== null
          ? { ...(a.action_payload as Record<string, unknown>) }
          : {};
      delete base[SCHEDULE_MANAGER_COLOR_KEY];
      return { ...a, action_payload: base };
    });
    const next = { ...block, actions };
    const trial = [...this._visualEdit.blocks];
    trial[sel] = next;
    this._visualEdit = { ...this._visualEdit, blocks: trial };
  }

  private renderBlockColorControls(block: TimeBlock) {
    const pickerVal = this.blockColorPickerHex(block);
    const custom = this.hasCustomBlockColor(block);
    return html`
      <div class="sm-form-label sm-color-field">
        <span class="sm-color-field-title">Couleur du créneau sur la ligne horaire</span>
        <p class="sm-color-field-hint">
          Teinte affichée pour la plage sélectionnée sur la frise « Heure » ci‑dessus (pas la couleur
          de la pièce dans Home Assistant).
        </p>
        <div class="sm-color-row">
          <label class="sm-color-system-label">
            <span class="sm-color-system-text">Nuancier du navigateur</span>
            <input
              type="color"
              class="sm-color-native"
              .value=${pickerVal}
              title="Ouvrir le sélecteur de couleur du système"
              aria-label="Choisir une couleur précise avec le nuancier du navigateur"
              @input=${(e: Event) =>
                this.visualSetBlockColor((e.target as HTMLInputElement).value)}
            />
          </label>
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
    const segments = this.sortTimelineSegmentsForPaint(blocksToTimelineSegments(blocks));
    const caps = this.segmentCapIndices(segments);
    const resizeHandles = timelineResizeHandlesForSelection(blocks, selectedIndex);
    const showNow = segments.length > 0;
    const nowPct = nowPercentOfDay();
    return html`
      <div
        class="timeline-frise sm-scheduler-frise sm-editor-frise"
        role="group"
        aria-label="Plages sur 24 heures — cliquer pour sélectionner, poignées pour ajuster"
      >
        <div class="sm-frise-heading">
          <span class="sm-frise-heading-label">Heure</span>
        </div>
        <div class="sm-scheduler-track sm-scheduler-track--editor">
          <div class="sm-scheduler-bar">
            ${segments.map((s, i) => {
              const blk = blocks[s.blockIndex];
              const fill = blk ? blockTimelineFill(blk) : `hsl(${s.hue}, 58%, 42%)`;
              const sel = s.blockIndex === selectedIndex ? 'is-selected' : '';
              const capS = caps.capStart.has(i) ? 'sm-slot--cap-start' : '';
              const capE = caps.capEnd.has(i) ? 'sm-slot--cap-end' : '';
              return html`
                <div
                  class="sm-slot ${sel} ${capS} ${capE}"
                  style=${this.schedulerSlotAbsoluteStyle(s.leftPct, s.widthPct, fill)}
                  title=${s.blockIndex === selectedIndex
                    ? `${s.label} — glisser pour déplacer la plage`
                    : s.label}
                  @pointerdown=${(e: PointerEvent) => this.onSlotPointerDown(e, s.blockIndex)}
                  @click=${(e: Event) => this.onSlotClick(e, s.blockIndex)}
                >
                  <span class="sm-slot-label">${s.label}</span>
                </div>
              `;
            })}
          </div>
          ${resizeHandles.map((h) => {
            const label =
              h.kind === 'junction'
                ? 'Ajuster la transition entre deux plages'
                : h.kind === 'start'
                  ? 'Déplacer le début de la plage'
                  : 'Déplacer la fin de la plage';
            const title =
              h.kind === 'junction'
                ? 'Glisser pour déplacer la transition'
                : h.kind === 'start'
                  ? 'Glisser pour modifier l’heure de début'
                  : 'Glisser pour modifier l’heure de fin';
            return html`
              <button
                type="button"
                class="sm-scheduler-handle"
                style=${styleMap({
                  left: `${h.pct}%`,
                  transform: 'translateX(-50%)',
                })}
                aria-label=${label}
                title=${title}
                @pointerdown=${(e: PointerEvent) => this.onResizePointerDown(e, h)}
              >
                <span class="sm-scheduler-handle-grip"></span>
              </button>
            `;
          })}
          ${showNow
            ? html`<div
                class="timeline-now"
                style="position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;left:${nowPct}%"
              ></div>`
            : null}
        </div>
        ${this.renderSchedulerTimeScale('editor')}
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
                          this.visualPatchBlockFields({
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
                          this.visualPatchBlockFields({
                            end_time: normalizeTimeForHa(
                              (e.target as HTMLInputElement).value
                            ),
                          })}
                      />
                    </label>
                  </div>
                  ${this.renderBlockColorControls(selected)}
                  <div class="sm-action-card">
                    <h4>Actions pendant cette plage</h4>
                    ${this.renderActionPlanningControls(selected)}
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
