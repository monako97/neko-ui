import {
  type JSX,
  Show,
  createComponent,
  createEffect,
  createSignal,
  mergeProps,
  onMount,
  untrack,
} from 'solid-js';
import { isFunction, setClipboard, throttle } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { style } from './style';
import Prism, { prismCss } from '../prism';
import { baseStyle } from '../theme';
import type { CustomElement } from '..';

export interface CodeProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
}

export type CodeElement = CustomElement<CodeProps>;

function Code(props: CodeProps) {
  let codeEl: HTMLPreElement;
  const [code, setCode] = createSignal<string>('');
  const [hei, setHei] = createSignal(20);
  const highlight = throttle(Prism.highlightElement, 16);

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
        <code ref={codeEl} class={`language-${props.lang}`}>
          {code()}
        </code>
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
    if (codeEl) {
      codeEl.textContent = code();
      setHei(codeEl.getBoundingClientRect().height - (props.toolbar ? 40 : 16));
      highlight(codeEl);
    }
  });
  onMount(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      highlight(codeEl);
    }, 0);
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

customElement(
  'n-code',
  {
    class: undefined,
    code: undefined,
    lang: undefined,
    children: undefined,
    edit: undefined,
    toolbar: undefined,
    css: undefined,
    lineNumber: undefined,
    onChange: undefined,
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
