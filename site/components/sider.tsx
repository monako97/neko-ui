import { For, Show, createEffect, createMemo } from 'solid-js';
import { css } from '@moneko/css';
import {
  A,
  type RouterProps,
  getPathName,
  projectBasicInfo,
  routes,
  useLocation,
} from '@moneko/solid-js';
import { ComponentOptions, baseStyle, setTheme, theme } from 'neko-ui';
import { customElement } from 'solid-element';

const style = css`
  .site-sider,
  .site-sider-group-title,
  .site-sider-item,
  .site-sider-item::before {
    transition-duration: var(--transition-duration);
  }

  .site-left {
    position: sticky;
    display: inline-block;
    inset-block-start: 0;
    overflow-y: scroll;
    max-block-size: 100vb;

    a {
      text-decoration: none;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .site-sider {
    position: sticky;
    display: flex;
    overflow-y: scroll;
    margin: 0 16px 16px;
    border-radius: var(--border-radius);
    color: var(--text-color);
    background-color: var(--component-bg, rgb(255 255 255 / 90%));
    inset-block-start: 0;
    inline-size: 240px;
    min-inline-size: 240px;
    flex: 1;
    max-block-size: calc(100vb - 32px);
    box-sizing: border-box;
    backdrop-filter: blur(16px);
    /* stylelint-disable-next-line */
    -webkit-backdrop-filter: blur(16px);
    transition-property: background-color, color;
    flex-direction: column;
    box-shadow: 0 2px 14px 0 var(--primary-shadow);
  }

  .site-sider > ul {
    position: relative;
    margin: 0;
    padding: 0 16px;
    list-style: none;
  }

  .site-sider-group {
    position: relative;

    &:last-of-type {
      margin-block-end: 16px;
    }
  }

  .site-sider-group-title {
    position: sticky;
    z-index: 10;
    overflow: hidden;
    margin: 0 0 8px;
    padding: 8px 0;
    font-size: var(--font-size);
    text-overflow: ellipsis;
    color: var(--text-heading);
    inset-block-start: 0;
    border-block-end: var(--border-base);
    backdrop-filter: blur(16px);
    /* stylelint-disable-next-line */
    -webkit-backdrop-filter: blur(16px);
    line-height: 20px;
    transition-property: background-color, color, border-color;
  }

  .site-sider-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
  }

  .site-sider-item {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    min-block-size: 45px;
    color: var(--text-color);
    flex-wrap: wrap;
    cursor: pointer;
    user-select: contain;

    &:active {
      transform: scale(0.95);
    }

    &::before {
      position: absolute;
      inset-inline-end: 0;
      display: block;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      inline-size: 5px;
      block-size: 100%;
      background-color: var(--primary-hover);
      content: '';
      transition-property: background-color, transform;
      transform: scale(0);
    }

    &[data-active='false'] {
      transition-property: background-color, color, transform;
    }

    &[data-active='true'] {
      color: var(--on-primary-selection);
      background-color: var(--primary-selection);
      text-shadow: 2px 2px 2px var(--primary-outline);
      transition-property: background-color, transform;
    }

    &[data-active='true']::before {
      transform: scale(1);
    }

    a {
      display: flex;
      flex-wrap: wrap;
      color: inherit;
      inline-size: 100%;
    }
  }

  .site-sider-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    inline-size: 32px;
    block-size: 100%;
    user-select: none;
  }

  .site-sider-label {
    position: relative;
  }

  .site-sider-label,
  .site-sider-subtitle {
    overflow: hidden;
    inline-size: calc(100% - 32px);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .site-sider-subtitle {
    margin-inline-start: 32px;
    padding-block-end: 4px;
    font-size: var(--font-size-sm);
    opacity: 0.67;
  }

  .site-header {
    position: sticky;
    inset-block-start: 0;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    gap: 1em;
    min-block-size: 43px;
    max-inline-size: 224px;
  }

  .site-title {
    display: flex;
    flex: 1;
    flex-direction: column;
    line-height: 1.1;
    gap: 5px;

    h1 {
      margin: 0;
      font-size: 1.5em;
      font-weight: bold;
      color: var(--text-heading);
    }

    i {
      font-size: x-small;
      font-weight: lighter;
      color: var(--text-color);
      font-style: normal;
    }
  }

  @media screen and (width <= 1100px) {
    :host {
      inline-size: 100px;
    }

    .site-sider {
      min-inline-size: 68px;
      inline-size: 68px;

      > ul {
        padding: 0 8px;
      }
    }

    .site-header {
      justify-content: center;
    }

    .site-sider-group-title {
      text-align: center;
    }

    .site-sider-item {
      cursor: pointer;

      a {
        display: flex;
        inline-size: 100%;
        block-size: 48px;
        justify-content: center;
        align-items: center;
      }

      &::before {
        content: none;
      }
    }

    .site-sider-item .site-sider-label,
    .site-sider-item .site-sider-subtitle,
    .site-title,
    n-dropdown {
      display: none;
    }
  }
`;

