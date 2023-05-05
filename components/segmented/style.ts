import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  segmented: prefixCls('segmented'),
  box: prefixCls('segmented-box'),
  label: prefixCls('segmented-label'),
  icon: prefixCls('segmented-icon'),
};

injectGlobal`
  :root {
    --segmented-bg: var(--primary-details-bg);
    --segmented-current-bg: #fff;
  }

  :root[data-theme='dark'] {
    --segmented-bg: #000;
    --segmented-current-bg: #1f1f1f;
  }

  .${cls.box} {
    position: relative;
    display: flex;
    border-radius: var(--border-radius);
    padding: 2px;
    max-inline-size: 100%;
    min-block-size: 28px;
    background-color: var(--segmented-bg);
    line-height: 28px;

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
      transition-timing-function: ease;
      transition-property: inline-size, block-size, inset-inline-start, background-color;
    }
  }
  .${cls.label} {
    position: relative;
    border-radius: var(--border-radius);
    padding: 0 12px;
    color: var(--text-color);
    outline: 0;
    transition: 0.2s background-color ease, 0.3s color ease;
    cursor: pointer;
    box-sizing: border-box;
    /* stylelint-disable-next-line */
    display: -webkit-box;
    -webkit-box-orient: block-axis;
    -webkit-line-clamp: var(--rows, 1);
    word-break: break-word;
    word-wrap: break-word;
    overflow: hidden;

    &:hover,
    &:focus {
      background-color: var(--primary-selection);
    }

    &[data-disabled]:not([data-disabled='false']) {
      cursor: not-allowed;
      color: var(--disable-color);

      &:hover,
      &:focus {
        background-color: transparent;
      }
    }
    .${cls.icon} {
      margin-inline-end: 6px;
    }
  }
  .${cls.segmented} {
    display: none;
    pointer-events: none;

    &:checked + .${cls.label} {
      color: var(--text-heading);
      background-color: transparent;

      &[data-disabled]:not([data-disabled='false']) {
        color: var(--disable-color);
      }
    }
  }
`;
