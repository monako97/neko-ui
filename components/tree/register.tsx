import { createEffect, mergeProps } from 'solid-js';
import { customElement } from 'solid-element';
import Tree from './index';
import type { TreeData, TreeProps } from './type';

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
      el.removeAttribute('css');
      el.removeAttribute('field-names');
      el.removeAttribute('data');
    });
    return <Tree {...props} />;
  },
);
