import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  select: prefixCls('select'),
  tags: prefixCls('select-tags'),
  tag: prefixCls('select-tag'),
  del: prefixCls('select-delete'),
  value: prefixCls('select-value'),
  opacity: prefixCls('select-opacity'),
  portal: prefixCls('select-portal'),
  container: prefixCls('dropdown-portal-container'),
};

injectGlobal`
  .${cls.select} {
    position: relative;
    display: flex;
    margin-block-end: 8px;
  }
  .${cls.portal} {
    .${cls.container} {
      max-block-size: 250px;
    }
  }
  .${cls.tags} {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 2px;
    font-size: var(--font-size);
    color: var(--text-color);
    background-color: var(--component-bg);
    transition: all 0.3s;
    inline-size: 100%;
    line-height: 1.5;
    min-inline-size: 200px;
    background-image: none;
    box-sizing: border-box;
    accent-color: var(--primary-color);
    gap: 2px;
    min-block-size: 28px;
    cursor: pointer;
    user-select: none;

    &:hover:not([aria-disabled='true']) {
      border-color: var(--primary-hover);
      border-inline-end-width: 1px;
    }

    &:focus:not([aria-disabled='true']) {
      border-color: var(--primary-hover);
      border-inline-end-width: 1px;
      outline: 0;
      box-shadow: 0 0 0 2px var(--primary-outline);
    }

    &[aria-disabled='true'] {
      border-color: var(--disable-border);
      color: var(--disable-color);
      background-color: var(--disable-bg);
      cursor: not-allowed;
      .${cls.tag} {
        border-color: var(--disable-border);
        color: var(--disable-color);
        background-color: var(--disable-bg);
      }
    }
  }
  .${cls.tag} {
    display: flex;
    align-items: center;
    border: 1px solid var(--primary-border);
    border-radius: calc(var(--border-radius) / 1.5);
    padding: 0 8px;
    font-size: 12px;
    background-color: var(--primary-outline);
    line-height: 20px;
    pointer-events: none;
  }
  .${cls.del} {
    cursor: pointer;
    pointer-events: all;

    &::before {
      font-size: 12px;
      opacity: 0.5;
      content: '⛌';
      margin-inline-start: 5px;
    }

    &:hover {
      color: var(--error-color);
    }
  }
  .${cls.value} {
    max-inline-size: 100%;
    padding: 0 10px;
    opacity: 1;
    transition: 0.3s opacity;
    pointer-events: none;
  }
  .${cls.opacity} {
    opacity: 0.3;
  }
`;
