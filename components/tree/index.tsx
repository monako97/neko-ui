import { createEffect, createMemo, createSignal, For, mergeProps, Show } from 'solid-js';
import { frameCallback, isFunction, isString } from '@moneko/common';
import { css } from '@moneko/css';
import { customElement } from 'solid-element';

import { clearAttribute, type JSXElement } from '../basic-config';
import schema from '../from-schema';
import theme, { block } from '../theme';

import { style } from './style';
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
  const normalFieldNames = {
    key: 'key' as const,
    name: 'name' as const,
    title: 'title' as const,
    subTitle: 'subTitle' as const,
    children: 'children' as const,
    description: 'description' as const,
  };
  const fieldNames = createMemo(() => Object.assign(normalFieldNames, _.fieldNames));
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
    const fields = fieldNames();
    const key = fields.key;
    const children = fields.children;

    for (let i = 0, len = tree.length; i < len; i++) {
      const item = tree[i],
        isLast = i === lastIdx;

      delete item[path];
      delete item[pathEnd];
      if (i === 0 || isLast) {
        item[path] = frist[key] + (tree.length === 1 ? '' : `>${last[key]}`);
        if (isLast) {
          item[pathEnd] = '';
        }
        line.push(item[path]);
      }
      if (item[children]) {
        line = line.concat(countLineLen(item[children], depth + 1));
      }
    }
    return line;
  }

  function parseTree(str: string): TreeData[] {
    const fields = fieldNames();
    const key = fields.key;
    const title = fields.title;
    const children = fields.children;
    const depthRegex = /[^\s|`│├└]/;
    const rows = str.trim().split('\n');
    const stack: TreeStack[] = [{ [title]: rows[0], [key]: rows[0] }];

    for (let i = 1; i < rows.length; i++) {
      const depth = rows[i].search(depthRegex);

      if (depth === -1) {
        continue;
      }
      const node: Partial<TreeData> = {
        [title]: rows[i].slice(depth + 3),
        depth,
      };

      while (stack.length && depth <= (stack[stack.length - 1].depth || 0)) {
        stack.pop();
      }
      if (!stack.length) {
        return [];
      }
      const parent = stack[stack.length - 1];

      if (!parent[children]) {
        parent[children] = [];
      }
      node[key] = `${parent[key]}-${node[title]}-${depth}-${i}`;
      parent[children].push(node as TreeData);
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
    const fields = fieldNames();

    handleChange(item[fields.key], item);
    _.onRowClick?.(e, item[fields.key] as never, item as TreeData<never>);
  }
  function renderItem(item: TreeData, title: JSXElement, subTitle?: JSXElement): JSXElement[] {
    const row = _.renderRow?.(item, title, subTitle) || [title, subTitle];

    return rtl() ? row.reverse() : row;
  }

  function renderTreeRow(list: TreeData[], depth = 0): JSXElement {
    return (
      <For each={list}>
        {(item) => {
          const fields = fieldNames();
          const title = item[fields.title];
          const key = item[fields.key];
          const name = item[fields.name];
          const subTitle = item[fields.subTitle];
          const children = item[fields.children];
          const _title = name === title || !name ? [title] : [name, title];

          return (
            <>
              <li
                class="row"
                classList={{
                  active: current().includes(key),
                  non: _.readonly || !isFunction(_.onChange),
                }}
                on:click={(e) => {
                  handleClick(e, item);
                }}
                on:dblclick={(e) => _.onRowDoubleClick?.(e, key, item)}
                style={depth ? { '--depth': `${depth * 2}em` } : void 0}
                data-path-end={item[pathEnd]}
                data-path={item[path]}
              >
                {renderItem(
                  item,
                  <span class="title">{(rtl() ? _title.reverse() : _title).join(': ')}</span>,
                  <Show when={subTitle}>
                    <span class="sub-title">{subTitle}</span>
                  </Show>,
                )}
              </li>
              <Show when={children}>{renderTreeRow(children!, depth + 1)}</Show>
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
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <Show when={_.css}>
        <style textContent={css(_.css)} />
      </Show>
      <ul
        ref={el}
        class="tree"
        classList={{
          [_.size || 'normal']: true,
          [_.class!]: !!_.class,
          rtl: rtl(),
        }}
      >
        {renderTreeRow(treeData())}
      </ul>
    </>
  );
}

export * from './type';
Tree.registry = () => {
  customElement<TreeProps>(
    'n-tree',
    {
      fieldNames: {},
      fromSchema: void 0,
      size: void 0,
      data: [],
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
          data: el.data,
          value: el.value,
          multiple: el.multiple,
          fromSchema: el.fromSchema,
          size: el.size,
          css: el.css,
          readonly: el.readonly,
          toggle: el.toggle,
          direction: el.direction,
          onChange(key: string, item: TreeData) {
            el.dispatchEvent(
              new CustomEvent('change', {
                detail: [key, item],
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

      createEffect(() => {
        clearAttribute(el, ['css', 'fieldNames', 'data']);
      });
      return (
        <>
          <style textContent={block} />
          <Tree {...props} />
        </>
      );
    },
  );
};

export default Tree;
