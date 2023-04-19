import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { cloneDeep, isFunction, passiveSupported, throttle } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import schema from '../from-schema';

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

export interface TreeData<T = string> {
  key: T;
  name?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  children?: TreeData<T>[];
  [path]?: string;
  [pathEnd]?: string;
  [key: string | number | symbol]: T | string | boolean | TreeData<T>[] | undefined;
}

// type ArrayElementType<T extends unknown[] | unknown> = T extends (infer U)[] ? U : T;
type ReactMouseEvent = React.MouseEvent<HTMLLIElement, MouseEvent>;
// eslint-disable-next-line no-unused-vars
type OnRowClick = (e: ReactMouseEvent, key: string, item: TreeData) => void;
export interface TreeBaseProp {
  className?: string;
  style?: React.CSSProperties;
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

interface TreeSingleProps extends TreeBaseProp {
  fromSchema?: false;
  multiple?: false;
  data: TreeData[];
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?(key?: string): void;
}
interface TreeSingleSchemaProps extends TreeBaseProp {
  fromSchema: true;
  multiple?: false;
  data: Imap;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?(key?: string): void;
}
interface TreeMultipleProps extends TreeBaseProp {
  fromSchema?: false;
  multiple: true;
  data: TreeData[];
  value: string[];
  // eslint-disable-next-line no-unused-vars
  onChange?(key: string[]): void;
}
interface TreeMultipleSchemaProps extends TreeBaseProp {
  fromSchema: true;
  multiple: true;
  data: Imap;
  value: string[];
  // eslint-disable-next-line no-unused-vars
  onChange?(key: string[]): void;
}
export type TreeProps =
  | TreeSingleProps
  | TreeMultipleProps
  | TreeMultipleSchemaProps
  | TreeSingleSchemaProps;

const Tree: React.FC<TreeProps> = ({
  className,
  style,
  fromSchema,
  data,
  value,
  onChange,
  multiple,
  toggle,
  direction,
  readonly,
  renderRow,
  onRowClick,
  onRowDoubleClick,
}) => {
  const el = useRef<HTMLUListElement>(null);
  const store = useRef(
    sso({
      current: value ? (Array.isArray(value) ? value : [value]) : [],
      treeData: [] as TreeData[],
      lines: [] as string[],
      rtl: direction === 'rtl',
      readonly,
      toggle,
      multiple,
      setCurrent(key: string) {
        if (!store.current.readonly) {
          let _current: string[];

          if (store.current.multiple) {
            _current = [...store.current.current];
            const idx = _current.indexOf(key);

            if (idx === -1) {
              _current.push(key);
            } else {
              _current.splice(idx, 1);
            }
          } else if (store.current.toggle && store.current.current[0] === key) {
            _current = [];
          } else {
            _current = [key];
          }
          store.current.current = _current;
        }
      },
    })
  );
  const { current, treeData, rtl, lines } = store.current;
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: TreeData) => {
      store.current.setCurrent(item.key);
      onRowClick?.(e, item.key as never, item as TreeData<never>);
    },
    [onRowClick]
  );
  const renderItem = useCallback(
    (item: TreeData, title: React.ReactNode, subTitle?: React.ReactNode): React.ReactNode[] => {
      const row = renderRow?.(item, title, subTitle) || [title, subTitle];

      return rtl ? row.reverse() : row;
    },
    [renderRow, rtl]
  );
  const renderTreeRow = useCallback(
    (list: TreeData[], depth = 0) =>
      list.map((item) => {
        const { name, title, subTitle, key, children } = item;
        const _title = [...new Set([name, title])].filter(Boolean);

        return (
          <React.Fragment key={key}>
            <li
              {...{
                className: cx(cls.row, current.includes(key) && cls.active),
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
    [current, renderItem, rtl, handleClick, onRowDoubleClick]
  );
  const updateLine = throttle(
    useCallback(function () {
      const len = store.current.lines.length;

      if (el.current && len) {
        for (let i = 0; i < len; i++) {
          const al: NodeListOf<HTMLLIElement> = el.current.querySelectorAll(
            `li[data-path="${store.current.lines[i]}"]`
          );

          if (al.length) {
            const rect1 = al[0].getBoundingClientRect();
            let sideLen = rect1.height / 2 + 8;

            if (al.length > 1) {
              const { bottom, height, top } = al[1].getBoundingClientRect();

              sideLen = i === 0 ? top - rect1.top : bottom - rect1.top - height / 2 + 8;
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
    store.current.readonly = readonly;
  }, [readonly]);
  useEffect(() => {
    store.current.toggle = toggle;
  }, [toggle]);
  useEffect(() => {
    store.current.multiple = multiple;
  }, [multiple]);
  useEffect(() => {
    const __data: TreeData[] = cloneDeep(fromSchema ? schema(data) : data) as TreeData[];
    const __lines = [...new Set(countLineLen(__data))];

    store.current.lines = __lines;
    store.current.treeData = __data;
  }, [data, fromSchema]);
  useEffect(() => {
    if (isFunction(onChange)) {
      store.current.current = current;
      onChange((multiple ? current : current[0]) as never);
    }
  }, [current, multiple, onChange]);
  useEffect(() => {
    updateLine();
  }, [lines, updateLine]);

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
  const slas = useMemo(() => cx(cls.tree, className, rtl && cls.rtl), [className, rtl]);

  return (
    <ul ref={el} className={slas} style={style}>
      {renderTreeRow(treeData)}
    </ul>
  );
};

export default Tree;
