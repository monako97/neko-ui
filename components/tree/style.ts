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
};

injectGlobal`
  .${cls.tree} {
    padding-inline-start: 2em;
    inline-size: 100%;
    box-sizing: border-box;
  }

  .${cls.row} {
    position: relative;
    z-index: 0;
    display: flex;
    align-items: baseline;
    border-radius: var(--border-radius);
    padding: 2px 10px;
    color: var(--text-color);
    background-color: var(--component-background);
    list-style: none;
    box-shadow: 0 0 0 1px var(--border-color);
    margin-inline-start: var(--depth);
    margin-block-end: 8px;
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
        inset-block-start: -8px;
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
    padding: 0 8px;
    font-size: 10px;
    color: var(--text-secondary);
    font-style: italic;
    text-transform: capitalize;
    opacity: 0.5;
  }
  .${cls.active} {
    color: var(--primary-color);
    background-color: var(--primary-bg);
    box-shadow: 0 0 0 1px var(--primary-border);
    text-shadow: 2px 2px 2px var(--primary-outline);
  }
`;
