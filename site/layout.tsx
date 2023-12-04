import { For, Show, createEffect, createMemo } from 'solid-js';
import docs from '@app/docs';
import { Outlet, getPathName, useLocation } from '@moneko/solid';
import { mdStyle, theme } from 'neko-ui';
import './components';
import { noBg, styles } from './style';
import log from '../CHANGELOG.md?raw';

function App() {
  let box: HTMLDivElement | undefined;
  const { isDark, scheme } = theme;
  const location = useLocation();
  const doc = createMemo(() => docs[getPathName(location)]);

  createEffect(() => {
    box?.scrollTo({ top: 0, behavior: 'smooth' });
  });
  function onScheme() {
    document.documentElement.setAttribute('data-theme', isDark() ? 'dark' : 'light');
  }
  return (
    <n-provider onScheme={onScheme}>
      <style>
        {styles}
        {mdStyle}
        {noBg}
      </style>
      <site-sider scheme={scheme()} />
      <main ref={box} class="site-doc-main">
        <Show when={!getPathName(location).startsWith('@')}>
          <site-coverage />
        </Show>
        <div class="site-page-view">
          <div class="n-md-box">
            <div class="n-md-body">
              <Outlet />
            </div>
          </div>
          <site-sandbox-group name={getPathName(location)} />
          <div class="n-md-box">
            <div class="n-md-body">
              <For each={doc()}>{(e) => e()}</For>
            </div>
          </div>
          <Show when={!getPathName(location)}>
            <n-md text={`[TOC]\n${log}`} />
          </Show>
          <site-pagination />
        </div>
        <site-footer />
      </main>
      <n-back-top css=".back-top {position: fixed;}" />
      <Show when={scheme() === 'light' || !isDark()}>
        <div class="n-site-bg" />
      </Show>
    </n-provider>
  );
}

export default App;
