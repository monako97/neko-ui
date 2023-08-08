import { createComponent, createEffect, mergeProps, splitProps } from 'solid-js';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';

function Table(_: TableProps) {
  const [local, other] = splitProps(_, ['class', 'css']);

  return (
    <table {...other} class={cx('table', local.class)}>
      <thead>
        <tr>
          <th>Items</th>
          <th scope="col">Expenditure</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Donuts</th>
          <td>3,000</td>
        </tr>
        <tr>
          <th scope="row">Stationery</th>
          <td>18,000</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Totals</th>
          <td>21,000</td>
        </tr>
      </tfoot>
    </table>
  );
}

/** API
 * @since 2.1.0
 */
export interface TableProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义类名 */
  css?: string;
  /** 加载中 */
  loading?: boolean;
}
export type TableElement = CustomElement<TableProps>;

customElement(
  'n-table',
  {
    class: void 0,
    css: void 0,
    loading: false,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        class: el.class,
        css: el.css,
        loading: el.loading,
      },
      _,
    );

    createEffect(() => {
      el.removeAttribute('css');
    });
    return createComponent(Table, props);
  },
);
export default Table;
