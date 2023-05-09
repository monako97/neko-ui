import { css, injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  select: prefixCls('select'),
  value: prefixCls('select-value'),
};

const cs = css`
  .${cls.select} {
    position: relative;
    display: flex;
    margin-block-end: 8px;
  }
  .${cls.value} {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 14px;
    pointer-events: none;
    z-index: 1;
  }
`;

injectGlobal([cs]);
