import { For, createEffect, createMemo, createSignal } from 'solid-js';
import { frameCallback, isFunction, isString } from '@moneko/common';
import { css, cx } from '@moneko/css';
import './register';
import { style } from './style';
import schema from '../from-schema';
import theme from '../theme';
import type {
  TreeData,
  TreeMultipleProps,
  TreeMultipleSchemaProps,
  TreeMultipleStringProps,
  TreeProps,
  TreeSchemaProps,
  TreeStack,
  TreeStringProps,
} from './type';

function Tree(
  _:
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
  const { baseStyle } = theme;
  let el: HTMLUListElement | undefined;
  const [lines, setLines] = createSignal<string[]>([]);
  const [treeData, setTreeData] = createSignal<TreeData[]>([]);
  const rtl = createMemo(() => _.direction === 'rtl');
  const current = createMemo(() => {
    if (_.value !== void 0 && _.value !== null) {
      return Array.isArray(_.value) ? _.value : [_.value];
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

  function handleChange(key: string, item: TreeData) {
    if (!_.readonly && isFunction(_.onChange)) {
      let _current = [...current()];

      if (_.multiple) {
        const idx = _current.indexOf(key);

        if (idx === -1) {
          _current.push(key);
        } else {
          _current.splice(idx, 1);
        }
      } else if (_.toggle && _current[0] === key) {
        _current = [];
      } else {
        _current = [key];
      }
      _.onChange(_.multiple ? _current : _current[0], item);
    }
  }
  function handleClick(e: MouseEvent, item: TreeData) {
    handleChange(item.key, item);
    _.onRowClick?.(e, item.key as never, item as TreeData<never>);
  }
  function renderItem(item: TreeData, title: JSX.Element, subTitle?: JSX.Element): JSX.Element[] {
    const row = _.renderRow?.(item, title, subTitle) || [title, subTitle];

    return rtl() ? row.reverse() : row;
  }

  function renderTreeRow(list: TreeData[], depth = 0): JSX.Element {
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
                  (_.readonly || !isFunction(_.onChange)) && 'non',
                )}
                onClick={(e) => handleClick(e, item)}
                onDblClick={(e) => _.onRowDoubleClick?.(e, key, item)}
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
  createEffect(() => {
    const data = _.fromSchema ? schema(_.data) : isString(_.data) ? parseTree(_.data) : _.data;

    setLines([...new Set(countLineLen(data))]);
    setTreeData(data);
  });

  createEffect(() => {
    const list = lines();
    const size = _.size || 'normal';

    frameCallback(() => {
      const len = list.length;

      if (el && len) {
        const prefixSize = sizeCnt[size];

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
    });
  });

  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {css(_.css)}
      </style>
      <ul ref={el} class={cx('tree', _.size, _.class, rtl() && 'rtl')}>
        {renderTreeRow(treeData())}
      </ul>
    </>
  );
}

export * from './type';
export default Tree;
