import {
  For,
  type JSXElement,
  Show,
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  untrack,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import getOptions, { type BaseOption, type FieldNames, defaultFieldNames } from '../get-options';
import { baseStyle, theme } from '../theme';
import type { ButtonElement, CustomElement } from '..';

const style = css`
  :host {
    display: block;
    font-size: var(--font-size);
  }

  [aria-disabled='true'] {
    --primary-color: var(--disable-color);
  }

  .tabs {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    box-sizing: border-box;
    max-inline-size: 100%;

    &::before {
      position: absolute;
      inset-block-end: 0;
      inset-inline-start: 0;
      content: '';
      display: block;
      inline-size: 100%;
      border-block-end: var(--border-base);
    }
  }

  .centered {
    justify-content: center;
  }

  .tab {
    cursor: pointer;
    position: relative;
  }

  .content {
    padding: 16px 0;
  }

  .slide-in {
    animation: slide-in ease-in-out 0.3s;
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(16px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .items {
    position: relative;
    display: flex;
    column-gap: 4px;
    max-inline-size: calc(100% - 38px);
    overflow-x: scroll;

    &::after,
    &::before {
      inset-block-start: 0;
      inset-block-end: 0;
      inline-size: 30px;
      position: absolute;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.3s;
      content: '';
      pointer-events: none;
    }

    &::before {
      inset-inline-start: var(--s, 0);
      box-shadow: inset 10px 0 8px -8px rgb(0 0 0 / 8%);
    }

    &::after {
      inset-inline-end: 0;
      transform: translateX(var(--s, 0));
      box-shadow: inset -10px 0 8px -8px rgb(0 0 0 / 8%);
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .line {
    &::after {
      position: absolute;
      display: block;
      border-radius: 1px;
      background-color: var(--primary-color);
      content: '';
      inline-size: var(--w);
      inset-inline-start: var(--left);
      block-size: 2px;
      inset-block-end: -0.5px;
      transition-duration: var(--transition-duration);
      transition-timing-function: ease;
      transition-property: inline-size, block-size, inset-inline-start, background-color;
    }
  }

  .card {
    gap: 4px;

    .tab {
      display: block;
      border: var(--border-base);
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      background-color: var(--tab-bg);
      transition:
        border-color ease 0.3s,
        background-color ease 0.3s;

      &.active {
        background-color: var(--tab-current-bg);
        border-block-end-color: var(--tab-current-bg);
      }
    }
  }

  .tab.add {
    position: sticky;
    background-color: initial;
    inset-inline-end: 0;
  }

  .warp-left::before {
    opacity: 1;
  }

  .warp-right::after {
    opacity: 1;
  }
`;

const btnCss = css`
  .remove {
    display: inline-block;
    font-size: 12px;
    font-weight: 400;
    color: var(--text-secondary);
    transition: color ease 0.3s;
    margin-inline-start: 8px;

    &:hover {
      color: var(--error-color);
    }
  }

  .btn:has(.remove) {
    padding-inline-end: 10px;
  }
`;

export interface TabOption extends BaseOption {
  icon?: JSXElement;
  content?: JSXElement;
  closable?: boolean;
}
export interface TabsProps {
  class?: string;
  css?: string;
  name?: string;
  disabled?: boolean;
  value: string;
  defaultValue?: string;
  items: (TabOption | string)[];
  centered?: boolean;
  fieldNames?: FieldNames;
  type?: 'line' | 'card';
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string): void;
  add?: boolean;
  // eslint-disable-next-line no-unused-vars
  onEdit?(type: 'add' | 'remove', item: TabOption | undefined, e: Event): void;
  extra?: {
    left?: JSXElement;
    right?: JSXElement;
  };
}

