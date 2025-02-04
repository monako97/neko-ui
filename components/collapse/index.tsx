import { createEffect, createMemo, Index, mergeProps } from 'solid-js';
import { css } from '@moneko/css';
import { customElement } from 'solid-element';

import { clearAttribute, type JSXElement } from '../basic-config';
import theme, { block } from '../theme';

const style = css`
  details {
    overflow: hidden;
    border-radius: var(--border-radius);
    padding: 12px 24px;
    background-color: var(--collapse-bg);
    box-sizing: border-box;
    box-shadow: 0 2px 8px 0 var(--primary-shadow, rgb(0 0 0 / 5%));
    user-select: auto;
  }

  details,
  details > summary,
  details > summary::before {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: background-color, transform, border-color;
  }

  details > summary {
    font-weight: 500;
    outline: none;
    cursor: pointer;
    transform: translateX(-18px);
  }

  details > summary::-webkit-details-marker,
  details > summary::marker {
    display: none;
    color: transparent;
  }

  details > summary::before {
    display: inline-block;
    margin-inline-end: 4px;
    inline-size: 14px;
    font-weight: lighter;
    text-align: center;
    opacity: 0.5;
    content: '⛌';
    transform: rotate(45deg);
  }

  details[open] > summary::before {
    transform: rotate(0);
  }

  details > .content {
    padding: 10px 0 0;
  }
`;
const Collapse = (_props: CollapseProps) => {
  const { baseStyle } = theme;
  const props = mergeProps({ autoplay: -1, children: [] }, _props);
  const list = createMemo(() => [...props.children]);

  return (
    <>
      <style textContent={block} />
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <details>
        <summary>{props.title}</summary>
        <div class="content" part="content">
          <Index each={list()}>
            {(item) => {
              return <>{item()}</>;
            }}
          </Index>
        </div>
      </details>
    </>
  );
};

export interface CollapseProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  title: JSXElement;
  /** 内容 */
  children: JSXElement[];
}
export type CollapseElement = CustomElement<CollapseProps>;

customElement<CollapseProps>(
  'n-collapse',
  {
    class: void 0,
    css: void 0,
    title: void 0,
    children: [],
  },
  (props, opt) => {
    const el = opt.element;

    createEffect(() => {
      clearAttribute(el, ['css', 'title']);
      el.replaceChildren();
    });
    return <Collapse {...props} />;
  },
);
export default Collapse;
