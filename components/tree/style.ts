import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  tree: prefixCls('tree'),
  row: prefixCls('tree-row'),
  children: prefixCls('tree-children'),
  title: prefixCls('tree-title'),
  subTitle: prefixCls('tree-sub-title'),
  active: prefixCls('tree-active'),
  rtl: prefixCls('tree-rtl'),
  non: prefixCls('tree-non-interactive'),
  small: prefixCls('tree-small'),
  normal: prefixCls('tree-normal'),
  large: prefixCls('tree-large'),
};

export const sizeCnt = {
  small: 6,
  normal: 8,
  large: 10,
};
injectGlobal`
  .${cls.tree} {
    padding-inline-start: 2em;
    inline-size: 100%;
    box-sizing: border-box;
    --size: 8px;
  }

  .${cls.row} {
    position: relative;
    z-index: 0;
    display: flex;
    align-items: baseline;
    border-radius: var(--border-radius);
    padding: 2px 10px;
    color: var(--text-color);
    background-color: var(--component-bg);
    list-style: none;
    box-shadow: 0 0 0 1px var(--border-color);
    margin-inline-start: var(--depth);
    margin-block-end: var(--size);
    cursor: pointer;
    box-sizing: border-box;
    min-inline-size: 160px;
    inline-size: fit-content;

    /* content-visibility: visible;
    contain-intrinsic-size: 25px; */

    &.${cls.non} {
      cursor: auto;
    }
    &::before,
    &::after {
      position: absolute;
      pointer-events: none;
      z-index: -1;
      inset-inline-start: 0;
      transition-property: border-color;
    }

    &:not(:first-of-type, :last-of-type, [data-path-end])::before {
      content: '';
      inset-inline-start: -1em;
      inset-block-start: 50%;
      inline-size: 1em;
      block-size: 100%;
      border-block-start: 1px solid var(--border-color);
      box-sizing: border-box;
    }

    &[data-path] {
      --r: 0 0 0 var(--border-radius);
      --c: '';

      &::after {
        border-style: solid;
        border-width: 0 0 1px 1px;
        border-color: var(--border-color);
        border-radius: var(--r);
        content: var(--c);
        inline-size: 1em;
        inset-block-start: calc(var(--size) * -1);
        inset-inline-start: -1em;
        block-size: var(--line);
        box-sizing: border-box;
      }
    }

    &:first-of-type {
      --r: var(--border-radius) 0 0 var(--border-radius);

      &[data-path]::after {
        border-width: 1px 0 1px 1px;
        inset-block-start: 15px;
      }
    }

    &:last-of-type {
      margin-block-end: 0;
    }
  }
  .${cls.rtl} {
    direction: rtl;
    .${cls.row} {
      flex-direction: row-reverse;
      justify-content: flex-end;

      &::before,
      &::after {
        transform: scaleX(-1);
      }
    }
  }
  .${cls.title} {
    font-size: 14px;
    font-weight: normal;
  }
  .${cls.subTitle} {
    padding: 0 var(--size);
    font-size: 10px;
    color: var(--text-secondary);
    font-style: italic;
    text-transform: capitalize;
    opacity: 0.5;
  }
  .${cls.active} {
    color: var(--on-primary-selection);
    background-color: var(--primary-selection);
    box-shadow: 0 0 0 1px var(--primary-border);
    text-shadow: 2px 2px 2px var(--primary-outline);
  }
  .${cls.small} {
    --size: 6px;
    .${cls.row} {
      padding: 1px 9px;
      &:first-of-type {
        &[data-path]::after {
          inset-block-start: 12px;
        }
      }
    }
    .${cls.title} {
      font-size: 13px;
    }
    .${cls.subTitle} {
      padding: 0 4px;
      font-size: 9px;
    }
  }
  .${cls.normal} {
    --size: 8px;
  }
  .${cls.large} {
    --size: 10px;
    .${cls.row} {
      padding: 3px 12px;
      
      &:first-of-type {
        &[data-path]::after {
          inset-block-start: 17px;
        }
      }
    }
    .${cls.title} {
      font-size: 15px;
    }
    .${cls.subTitle} {
      padding: 0 10px;
      font-size: 12px;
    }
  }
`;
