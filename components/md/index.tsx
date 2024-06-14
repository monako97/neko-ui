import { For, Match, Show, Switch, createEffect, mergeProps, onCleanup } from 'solid-js';
import { frameCallback } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import '../code';
import '../img';
import mdStyle from '../md-style';
import theme from '../theme';
import type { CustomElement } from '..';

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

  function initWorker() {
    return new Worker('https://cdn.jsdelivr.net/npm/neko-ui@latest/es/md/worker.js');
  }
  // eslint-disable-next-line solid/reactivity
  let worker: Worker | undefined = props.webWorker ? initWorker() : void 0;

  function update(e: { data: string }) {
    if (ref) {
      ref.innerHTML = e.data;
    }
  }
  async function postMessage(opt: {
    text: string;
    pictureViewer?: boolean;
    lazyPicture?: boolean;
    langToolbar?: string[];
    langLineNumber?: boolean;
  }) {
    const { text, pictureViewer, lazyPicture, langToolbar, ...options } = opt;
    const marked = (await import('marked-completed')).default;

    if (!renderer) {
      renderer = new marked.Renderer();

      renderer.katexBlock = (code: string) => {
        return `<n-katex display-mode="true">${code}</n-katex>`;
      };
      renderer.katexInline = (code: string) => {
        return `<n-katex>${code}</n-katex>`;
      };
    }

    renderer.image = (src: string, title: string, alt: string) => {
      return `<n-img lazy="${lazyPicture}" disabled="${!pictureViewer}" role="img" src="${src}" alt="${alt}" ${title ? `title="${title}"` : ''}></n-img>`;
    };
    const toolbar = !!langToolbar?.length;

    renderer.code = function (code: string, lang: string) {
      if (lang === 'treeview') {
        return `<n-tree data="${code}" />`;
      }

      return `<n-code class="n-code" toolbar="${toolbar}" language="${lang}" ${
        options.langLineNumber ? 'line-number="true"' : ''
      }>${encodeURIComponent(code)}</n-code>`;
    };

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
    if (props.webWorker) {
      if (!worker) {
        worker = initWorker();
      }
      worker.addEventListener('message', update);
    }
  });

  createEffect(() => {
    if (worker) {
      worker.postMessage(
        JSON.stringify({
          text: props.text,
          langLineNumber: props.lineNumber,
          langToolbar: props.tools,
          pictureViewer: props.pictureViewer,
          lazyPicture: props.lazyPicture,
        }),
      );
    } else {
      const call = () =>
        postMessage({
          text: props.text,
          langLineNumber: props.lineNumber,
          langToolbar: props.tools,
          pictureViewer: props.pictureViewer,
          lazyPicture: props.lazyPicture,
        });

      frameCallback(call);
    }
  });
  onCleanup(() => {
    if (worker) {
      worker.removeEventListener('message', update);
      worker.terminate();
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
      list.forEach((item) => item.classList.remove('active'));
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

    if (ref && props.text?.startsWith('[TOC]')) {
      list = [...ref.querySelectorAll<HTMLAnchorElement>('.n-md-toc a[href]')];
      heading = [...ref.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4, h5, h6')];
      observer = new IntersectionObserver(observerEntry, {
        rootMargin: '-50px 0px',
        threshold: 0.5,
      });
      heading.forEach((e) => observer.observe(e));
      list.forEach((e) => {
        e.addEventListener('click', handleAnchor);
      });
    }
    onCleanup(() => {
      if (observer) {
        heading.forEach((e) => observer.unobserve(e));
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
        <Match when={(props.children as [])?.length}>
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
  /** 显示代码块行号
   * @default true
   */
  lineNumber?: boolean;
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
    lineNumber: true,
    text: void 0,
    tools: void 0,
    getAnchorContainer: void 0,
    css: void 0,
    children: void 0,
    notRender: void 0,
    webWorker: void 0,
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
      el.removeAttribute('css');
      el.replaceChildren();
    });
    return <MD {...props} />;
  },
);
export default MD;
