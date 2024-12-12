import {
  createEffect,
  createResource,
  createSignal,
  createUniqueId,
  type JSX,
  mergeProps,
  onCleanup,
  Show,
  untrack,
} from 'solid-js';
import { isFunction, setClipboard } from '@moneko/common';
import { css } from '@moneko/css';
import type { TokenStream } from 'prismjs';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute } from '../basic-config';
import theme from '../theme';

import { darkCss, lightCss, style } from './style';

export type Language =
  | 'bash'
  | 'shell'
  | 'sh'
  | 'clike'
  | 'css'
  | 'docker'
  | 'dockerfile'
  | 'git'
  | 'diff'
  | 'javascript'
  | 'js'
  | 'json'
  | 'webmanifest'
  | 'jsx'
  | 'tsx'
  | 'less'
  | 'html'
  | 'mathml'
  | 'svg'
  | 'xml'
  | 'ssml'
  | 'atom'
  | 'rss'
  | 'regex'
  | 'rust'
  | 'sql'
  | 'swift'
  | 'toml'
  | 'typescript'
  | 'ts'
  | 'yaml'
  | 'yml'
  | 'matlab';

export interface CodeProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 内容 */
  code?: string;
  /** 语言
   * @default 'markup'
   */
  language?: Language;
  /** 支持编辑 */
  edit?: boolean;
  /** 开启代码块工具条 */
  toolbar?: boolean;
  /** 编辑修改时的回调 */
  onChange?(code: string): void;
  children?: JSX.Element;
}
export type CodeElement = CustomElement<CodeProps>;

function Code(props: CodeProps) {
  const { isDark } = theme;
  let codeEl: HTMLPreElement;
  let timer: NodeJS.Timeout | undefined;
  const diffLang = /^diff-([\w-]+)/i;
  const decoded = /%[0-9A-Fa-f]{2}/;
  const id = createUniqueId();
  const [code, setCode] = createSignal<string>('');
  const [highlightCss, setHighlightCss] = createSignal<string>();

  async function fetchPrism() {
    if (!window.Prism) {
      return (await import('../prism')).default;
    }
    return window.Prism;
  }
  const [prismJS] = createResource('prism', fetchPrism);

  createEffect(() => {
    let _next = props.code || '';

    if (decoded.test(_next)) {
      _next = decodeURIComponent(_next);
    }
    codeEl.normalize();
    if (_next !== codeEl.textContent) {
      setCode(_next);
    }
  });

  function copy() {
    setClipboard(untrack(code), codeEl);
  }
  const change: JSX.InputEventHandlerUnion<HTMLElement, InputEvent> = function (e) {
    e.target.normalize();
    const next = e.target.textContent;

    syntax(props.language, next);
    if (isFunction(props.onChange)) {
      props.onChange(next);
    }
  };

  function highlighter(el: HTMLPreElement, tokenize: TokenStream, start = 0) {
    let pos = start;

    if (Array.isArray(tokenize)) {
      for (let i = 0, len = tokenize.length; i < len; i++) {
        const token = tokenize[i];

        if (typeof token !== 'object') {
          pos += token.length;
          continue;
        }
        pos = highlighter(el, token, pos);
      }
      return pos;
    }
    if (typeof tokenize === 'object' && tokenize.type) {
      if (el.firstChild) {
        const key = id + (tokenize.alias ?? tokenize.type);
        const range = new Range();

        range.setStart(el.firstChild, pos);
        if (Array.isArray(tokenize.content)) {
          pos = highlighter(el, tokenize.content, pos);
        } else if (typeof tokenize.content === 'string') {
          pos += tokenize.content.length;
        }
        range.setEnd(el.firstChild, pos);
        const highlight = CSS.highlights.get(key);

        if (highlight) {
          highlight.add(range);
        } else {
          CSS.highlights.set(key, new Highlight().add(range));
        }
      }
    }

    return pos;
  }
  function syntax(language = 'markup', value: string | null) {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
    const Prism = prismJS();

    if (!value || !Prism) return;
    timer = setTimeout(() => {
      clearTimeout(timer);

      if (CSS.highlights) {
        CSS.highlights.forEach((highlight, key) => {
          if (key.startsWith(id)) {
            highlight.clear();
          }
        });
        const grammar =
          Prism.languages[diffLang.test(language) ? 'diff' : language] || Prism.languages.markup;

        highlighter(codeEl, Prism.tokenize(value, grammar));
        setHighlightCss(() => {
          const len = id.length;
          let style = '';

          for (const key of CSS.highlights.keys()) {
            if (key.startsWith(id)) {
              style += `::highlight(${key}){color:var(--${key.substring(len)});}`;
            }
          }
          return style;
        });
      } else {
        throw Error('不支持 CSS Highlights');
      }
      timer = void 0;
    }, 0);
  }
  createEffect(() => {
    syntax(props.language, code());
  });
  onCleanup(() => {
    if (CSS.highlights) {
      for (const key of CSS.highlights.keys()) {
        if (key.startsWith(id)) {
          CSS.highlights.delete(key);
        }
      }
    }
  });

  return (
    <>
      <style textContent={isDark() ? darkCss : lightCss} />
      <style textContent={highlightCss()} />
      <style textContent={style} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <pre
        classList={{
          [`language-${props.language}`]: !!props.language,
          'not-toolbar': !props.toolbar,
          [props.class!]: !props.edit,
        }}
      >
        <Show when={props.toolbar}>
          <div class="toolbar" data-language={props.language?.split(' ')[0]}>
            <button class="toolbar-copy" aria-label="copy" onClick={copy} />
          </div>
        </Show>
        <code ref={codeEl!} contenteditable={props.edit} spellcheck={false} onInput={change}>
          {code()}
        </code>
      </pre>
    </>
  );
}

customElement<CodeProps>(
  'n-code',
  {
    class: void 0,
    code: void 0,
    language: void 0,
    children: void 0,
    edit: void 0,
    toolbar: void 0,
    css: void 0,
    onChange: void 0,
  },
  (_, opt) => {
    const { baseStyle } = theme;
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
      clearAttribute(el, ['css', 'code']);
      el.replaceChildren();
    });
    return (
      <>
        <style textContent={baseStyle()} />
        <Code {...props} />
      </>
    );
  },
);
export default Code;
