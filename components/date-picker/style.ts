import { css } from '@moneko/css';

export const styles = css`
  .date-time-picker {
    display: flex;
    padding: 0 10px;
    gap: 10px;

    n-button:not(.date-picker-month)::part(button) {
      padding: 0;
    }

    n-button:not(.date-active)::part(button) {
      &:not(:hover) {
        --btn-color: var(--text-color);
      }
    }
  }

  .time-picker {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &-header {
      text-align: center;
      border-block-end: var(--border-base);
    }

    &-items {
      display: flex;
      row-gap: 4px;
      padding-block: 8px;
      flex: 1;
      overflow: hidden;
    }

    n-menu {
      max-block-size: 100%;
      overflow-y: auto;
    }
  }

  .date-picker {
    display: block;
    inline-size: 220px;

    &-header {
      display: flex;
      border-block-end: var(--border-base);
    }

    &-weeks {
      display: flex;
      padding-block-start: 8px;

      /* opacity: 0.65; */
      color: var(--text-secondary);

      span {
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        pointer-events: none;
      }
    }

    &-items {
      display: flex;
      flex-wrap: wrap;
      row-gap: 4px;
      padding-block: 8px;
    }

    &-month {
      inline-size: calc((100% - 8px) / 3);
      text-align: center;
    }

    &-footer {
      border-block-start: var(--border-base);
    }

    .date-prev,
    .date-next,
    .date-value {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--text-secondary);
    }

    .date-prev,
    .date-next,
    .prev-day,
    .next-day,
    .date-day {
      text-align: center;
      inline-size: calc(100% / 7);
    }

    .date-day:nth-child(7n)::part(button),
    .date-day:nth-child(7n - 6)::part(button),
    .date-opacity::part(button) {
      color: var(--text-secondary);
    }

    .date-opacity {
      opacity: 0.3;
    }

    .not-date {
      inline-size: calc((100% - 8px) / 3);
    }

    .date-value {
      flex: 1;
    }

    .date-prev {
      opacity: 0.65;

      &:not(.not-date) {
        .prev-year {
          transform: translateX(6px);
          display: inline-block;
        }
      }

      .prev-year::part(label) {
        transform: translateX(-20%);
      }

      .prev-month {
        transform: translateX(-7px);
        display: inline-block;

        &::part(label) {
          transform: translateX(-25%);
        }
      }
    }

    .date-next {
      opacity: 0.65;

      .next-year {
        transform: translateX(-10px);

        &::part(label) {
          transform: translateX(30%);
        }
      }

      .next-month::part(label) {
        transform: translateX(25%);
      }

      &:not(.not-date) {
        .next-year {
          display: inline-block;
          transform: translateX(-6px);
        }

        .next-month {
          display: inline-block;
          transform: translateX(7px);
        }
      }
    }

    .date-active::part(button) {
      background-color: var(--btn-bg);
    }
  }
`;