function Tabs(props: TabsProps) {
  let box: HTMLDivElement | undefined;
  let add: ButtonElement | undefined;
  const [value, setValue] = createSignal<string>();
  const [offsetStyle, setOffsetStyle] = createSignal('');
  const [wrap, setWrap] = createSignal({ left: false, right: false });
  let wrapRef: HTMLDivElement | undefined;

  const cssVar = createMemo(() => {
    if (theme.scheme === 'dark') {
      return css`
        :host {
          --tab-current-bg: var(--component-bg);
          --tab-bg: rgb(255 255 255 / 4%);
        }
      `;
    }

    return css`
      :host {
        --tab-bg: var(--primary-details-bg);
        --tab-current-bg: var(--component-bg);
      }
    `;
  });
  const fieldNames = createMemo(() => ({
    ...defaultFieldNames,
    ...props.fieldNames,
  }));
  const items = createMemo<TabOption[]>(() => {
    return getOptions(props.items, fieldNames());
  });
  const current = createMemo(() => {
    return items().find((o) => o[fieldNames().value] === value());
  });

  function onChange(item: TabOption) {
    if (!props.disabled && !item.disabled) {
      const next = item[fieldNames().value];

      if (props.value === undefined) {
        setValue(next);
      }
      if (isFunction(props.onChange)) {
        props.onChange(next);
      }
    }
  }
  function onKeyUp(item: TabOption, e: KeyboardEvent) {
    if (e.key === 'Enter') {
      onChange(item);
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
          e.stopPropagation();
          e.preventDefault();
          if (e.deltaX !== 0) {
            deltaY = e.deltaX;
          } else {
            deltaY = e.deltaY;
          }
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
          el.offsetLeft - wrapRef!.scrollLeft + wrapRef.offsetLeft
        }px;--s:${wrapRef!.scrollLeft}px}`,
      );
    }
  }
  createEffect(() => {
    let _val = untrack(value);

    if (props.value !== undefined) {
      _val = props.value;
    } else if (props.defaultValue !== undefined) {
      _val = props.defaultValue;
    } else if (items()[0]) {
      _val = items()[0][fieldNames().value];
    }
    if (_val !== untrack(value)) {
      setValue(_val);
    }
  });

  createEffect(() => {
    let timer: NodeJS.Timeout | undefined, whellTimer: NodeJS.Timeout | undefined;
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
    setAni('slide-in');
    return current()?.content;
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
      <div
        ref={box}
        class={cx('tabs', props.type, props.class, props.centered && 'centered')}
        onWheel={handleWheel}
        aria-disabled={props.disabled}
      >
        <Show when={props.extra?.left}>{props.extra!.left}</Show>
        <div
          ref={wrapRef}
          class={cx('items', wrap().left && 'warp-left', wrap().right && 'warp-right')}
        >
          <For each={items()}>
            {(item, i) => {
              const readOnly = props.disabled || item.disabled;
              const { icon, value: val, label } = fieldNames();
              const isActive = createMemo(() => value() !== undefined && item[val] === value());

              return (
                <n-button
                  link={true}
                  type={isActive() ? 'primary' : 'default'}
                  class={cx('tab', isActive() && 'active', item.class)}
                  tabIndex={readOnly ? -1 : 0}
                  onKeyUp={onKeyUp.bind(null, item)}
                  onClick={onChange.bind(null, item)}
                  disabled={readOnly}
                  icon={item[icon]}
                  ref={items()[i()].ref}
                  css={btnCss}
                >
                  {item[label]}
                  <Show when={item.closable}>
                    <span class="remove" onClick={handleEdit.bind(null, 'remove', item)}>
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
            css={`
              .btn {
                padding: 4px;
                font-size: var(--font-size-lg);
              }
            `}
            onClick={handleEdit.bind(null, 'add', undefined)}
          >
            ＋
          </n-button>
        </Show>
        <Show when={props.extra?.right}>{props.extra!.right}</Show>
      </div>
      <Show when={current()?.content}>
        <div
          class={cx('content', ani())}
          onAnimationEnd={() => {
            setAni('');
          }}
        >
          {current()!.content}
        </div>
      </Show>
    </>
  );
}

export type TabsElement = CustomElement<TabsProps>;

customElement(
  'n-tabs',
  {
    class: undefined,
    css: undefined,
    name: undefined,
    disabled: undefined,
    value: undefined as unknown as string,
    defaultValue: undefined,
    centered: undefined,
    items: [],
    type: 'line',
    onChange: undefined,
    fieldNames: undefined,
    add: undefined,
    extra: undefined,
  } as TabsProps,
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        onChange(next: string) {
          el.dispatchEvent(
            new CustomEvent('change', {
              detail: next,
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

    return createComponent(Tabs, props);
  },
);
export default Tabs;
