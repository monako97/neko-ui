import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  typography: prefixCls('typography'),
  success: prefixCls('typography-success'),
  danger: prefixCls('typography-danger'),
  warning: prefixCls('typography-warning'),
  primary: prefixCls('typography-primary'),
  secondary: prefixCls('typography-secondary'),
  normal: prefixCls('typography-normal'),
  truncated: prefixCls('typography-truncated'),
};

injectGlobal`
  .${cls.typography} {
    font-size: 14px;
    color: var(--text-color);
    word-break: break-word;
    word-wrap: break-word;
  }
  .${cls.success} {
    color: var(--success-color);
  }
  .${cls.danger} {
    color: var(--error-color);
  }
  .${cls.warning} {
    color: var(--warning-color);
  }
  .${cls.primary} {
    color: var(--primary-color);
  }
  .${cls.secondary} {
    color: var(--text-secondary);
  }
  .${cls.truncated} {
    /* stylelint-disable-next-line */
    display: -webkit-box;
    -webkit-box-orient: block-axis;
    -webkit-line-clamp: var(--rows, 1);
    overflow: hidden;
  }
`;