const switchThemeCss = css`
  .theme-btn {
    font-size: 28px;
    text-align: center;
    color: #fc0;
    transition: transform var(--transition-duration) var(--transition-timing-function);
    min-inline-size: 28px;
    line-height: 32px;
    cursor: pointer;
    user-select: none;
  }

  [data-theme='dark'] .theme-btn {
    content: '☪';
    color: #fff;
  }
`;

export type MyPkg = Partial<RouterProps> & {
  type?: string;
  title?: string;
  path?: string;
  subtitle?: string;
  icon?: string;
  order?: number;
  key?: string;
};
const obj: Record<string, MyPkg[]> = {},
  menuKeys: string[] = [],
  kv: Record<string, MyPkg> = {};

let all: MyPkg[] = [];

function extractMenu(list: RouterProps[]) {
  return list.forEach(({ key, meta, children }) => {
    if (meta) {
      const type = meta.type || '默认',
        prev = obj[type as string] || [];

      obj[type as string] = prev.concat({
        ...meta,
        type: type as string,
        key,
      });
      if (!menuKeys.includes(type as string)) {
        menuKeys.push(type as string);
      }
      kv[key] = {
        ...meta,
        type: type as string,
        key,
      };
    }
    if (Array.isArray(children) && children.length) {
      extractMenu(children);
    }
  });
}

extractMenu(routes);

for (const key in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    obj[key] = obj[key].sort((a, b) => (a.order || 0) - (b.order || 0));
    all = all.concat(obj[key]);
  }
}

export { all, kv };
function Sider(_: object, opt: ComponentOptions<object>) {
  const location = useLocation();
  const themes = [
    { label: '暗黑', value: 'dark', icon: '☪' },
    { label: '明亮', value: 'light', icon: '☀' },
  ];
  let menuEl: HTMLUListElement | undefined;
  const active = createMemo(() => getPathName(location));

  createEffect(() => {
    if (active()) {
      opt.element.renderRoot
        .querySelector('.site-sider-item[data-active="true"] > a')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
    }
  });

  createEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.scheme);
  });
  const avatarCss = css`
    .avatar {
      background-image: none;
      animation: none;
    }
  `;

  return (
    <>
      <style>
        {baseStyle()}
        {style}
      </style>
      <section class="site-left">
        <header class="site-header">
          <A href="/">
            <n-avatar css={avatarCss} />
          </A>
          <hgroup class="site-title">
            <h1 data-truncated>{projectBasicInfo.projectName.replace(/-/g, ' ')}</h1>
            <i>{(kv[active()] || projectBasicInfo).subtitle}</i>
          </hgroup>
          <n-dropdown
            value={theme.scheme}
            items={themes}
            trigger="click"
            css={switchThemeCss}
            onChange={(e: CustomEvent) => {
              setTheme('scheme', e.detail[0]);
            }}
          >
            <span class="theme-btn">{theme.scheme === 'dark' ? '☪' : '☀'}</span>
          </n-dropdown>
        </header>
        <section class="site-sider">
          <ul ref={menuEl}>
            <For each={menuKeys}>
              {(key) => {
                return (
                  <li class="site-sider-group">
                    <p class="site-sider-group-title">{key}</p>
                    <ul class="site-sider-list">
                      <For each={obj[key]}>
                        {(item) => {
                          return (
                            <li class="site-sider-item" data-active={active() === item.key}>
                              <A href={`/${item.key}` as string}>
                                <n-popover
                                  class="site-sider-icon"
                                  arrow={true}
                                  content={() => (
                                    <div style={{ padding: '0 4px' }}>
                                      <n-typography tag="strong" style={{ 'font-size': '14px' }}>
                                        {item.title || item.path}
                                      </n-typography>
                                      <Show when={item.subtitle}>
                                        <br />
                                        <n-typography
                                          type="secondary"
                                          style={{ 'font-size': '12px' }}
                                        >
                                          {item.subtitle}
                                        </n-typography>
                                      </Show>
                                    </div>
                                  )}
                                >
                                  <span>{item.icon}</span>
                                </n-popover>
                                <div class="site-sider-label">{item.title || item.path}</div>
                                <Show when={item.subtitle}>
                                  <div class="site-sider-subtitle">{item.subtitle}</div>
                                </Show>
                              </A>
                            </li>
                          );
                        }}
                      </For>
                    </ul>
                  </li>
                );
              }}
            </For>
          </ul>
        </section>
      </section>
    </>
  );
}

customElement('site-sider', Sider);

export interface SiderElement {
  ref?: SiderElement | { current: SiderElement | null };
}
