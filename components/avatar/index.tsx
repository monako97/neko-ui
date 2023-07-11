import {
  Match,
  Switch,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onMount,
} from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import clipPath from './clip-path.svg';
import { style } from './style';
import { baseStyle } from '../theme';
import type { ComponentSize, CustomElement } from '../index';

const clip = decodeURIComponent(clipPath.replace('data:image/svg+xml,', ''));

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number | ComponentSize;
  username?: string;
  color?: string;
  class?: string;
  css?: string;
}
export type AvatarElement = CustomElement<AvatarProps>;

const avatarSize: Record<string, string> = {
  small: '24px',
  normal: '32px',
  large: '40px',
};

function Avatar(_props: AvatarProps) {
  const props = mergeProps({ size: 32 }, _props);
  let box: HTMLDivElement | undefined;
  let label: HTMLSpanElement | undefined;
  const [scale, setScale] = createSignal(1);

  onMount(() => {
    const hasSvg = document.documentElement.querySelector('clipPath#clipPathAvatar');

    if (!hasSvg) {
      const svg = document.createElement('a');

      svg.innerHTML = clip;
      document.body.insertBefore(svg.firstChild as ChildNode, document.body.firstChild);
    }
  });
  const _style = createMemo(() => {
    const size = avatarSize[props.size] || `${props.size}px` || '32px';

    return css`
      .avatar {
        --avatar-color: ${props.color};

        inline-size: ${size};
        block-size: ${size};
      }
    `;
  });

  createEffect(() => {
    if (label && box) {
      if (label.clientWidth + 6 > box.clientWidth) {
        setScale((box.clientWidth - 6) / label.clientWidth);
      }
    }
  });

  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {_style()}
        {css(props.css)}
      </style>
      <div ref={box} class={cx('avatar', props.class)}>
        <Switch>
          <Match when={typeof props.src === 'string'}>
            <img src={props.src} alt={props.alt} />
          </Match>
          <Match when={props.username}>
            <span ref={label} style={{ transform: `scale(${scale()})` }}>
              {props.username}
            </span>
          </Match>
        </Switch>
      </div>
    </>
  );
}

customElement(
  'n-avatar',
  {
    css: undefined,
    size: undefined,
    src: undefined,
    alt: undefined,
    username: undefined,
    color: undefined,
    class: undefined,
  },
  Avatar,
);
export default Avatar;
