import { For, createComponent, createEffect, createMemo, createSignal, mergeProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import { type BaseOption, type BasicConfig, type CustomElement, FieldName } from '../basic-config';
import getOptions from '../get-options';
import { baseStyle } from '../theme';

export interface RadioOption extends Omit<BaseOption, 'icon'> {
  /** 值 */
  value?: string;
}

export interface RadioProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** `input[type="radio"]` 的 name 属性 */
  name?: string;
  /** 只读 */
  disabled?: boolean;
  /** 值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 选项数据 */
  options: (RadioOption | string)[];
  /** 自定义节点 `label`、`value`、`options` 的字段
   * @see {@link /neko-ui/basic-config|BasicConfig}
   */
  fieldNames?: BasicConfig['fieldName'];
  /** 值修改时的回调方法 */
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string): void;
  /** 选项排列方式
   * @default `horizontal`
   */
  layout?: 'vertical' | 'horizontal';
}

function Radio(props: RadioProps) {
  const [value, setValue] = createSignal(props.defaultValue);
  const fieldNames = createMemo(() => Object.assign({}, FieldName, props.fieldNames));

  function onChange(item: RadioOption) {
    if (!props.disabled && !item.disabled) {
      const next = item[fieldNames().value]!;

      setValue(next);
      props.onChange?.(next);
    }
  }
  function onKeyUp(key: string, item: RadioOption) {
    if (key === 'Enter') {
      onChange(item);
    }
  }
  const options = createMemo(() => {
    return getOptions(props.options, fieldNames());
  });

  createEffect(() => {
    setValue(props.value);
  });

  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {css(props.css)}
      </style>
      <section class={cx('box', props.layout, props.class)}>
        <For each={options()}>
          {(item) => {
            const readOnly = props.disabled || item.disabled;
            const handleChange = () => onChange(item);
            const fieldName = fieldNames();

            return (
              <label
                class={cx('label', item.class, item.status)}
                tabIndex={readOnly ? -1 : 0}
                onKeyUp={({ key }) => onKeyUp(key, item)}
                onClick={handleChange}
                aria-disabled={readOnly}
              >
                <input
                  class="radio"
                  type="radio"
                  name={props.name}
                  value={item[fieldName.value]}
                  disabled={readOnly}
                  checked={item[fieldName.value] === value()}
                  onChange={handleChange}
                />
                {item[fieldName.label]}
              </label>
            );
          }}
        </For>
      </section>
    </>
  );
}

export type RadioElement = CustomElement<RadioProps>;

customElement(
  'n-radio',
  {
    class: undefined,
    css: undefined,
    name: undefined,
    disabled: undefined,
    value: undefined,
    defaultValue: undefined,
    options: [],
    onChange: undefined,
    fieldNames: undefined,
    layout: undefined,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        layout: el.layout || 'horizontal',
        onChange(next: string) {
          el.dispatchEvent(
            new CustomEvent('change', {
              detail: next,
            }),
          );
        },
      },
      _,
    );

    return createComponent(Radio, props);
  },
);
export default Radio;
