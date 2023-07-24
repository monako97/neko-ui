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
import { style } from './style';
import { baseStyle } from '../theme';
import type { BasicConfig, CustomElement } from '../index';

export interface InputProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 前缀 */
  prefixIcon?: JSXElement;
  /** 后缀 */
  suffixIcon?: JSXElement;
  /** 禁用 */
  disabled?: boolean;
  /** 自动完成 */
  autoComplete?: string;
  /** 填充文本 */
  placeholder?: string;
  /** 组件尺寸
   * @default 'normal'
   */
  size?: BasicConfig['size'];
  /** 描述 */
  label?: JSXElement;
  /** 状态 */
  status?: 'error' | 'warning' | 'success';
  /** 类型
   * @default 'text'
   */
  type?: 'email' | 'hidden' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  /** HTML input accep */
  accept?: string;
  /** 值 */
  value?: string | number;
  /** 默认值 */
  defaultValue?: string | number;
  /** 值变更时触发的函数 */
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
  formatter?: (value?: InputProps['value']) => InputProps['value'];
  /** 搭配 formatter 使用, 将转换后的值转回原来的值 */
  parser?: (value?: InputProps['value']) => InputProps['value'];
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
        {style}
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
