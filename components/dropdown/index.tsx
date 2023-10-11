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
import '../menu';
import Popover, { defaultProps as popoverProps } from '../popover';
import type { CustomElement, MenuMultipleProps, MenuOption, MenuProps, PopoverProps } from '..';

export interface BaseDropdownProps extends Omit<PopoverProps, 'content'> {
  /** 打开内容气泡 */
  open?: boolean | null;
}
export interface DropdownProps
  extends Omit<MenuProps, 'openKeys' | 'onOpenChange'>,
    BaseDropdownProps {
  /** 打开内容气泡 */
  open?: boolean | null;
}
export interface DropdownMultipleProps
  extends Omit<MenuMultipleProps, 'openKeys' | 'onOpenChange'>,
    BaseDropdownProps {
  /** 打开内容气泡 */
  open?: boolean | null;
}
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
    if (local.open === void 0) {
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
    if (local.value === void 0) {
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
    if (local.value !== void 0 && local.value !== null) {
      setValue(Array.isArray(local.value) ? local.value : [local.value]);
    } else {
      setValue([]);
    }
  });
  createEffect(() => {
    if (local.open !== void 0 && untrack(open) !== local.open) {
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
              default-value={local.defaultValue}
              multiple={local.multiple as true}
              field-names={local.fieldNames}
              toggle={local.toggle}
              disabled={other.disabled}
              value={value()}
              onChange={change}
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
  fieldNames: void 0,
  toggle: void 0,
  value: void 0,
  defaultValue: void 0,
  onChange: void 0,
  multiple: void 0,
  disabled: void 0,
  type: void 0,
  onOpenChange: void 0,
  openKeys: void 0,
};

customElement<DropdownProps>(
  'n-dropdown',
  {
    ...defaultProps,
    items: [],
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        items: el.items,
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

    createEffect(() => {
      el.removeAttribute('items');
      el.removeAttribute('field-names');
      el.removeAttribute('css');
    });
    return createComponent(Dropdown, props);
  },
);
export default Dropdown;
