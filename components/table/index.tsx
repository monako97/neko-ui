import {
  batch,
  createEffect,
  createMemo,
  createSignal,
  For,
  JSX,
  mergeProps,
  Show,
  splitProps,
  untrack,
} from 'solid-js';
import { isFunction, isObject, isString, isUndefined } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { BasicConfig, CustomElement, PaginationProps } from '..';
import { clearAttribute, type JSXElement } from '../basic-config';
import Pagination from '../pagination';
import theme, { block } from '../theme';

import { styles } from './styles';

type Col = Column<Record<string, Any>>;
const defaultPagination = { page: 1, pageSize: 20, total: 0, totalText: void 0, size: void 0 };

function Table(_: TableProps) {
  const { baseStyle } = theme;
  const [local, other] = splitProps(_, [
    'class',
    'css',
    'loading',
    'summary',
    'summaryText',
    'columns',
    'data',
    'emptyVal',
    'title',
    'align',
    'char',
    'charoff',
    'valign',
    'pagination',
    'size',
  ]);
  const [layout] = splitProps(local, ['align', 'char', 'charoff', 'valign']);
  const [hasOrder, setHasOrder] = createSignal(false);
  const [page, setPage] = createSignal(1);
  const [pageSize, setPageSize] = createSignal(20);
  const [total, setTotal] = createSignal(0);

  createEffect(() => {
    batch(() => {
      if (local.pagination) {
        setPage(local.pagination.page || 1);
        setPageSize(local.pagination.pageSize || 20);
        setTotal(local.pagination.total || 0);
      }
    });
  });

  function getLayout(col: Col): JSX.ThHTMLAttributes<HTMLTableCellElement> {
    return {
      width: col.width,
      align: col.align,
      valign: col.valign,
      char: col.char,
      charoff: col.charoff,
      colspan: col.colspan,
      rowspan: col.rowspan,
    };
  }
  function sum(arr: Required<TableProps>['data'], key: string) {
    return arr.reduce(function (prev, curr) {
      const next = curr[key];

      if (isString(next) || isUndefined(next) || next === null) {
        return prev;
      }
      return prev + curr[key];
    }, 0);
  }
  const pagination = createMemo(() => Object.assign(defaultPagination, local.pagination));
  const columns = createMemo(() => {
    const cols: Required<Col>[] = [];
    let _hasOrder = false;

    for (const key in local.columns) {
      if (Object.prototype.hasOwnProperty.call(local.columns, key)) {
        const col = local.columns[key];
        const _col: Col = Object.assign(
          { key, originKey: key, label: col.toString() },
          isObject(col) && {
            label: (col.type === 'order' && '序号') || key,
            ...col,
          },
        );

        if (_col.type === 'order') {
          _hasOrder = true;
          _col.render = function (_val: unknown, _row: unknown, i: number) {
            return <span>{(page() - 1) * pageSize() + i + 1}</span>;
          };
        }
        cols.push(_col as Required<Col>);
      }
    }
    if (untrack(hasOrder) !== _hasOrder) {
      setHasOrder(_hasOrder);
    }
    return cols;
  });

  function handlePageChange(e: CustomEvent<[page: number, pageSize: number]>) {
    if (local.pagination) {
      setPage(e.detail[0]);
      setPageSize(e.detail[1]);
      local.pagination.onChange?.(...e.detail);
    }
  }

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={styles} />
      <Show when={local.css}>
        <style textContent={css(local.css)} />
      </Show>
      <table {...other} class={cx('table', local.size)} part="table">
        <Show when={local.title}>
          <caption class="table-title">
            <slot name="title">{local.title}</slot>
          </caption>
        </Show>
        <thead {...layout} class="table-head">
          <tr>
            <For each={columns()}>
              {(col) => {
                const _layout = getLayout(col);

                return (
                  <th {..._layout} class="table-cell">
                    {col.label}
                  </th>
                );
              }}
            </For>
          </tr>
        </thead>
        <tbody {...layout} class="table-body">
          <For each={local.data}>
            {(row, i) => {
              return (
                <tr>
                  <For each={columns()}>
                    {(col) => {
                      const _layout = getLayout(col);
                      const Row = createMemo(() => {
                        if (col.type === 'order') {
                          const _pagination = pagination();

                          return (_pagination.page - 1) * _pagination.pageSize + i() + 1;
                        }
                        const val = row[col.key];
                        const isEmpty = isUndefined(val) || val === null;

                        if (isEmpty) {
                          return <span class="empty-val">{local.emptyVal}</span>;
                        }
                        return val;
                      });

                      return (
                        <td {..._layout} class="table-cell">
                          <Show when={isFunction(col.render)} fallback={<Row />}>
                            {col.render(row[col.key], row, i())}
                          </Show>
                        </td>
                      );
                    }}
                  </For>
                </tr>
              );
            }}
          </For>
        </tbody>
        <Show when={local.summary?.length}>
          <tfoot class="table-foot" {...layout}>
            <tr>
              <Show when={hasOrder()}>
                <th class="table-cell" {...getLayout(columns()[0])}>
                  {local.summaryText}
                </th>
              </Show>
              <For each={columns().filter((c) => !c.type || !['order'].includes(c.type))}>
                {(col) => {
                  const _layout = getLayout(col);
                  const val = createMemo(() => {
                    if (local.data?.length && local.summary?.includes(col.originKey)) {
                      return sum(local.data, col.key);
                    }
                    return null;
                  });

                  return (
                    <td {..._layout} class="table-cell">
                      {val()}
                    </td>
                  );
                }}
              </For>
            </tr>
          </tfoot>
        </Show>
      </table>
      <Show when={local.pagination}>
        <n-pagination
          class="table-pagination"
          page={page()}
          page-size={pageSize()}
          total={total()}
          total-text={pagination().totalText}
          size={pagination().size || local.size}
          onChange={handlePageChange}
        />
      </Show>
    </>
  );
}

