import {
  For,
  type JSXElement,
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
} from 'solid-js';
import { cloneDeep, isFunction, passiveSupported } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import schema from '../from-schema';
import { baseStyle } from '../theme';
import type { ComponentSize } from '../index';

const sizeCnt = {
  small: 6,
  normal: 8,
  large: 10,
};
const style = css`
  .tree {
    --size: 8px;

    padding-inline-start: 2em;
    inline-size: 100%;
    box-sizing: border-box;
  }

  .row {
    position: relative;
    z-index: 0;
    display: flex;
    align-items: baseline;
    border-radius: var(--border-radius);
    padding: 2px 10px;
    color: var(--text-color);
    background-color: var(--component-bg);
    list-style: none;
    box-shadow: 0 0 0 1px var(--border-color);
    margin-inline-start: var(--depth);
    margin-block-end: var(--size);
    cursor: pointer;
    box-sizing: border-box;
    min-inline-size: 160px;
    inline-size: fit-content;
  }

  .row.non {
    cursor: auto;
  }

  .row::before,
  .row::after {
    position: absolute;
    pointer-events: none;
    z-index: -1;
    inset-inline-start: 0;
    transition-property: border-color;
  }

  .row:not(:first-of-type, :last-of-type, [data-path-end])::before {
    content: '';
    inset-inline-start: -1em;
    inset-block-start: 50%;
    inline-size: 1em;
    block-size: 100%;
    border-block-start: 1px solid var(--border-color);
    box-sizing: border-box;
  }

  .row[data-path] {
    --r: 0 0 0 var(--border-radius);
    --c: '';

    &::after {
      border-style: solid;
      border-width: 0 0 1px 1px;
      border-color: var(--border-color);
      border-radius: var(--r);
      content: var(--c);
      inline-size: 1em;
      inset-block-start: calc(var(--size) * -1);
      inset-inline-start: -1em;
      block-size: var(--line);
      box-sizing: border-box;
    }
  }

  .row:first-of-type {
    --r: var(--border-radius) 0 0 var(--border-radius);

    &[data-path]::after {
      border-width: 1px 0 1px 1px;
      inset-block-start: 15px;
    }
  }

  .row:last-of-type {
    margin-block-end: 0;
  }

  .title {
    font-size: 14px;
    font-weight: normal;
  }

  .sub-title {
    padding: 0 var(--size);
    font-size: 10px;
    color: var(--text-secondary);
    font-style: italic;
    text-transform: capitalize;
    opacity: 0.5;
  }

  .row.active {
    color: var(--on-primary-selection);
    background-color: var(--primary-selection);
    box-shadow: 0 0 0 1px var(--primary-border);
    text-shadow: 2px 2px 2px var(--primary-outline);
  }

  .rtl {
    direction: rtl;
  }

  .rtl .row {
    flex-direction: row-reverse;
    justify-content: flex-end;

    &::before,
    &::after {
      transform: scaleX(-1);
    }
  }

  .normal {
    --size: 8px;
  }

  .small {
    --size: 6px;
  }

  .small .row {
    padding: 1px 9px;

    &:first-of-type[data-path]::after {
      inset-block-start: 12px;
    }
  }

  .small .title {
    font-size: 13px;
  }

  .small .sub-title {
    padding: 0 4px;
    font-size: 9px;
  }

  .large {
    --size: 10px;
  }

  .large .row {
    padding: 3px 12px;

    &:first-of-type[data-path]::after {
      inset-block-start: 17px;
    }
  }

  .large .title {
    font-size: 15px;
  }

  .large .sub-title {
    padding: 0 10px;
    font-size: 12px;
  }
`;

const path = Symbol('path');
const pathEnd = Symbol('path-end');

function countLineLen(tree: TreeData[], depth = 0) {
  const lastIdx = tree.length - 1;
  const last = tree[lastIdx];
  const frist = tree[0];
  let line: string[] = [];

  for (let i = 0, len = tree.length; i < len; i++) {
    const item = tree[i],
      isLast = i === lastIdx;

    if (i === 0 || isLast) {
      item[path] = frist.key + (tree.length === 1 ? '' : `>${last.key}`);
      if (isLast) {
        item[pathEnd] = '';
      }
      line.push(item[path]);
    }
    if (item.children) {
      line = line.concat(countLineLen(item.children, depth + 1));
    }
  }
  return line;
}

interface TreeStack extends TreeData {
  depth?: number;
}

