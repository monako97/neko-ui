import {
  createEffect,
  createMemo,
  createSignal,
  Match,
  mergeProps,
  Show,
  splitProps,
  Switch,
} from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import Img from '../img';
import type { BasicConfig, CustomElement } from '../index';
import theme from '../theme';

import { style } from './style';

export interface AvatarProps {
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

function Avatar(_: AvatarProps) {
  const { baseStyle } = theme;
  const avatarSize: Record<string, string> = {
    small: '24px',
    normal: '32px',
    large: '40px',
  };

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
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <style textContent={_style()} />
      <Show when={local.css}>
        <style textContent={css(local.css)} />
      </Show>
      <div ref={box} class={cx('avatar', local.class)} {...other}>
        <Switch>
          <Match when={typeof local.src === 'string'}>
            <Img src={local.src} alt={local.alt} style={{ 'z-index': 9999 }} />
          </Match>
          <Match when={local.username}>
            <span ref={label} style={{ transform: `scale(${scale()})` }}>
              {local.username}
            </span>
          </Match>
        </Switch>
      </div>
      <svg
        viewBox="0 0 1 1"
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '0',
          height: '0',
          opacity: 0,
          'pointer-events': 'none',
        }}
        overflow="hidden"
      >
        <defs>
          <clipPath id="clipPathAvatar" clipPathUnits="objectBoundingBox">
            <path
              d="M.395.126H.4A.016.016 0 0 1 .418.14v.002L.42.158a.39.39 0 0 0 .019.12L.44.284l.005.01c.011.026.034.05.05.053h.011a.084.084 0 0 0 .016-.01.115.115 0 0 0 .025-.03.259.259 0 0 0 .033-.14.02.02 0 0 0 0-.008.03.03 0 0 1 0-.01V.145L.584.136h.001C.583.134.591.127.594.126h.024L.63.127l.013.001h.01a.123.123 0 0 0 .021.003h.003L.7.133a.591.591 0 0 1 .046.004L.77.139h.013l.006.002h.009c.01 0 .019.006.036.023a.24.24 0 0 1 .018.02l.004.004a.49.49 0 0 1 .063.094L.927.3a.032.032 0 0 0 .004.007L.932.31l.004.007.007.022a.141.141 0 0 0 .004.008.34.34 0 0 0 .011.037l.002.01A.463.463 0 0 1 .969.46v.013A.358.358 0 0 1 .963.58a.537.537 0 0 1-.064.16.378.378 0 0 1-.096.111.042.042 0 0 1-.014.002L.762.851.732.85A1.092 1.092 0 0 0 .667.845C.641.842.636.84.63.832L.626.825C.624.822.628.814.636.8a.129.129 0 0 0 .01-.022.02.02 0 0 0 .001-.003V.773a.143.143 0 0 0 .009-.02A.149.149 0 0 1 .66.738.028.028 0 0 0 .662.73V.726a.243.243 0 0 1-.106.07.177.177 0 0 1-.121-.003A.25.25 0 0 1 .35.736C.34.726.338.724.337.727A.095.095 0 0 0 .344.75v.003s.001 0 0 0a.316.316 0 0 0 .024.053L.37.811c.005.01.005.013.001.02C.367.837.36.84.345.842A.462.462 0 0 1 .3.847.967.967 0 0 0 .25.85L.224.852.213.853A.027.027 0 0 1 .191.847.438.438 0 0 1 .098.735a.525.525 0 0 1-.065-.19L.032.529V.517a.35.35 0 0 1 0-.052L.034.433.036.421A.288.288 0 0 1 .04.397.173.173 0 0 1 .05.36c0-.003 0-.006.002-.01A.133.133 0 0 0 .057.336L.06.33A.293.293 0 0 1 .084.276L.09.266A.14.14 0 0 1 .1.246L.106.24A.288.288 0 0 1 .142.19a.227.227 0 0 0 .01-.01.17.17 0 0 1 .037-.036A.036.036 0 0 1 .202.14h.023L.228.138h.008L.248.136H.26A.104.104 0 0 0 .28.134a.01.01 0 0 1 .004 0h.003L.289.133h.006A.18.18 0 0 1 .313.131h.011L.327.13H.33L.348.128h.009L.364.127h.004L.37.126h.011L.388.125a.01.01 0 0 0 .003 0h.004z"
              fill="#7483AB"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}

customElement<AvatarProps>(
  'n-avatar',
  {
    css: void 0,
    size: void 0,
    src: void 0,
    alt: void 0,
    username: void 0,
    color: void 0,
    class: void 0,
  },
  Avatar,
);
export default Avatar;