/** API
 * @since 2.1.0
 */
export interface TableProps<T extends Record<string, Any> = Record<string, Any>> extends Cell {
  /** 自定义类名 */
  class?: string;
  /** 自定义类名 */
  css?: string;
  /** 加载中 */
  loading?: boolean;
  /** 单元格值为 null 或 undefined 时的回填
   * @default '-'
   */
  emptyVal?: string;
  /** 栏配置 */
  columns?: Record<string, Column<T> | string>;
  /** 数据源 */
  data?: T[];
  /** 表格标题, 支持直接赋值给 'title' 属性, 或者通过[slot="title"]插槽 */
  title?: JSXElement | 'slot';
  /** 汇总行 */
  summary?: (keyof T)[];
  /** 汇总行描述
   * @default '合计'
   */
  summaryText?: JSXElement;
  /** 分页器
   * @default false
   */
  pagination?: PaginationProps | false;
  /** 尺寸
   * @default 'normal'
   */
  size?: BasicConfig['size'];
  children?: JSXElement;
}
/** 栏 */
interface Column<T extends Record<string, Any>> extends Cell {
  /** 自定义取值的 key */
  key?: keyof T;
  /** 原始 key */
  originKey?: keyof T;
  /** 单元格表头标题 */
  label?: JSXElement;
  /** 自定义渲染单元格 */
  render?(item: T[keyof T], row: T, index: number): JSXElement;
  /** 单元格横跨的列数 */
  colspan?: number;
  /** 单元格横跨的行数 */
  rowspan?: number;
  /** 设置为 'order' 时则当作序号行 */
  type?: 'order';
  /** 单元格宽 */
  width?: number;
}

/** 单元格布局排列 */
interface Cell {
  /** 单元格内容的水平对齐方式
   * @default 'left'
   */
  align?: keyof typeof Align;
  /** 规定根据哪个字符来进行文本对齐 */
  char?: string;
  /** 规定第一个对齐字符的偏移量 */
  charoff?: string;
  /** 单元格内容的垂直对齐方式
   * @default 'middle'
   */
  valign?: keyof typeof Valign;
}
/** 水平对齐方式 */
enum Align {
  /** 左对齐 */
  left = 'left',
  /** 右对齐 */
  right = 'right',
  /** 居中对齐 */
  center = 'center',
  /** 对行进行伸展，这样每行都可以有相等的长度 */
  justify = 'justify',
  /** 将内容对准指定字符 */
  char = 'char',
}
/** 垂直对齐方式 */
enum Valign {
  /** 上对齐 */
  top = 'top',
  /** 居中对齐 */
  middle = 'middle',
  /** 下对齐 */
  bottom = 'bottom',
  /** 与基线对齐 */
  baseline = 'baseline',
}
export type TableElement = CustomElement<TableProps>;

Table.registry = () => {
  Pagination.registry();
  customElement<TableProps>(
    'n-table',
    {
      class: void 0,
      css: void 0,
      loading: false,
      columns: {},
      data: [],
      emptyVal: '-',
      title: void 0,
      char: void 0,
      charoff: void 0,
      align: Align.left,
      valign: Valign.middle,
      summary: void 0,
      summaryText: '合计',
      pagination: void 0,
      size: void 0,
    },
    (_, opt) => {
      const el = opt.element;
      const props = mergeProps(
        {
          css: el.css,
          columns: el.columns,
          data: el.data,
          pagination: el.pagination,
          summary: el.summary,
          summaryText: el.summaryText,
        },
        _,
        {
          title: !!el.querySelector("[slot='title']") || _.title,
        },
      );

      createEffect(() => {
        clearAttribute(el, ['css', 'columns', 'data', 'pagination', 'summary']);
      });
      return (
        <>
          <style textContent={block} />
          <Table {...props} />
        </>
      );
    },
  );
};
export default Table;
