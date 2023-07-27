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
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import schema, { type Schema } from '../from-schema';
import { baseStyle } from '../theme';
import type { BasicConfig, CustomElement } from '../index';

export interface TreeBaseProp {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 尺寸
   * @default 'normal'
   */
  size?: BasicConfig['size'];
  /** 只读 */
  readonly?: boolean;
  /** 开启取消选中, 仅多选模式生效 */
  toggle?: boolean;
  /** 方向
   * @default 'ltr'
   */
  direction?: 'rtl' | 'ltr';
  /** 点击行时的回调函数 */
  onRowClick?: (e: MouseEvent, key: string, item: TreeData) => void;
  /** 双击行时的回调函数 */
  onRowDoubleClick?: (e: MouseEvent, key: string, item: TreeData) => void;
  /** 自定义渲染行 */
  renderRow?: (item: TreeData, title: JSXElement, subTitle?: JSXElement) => JSXElement[];
  /** 开启此选项支持 `JSONSchema`
   * @default false
   */
  fromSchema?: false;
}

interface TreeBaseProps extends TreeBaseProp {
  /** 选中的值, 多选模式时为数组 */
  value?: string;
  /** 多选模式
   * @default false
   */
  multiple?: false;
  /** 选中的值发生修改时的回调函数, 多选模式时入参为数组 */
  // eslint-disable-next-line no-unused-vars
  onChange?(key?: string): void;
}
interface TreeMultipleBaseProps extends TreeBaseProp {
  /** 选中的值 */
  value?: string[];
  /** 多选模式
   * @default true
   */
  multiple: true;
  // eslint-disable-next-line no-unused-vars
  onChange?(key?: string[]): void;
}
export interface TreeProps extends TreeBaseProps {
  /** 数据源 */
  data: TreeData[];
}
export interface TreeSchemaProps extends Omit<TreeBaseProps, 'fromSchema'> {
  /** 开启此选项支持 `JSONSchema` */
  fromSchema: true;
  /** 数据源 */
  data: Schema;
}
export interface TreeStringProps extends TreeBaseProps {
  /** 数据源 */
  data: string;
}
export interface TreeMultipleProps extends TreeMultipleBaseProps {
  /** 数据源 */
  data: TreeData[];
}
export interface TreeMultipleSchemaProps extends Omit<TreeMultipleBaseProps, 'fromSchema'> {
  /** 开启此选项支持 `JSONSchema` */
  fromSchema: true;
  /** 数据源 */
  data: Schema;
}
export interface TreeMultipleStringProps extends TreeMultipleBaseProps {
  /** 数据源 */
  data: string;
}

function Tree(
  props:
    | TreeProps
    | TreeMultipleProps
    | TreeMultipleSchemaProps
    | TreeSchemaProps
    | TreeMultipleStringProps
    | TreeStringProps,
) {
  const sizeCnt = {
    small: 6,
    normal: 8,
    large: 10,
  };

  let el: HTMLUListElement | undefined;
  const [lines, setLines] = createSignal<string[]>([]);
  const [treeData, setTreeData] = createSignal<TreeData[]>([]);
  const rtl = createMemo(() => props.direction === 'rtl');
  const current = createMemo(() => {
    if (props.value !== void 0 && props.value !== null) {
      return Array.isArray(props.value) ? props.value : [props.value];
    }
    return [];
  });

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

  function parseTree(str: string): TreeData[] {
    const depthRegex = /[^\s|`│├└]/;
    const rows = str.trim().split('\n');
    const stack: TreeStack[] = [{ title: rows[0], key: rows[0] }];

    for (let i = 1; i < rows.length; i++) {
      const depth = rows[i].search(depthRegex);

      if (depth === -1) {
        continue;
      }
      const node: Partial<TreeData> = {
        title: rows[i].slice(depth + 3),
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
    const row = props.renderRow?.(item, title, subTitle) || [title, subTitle];

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
                  (props.readonly || !isFunction(props.onChange)) && 'non',
                )}
                onClick={(e) => handleClick(e, item)}
                onDblClick={(e) => props.onRowDoubleClick?.(e, key, item)}
                style={depth ? { '--depth': `${depth * 2}em` } : void 0}
                data-path-end={item[pathEnd]}
                data-path={item[path]}
              >
                {renderItem(
                  item,
                  <span class="title">{(rtl() ? _title.reverse() : _title).join(': ')}</span>,
                  subTitle && <span class="sub-title">{subTitle}</span>,
                )}
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
      typeof data === 'string' ? parseTree(data) : props.fromSchema ? schema(data as Schema) : data,
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

export type TreeElement = CustomElement<TreeProps>;
export type TreeSchemaElement = CustomElement<TreeSchemaProps>;
export type TreeStringElement = CustomElement<TreeStringProps>;
export type TreeMultipleElement = CustomElement<TreeMultipleProps>;
export type TreeMultipleSchemaElement = CustomElement<TreeMultipleSchemaProps>;
export type TreeMultipleStringElement = CustomElement<TreeMultipleStringProps>;

interface TreeStack extends TreeData {
  /** 深度 */
  depth?: number;
}

export interface TreeData<T = string> {
  /** key(唯一值) */
  key: T;
  /** 属性 */
  name?: string;
  /** 标题 */
  title?: string;
  /** 副标题 */
  subTitle?: string;
  /** 详细描述 */
  description?: string;
  /** 子项 */
  children?: TreeData<T>[];
  [key: string | number | symbol]:
    | T
    | string
    | number
    | symbol
    | boolean
    | TreeData<T>[]
    | undefined;
}

customElement(
  'n-tree',
  {
    fromSchema: void 0,
    size: void 0,
    data: void 0,
    multiple: void 0,
    value: void 0,
    onChange: void 0,
    class: void 0,
    css: void 0,
    readonly: void 0,
    toggle: void 0,
    direction: void 0,
    onRowClick: void 0,
    onRowDoubleClick: void 0,
    renderRow: void 0,
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
            }),
          );
        },
        onRowClick(e: MouseEvent, key: string, item: TreeData) {
          el.dispatchEvent(
            new CustomEvent('rowclick', {
              detail: [e, key, item],
            }),
          );
        },
        onRowDoubleClick(e: MouseEvent, key: string, item: TreeData) {
          el.dispatchEvent(
            new CustomEvent('rowdoubleclick', {
              detail: [e, key, item],
            }),
          );
        },
      },
      _,
    );

    return createComponent(Tree, props);
  },
);
export default Tree;
