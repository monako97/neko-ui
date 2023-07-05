import { For, Show, createMemo, mergeProps, splitProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import '../popover';
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
      transition: margin-inline-start 0.3s;

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

export interface AvatarGroupProps {
  data: Omit<AvatarProps, 'size'>[];
  size?: AvatarProps['size'];
  class?: string;
  maxCount?: number;
}
const defaultProps: AvatarGroupProps = {
  data: [],
  size: undefined,
  class: undefined,
  maxCount: undefined,
};

function AvatarGroup(_props: AvatarGroupProps) {
  const props = mergeProps(defaultProps, _props);
  const [local, other] = splitProps(props, ['data', 'maxCount', 'class', 'size']);
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
      <style>{style}</style>
      <div class={cx('group', local.class)} {...other}>
        <For each={showAvatar()}>{(a) => <n-avatar size={local.size} {...a} />}</For>
        <Show when={more().length}>
          <n-popover
            arrow={true}
            trigger="click"
            popup-css={moreCss}
            content={
              <div class="more">
                <For each={more()}>{(a) => <n-avatar size={local.size} {...a} />}</For>
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

export interface AvatarGroupElement extends AvatarGroupProps {
  ref?: AvatarGroupElement | { current: AvatarGroupElement | null };
}

interface CustomElementTags {
  'n-avatar-group': AvatarGroupElement;
}
declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
  }
}
declare global {
  export namespace JSX {
    export interface IntrinsicElements extends CustomElementTags, CustomElementTags {}
  }
}
customElement('n-avatar-group', defaultProps, AvatarGroup);
export default AvatarGroup;
