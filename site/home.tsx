import { For } from 'solid-js';
import { css } from '@moneko/css';
import Readme from '../README.md?raw';

function Home() {
  const colors = ['primary', 'warning', 'error', 'success'],
    types = ['bg', 'outline', 'border', 'color', 'hover', 'active'];

  const style = css`
    .site-colors {
      display: flex;
      overflow-x: auto;
      border-radius: var(--border-radius);
      padding: 24px;
      background-color: var(--component-bg);
      box-shadow: 0 2px 8px 0 var(--primary-shadow);
      margin-block-end: 24px;
      gap: 12px;
    }

    .site-color {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 5px;

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: var(--border-radius);
        padding: 8px 12px;
        color: #fff;
        cursor: pointer;
        transition-property: background-color;

        &,
        span {
          transition-timing-function: var(--transition-timing-function);
          transition-duration: var(--transition-duration);
        }

        span {
          color: var(--text-color);
          transition-property: opacity, color;

          &:first-of-type::before {
            content: attr(data-name);
          }

          &:last-of-type {
            font-size: var(--font-size-xs);
            opacity: 0.8;
          }
        }

        &:hover span:first-of-type {
          &::before {
            content: attr(data-val);
          }
        }
      }
    }
  `;

  return (
    <>
      <style>{style}</style>
      <n-md text={Readme} not-render={true} picture-viewer={false} />
      <div class="site-colors">
        <For each={colors} fallback={<div>No items</div>}>
          {(c: string) => {
            return (
              <div class="site-color">
                <For each={types} fallback={<div>No items</div>}>
                  {(t: string) => {
                    const v = `--${c}-${t}`;

                    return (
                      <div
                        class="site-color-item"
                        style={{
                          'background-color': `var(${v})`,
                        }}
                      >
                        <span data-val={v} data-name={t} />
                        <span>
                          {getComputedStyle(document.documentElement).getPropertyValue(v)}
                        </span>
                      </div>
                    );
                  }}
                </For>
              </div>
            );
          }}
        </For>
      </div>
    </>
  );
}

export default Home;
