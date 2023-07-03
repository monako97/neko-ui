import { For, createComponent, createEffect, createMemo, createSignal, mergeProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import getOptions, { type BaseOption, type FieldNames, defaultFieldNames } from '../get-options';
import { baseStyle } from '../theme';

const style = css`
  .box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
  }

  .horizontal {
    flex-direction: row;
  }

  .vertical {
    flex-direction: column;
  }

  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    gap: 6px;
    outline: 0;

    label {
      color: var(--text-color);
      cursor: pointer;
    }

    .checkbox {
      position: relative;
      display: inline-block;
      margin: 0;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--component-bg);
      outline: 0 solid transparent;
      box-shadow: inset 0 0 0 var(--shadow-w, 0) var(--primary-color);
      transition: 0.2s border-color linear, 0.2s box-shadow linear, 0.2s outline linear;
      appearance: none;
      inline-size: 16px;
      block-size: 16px;
      pointer-events: none;
      user-select: none;

      &:active {
        --primary-color: var(--primary-active);
        --border-color: var(--primary-active);
      }

      &:disabled {
        --border-color: var(--disable-border);
        --primary-color: var(--disable-border);
      }

      &::before {
        position: absolute;
        display: block;
        margin: auto;
        border-style: solid;
        border-width: 0 0 2px 2px;
        border-color: transparent;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        transition-property: background-color, transform, border-color, height;
        box-sizing: border-box;
        inset-block-start: 0;
        inset-block-end: 0;
        inset-inline-start: 0;
        inset-inline-end: 0;
        content: '';
        inline-size: 10px;
        block-size: 10px;
        transform: scale(0);
      }

      &:checked {
        --shadow-w: 16px;
        --border-color: var(--primary-color);

        &::before {
          block-size: 5px;
          border-color: var(--primary-outline);
          transform: rotate(-55deg) translateY(-10%) translateX(5%) scale(1);
        }

        & + label {
          --text-color: var(--primary-color);
        }
      }

      &:indeterminate:not(:checked) {
        &::before {
          border-radius: 2px;
          background-color: var(--primary-color);
          transform: scale(1);
        }
      }

      &:not(:disabled, :checked):hover {
        --primary-color: var(--primary-hover);
        --border-color: var(--primary-hover);
      }
    }

    &:not([aria-disabled]:not([aria-disabled='false'])):focus .checkbox {
      outline: 3px solid var(--primary-outline);

      &:not(:checked) {
        border-color: var(--primary-hover);
      }
    }

    &[aria-disabled]:not([aria-disabled='false']) {
      cursor: not-allowed;

      & > label {
        --text-color: var(--disable-color);

        cursor: not-allowed;
      }
    }

    &:last-child {
      margin-inline-end: 16px;
    }
  }

  ${['success', 'error', 'warning']
    .map(
      (s) =>
        `.${s} {--border-color: var(--${s}-border);--primary-hover: var(--${s}-hover);--primary-outline: var(--${s}-outline);--primary-color: var(--${s}-color);--primary-active: var(--${s}-active);--component-bg: var(--${s}-bg);}`
    )
    .join('')}
`;

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

export interface CheckboxElement extends Omit<CheckboxProps, 'onChange'> {
  ref?: CheckboxElement | { current: CheckboxElement | null };
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onChange?(val: CustomEvent<any[]>): void;
}

interface CustomElementTags {
  'n-checkbox': CheckboxElement;
}
declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
  }
}
declare global {
  export namespace JSX {
    export interface IntrinsicElements extends CustomElementTags, CustomElementTags {}
  }
}
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
            })
          );
        },
      },
      _
    );

    return createComponent(Checkbox, props);
  }
);
export default Checkbox;
