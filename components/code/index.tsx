import {
  createEffect,
  createMemo,
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

import { CopyIcon } from './copy-icon';
import { darkCss, lightCss, style } from './style';

export type LanguageBase =
  | 'bash'
  | 'shell'
  | 'sh'
  | 'clike'
  | 'css'
  | 'docker'
  | 'dockerfile'
  | 'git'
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

type ExcludeLanguage<T extends LanguageBase, U extends LanguageBase> = T extends U ? never : T;

export type Language =
  | LanguageBase
  | {
      [T in LanguageBase]: `${T} ${ExcludeLanguage<LanguageBase, T>}`;
    }[LanguageBase];
export interface CodeProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 内容 */
  code?: string;
  /** 语言（支持多种语言配置：如 `html css javascript`）
   * @default 'markup'
   */
  language?: Language;
  /** 支持编辑 */
  edit?: boolean;
  /** 开启代码块工具条 */
  toolbar?: boolean;
  /** 工具条上显示的文字 */
  title?: string;
  /** 编辑修改时的回调 */
  onChange?(code: string): void;
  children?: JSX.Element;
}
export type CodeElement = CustomElement<CodeProps>;

function Code(props: CodeProps) {
  const { isDark } = theme;
  let codeEl: HTMLPreElement;
  let timer: NodeJS.Timeout | undefined;
  const decoded = /%[0-9A-Fa-f]{2}/;
  const id = createUniqueId();
  const [code, setCode] = createSignal<string>('');
  const [highlightCss, setHighlightCss] = createSignal<string>();

  async function fetchPrism() {
    if (!window.Prism) {
      return (await import('../prism')).default;
    }
    window.Prism.disableWorkerMessageHandler = true;
    window.Prism.manual = true;
    return window.Prism;
  }
  const [prismJS] = createResource('prism', fetchPrism);
  const title = createMemo(() => props.title || props.language?.split(' ').pop());

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

    syntax(props.language, next, true);
    if (isFunction(props.onChange)) {
      props.onChange(next);
    }
  };

  function updateRang(
    key: string,
    token: string,
    range: AbstractRange,
    selection: Record<string, string>,
  ) {
    const highlight = CSS.highlights.get(key);

    if (highlight) {
      highlight.add(range);
    } else {
      CSS.highlights.set(key, new Highlight().add(range));
    }
    if (selection[key] === void 0) {
      selection[key] =
        `::highlight(${key}){color:var(--${token});background-color:var(--${token}-bg);text-decoration:var(--${token}-text-decoration);text-shadow:var(--${token}-text-shadow);-webkit-text-stroke-width:var(--${token}-stroke-width);-webkit-text-stroke-color:var(--${token}-stroke-color);}`;
    }
  }
  function highlighter(
    el: HTMLPreElement,
    tokenize: TokenStream,
    selection: Record<string, string>,
    start = 0,
  ) {
    let pos = start;

    if (Array.isArray(tokenize)) {
      for (let i = 0, len = tokenize.length; i < len; i++) {
        const token = tokenize[i];

        if (typeof token !== 'object') {
          pos += token.length;
          continue;
        }
        pos = highlighter(el, token, selection, pos);
      }
      return pos;
    }
    if (typeof tokenize === 'object' && tokenize.type) {
      if (el.firstChild) {
        const token = (tokenize.alias ?? tokenize.type).toString();
        const key = id + token;
        const range = new Range();

        if (['deleted', 'inserted'].includes(token)) {
          // diff
          range.setStart(el.firstChild, pos + 2);
        } else {
          range.setStart(el.firstChild, pos);
        }
        if (Array.isArray(tokenize.content)) {
          pos = highlighter(el, tokenize.content, selection, pos);
        } else if (typeof tokenize.content === 'string') {
          pos += tokenize.content.length;
        }
        range.setEnd(el.firstChild, pos);
        updateRang(key, token, range, selection);
      }
    }

    return pos;
  }
  function syntax(
    language: Language = 'markup' as Language,
    value: string | null,
    clear?: boolean,
    prevCss = {},
  ) {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
    const Prism = prismJS();

    if (!value || !Prism) return;
    timer = setTimeout(() => {
      clearTimeout(timer);
      if (CSS.highlights) {
        if (clear) {
          CSS.highlights.forEach((highlight, key) => {
            if (key.startsWith(id)) {
              highlight.clear();
            }
          });
        }
        const grammars = language.split(' ') as Language[],
          grammar = Prism.languages[grammars[0]];

        if (grammar) {
          highlighter(codeEl, Prism.tokenize(value, grammar), prevCss);
        }
        if (grammars.length > 1 || grammars[0] === 'git') {
          syntax(grammars[1], value, false, prevCss);
        } else {
          setHighlightCss(Object.values(prevCss).join(''));
        }
      } else {
        throw Error('不支持 CSS Highlights');
      }
      timer = void 0;
    }, 0);
  }
  createEffect(() => {
    syntax(props.language, code(), true);
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
          <div class="toolbar" data-language={title()}>
            <CopyIcon class="toolbar-copy" onClick={copy} />
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
    title: void 0,
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
      clearAttribute(el, ['css', 'code', 'title']);
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
