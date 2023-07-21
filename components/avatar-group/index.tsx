import { For, Show, createMemo, mergeProps, splitProps } from 'solid-js';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { moreCss, style } from './style';
import '../popover';
import type { BasicConfig, CustomElement } from '..';
import type { AvatarProps } from '../avatar';

export interface AvatarGroupProps {
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
  size: undefined,
  class: undefined,
  maxCount: undefined,
  css: undefined,
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
        {local.css || ''}
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
