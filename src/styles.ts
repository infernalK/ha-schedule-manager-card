import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .card {
    padding: 16px;
  }

  .schedule {
    margin-bottom: 8px;
  }

  .time-block {
    display: flex;
    justify-content: space-between;
    padding: 4px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    margin-bottom: 4px;
  }

  .active {
    background-color: var(--primary-color);
    color: var(--text-primary-color);
  }
`;