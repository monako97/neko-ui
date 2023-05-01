import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  switch: prefixCls('switch'),
  checked: prefixCls('switch-checked'),
  loading: prefixCls('switch-loading'),
};

injectGlobal`
  .${cls.switch} {
    position: relative;
    display: inline-block;
    border-radius: 12px;
    padding: 2px;
    font-size: 12px;
    background-color: var(--primary-border);
    transition-duration: 0.3s;
    transition-property: background-color, box-shadow, opacity;
    cursor: pointer;
    inline-size: fit-content;
    min-inline-size: 42px;
    block-size: 22px;
    line-height: 18px;
    user-select: none;
    box-sizing: border-box;
    opacity: 1;

    &::before {
      color: var(--primary-secondary);
      padding-inline: 20px 8px;
      transition-duration: 0.3s;
      transition-property: color, padding, background-color;
      content: attr(data-off) '';
    }

    &::after {
      position: absolute;
      border: 2px solid #fff;
      border-radius: 9px;
      padding: 5px;
      background-color: #fff;
      outline: 2.05px solid #fff;
      box-shadow: 0 2px 4px 1px var(--primary-shadow);
      outline-offset: -0.05px;
      inset-block-start: 4px;
      transition-duration: 0.3s;
      transition-property: padding, background-color;
      content: '';
      inset-inline-start: 4px;
      inset-inline-end: unset;
    }

    &:hover {
      background-color: var(--primary-secondary-bg);
    }

    &:not([data-disabled]),
    &[data-disabled='false'] {
      &:not(.${cls.loading}):active::after {
        padding: 5px 10px;
        background-color: var(--primary-border);
      }
    }
    &.${cls.loading}, &[data-disabled]:not([data-disabled='false']) {
      opacity: 0.8;
      cursor: not-allowed;
      color: var(--disable-color);
      background-color: var(--disable-bg);
    }
  }
  .${cls.loading} {
    &::after {
      border-block-start-color: var(--primary-color);
      animation: switch-loading 1s infinite linear;
    }
  }
  .${cls.checked} {
    box-shadow: inset 0 0 3px 12px var(--primary-color);

    &::before {
      color: #fff;
      padding-inline: 8px 20px;
      content: attr(data-on) '';
    }

    &::after {
      inset-inline-end: 4px;
      inset-inline-start: unset;
    }
  }

  @keyframes switch-loading {
    form {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
