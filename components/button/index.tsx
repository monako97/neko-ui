import {
  type JSX,
  type JSXElement,
  Show,
  createComponent,
  createEffect,
  createSignal,
  mergeProps,
  splitProps,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { Dynamic } from 'solid-js/web';
import { style } from './style';
import { baseStyle } from '../theme';
import type { BasicConfig, CustomElement } from '../index';

export interface ButtonProps
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'ref'> {
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
  /** 按钮尺寸
   * @default 'normal'
   */
  size?: BasicConfig['size'];
  /** 按钮前面添加一个图标 */
  icon?: JSXElement;
  // eslint-disable-next-line no-unused-vars
  onKeyUp?(e: KeyboardEvent): void;
}
export type ButtonElement = CustomElement<ButtonProps>;

function Button(_: ButtonProps) {
  const _props = mergeProps({ size: 'normal', type: 'default' }, _);
  const [local, props] = splitProps(_props, [
    'ghost',
    'fill',
    'circle',
    'dashed',
    'flat',
    'link',
    'danger',
    'children',
    'block',
    'onClick',
    'size',
    'type',
    'class',
    'icon',
    'css',
  ]);
  let ref: HTMLButtonElement | undefined;
  const [animating, setAnimating] = createSignal(false);

  function handleClick(e: Event) {
    if (props.disabled) return;
    setAnimating(true);
    if (isFunction(local.onClick)) {
      local.onClick(e);
    }
  }
  function handleAnimationEnd() {
    setAnimating(false);
  }

  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {local.css || ''}
      </style>
      <Dynamic
        {...(props as unknown as object)}
        ref={ref}
        component={local.link ? 'a' : 'button'}
        tabIndex={props.disabled ? -1 : 0}
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
          props.disabled && 'disabled',
          animating() && 'without',
          local.class,
        )}
        part="button"
        onClick={handleClick}
        onAnimationEnd={handleAnimationEnd}
      >
        <Show when={local.icon}>
          <span class="icon" part="icon">
            {local.icon}
          </span>
        </Show>
        <span class="label" part="label">
          {local.children}
        </span>
      </Dynamic>
    </>
  );
}

customElement(
  'n-button',
  {
    class: undefined,
    css: undefined,
    type: undefined,
    ghost: undefined,
    fill: undefined,
    circle: undefined,
    dashed: undefined,
    flat: undefined,
    disabled: undefined,
    block: undefined,
    link: undefined,
    danger: undefined,
    size: undefined,
    onClick: undefined,
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
