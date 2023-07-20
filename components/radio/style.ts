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

  .radio {
    position: relative;
    display: inline-block;
    margin: 0;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    background-color: var(--component-bg);
    appearance: none;
    inline-size: 16px;
    block-size: 16px;
    pointer-events: none;
    transition: 120ms border-color linear;
    user-select: none;

    &::before {
      position: absolute;
      display: inline-block;
      margin: auto;
      border-radius: 50%;
      box-shadow: inset 0 0 0 8px var(--primary-color);
      inset-block-start: 0;
      inset-block-end: 0;
      inset-inline-start: 0;
      inset-inline-end: 0;
      content: '';
      inline-size: 10px;
      block-size: 10px;
      transform: scale(0);
      transition: 120ms transform var(--transition-timing-function);
    }

    &:active {
      border-color: var(--primary-active);

      &::before {
        --primary-color: var(--primary-active);
      }
    }

    &:checked {
      border-color: var(--primary-color);

      &::before {
        transform: scale(1);
      }
    }

    &:disabled {
      border-color: var(--disable-border);

      &::before {
        --primary-color: var(--disable-border);
      }
    }

    &:not(:disabled, :checked):hover {
      border-color: var(--primary-hover);

      &::before {
        --primary-color: var(--primary-hover);
      }
    }
  }

  .label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--text-color);
    cursor: pointer;
    box-sizing: border-box;
    gap: 6px;
    outline: 0;

    &:has(:checked) {
      --text-color: var(--primary-color);
    }

    &:not([aria-disabled]:not([aria-disabled='false'])):focus .radio {
      box-shadow: 0 0 0 3px var(--primary-outline);

      &:not(:checked) {
        border-color: var(--primary-hover);
      }
    }

    &[aria-disabled]:not([aria-disabled='false']) {
      --text-color: var(--disable-color);

      cursor: not-allowed;
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
