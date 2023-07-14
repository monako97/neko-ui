import {
  type JSXElement,
  Show,
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { baseStyle } from '../theme';
import type { ComponentSize, CustomElement } from '../index';

const styles = css`
  .label {
    --x: 0;

    position: absolute;
    overflow: hidden;
    border-radius: var(--border-radius);
    padding: 0 4px;
    text-overflow: ellipsis;
    color: var(--text-secondary);
    opacity: 0;
    transition:
      transform var(--transition-duration),
      opacity var(--transition-duration),
      color var(--transition-duration),
      background-color var(--transition-duration);
    line-height: 1.45;
    pointer-events: none;
    transform-origin: left;
    max-inline-size: 100%;
    word-break: keep-all;
  }

  .normal {
    padding: 4px 10px;
    font-size: var(--font-size);
    line-height: 1.5;

    .label {
      transform: translate3d(calc(var(--x, 0) - 10px), 0, 1px);
    }
  }

  .large {
    padding: 6px 16px;
    font-size: var(--font-size-lg);
    line-height: 1.5;

    .label {
      transform: translate3d(calc(var(--x, 0) - 16px), 0, 1px);
    }
  }

  .small {
    padding: 2px;
    font-size: var(--font-size-sm);
    line-height: 20px;

    .label {
      transform: translate3d(calc(var(--x, 0) - 2px), 0, 1px);
    }
  }

  .input {
    overflow: hidden;
    border: none;
    font-size: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: inherit;
    inline-size: inherit;
    background: none;
    outline: none;
    appearance: none;
    flex: 1;

    &::placeholder {
      opacity: 0;
      transition:
        color var(--transition-duration),
        opacity var(--transition-duration);
    }

    &:focus::placeholder {
      opacity: 1;
    }

    &:not(:placeholder-shown) + .label,
    &:focus + .label {
      background: var(--component-bg);
      transform: translate3d(0, calc(-50% - 0.43em), 1px) scale(0.8);
    }

    &:focus + .label {
      color: var(--primary-color);
    }

    &:not(:placeholder-shown, :focus) + .label {
      color: var(--text-color);
    }
  }

  .fieldset {
    position: relative;
    display: flex;
    margin: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    color: var(--text-color);
    background-color: var(--component-bg);
    transition: all var(--transition-duration);
    inline-size: 100%;
    background-image: none;
    box-sizing: border-box;
    accent-color: var(--primary-color, #5794ff);

    &:hover {
      border-color: var(--primary-hover, #80b3ff);
      border-inline-end-width: 1px;
    }

    &:focus-within {
      border-color: var(--primary-hover, #80b3ff);
      border-inline-end-width: 1px;
      outline: 0;
      box-shadow: 0 0 0 2px var(--primary-outline);
    }

    &:invalid,
    &.error {
      --border-color: var(--error-border);
      --primary-hover: var(--error-hover);
      --primary-outline: var(--error-outline);
      --primary-color: var(--error-color);

      .label {
        --text-color: var(--error-color);
      }
    }

    &.success {
      --border-color: var(--success-border);
      --primary-hover: var(--success-hover);
      --primary-outline: var(--success-outline);
      --primary-color: var(--success-color);

      .label {
        --text-color: var(--success-color);
      }
    }

    &.warning {
      --border-color: var(--warning-border);
      --primary-hover: var(--warning-hover);
      --primary-outline: var(--warning-outline);
      --primary-color: var(--warning-color);

      .label {
        --text-color: var(--warning-color);
      }
    }

    &:disabled {
      --text-color: var(--disable-color);
      --border-color: var(--disable-border);
      --primary-hover: var(--disable-border);

      background-color: var(--disable-bg);
      cursor: not-allowed;

      .input {
        pointer-events: none;

        &:not(:placeholder-shown) + .label {
          background: var(--disable-border);
        }
      }
    }
  }

  .prefix {
    margin-inline-end: 4px;
  }

  .suffix {
    margin-inline-start: 4px;
  }
`;

export interface InputProps {
  name?: string;
  class?: string;
  css?: string;
  suffixIcon?: JSXElement;
  prefixIcon?: JSXElement;
  disabled?: boolean;
  autoComplete?: string;
  placeholder?: string;
  size?: ComponentSize;
  label?: JSXElement;
  status?: 'error' | 'warning' | 'success';
  type?: 'email' | 'hidden' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  accept?: string;
  value?: string | number;
  defaultValue?: string | number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: InputProps['value'], e: Event) => void;
  // eslint-disable-next-line no-unused-vars
  onKeyDown?(e: KeyboardEvent): void;
  // eslint-disable-next-line no-unused-vars
  onMouseDown?(e: MouseEvent): void;
  // eslint-disable-next-line no-unused-vars
  onBlur?(e: FocusEvent): void;
  // eslint-disable-next-line no-unused-vars
  onKeyUp?(e: KeyboardEvent): void;
  /** 指定输入框展示值的格式 */
  // eslint-disable-next-line no-unused-vars
  formatter?: ((value?: InputProps['value']) => InputProps['value']) | null;
  // eslint-disable-next-line no-unused-vars
  parser?: null | ((value?: InputProps['value']) => InputProps['value']);
}

