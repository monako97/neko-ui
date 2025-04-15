import { createEffect, createMemo, For, mergeProps, Show, splitProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { AvatarProps, BasicConfig, CustomElement } from '..';
import Avatar from '../avatar';
import { clearAttribute } from '../basic-config';
import Popover from '../popover';
import { inline } from '../theme';

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

    > n-avatar {
      display: flex;
    }
  }
`;
const style = css`
  .group {
    display: inline-flex;
    align-items: center;

    & > n-avatar {
      display: flex;
    }

    & > n-avatar:not(:first-child),
    & > .popover {
      margin-inline-start: -4%;
      transition: margin-inline-start var(--transition-duration);

      &:hover:not(.popover) {
        margin-inline-start: 4px;

        &:has(+ n-avatar),
        &:has(+ .popover) {
          margin-inline-end: calc(4% + 4px);
        }
      }
    }
  }
`;

export interface AvatarGroupProps {
  /** 头像数据 */
  data?: Omit<AvatarProps, 'size'>[];
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
  const data = createMemo(() => local.data || []);
  const showAvatar = createMemo(() => data().slice(0, local.maxCount));
  const more = createMemo(() => {
    const _data = data();
    const len = _data.length - (local.maxCount || _data.length);

    if (len > 0) {
      return _data.slice(-len);
    }
    return [];
  });

  return (
    <>
      <style textContent={style} />
      <Show when={local.css}>
        <style textContent={css(local.css)} />
      </Show>
      <div {...other} class={cx('group', local.class)}>
        <For each={showAvatar()}>{(a) => <n-avatar {...a} size={local.size} />}</For>
        <Show when={more().length}>
          <Popover
            arrow={true}
            trigger="click"
            popupCss={moreCss}
            content={
              <div class="more">
                <For each={more()}>{(a) => <n-avatar {...a} size={local.size} />}</For>
              </div>
            }
          >
            <n-avatar size={local.size} username={`+${more().length}`} />
          </Popover>
        </Show>
      </div>
    </>
  );
}

AvatarGroup.registry = () => {
  Avatar.registry();
  customElement<AvatarGroupProps>('n-avatar-group', defaultProps, (props, opt) => {
    const el = opt.element;

    createEffect(() => {
      clearAttribute(el, ['css', 'data']);
    });
    return (
      <>
        <style textContent={inline} />
        <AvatarGroup {...props} />
      </>
    );
  });
};
export default AvatarGroup;
