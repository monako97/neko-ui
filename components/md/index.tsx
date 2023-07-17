import {
  For,
  type JSXElement,
  Match,
  Switch,
  createComponent,
  createEffect,
  createMemo,
  mergeProps,
  onCleanup,
  onMount,
} from 'solid-js';
import { getScrollTop, isUndefined, passiveSupported, throttle } from '@moneko/common';
import { css, cx } from '@moneko/css';
import marked from 'marked-completed';
import { customElement } from 'solid-element';
import { style } from './style';
import '../code';
import '../img';
import { baseStyle } from '../theme';
import type { CSSProperties, CustomElement } from '..';

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

export type PhotoViewDataType = {
  src?: string;
  intro?: string;
  key: string | number;
};

export type CodeToolType = Array<'copy'>;

export type AnchorType = {
  anchor: HTMLAnchorElement;
  top: number;
};

const toggleAnchor = (anchor: HTMLAnchorElement) => {
  anchor.offsetParent?.querySelectorAll('li')?.forEach((a) => {
    a.classList.remove('active');
  });
  anchor.parentElement?.classList.add('active');
  const box = anchor.offsetParent?.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();

  if (box) {
    let scrollLogicalPosition: ScrollLogicalPosition | null = null;

    if (box.top > anchorRect.top) {
      scrollLogicalPosition = 'nearest';
    } else if (box.height + box.top < anchorRect.top + anchorRect.height) {
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
const tocWheel = throttle((e: Event) => {
  e.preventDefault();
  const { currentTarget, deltaY } = e as unknown as WheelEvent;
  const targetDom = currentTarget as HTMLElement;

  if (targetDom?.classList.contains('n-md-toc')) {
    targetDom.scrollTop = targetDom.scrollTop + deltaY;
  }
}, 200);

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
    ref?.querySelector(decodeURIComponent((e.target as HTMLAnchorElement)?.hash))?.scrollIntoView({
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
  const handleWheel = (event: WheelEvent) => {
    const offsetParent = (event.target as HTMLElement).offsetParent;

    if (!offsetParent || offsetParent.tagName !== 'PRE') {
      return;
    }
    const rows = offsetParent?.getElementsByClassName('line-numbers-rows');

    if (rows?.length) {
      const codeTag: HTMLElement = offsetParent.getElementsByTagName('code')[0];

      if (codeTag.scrollHeight - codeTag.offsetHeight && rows[0].scrollTop !== codeTag.scrollTop) {
        // 可滚动高度大于0
        rows[0].scrollTop = codeTag.scrollTop;
      }
    }
  };
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

      ref.querySelector('ol.n-md-toc')?.addEventListener('wheel', tocWheel, passiveSupported);
    }
  });
  onCleanup(() => {
    ref?.querySelector('ol.n-md-toc')?.removeEventListener('wheel', tocWheel, passiveSupported);
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
            onWheel={handleWheel}
          />
        </Match>
      </Switch>
    </>
  );
}

export interface MdProps {
  class?: string;
  /** md内容 */
  text?: string;
  style?: CSSProperties;
  /** 开启图片查看器 */
  pictureViewer?: boolean;
  /** 显示代码块行号 */
  lineNumber?: boolean;
  /** 开启代码块工具条 */
  tools?: CodeToolType;
  /** 指定滚动的容器 */
  getAnchorContainer?: () => HTMLElement;
  css?: string;
  children?: JSXElement[] | JSXElement;
  /** 不进行解析 */
  notRender?: boolean;
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
