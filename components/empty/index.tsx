import { type JSX, Show } from 'solid-js';
import { css } from '@moneko/css';
import { customElement } from 'solid-element';
import type { CustomElement } from '..';

const style = css`
  .empty-container {
    inline-size: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    box-sizing: border-box;
  }

  .empty-label {
    font-size: var(--font-size-sm);
  }
`;

export interface EmptyProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** 自定义样式表 */
  css?: string;
  /** 自定义类名 */
  class?: string;
  /** 描述 */
  label?: JSX.Element;
}
export type EmptyElement = CustomElement<EmptyProps>;

function Empty(props: EmptyProps) {
  return (
    <>
      <style>
        {style}
        {css(props.css)}
      </style>
      <div class="empty-container">
        <Show
          when={props.label}
          fallback={
            <n-typography class="empty-label" type="secondary">
              无数据
            </n-typography>
          }
        >
          {props.label}
        </Show>
      </div>
    </>
  );
}

customElement<EmptyProps>(
  'n-empty',
  {
    class: void 0,
    css: void 0,
    label: void 0,
  },
  Empty,
);

export default Empty;
