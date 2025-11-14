import {
  createEffect,
  createMemo,
  createSignal,
  For,
  mergeProps,
  onCleanup,
  onMount,
  Show,
  untrack,
} from 'solid-js';
import { isFunction, passiveSupported } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { BaseOption, BasicConfig, ButtonElement, CustomElement } from '..';
import { clearAttribute, FieldName, type JSXElement } from '../basic-config';
import Button from '../button';
import getOptions from '../get-options';
import theme, { block } from '../theme';

import { addCss, btnCss, style } from './style';

export interface TabsProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 只读 */
  disabled?: boolean;
  /** 值(指定值时为受控模式,配合onChange使用) */
  value?: string | number;
  /** 默认值 */
  defaultValue?: string | number;
  /** 选项数据 */
  items?: (TabOption | string)[];
  /** 标签页居中 */
  centered?: boolean;
  /** 自定义节点 'label'、'value'、'options' 的字段 */
  fieldNames?: BasicConfig['fieldName'];
  /** 标签页的显示类型
   * @default 'line'
   */
  type?: 'line' | 'card';
  /** 值修改时的回调方法 */
  onChange?(val: string, item: TabOption, e: Event): void;
  /** 显示添加按钮 */
  add?: boolean;
  /** 删除和添加时的回调方法 */
  onEdit?: (type: 'add' | 'remove', item: TabOption, e: Event) => void;
  /** 给标签页左右添加的附加内容 */
  extra?: {
    left?: JSXElement | (() => JSXElement | (() => JSXElement));
    right?: JSXElement | (() => JSXElement | (() => JSXElement));
  };
  /** 动画
   * @since 2.8.2
   * @default false
   */
  animated?: boolean;
}

export interface TabOption extends Omit<BaseOption, 'options'> {
  /** 内容 */
  content?: JSXElement | (() => JSXElement | (() => JSXElement));
  /** 标签可关闭 */
  closable?: boolean;
}

