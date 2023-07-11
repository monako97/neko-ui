import { For, Show, createComponent, createMemo, mergeProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { baseStyle } from '../theme';
import type { CustomElement } from '..';

const style = css`
  :host {
    display: block;
    inline-size: 100%;
  }

  .skeleton {
    display: flex;
    inline-size: 100%;
    gap: 16px;
  }

  .avatar,
  .title,
  .paragraph > div {
    overflow: hidden;
    border-radius: var(--border-radius);
    background: var(--skeleton-bg);
    transition: background-color var(--transition-duration) var(--transition-timing-function);
  }

  .avatar {
    border-radius: 50%;
    inline-size: 32px;
    block-size: 32px;
  }

  .body {
    flex: 1;
  }

  .title {
    margin-block-end: 16px;
    inline-size: 32%;
    block-size: 32px;
  }

  .paragraph {
    display: flex;
    padding: 0;
    flex-direction: column;
    gap: 12px;

    & > div {
      inline-size: 100%;
      block-size: 16px;
      list-style: none;

      &:last-of-type {
        inline-size: 65%;
      }
    }
  }

  .active {
    &::after {
      display: block;
      block-size: 100%;
      animation: skeleton-effect 1.4s ease-in-out infinite;
      background: var(--skeleton-bg-active);
      content: '';
      transition: background-color var(--transition-duration) var(--transition-timing-function);
    }
  }

  @keyframes skeleton-effect {
    to {
      background-position-x: -20%;
    }
  }
`;

export interface SkeletonProps {
  /** 行 */
  rows?: number;
  /** 显示动画 */
  active?: boolean;
  /** 显示头像 */
  avatar?: boolean;
  /** 显示标题 */
  title?: boolean;
  class?: string;
  css?: string;
}

function Skeleton(props: SkeletonProps) {
  const activeCls = createMemo(() => props.active && 'active');
  const rows = createMemo(() => Array(props.rows).fill(0));

  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {css(props.css)}
      </style>
      <div class={cx('skeleton', props.class)}>
        <Show when={props.avatar}>
          <div class={cx('avatar', activeCls())} />
        </Show>
        <div class="body">
          <Show when={props.title}>
            <div class={cx('title', activeCls())} />
          </Show>
          <div class="paragraph">
            <For each={rows()}>{() => <div class={cx(activeCls())} />}</For>
          </div>
        </div>
      </div>
    </>
  );
}

export type SkeletonElement = CustomElement<SkeletonProps>;
customElement(
  'n-skeleton',
  {
    rows: 3,
    active: undefined,
    avatar: undefined,
    title: undefined,
    css: undefined,
    class: undefined,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        rows: el.rows,
        active: el.active,
        avatar: el.avatar,
        title: el.title,
        css: el.css,
        class: el.class,
      },
      _,
    );

    return createComponent(Skeleton, props);
  },
);
export default Skeleton;
