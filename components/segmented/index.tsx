import {
  For,
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
import { type BaseOption, type BasicConfig, type CustomElement, FieldName } from '../basic-config';
import getOptions from '../get-options';
import { baseStyle, theme } from '../theme';

export interface SegmentedProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** input[type="radio"] 的 name 属性 */
  name?: string;
  /** 只读 */
  disabled?: boolean;
  /** 值 */
  value?: string | number;
  /** 默认值 */
  defaultValue?: string | number;
  /** 选项数据 */
  options: (BaseOption | string | number)[];
  /** 自定义节点 'label'、'value'、'options' 的字段 */
  fieldNames?: BasicConfig['fieldName'];
  /** 值修改时的回调方法 */
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string | number): void;
}

function Segmented(props: SegmentedProps) {
  const [value, setValue] = createSignal(props.defaultValue);
  const [offsetStyle, setOffsetStyle] = createSignal('');
  let box: HTMLDivElement | undefined;
  const cssVar = createMemo(() => {
    if (theme.scheme === 'dark') {
      return css`
        :host {
          --segmented-bg: #000;
          --segmented-current-bg: #1f1f1f;
        }
      `;
    }

    return css`
      :host {
        --segmented-bg: var(--primary-details-bg);
        --segmented-current-bg: #fff;
      }
    `;
  });
  const fieldNames = createMemo(() => Object.assign({}, FieldName, props.fieldNames));

  function onChange(item: BaseOption) {
    if (!props.disabled && !item.disabled) {
      const next = item[fieldNames().value];

      if (isFunction(props.onChange)) {
        props.onChange(next);
      }
      if (props.value === void 0) {
        setValue(next);
      }
    }
  }
  function onKeyUp(key: string, item: BaseOption) {
    if (key === 'Enter') {
      onChange(item);
    }
  }
  const options = createMemo(() => {
    return getOptions(props.options, fieldNames());
  });

  createEffect(() => {
    setValue((props.value !== void 0 && props.value) || props.defaultValue);
  });

  createEffect(() => {
    const val = options().find((o) => o[fieldNames().value] === value());
    const timer = setTimeout(() => {
      clearTimeout(timer);
      const el = val?.ref;

      if (el) {
        setOffsetStyle(
          `.box {--w: ${el.offsetWidth}px;--h: ${el.offsetHeight}px;--left: ${el.offsetLeft}px;}`,
        );
      } else {
        setOffsetStyle('');
      }
    }, 0);
  });

  return (
    <>
      <style>
        {baseStyle()}
        {cssVar()}
        {style}
        {offsetStyle()}
        {css(props.css)}
      </style>
      <div ref={box} class={cx('box', props.class)}>
        <For each={options()}>
          {(item, i) => {
            const readOnly = props.disabled || item.disabled;
            const handleChange = () => onChange(item);
            const fieldName = fieldNames();

            return (
              <>
                <input
                  class="segmented"
                  type="radio"
                  name={props.name}
                  value={item[fieldName.value]}
                  disabled={readOnly}
                  checked={item[fieldName.value] === value()}
                  onChange={handleChange}
                />
                <label
                  class={cx('label', item.class)}
                  tabIndex={readOnly ? -1 : 0}
                  onKeyUp={({ key }) => onKeyUp(key, item)}
                  onClick={handleChange}
                  aria-disabled={readOnly}
                  ref={options()[i()].ref}
                >
                  <Show when={item[fieldName.icon]}>
                    <span class="icon">{item[fieldName.icon]}</span>
                  </Show>
                  {item[fieldName.label]}
                  <Show when={item[fieldName.suffix]}>
                    <n-typography type="secondary">{item[fieldName.suffix]}</n-typography>
                  </Show>
                </label>
              </>
            );
          }}
        </For>
      </div>
    </>
  );
}

export type SegmentedElement = CustomElement<SegmentedProps>;

customElement(
  'n-segmented',
  {
    class: void 0,
    css: void 0,
    name: void 0,
    disabled: void 0,
    value: void 0,
    defaultValue: void 0,
    options: void 0,
    onChange: void 0,
    fieldNames: void 0,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        class: el.class,
        css: el.css,
        name: el.name,
        disabled: el.disabled,
        value: el.value,
        defaultValue: el.defaultValue,
        options: el.options || [],
        fieldNames: el.fieldNames,
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

    return createComponent(Segmented, props);
  },
);
export default Segmented;
