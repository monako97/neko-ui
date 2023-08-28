import {
  type JSX,
  type JSXElement,
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
import { style } from './style';
import theme, { generateTheme } from '../theme';
import type { CustomElement } from '..';

export interface TagProps extends Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  /** 自定义样式表 */
  css?: string;
  /** 自定义类名 */
  class?: string;
  /** 自定义颜色 */
  color?: string;
  /** 图标 */
  icon?: JSXElement;
  /** 内置类型(状态) */
  type?: 'primary' | 'success' | 'error' | 'warning';
  /** 自定义关闭图标 */
  closeIcon?: JSXElement | boolean;
  /** 显示边框
   * @default true
   */
  bordered?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 关闭时的回调方法 */
  onClose?: (e: MouseEvent) => void;
}

function Tag(props: TagProps) {
  const { baseStyle, isDark } = theme;
  const [local, other] = splitProps(props, [
    'class',
    'css',
    'onClose',
    'color',
    'icon',
    'closeIcon',
    'bordered',
    'type',
    'disabled',
  ]);
  const [show, setShow] = createSignal(true);

  const customColor = createMemo(() => {
    if (local.color) {
      return css`
        :host {
          ${generateTheme(local.color, {
            dark: isDark(),
            name: 'tag-custom',
          })}
        }
      `;
    }
    return '';
  });

  function onClose(e: Event) {
    if (isFunction(local.onClose)) {
      local.onClose(e);
    }
    setShow(false);
  }

  return (
    <Show when={show()}>
      <style>
        {baseStyle()}
        {customColor()}
        {style}
        {css(local.css)}
      </style>
      <span
        {...other}
        class={cx(
          'tag',
          local.type,
          local.color && 'tag-custom',
          local.bordered && 'bordered',
          local.disabled && 'disabled',
        )}
      >
        <Show when={local.icon}>
          <span class="icon">{local.icon}</span>
        </Show>
        {other.children}
        <Show when={local.closeIcon}>
          <span class="close" onClick={onClose}>
            {local.closeIcon === true ? '⛌' : local.closeIcon}
          </span>
        </Show>
      </span>
    </Show>
  );
}

export type TagElement = CustomElement<TagProps, 'onClose'>;

customElement<TagProps>(
  'n-tag',
  {
    class: void 0,
    css: void 0,
    color: void 0,
    icon: void 0,
    closeIcon: void 0,
    onClose: void 0,
    bordered: true,
    disabled: void 0,
    type: void 0,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        css: el.css,
        children: [...el.childNodes.values()],
        onClose(e: Event) {
          el.dispatchEvent(
            new CustomEvent('close', {
              detail: e,
            }),
          );
        },
      },
      _,
    );

    createEffect(() => {
      el.replaceChildren();
      el.removeAttribute('css');
    });

    return createComponent(Tag, props);
  },
);

export default Tag;
