import { createComponent, createEffect, createSignal, mergeProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import { baseStyle } from '../theme';
import type { CustomElement } from '..';

export interface SwitchProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义类名 */
  css?: string;
  /** 值 */
  checked?: boolean;
  /** 只读 */
  disabled?: boolean;
  /** 设置 为 `true` 时的文案 */
  checkedText?: string;
  /** 设置 为 `false` 时的文案 */
  unCheckedText?: string;
  /** 加载状态 */
  loading?: boolean;
  /** 值修改时的回调方法 */
  // eslint-disable-next-line no-unused-vars
  onChange?: (val: boolean) => void;
}

export type SwitchElement = CustomElement<SwitchProps>;

function Switch(props: SwitchProps) {
  const [value, setValue] = createSignal(false);

  function change() {
    if (!props.disabled && !props.loading) {
      setValue((prev) => !prev);
      props.onChange?.(value());
    }
  }

  function onKeyUpCapture({ key }: { key: string }) {
    if (key === 'Enter') {
      change();
    }
  }

  createEffect(() => {
    setValue(!!props.checked);
  });

  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {css(props.css)}
      </style>
      <span
        class={cx('switch', props.class, value() && 'checked', props.loading && 'loading')}
        text-on={props.checkedText}
        text-off={props.unCheckedText}
        aria-disabled={props.disabled}
        onClick={change}
        onKeyUp={onKeyUpCapture}
        tabIndex={props.disabled || props.loading ? -1 : 0}
      />
    </>
  );
}

customElement(
  'n-switch',
  {
    class: undefined,
    css: undefined,
    checked: undefined,
    disabled: undefined,
    checkedText: undefined,
    unCheckedText: undefined,
    loading: false,
    onChange: undefined,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        class: el.class,
        css: el.css,
        checked: el.checked,
        disabled: el.disabled,
        checkedText: el.checkedText,
        unCheckedText: el.unCheckedText,
        loading: el.loading,
        onChange(val: boolean) {
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
      el.removeAttribute('css');
    });
    return createComponent(Switch, props);
  },
);
export default Switch;
