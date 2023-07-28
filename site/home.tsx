import { For } from 'solid-js';
import { css } from '@moneko/css';
import { baseStyle } from 'neko-ui';
import log from '../CHANGELOG.md?raw';
import Readme from '../README.md?raw';

function Home() {
  const colors = ['primary', 'warning', 'error', 'success'],
    types = ['bg', 'outline', 'border', 'color', 'hover', 'active'];

  const style = css`
    .site-empty {
      border-radius: var(--border-radius);
      padding: 24px;
      background-color: var(--component-bg);
      box-shadow: 0 2px 8px 0 var(--primary-shadow);
      margin-block-end: 24px;

      &-colors {
        display: flex;
        gap: 12px;
      }

      &-color {
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
    }
  `;

  return (
    <>
      <style>
        {baseStyle()}
        {style}
      </style>
      <n-md text={Readme} />
      <div class="site-empty">
        <div class="site-empty-colors">
          <For each={colors} fallback={<div>No items</div>}>
            {(c: string) => {
              return (
                <div class="site-empty-color">
                  <For each={types} fallback={<div>No items</div>}>
                    {(t: string) => {
                      const v = `--${c}-${t}`;

                      return (
                        <div
                          class="site-empty-color-item"
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
      </div>
      <n-md text={`# Change log\n${log}`} />
    </>
  );
}

export default Home;
