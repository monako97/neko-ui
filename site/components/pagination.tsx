import { For, Show, batch, createEffect, createSignal } from 'solid-js';
import { css } from '@moneko/css';
import { A, getPathName, useLocation } from '@moneko/solid';
import { customElement } from 'solid-element';
import { type MyPkg, all, kv } from './sider';

const style = css`
  .site-pagination {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    max-inline-size: 1280px;
    margin: auto;

    .link {
      display: flex;
      border-radius: var(--border-radius);
      padding: 8px 16px;
      font-size: var(--font-size);
      text-decoration: unset;
      color: var(--text-color);
      flex: 1;
      background-color: var(--component-bg);
      box-shadow: 0 1px 8px 0 var(--primary-shadow);
      gap: 8px;

      > div {
        flex: 1;
      }
    }

    .btn {
      flex: 1;
      display: flex;
      max-inline-size: 350px;

      &:first-child .link::before,
      &:last-child .link::after {
        content: '︿';
        display: inline-block;
        opacity: 0.67;
      }

      &:last-child {
        .link {
          text-align: end;

          &::after {
            transform: rotate(90deg) scaleX(1.2);
          }
        }
      }

      &:first-child .link::before {
        transform: rotate(-90deg) scaleX(1.2);
      }
    }

    p {
      margin: 0;
    }

    .secondary {
      font-size: var(--font-size-sm);
      color: var(--secondary-color);
      opacity: 0.67;
    }
  }
`;

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
    <>
      <style>{style}</style>
      <section class="site-pagination">
        <For each={[prev, next]}>
          {(item) => {
            return (
              <div class="btn">
                <Show when={item()}>
                  <A class="link" href={`/${item()?.key}`}>
                    <div>
                      <strong>{item()?.title}</strong>
                      <p class="secondary">{item()?.subtitle}</p>
                    </div>
                  </A>
                </Show>
              </div>
            );
          }}
        </For>
      </section>
    </>
  );
}

customElement('site-pagination', Pagination);
