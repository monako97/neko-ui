import { For, createComponent, createEffect, createMemo, createSignal, mergeProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import { type BaseOption, type BasicConfig, FieldName } from '../basic-config';
import getOptions from '../get-options';
import theme from '../theme';

export interface RadioOption extends Omit<BaseOption, 'icon'> {
  /** 值 */
  value?: string;
}

export interface RadioProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** input[type="radio"] 的 name 属性 */
  name?: string;
  /** 只读 */
  disabled?: boolean;
  /** 值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 选项数据 */
  options: (RadioOption | string)[];
  /** 自定义节点 'label'、'value'、'options' 的字段 */
  fieldNames?: BasicConfig['fieldName'];
  /** 值修改时的回调方法 */
  onChange?(val: string): void;
  /** 选项排列方式
   * @default 'horizontal'
   */
  layout?: 'vertical' | 'horizontal';
}

function Radio(props: RadioProps) {
  const { baseStyle } = theme;
  const [value, setValue] = createSignal(props.defaultValue);
  const fieldNames = createMemo(() => Object.assign({}, FieldName, props.fieldNames));

  function onChange(item: RadioOption) {
    if (!props.disabled && !item.disabled) {
      const next = item[fieldNames().value]!;

      setValue(next);
      props.onChange?.(next);
    }
  }
  function onKeyUp(item: RadioOption, e: KeyboardEvent) {
    if (e.key === 'Enter') {
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
      <section class={cx('box', props.layout, props.class)} part="box">
        <For each={options()}>
          {(item) => {
            const readOnly = props.disabled || item.disabled;
            const handleChange = () => {
              onChange(item);
            };
            const fieldName = fieldNames();

            return (
              <div
                class={cx('item', item.class, item.status)}
                part="item"
                tabIndex={readOnly ? -1 : 0}
                aria-disabled={readOnly}
                onKeyUp={onKeyUp.bind(null, item)}
                onClick={handleChange}
              >
                <input
                  class="radio"
                  type="radio"
                  name={props.name}
                  value={item[fieldName.value]}
                  disabled={readOnly}
                  tabIndex={-1}
                  checked={item[fieldName.value] === value()}
                  onChange={handleChange}
                />
                <label class="label" part="label">
                  {item[fieldName.label]}
                </label>
              </div>
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
    class: void 0,
    css: void 0,
    name: void 0,
    disabled: void 0,
    value: void 0,
    defaultValue: void 0,
    options: [],
    onChange: void 0,
    fieldNames: void 0,
    layout: void 0,
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

    createEffect(() => {
      el.removeAttribute('options');
      el.removeAttribute('field-names');
      el.removeAttribute('css');
    });
    return createComponent(Radio, props);
  },
);
export default Radio;
