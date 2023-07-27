import { For, type JSX, Show, createMemo, mergeProps, splitProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import '../popover';
import type { BasicConfig, CustomElement } from '..';
import type { AvatarProps } from '../avatar';

const style = css`
  .group {
    display: inline-flex;
    align-items: center;

    & > n-avatar {
      display: flex;
    }

    & > n-avatar:not(:first-child),
    & > n-popover {
      margin-inline-start: -4%;
      transition: margin-inline-start var(--transition-duration);

      &:hover:not(n-popover) {
        margin-inline-start: 4px;

        &:has(+ n-avatar),
        &:has(+ n-popover) {
          margin-inline-end: calc(4% + 4px);
        }
      }
    }
  }
`;

const moreCss = css`
  .more {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    padding: 8px;
    max-inline-size: 60vi;
    max-block-size: 80vb;
    gap: 8px;
    flex-wrap: wrap;

    & > n-avatar {
      display: flex;
    }
  }
`;

export interface AvatarGroupProps
  extends Omit<JSX.ButtonHTMLAttributes<HTMLDivElement>, 'onChange' | 'ref'> {
  /** 头像数据 */
  data: Omit<AvatarProps, 'size'>[];
  /** 头像尺寸
   * @default 'normal'
   */
  size?: BasicConfig['size'];
  /** 最多显示个数 */
  maxCount?: number;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
}
export type AvatarGroupElement = CustomElement<AvatarGroupProps>;

const defaultProps: AvatarGroupProps = {
  data: [],
  size: void 0,
  class: void 0,
  maxCount: void 0,
  css: void 0,
};

function AvatarGroup(_props: AvatarGroupProps) {
  const props = mergeProps(defaultProps, _props);
  const [local, other] = splitProps(props, ['data', 'maxCount', 'class', 'size', 'css']);
  const showAvatar = createMemo(() => local.data.slice(0, local.maxCount));
  const more = createMemo(() => {
    const len = local.data.length - (local.maxCount || local.data.length);

    if (len > 0) {
      return local.data.slice(-len);
    }
    return [];
  });

  return (
    <>
      <style>
        {style}
        {css(local.css)}
      </style>
      <div {...other} class={cx('group', local.class)}>
        <For each={showAvatar()}>{(a) => <n-avatar {...a} size={local.size} />}</For>
        <Show when={more().length}>
          <n-popover
            arrow={true}
            trigger="click"
            popup-css={moreCss}
            content={
              <div class="more">
                <For each={more()}>{(a) => <n-avatar {...a} size={local.size} />}</For>
              </div>
            }
          >
            <n-avatar size={local.size} username={`+${more().length}`} />
          </n-popover>
        </Show>
      </div>
    </>
  );
}

customElement('n-avatar-group', defaultProps, AvatarGroup);

export default AvatarGroup;
