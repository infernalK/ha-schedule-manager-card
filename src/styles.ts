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

  /* Frise 24 h */
  .timeline-frise {
    margin: 10px 0 14px;
  }

  .timeline-rail {
    position: relative;
    height: 44px;
    border-radius: 6px;
    background: rgba(127, 127, 127, 0.15);
    overflow: hidden;
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
`;