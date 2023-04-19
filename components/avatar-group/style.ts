import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  group: prefixCls('avatar-group'),
  more: prefixCls('avatar-more'),
};

injectGlobal`
  .${cls.group} {
    display: inline-flex;
    align-items: center;

    & > *:not(:first-child) {
      margin-inline-start: -5%;
    }
  }
  .${cls.more} {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    padding: 8px;
    max-inline-size: 60vi;
    max-block-size: 80vb;
    gap: 16px;
    flex-wrap: wrap;
  }
`;
