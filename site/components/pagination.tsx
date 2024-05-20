import './pagination.global.less';
import { For, Show, batch, createEffect, createSignal } from 'solid-js';
import { A, getPathName, useLocation } from '@moneko/solid';
import { type MyPkg, all, kv } from './sider';

function Pagination() {
  const location = useLocation();
  const [prev, setPrev] = createSignal<MyPkg>();
  const [next, setNext] = createSignal<MyPkg>();

  createEffect(() => {
    batch(() => {
      const active = getPathName(location);
      const current = all.findIndex((e) => active === e.key);
      const _prev = all[current - 1]?.key;
      const _next = all[current + 1]?.key;

      setPrev(kv[_prev as string]);
      setNext(kv[_next as string]);
    });
  });

  return (
    <section class="site-pagination">
      <For each={[prev, next]}>
        {(item) => {
          return (
            <div class="site-pagination-btn">
              <Show when={item()}>
                <A class="site-pagination-link" href={`/${item()?.key}`}>
                  <div>
                    <strong>{item()?.title}</strong>
                    <p class="site-pagination-secondary">{item()?.subtitle}</p>
                  </div>
                </A>
              </Show>
            </div>
          );
        }}
      </For>
    </section>
  );
}

export default Pagination;
