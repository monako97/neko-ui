import { createEffect, For, Match, mergeProps, onCleanup, Show, Switch } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute, type JSXElement } from '../basic-config';
import mdStyle from '../md-style';
import theme, { block } from '../theme';

import { create, dispose } from './worker';

import '../code';
import '../img';

function MD(_props: MdProps) {
  let ref: HTMLDivElement | undefined;
  const { baseStyle } = theme;
  const props = mergeProps(
    {
      pictureViewer: true,
      lazyPicture: true,
      text: '',
      tools: ['copy'],
      getAnchorContainer: () => window as unknown as HTMLElement,
    },
    _props,
  );
  const worker = new Worker(create());

  worker.addEventListener('message', update);
  function update(e: { data: string }) {
    if (ref) {
      ref.innerHTML = e.data;
    }
  }

  createEffect(() => {
    worker.postMessage({
      text: props.text,
      langToolbar: props.tools,
      pictureViewer: props.pictureViewer,
      lazyPicture: props.lazyPicture,
    });
  });
  onCleanup(() => {
    worker.removeEventListener('message', update);
    worker.terminate();
    dispose();
  });
  let list: HTMLAnchorElement[] = [];
  let heading: HTMLHeadingElement[] = [];
  const active: HTMLAnchorElement[] = [];

  function handleAnchor(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const a = e.target as HTMLAnchorElement;

    if (a.hash) {
      ref?.querySelector(decodeURIComponent(a.hash))?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
      list.forEach((item) => {
        item.classList.remove('active');
      });
      a.classList.add('active');
    } else {
      window.open(a.href);
    }
  }
  function observerEntry(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const all = entry.target.querySelectorAll('a');
      let a: HTMLAnchorElement | undefined;

      list.forEach((l) => {
        if (l.hash === `#${id}`) {
          a = l;
        } else if (!l.hash) {
          all.forEach((e) => {
            if (e.href === l.href) {
              a = l;
            }
          });
        }
      });
      if (a) {
        const idx = active.indexOf(a);

        active.forEach((e) => {
          e.classList.remove('active');
        });
        if (entry.isIntersecting) {
          active.push(a);
        } else if (idx !== -1) {
          active.splice(idx, 1);
        }
        if (active[0]) {
          active[0].classList.add('active');
          active[0].offsetParent?.scrollTo({
            top: active[0].offsetTop,
          });
        }
      }
    });
  }
  createEffect(() => {
    let observer: IntersectionObserver;

    if (ref && props.text.startsWith('[TOC]')) {
      list = [...ref.querySelectorAll<HTMLAnchorElement>('.n-md-toc a[href]')];
      heading = [...ref.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4, h5, h6')];
      observer = new IntersectionObserver(observerEntry, {
        rootMargin: '-50px 0px',
        threshold: 0.5,
      });
      heading.forEach((e) => {
        observer.observe(e);
      });
      list.forEach((e) => {
        e.addEventListener('click', handleAnchor);
      });
    }
    onCleanup(() => {
      if (observer) {
        heading.forEach((e) => {
          observer.unobserve(e);
        });
        observer.disconnect();
      }
      list.forEach((e) => {
        e.removeEventListener('click', handleAnchor);
      });
    });
  });

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={mdStyle} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <Switch>
        <Match when={((props.children as []) || []).length > 0}>
          <article class="n-md-box" part="box">
            <div class="n-md-body" part="body">
              <For each={props.children as []}>{(e) => e}</For>
            </div>
          </article>
        </Match>
        <Match when={props.text}>
          <article ref={ref} class={cx('n-md-box', props.class)} part="box" />
        </Match>
      </Switch>
    </>
  );
}

export interface MdProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** md内容 */
  text?: string;
  /** 开启图片查看器
   * @since 2.0.8
   * @default true
   */
  pictureViewer?: boolean;
  /** 开启图片懒加载
   * @since 2.8.3
   * @default true
   */
  lazyPicture?: boolean;
  /** 开启代码块工具条
   * @default ['copy']
   */
  tools?: 'copy'[];
  /** 指定滚动的容器
   * @default () => window
   */
  getAnchorContainer?: () => HTMLElement;
  /** 不进行解析
   * @default false
   */
  notRender?: boolean;
  children?: JSXElement;
}

export type MdElement = CustomElement<MdProps>;

customElement<MdProps>(
  'n-md',
  {
    class: void 0,
    pictureViewer: void 0,
    lazyPicture: void 0,
    text: void 0,
    tools: void 0,
    getAnchorContainer: void 0,
    css: void 0,
    children: void 0,
    notRender: void 0,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        text: (!_.notRender && el.textContent) || el.text,
        css: el.css,
        tools: el.tools,
        getAnchorContainer: el.getAnchorContainer,
      },
      _,
    );

    createEffect(() => {
      clearAttribute(el, ['css', 'text']);
      el.replaceChildren();
    });
    return (
      <>
        <style textContent={block} />
        <MD {...props} />
      </>
    );
  },
);
export default MD;