function Tabs(props: TabsProps) {
  const { baseStyle, isDark } = theme;
  let box: HTMLDivElement | undefined;
  let add: ButtonElement | undefined;
  const [value, setValue] = createSignal<string | number>();
  const [offsetStyle, setOffsetStyle] = createSignal('');
  const [wrap, setWrap] = createSignal({ left: false, right: false });
  let wrapRef: HTMLDivElement | undefined;

  const cssVar = createMemo(() => {
    const dark = isDark();

    return css({
      ':host': {
        '--tab-bg': dark ? 'rgb(255 255 255 / 4%)' : 'var(--primary-details-bg)',
        '--tab-current-bg': dark ? 'var(--component-bg)' : 'var(--component-bg)',
      },
    });
  });
  const fieldNames = createMemo(() => Object.assign({}, FieldName, props.fieldNames));
  const items = createMemo<TabOption[]>(() => {
    return getOptions(props.items, fieldNames());
  });
  const current = createMemo(() => {
    return items().find((o) => o[fieldNames().value] === value());
  });

  function onChange(item: TabOption, e: Event) {
    if (!props.disabled && !item.disabled) {
      const next = item[fieldNames().value];

      if (props.value === void 0) {
        setValue(next);
      }
      if (isFunction(props.onChange)) {
        props.onChange(next, item, e);
      }
    }
  }
  function onKeyUp(item: TabOption, e: KeyboardEvent) {
    if (e.key === 'Enter') {
      onChange(item, e);
    }
  }
  function handleEdit(type: 'remove' | 'add', item: TabOption | undefined, e: Event) {
    e.stopPropagation();
    e.preventDefault();
    if (isFunction(props.onEdit)) {
      props.onEdit(type, item, e);
    }
  }
  function handleWheel(e?: WheelEvent) {
    if (wrapRef) {
      const pwid = box!.offsetWidth;
      const addWid = add?.offsetWidth || 0;
      const scrollWidth = wrapRef.scrollWidth;

      if (scrollWidth > pwid - addWid) {
        let deltaY = 0;

        if (e) {
          if (!passiveSupported) {
            e.stopPropagation();
            e.preventDefault();
          }
          deltaY = e.deltaX !== 0 ? e.deltaX : e.deltaY;
        }
        const nl = wrapRef.scrollLeft + deltaY;

        wrapRef.scrollTo({
          left: nl,
        });
        setWrap({
          left: nl > 0,
          right: scrollWidth > nl + wrapRef.offsetWidth,
        });
      } else {
        setWrap({
          left: false,
          right: false,
        });
      }
      const el = untrack(current)?.ref;

      setOffsetStyle(
        `.tabs {--w: ${el.offsetWidth}px;--left: ${
          el.offsetLeft - wrapRef.scrollLeft + wrapRef.offsetLeft
        }px;--s:${wrapRef.scrollLeft}px}`,
      );
    }
  }
  createEffect(() => {
    let _val = untrack(value);

    if (props.value !== void 0) {
      _val = props.value;
    } else if (props.defaultValue !== void 0) {
      _val = props.defaultValue;
    } else if (items()[0]) {
      _val = items()[0][fieldNames().value];
    }
    if (_val !== untrack(value)) {
      setValue(_val);
    }
  });

  createEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined,
      whellTimer: ReturnType<typeof setInterval> | undefined;
    const el = current()?.ref;

    if (el) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        if (wrapRef) {
          setWrap({
            left: false,
            right: false,
          });
          wrapRef.scrollTo({
            left: el.offsetLeft - wrapRef.offsetLeft,
            behavior: 'smooth',
          });
        }

        setOffsetStyle(
          `.tabs {--w: ${el.offsetWidth}px;--left: ${
            el.offsetLeft - wrapRef!.scrollLeft + wrapRef!.offsetLeft
          }px;--s:${wrapRef!.scrollLeft}px}`,
        );
        whellTimer = setTimeout(() => {
          clearTimeout(whellTimer);
          handleWheel();
        }, 300);
      }, 0);
    } else {
      setOffsetStyle('');
    }
    onCleanup(() => {
      clearTimeout(timer);
      clearTimeout(whellTimer);
    });
  });
  const [ani, setAni] = createSignal('slide-in');

  createEffect(() => {
    if (props.animated) {
      setAni('slide-in');
    }
    return current()?.content;
  });
  const left = createMemo(() =>
    isFunction(props.extra?.left) ? (props.extra.left() as JSXElement) : props.extra?.left,
  );
  const right = createMemo(() =>
    isFunction(props.extra?.right) ? (props.extra.right() as JSXElement) : props.extra?.right,
  );
  const content = createMemo(() => {
    const _content = current()?.content;

    return isFunction(_content) ? (_content() as JSXElement) : _content;
  });

  function onAnimationEnd() {
    if (props.animated) {
      setAni('');
    }
  }
  onMount(() => {
    box?.addEventListener('wheel', handleWheel, {
      passive: passiveSupported,
    });
  });
  onCleanup(() => {
    box?.removeEventListener('wheel', handleWheel, false);
  });

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={cssVar()} />
      <style textContent={style} />
      <style textContent={offsetStyle()} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <div
        ref={box}
        class={cx('tabs', props.type, props.class)}
        classList={{
          centered: props.centered,
        }}
        aria-disabled={props.disabled}
      >
        <Show when={left()}>{left()}</Show>
        <div
          ref={wrapRef}
          class="items"
          classList={{
            'warp-left': wrap().left,
            'warp-right': wrap().right,
          }}
        >
          <For each={items()}>
            {(item, i) => {
              const readOnly = createMemo(() => props.disabled || item.disabled);
              const { icon, value: val, label } = fieldNames();
              const isActive = createMemo(() => value() !== void 0 && item[val] === value());

              return (
                <n-button
                  link={true}
                  type={isActive() ? 'primary' : 'default'}
                  class={cx('tab', item.class)}
                  classList={{
                    active: isActive(),
                    'first-active': isActive() && i() === 0,
                  }}
                  tabindex={readOnly() ? -1 : 0}
                  onKeyUp={onKeyUp.bind(null, item)}
                  onClick={onChange.bind(null, item)}
                  disabled={readOnly()}
                  icon={item[icon]}
                  ref={items()[i()].ref}
                  css={btnCss}
                >
                  {item[label]}
                  <Show when={item.closable}>
                    <span class="remove" on:click={handleEdit.bind(null, 'remove', item)}>
                      ⛌
                    </span>
                  </Show>
                </n-button>
              );
            }}
          </For>
        </div>
        <Show when={props.add}>
          <n-button
            ref={add}
            link={true}
            class="tab add"
            css={addCss}
            onClick={handleEdit.bind(null, 'add', void 0)}
          >
            ＋
          </n-button>
        </Show>
        <Show when={right()}>{right()}</Show>
      </div>
      <Show when={current()?.content}>
        <div
          class="content"
          classList={{
            [ani()]: props.animated,
          }}
          on:animationend={onAnimationEnd}
        >
          {content()}
        </div>
      </Show>
    </>
  );
}

export type TabsElement = CustomElement<TabsProps, 'onChange' | 'onEdit'>;

Tabs.registry = () => {
  Button.registry();
  customElement<TabsProps>(
    'n-tabs',
    {
      class: void 0,
      css: void 0,
      disabled: void 0,
      value: void 0,
      defaultValue: void 0,
      centered: void 0,
      items: [],
      type: 'line' as TabsProps['type'],
      fieldNames: void 0,
      add: void 0,
      extra: void 0,
      animated: void 0,
    },
    (_, opt) => {
      const el = opt.element;
      const props = mergeProps(
        {
          onChange(next: string, item: TabOption, e: Event) {
            el.dispatchEvent(
              new CustomEvent('change', {
                detail: [next, item, e],
              }),
            );
          },
          onEdit(type: 'add' | 'remove', item: TabOption, e: Event) {
            el.dispatchEvent(
              new CustomEvent('edit', {
                detail: [type, item, e],
              }),
            );
          },
        },
        _,
      );

      createEffect(() => {
        clearAttribute(el, ['css', 'fieldNames', 'items', 'extra']);
      });
      return (
        <>
          <style textContent={block} />
          <Tabs {...props} />
        </>
      );
    },
  );
};
export default Tabs;