function parseTree(str: string): TreeData[] {
  const depthRegex = /[^\s|`│├└]/;
  const lines = str.trim().split('\n');
  const stack: TreeStack[] = [{ title: lines[0], key: lines[0] }];

  for (let i = 1; i < lines.length; i++) {
    const depth = lines[i].search(depthRegex);

    if (depth === -1) {
      continue;
    }
    const node: Partial<TreeData> = {
      title: lines[i].slice(depth + 3),
      depth,
    };

    while (stack.length && depth <= (stack[stack.length - 1].depth || 0)) {
      stack.pop();
    }
    if (!stack.length) {
      return [];
    }
    const parent = stack[stack.length - 1];

    if (!parent.children) {
      parent.children = [];
    }
    node.key = `${parent.key}-${node.title}-${depth}-${i}`;
    parent.children.push(node as TreeData);
    stack.push(node as TreeData);
  }

  return [stack[0]];
}

export interface TreeData<T = string> {
  key: T;
  name?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  children?: TreeData<T>[];
  [path]?: string;
  [pathEnd]?: string;
  [key: string | number | symbol]:
    | T
    | string
    | number
    | symbol
    | boolean
    | TreeData<T>[]
    | undefined;
}

// type ArrayElementType<T extends unknown[] | unknown> = T extends (infer U)[] ? U : T;
// eslint-disable-next-line no-unused-vars
type OnRowClick = (e: MouseEvent, key: string, item: TreeData) => void;
export interface TreeBaseProp {
  class?: string;
  css?: string;
  size?: ComponentSize;
  readonly?: boolean;
  toggle?: boolean;
  direction?: 'rtl' | 'ltr';
  onRowClick?: OnRowClick;
  onRowDoubleClick?: OnRowClick;
  // eslint-disable-next-line no-unused-vars
  onRenderRow?(item: TreeData, title: JSXElement, subTitle?: JSXElement): JSXElement[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Imap = { [key: string]: string | true | number | object };
interface TreeSingleBaseProps extends TreeBaseProp {
  value?: string;
  multiple?: false;
  // eslint-disable-next-line no-unused-vars
  onChange?(key?: string): void;
}
interface TreeMultipleBaseProps extends TreeBaseProp {
  value?: string[];
  multiple: true;
  // eslint-disable-next-line no-unused-vars
  onChange?(key?: string[]): void;
}
interface TreeSingleProps extends TreeSingleBaseProps {
  fromSchema?: false;
  data: TreeData[];
}
interface TreeSingleSchemaProps extends TreeSingleBaseProps {
  fromSchema: true;
  data: Imap;
}
interface TreeSingleStringProps extends TreeSingleBaseProps {
  fromSchema?: false;
  data: string;
}
interface TreeMultipleProps extends TreeMultipleBaseProps {
  fromSchema?: false;
  data: TreeData[];
}
interface TreeMultipleSchemaProps extends TreeMultipleBaseProps {
  fromSchema: true;
  data: Imap;
}
interface TreeMultipleStringProps extends TreeMultipleBaseProps {
  fromSchema?: false;
  data: string;
}
export type TreeProps =
  | TreeSingleProps
  | TreeMultipleProps
  | TreeMultipleSchemaProps
  | TreeSingleSchemaProps
  | TreeMultipleStringProps
  | TreeSingleStringProps;

function Tree(props: TreeProps) {
  let el: HTMLUListElement | undefined;
  const [lines, setLines] = createSignal<string[]>([]);
  const [treeData, setTreeData] = createSignal<TreeData[]>([]);
  const rtl = createMemo(() => props.direction === 'rtl');
  const current = createMemo(() =>
    props.value ? (Array.isArray(props.value) ? props.value : [props.value]) : []
  );

  function handleChange(key: string) {
    if (!props.readonly && isFunction(props.onChange)) {
      let _current = [...current()];

      if (props.multiple) {
        const idx = _current.indexOf(key);

        if (idx === -1) {
          _current.push(key);
        } else {
          _current.splice(idx, 1);
        }
      } else if (props.toggle && _current[0] === key) {
        _current = [];
      } else {
        _current = [key];
      }
      props.onChange(props.multiple ? _current : _current[0]);
    }
  }
  function handleClick(e: MouseEvent, item: TreeData) {
    handleChange(item.key);
    props.onRowClick?.(e, item.key as never, item as TreeData<never>);
  }
  function renderItem(item: TreeData, title: JSXElement, subTitle?: JSXElement): JSXElement[] {
    const row = props.onRenderRow?.(item, title, subTitle) || [title, subTitle];

    return rtl() ? row.reverse() : row;
  }

  function renderTreeRow(list: TreeData[], depth = 0): JSXElement {
    return (
      <For each={list}>
        {(item) => {
          const { name, title, subTitle, key, children } = item;
          const _title = name === title || !name ? [title] : [name, title];

          return (
            <>
              <li
                class={cx(
                  'row',
                  current().includes(key) && 'active',
                  (props.readonly || !isFunction(props.onChange)) && 'non'
                )}
                onClick={(e) => handleClick(e, item)}
                onDblClick={(e) => props.onRowDoubleClick?.(e, key, item)}
                style={depth ? { '--depth': `${depth * 2}em` } : undefined}
                data-path-end={item[pathEnd]}
                data-path={item[path]}
              >
                <slot name={key}>
                  {renderItem(
                    item,
                    <span class="title">{(rtl() ? _title.reverse() : _title).join(': ')}</span>,
                    subTitle && <span class="sub-title">{subTitle}</span>
                  )}
                </slot>
              </li>
              {children ? renderTreeRow(children, depth + 1) : null}
            </>
          );
        }}
      </For>
    );
  }
  function updateLine(list: string[]) {
    const len = list.length;

    if (el && len) {
      const prefixSize = sizeCnt[props.size || 'normal'];

      for (let i = 0; i < len; i++) {
        const al: NodeListOf<HTMLLIElement> = el.querySelectorAll(`li[data-path="${list[i]}"]`);

        if (al.length) {
          const rect1 = al[0].getBoundingClientRect();
          let sideLen = rect1.height / 2 + prefixSize;

          if (al.length > 1) {
            const { bottom, height, top } = al[1].getBoundingClientRect();

            sideLen = i === 0 ? top - rect1.top : bottom - rect1.top - height / 2 + prefixSize;
            al[1].style.setProperty('--c', 'none');
          } else if (i === 0) {
            al[0].style.setProperty('--c', 'none');
          }
          if (al.length !== 1 || i !== 0) {
            al[0].style.setProperty('--line', `${Math.abs(sideLen)}px`);
          }
        }
      }
    }
  }
  createEffect(() => {
    const data = props.data;

    const _data = cloneDeep(
      typeof data === 'string' ? parseTree(data) : props.fromSchema ? schema(data) : data
    ) as TreeData[];

    setLines([...new Set(countLineLen(_data))]);
    setTreeData(_data);
  });

  createEffect(() => {
    updateLine(lines());
  });
  onMount(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      updateLine(lines());
    }, 0);

    window.addEventListener('resize', updateLine.bind(null, lines()), passiveSupported);
  });
  onCleanup(() => {
    window.removeEventListener('resize', updateLine.bind(null, lines()), passiveSupported);
  });

  return (
    <>
      <style>
        {baseStyle()}
        {style}
      </style>
      <ul ref={el} class={cx('tree', props.size, props.class, rtl() && 'rtl')}>
        {renderTreeRow(treeData())}
      </ul>
    </>
  );
}

// eslint-disable-next-line no-unused-vars
type TreeChange = (e: CustomEvent<string>) => void;
// eslint-disable-next-line no-unused-vars
type TreeMultipleChange = (e: CustomEvent<string[]>) => void;
export interface TreeSingleElement extends Omit<TreeSingleProps, 'onChange'> {
  ref?: TreeSingleElement | { current: TreeSingleElement | null };
  onChange?: TreeChange;
}

export interface TreeSingleSchemaElement extends Omit<TreeSingleSchemaProps, 'onChange'> {
  ref?: TreeSingleSchemaElement | { current: TreeSingleSchemaElement | null };
  onChange?: TreeChange;
}
export interface TreeSingleStringElement extends Omit<TreeSingleStringProps, 'onChange'> {
  ref?: TreeSingleStringElement | { current: TreeSingleStringElement | null };
  onChange?: TreeChange;
}

export interface TreeMultipleElement extends Omit<TreeMultipleProps, 'onChange'> {
  ref?: TreeMultipleElement | { current: TreeMultipleElement | null };
  onChange?: TreeMultipleChange;
}

export interface TreeMultipleSchemaElement extends Omit<TreeMultipleSchemaProps, 'onChange'> {
  ref?: TreeMultipleSchemaElement | { current: TreeMultipleSchemaElement | null };
  onChange?: TreeMultipleChange;
}
export interface TreeMultipleStringElement extends Omit<TreeMultipleStringProps, 'onChange'> {
  ref?: TreeMultipleStringElement | { current: TreeMultipleStringElement | null };
  onChange?: TreeMultipleChange;
}

interface CustomElementTags {
  'n-tree': TreeSingleElement | TreeMultipleElement;
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

customElement(
  'n-tree',
  {
    fromSchema: undefined,
    size: undefined,
    data: undefined,
    multiple: undefined,
    value: undefined,
    onChange: undefined,
    class: undefined,
    css: undefined,
    readonly: undefined,
    toggle: undefined,
    direction: undefined,
    onRowClick: undefined,
    onRowDoubleClick: undefined,
    onRenderRow: undefined,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        data: el.data || [],
        value: el.value,
        multiple: el.multiple,
        fromSchema: el.fromSchema,
        size: el.size,
        class: el.class,
        css: el.css,
        readonly: el.readonly,
        toggle: el.toggle,
        direction: el.direction,
        onChange(key: string) {
          el.dispatchEvent(
            new CustomEvent('change', {
              detail: key,
            })
          );
        },
        onRowClick(e: MouseEvent, key: string, item: TreeData) {
          el.dispatchEvent(
            new CustomEvent('rowclick', {
              detail: [e, key, item],
            })
          );
        },
        onRowDoubleClick(e: MouseEvent, key: string, item: TreeData) {
          el.dispatchEvent(
            new CustomEvent('rowdoubleclick', {
              detail: [e, key, item],
            })
          );
        },
        onRenderRow(item: TreeData, title: JSXElement, subTitle?: JSXElement) {
          el.dispatchEvent(
            new CustomEvent('rowdoubleclick', {
              detail: [item, title, subTitle],
            })
          );
          return [title, subTitle];
        },
      },
      _
    );

    return createComponent(Tree, props);
  }
);
export default Tree;
