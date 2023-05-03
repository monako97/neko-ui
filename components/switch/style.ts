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
    opacity: 1;
    outline: 0;
    box-shadow: inset 0 0 0 0 var(--primary-color), 0 0 0 0 var(--primary-hover),
      0 0 0 0 var(--primary-border);
    transition: 0.4s box-shadow, 0.3s background-color, 0.3s opacity;
    cursor: pointer;
    inline-size: fit-content;
    min-inline-size: 42px;
    block-size: 22px;
    line-height: 18px;
    user-select: none;
    box-sizing: border-box;

    &::before {
      color: var(--primary-secondary);
      padding-inline: 20px 8px;
      transition-duration: 0.3s;
      transition-property: color, padding, background-color;
      content: attr(data-off) '';
    }

    &::after {
      position: absolute;
      margin: auto;
      border: 1.5px solid #fff;
      border-radius: 12px;
      background-color: #fff;
      outline: 2.05px solid #fff;
      box-shadow: 0 2px 4px 1px var(--primary-shadow);
      transition: 0.3s padding, 0.3s background-color 0.1s, 0.3s left, 0.6s transform,
        0.3s border-color;
      outline-offset: -0.05px;
      inset-block-start: 3px;
      inset-block-end: 3px;
      block-size: 14px;
      min-inline-size: 14px;
      content: '';
      inset-inline-start: 4px;
      box-sizing: border-box;
    }

    &:not([data-disabled]),
    &[data-disabled='false'] {
      &:not(.${cls.loading}) {
        &:focus {
          box-shadow: inset 0 0 0 0 var(--primary-color), 0 0 0 1px var(--primary-hover),
            0 0 1px 3px var(--primary-border);
          &.${cls.checked} {
            box-shadow: inset 0 0 3px 12px var(--primary-color), 0 0 0 1px var(--primary-hover),
              0 0 1px 3px var(--primary-border);
          }
        }

        &:hover {
          background-color: var(--primary-secondary-bg);
        }

        &:active {
          &::after {
            padding-inline: 10px;
            background-color: var(--primary-hover);
          }
          &.${cls.checked} {
            &::after {
              transform: translateX(-10px);
            }
          }
        }
      }
    }
    &.${cls.loading}, &[data-disabled]:not([data-disabled='false']) {
      color: var(--disable-color);
      background-color: var(--disable-bg);
      opacity: 0.8;
      cursor: not-allowed;
    }
  }
  .${cls.checked} {
    box-shadow: inset 0 0 3px 12px var(--primary-color), 0 0 0 0 var(--primary-hover),
      0 0 0 0 var(--primary-border);

    &::before {
      color: #fff;
      padding-inline: 8px 20px;
      content: attr(data-on) '';
    }

    &::after {
      inset-inline-start: calc(100% - 18px);
    }
  }
  .${cls.loading} {
    &::after {
      border-block-start-color: var(--primary-color);
      border-block-end-color: var(--primary-color);
      animation: switch-loading 1.5s infinite linear;
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
