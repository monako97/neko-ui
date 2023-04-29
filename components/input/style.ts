import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  input: prefixCls('input'),
  wrapper: prefixCls('input-wrapper'),
  focus: prefixCls('input-focus'),
  disabled: prefixCls('input-disabled'),
  prefix: prefixCls('input-prefix'),
  suffix: prefixCls('input-suffix'),
  small: prefixCls('input-small'),
  large: prefixCls('input-large'),
  normal: prefixCls('input-normal'),
  label: prefixCls('input-label'),
  error: prefixCls('input-error'),
  warning: prefixCls('input-warning'),
  success: prefixCls('input-success'),
};

injectGlobal`
  .${cls.wrapper} {
    position: relative;
    display: flex;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 4px 10px;
    font-size: var(--font-size);
    color: var(--text-color);
    background-color: var(--component-bg);
    transition: all 0.3s;
    inline-size: 100%;
    line-height: 1.5;
    background-image: none;
    box-sizing: border-box;
    accent-color: var(--primary-color, #5794ff);

    &:hover {
      border-color: var(--primary-hover, #80b3ff);
      border-inline-end-width: 1px;
    }

    input {
      background: none;
    }
  }
  .${cls.label} {
    position: absolute;
    border-radius: var(--border-radius);
    padding: 0 4px;
    color: var(--text-color);
    transition: transform 0.3s, color 0.3s, background-color 0.3s;
    line-height: 1.45;
    pointer-events: none;
    transform-origin: left;
    transform: translate3d(calc(var(--x, 0) - 10px), 0, 1px);
  }
  .${cls.input} {
    overflow: hidden;
    border: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: inherit;
    outline: none;
    flex: 1;

    &::placeholder {
      opacity: 0;
      transition: color 0.3s, opacity 0.3s;
    }

    &:focus::placeholder {
      opacity: 1;
    }
    &:not(:placeholder-shown) + .${cls.label}, &:focus + .${cls.label} {
      background: var(--component-bg);
      transform: translate3d(0, calc(-50% - 0.43em), 1px) scale(0.8);
    }
    &:focus + .${cls.label} {
      color: var(--primary-color);
    }
  }
  .${cls.focus} {
    border-color: var(--primary-hover, #80b3ff);
    border-inline-end-width: 1px;
    outline: 0;
    box-shadow: 0 0 0 2px var(--primary-outline);
  }
  .${cls.prefix} {
    margin-inline-end: 4px;
  }
  .${cls.suffix} {
    margin-inline-start: 4px;
  }
  .${cls.error} {
    --border-color: var(--error-border);
    --primary-hover: var(--error-hover);
    --primary-outline: var(--error-outline);
    --primary-color: var(--error-color);
  }
  .${cls.warning} {
    --border-color: var(--warning-border);
    --primary-hover: var(--warning-hover);
    --primary-outline: var(--warning-outline);
    --primary-color: var(--warning-color);
  }
  .${cls.success} {
    --border-color: var(--success-border);
    --primary-hover: var(--success-hover);
    --primary-outline: var(--success-outline);
    --primary-color: var(--success-color);
  }
  .${cls.disabled} {
    --border-color: var(--disable-border);
    --primary-hover: var(--disable-border);

    background: var(--disable-bg);
    cursor: not-allowed;
    .${cls.input} {
      &:not(:placeholder-shown) + .${cls.label} {
        background: var(--disable-border);
      }
    }
    .${cls.label}, .${cls.prefix}, .${cls.suffix} {
      color: var(--disable-color);
    }
  }
  .${cls.small} {
    padding: 2px;
    font-size: var(--font-size-sm);
    line-height: 20px;

    input {
      padding: 1px 0;
    }
    .${cls.label} {
      transform: translate3d(calc(var(--x, 0) - 2px), 0, 1px);
    }
  }
  .${cls.large} {
    padding: 6px 16px;
    font-size: var(--font-size-lg);
    .${cls.label} {
      transform: translate3d(calc(var(--x, 0) - 16px), 0, 1px);
    }
  }
`;
