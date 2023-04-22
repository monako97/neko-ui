import React, { useCallback, useEffect, useRef } from 'react';
import { cloneDeep, isFunction, passiveSupported, throttle } from '@moneko/common';
import sso from 'shared-store-object';
import { cls, sizeCnt } from './style';
import { cx } from '../emotion';
import schema from '../from-schema';
import type { ComponentSize } from '../index';

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
      item[path] = frist.key + (tree.length === 1 ? '' : '>' + last.key);
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
type ReactMouseEvent = React.MouseEvent<HTMLLIElement, MouseEvent>;
// eslint-disable-next-line no-unused-vars
type OnRowClick = (e: ReactMouseEvent, key: string, item: TreeData) => void;
export interface TreeBaseProp {
  className?: string;
  style?: React.CSSProperties;
  size?: ComponentSize;
  readonly?: boolean;
  toggle?: boolean;
  direction?: 'rtl' | 'ltr';
  onRowClick?: OnRowClick;
  onRowDoubleClick?: OnRowClick;
  // eslint-disable-next-line no-unused-vars
  renderRow?(item: TreeData, title: React.ReactNode, subTitle?: React.ReactNode): React.ReactNode[];
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

const Tree: React.FC<TreeProps> = ({
  multiple,
  readonly,
  toggle,
  value,
  direction,
  onChange,
  onRowClick,
  fromSchema,
  data,
  onRowDoubleClick,
  renderRow,
  className,
  style,
  size,
}) => {
  const el = useRef<HTMLUListElement>(null);
  const store = useRef(
    sso({
      treeData: [] as TreeData[],
      lines: [] as string[],
      current: value ? (Array.isArray(value) ? value : [value]) : [],
      rtl: direction === 'rtl',
      size,
    })
  );
  const { current, rtl, treeData, lines } = store.current;
  const handleChange = useCallback(
    (key: string) => {
      if (!readonly && isFunction(onChange)) {
        let _current = [...store.current.current];

        if (multiple) {
          const idx = _current.indexOf(key);

          if (idx === -1) {
            _current.push(key);
          } else {
            _current.splice(idx, 1);
          }
        } else if (toggle && store.current.current[0] === key) {
          _current = [];
        } else {
          _current = [key];
        }
        onChange(multiple ? _current : _current[0]);
      }
    },
    [multiple, onChange, readonly, toggle]
  );
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: TreeData) => {
      handleChange(item.key);
      onRowClick?.(e, item.key as never, item as TreeData<never>);
    },
    [onRowClick, handleChange]
  );
  const renderItem = useCallback(
    (item: TreeData, title: React.ReactNode, subTitle?: React.ReactNode): React.ReactNode[] => {
      const row = renderRow?.(item, title, subTitle) || [title, subTitle];

      return rtl ? row.reverse() : row;
    },
    [rtl, renderRow]
  );
  const renderTreeRow = useCallback(
    (list: TreeData[], depth = 0) =>
      list.map((item) => {
        const { name, title, subTitle, key, children } = item;
        const _title = name === title || !name ? [title] : [name, title];

        return (
          <React.Fragment key={key}>
            <li
              {...{
                className: cx(
                  cls.row,
                  current.includes(key) && cls.active,
                  (readonly || !isFunction(onChange)) && cls.non
                ),
                onClick: (e) => handleClick(e, item),
                onDoubleClick: (e) => onRowDoubleClick?.(e, key, item),
                // eslint-disable-next-line no-undefined
                style: depth ? ({ '--depth': `${depth * 2}em` } as React.CSSProperties) : undefined,
                'data-path-end': item[pathEnd],
                'data-path': item[path],
              }}
            >
              {renderItem(
                item,
                <span key="title" className={cls.title}>
                  {(rtl ? _title.reverse() : _title).join(': ')}
                </span>,
                subTitle && (
                  <span key="subTitle" className={cls.subTitle}>
                    {subTitle}
                  </span>
                )
              )}
            </li>
            {children ? renderTreeRow(children, depth + 1) : null}
          </React.Fragment>
        );
      }),
    [current, readonly, onChange, renderItem, rtl, handleClick, onRowDoubleClick]
  );
  const updateLine = throttle(
    useCallback(function () {
      const len = store.current.lines.length;

      if (el.current && len) {
        const prefixSize = sizeCnt[store.current.size || 'normal'];

        for (let i = 0; i < len; i++) {
          const al: NodeListOf<HTMLLIElement> = el.current.querySelectorAll(
            `li[data-path="${store.current.lines[i]}"]`
          );

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
    }, []),
    32
  );

  useEffect(() => {
    store.current.current = value ? (Array.isArray(value) ? value : [value]) : [];
  }, [value]);
  useEffect(() => {
    store.current.rtl = direction === 'rtl';
  }, [direction]);
  useEffect(() => {
    store.current.size = size;
  }, [size]);
  useEffect(() => {
    const _data = cloneDeep(
      typeof data === 'string' ? parseTree(data) : fromSchema ? schema(data) : data
    ) as TreeData[];

    store.current.lines = [...new Set(countLineLen(_data))];
    store.current.treeData = _data;
  }, [fromSchema, data]);

  useEffect(() => {
    updateLine();
  }, [size, lines, updateLine]);
  useEffect(() => {
    window.addEventListener('resize', updateLine, passiveSupported);
    return () => {
      window.removeEventListener('resize', updateLine, passiveSupported);
    };
  }, [updateLine]);
  useEffect(() => {
    const _store = store.current;

    return () => {
      _store();
    };
  }, []);

  return (
    <ul
      ref={el}
      className={cx(cls.tree, size && cls[size], className, rtl && cls.rtl)}
      style={style}
    >
      {renderTreeRow(treeData)}
    </ul>
  );
};

export default Tree;
