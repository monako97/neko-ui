import { css } from '@moneko/css';

export const style = css`
  .container {
    position: relative;
    overflow-y: auto;
  }

  .icon {
    font-size: 14px;
    margin-inline-end: 6px;
  }

  .item,
  .group {
    border-radius: calc(var(--border-radius) / 1.5);
    transition: 0.2s background-color ease, 0.2s color ease;
    box-sizing: border-box;
    line-height: 1.57;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 12px;
    color: var(--text-color);
    cursor: pointer;

    &:hover:not(&[aria-disabled]:not([aria-disabled='false'])) {
      &:not([aria-selected='true'], .danger) {
        background-color: var(--disable-bg);
      }
    }

    &[aria-disabled]:not([aria-disabled='false']) {
      cursor: not-allowed;
      color: var(--disable-color);
    }

    &[aria-selected='true'] {
      color: var(--text-heading);
      background-color: var(--primary-selection);

      & + & {
        border-start-end-radius: 0;
        border-start-start-radius: 0;
      }

      &:has(+ &[aria-selected='true']) {
        border-end-end-radius: 0;
        border-end-start-radius: 0;
      }
    }

    &.danger {
      color: var(--error-color);

      &[aria-selected='true'],
      &:hover {
        color: #fff;
        background-color: var(--error-color);
      }
    }
  }

  .selectable {
    .container {
      div.item[aria-selected='true'] {
        padding-inline-end: 0;

        &::after {
          display: inline-block;
          padding: 0 8px;
          opacity: 0.5;
          content: '✓';
        }
      }
    }
  }

  .group {
    position: relative;
  }

  .group-title {
    position: sticky;
    z-index: 1;
    display: block;
    padding: 5px;
    font-size: 12px;
    color: var(--text-secondary);
    background-color: var(--component-bg);
    inset-block-start: -2px;
  }
`;
