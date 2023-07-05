import {
  type JSXElement,
  createComponent,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { Dynamic } from 'solid-js/web';
import { style } from './style';
import { type ComponentSize } from '../index';
import { baseStyle } from '../theme';

export type ButtonType = 'success' | 'error' | 'primary' | 'warning' | 'default';

export interface ButtonProps extends Partial<Omit<HTMLButtonElement, 'type' | 'children'>> {
  /** 按钮类型 */
  type?: ButtonType;
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
  size?: ComponentSize;
  onClick?: HTMLButtonElement['onclick'];
  class?: string;
  css?: string;
  children?: JSXElement;
}

function Button(_: ButtonProps) {
  const _props = mergeProps({ size: 'normal' as ComponentSize, type: 'default' as ButtonType }, _);
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
  const tag = createMemo(() => (local.link ? 'a' : 'button'));

  return (
    <>
      <style>
        {baseStyle()}
        {style}
      </style>
      <Dynamic
        ref={ref}
        component={tag()}
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
          local.class
        )}
        onClick={handleClick}
        onAnimationEnd={handleAnimationEnd}
        {...(props as unknown as object)}
      >
        <span class="label">{local.children}</span>
      </Dynamic>
    </>
  );
}

export interface ButtonElement extends ButtonProps {
  ref?: ButtonElement | { current: ButtonElement | null };
}

interface CustomElementTags {
  'n-button': ButtonElement;
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
    children: undefined,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(_, {
      children: [...el.childNodes.values()],
    });

    return createComponent(Button, props);
  }
);
export default Button;
