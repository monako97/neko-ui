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
import '../code';
import '../img';
import { baseStyle } from '../theme';
import type { CustomElement } from '..';

const mdCss = css`
  .n-photo-header > span,
  .n-md-body,
  .n-md-toc {
    backdrop-filter: blur(16px);
    /* stylelint-disable-next-line */
    -webkit-backdrop-filter: blur(16px);
  }

  .n-md-box:not(.site-doc-main) {
    position: relative;
    display: flex;
    margin: 0 auto;
    max-inline-size: 1280px;
    flex-direction: row-reverse;
    gap: 16px;
  }

  .n-md-body {
    overflow: hidden;
    margin: 0 auto 24px;
    border-radius: var(--border-radius);
    padding: 24px;
    color: var(--text-color);
    max-inline-size: 1280px;
    box-sizing: border-box;
    overflow-wrap: break-word;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: background-color;
    flex: 1;
  }

  a {
    position: relative;
    text-decoration: none;
    color: var(--text-color);
  }

  a:visited {
    color: var(--text-secondary);
  }

  a:hover {
    color: var(--primary-hover, #80b3ff);
  }

  p {
    padding: 0;
    font-size: var(--font-size);
    line-height: 1.8;
    vertical-align: baseline;
    word-wrap: break-word;
    word-break: break-word;
    content-visibility: auto;
    contain-intrinsic-size: 32px;
    margin-block-end: 1em;
  }

  ol {
    margin: 0;
    padding: 0 0 0 24px;
    font-size: var(--font-size);
  }

  .n-md-toc,
  .n-md-body {
    background-color: var(--component-bg);
    box-shadow: 0 2px 8px 0 var(--primary-shadow);
  }

  .n-md-toc {
    position: sticky;
    inset-block-start: 0;
    inset-inline-end: 0;
    z-index: 10;
    display: block;
    overflow-y: auto;
    margin: 0;
    border-radius: var(--border-radius);
    padding: 16px;
    max-inline-size: 200px;
    block-size: fit-content;
    max-block-size: calc(100vb - 98px);
    box-sizing: border-box;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: border-color, background-color, box-shadow;
  }

  .n-md-toc li,
  .n-md-toc ol {
    display: grid;
    inline-size: fit-content;
    max-inline-size: 100%;
    list-style: none;
  }

  .n-md-toc li a {
    overflow: hidden;
    max-inline-size: 100%;
    font-size: var(--font-size-sm);
    text-overflow: ellipsis;
    text-decoration: none;
    white-space: nowrap;
    color: var(--text-color);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: color;
  }

  .n-md-toc .active,
  .n-md-toc .active a {
    color: var(--primary-color, #5794ff);
    text-shadow: 0 1px var(--primary-shadow);
  }

  a[href]::after {
    position: absolute;
    inset-block-end: 0;
    inset-inline-start: 0;
    inline-size: 100%;
    block-size: 2px;
    background-color: var(--primary-hover, #80b3ff);
    transform: scaleX(0);
    transform-origin: center;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: transform, background-color;
    content: '';
  }

  a:hover::after {
    transform: scaleX(1);
  }

  .sp-layout {
    inline-size: 100%;
  }

  .n-md-body .n-md-body {
    overflow: visible;
    margin: 0;
    padding: 0;
    background-color: unset;
    backdrop-filter: none;
    box-shadow: none;
  }

  h1::before,
  h2::before,
  h3::before,
  h4::before,
  h5::before,
  h6::before {
    color: var(--primary-color, #5794ff);
    content: attr(data-prefix);
  }

  h1[data-prefix]::before,
  h2[data-prefix]::before,
  h3[data-prefix]::before,
  h4[data-prefix]::before,
  h5[data-prefix]::before,
  h6[data-prefix]::before {
    color: var(--primary-color, #5794ff);
    content: attr(data-prefix) !important;
  }

  p > code,
  h1 > code,
  h2 > code,
  h3 > code,
  h4 > code,
  h5 > code,
  h6 > code,
  li > code,
  td > code,
  mark,
  code:not([class]) {
    border-radius: var(--border-radius);
    padding: 2px 7px;
    font-size: 90%;
    color: var(--primary-heading);
    background-color: var(--text-selection);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: background-color, color;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-block-start: 1em;
    margin-block-end: 1em;
    font-weight: 500;
    color: var(--text-heading);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: border-color, background-color, box-shadow, color;
  }

  table,
  tr th,
  tr td,
  blockquote,
  blockquote::after,
  blockquote::before,
  blockquote p {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  dl {
    padding: 0;
    margin-block-end: 1em;
  }

  h1 {
    font-size: 1.6em;
    line-height: 54px;
  }

  h2 {
    font-size: 1.5em;
    line-height: 42px;
    counter-increment: section;
  }

  h2::before {
    content: counter(section) '. ';
  }

  h1,
  h2 {
    border-block-end: 1px dotted var(--border-color);
    padding-block-end: 10px;
  }

  h3 {
    font-size: 1.4em;
    line-height: 30px;
  }

  h4 {
    font-size: 1.3em;
    line-height: 28px;
  }

  h5 {
    font-size: 1.2em;
    list-style: none;
  }

  hr {
    margin: 16px 0;
    border: 0 none;
    padding: 0;
    block-size: 2px;
    text-align: start;
    color: var(--text-color);
    background-color: var(--border-color);
  }

  p img {
    position: relative;
    display: block;
    margin: auto;
    border-radius: var(--border-radius);
    max-inline-size: 100%;
    cursor: pointer;
  }

  ul {
    font-size: var(--font-size);
  }

  dl dt {
    margin-block-start: 16px;
    padding: 10px 0;
    font-size: 1em;
    font-weight: bold;
    font-style: italic;
  }

  dl dd {
    margin-block-end: 16px;
    margin-inline-start: 0;
    padding: 0 16px;
  }

  table {
    overflow: hidden;
    border-block-end: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    inline-size: 100%;
    max-inline-size: 100%;
    border-spacing: 0;
    transition-property: border-color;
    word-break: break-all;
  }

  table tbody tr:hover {
    background-color: var(--primary-shadow);
  }

  table tr th {
    padding: 10px;
    color: var(--text-heading);
    background-color: var(--border-color);
    transition-property: background-color, color;
  }

  table td {
    border-style: dotted;
    border-width: 0 0 1px 1px;
    border-color: var(--border-color);
    padding: 10px;
    transition-property: border-color;
  }

  table td:first-of-type {
    border-inline-start: 1px solid var(--border-color);
  }

  table td:last-of-type {
    border-inline-end: 1px solid var(--border-color);
  }

  table tr:last-of-type td {
    border-block-end: none;
  }

  blockquote {
    position: relative;
    margin: 30px 48px;
    border-radius: var(--border-radius);
    padding: 16px;
    font-weight: 500;
    background-color: var(--primary-selection);
    transition-property: background-color;
  }

  blockquote::before,
  blockquote::after {
    position: absolute;
    font-size: 56px;
    font-family: sans-serif;
    color: var(--primary-active);
    transition-property: color;
    content: '❞';
    line-height: 1;
  }

  blockquote::before {
    inset-block-start: -8px;
    inset-inline-start: 0;
    transform: translateX(-44px) rotate(180deg);
  }

  blockquote::after {
    inset-inline-end: 0;
    inset-block-end: -8px;
    transform: translateX(44px);
  }

  blockquote.n-tip {
    margin: 16px 0 16px 8px;
    border-inline-start: 4px solid var(--primary-color, #5794ff);
  }

  blockquote.n-tip::after {
    content: none;
  }

  blockquote.n-tip::before {
    inset-block-start: 18px;
    inset-inline-start: -12px;
    border-radius: 100%;
    inline-size: 20px;
    block-size: 20px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: var(--primary-color, #5794ff);
    transform: none;
    content: '!';
    line-height: 20px;
  }

  blockquote cite {
    font-size: var(--font-size);
    color: var(--cite-color, #bfbfbf);
    line-height: 20px;
  }

  blockquote cite::before {
    content: '\\2014 \\00A0';
  }

  blockquote p {
    margin: auto 0;
    font-size: var(--font-size);
    line-height: 24px;
    transition-property: color;
  }

  details {
    overflow: hidden;
    border-inline-start: 5px solid var(--primary-hover, #5794ff);
    border-radius: var(--border-radius);
    padding: 12px 24px;
    background: var(--primary-details-bg);
    box-sizing: border-box;
    user-select: none;
    box-shadow: 0 2px 8px 0 var(--primary-shadow, rgb(0 0 0 / 5%));
  }

  details,
  details summary {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: background-color, transform, border-color;
  }

  details:not(:last-of-type) {
    margin-block-end: 16px;
  }

  details > summary,
  details > summary ~ * {
    font-size: var(--font-size);
    font-weight: normal;
    font-style: normal;
    line-height: 1.4;
    transition-property: background-color, transform, border-color, margin;
  }

  details > summary:not(:last-of-type) details > summary ~ *:not(:last-of-type) {
    margin-block-end: 16px;
  }

  details > summary {
    font-weight: 500;
    outline: none;
    cursor: pointer;
    transform: translateX(-18px);
  }

  details > summary::-webkit-details-marker,
  details > summary::marker {
    display: none;
    color: transparent;
  }

  details > summary::before {
    display: inline-block;
    margin-inline-end: 4px;
    inline-size: 14px;
    font-weight: lighter;
    text-align: center;
    opacity: 0.5;
    content: '⛌';
    transform: rotate(45deg);
  }

  details[open] {
    user-select: auto;
  }

  details[open] > details {
    margin-block-start: 10px;
  }

  details[open] > summary {
    margin-block-end: 10px;
  }

  details[open] > summary::before {
    transform: rotate(0);
  }

  .katex-display {
    overflow-x: auto;
  }

  .n-photo-header {
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    gap: 16px;
  }

  .n-photo-header > span {
    border-radius: 8px;
    padding: 4px 10px;
    font-size: 14px;
    font-weight: lighter;
    background-color: rgb(0 0 0 / 20%);
  }

  .n-code {
    display: block;
  }

  .n-code + .n-code {
    margin-block-start: 16px;
  }
`;

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
        {mdCss}
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
