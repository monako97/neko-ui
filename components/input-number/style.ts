import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  number: prefixCls('input-number'),
};

injectGlobal`
  /** 隐藏原生加减控件 */
  .${cls.number}[type='number'] {
    appearance: textfield;
  }
  .${cls.number}[type='number']::-webkit-inner-spin-button,
  .${cls.number}[type='number']::-webkit-outer-spin-button {
    appearance: none;
  }
`;
