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

  /* Frise 24 h */
  .timeline-frise {
    margin: 0 0 16px;
    padding: 10px 12px;
    border-radius: 8px;
    background: rgba(127, 127, 127, 0.08);
    border: 1px solid var(--divider-color);
  }

  .timeline-rail {
    position: relative;
    height: 52px;
    border-radius: 6px;
    background: rgba(127, 127, 127, 0.18);
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12);
  }

  .timeline-segment {
    position: absolute;
    top: 0;
    height: 100%;
    min-width: 3px;
    box-sizing: border-box;
    padding: 2px 4px;
    color: var(--text-primary-color, #fff);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .timeline-segment-label {
    font-size: 0.65rem;
    font-weight: 600;
    line-height: 1.1;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  }

  .timeline-now {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    margin-left: -1px;
    background: var(--accent-color, var(--primary-color));
    opacity: 0.95;
    z-index: 2;
    pointer-events: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  }

  .timeline-ticks {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
    font-size: 0.68rem;
    color: var(--secondary-text-color);
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
    min-width: 2.5rem;
    padding: 6px 8px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.85em;
    cursor: pointer;
  }

  .sm-day.on {
    border-color: var(--primary-color);
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.18);
    color: var(--primary-text-color);
    font-weight: 600;
  }

  .sm-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 16px 12px;
    flex-wrap: wrap;
  }

  .sm-tool-btn {
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-size: 0.85em;
    cursor: pointer;
  }

  .sm-tool-btn.danger {
    border-color: rgba(219, 68, 55, 0.45);
    color: var(--error-color, #ef5350);
  }

  .sm-tool-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .sm-editor-frise {
    margin: 0 16px 12px;
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

  .timeline-segment.is-selected {
    box-shadow:
      inset 0 0 0 2px rgba(255, 255, 255, 0.95),
      0 0 0 2px rgba(0, 0, 0, 0.35);
    z-index: 1;
    cursor: pointer;
  }

  .sm-editor-rail .timeline-segment {
    cursor: pointer;
  }

  .sm-editor-rail .timeline-segment:hover {
    filter: brightness(1.12);
  }

  .timeline-boundary-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 14px;
    margin-left: -7px;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.35),
      0 2px 6px rgba(0, 0, 0, 0.25);
    cursor: ew-resize;
    z-index: 4;
    touch-action: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.45);
    font-size: 10px;
    line-height: 1;
  }

  .timeline-boundary-handle::after {
    content: '◀▶';
    letter-spacing: -2px;
    pointer-events: none;
  }

  .timeline-boundary-handle:hover {
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
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