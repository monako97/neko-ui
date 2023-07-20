import type { JSX } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import Typography from '../typography';
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
}
export type EmptyElement = CustomElement<EmptyProps>;

function Empty(props: EmptyProps) {
  return (
    <>
      <style>{style}</style>
      <div class={cx('empty-container', props.class)}>
        <Typography class="empty-label" type="secondary">
          无数据
        </Typography>
      </div>
    </>
  );
}

customElement(
  'n-empty',
  {
    class: undefined,
    css: undefined,
    style: undefined,
  },
  Empty,
);

export default Empty;
