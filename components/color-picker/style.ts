import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  picker: prefixCls('color-picker'),
  trigger: prefixCls('color-picker-trigger'),
  small: prefixCls('color-picker-small'),
  large: prefixCls('color-picker-large'),
  normal: prefixCls('color-picker-normal'),
};

injectGlobal`
  body .${cls.picker} {
    padding: 10px;
    inline-size: 216px;
  }
  .${cls.trigger} {
    --alpha-gradient: repeating-conic-gradient(#eee 0 25%, transparent 0 50%) 0 / 10px 10px;

    display: inline-block;
    border-radius: var(--border-radius);
    inline-size: 25px;
    block-size: 25px;
    background: var(--alpha-gradient);

    &::after {
      display: block;
      border-radius: var(--border-radius);
      inline-size: 100%;
      block-size: 100%;
      background: var(--c, #fff);
      opacity: var(--a, 1);
      box-shadow: rgb(0 0 0 / 10%) 0 0 0 1px inset, rgb(0 0 0 / 10%) 0 0 4px inset;
      content: '';
    }
  }
  .${cls.large} {
    inline-size: 45px;
    block-size: 25px;
  }
  .${cls.small} {
    inline-size: 15px;
    block-size: 15px;
  }
  .${cls.normal} {
    inline-size: 25px;
    block-size: 25px;
  }
`;
