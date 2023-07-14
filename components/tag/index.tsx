import {
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
import { type CustomElement } from '..';
import { baseStyle, generateTheme, theme } from '../theme';

export interface TagProps {
  css?: string;
  class?: string;
  color?: string;
  type?: 'primary' | 'success' | 'error' | 'warning';
  icon?: JSXElement;
  closeIcon?: JSXElement | boolean;
  bordered?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClose?(e: Event): void;
  children?: JSXElement | JSXElement[];
}

function Tag(props: TagProps) {
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
            dark: theme.scheme === 'dark',
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

export type TagElement = CustomElement<TagProps>;

customElement(
  'n-tag',
  {
    class: undefined,
    css: undefined,
    color: undefined,
    icon: undefined,
    closeIcon: undefined,
    onClose: undefined,
    bordered: true,
    disabled: undefined,
    type: undefined,
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
