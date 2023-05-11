import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  dropdown: prefixCls('dropdown'),
  portal: prefixCls('dropdown-portal'),
  item: prefixCls('dropdown-item'),
  group: prefixCls('dropdown-group'),
  danger: prefixCls('dropdown-danger'),
  active: prefixCls('dropdown-active'),
  icon: prefixCls('dropdown-icon'),
  selectable: prefixCls('dropdown-selectable'),
};

injectGlobal`
  .${cls.dropdown} {
    box-sizing: border-box;
  }
  .${cls.portal} {
    box-sizing: border-box;
  }
  .${cls.icon} {
    font-size: 14px;
    margin-inline-end: 6px;
  }
  .${cls.item}, .${cls.group} {
    border-radius: calc(var(--border-radius) / 1.5);
    transition: 0.2s background-color ease, 0.2s color ease;
    cursor: pointer;
    box-sizing: border-box;
    line-height: 1.57;
  }
  .${cls.item} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 12px;
    color: var(--text-color);

    &:hover:not(&[aria-disabled]:not([aria-disabled='false'])) {
      &:not(.${cls.active},.${cls.danger}) {
        background-color: var(--disable-bg);
      }
    }

    &[aria-disabled]:not([aria-disabled='false']) {
      cursor: not-allowed;
      color: var(--disable-color);
    }
    &.${cls.active} {
      background-color: var(--primary-selection);
      color: var(--text-heading);
      &:has(+.${cls.active}) {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        
      }
      &+& {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
      }
    }
    &.${cls.danger} {
      color: var(--error-color);
      &.${cls.active}, &:hover {
        color: #fff;
        background-color: var(--error-color);
      }
    }
  }
  .${cls.selectable} {
    .${cls.active} {
      padding-right: 0;
      &::after {
        content: '✓';
        opacity: 0.5;
        display: inline-block;
        padding: 0 8px;
      }
    }
  }
  .${cls.group} {
    padding: 5px;
    font-size: 12px;
    color: var(--text-secondary);
  }
`;
