import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .card {
    padding: 16px;
  }

  .schedule {
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--divider-color);
  }

  .schedule:last-child {
    border-bottom: none;
  }

  .schedule-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .schedule-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-danger {
    padding: 6px 10px;
    font-size: 0.85em;
    border-radius: 4px;
    border: 1px solid var(--error-color, #db4437);
    background: transparent;
    color: var(--error-color, #db4437);
    cursor: pointer;
  }

  .btn-danger:hover {
    background: rgba(219, 68, 55, 0.12);
  }

  .subsection-title {
    font-size: 0.85em;
    font-weight: 600;
    margin: 12px 0 6px;
    color: var(--secondary-text-color);
  }

  .time-block-col {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 0.9em;
  }

  .payload-preview {
    font-size: 0.75em;
    opacity: 0.85;
    word-break: break-all;
  }

  .block-remove {
    flex-shrink: 0;
    padding: 4px 8px;
    font-size: 0.8em;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }

  .add-block-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 8px;
    align-items: end;
  }

  @media (max-width: 450px) {
    .add-block-form {
      grid-template-columns: 1fr;
    }
  }

  .add-block-form label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.8em;
    color: var(--secondary-text-color);
  }

  .add-block-form input.time-field,
  .add-block-form input[type='text'],
  .add-block-form textarea {
    padding: 6px 8px;
    border-radius: 4px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
  }

  .add-block-form textarea {
    grid-column: 1 / -1;
    min-height: 52px;
    resize: vertical;
  }

  .add-block-form .full-row {
    grid-column: 1 / -1;
  }

  .add-block-form button.add-plage {
    grid-column: 1 / -1;
    padding: 8px;
    border-radius: 4px;
    border: none;
    background: var(--primary-color);
    color: var(--text-primary-color);
    cursor: pointer;
  }

  .time-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px;
    border: 1px solid var(--divider-color);
    border-left: 4px solid var(--block-accent, rgba(127, 127, 127, 0.45));
    border-radius: 4px;
    margin-bottom: 4px;
  }

  .active {
    background-color: var(--primary-color);
    color: var(--text-primary-color);
  }

  .empty-hint {
    color: var(--secondary-text-color);
    font-size: 0.9em;
    line-height: 1.4;
    margin-bottom: 12px;
  }

  .create-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-top: 8px;
  }

  .create-row input[type='text'] {
    flex: 1;
    min-width: 160px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }

  .create-row button {
    padding: 8px 14px;
    border-radius: 4px;
    border: none;
    background: var(--primary-color);
    color: var(--text-primary-color);
    cursor: pointer;
  }

  .create-row button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  code.inline {
    font-size: 0.85em;
    background: rgba(127, 127, 127, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .timeline-hint {
    font-size: 0.78em;
    color: var(--secondary-text-color);
    margin: -4px 0 8px;
    line-height: 1.35;
  }

  /* Frise 24 h — variante « thermostat » (barre continue, type intégration HA) */
  .timeline-frise {
    margin: 0 0 16px;
    padding: 10px 12px;
    border-radius: 8px;
    background: rgba(127, 127, 127, 0.08);
    border: 1px solid var(--divider-color);
  }

  .timeline-frise--hvac {
    padding: 12px 14px 14px;
    border-radius: 12px;
    background: rgba(30, 30, 30, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .timeline-rail {
    position: relative;
    height: 52px;
    border-radius: 6px;
    background: rgba(127, 127, 127, 0.18);
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12);
  }

  .timeline-rail--continuous {
    height: 56px;
    border-radius: 999px;
    overflow: hidden;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.42) 0%,
      rgba(0, 0, 0, 0.22) 100%
    );
    box-shadow:
      inset 0 2px 8px rgba(0, 0, 0, 0.45),
      inset 0 -1px 0 rgba(255, 255, 255, 0.06),
      0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .timeline-segment {
    position: absolute;
    top: 0;
    height: 100%;
    min-width: 3px;
    box-sizing: border-box;
    padding: 2px 6px;
    color: var(--text-primary-color, #fff);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .timeline-segment--hvac {
    border-right: 1px solid rgba(255, 255, 255, 0.14);
    border-left: none;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .timeline-frise--hvac .timeline-segment.is-selected {
    z-index: 3;
    box-shadow:
      inset 0 0 0 3px rgba(255, 255, 255, 0.95),
      0 0 0 2px rgba(0, 0, 0, 0.35),
      0 0 16px rgba(255, 255, 255, 0.25);
    filter: saturate(1.12) brightness(1.05);
  }

  .timeline-segment-label {
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.15;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    padding: 0 2px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
  }

  .timeline-now {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    margin-left: -1px;
    background: var(--accent-color, var(--primary-color));
    opacity: 0.95;
    z-index: 5;
    pointer-events: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  }

  .timeline-scale {
    position: relative;
    height: 26px;
    margin-top: 8px;
    margin-bottom: 2px;
  }

  .timeline-scale-item {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .timeline-scale-item--start {
    transform: translateX(0);
    align-items: flex-start;
  }

  .timeline-scale-item--center {
    transform: translateX(-50%);
  }

  .timeline-scale-item--end {
    transform: translateX(-100%);
    align-items: flex-end;
  }

  .timeline-scale-mark {
    width: 1px;
    height: 9px;
    border-radius: 1px;
    background: rgba(255, 255, 255, 0.28);
  }

  .timeline-scale-label {
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--secondary-text-color);
    white-space: nowrap;
    letter-spacing: 0.02em;
  }

  .sm-frise-heading {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 2px;
  }

  .sm-frise-heading-label {
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--primary-text-color);
  }

  /* Entités (formulaire plage) */
  .entity-picker-row {
    grid-column: 1 / -1;
  }

  .entity-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 6px;
  }

  .entity-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    font-size: 0.75rem;
    border-radius: 16px;
    background: rgba(127, 127, 127, 0.2);
    max-width: 100%;
  }

  .entity-chip code {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 220px;
  }

  .entity-chip button {
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--error-color, #c62828);
    font-size: 1rem;
    line-height: 1;
    padding: 0 2px;
  }

  .btn-open-config {
    width: 100%;
    margin: 10px 0 12px;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--primary-color);
    color: var(--text-primary-color);
    font-size: 0.95em;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-open-config:hover {
    filter: brightness(1.06);
  }

  /* Éditeur plein écran (style config HA) */
  .sm-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.52);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: max(12px, env(safe-area-inset-top)) 12px 24px;
    overflow: auto;
    box-sizing: border-box;
  }

  .sm-modal {
    width: min(100%, 520px);
    margin-top: 8px;
    margin-bottom: 24px;
    border-radius: 12px;
    background: var(--card-background-color, var(--ha-card-background, #1e1e1e));
    border: 1px solid var(--divider-color);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
    color: var(--primary-text-color);
  }

  .sm-modal-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px 10px;
    border-bottom: 1px solid var(--divider-color);
  }

  .sm-modal-head h2 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 600;
  }

  .sm-icon-btn {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
  }

  .sm-icon-btn:hover {
    background: rgba(127, 127, 127, 0.2);
    color: var(--primary-text-color);
  }

  .sm-modal-sub {
    padding: 12px 16px 8px;
    font-size: 0.82em;
    color: var(--secondary-text-color);
  }

  .sm-modal-sub span {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .sm-repeat-days {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .sm-day {
    min-width: 2.85rem;
    padding: 10px 10px;
    border-radius: 10px;
    border: 1px solid var(--divider-color);
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.95em;
    font-weight: 500;
    cursor: pointer;
  }

  .sm-day.on {
    border-color: var(--primary-color);
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.18);
    color: var(--primary-text-color);
    font-weight: 600;
  }

  .sm-toolbar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 4px 16px 14px;
    align-items: stretch;
  }

  .sm-tool-btn {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-size: 0.92em;
    font-weight: 600;
    cursor: pointer;
  }

  .sm-tool-accent {
    border-color: rgba(33, 150, 243, 0.55);
    background: rgba(33, 150, 243, 0.15);
    color: var(--primary-color, #2196f3);
  }

  .sm-tool-btn.danger {
    border-color: rgba(219, 68, 55, 0.55);
    color: var(--error-color, #ef5350);
    background: rgba(239, 83, 80, 0.08);
  }

  .sm-tool-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .sm-editor-frise {
    margin: 0 16px 12px;
  }

  .sm-color-field {
    margin-bottom: 14px;
  }

  .sm-color-field-title {
    display: block;
    margin-bottom: 8px;
    font-size: 0.78em;
    color: var(--secondary-text-color);
  }

  .sm-color-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .sm-color-native {
    width: 52px;
    height: 40px;
    padding: 0;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    cursor: pointer;
    background: var(--card-background-color);
  }

  .sm-color-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    flex: 1;
    min-width: 0;
  }

  .sm-color-swatch {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.25);
    cursor: pointer;
    padding: 0;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }

  .sm-color-swatch:hover {
    transform: scale(1.08);
  }

  .sm-color-reset {
    padding: 8px 12px;
    font-size: 0.8em;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    white-space: nowrap;
  }

  .sm-color-reset:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .sm-modal-body {
    padding: 0 16px 12px;
  }

  .sm-form-label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 10px;
    font-size: 0.78em;
    color: var(--secondary-text-color);
  }

  .sm-form-label input[type='text'] {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
    font-size: 1rem;
  }

  .sm-form-label-last {
    margin-bottom: 0;
  }

  .sm-payload-textarea {
    min-height: 72px;
    resize: vertical;
    font-family: inherit;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }

  .sm-action-card {
    margin-top: 4px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid var(--divider-color);
    background: rgba(127, 127, 127, 0.06);
  }

  .sm-action-card h4 {
    margin: 0 0 10px;
    font-size: 0.88em;
    font-weight: 600;
    color: var(--secondary-text-color);
  }

  .sm-time-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }

  .sm-time-row label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.78em;
    color: var(--secondary-text-color);
  }

  .sm-time-row input {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
  }

  .sm-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding: 14px 16px 16px;
    border-top: 1px solid var(--divider-color);
  }

  .btn-text {
    padding: 8px 4px;
    border: none;
    background: transparent;
    font-size: 0.95em;
    cursor: pointer;
    font-family: inherit;
  }

  .btn-text.primary {
    color: var(--primary-color);
    font-weight: 600;
  }

  .btn-text.danger {
    color: var(--secondary-text-color);
    margin-right: auto;
  }

  .sm-editor-rail .timeline-segment {
    cursor: pointer;
  }

  .sm-editor-rail .timeline-segment:hover:not(.is-selected) {
    filter: brightness(1.08);
  }

  .timeline-boundary-handle {
    position: absolute;
    top: 50%;
    width: 30px;
    height: 30px;
    margin-top: -15px;
    margin-left: -15px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: rgba(245, 248, 252, 0.96);
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.28),
      0 3px 10px rgba(0, 0, 0, 0.35);
    cursor: ew-resize;
    z-index: 6;
    touch-action: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(55, 71, 79, 0.85);
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
  }

  .timeline-boundary-handle::after {
    content: '\2039 \203A';
    letter-spacing: 0.02em;
    pointer-events: none;
    font-size: 12px;
  }

  .timeline-boundary-handle:hover {
    background: var(--primary-color, #2196f3);
    color: var(--text-primary-color, #fff);
    box-shadow:
      0 0 0 2px rgba(255, 255, 255, 0.35),
      0 4px 12px rgba(33, 150, 243, 0.55);
  }

  .sm-select {
    width: 100%;
    max-width: 100%;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
  }
`;