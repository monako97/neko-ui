import {
  For,
  Show,
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
import { customElement, noShadowDOM } from 'solid-element';
import { style } from './style';
import Empty from '../empty';
import getOptions, { type BaseOption, type FieldNames, defaultFieldNames } from '../get-options';
import Popover, { type PopoverProps, defaultProps as popoverProps } from '../popover';

export interface DropdownOption extends BaseOption {
  handleClosed?: boolean;
  options?: DropdownOption[];
}

export interface BaseDropdownProps extends Omit<PopoverProps, 'content'> {
  options?: (DropdownOption | string)[];
  selectable?: boolean;
  fieldNames?: Partial<FieldNames>;
  toggle?: boolean;
}
export interface DropdownProps extends BaseDropdownProps {
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string | number, item: DropdownOption): void;
  value?: string | number;
  defaultValue?: string | number;
  multiple?: false;
}
export interface DropdownMultipleProps extends BaseDropdownProps {
  multiple?: true;
  // eslint-disable-next-line no-unused-vars
  onChange?(val: (string | number)[], item: DropdownOption): void;
  value?: (string | number)[];
  defaultValue?: (string | number)[];
}

function Dropdown(props: DropdownProps | DropdownMultipleProps) {
  const [local, other] = splitProps(props, [
    'popupClass',
    'popupCss',
    'value',
    'defaultValue',
    'onChange',
    'open',
    'onOpenChange',
    'selectable',
    'fieldNames',
    'options',
    'multiple',
    'toggle',
  ]);
  let portalRef: HTMLDivElement | undefined;
  const [open, setOpen] = createSignal<boolean | null>(null);
  const [value, setValue] = createSignal<(string | number)[]>([]);

  const fieldNames = createMemo(() => ({
    ...defaultFieldNames,
    ...local.fieldNames,
  }));
  const options = createMemo(() => {
    return getOptions(local.options, fieldNames());
  });

  function preventDefault(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
  function openChange(next: boolean | null) {
    if (isFunction(local.onOpenChange)) {
      local.onOpenChange(next);
    }
    if (local.open === undefined) {
      setOpen(next);
    }
  }
  function change(item: DropdownOption, e: MouseEvent) {
    e.preventDefault();
    if (!item.disabled && !other.disabled) {
      let _value = [...untrack(value)];
      const key = item[untrack(fieldNames).value];

      if (local.multiple) {
        const idx = _value.indexOf(key);

        if (idx === -1) {
          _value.push(key);
        } else {
          _value.splice(idx, 1);
        }
      } else if (local.toggle && _value[0] === key) {
        _value = [];
      } else {
        _value = [key];
      }
      if (isFunction(local.onChange)) {
        local.onChange((local.multiple ? _value : _value[0]) as never, item);
      }
      if (local.value === undefined) {
        setValue(_value);
      }

      if (!local.multiple) {
        openChange(false);
      }
    }
  }

  function renderMenu(list: DropdownOption[]) {
    const { options: optionsKey, label, value: valueKey } = fieldNames();

    return (
      <For each={list}>
        {(item) => {
          if (Array.isArray(item[optionsKey])) {
            return (
              <div class={cx('group', item.class)}>
                <span class="group-title">
                  <Show when={item.icon}>
                    <span class="icon">{item.icon}</span>
                  </Show>
                  {item[label]}
                </span>
                {renderMenu(item[optionsKey])}
              </div>
            );
          }

          return (
            <div
              class={cx('item', item.class, item.danger && 'danger')}
              handle-closed={item.handleClosed}
              aria-disabled={other.disabled || item.disabled}
              aria-selected={local.selectable && value().includes(item[valueKey])}
              onMouseDown={preventDefault}
              onClick={change.bind(null, item)}
            >
              <Show when={item.icon}>
                <span class="icon">{item.icon}</span>
              </Show>
              {item[label]}
            </div>
          );
        }}
      </For>
    );
  }

  createEffect(() => {
    if (open() && local.selectable) {
      setTimeout(() => {
        portalRef?.querySelector('[aria-selected="true"]')?.scrollIntoView({
          block: 'nearest',
        });
      }, 16);
    }
  });
  createEffect(() => {
    if (local.open !== undefined && untrack(open) !== local.open) {
      setOpen(local.open);
    }
  });
  createEffect(() => {
    setValue(local.value ? (Array.isArray(local.value) ? local.value : [local.value]) : []);
  });

  onMount(() => {
    if (props.value === undefined) {
      const val = local.defaultValue;

      setValue(val ? (Array.isArray(val) ? val : [val]) : []);
    }
  });

  return (
    <Popover
      popupClass={cx(local.selectable && 'selectable', local.popupClass)}
      popupCss={style + (local.popupCss || '')}
      open={open()}
      onOpenChange={openChange}
      content={
        <div ref={portalRef} class="container">
          <Show when={options().length} fallback={<Empty style={{ width: '100%' }} />}>
            {renderMenu(options())}
          </Show>
        </div>
      }
      {...other}
    />
  );
}

export interface DropdownSingleElement extends Omit<DropdownProps, 'onChange' | 'onOpenChange'> {
  ref?: DropdownSingleElement | { current: DropdownSingleElement | null };
  // eslint-disable-next-line no-unused-vars
  onChange?(e: CustomEvent<{ key: string | number; item: DropdownOption }>): void;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?(open: CustomEvent<boolean | null>): void;
}

export interface DropdownMultipleElement
  extends Omit<DropdownMultipleProps, 'onChange' | 'onOpenChange'> {
  ref?: DropdownMultipleElement | { current: DropdownMultipleElement | null };
  // eslint-disable-next-line no-unused-vars
  onChange?(e: CustomEvent<{ key: Array<string | number>; item: DropdownOption }>): void;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?(open: CustomEvent<boolean | null>): void;
}

interface CustomElementTags {
  'n-dropdown': DropdownSingleElement | DropdownMultipleElement;
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

export const defaultProps = {
  ...popoverProps,
  selectable: undefined,
  fieldNames: undefined,
  toggle: undefined,
  value: undefined,
  defaultValue: undefined,
  onChange: undefined,
  multiple: undefined,
  options: undefined,
};

customElement('n-dropdown', defaultProps, (_, opt) => {
  if (!_.useShadow) {
    noShadowDOM();
  }
  const el = opt.element;
  const props = mergeProps(
    {
      onChange(key, item) {
        el.dispatchEvent(
          new CustomEvent('change', {
            detail: { key, item },
          })
        );
      },
      onOpenChange(key: boolean | null) {
        el.dispatchEvent(
          new CustomEvent('openchange', {
            detail: key,
          })
        );
      },
      children: [...el.childNodes.values()],
    } as DropdownProps,
    _
  );

  return createComponent(Dropdown, props);
});
export default Dropdown;
