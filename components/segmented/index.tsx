import {
  For,
  type JSXElement,
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
import getOptions, { type BaseOption, type FieldNames, defaultFieldNames } from '../get-options';
import { baseStyle, theme } from '../theme';
import type { CustomElement } from '..';

const style = css`
  .box {
    position: relative;
    display: flex;
    border-radius: var(--border-radius);
    padding: 2px;
    max-inline-size: 100%;
    min-block-size: 28px;
    background-color: var(--segmented-bg);
    line-height: 28px;
    inline-size: fit-content;

    &::before {
      position: absolute;
      display: block;
      border-radius: var(--border-radius);
      background-color: var(--segmented-current-bg);
      box-shadow: 0 2px 8px 0 var(--primary-shadow);
      content: '';
      inline-size: var(--w);
      block-size: var(--h);
      inset-block-start: 2px;
      inset-inline-start: var(--left);
      transition-duration: var(--transition-duration);
      transition-timing-function: ease;
      transition-property: inline-size, block-size, inset-inline-start, background-color;
    }
  }

  .label {
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius);
    padding: 0 12px;
    color: var(--text-color);
    outline: 0;
    transition:
      0.2s background-color ease,
      0.3s color ease;
    cursor: pointer;
    box-sizing: border-box;
    /* stylelint-disable-next-line */
    display: -webkit-box;
    -webkit-box-orient: block-axis;
    -webkit-line-clamp: var(--rows, 1);
    word-break: break-word;
    word-wrap: break-word;
    font-size: var(--font-size);

    &:hover,
    &:focus {
      background-color: var(--primary-selection);
    }

    &[aria-disabled]:not([aria-disabled='false']) {
      cursor: not-allowed;
      color: var(--disable-color);

      &:hover,
      &:focus {
        background-color: transparent;
      }
    }

    .icon {
      margin-inline-end: 6px;
    }
  }

  .segmented {
    display: none;
    pointer-events: none;

    &:checked + .label {
      color: var(--text-heading);
      background-color: transparent;

      &[aria-disabled]:not([aria-disabled='false']) {
        color: var(--disable-color);
      }
    }
  }
`;

export interface SegmentedOption extends BaseOption {
  icon?: JSXElement;
}
export interface SegmentedProps {
  class?: string;
  css?: string;
  name?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  options: (SegmentedOption | string)[];
  fieldNames?: FieldNames;
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string): void;
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
  const fieldNames = createMemo(() => ({
    ...defaultFieldNames,
    ...props.fieldNames,
  }));

  function onChange(item: SegmentedOption) {
    if (!props.disabled && !item.disabled) {
      const next = item[fieldNames().value];

      if (isFunction(props.onChange)) {
        props.onChange(next);
      }
      if (props.value === undefined) {
        setValue(next);
      }
    }
  }
  function onKeyUp(key: string, item: SegmentedOption) {
    if (key === 'Enter') {
      onChange(item);
    }
  }
  const options = createMemo(() => {
    return getOptions(props.options, fieldNames());
  });

  createEffect(() => {
    setValue((props.value !== undefined && props.value) || props.defaultValue);
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
    class: undefined,
    css: undefined,
    name: undefined,
    disabled: undefined,
    value: undefined,
    defaultValue: undefined,
    options: undefined,
    onChange: undefined,
    fieldNames: undefined,
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
