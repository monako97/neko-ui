import { createEffect, createMemo, For, Show } from 'solid-js';
import { getPathName, type RouteProps, useLocation } from '@moneko/solid';
import docs from 'docs:docs';
import { mdStyle, registry, theme } from 'neko-ui';

import Coverage from '@/components/coverage';
import Footer from '@/components/footer';
import Pagination from '@/components/pagination';
import { Sandbox, SandboxGroup } from '@/components/sandbox';
import Sider from '@/components/sider';

import ChangeLog from '../CHANGELOG.md';

import './layout.global.css';
import { cs } from './aaa.module.less';

console.log(docs);
registry(Sandbox, SandboxGroup);
function App(p: RouteProps<string>) {
  let box: HTMLDivElement | undefined;
  const { isDark, scheme } = theme;
  const location = useLocation();
  const keys = Object.keys(docs);
  const doc = createMemo(() => {
    const base = getPathName(location);

    return keys
      .filter((key) => key === base || key.startsWith(`${base}/`))
      .map((name) => docs[name])
      .flat();
  });

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
        <div class={cs}>csacsacsa</div>
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
