import {
  createEffect,
  createResource,
  For,
  Match,
  mergeProps,
  onCleanup,
  Show,
  Switch,
} from 'solid-js';
import { frameCallback } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute } from '../basic-config';
import mdStyle from '../md-style';
import theme, { block } from '../theme';

import { code, image, katexBlock, katexInline } from './common';
import { create, dispose, type WorkerMessage } from './worker';

import '../code';
import '../img';

function MD(_props: MdProps) {
  let renderer: marked.Renderer | undefined;
  let ref: HTMLDivElement | undefined;
  const { baseStyle } = theme;
  const props = mergeProps(
    {
      webWorker: false,
      pictureViewer: true,
      lazyPicture: true,
      text: '',
      tools: ['copy'],
      getAnchorContainer: () => window as unknown as HTMLElement,
    },
    _props,
  );

  async function createWorker(enable: boolean) {
    return enable ? new Worker(await create()) : Promise.resolve(void 0);
  }
  const [worker, { mutate }] = createResource(false, createWorker);

  function update(e: { data: string }) {
    if (ref) {
      ref.innerHTML = e.data;
    }
  }
  async function postMessage(opt: WorkerMessage) {
    const { text, lazyPicture, pictureViewer, langToolbar, ...options } = opt;
    const marked = (await import('marked-completed')).default;

    if (!renderer) {
      renderer = new marked.Renderer();
      renderer.katexBlock = katexBlock;
      renderer.katexInline = katexInline;
    }
    renderer.image = image(lazyPicture, pictureViewer);
    renderer.code = code(langToolbar);
    update({
      data: marked(text, {
        renderer: renderer,
        langToolbar: langToolbar,
        headerPrefix: '# ',
        breaks: true,
        pedantic: false,
        smartLists: true,
        smartypants: true,
        xhtml: true,
        ...options,
      }),
    });
  }
  createEffect(() => {
    createWorker(props.webWorker).then((res) => {
      if (res) {
        res.addEventListener('message', update);
      }
      mutate(res);
    });
  });

  createEffect(() => {
    if (props.webWorker) {
      const webWorker = worker();

      if (webWorker) {
        webWorker.postMessage({
          text: props.text,
          langToolbar: props.tools,
          pictureViewer: props.pictureViewer,
          lazyPicture: props.lazyPicture,
        });
      }
    } else {
      const call = () =>
        postMessage({
          text: props.text,
          langToolbar: props.tools,
          pictureViewer: props.pictureViewer,
          lazyPicture: props.lazyPicture,
        });

      frameCallback(call);
    }
  });
  onCleanup(() => {
    if (props.webWorker) {
      const webWorker = worker();

      if (webWorker) {
        webWorker.removeEventListener('message', update);
        webWorker.terminate();
      }
      dispose();
    }
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
        <Match when={(props.children || []).length > 0}>
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
  children?: JSX.Element;
  /**
   * 使用 web worker
   * @default true
   */
  webWorker?: boolean;
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
    webWorker: true,
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
