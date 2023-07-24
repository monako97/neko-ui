import {
  type JSX,
  Match,
  Switch,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onMount,
  splitProps,
} from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import clipPath from './clip-path.svg';
import { style } from './style';
import { baseStyle } from '../theme';
import type { BasicConfig, CustomElement } from '../index';

const clip = decodeURIComponent(clipPath.replace('data:image/svg+xml,', ''));

export interface AvatarProps
  extends Omit<JSX.ButtonHTMLAttributes<HTMLDivElement>, 'onChange' | 'ref' | 'children'> {
  /** 头像 */
  src?: string;
  /** 替代文本 */
  alt?: string;
  /** 尺寸
   * @default 'normal'
   */
  size?: number | BasicConfig['size'];
  /** 用户名 */
  username?: string;
  /** 背景颜色 */
  color?: string;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
}
export type AvatarElement = CustomElement<AvatarProps>;

const avatarSize: Record<string, string> = {
  small: '24px',
  normal: '32px',
  large: '40px',
};

function Avatar(_: AvatarProps) {
  const props = mergeProps({ size: 32 }, _);
  const [local, other] = splitProps(props, [
    'class',
    'css',
    'src',
    'alt',
    'size',
    'color',
    'username',
  ]);
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
    const size = avatarSize[local.size] || `${local.size}px`;

    return css`
      .avatar {
        --avatar-color: ${local.color};

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
        {css(local.css)}
      </style>
      <div ref={box} class={cx('avatar', local.class)} {...other}>
        <Switch>
          <Match when={typeof local.src === 'string'}>
            <img src={local.src} alt={local.alt} />
          </Match>
          <Match when={local.username}>
            <span ref={label} style={{ transform: `scale(${scale()})` }}>
              {local.username}
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
