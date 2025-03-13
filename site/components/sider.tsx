import { createEffect, createMemo, For, Show } from 'solid-js';
import { description, name } from '@app/info';
import routes, { type RouteConfig } from '@app/routes';
import { css } from '@moneko/css';
import { A, getPathName, useLocation } from '@moneko/solid';
import { theme } from 'neko-ui';

import './sider.global.less';

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

export type MyPkg = Partial<RouteConfig> & {
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
  kv: Record<string, MyPkg | undefined> = {};

let all: MyPkg[] = [];

function extractMenu(list: RouteConfig[]) {
  list.forEach(({ key, metadata, children }) => {
    if (metadata) {
      const type = metadata.type ?? '默认',
        prev = obj[type as string] ?? [];

      obj[type as string] = prev.concat({
        ...metadata,
        type: type as string,
        key,
      });
      if (!menuKeys.includes(type as string)) {
        menuKeys.push(type as string);
      }
      if (key) {
        kv[key] = {
          ...metadata,
          type: type as string,
          key,
        };
      }
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
function Sider() {
  let siderRef: HTMLElement | undefined;
  const { setScheme, scheme } = theme;
  const location = useLocation();
  const icons: Record<string, string> = {
    dark: '🌛',
    light: '🌞',
    auto: '⚙️',
  };
  const themes = [
    { label: '暗黑', value: 'dark', icon: icons.dark },
    { label: '明亮', value: 'light', icon: icons.light },
    { label: '跟随系统', value: 'auto', icon: icons.auto },
  ];

  const active = createMemo(() => getPathName(location));

  createEffect(() => {
    if (active() && siderRef) {
      siderRef.querySelector('.site-sider-item[data-active="true"] > a')?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  });

  const avatarCss = css`
    .avatar {
      background-image: none;
      animation: none;
    }
  `;

  return (
    <section ref={siderRef} class="site-left">
      <header class="site-header">
        <A href="/">
          <n-avatar css={avatarCss} />
        </A>
        <hgroup class="site-title">
          <h1 data-truncated>{name.replace(/-/g, ' ').toLocaleUpperCase()}</h1>
          <i>{kv[active()]?.subtitle || description}</i>
        </hgroup>
        <n-dropdown
          value={scheme()}
          items={themes}
          trigger="click"
          css={switchThemeCss}
          onChange={(e: CustomEvent) => {
            setScheme(e.detail[0]);
          }}
        >
          <span class="theme-btn">{icons[scheme()]}</span>
        </n-dropdown>
      </header>
      <section class="site-sider">
        <ul>
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
                            <A href={`/${item.key}`}>
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
  );
}

export default Sider;