function Input(props: InputProps) {
  let inputRef: HTMLInputElement | undefined;
  const [x, setX] = createSignal<string>();

  function parserValue(val: InputProps['value']) {
    if (props.parser) {
      return isFunction(props.parser) ? props.parser(val) : props.parser;
    } else if (props.type === 'number' && typeof val === 'string') {
      const num = val.replace(/[^\d]/g, '');

      return num.length ? parseFloat(num) : undefined;
    }
    return val;
  }

  function handleInput(e: Event & { target: HTMLInputElement }) {
    props.onChange?.(parserValue(e.target?.value), e);
  }
  function handleMouseDown(e: MouseEvent) {
    props.onMouseDown?.(e);
  }
  function handleKeyDown(e: KeyboardEvent) {
    props.onKeyDown?.(e);
  }
  function handleBlur(e: FocusEvent) {
    props.onBlur?.(e);
  }
  function handleKeyUp(e: KeyboardEvent) {
    props.onKeyUp?.(e);
  }

  const value = createMemo(() => {
    if (props.formatter) {
      return isFunction(props.formatter) ? props.formatter(props.value) : props.formatter;
    }
    return props.value;
  });

  createEffect(() => {
    if (props.label) {
      setX(`.label {--x: ${inputRef?.offsetLeft || 0}px;opacity:1;}`);
    }
  });

  return (
    <>
      <style>
        {baseStyle()}
        {styles}
        {x()}
        {css(props.css)}
      </style>
      <fieldset
        class={cx('fieldset', props.size, props.status, props.class)}
        disabled={props.disabled}
      >
        <Show when={props.prefixIcon}>
          <span class="prefix">{props.prefixIcon}</span>
        </Show>
        <input
          ref={inputRef}
          class="input"
          onChange={handleInput}
          type={props.type}
          value={value()}
          autocomplete={props.autoComplete}
          accept={props.accept}
          placeholder={props.placeholder}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
        <Show when={props.label}>
          <label class="label">{props.label}</label>
        </Show>
        <Show when={props.suffixIcon}>
          <span class="suffix">{props.suffixIcon}</span>
        </Show>
      </fieldset>
    </>
  );
}

export type InputElement = CustomElement<InputProps>;

export const defaultInportProps = {
  class: undefined,
  css: undefined,
  suffixIcon: undefined,
  prefixIcon: undefined,
  size: undefined,
  disabled: undefined,
  status: undefined,
  type: undefined,
  label: undefined,
  value: undefined,
  defaultValue: undefined,
  formatter: undefined,
  parser: undefined,
  onChange: undefined,
  onMouseDown: undefined,
  onKeyDown: undefined,
  accept: undefined,
  autoComplete: undefined,
  placeholder: '请输入',
};

customElement('n-input', defaultInportProps, (_, opt) => {
  const el = opt.element;
  const props = mergeProps(
    {
      css: el.css,
      size: el.size || 'normal',
      value: el.value || el.defaultValue || '',
      type: el.type || 'text',
      onChange(val?: number | string | undefined) {
        el.dispatchEvent(
          new CustomEvent('change', {
            detail: val,
          }),
        );
      },
    },
    _,
  );

  return createComponent(Input, props);
});

export default Input;
