import {
  For,
  type JSXElement,
  Show,
  batch,
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onMount,
  splitProps,
  untrack,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import { FieldName } from '../basic-config';
import Dropdown, { type DropdownProps, defaultProps } from '../dropdown';
import getOptions from '../get-options';
import type { CustomElement, MenuOption } from '..';

export interface SelectProps extends Omit<DropdownProps, 'items' | 'children'> {
  /** 标题 */
  label?: JSXElement | (() => JSXElement);
  /** 占位符 */
  placeholder?: string;
  /** 选项 */
  options?: (MenuOption | string)[];
  /** 前缀图标 */
  prefixIcon?: JSXElement | (() => JSXElement);
  /** 后缀图标 */
  suffixIcon?: JSXElement | (() => JSXElement);
}

function Select(props: SelectProps) {
  const [local, other] = splitProps(props, [
    'css',
    'value',
    'onChange',
    'open',
    'onOpenChange',
    'label',
    'prefixIcon',
    'suffixIcon',
    'placeholder',
    'trigger',
    'options',
  ]);
  let ref: HTMLInputElement | undefined;
  let tagsRef: HTMLDivElement | undefined;
  const [open, setOpen] = createSignal<boolean | null>(null);
  const [value, setValue] = createSignal<(string | number)[]>([]);
  const [x, setX] = createSignal<string>('');
  const [options, setOptions] = createSignal<MenuOption[]>([]);
  const [kv, setKv] = createSignal<Record<string, MenuOption>>({});

  const fieldNames = createMemo(() => Object.assign({}, FieldName, other.fieldNames));

  function getKv(arr: MenuOption[], fieldDic: typeof FieldName) {
    const optKv: Record<string, MenuOption> = {};

    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i];
      const _options = item[fieldDic.options];

      optKv[item[fieldDic.value]!] = item;
      if (Array.isArray(_options)) {
        Object.assign(optKv, getKv(_options, fieldDic));
      }
      const _children = item[fieldDic.children];

      optKv[item[fieldDic.value]!] = item;
      if (Array.isArray(_children)) {
        Object.assign(optKv, getKv(_children, fieldDic));
      }
    }
    return optKv;
  }

  createEffect(() => {
    batch(() => {
      const fieldDic = fieldNames();
      const opts = getOptions(local.options, fieldDic);

      setOptions(opts);
      setKv(getKv(opts, fieldDic));
    });
  });

  function openChange(next: boolean | null) {
    if (!other.disabled) {
      if (isFunction(local.onOpenChange)) {
        local.onOpenChange(next);
      }
      if (local.open === undefined) {
        setOpen(next);
      }
    }
  }
  function click(e: MouseEvent) {
    if (
      (e.target as Element)?.parentElement ===
      (ref?.parentNode?.parentNode as Document)?.activeElement
    ) {
      openChange(!untrack(open));
    }
  }
  function onChange(val: (string | number)[] | string | number | undefined, item: MenuOption) {
    if (local.value === undefined) {
      setValue(val ? (Array.isArray(val) ? val : [val]) : []);
    }
    if (isFunction(local.onChange)) {
      local.onChange(val, item);
    }
  }
  function keyDown({ key }: { key: string }) {
    switch (key) {
      case 'ArrowDown':
        // console.log(key);
        // Object.keys(state.current.kv).indexOf(state.current.value)
        break;
      case 'ArrowUp':
        break;
      case 'Backspace':
        if (other.multiple) {
          const old = [...untrack(value)];

          old.splice(-1, 1);
          onChange(old, untrack(kv)[untrack(value).length - 1]);
        } else {
          onChange(undefined, untrack(kv)[untrack(value)[0]]);
        }
        break;
      case 'Enter':
        openChange(!untrack(open));
        break;
      case 'Escape':
        openChange(false);
        break;
      default:
        break;
    }
  }
  function deleteValue(v: string | number, e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    onChange(untrack(value).filter((old) => old !== v) as never, untrack(kv)[v]);
  }
  function focus(e: FocusEvent | MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    openChange(true);
  }
  function blur(e: FocusEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (untrack(open)) {
      openChange(false);
    }
  }

  createEffect(() => {
    batch(() => {
      if (local.open !== untrack(open) && local.open !== undefined) {
        setOpen(local.open);
      }
      setValue(local.value ? (Array.isArray(local.value) ? local.value : [local.value]) : []);
    });
  });
  onMount(() => {
    if (props.value === undefined) {
      const val = other.defaultValue;

      setValue(val ? (Array.isArray(val) ? val : [val]) : []);
    }
  });
  createEffect(() => {
    if (local.label) {
      setX(`.label {--x: ${tagsRef?.offsetLeft || 0}px; }`);
    }
  });
  const prefix = createMemo(() =>
    isFunction(local.prefixIcon) ? local.prefixIcon() : local.prefixIcon,
  );
  const label = createMemo(() => (isFunction(local.label) ? local.label() : local.label));
  const suffix = createMemo(() =>
    isFunction(local.suffixIcon) ? local.suffixIcon() : local.suffixIcon,
  );

  return (
    <Dropdown
      {...other}
      placement="left"
      css={style + x() + (local.css || '')}
      trigger="none"
      items={options()}
      value={value() as unknown as string}
      onChange={onChange}
      open={open()}
      onOpenChange={openChange}
    >
      <div
        ref={ref}
        class="select"
        tabIndex={other.disabled ? -1 : 0}
        onKeyDown={keyDown}
        onFocus={focus}
        onBlur={blur}
        aria-disabled={other.disabled}
      >
        <Show when={prefix()}>
          <span class="prefix">{prefix()}</span>
        </Show>
        <Show when={label()}>
          <label class="label">{label()}</label>
        </Show>
        <div class="tags" ref={tagsRef} onMouseDown={click}>
          <Show
            when={other.multiple}
            fallback={
              <Show
                when={value().length}
                fallback={
                  <Show when={local.placeholder}>
                    <span class="placeholder">{local.placeholder}</span>
                  </Show>
                }
              >
                <span class={cx('value', open() && 'opacity')}>
                  {kv()[value()[0]]?.[fieldNames().label] || value()[0]}
                </span>
              </Show>
            }
          >
            <For
              each={value()}
              fallback={
                <Show when={local.placeholder}>
                  <span class="placeholder">{local.placeholder}</span>
                </Show>
              }
            >
              {(v) => (
                <n-tag
                  class={cx('tag', open() && 'opacity')}
                  type={kv()[v].type || 'primary'}
                  color={kv()[v].color}
                  icon={kv()[v].icon}
                  close-icon={!other.disabled && !kv()[v].disabled}
                  onClose={deleteValue.bind(null, v)}
                  disabled={other.disabled || kv()[v].disabled}
                >
                  {kv()[v]?.[fieldNames().label] || v}
                </n-tag>
              )}
            </For>
          </Show>
        </div>
        <Show when={suffix()}>
          <span class="suffix">{suffix()}</span>
        </Show>
      </div>
    </Dropdown>
  );
}

export type SelectElement = CustomElement<SelectProps & { defaultValue?: string | number }>;
export type SelectMultipleElement = CustomElement<
  Omit<SelectProps, 'onChange' | 'value' | 'defaultValue'> & {
    value?: Array<string | number>;
    defaultValue?: Array<string | number>;
    // eslint-disable-next-line no-unused-vars
    onChange?(key: Array<string | number>, item: MenuOption): void;
  }
>;

customElement(
  'n-select',
  {
    ...defaultProps,
    options: [],
    label: undefined,
    placeholder: '请选择',
    dropdownMatchSelectWidth: true,
    prefixIcon: undefined,
    suffixIcon: undefined,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        onChange(key: string | number, item: MenuOption) {
          el.dispatchEvent(
            new CustomEvent('change', {
              detail: [key, item],
            }),
          );
        },
        onOpenChange(open: boolean | null) {
          el.dispatchEvent(
            new CustomEvent('openchange', {
              detail: open,
            }),
          );
        },
      },
      _,
    );

    return createComponent(Select, props);
  },
);
export default Select;
