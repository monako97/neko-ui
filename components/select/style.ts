import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  select: prefixCls('select'),
};

injectGlobal`
  .${cls.select} {
    position: relative;
    display: flex;
    margin-block-end: 8px;

    &:last-of-type {
      margin-block-end: 0;
    }
  }
`;
