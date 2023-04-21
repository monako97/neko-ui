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
};

injectGlobal`
  .${cls.wrapper} {
    display: flex;
    border: var(--border-base);
    border-radius: var(--border-radius);
    padding: 4px 10px;
    inline-size: 100%;
    font-size: var(--font-size);
    color: var(--text-color);
    background-color: var(--component-background);
    transition: all 0.3s;
    line-height: 1.5715;
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
  .${cls.input} {
    overflow: hidden;
    border: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: inherit;
    outline: none;
    flex: 1;
  }
  .${cls.focus} {
    border-color: var(--primary-hover, #80b3ff);
    border-inline-end-width: 1px;
    outline: 0;
    box-shadow: 0 0 0 2px rgb(45 115 255 / 20%);
  }
  .${cls.disabled} {
    border-color: var(--border-color);
    background: var(--disabled-bg, #f5f5f5);
    cursor: not-allowed;
  }
  .${cls.prefix} {
    margin-inline-end: 4px;
  }
  .${cls.suffix} {
    margin-inline-start: 4px;
  }
  .${cls.normal} {
    padding: 4px 10px;
  }
  .${cls.small} {
    padding: 2px;
    font-size: var(--font-size-sm);
    line-height: 20px;

    input {
      padding: 1px 0;
    }
  }
  .${cls.large} {
    padding: 6px 16px;
    font-size: var(--font-size-lg);
  }
`;
