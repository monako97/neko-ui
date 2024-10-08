import {
  batch,
  createEffect,
  createMemo,
  createSignal,
  For,
  mergeProps,
  onMount,
  Show,
  splitProps,
  untrack,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { customElement } from 'solid-element';

import type { CustomElement, DropdownMultipleProps, DropdownProps, MenuOption } from '..';
import { FieldName } from '../basic-config';
import Dropdown, { defaultProps } from '../dropdown';
import getOptions from '../get-options';

import { style } from './style';

import '../tag';

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
  const [kv, setKv] = createSignal<Record<string, MenuOption | undefined>>({});

  const fieldNames = createMemo(() => Object.assign({}, FieldName, other.fieldNames));

  function getKv(arr: MenuOption[], fieldDic: typeof FieldName) {
    const optKv: Record<string, MenuOption> = {};

    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i];
      const _options = item[fieldDic.options];

      optKv[item[fieldDic.value]!] = item;
      if (Array.isArray(_options)) {
        Object.assign(optKv, getKv(_options as MenuOption[], fieldDic));
      }
      const _children = item[fieldDic.children];

      optKv[item[fieldDic.value]!] = item;
      if (Array.isArray(_children)) {
        Object.assign(optKv, getKv(_children as MenuOption[], fieldDic));
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
      if (local.open === void 0) {
        setOpen(next);
      }
    }
  }
  function click(e: MouseEvent) {
    if (
      (e.target as Element | null)?.parentElement ===
      (ref?.parentNode?.parentNode as Document | null)?.activeElement
    ) {
      openChange(!untrack(open));
    }
  }
  function onChange(val: (string | number)[] | string | number | undefined, item?: MenuOption) {
    if (local.value === void 0) {
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
          onChange(void 0, untrack(kv)[untrack(value)[0]]);
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
  function preventDefault(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }
  function deleteValue(v: string | number, e: CustomEvent) {
    preventDefault(e);
    onChange(untrack(value).filter((old) => old !== v) as never, untrack(kv)[v]);
  }
  function focus(e: FocusEvent | MouseEvent) {
    preventDefault(e);
    openChange(true);
  }
  function blur(e: FocusEvent) {
    preventDefault(e);
    if (untrack(open)) {
      openChange(false);
    }
  }

  createEffect(() => {
    batch(() => {
      if (local.open !== untrack(open) && local.open !== void 0) {
        setOpen(local.open);
      }
      if (local.value !== void 0 && local.value !== null) {
        setValue(Array.isArray(local.value) ? local.value : [local.value]);
      } else {
        setValue([]);
      }
    });
  });
  onMount(() => {
    if (local.value === void 0) {
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
    isFunction(local.prefixIcon) ? (local.prefixIcon() as JSX.Element) : local.prefixIcon,
  );
  const label = createMemo(() =>
    isFunction(local.label) ? (local.label() as JSX.Element) : local.label,
  );
  const suffix = createMemo(() =>
    isFunction(local.suffixIcon) ? (local.suffixIcon() as JSX.Element) : local.suffixIcon,
  );

  return (
    <Dropdown
      placement="left"
      css={style + x() + (local.css || '')}
      trigger="none"
      items={options()}
      value={value() as unknown as string}
      onChange={onChange}
      open={open()}
      onOpenChange={openChange}
      {...other}
    >
      <div
        ref={ref}
        class="select"
        tabindex={other.disabled ? -1 : 0}
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
                <span
                  class="value"
                  classList={{
                    opacity: !!open(),
                  }}
                >
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
                  class="tag"
                  classList={{
                    opacity: !!open(),
                  }}
                  type={kv()[v]?.type || 'primary'}
                  color={kv()[v]?.color}
                  icon={kv()[v]?.icon}
                  close-icon={!other.disabled && !kv()[v]?.disabled}
                  onClose={deleteValue.bind(null, v)}
                  disabled={other.disabled || kv()[v]?.disabled}
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

/** 通用API */
interface SelectBaseProps {
  /** 占位符 */
  placeholder?: string;
  /** 选项 */
  options?: (MenuOption | string | number)[];
  /** 标题 */
  label?: JSX.Element | (() => JSX.Element | (() => JSX.Element));
  /** 前缀图标 */
  prefixIcon?: JSX.Element | (() => JSX.Element | (() => JSX.Element));
  /** 后缀图标 */
  suffixIcon?: JSX.Element | (() => JSX.Element | (() => JSX.Element));
  style?: Record<string, string | number>;
}

/** 单选 */
export interface SelectProps extends Omit<DropdownProps, 'items' | 'children'>, SelectBaseProps {
  /** 值 */
  value?: string | number;
}

/** 多选 */
export interface SelectMultipleProps
  extends Omit<DropdownMultipleProps, 'items' | 'children'>,
    SelectBaseProps {
  /** 值
   * @default []
   */
  value?: (string | number)[];
}
export type SelectElement = CustomElement<SelectProps, 'onChange' | 'onOpenChange'>;
export type SelectMultipleElement = CustomElement<SelectMultipleProps, 'onChange' | 'onOpenChange'>;

customElement<SelectProps>(
  'n-select',
  {
    ...defaultProps,
    options: [],
    label: void 0,
    placeholder: '请选择',
    dropdownMatchSelectWidth: true,
    prefixIcon: void 0,
    suffixIcon: void 0,
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

    createEffect(() => {
      el.removeAttribute('options');
      el.removeAttribute('field-names');
      el.removeAttribute('css');
    });
    return <Select {...props} />;
  },
);
export default Select;
