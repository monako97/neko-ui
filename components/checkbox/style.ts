import { css } from '@moneko/css';

export const style = css`
  .box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
  }

  .horizontal {
    flex-direction: row;
  }

  .vertical {
    flex-direction: column;
  }

  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    gap: 6px;
    outline: 0;

    label {
      color: var(--text-color);
      cursor: pointer;
    }

    .checkbox {
      position: relative;
      display: inline-block;
      margin: 0;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--component-bg);
      outline: 0 solid transparent;
      box-shadow: inset 0 0 0 var(--shadow-w, 0) var(--primary-color);
      transition:
        0.3s border-color var(--transition-timing-function),
        0.3s box-shadow var(--transition-timing-function),
        0.3s outline var(--transition-timing-function);
      appearance: none;
      inline-size: 16px;
      block-size: 16px;
      pointer-events: none;
      user-select: none;

      &:active {
        --primary-color: var(--primary-active);
        --border-color: var(--primary-active);
      }

      &:disabled {
        --border-color: var(--disable-border);
        --primary-color: var(--disable-border);
      }

      &::before {
        position: absolute;
        display: block;
        margin: auto;
        border-style: solid;
        border-width: 0 0 2px 2px;
        border-color: transparent;
        transition-duration: 0.3s;
        transition-timing-function: var(--transition-timing-function);
        transition-property: background-color, transform, border-color, height;
        box-sizing: border-box;
        inset-block: 0;
        inset-inline: 0;
        content: '';
        inline-size: 10px;
        block-size: 10px;
        transform: scale(0);
      }

      &:checked {
        --shadow-w: 16px;
        --border-color: var(--primary-color);

        &::before {
          block-size: 5px;
          border-color: var(--primary-outline);
          transform: rotate(-55deg) translateY(-10%) translateX(5%) scale(1);
        }

        & + label {
          --text-color: var(--primary-color);
        }
      }

      &:indeterminate:not(:checked) {
        &::before {
          border-radius: 2px;
          background-color: var(--primary-color);
          transform: scale(1);
        }
      }

      &:not(:disabled, :checked):hover {
        --primary-color: var(--primary-hover);
        --border-color: var(--primary-hover);
      }
    }

    &:not([aria-disabled]:not([aria-disabled='false'])):focus .checkbox {
      outline: 3px solid var(--primary-outline);

      &:not(:checked) {
        border-color: var(--primary-hover);
      }
    }

    &[aria-disabled]:not([aria-disabled='false']) {
      cursor: not-allowed;

      & > label {
        --text-color: var(--disable-color);

        cursor: not-allowed;
      }
    }

    &:last-child {
      margin-inline-end: 16px;
    }
  }

  ${['success', 'error', 'warning']
    .map(
      (s) =>
        `.${s} {--border-color: var(--${s}-border);--primary-hover: var(--${s}-hover);--primary-outline: var(--${s}-outline);--primary-color: var(--${s}-color);--primary-active: var(--${s}-active);--component-bg: var(--${s}-bg);}`,
    )
    .join('')}
`;
