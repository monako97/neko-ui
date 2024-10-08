import { createEffect, createSignal, mergeProps, Show } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import theme from '../theme';

import { style } from './style';

export interface SwitchProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 值 */
  checked?: boolean;
  /** 只读 */
  disabled?: boolean;
  /** 设置 为 true 时的文案 */
  checkedText?: string;
  /** 设置 为 false 时的文案 */
  unCheckedText?: string;
  /** 加载状态 */
  loading?: boolean;
  /** 值修改时的回调方法 */
  onChange?: (val: boolean) => void;
}

export type SwitchElement = CustomElement<SwitchProps>;

function Switch(props: SwitchProps) {
  const { baseStyle } = theme;
  const [value, setValue] = createSignal(false);

  function change() {
    if (!props.disabled && !props.loading) {
      setValue((prev) => !prev);
      props.onChange?.(value());
    }
  }

  function onKeyUp({ key }: { key: string }) {
    if (key === 'Enter') {
      change();
    }
  }

  createEffect(() => {
    setValue(!!props.checked);
  });

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <span
        class={cx('switch', props.class)}
        classList={{
          checked: value(),
          loading: props.loading,
        }}
        text-on={props.checkedText}
        text-off={props.unCheckedText}
        aria-disabled={props.disabled}
        onClick={change}
        onKeyUp={onKeyUp}
        tabindex={props.disabled || props.loading ? -1 : 0}
      />
    </>
  );
}

customElement<SwitchProps>(
  'n-switch',
  {
    class: void 0,
    css: void 0,
    checked: void 0,
    disabled: void 0,
    checkedText: void 0,
    unCheckedText: void 0,
    loading: false,
    onChange: void 0,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
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
    return <Switch {...props} />;
  },
);
export default Switch;
