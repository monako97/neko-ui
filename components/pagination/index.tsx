import {
  batch,
  createEffect,
  createMemo,
  createSignal,
  For,
  mergeProps,
  Show,
  splitProps,
  untrack,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { css } from '@moneko/css';
import { customElement } from 'solid-element';

import type { BasicConfig, CustomElement } from '..';
import { clearAttribute, type JSXElement } from '../basic-config';
import Button from '../button';
import theme, { block } from '../theme';
import Typography from '../typography';

import { styles } from './styles';

function Pagination(_: PaginationProps) {
  const { baseStyle } = theme;
  const maxCount = 5;
  const [local, other] = splitProps(_, ['page', 'pageSize', 'total', 'css', 'totalText']);
  const [page, setPage] = createSignal(1);
  const [pageSize, setPageSize] = createSignal(20);
  const [total, setTotal] = createSignal(0);

  createEffect(() => {
    batch(() => {
      if (typeof local.page === 'number' && local.page !== untrack(page)) {
        setPage(local.page);
      }
      if (typeof local.pageSize === 'number' && local.pageSize !== untrack(pageSize)) {
        setPageSize(local.pageSize);
      }
      if (typeof local.total === 'number' && local.total !== untrack(total)) {
        setTotal(local.total);
      }
    });
  });
  const totalPages = createMemo(() => Math.ceil(total() / pageSize()));
  const pages = createMemo(() => {
    const totals = totalPages();
    const arr: (number | 'p' | 'n')[] = [];

    if (totals <= maxCount) {
      for (let i = 1; i <= totals; i++) {
        arr.push(i);
      }
    } else {
      const right = Math.min(totals, Math.max(1, page() - Math.floor(maxCount / 2)) + maxCount - 1);

      for (let i = right - maxCount + 1; i <= right; i++) {
        arr.push(i);
      }
    }

    if (arr.length) {
      let last = arr[arr.length - 1] as number;
      const fast = arr[0] as number;

      if (fast >= 2) {
        if (fast === 2) {
          arr.splice(0, 1, 'p');
        } else {
          arr.unshift('p');
        }
        arr.unshift(1);
        if (last < totals) {
          last += 1;
          arr.push(last);
        }
      }
      if (last === totals - 1) {
        arr.splice(arr.length - 1, 1, 'n');
        arr.push(totals);
      } else if (last < totals - 1) {
        arr.push('n');
        arr.push(totals);
      }
    }
    return arr;
  });

  function changePage(curr: number | 'p' | 'n') {
    const p = untrack(page);
    let next = curr === 'n' ? p + maxCount : curr === 'p' ? p - maxCount : curr;

    if (next < 1) {
      next = 1;
    } else if (next > untrack(totalPages)) {
      next = untrack(totalPages);
    }
    if (p !== next) {
      if (local.page === void 0) {
        setPage(next);
      }
      other.onChange?.(next, untrack(pageSize));
    }
  }
  const TotalText = () => {
    const ranges = createMemo(() => [(page() - 1) * pageSize() + 1, page() * pageSize()]);

    return (
      <Show when={local.totalText !== false}>
        <li>
          {isFunction(local.totalText) ? (
            local.totalText(total(), ranges())
          ) : (
            <li>
              <slot name="total-text">
                <n-typography>共 {total()} 项</n-typography>
              </slot>
            </li>
          )}
        </li>
      </Show>
    );
  };

  return (
    <Show when={pages().length}>
      <style textContent={baseStyle()} />
      <style textContent={styles} />
      <Show when={local.css}>
        <style textContent={css(local.css)} />
      </Show>
      <nav aria-label="pagination" class="pagination">
        <ul>
          <TotalText />
          <li>
            <n-button
              class="pagination-item pagination-prev"
              size={other.size}
              flat={true}
              circle={true}
              disabled={page() === 1}
              onClick={() => {
                changePage(untrack(page) - 1);
              }}
            >
              〈
            </n-button>
          </li>
          <For each={pages()}>
            {(curr) => {
              const isCurrent = createMemo(() => curr === page());

              return (
                <li>
                  <n-button
                    class="pagination-item"
                    classList={{
                      [`pagination-${curr}`]: typeof curr !== 'number',
                    }}
                    size={other.size}
                    flat={!isCurrent()}
                    circle={typeof curr !== 'number'}
                    type={isCurrent() ? 'primary' : 'default'}
                    fill={isCurrent()}
                    aria-current={isCurrent() && 'page'}
                    onClick={() => {
                      changePage(curr);
                    }}
                  >
                    {curr}
                  </n-button>
                </li>
              );
            }}
          </For>
          <li>
            <n-button
              class="pagination-item pagination-next"
              size={other.size}
              flat={true}
              circle={true}
              disabled={page() === totalPages()}
              onClick={() => {
                changePage(untrack(page) + 1);
              }}
            >
              〉
            </n-button>
          </li>
        </ul>
      </nav>
    </Show>
  );
}

/** API */
export interface PaginationProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义类名 */
  css?: string;
  /** 当前页数
   * @default 1
   */
  page?: number;
  /** 每页显示的数据条目数量
   * @default 20
   */
  pageSize?: number;
  /** 总数
   * @default 0
   */
  total?: number;
  /** 尺寸
   * @default 'normal'
   */
  size?: BasicConfig['size'];
  /** 用于显示数据总量和当前数据顺序;
   * 支持直接赋值给 'totalText' 属性
   * 或者通过[slot="total-text"]插槽
   * @default true
   */
  totalText?: ((total: number, range: [start: number, end: number]) => JSXElement) | false;
  /** 值修改时的回调方法 */
  onChange?(page: number, pageSize: number): void;
  children?: JSXElement;
}
export type PaginationElement = CustomElement<PaginationProps>;

Pagination.registry = () => {
  Button.registry();
  Typography.registry();
  customElement<PaginationProps>(
    'n-pagination',
    {
      class: void 0,
      css: void 0,
      page: void 0,
      pageSize: void 0,
      total: 0,
      size: void 0,
      onChange: void 0,
      totalText: void 0,
    },
    (_, opt) => {
      const el = opt.element;
      const props = mergeProps(
        {
          css: el.css,
          onChange(page: number, pageSize: number) {
            el.dispatchEvent(
              new CustomEvent('change', {
                detail: [page, pageSize],
              }),
            );
          },
        },
        _,
        {
          totalText: (!!el.querySelector("[slot='total-text']") as false) || _.totalText,
        },
      );

      createEffect(() => {
        clearAttribute(el, ['css']);
      });
      return (
        <>
          <style textContent={block} />
          <Pagination {...props} />
        </>
      );
    },
  );
};

export default Pagination;
