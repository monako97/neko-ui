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
// import { style } from './style';
import { type CustomElement } from '..';
import { baseStyle, generateTheme, theme } from '../theme';

const style = css`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: calc(var(--border-radius) / 1.5);
    padding: 0 8px;
    font-size: var(--font-size-sm);
    color: var(--text-color);
    background-color: var(--component-bg);
    gap: 5px;
    line-height: 20px;
  }

  .icon {
    font-size: var(--font-size-sm);
    line-height: var(--font-size-sm);
  }

  .bordered {
    border: 1px solid var(--border-color);
  }

  .close {
    font-size: var(--font-size-sm);
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s ease opacity;
    user-select: none;

    &:hover {
      opacity: 1;
    }
  }

  ${['primary', 'success', 'error', 'warning', 'tag-custom']
    .map(
      (s) =>
        `.${s} {--text-color: var(--${s}-color);--border-color: var(--${s}-secondary-bg);--component-bg: var(--${s}-details-bg);}`,
    )
    .join('')}

  .disabled {
    --text-color: var(--disable-color);
    --border-color: var(--disable-border);
    --component-bg: var(--disable-bg);
  }
`;

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
              composed: true,
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
