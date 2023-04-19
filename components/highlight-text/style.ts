import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  text: prefixCls('highlight-text'),
  hit: prefixCls('highlight-hit'),
};

injectGlobal`
  .${cls.text} {
    cursor: auto;
  }
  .${cls.hit} {
    color: var(--primary-color, #5794ff);
  }
`;
