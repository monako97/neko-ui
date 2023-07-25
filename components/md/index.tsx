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
  onMount,
} from 'solid-js';
import { getScrollTop, isUndefined, throttle } from '@moneko/common';
import { css, cx } from '@moneko/css';
import marked from 'marked-completed';
import { customElement } from 'solid-element';
import { style } from './style';
import '../code';
import '../img';
import { baseStyle } from '../theme';
import type { CustomElement } from '..';

const renderer = new marked.Renderer();

renderer.code = function (code, lang) {
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
renderer.image = function (src: string | null, title: string | null, alt: string) {
  return `<n-img role="dialog" src="${src}" alt="${alt}" ${
    title ? `title="${title}"` : ''
  } style="display:flex;border-radius:var(--border-radius);overflow:hidden;"></n-img>`;
};

marked.setOptions({
  renderer,
  headerPrefix: '# ',
  langLineNumber: true,
  langToolbar: ['copy'],
  breaks: true,
  pedantic: false,
  smartLists: true,
  smartypants: true,
  xhtml: true,
});

const toggleAnchor = (anchor: HTMLAnchorElement) => {
  anchor.offsetParent?.querySelectorAll('li')?.forEach((a) => {
    a.classList.remove('active');
  });
  anchor.parentElement?.classList.add('active');
  const box = anchor.offsetParent as HTMLElement;

  if (box) {
    let scrollLogicalPosition: ScrollLogicalPosition | null = null;

    if (box.offsetTop > anchor.offsetTop) {
      scrollLogicalPosition = 'nearest';
    } else if (box.offsetHeight + box.offsetTop < anchor.offsetTop + anchor.offsetHeight) {
      scrollLogicalPosition = 'nearest';
    }
    if (scrollLogicalPosition !== null) {
      anchor.parentElement?.scrollIntoView({
        behavior: 'smooth',
        block: scrollLogicalPosition,
      });
    }
  }
};

function MD(_props: MdProps) {
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

  let ref: HTMLDivElement | undefined;
  const anchors: AnchorType[] = [];

  function handleAnchor(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    toggleAnchor(e.target as HTMLAnchorElement);
    ref
      ?.querySelector(decodeURIComponent((e.target as HTMLAnchorElement)?.hash))
      ?.scrollIntoView?.({
        behavior: 'smooth',
        block: 'nearest',
      });
  }
  const htmlString = createMemo(() => {
    if (!props.text) {
      return '';
    }
    return marked(props.text, {
      langLineNumber: props.lineNumber,
      langToolbar: props.tools,
    });
  });
  const handleScroll = throttle((e: Event) => {
    if (anchors.length) {
      const el = e.target as HTMLElement;
      const top = getScrollTop(el);

      let anchor: HTMLAnchorElement | null = null;
      const elTop = (isUndefined(el.tagName) ? -window.scrollY : -el.offsetHeight) / 2;

      anchors.forEach((a) => {
        if (top - a.top > elTop) anchor = a.anchor;
      });

      if (anchor) {
        toggleAnchor(anchor);
      }
    }
  }, 200);

  onMount(async () => {
    props.getAnchorContainer?.().addEventListener('scroll', handleScroll);
    if (ref) {
      ref.querySelectorAll('.n-md-toc li a')?.forEach((e) => {
        const a = e as HTMLAnchorElement;
        const _el = ref?.querySelector(
          decodeURIComponent((a as HTMLAnchorElement)?.hash),
        ) as HTMLElement;

        anchors.push({
          anchor: a,
          top: _el.offsetTop,
        });
        (e as HTMLAnchorElement).onclick = handleAnchor;
      });
    }
  });
  onCleanup(() => {
    props.getAnchorContainer?.().removeEventListener('scroll', handleScroll);
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
  tools?: ['copy'];
  /** 指定滚动的容器
   * @default () => window
   */
  getAnchorContainer?: () => HTMLElement;
  /** 不进行解析
   * @default false
   */
  notRender?: boolean;
}

interface AnchorType {
  anchor: HTMLAnchorElement;
  top: number;
}

export type MdElement = CustomElement<MdProps>;

customElement(
  'n-md',
  {
    class: undefined,
    pictureViewer: undefined,
    lineNumber: undefined,
    text: undefined,
    tools: undefined,
    getAnchorContainer: undefined,
    css: undefined,
    children: undefined,
    notRender: undefined,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        text: (!_.notRender && el.textContent) || el.text,
        css: el.css,
        tools: el.tools,
        lineNumber: el.lineNumber,
        pictureViewer: el.pictureViewer,
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
