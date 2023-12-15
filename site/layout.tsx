import { For, Show, createEffect, createMemo } from 'solid-js';
import docs from '@app/docs';
import { type RouteProps, getPathName, useLocation } from '@moneko/solid';
import { mdStyle, theme } from 'neko-ui';
import './layout.global.less';
import ChangeLog from '../CHANGELOG.md';
import Coverage from '@/components/coverage';
import Footer from '@/components/footer';
import Pagination from '@/components/pagination';
import { SandboxGroup } from '@/components/sandbox';
import Sider from '@/components/sider';

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
      <style>{mdStyle}</style>
      <Sider />
      <main ref={box} class="site-doc-main">
        <Show when={!getPathName(location).startsWith('@')}>
          <Coverage />
        </Show>
        <div class="site-page-view">
          <div class="n-md-box">
            <div class="n-md-body">{p.children}</div>
          </div>
          <SandboxGroup name={getPathName(location)} />
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
