import { css } from '@moneko/css';

export const style = css`
  .box {
    position: relative;
    display: flex;
    border-radius: var(--border-radius);
    padding: 2px;
    max-inline-size: 100%;
    min-block-size: 28px;
    background-color: var(--segmented-bg);
    line-height: 28px;
    inline-size: fit-content;

    &::before {
      position: absolute;
      display: block;
      border-radius: var(--border-radius);
      background-color: var(--segmented-current-bg);
      box-shadow: 0 2px 8px 0 var(--primary-shadow);
      content: '';
      inline-size: var(--w);
      block-size: var(--h);
      inset-block-start: 2px;
      inset-inline-start: var(--left);
      transition-duration: var(--transition-duration);
      transition-timing-function: var(--transition-timing-function);
      transition-property: inline-size, block-size, inset-inline-start, background-color;
    }
  }

  .label {
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius);
    padding: 0 12px;
    color: var(--text-color);
    outline: 0;
    transition:
      0.3s background-color var(--transition-timing-function),
      var(--transition-duration) color var(--transition-timing-function);
    cursor: pointer;
    box-sizing: border-box;
    /* stylelint-disable-next-line */
    display: -webkit-box;
    -webkit-box-orient: block-axis;
    -webkit-line-clamp: var(--rows, 1);
    word-break: break-word;
    word-wrap: break-word;
    font-size: var(--font-size);

    &:hover,
    &:focus {
      background-color: var(--primary-selection);
    }

    &[aria-disabled]:not([aria-disabled='false']) {
      cursor: not-allowed;
      color: var(--disable-color);

      &:hover,
      &:focus {
        background-color: transparent;
      }
    }

    .icon {
      margin-inline-end: 6px;
    }
  }

  .segmented {
    display: none;
    pointer-events: none;

    &:checked + .label {
      color: var(--text-heading);
      background-color: transparent;

      &[aria-disabled]:not([aria-disabled='false']) {
        color: var(--disable-color);
      }
    }
  }
`;
