import {
  Show,
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { Dynamic } from 'solid-js/web';
import { style } from './style';
import theme from '../theme';
import type { BasicConfig, CustomElement } from '..';

export interface ButtonProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 按钮类型 */
  type?: 'success' | 'error' | 'primary' | 'warning' | 'default';
  /** 透明背景 */
  ghost?: boolean;
  /** 实色背景 */
  fill?: boolean;
  /** 圆形按钮 */
  circle?: boolean;
  /** 虚线按钮 */
  dashed?: boolean;
  /** 扁平按钮 */
  flat?: boolean;
  /** 禁用按钮 */
  disabled?: boolean;
  /** 块按钮 */
  block?: boolean;
  /** 链接按钮 */
  link?: boolean;
  /** 危险按钮 */
  danger?: boolean;
  /** 自定义 tag
   * @since 2.1.0
   */
  tag?: string;
  /** 按钮尺寸
   * @default 'normal'
   */
  size?: BasicConfig['size'];
  /** 按钮前面添加一个图标 */
  icon?: (() => JSX.Element) | JSX.Element;
  children?: JSX.Element;
}
export type ButtonElement = CustomElement<ButtonProps>;

function Button(_: ButtonProps) {
  const { baseStyle } = theme;
  const _props = mergeProps({ size: 'normal', type: 'default' }, _);
  const [local, other] = splitProps(_props, [
    'ghost',
    'fill',
    'circle',
    'dashed',
    'flat',
    'link',
    'danger',
    'children',
    'block',
    'size',
    'type',
    'class',
    'icon',
    'css',
    'disabled',
    'tag',
  ]);
  let ref: HTMLButtonElement | undefined;
  const [animating, setAnimating] = createSignal(false);

  function handleClick() {
    if (!local.disabled) {
      setAnimating(true);
    }
  }
  function handleAnimationEnd() {
    setAnimating(false);
  }
  const icon = createMemo(() => (isFunction(local.icon) ? local.icon() : local.icon));

  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {css(local.css)}
      </style>
      <Dynamic
        ref={ref}
        component={local.link ? 'a' : local.tag || 'button'}
        class={cx(
          'btn',
          local.type,
          local.size,
          local.danger && 'danger',
          local.block && 'block',
          local.fill && 'fill',
          local.circle && 'circle',
          local.flat && 'flat',
          local.dashed && 'dashed',
          local.ghost && 'ghost',
          local.link && 'link',
          local.disabled && 'disabled',
          animating() && 'without',
        )}
        part="button"
        onClick={handleClick}
        onAnimationEnd={handleAnimationEnd}
        disabled={local.disabled}
        role="button"
        {...other}
      >
        <Show when={local.icon}>
          <span class="icon" part="icon">
            {icon()}
          </span>
        </Show>
        <span class="label" part="label">
          {local.children}
        </span>
      </Dynamic>
    </>
  );
}

customElement<ButtonProps>(
  'n-button',
  {
    class: void 0,
    css: void 0,
    type: void 0,
    ghost: void 0,
    fill: void 0,
    circle: void 0,
    dashed: void 0,
    flat: void 0,
    disabled: void 0,
    block: void 0,
    link: void 0,
    danger: void 0,
    size: void 0,
    icon: void 0,
    tag: void 0,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        css: el.css,
        children: [...el.childNodes.values()],
      },
      _,
    );

    createEffect(() => {
      el.replaceChildren();
      el.removeAttribute('css');
    });

    return createComponent(Button, props);
  },
);
export default Button;
