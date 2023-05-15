import { injectGlobal } from '..';
import prefixCls from '../prefix-cls';

export const cls = {
  empty: prefixCls('empty'),
  label: prefixCls('empty-label'),
};

injectGlobal`
  .${cls.empty} {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    .${cls.label} {
      font-size: var(--font-size-sm);
    }
  }
`;
