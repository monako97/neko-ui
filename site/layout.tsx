import './layout.global.css';
import { For, Show, createEffect, createMemo } from 'solid-js';
import docs from '@app/docs';
import { type RouteProps, getPathName, useLocation } from '@moneko/solid';
import ChangeLog from '../CHANGELOG.md';
import Coverage from '@/components/coverage';
import Footer from '@/components/footer';
import Pagination from '@/components/pagination';
import '@/components/sandbox';
import Sider from '@/components/sider';
import { mdStyle, theme } from 'neko-ui';

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
          <div class="n-md-box">
            <div class="n-md-body">
              <For each={doc()}>{(e) => e()}</For>
            </div>
          </div>
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
