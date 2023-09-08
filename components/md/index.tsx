import {
  For,
  type JSX,
  Match,
  Switch,
  createComponent,
  createEffect,
  createMemo,
  mergeProps,
  onCleanup,
} from 'solid-js';
import { css, cx } from '@moneko/css';
import marked from 'marked-completed';
import { customElement } from 'solid-element';
import { style } from './style';
import '../code';
import '../img';
import theme from '../theme';
import type { CustomElement } from '..';

function MD(_props: MdProps) {
  const { baseStyle } = theme;
  const props = mergeProps(
    {
      pictureViewer: true,
      lineNumber: true,
      text: '',
      tools: ['copy'],
      getAnchorContainer: () => window as unknown as HTMLElement,
    },
    _props,
  );
  const renderer = new marked.Renderer();

  renderer.code = function (code: string, lang: string) {
    if (lang === 'treeview') {
      return `<n-tree data="${code}" />`;
    }
    const langLineNumber = this.options.langLineNumber;
    const toolbar = !!this.options.langToolbar?.length;

    return `<n-code class="n-code" toolbar="${toolbar}" lang="${lang}" line-number="${langLineNumber}">${encodeURIComponent(
      code,
    )}</n-code>`;
  };
  renderer.katexBlock = function (code: string) {
    return `<n-katex display-mode="true">${code}</n-katex>`;
  };
  renderer.katexInline = function (code: string) {
    return `<n-katex>${code}</n-katex>`;
  };

  let ref: HTMLDivElement | undefined;

  const htmlString = createMemo(() => {
    if (!props.text) {
      return '';
    }
    if (props.pictureViewer) {
      renderer.image = function (src: string | null, title: string | null, alt: string) {
        return `<n-img role="img" src="${src}" alt="${alt}" ${
          title ? `title="${title}"` : ''
        }></n-img>`;
      };
    }
    return marked(props.text, {
      renderer: renderer,
      langLineNumber: props.lineNumber,
      langToolbar: props.tools,
      headerPrefix: '# ',
      breaks: true,
      pedantic: false,
      smartLists: true,
      smartypants: true,
      xhtml: true,
    });
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
      <style>
        {baseStyle()}
        {style}
        {css(props.css)}
      </style>
      <Switch>
        <Match when={(props.children as [])?.length}>
          <article class="n-md-box" part="box">
            <div class="n-md-body" part="body">
              <For each={props.children as []}>{(e) => <>{e}</>}</For>
            </div>
          </article>
        </Match>
        <Match when={props.text}>
          <article
            ref={ref}
            class={cx('n-md-box', props.class)}
            part="box"
            // eslint-disable-next-line solid/no-innerhtml
            innerHTML={htmlString()}
          />
        </Match>
      </Switch>
    </>
  );
}

export interface MdProps extends JSX.HTMLAttributes<HTMLDivElement> {
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
}

export type MdElement = CustomElement<MdProps>;

customElement<MdProps>(
  'n-md',
  {
    class: void 0,
    pictureViewer: void 0,
    lineNumber: void 0,
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
      el.removeAttribute('css');
      el.replaceChildren();
    });
    return createComponent(MD, props);
  },
);
export default MD;
