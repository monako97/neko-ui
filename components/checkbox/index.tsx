import { createEffect, createMemo, createSignal, For, mergeProps, Show } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { BaseOption, BasicConfig, CustomElement } from '..';
import { clearAttribute, FieldName, type JSXElement } from '../basic-config';
import getOptions from '../get-options';
import theme, { inline } from '../theme';
import { registry } from '../utils';

import { style } from './style';

/** 通用API
 * @since 1.0.0
 */
export interface CheckboxBaseProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** input[type="checkbox"] 的 name 属性 */
  name?: string;
  /** 只读 */
  disabled?: boolean;
  /** 选项排列方式
   * @default 'horizontal'
   */
  layout?: 'vertical' | 'horizontal';
  /** 自定义节点 'label'、'value'、'options' 的字段 */
  fieldNames?: BasicConfig['fieldName'];
}
/** 复选框API */
export interface CheckboxBoolProps extends CheckboxBaseProps {
  /** 一个 bool 值; */
  value?: boolean;
  /** 默认值 */
  defaultValue?: boolean;
  /** 值修改时的回调方法 */
  onChange?: (val: boolean) => void;
  checkAll?: never;
  options?: never;
}
/** 通过数据渲染一组复选框按钮的API */
export interface CheckboxGroupProps extends CheckboxBaseProps {
  /** 全选 */
  checkAll?: boolean;
  /** 值;
   * 当设置了value时, 将是受控模式;
   * 受控模式可通过 onChange 事件更新 value
   **/
  value?: (string | number)[];
  /** 默认值 */
  defaultValue?: (string | number)[];
  /** 渲染选项所使用的数据,
   * 当没有设置该值时, 将渲染一个切换 bool 值的按钮
   * */
  options?: (CheckboxOption | string)[];
  /** 值修改时的回调方法 */
  onChange?: (val: (string | number)[]) => void;
}
/** 复选框选项
 * @since 1.0.0
 */
export interface CheckboxOption extends BaseOption {
  /** 不确定状态 */
  indeterminate?: boolean;
}

function Checkbox(props: CheckboxBoolProps | CheckboxGroupProps) {
  const { baseStyle } = theme;
  const [value, setValue] = createSignal<(string | number)[]>([]);
  const fieldNames = createMemo(() => Object.assign({}, FieldName, props.fieldNames));

  createEffect(() => {
    const _val = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    let val: (string | number)[] = [];

    if (Array.isArray(_val)) {
      val = _val;
    } else if (typeof _val !== 'undefined') {
      val = [_val as unknown as string];
    }

    setValue(val);
  });
  const options = createMemo(() => {
    const fieldName = fieldNames();

    if (typeof props.options === 'undefined') {
      return getOptions([{ value: 1 } as CheckboxOption], fieldName);
    }
    const checkAll: CheckboxOption[] = [
      { [fieldName.value]: 'all', [fieldName.label]: '全选', indeterminate: false },
    ];
    const arr = props.checkAll ? checkAll : [];

    return arr.concat(getOptions(props.options || [], fieldName));
  });

  const all = createMemo(() => {
    const allVal: (string | number)[] = [];
    const fieldName = fieldNames();

    options().forEach((item) => {
      if (!('indeterminate' in item) && typeof item[fieldName.value] !== 'undefined') {
        allVal.push(item[fieldName.value]!);
      }
    });

    return allVal;
  });

  function getIndeterminate() {
    let _indeterminate = false;

    all().forEach((v) => {
      if (value().length && !value().includes(v)) {
        _indeterminate = true;
      }
    });
    return _indeterminate;
  }
  const checkedAll = createMemo(() => {
    let checked = true;
    const alls = all();

    for (let i = 0, len = alls.length; i < len; i++) {
      if (!value().includes(alls[i])) {
        checked = false;
        break;
      }
    }
    return checked;
  });

  function onChange(item: CheckboxOption) {
    if (!props.disabled && !item.disabled) {
      const isIndeterminate = 'indeterminate' in item;
      let newVal = isIndeterminate ? [] : [...value()];
      const val = item[fieldNames().value]!;

      if (isIndeterminate) {
        if (!checkedAll()) {
          newVal = all();
        }
      } else {
        const idx = newVal.indexOf(val);

        if (idx !== -1) {
          newVal.splice(idx, 1);
        } else {
          newVal.push(val);
        }
      }
      if (typeof props.value === 'undefined') {
        setValue(newVal);
      }
      props.onChange?.((typeof props.options === 'undefined' ? !!newVal[0] : newVal) as never);
    }
  }
  function onKeyUp(item: CheckboxOption, e: KeyboardEvent) {
    e.preventDefault();
    if (e.key === 'Enter') {
      onChange(item);
    }
  }

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <section class={cx('box', props.layout, props.class)}>
        <For each={options()}>
          {(item) => {
            const readOnly = props.disabled || item.disabled;
            const fieldName = fieldNames();
            const realVal = item[fieldName.value]!;

            if ('indeterminate' in item) {
              createEffect(() => {
                item.ref.indeterminate = getIndeterminate();
              });
            }
            return (
              <span
                class={cx('item', item.class, item.status)}
                aria-disabled={readOnly}
                tabindex={readOnly ? -1 : 0}
                onKeyUp={onKeyUp.bind(null, item)}
                onClick={onChange.bind(null, item)}
              >
                <input
                  ref={item.ref}
                  class="checkbox"
                  type="checkbox"
                  name={props.name}
                  value={realVal as string}
                  disabled={readOnly}
                  checked={'indeterminate' in item ? checkedAll() : value().includes(realVal)}
                  onChange={onChange.bind(null, item)}
                />
                <label>{item[fieldName.label] as JSXElement}</label>
              </span>
            );
          }}
        </For>
      </section>
    </>
  );
}

export type CheckboxGroupElement = CustomElement<CheckboxGroupProps>;
export type CheckboxBoolElement = CustomElement<CheckboxBoolProps>;

Checkbox.registry = () => {
  customElement<CheckboxBoolProps | CheckboxGroupProps>(
    'n-checkbox',
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
      checkAll: void 0,
      layout: void 0,
    },
    (_, opt) => {
      const el = opt.element;
      const props = mergeProps(
        {
          layout: el.layout || 'horizontal',
          onChange(next: (string | number)[] | boolean) {
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
        clearAttribute(el, ['options', 'fieldNames', 'css']);
      });
      return (
        <>
          <style textContent={inline} />
          <Checkbox {...props} />
        </>
      );
    },
  );
};
registry(Checkbox);
export default Checkbox;
