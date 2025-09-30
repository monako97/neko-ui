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
import { Dynamic } from 'solid-js/web';
import { isFunction } from '@moneko/common';
import { css } from '@moneko/css';
import { customElement } from 'solid-element';

import type { BasicConfig, CustomElement } from '..';
import { clearAttribute, type JSXElement } from '../basic-config';
import theme, { block, inline } from '../theme';

import loadingIcon from './loading';
import { style } from './style';

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
  icon?: (() => JSXElement) | JSXElement;
  children?: JSXElement | string;
  onClick?(e: Event): void;
  loading?: boolean;
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
    'loading',
  ]);
  let ref: HTMLButtonElement | undefined;
  const [animating, setAnimating] = createSignal(false);

  function handleClick() {
    if (!local.disabled && !local.loading) {
      setAnimating(true);
    }
  }
  function handleAnimationEnd() {
    setAnimating(false);
  }
  const icon = createMemo(() => (isFunction(local.icon) ? local.icon() : local.icon));
  const hostStyle = createMemo(() => (local.block ? block : inline));

  return (
    <>
      <style textContent={hostStyle()} />
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <Show when={local.css}>
        <style textContent={css(local.css)} />
      </Show>
      <Dynamic
        ref={ref}
        component={local.link ? 'a' : local.tag || 'button'}
        class="btn"
        classList={{
          [local.type]: true,
          [local.size]: true,
          loading: local.loading,
          danger: local.danger,
          block: local.block,
          fill: local.fill,
          circle: local.circle,
          flat: local.flat,
          dashed: local.dashed,
          ghost: local.ghost,
          link: local.link,
          disabled: local.disabled,
          without: animating(),
        }}
        part="button"
        on:click={handleClick}
        on:animationend={handleAnimationEnd}
        disabled={local.disabled || local.loading}
        role="button"
        {...other}
      >
        <Show when={local.icon || local.loading}>
          <span class="icon" part="icon">
            <Switch>
              <Match when={local.icon}>{icon()}</Match>
              <Match when={local.loading}>{loadingIcon()}</Match>
            </Switch>
          </span>
        </Show>
        <span class="label" part="label">
          {local.children}
        </span>
      </Dynamic>
    </>
  );
}

Button.registry = () => {
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
      loading: void 0,
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
        clearAttribute(el, ['css']);
        el.replaceChildren();
      });

      return <Button {...props} />;
    },
  );
};

export default Button;
