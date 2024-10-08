import { createEffect, createMemo, For, Show } from 'solid-js';
import docs from '@app/docs';
import { getPathName, type RouteProps, useLocation } from '@moneko/solid';
import { mdStyle, theme } from 'neko-ui';

import Coverage from '@/components/coverage';
import Footer from '@/components/footer';
import Pagination from '@/components/pagination';
import Sider from '@/components/sider';

import ChangeLog from '../CHANGELOG.md';

import './layout.global.css';

import '@/components/sandbox';

function App(p: RouteProps<string>) {
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
      <style textContent={mdStyle} />
      <Sider />
      <main ref={box} class="site-doc-main">
        <Show when={!getPathName(location).startsWith('@')}>
          <Coverage />
        </Show>
        <div class="site-page-view">
          <div class="n-md-box">
            <div class="n-md-body">{p.children}</div>
          </div>
          <site-sandbox-group name={getPathName(location)} />
          <For each={doc()}>{(e) => e()}</For>
          <Show when={!getPathName(location)}>
            <div class="n-md-box">
              <div class="n-md-body">
                <ChangeLog />
              </div>
            </div>
          </Show>
          <Pagination />
        </div>
        <Footer />
      </main>
      <n-back-top css=".back-top {position: fixed;}" />
      <Show when={scheme() === 'light' || !isDark()}>
        <div class="n-site-bg" />
      </Show>
    </n-provider>
  );
}

export default App;
