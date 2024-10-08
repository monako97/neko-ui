import { createMemo, For, mergeProps, Show } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import theme from '../theme';

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
      animation: skeleton-effect 1.4s var(--transition-timing-function) infinite;
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
  /** 自定义样式表 */
  css?: string;
  /** 自定义类名 */
  class?: string;
  /** 行
   * @default 3
   */
  rows?: number;
  /** 显示动画
   * @default false
   */
  active?: boolean;
  /** 显示头像
   * @default false
   */
  avatar?: boolean;
  /** 显示标题
   * @default false
   */
  title?: boolean;
}

function Skeleton(props: SkeletonProps) {
  const { baseStyle, isDark } = theme;
  const rows = createMemo(() => Array(props.rows).fill(0));
  const cssVar = createMemo(() => {
    if (isDark()) {
      return css`
        :host {
          --skeleton-bg: rgb(255 255 255 / 6%);
          --skeleton-bg-active: linear-gradient(
              100deg,
              rgb(255 255 255 / 5%) 40%,
              rgb(255 255 255 / 15%) 50%,
              rgb(255 255 255 / 5%) 60%
            )
            transparent 180%/200% 100%;
        }
      `;
    }

    return css`
      :host {
        --skeleton-bg: rgb(0 0 0 / 6%);
        --skeleton-bg-active: linear-gradient(
            100deg,
            rgb(0 0 0 / 5%) 40%,
            rgb(0 0 0 / 15%) 50%,
            rgb(0 0 0 / 5%) 60%
          )
          transparent 180%/200% 100%;
      }
    `;
  });

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={cssVar()} />
      <style textContent={style} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <div class={cx('skeleton', props.class)}>
        <Show when={props.avatar}>
          <div
            class="avatar"
            classList={{
              active: props.active,
            }}
          />
        </Show>
        <div class="body">
          <Show when={props.title}>
            <div
              class="title"
              classList={{
                active: props.active,
              }}
            />
          </Show>
          <div class="paragraph">
            <For each={rows()}>
              {() => (
                <div
                  classList={{
                    active: props.active,
                  }}
                />
              )}
            </For>
          </div>
        </div>
      </div>
    </>
  );
}

export type SkeletonElement = CustomElement<SkeletonProps>;
customElement<SkeletonProps>(
  'n-skeleton',
  {
    rows: 3,
    active: void 0,
    avatar: void 0,
    title: void 0,
    css: void 0,
    class: void 0,
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
      },
      _,
    );

    return <Skeleton {...props} />;
  },
);
export default Skeleton;
