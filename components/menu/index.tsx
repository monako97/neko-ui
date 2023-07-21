import {
  For,
  type JSXElement,
  Match,
  Show,
  Switch,
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
  untrack,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import { type BaseOption, type BasicConfig, type CustomElement, FieldName } from '../basic-config';
import getOptions from '../get-options';
import { baseStyle, theme } from '../theme';

function Menu(props: MenuProps | MenuMultipleProps) {
  const [local, other] = splitProps(props, [
    'class',
    'css',
    'items',
    'fieldNames',
    'value',
    'disabled',
    'toggle',
    'multiple',
    'onChange',
    'onOpenChange',
    'openKeys',
  ]);
  const [value, setValue] = createSignal<(string | number)[]>([]);
  const [openKeys, setOpenKeys] = createSignal<(string | number)[]>([]);
  const cssVar = createMemo(() => {
    if (theme.scheme === 'dark') {
      return ':host {--sub-menu-bg: rgb(255 255 255 / 1%);}';
    }
    return ':host {--sub-menu-bg: rgb(0 0 0 / 1%);}';
  });
  const fieldNames = createMemo(() => Object.assign({}, FieldName, local.fieldNames));
  const options = createMemo(() => getOptions(local.items, fieldNames()));

  function preventDefault(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function change(item: MenuOption, e: MouseEvent) {
    e.preventDefault();
    if (!item.disabled && !local.disabled) {
      let _value = [...untrack(value)];
      const key = item[untrack(fieldNames).value]!;

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
      if (typeof local.value === 'undefined') {
        setValue(_value);
      }
    }
  }

  interface RenderMenuProps {
    list: MenuOption[];
    fieldNames: { [key in keyof typeof FieldName]: string };
  }
  function RenderMenu(_: RenderMenuProps) {
    return (
      <For each={_.list}>
        {(item) => {
          function RowTitle() {
            return (
              <>
                <Show when={item[_.fieldNames.icon]}>
                  <span class="icon">{item[_.fieldNames.icon]}</span>
                </Show>
                {item[_.fieldNames.label]}
                <span class="suffix">{item[_.fieldNames.suffix]}</span>
              </>
            );
          }

          function SubMenu() {
            const isOpen = createMemo(() => openKeys().includes(item[_.fieldNames.value]!));
            const [show, setShow] = createSignal<boolean>(untrack(isOpen));

            createEffect(() => {
              if (isOpen()) {
                setShow(true);
              }
            });
            function handleOpen(e: MouseEvent) {
              preventDefault(e);
              let _openKeys = untrack(openKeys);

              if (_openKeys.includes(item[_.fieldNames.value]!)) {
                _openKeys = _openKeys.filter((v) => v !== item[_.fieldNames.value]);
              } else {
                _openKeys = _openKeys.concat(item[_.fieldNames.value]!);
              }

              if (isFunction(local.onOpenChange)) {
                local.onOpenChange(_openKeys);
              }
              if (local.openKeys === undefined) {
                setOpenKeys(_openKeys);
              }
            }
            function Child() {
              let el: HTMLDivElement | undefined;
              const [hei, setHei] = createSignal();

              createEffect(() => {
                setHei(el?.offsetHeight || 0);
              });
              function onAnimationEnd() {
                if (!untrack(isOpen)) {
                  setShow(false);
                }
              }
              return (
                <div
                  class="sub-menu-children"
                  style={{
                    '--h': `${hei()}px`,
                  }}
                  onAnimationEnd={onAnimationEnd}
                >
                  <div ref={el}>
                    <RenderMenu fieldNames={_.fieldNames} list={item[_.fieldNames.children]!} />
                  </div>
                </div>
              );
            }

            return (
              <div
                class={cx('sub-menu', item.class, `sub-menu-${isOpen() ? 'open' : 'close'}`)}
                onMouseDown={preventDefault}
              >
                <span class="sub-menu-title" onClick={handleOpen}>
                  <RowTitle />
                  <span class="arrow" />
                </span>
                <Show when={show()}>
                  <Child />
                </Show>
              </div>
            );
          }
          return (
            <Switch
              fallback={
                <div
                  class={cx('item', item.class, item.type)}
                  handle-closed={item.handleClosed}
                  aria-disabled={local.disabled || item.disabled}
                  aria-selected={value().includes(item[_.fieldNames.value]!)}
                  onMouseDown={preventDefault}
                  onClick={change.bind(null, item)}
                >
                  <RowTitle />
                </div>
              }
            >
              <Match when={Array.isArray(item[_.fieldNames.children])}>
                <SubMenu />
              </Match>
              <Match when={Array.isArray(item[_.fieldNames.options])}>
                <div class={cx('group', item.class)} onMouseDown={preventDefault}>
                  <span class="group-title">
                    <RowTitle />
                  </span>
                  <RenderMenu fieldNames={_.fieldNames} list={item[_.fieldNames.options]!} />
                </div>
              </Match>
            </Switch>
          );
        }}
      </For>
    );
  }

  createEffect(() => {
    if (typeof local.value !== 'undefined') {
      setValue(local.value ? (Array.isArray(local.value) ? local.value : [local.value]) : []);
    }
  });
  createEffect(() => {
    if (Array.isArray(local.openKeys)) {
      setOpenKeys(local.openKeys);
    }
  });
  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {cssVar()}
        {css(local.css)}
      </style>
      <span {...other} class="menu">
        <RenderMenu fieldNames={fieldNames()} list={options()} />
      </span>
    </>
  );
}

export interface BaseMenuProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 菜单展开的keys */
  openKeys?: (string | number)[];
  /** 菜单展开时触发的方法 */
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (keys: (string | number)[]) => void;
  /** 选项数据 */
  items: (string | MenuOption)[];
  /** 自定义节点 'label'、'value'、'options' 的字段 */
  fieldNames?: BasicConfig['fieldName'];
  /** 不可用状态 */
  disabled?: boolean;
  /** 可以取消 */
  toggle?: boolean;
}

