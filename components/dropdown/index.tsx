import {
  Show,
  createComponent,
  createEffect,
  createSignal,
  mergeProps,
  splitProps,
  untrack,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { customElement } from 'solid-element';
import Empty from '../empty';
import Popover, { defaultProps as popoverProps } from '../popover';
import type { CustomElement, MenuMultipleProps, MenuOption, MenuProps, PopoverProps } from '..';

export interface BaseDropdownProps extends Omit<PopoverProps, 'content'> {}
export interface DropdownProps
  extends Omit<MenuProps, 'openKeys' | 'onOpenChange'>,
    BaseDropdownProps {}
export interface DropdownMultipleProps
  extends Omit<MenuMultipleProps, 'openKeys' | 'onOpenChange'>,
    BaseDropdownProps {}
export type DropdownElement = CustomElement<DropdownProps>;
export type DropdownMultipleElement = CustomElement<DropdownMultipleProps>;

function Dropdown(props: DropdownProps | DropdownMultipleProps) {
  const [local, other] = splitProps(props, [
    'popupClass',
    'popupCss',
    'value',
    'defaultValue',
    'onChange',
    'open',
    'onOpenChange',
    'fieldNames',
    'items',
    'multiple',
    'toggle',
  ]);
  let portalRef: HTMLDivElement | undefined;
  const [value, setValue] = createSignal<(string | number)[]>([]);
  const [open, setOpen] = createSignal<boolean | null>(null);
  const [menuOpenKeys, setMenuOpenKeys] = createSignal<(string | number)[]>([]);

  function openChange(next: boolean | null) {
    if (isFunction(local.onOpenChange)) {
      local.onOpenChange(next);
    }
    if (local.open === undefined) {
      setOpen(next);
    }
  }

  function change(
    e: CustomEvent<[val: (string | number)[] | (string | number), item: MenuOption]>,
  ) {
    const [key, item] = e.detail;

    if (isFunction(local.onChange)) {
      local.onChange(key, item);
    }
    if (local.value === undefined) {
      setValue(Array.isArray(key) ? key : [key]);
    }
    if (!local.multiple) {
      openChange(false);
    }
  }
  function menuOpenKeysChange(e: CustomEvent<(string | number)[]>) {
    setMenuOpenKeys(e.detail);
  }

  createEffect(() => {
    if (typeof local.value !== 'undefined') {
      setValue(local.value ? (Array.isArray(local.value) ? local.value : [local.value]) : []);
    }
  });
  createEffect(() => {
    if (local.open !== undefined && untrack(open) !== local.open) {
      setOpen(local.open);
    }
  });

  return (
    <Popover
      popupClass={local.popupClass}
      popupCss={local.popupCss}
      open={open()}
      onOpenChange={openChange}
      content={
        <div ref={portalRef} class="container">
          <Show when={local.items?.length} fallback={<Empty style={{ width: '100%' }} />}>
            <n-menu
              items={local.items}
              value={value()}
              default-value={local.defaultValue}
              multiple={local.multiple as true}
              field-names={local.fieldNames}
              onChange={change}
              toggle={local.toggle}
              disabled={other.disabled}
              open-keys={menuOpenKeys()}
              onOpenChange={menuOpenKeysChange}
            />
          </Show>
        </div>
      }
      {...other}
    />
  );
}

export const defaultProps = {
  ...popoverProps,
  fieldNames: undefined,
  toggle: undefined,
  value: undefined,
  defaultValue: undefined,
  onChange: undefined,
  multiple: undefined,
  disabled: undefined,
  type: undefined,
  onOpenChange: undefined,
  openKeys: undefined,
};

customElement(
  'n-dropdown',
  {
    ...defaultProps,
    items: [],
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        onChange(key, item) {
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
        children: [...el.childNodes.values()],
      } as DropdownProps,
      _,
    );

    return createComponent(Dropdown, props);
  },
);
export default Dropdown;
