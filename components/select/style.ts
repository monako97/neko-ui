import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  select: prefixCls('select'),
  tags: prefixCls('select-tags'),
  tag: prefixCls('select-tag'),
  del: prefixCls('select-delete'),
};

injectGlobal`
  .${cls.select} {
    position: relative;
    display: flex;
    margin-block-end: 8px;
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
    accent-color: var(--primary-color, #5794ff);
    gap: 2px;
    min-block-size: 28px;

    &:hover {
      border-color: var(--primary-hover, #80b3ff);
      border-inline-end-width: 1px;
    }

    &:focus {
      border-color: var(--primary-hover, #80b3ff);
      border-inline-end-width: 1px;
      outline: 0;
      box-shadow: 0 0 0 2px var(--primary-outline);
    }
  }
  .${cls.tag} {
    display: flex;
    align-items: center;
    border: 1px solid var(--primary-border);
    border-radius: calc(var(--border-radius) / 1.5);
    padding: 0 8px;
    font-size: 12px;
    color: var(--text-color);
    background-color: var(--primary-outline);
    line-height: 20px;
  }
  .${cls.del} {
    cursor: pointer;

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
`;
