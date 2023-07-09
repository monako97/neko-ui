import { For, Show } from 'solid-js';
import { css } from '@moneko/css';
import { baseStyle } from 'neko-ui';
import log from '../CHANGELOG.md?raw';
import jb_beam from '@/assets/images/jb_beam.svg';
import { projectInfo } from '@/utils';

const style = css`
  .site-empty {
    border-radius: var(--border-radius);
    padding: 24px;
    min-block-size: calc(100vb - 236px);
    background-color: var(--component-bg);
    box-shadow: 0 2px 14px 0 var(--primary-shadow);
    margin-block-end: 24px;

    & > span {
      margin-inline-start: 16px;
    }

    .site-empty-top {
      display: flex;
      gap: 24px;
    }

    .site-empty-info {
      flex: 1;
    }

    &-thank {
      img {
        inline-size: 120px;
        block-size: 120px;
      }

      h2::before,
      a::after {
        content: none;
      }

      h2 {
        margin: 0;
        border: none;
      }
    }

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

function Empty() {
  const infos = [
      ['描述', projectInfo.description],
      ['版本', projectInfo.version],
      ['作者', projectInfo.author?.name],
    ],
    colors = ['primary', 'warning', 'error', 'success'],
    types = ['bg', 'outline', 'border', 'color', 'hover', 'active'];

  return (
    <>
      <style>
        {style}
        {baseStyle()}
      </style>
      <div class="site-empty">
        <div class="site-empty-top">
          <div class="site-empty-info">
            <For each={infos}>
              {(e) => (
                <Show when={typeof e[1] === 'string'}>
                  <p>
                    <strong>{e[0]}: </strong>
                    <span>{e[1]}</span>
                  </p>
                </Show>
              )}
            </For>
          </div>
          <div class="site-empty-thank">
            <h2>感谢</h2>
            <a
              href="https://www.jetbrains.com/?from=monako"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={jb_beam} />
            </a>
          </div>
        </div>
        <h4>主题色</h4>
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

export default Empty;
