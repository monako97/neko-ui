import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  box: prefixCls('radio-box'),
  radio: prefixCls('radio'),
  label: prefixCls('radio-label'),
  vertical: prefixCls('radio-vertical'),
  horizontal: prefixCls('radio-horizontal'),
};

injectGlobal`
  .${cls.box} {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
  }
  .${cls.horizontal} {
    flex-direction: row;
  }
  .${cls.vertical} {
    flex-direction: column;
  }
  .${cls.label} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    gap: 6px;
    outline: 0;

    &:not([aria-disabled]:not([aria-disabled='false'])):focus .${cls.radio} {
      box-shadow: 0 0 0 3px var(--primary-outline);

      &:not(:checked) {
        border-color: var(--primary-hover);
      }
    }

    &[aria-disabled]:not([aria-disabled='false']) {
      cursor: not-allowed;
      color: var(--disable-color);
    }

    &:last-child {
      margin-inline-end: 16px;
    }
  }
  .${cls.radio} {
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
      transition: 120ms transform ease-in-out;
    }

    &:not(:disabled, :checked):hover {
      border-color: var(--primary-hover);

      &::before {
        --primary-color: var(--primary-hover);
      }
    }

    &:checked {
      border-color: var(--primary-color);

      &::before {
        transform: scale(1);
      }
    }

    &:active {
      border-color: var(--primary-active);

      &::before {
        --primary-color: var(--primary-active);
      }
    }

    &:disabled {
      border-color: var(--disable-border);

      &::before {
        --primary-color: var(--disable-border);
      }
    }
  }
`;
