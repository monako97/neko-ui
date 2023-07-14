import { For, createComponent, createEffect, createMemo, createSignal, mergeProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import getOptions, { type BaseOption, type FieldNames, defaultFieldNames } from '../get-options';
import { baseStyle } from '../theme';
import type { CustomElement } from '..';

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

  .radio {
    position: relative;
    display: inline-block;
    margin: 0;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    background-color: var(--component-bg);
    appearance: none;
    inline-size: 16px;
    block-size: 16px;
    pointer-events: none;
    transition: 120ms border-color linear;
    user-select: none;

    &::before {
      position: absolute;
      display: inline-block;
      margin: auto;
      border-radius: 50%;
      box-shadow: inset 0 0 0 8px var(--primary-color);
      inset-block-start: 0;
      inset-block-end: 0;
      inset-inline-start: 0;
      inset-inline-end: 0;
      content: '';
      inline-size: 10px;
      block-size: 10px;
      transform: scale(0);
      transition: 120ms transform var(--transition-timing-function);
    }

    &:active {
      border-color: var(--primary-active);

      &::before {
        --primary-color: var(--primary-active);
      }
    }

    &:checked {
      border-color: var(--primary-color);

      &::before {
        transform: scale(1);
      }
    }

    &:disabled {
      border-color: var(--disable-border);

      &::before {
        --primary-color: var(--disable-border);
      }
    }

    &:not(:disabled, :checked):hover {
      border-color: var(--primary-hover);

      &::before {
        --primary-color: var(--primary-hover);
      }
    }
  }

  .label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--text-color);
    cursor: pointer;
    box-sizing: border-box;
    gap: 6px;
    outline: 0;

    &:has(:checked) {
      --text-color: var(--primary-color);
    }

    &:not([aria-disabled]:not([aria-disabled='false'])):focus .radio {
      box-shadow: 0 0 0 3px var(--primary-outline);

      &:not(:checked) {
        border-color: var(--primary-hover);
      }
    }

    &[aria-disabled]:not([aria-disabled='false']) {
      --text-color: var(--disable-color);

      cursor: not-allowed;
    }

    &:last-child {
      margin-inline-end: 16px;
    }
  }

  ${['success', 'error', 'warning']
    .map(
      (s) =>
        `.${s} {--border-color: var(--${s}-border);--primary-hover: var(--${s}-hover);--primary-outline: var(--${s}-outline);--primary-color: var(--${s}-color);--primary-active: var(--${s}-active);--component-bg: var(--${s}-bg);}`,
    )
    .join('')}
`;

export interface RadioOption extends Omit<BaseOption, 'danger' | 'icon'> {
  value?: string;
}

export interface RadioProps {
  class?: string;
  css?: string;
  name?: string;
  disabled?: boolean;
  value?: string;
  options: (RadioOption | string)[];
  fieldNames?: FieldNames;
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string): void;
  layout?: 'vertical' | 'horizontal';
}

function Radio(props: RadioProps) {
  const [value, setValue] = createSignal();
  const fieldNames = createMemo(() => ({
    ...defaultFieldNames,
    ...props.fieldNames,
  }));

  function onChange(item: RadioOption) {
    if (!props.disabled && !item.disabled) {
      const next = item[fieldNames().value];

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
