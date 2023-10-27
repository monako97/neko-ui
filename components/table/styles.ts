import { css } from '@moneko/css';

export const styles = css`
  :host {
    --table-heading-bg: var(--border-color);
    --distance-horizontal: 16px;
    --distance-vertical: 8px;
  }

  .table-cell {
    padding: var(--distance-vertical) var(--distance-horizontal);

    n-button::part(button) {
      padding: 0;
      min-block-size: unset;
    }
  }

  .small {
    --distance-horizontal: 12px;
    --distance-vertical: 6px;
  }

  .large {
    --distance-horizontal: 20px;
    --distance-vertical: 10px;
  }

  .table {
    border-collapse: collapse;
    display: table;
    border-block-end: 1px solid var(--table-heading-bg);
    inline-size: 100%;
    max-inline-size: 100%;
    border-spacing: 0;
    transition-property: border-color;
    word-break: break-all;

    &:has(.table-foot) {
      border-block-end: none;
    }

    .table-title {
      padding-block: var(--distance-vertical);
      font-weight: bold;
      text-align: start;
    }

    th {
      font-weight: 500;
      color: var(--text-heading);
      background-color: var(--table-heading-bg);
      transition-property: background-color, color;
    }

    .table-head {
      .table-cell {
        min-inline-size: 54px;

        &:has(+ .table-cell) {
          position: relative;

          &::after {
            position: absolute;
            z-index: 1;
            display: block;
            margin: auto;
            background-color: var(--text-secondary);
            inset-block: 0 0;
            inset-inline-end: 0;
            content: '';
            block-size: 16px;
            inline-size: 1px;
            opacity: 0.5;
          }
        }
      }
    }

    :not(tfoot) {
      tr:first-child th:first-child {
        border-start-start-radius: var(--border-radius);
      }

      tr:first-child th:last-child {
        border-start-end-radius: var(--border-radius);
      }
    }

    .table-body {
      tr:nth-child(2n) {
        background-color: var(--primary-details-bg);
      }

      tr:hover {
        background-color: var(--primary-selection);
      }
    }

    .table-foot {
      background-color: var(--primary-selection);

      tr:last-child th:first-child {
        border-end-start-radius: var(--border-radius);
      }

      tr:last-child td:last-child {
        border-end-end-radius: var(--border-radius);
      }
    }

    .empty-val {
      opacity: 0.5;
    }
  }

  .table-pagination {
    display: block;
    inline-size: fit-content;
    margin-block-start: 16px;
    margin-inline-start: auto;
  }
`;
