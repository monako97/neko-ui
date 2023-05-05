import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  box: prefixCls('checkbox-box'),
  checkbox: prefixCls('checkbox'),
  label: prefixCls('checkbox-label'),
  vertical: prefixCls('checkbox-vertical'),
  horizontal: prefixCls('checkbox-horizontal'),
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

    &:not([data-disabled]:not([data-disabled='false'])):focus .${cls.checkbox} {
      outline: 3px solid var(--primary-outline);

      &:not(:checked) {
        border-color: var(--primary-hover);
      }
    }

    &[data-disabled]:not([data-disabled='false']) {
      cursor: not-allowed;
      color: var(--disable-color);
    }

    &:last-child {
      margin-inline-end: 16px;
    }
  }
  .${cls.checkbox} {
    position: relative;
    display: inline-block;
    margin: 0;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--component-bg);
    appearance: none;
    inline-size: 16px;
    block-size: 16px;
    pointer-events: none;
    outline: 0 solid transparent;
    box-shadow: inset 0 0 0 var(--shadow-w, 0) var(--primary-color);
    transition: 0.2s border-color linear, 0.2s box-shadow linear, 0.2s outline linear;
    user-select: none;

    &::before {
      position: absolute;
      display: block;
      margin: auto;
      border-style: solid;
      border-width: 0 0 2px 2px;
      border-color: transparent;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      transition-property: background-color, transform, border-color, height;
      box-sizing: border-box;
      inset-block-start: 0;
      inset-block-end: 0;
      inset-inline-start: 0;
      inset-inline-end: 0;
      content: '';
      inline-size: 10px;
      block-size: 10px;
      transform: scale(0);
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

    &:checked {
      --shadow-w: 16px;
      --border-color: var(--primary-color);

      &::before {
        block-size: 5px;
        border-color: var(--primary-outline);
        transform: rotate(-55deg) translateY(-10%) translateX(5%) scale(1);
      }
    }

    &:active {
      --primary-color: var(--primary-active);
      --border-color: var(--primary-active);
    }

    &:disabled {
      --border-color: var(--disable-border);
      --primary-color: var(--disable-border);
    }
  }
`;
