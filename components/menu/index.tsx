import {
  createEffect,
  createMemo,
  createSignal,
  For,
  Match,
  mergeProps,
  Show,
  splitProps,
  Switch,
  untrack,
} from 'solid-js';
import { frameCallback, isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { BaseOption, BasicConfig, CustomElement } from '..';
import { clearAttribute, FieldName, type JSXElement } from '../basic-config';
import getOptions from '../get-options';
import theme, { block } from '../theme';

import { style } from './style';

function Menu(props: MenuProps | MenuMultipleProps) {
  let ref: HTMLDivElement | undefined;
  const { isDark, baseStyle } = theme;
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
  const cssVar = createMemo(
    () => `:host {--sub-menu-bg: ${isDark() ? 'rgb(255 255 255 / 1%)' : 'rgb(0 0 0 / 1%)'} ;}`,
  );
  const fieldNames = createMemo(() => Object.assign({}, FieldName, local.fieldNames));
  const options = createMemo(() => getOptions(local.items, fieldNames()));

  function preventDefault(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function change(item: MenuOption, e: MouseEvent) {
    e.preventDefault();
    if (!item.disabled && !local.disabled) {
      let _value = [...value()];
      const key = item[fieldNames().value]!;

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
                  <span class="menu-icon" part="icon">
                    {item[_.fieldNames.icon]}
                  </span>
                </Show>
                <span class="menu-label">{item[_.fieldNames.label]}</span>
                <Show when={item[_.fieldNames.suffix]}>
                  <span class="menu-suffix" part="suffix">
                    {item[_.fieldNames.suffix]}
                  </span>
                </Show>
              </>
            );
          }

          function SubMenu() {
            const isOpen = createMemo(() => openKeys().includes(item[_.fieldNames.value]));
            const [show, setShow] = createSignal<boolean>(untrack(isOpen));

            createEffect(() => {
              if (isOpen()) {
                setShow(true);
              }
            });
            function handleOpen(e: MouseEvent) {
              preventDefault(e);
              let _openKeys = openKeys();

              if (_openKeys.includes(item[_.fieldNames.value])) {
                _openKeys = _openKeys.filter((v) => v !== item[_.fieldNames.value]);
              } else {
                _openKeys = _openKeys.concat(item[_.fieldNames.value]);
              }

              if (isFunction(local.onOpenChange)) {
                local.onOpenChange(_openKeys);
              }
              if (local.openKeys === void 0) {
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
                if (!isOpen()) {
                  setShow(false);
                }
              }
              return (
                <div
                  class="sub-menu-children"
                  part="sub-menu-children"
                  style={{
                    '--h': `${hei()}px`,
                  }}
                  onAnimationEnd={onAnimationEnd}
                >
                  <div ref={el}>
                    <RenderMenu fieldNames={_.fieldNames} list={item[_.fieldNames.children]} />
                  </div>
                </div>
              );
            }

            return (
              <div
                class={cx('sub-menu', item.class)}
                classList={{
                  'sub-menu-open': isOpen(),
                  'sub-menu-close': !isOpen(),
                }}
                part="sub-menu"
                onMouseDown={preventDefault}
              >
                <span class="sub-menu-title" onClick={handleOpen}>
                  <RowTitle />
                  <span class="menu-arrow" />
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
                  class={cx('menu-item', item.class, item.type)}
                  part="item"
                  handle-closed={item.handleClosed}
                  aria-disabled={local.disabled || item.disabled}
                  aria-selected={value().includes(item[_.fieldNames.value])}
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
                <div class={cx('menu-group', item.class)} onMouseDown={preventDefault}>
                  <span class="menu-group-title">
                    <RowTitle />
                  </span>
                  <RenderMenu fieldNames={_.fieldNames} list={item[_.fieldNames.options]} />
                </div>
              </Match>
            </Switch>
          );
        }}
      </For>
    );
  }

  createEffect(() => {
    if (local.value !== void 0 && local.value !== null) {
      setValue(Array.isArray(local.value) ? local.value : [local.value]);
    } else {
      setValue([]);
    }
  });
  createEffect(() => {
    if (Array.isArray(local.openKeys)) {
      setOpenKeys(local.openKeys);
    }
  });

  createEffect(() => {
    if (Array.isArray(value()) && value().length) {
      frameCallback(() => {
        const el = ref?.querySelector<HTMLElement>('[aria-selected=true]');

        if (el && ref) {
          const next = el.offsetTop - ref.offsetTop;

          if (next < ref.scrollTop) {
            ref.scrollTo({
              top: next,
              behavior: 'smooth',
            });
          } else if (
            el.offsetTop + el.offsetHeight >
            ref.scrollTop + ref.offsetHeight + ref.offsetTop
          ) {
            ref.scrollTo({
              top: next - ref.offsetHeight + el.offsetHeight,
              behavior: 'smooth',
            });
          }
        }
      });
    }
  });
  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <style textContent={cssVar()} />
      <Show when={local.css}>
        <style textContent={css(local.css)} />
      </Show>
      <section ref={ref} class="menu" part="menu" {...other}>
        <RenderMenu fieldNames={fieldNames()} list={options()} />
      </section>
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
  onOpenChange?: (keys: (string | number)[]) => void;
  /** 选项数据 */
  items?: (string | MenuOption)[];
  /** 自定义节点 'label'、'value'、'options' 的字段 */
  fieldNames?: BasicConfig['fieldName'];
  /** 不可用状态 */
  disabled?: boolean;
  /** 可以取消 */
  toggle?: boolean;
}

export interface MenuProps extends BaseMenuProps {
  /** 值修改时的回调方法 */
  onChange?(val: string | number, item: MenuOption): void;
  /** 值 */
  value?: string | number;
  /** 默认值 */
  defaultValue?: string | number;
  /** 可多选
   * @default false
   */
  multiple?: false | never;
}

export interface MenuMultipleProps extends BaseMenuProps {
  /** 可多选
   * @default true
   */
  multiple: true;
  /** 值修改时的回调方法 */
  onChange?(val: (string | number)[], item: MenuOption): void;
  /** 值 */
  value?: (string | number)[];
  /** 默认值 */
  defaultValue?: (string | number)[];
}

/** 菜单选项 */
export interface MenuOption extends Omit<BaseOption, 'children' | 'options'> {
  /** 图标 */
  icon?: JSXElement | (() => JSXElement);
  /** 内置类型(状态) */
  type?: 'primary' | 'success' | 'error' | 'warning';
  /** 自定义颜色 */
  color?: string;
  /** 子菜单 */
  children?: (string | MenuOption)[];
  /** 分组子选项 */
  options?: (string | MenuOption)[];
}

export type MenuElement = CustomElement<MenuProps, 'onChange' | 'onOpenChange'>;
export type MenuMultipleElement = CustomElement<MenuMultipleProps, 'onChange' | 'onOpenChange'>;

customElement<MenuProps>(
  'n-menu',
  {
    class: void 0,
    css: void 0,
    disabled: void 0,
    value: void 0,
    defaultValue: void 0,
    onOpenChange: void 0,
    openKeys: void 0,
    fieldNames: void 0,
    multiple: void 0,
    toggle: void 0,
    onChange: void 0,
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
      clearAttribute(el, ['css', 'items', 'fieldNames']);
    });
    return (
      <>
        <style textContent={block} />
        <Menu {...props} />
      </>
    );
  },
);

export default Menu;
