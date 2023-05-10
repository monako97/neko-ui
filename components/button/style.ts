import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';
import type { ComponentSize } from '../index';

export type ButtonType = 'success' | 'error' | 'primary' | 'warning' | 'default';
export const cls: Record<string | ButtonType | ComponentSize | number | symbol, string> = {
  btn: prefixCls('btn'),
  label: prefixCls('btn-label'),
  primary: prefixCls('btn-primary'),
  warning: prefixCls('btn-warning'),
  error: prefixCls('btn-error'),
  danger: prefixCls('btn-danger'),
  success: prefixCls('btn-success'),
  infinite: prefixCls('btn-infinite'),
  block: prefixCls('btn-block'),
  dashed: prefixCls('btn-dashed'),
  fill: prefixCls('btn-fill'),
  circle: prefixCls('btn-circle'),
  ghost: prefixCls('btn-ghost'),
  link: prefixCls('btn-link'),
  flat: prefixCls('btn-flat'),
  disabled: prefixCls('btn-disabled'),
  without: prefixCls('btn-without'),
  default: prefixCls('btn-default'),
  large: prefixCls('btn-large'),
  small: prefixCls('btn-small'),
  normal: prefixCls('btn-normal'),
};

function btnColor(type: ButtonType | 'danger') {
  let _cls = `.${cls[type]}`,
    fillCls = `.${cls[type]}.${cls.fill}`;

  if (type === 'error') {
    _cls = `.${cls[type]},.${cls.danger}`;
    fillCls = `.${cls[type]}.${cls.fill},.${cls.danger}.${cls.fill}`;
  }

  return `
    ${_cls}:not([disabled]) {
      .${cls.label} {
        --btn-color: var(--${type}-color);
      }
      --btn-border: var(--${type}-border);
      --btn-bg: var(--${type}-selection);
      --btn-hover-color: var(--${type}-hover);
      --btn-active-color: var(--${type}-active);
      --btn-outline-color: var(--${type}-outline);
    }
    ${fillCls} {
      --btn-bg: var(--${type}-color);
      --btn-border: var(--${type}-color);
      --btn-hover-bg: var(--${type}-hover);
      --btn-active-bg: var(--${type}-active);
    }
  `;
}

injectGlobal`
  .${cls.label} {
    display: block;
    line-height: normal;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--btn-color);
    transition-property: color;
  }
  .${cls.btn},.${cls.label} {
    transition-timing-function: var(--transition-timing-function);
    transition-duration: var(--transition-duration);
  }
  .${cls.btn} {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--btn-border);
    border-radius: var(--border-radius);
    padding: 4px 16px;
    inline-size: fit-content;
    min-inline-size: var(--btn-size);
    block-size: fit-content;
    min-block-size: var(--btn-size);
    font-size: var(--font-size);
    color: var(--btn-color);
    background-color: var(--btn-bg);
    outline-offset: 4px;
    line-height: 1;
    cursor: pointer;
    transition-property: color, background-color, border-color, width, height, transform;
    user-select: none;
    touch-action: manipulation;
    box-sizing: border-box;
    user-select: none;

    &:hover:not([disabled]) {
      border-color: var(--btn-hover-color);
      background-color: var(--btn-bg);
      .${cls.label} {
        color: var(--btn-hover-color);
      }
    }

    &:active:not([disabled]) {
      border-color: var(--btn-active-color);
      background-color: var(--btn-bg);
      transform: scale(0.98);
      .${cls.label} {
        color: var(--btn-active-color);
      }
    }
  }
  .${cls.normal} {
    --btn-size: 32px;
  }
  .${cls.small} {
    --btn-size: 24px;

    padding: 0 7px;
    font-size: var(--font-size-xs);
  }
  .${cls.large} {
    --btn-size: 40px;

    font-size: var(--font-size-lg);
  }
  .${cls.link} {
    .${cls.label} {
      --btn-color: var(--primary-color);
    }
  }
  .${cls.default} {
    --btn-outline-color: var(--primary-outline);
    --btn-color: var(--text-color);
    --btn-bg: var(--component-bg);
    --btn-border: var(--border-color);
    --btn-hover-color: var(--primary-hover);
    --btn-active-color: var(--primary-active);
  }
  ${btnColor('primary')}
  ${btnColor('error')}
  ${btnColor('success')}
  ${btnColor('warning')}
  .${cls.fill} {
    &:not([disabled]):not(.${cls.default}) {
      .${cls.label} {
        color: #fff !important;
      }

      &:hover {
        --btn-bg: var(--btn-hover-color) !important;
      }

      &:active {
        --btn-bg: var(--btn-active-color) !important;
      }
    }
  }
  .${cls.fill}.${cls.danger}.${cls.default} {
    .${cls.label} {
      color: #fff !important;
    }
  }
  .${cls.dashed} {
    border-style: dashed;
  }
  .${cls.flat}, .${cls.link} {
    border-color: transparent !important;
    background-color: transparent;
  }
  .${cls.ghost}, .${cls.link} {
    background-color: transparent !important;
  }
  .${cls.btn}.${cls.link} {
    &::after {
      content: none;
    }
  }
  .${cls.circle} {
    border-radius: 50% !important;
    padding: 0;
    min-inline-size: var(--btn-size);
    max-inline-size: var(--btn-size);
    min-block-size: var(--btn-size);
    max-block-size: var(--btn-size);
    text-align: center;
    line-height: var(--btn-size);
  }
  .${cls.disabled}[disabled] {
    --btn-color: var(--disable-color);
    --btn-bg: var(--disable-bg);
    --btn-border: var(--disable-border);

    cursor: not-allowed;
  }
  .${cls.block} {
    inline-size: 100%;
  }

  .${cls.without}, .${cls.infinite} {
    &:not(.${cls.link}):not(.${cls.flat}) {
      position: relative;

      &::before {
        position: absolute;
        display: block;
        border-radius: inherit;
        opacity: 0.2;
        box-shadow: 0 0 0 0 var(--btn-outline-color);
        inset: 0;
        animation: btn-wave-effect 0.3s cubic-bezier(1, 1, 1, 1);
        animation-fill-mode: forwards;
        content: '';
        pointer-events: none;
      }
    }
  }

  .${cls.infinite} {
    &:not(.${cls.link}):not(.${cls.flat})::before {
      opacity: 0.2;
      animation: btn-wave-effect 0.3s cubic-bezier(1, 1, 1, 0.99) infinite;
    }
  }

  @keyframes btn-wave-effect {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 var(--btn-outline-color);
    }

    25% {
      opacity: 1;
      box-shadow: 0 0 0 4px var(--btn-outline-color);
    }

    100% {
      opacity: 0;
      box-shadow: 0 0 0 6px var(--btn-outline-color);
    }
  }
`;
