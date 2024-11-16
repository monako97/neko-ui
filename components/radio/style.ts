import { css } from '@moneko/css';

export const style = css`
  .box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;

    .item,
    .item .label {
      display: inline-flex;
      gap: 6px;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;
      inline-size: fit-content;
    }

    .item {
      outline: 0;

      .radio {
        position: relative;
        display: inline-block;
        margin: 0;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        background-color: var(--component-bg);
        outline: none;
        transition: 120ms border-color linear;
        appearance: none;
        inline-size: 16px;
        block-size: 16px;
        pointer-events: none;
        user-select: none;

        &::before {
          position: absolute;
          display: inline-block;
          margin: auto;
          border-radius: 50%;
          box-shadow: inset 0 0 0 8px var(--primary-color);
          inset-block: 0;
          inset-inline: 0;
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
        color: var(--text-color);
        outline: 0;
        cursor: inherit;
      }

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
    }
  }

  .horizontal {
    flex-direction: row;
  }

  .vertical {
    flex-direction: column;
  }

  ${['success', 'error', 'warning']
    .map(
      (s) =>
        `.${s} {--border-color: var(--${s}-border);--primary-hover: var(--${s}-hover);--primary-outline: var(--${s}-outline);--primary-color: var(--${s}-color);--primary-active: var(--${s}-active);--component-bg: var(--${s}-bg);}`,
    )
    .join('')}
`;
