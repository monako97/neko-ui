import { createEffect, createMemo, createSignal, mergeProps, Show, splitProps } from 'solid-js';
import { isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute } from '../basic-config';
import theme, { generateColor, inline } from '../theme';

import { style } from './style';

export interface TagProps {
  /** 自定义样式表 */
  css?: string;
  /** 自定义类名 */
  class?: string;
  /** 自定义颜色 */
  color?: string;
  /** 图标 */
  icon?: JSX.Element;
  /** 内置类型(状态) */
  type?: 'primary' | 'success' | 'error' | 'warning';
  /** 自定义关闭图标 */
  closeIcon?: JSX.Element | boolean;
  /** 显示边框
   * @default true
   */
  bordered?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 关闭时的回调方法 */
  onClose?: (e: MouseEvent) => void;
  children?: JSX.Element;
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
          ${generateColor(local.color, {
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
      <style textContent={baseStyle()} />
      <style textContent={customColor()} />
      <style textContent={style} />
      <Show when={local.css}>
        <style textContent={css(local.css)} />
      </Show>
      <span
        {...other}
        class={cx('tag', local.type)}
        classList={{
          'tag-custom': !!local.color,
          bordered: local.bordered,
          disabled: local.disabled,
        }}
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
      clearAttribute(el, ['css']);
    });

    return (
      <>
        <style textContent={inline} />
        <Tag {...props} />
      </>
    );
  },
);

export default Tag;