export interface MenuProps extends BaseMenuProps {
  /** 值修改时的回调方法 */
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string | number, item: MenuOption): void;
  /** 值 */
  value?: string | number;
  /** 默认值 */
  defaultValue?: string | number;
  /** 可多选
   * @default false
   */
  multiple?: false;
}

export interface MenuMultipleProps extends BaseMenuProps {
  /** 可多选
   * @default true
   */
  multiple?: true;
  /** 值修改时的回调方法 */
  // eslint-disable-next-line no-unused-vars
  onChange?(val: (string | number)[], item: MenuOption): void;
  /** 值 */
  value?: (string | number)[];
  /** 默认值 */
  defaultValue?: (string | number)[];
}

/** 菜单选项 */
export interface MenuOption extends BaseOption {
  /** 图标 */
  icon?: JSXElement;
  /** 内置类型(状态) */
  type?: 'primary' | 'success' | 'error' | 'warning';
  /** 自定义颜色 */
  color?: string;
  /** 子菜单 */
  children?: MenuOption[];
  /** 分组子选项 */
  options?: MenuOption[];
}

export type MenuElement = CustomElement<MenuProps>;
export type MenuMultipleElement = CustomElement<MenuMultipleProps>;

customElement(
  'n-menu',
  {
    class: undefined,
    css: undefined,
    disabled: undefined,
    type: undefined,
    value: undefined,
    defaultValue: undefined,
    onOpenChange: undefined,
    openKeys: undefined,
    fieldNames: undefined,
    multiple: undefined,
    toggle: undefined,
    onChange: undefined,
    items: [],
  },
  (_, opt) => {
    const el = opt.element;
    const defaultProps: Partial<MenuProps> = {
      css: el.css,
      onChange(key, item) {
        el.dispatchEvent(
          new CustomEvent('change', {
            detail: [key, item],
          }),
        );
      },
      onOpenChange(keys) {
        el.dispatchEvent(
          new CustomEvent('openchange', {
            detail: keys,
          }),
        );
      },
    };
    const props = mergeProps(defaultProps, _);

    createEffect(() => {
      el.removeAttribute('css');
    });

    return createComponent(Menu, props);
  },
);

export default Menu;
