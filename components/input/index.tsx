import { createEffect, createMemo, createSignal, mergeProps, Show } from 'solid-js';
import { isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { BasicConfig, CustomElement } from '..';
import { clearAttribute, type JSXElement } from '../basic-config';
import theme, { inline } from '../theme';
import { registry } from '../utils';

import { style } from './style';

export interface InputProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 前缀 */
  prefixIcon?: JSXElement;
  /** 后缀 */
  suffixIcon?: JSXElement;
  /** 大写锁定图标, 可以结合密码输入框使用
   * @since 2.5.2
   */
  capsLockIcon?: JSXElement;
  /** 禁用 */
  disabled?: boolean;
  /** 自动完成 */
  autoComplete?: string;
  /** 占位文本 */
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
  /** HTML attribute: accept */
  accept?: string;
  /** 值 */
  value?: string | number;
  /** 默认值 */
  defaultValue?: string | number;
  /** 值变更时触发的函数 */
  onChange?: (value: InputProps['value']) => void;
  onKeyDown?(e: KeyboardEvent): void;
  onMouseDown?(e: MouseEvent): void;
  onFocus?(e: FocusEvent): void;
  onBlur?(e: FocusEvent): void;
  onKeyUp?(e: KeyboardEvent): void;
  /** 指定输入框展示值的格式 */
  formatter?: (value?: InputProps['value']) => InputProps['value'];
  /** 搭配 formatter 使用, 将转换后的值转回原来的值 */
  parser?: (value?: InputProps['value']) => InputProps['value'];
}

function Input(props: InputProps) {
  const { baseStyle } = theme;
  let inputRef: HTMLInputElement | undefined;
  const [x, setX] = createSignal<string>();
  const [capsLock, setCapsLock] = createSignal(false);

  function parserValue(val: InputProps['value']) {
    if (props.parser) {
      return isFunction(props.parser) ? props.parser(val) : props.parser;
    } else if (props.type === 'number' && typeof val === 'string') {
      const num = val.replace(/[^\d]/g, '');

      return num.length ? parseFloat(num) : void 0;
    }
    return val;
  }

  function handleInput(e: Event & { target?: HTMLInputElement }) {
    props.onChange?.(parserValue(e.target?.value));
  }
  function handleMouseDown(e: MouseEvent) {
    props.onMouseDown?.(e);
  }
  function handleKeyDown(e: KeyboardEvent) {
    if (props.capsLockIcon) {
      setCapsLock(e.getModifierState('CapsLock'));
    }
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
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <style textContent={x()} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
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
          part="input"
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
        <Show when={props.capsLockIcon && capsLock()}>
          <span class="caps-lock">{props.capsLockIcon}</span>
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
  class: void 0,
  css: void 0,
  suffixIcon: void 0,
  prefixIcon: void 0,
  capsLockIcon: void 0,
  size: void 0,
  disabled: void 0,
  status: void 0,
  type: void 0,
  label: void 0,
  value: void 0,
  defaultValue: void 0,
  formatter: void 0,
  parser: void 0,
  onChange: void 0,
  onMouseDown: void 0,
  onKeyDown: void 0,
  accept: void 0,
  autoComplete: void 0,
  placeholder: '请输入',
};

Input.registry = () => {
  customElement<InputProps>('n-input', defaultInportProps, (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        css: el.css,
        size: el.size || 'normal',
        value: el.value || el.defaultValue || '',
        type: el.type || 'text',
        onChange(val?: number | string) {
          el.dispatchEvent(
            new CustomEvent('change', {
              detail: val,
            }),
          );
        },
      },
      _,
    );

    createEffect(() => {
      clearAttribute(el, ['css']);
    });
    return (
      <>
        <style textContent={inline} />
        <Input {...props} />
      </>
    );
  });
};
registry(Input);
export default Input;
