import {
  Show,
  createComponent,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  untrack,
} from 'solid-js';
import { isFunction, setClipboard } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import prismCss from '../prism/css';
import '../prism/prism.js';
import theme from '../theme';
import type { CustomElement } from '..';

declare const Prism: {
  disableWorkerMessageHandler: boolean;
  languages: Record<string, unknown>;
  highlight(code: string, langs: unknown, lang: string): string;
};

export interface CodeProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 内容 */
  code?: string;
  /** 语言 */
  lang?: string;
  /** 显示代码行号 */
  lineNumber?: boolean;
  /** 支持编辑 */
  edit?: boolean;
  /** 开启代码块工具条 */
  toolbar?: boolean;
  /** 编辑修改时的回调 */
  onChange?: (code: string) => void;
  children?: JSX.Element;
}

export type CodeElement = CustomElement<CodeProps>;

const diffLang = /^diff-([\w-]+)/i;

function Code(props: CodeProps) {
  const { baseStyle } = theme;
  let codeEl: HTMLPreElement;
  const [code, setCode] = createSignal<string>('');
  const [hei, setHei] = createSignal(20);
  const [isIntersecting, setIsIntersecting] = createSignal(false);
  const observer = new IntersectionObserver((entries) => {
    setIsIntersecting(entries[0].isIntersecting);
  });

  function copy() {
    setClipboard(untrack(code), codeEl);
  }
  function pre() {
    return (
      <pre
        class={cx(
          `language-${props.lang}`,
          props.lineNumber && 'line-numbers',
          !props.toolbar && 'not-toolbar',
          !props.edit && props.class,
        )}
      >
        <Show when={props.toolbar}>
          <div class="toolbar" data-lang={props.lang?.split(' ')[0]}>
            <button class="toolbar-copy" onClick={copy} />
          </div>
        </Show>
        <code ref={codeEl} class={`language-${props.lang}`} />
      </pre>
    );
  }
  function change({ target }: { target: HTMLTextAreaElement }) {
    const c = `${target.value}${/\n$/.test(target.value) ? '\u200b' : ''}`;

    setCode(c);
    if (isFunction(props.onChange)) {
      props.onChange(c);
    }
  }
  function postMessage(opt: { lang: string; code?: string }) {
    if (!opt.code || !isIntersecting()) return;
    observer.unobserve(codeEl);
    observer.disconnect();
    if (diffLang.test(opt.lang) && !Prism.languages[opt.lang]) {
      Prism.languages[opt.lang] = Prism.languages.diff;
    }
    const language = Prism.languages[opt.lang] || Prism.languages.markup;

    codeEl.innerHTML = Prism.highlight(opt.code, language, opt.lang);
    setHei(codeEl.getBoundingClientRect().height - (props.toolbar ? 40 : 16));
  }

  // const work = new Worker(new URL("./worker.ts", import.meta.url), {
  //   name: "wastedTime",
  //   /* webpackEntryOptions: { filename: "workers/[name].js" } */
  // });
  // work.addEventListener('message', update);

  // work.postMessage({
  //   lang: props.lang,
  //   code: code(),
  // });
  // onCleanup(() => {
  //   work.terminate();
  // });
  createEffect(() => {
    if (props.code) {
      const _code = props.code.replace(/^\n/, '');

      try {
        setCode(decodeURIComponent(_code));
      } catch (error) {
        setCode(_code);
      }
    } else {
      setCode('');
    }
  });
  createEffect(() => {
    postMessage({
      lang: props.lang || 'markup',
      code: code(),
    });
  });
  onMount(() => {
    // 开始观察目标元素
    observer.observe(codeEl);
  });
  onCleanup(() => {
    // 停止观察目标元素
    observer.unobserve(codeEl);
    observer.disconnect();
  });

  return (
    <>
      <style>
        {baseStyle()}
        {prismCss()}
        {style}
        {css(props.css)}
      </style>
      <Show when={props.edit} fallback={pre()}>
        <div class={cx('n-editor', props.class)}>
          <textarea
            value={code()}
            class={cx(props.lineNumber && 'line-numbers', !props.toolbar && 'not-toolbar')}
            style={{ height: `${hei()}px` }}
            onInput={change}
          />
          {pre()}
        </div>
      </Show>
    </>
  );
}

customElement<CodeProps>(
  'n-code',
  {
    class: void 0,
    code: void 0,
    lang: void 0,
    children: void 0,
    edit: void 0,
    toolbar: void 0,
    css: void 0,
    lineNumber: void 0,
    onChange: void 0,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        code: el.textContent,
        css: el.css,
        onChange(val: string) {
          el.dispatchEvent(
            new CustomEvent('change', {
              detail: val,
            }),
          );
        },
      },
      _,
    );

    createEffect(() => {
      el.replaceChildren();
      el.removeAttribute('css');
    });

    return createComponent(Code, props);
  },
);
export default Code;
