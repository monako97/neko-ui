import { For, createComponent, createEffect, createMemo, createSignal, mergeProps } from 'solid-js';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import getOptions, { type BaseOption, type FieldNames, defaultFieldNames } from '../get-options';
import { baseStyle } from '../theme';
import type { CustomElement } from '..';

export interface CheckboxOption extends Omit<BaseOption, 'danger' | 'icon'> {
  indeterminate?: boolean;
}
export interface CheckboxProps {
  class?: string;
  css?: string;
  name?: string;
  disabled?: boolean;
  checkAll?: boolean;
  value?: string[];
  options: (CheckboxOption | string)[];
  // eslint-disable-next-line no-unused-vars
  onChange: (val: string[]) => void;
  layout?: 'vertical' | 'horizontal';
  fieldNames?: Partial<FieldNames>;
}
function Checkbox(props: CheckboxProps) {
  const [value, setValue] = createSignal<string[]>([]);
  const fieldNames = createMemo(() => ({
    ...defaultFieldNames,
    ...props.fieldNames,
  }));

  createEffect(() => {
    let val: string[] = [];

    if (Array.isArray(props.value)) {
      val = props.value;
    } else if (typeof props.value !== 'undefined') {
      val = [props.value];
    }

    setValue(val);
  });
  const options = createMemo(() => {
    const fieldName = fieldNames();
    const checkAll: CheckboxOption[] = [
      { [fieldName.value]: 'all', [fieldName.label]: '全选', indeterminate: false },
    ];
    const arr = props.checkAll ? checkAll : [];

    return arr.concat(getOptions(props.options || [], fieldName));
  });

  const all = createMemo(() => {
    const allVal: string[] = [];
    const fieldName = fieldNames();

    options().forEach((item) => {
      if (!('indeterminate' in item) && typeof item[fieldName.value] !== 'undefined') {
        allVal.push(item[fieldName.value]);
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
      const val: string = item[fieldNames().value];

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
      props.onChange(newVal);
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
      <style>
        {baseStyle()}
        {style}
      </style>
      <section class={cx('box', props.layout, props.class)}>
        <For each={options()}>
          {(item) => {
            const readOnly = props.disabled || item.disabled;
            const fieldName = fieldNames();
            const realVal = item[fieldName.value];

            if ('indeterminate' in item) {
              createEffect(() => {
                item.ref.indeterminate = getIndeterminate();
              });
            }
            return (
              <span
                class={cx('item', item.class, item.status)}
                aria-disabled={readOnly}
                tabIndex={readOnly ? -1 : 0}
                onKeyUp={onKeyUp.bind(null, item)}
                onClick={onChange.bind(null, item)}
              >
                <input
                  ref={item.ref}
                  class="checkbox"
                  type="checkbox"
                  name={props.name}
                  value={realVal}
                  disabled={readOnly}
                  checked={'indeterminate' in item ? checkedAll() : value().includes(realVal)}
                  onChange={onChange.bind(null, item)}
                />
                <label>{item[fieldName.label]}</label>
              </span>
            );
          }}
        </For>
      </section>
    </>
  );
}

export type CheckboxElement = CustomElement<CheckboxProps>;

customElement(
  'n-checkbox',
  {
    class: undefined,
    css: undefined,
    name: undefined,
    disabled: undefined,
    value: undefined,
    options: [],
    onChange: undefined,
    fieldNames: undefined,
    checkAll: undefined,
    layout: undefined,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        layout: el.layout || 'horizontal',
        onChange(next: string[]) {
          el.dispatchEvent(
            new CustomEvent('change', {
              detail: next,
            }),
          );
        },
      },
      _,
    );

    return createComponent(Checkbox, props);
  },
);
export default Checkbox;
