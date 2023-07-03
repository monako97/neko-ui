import {
  type JSXElement,
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
import Prism, { prismCss } from '../prism';
import { baseStyle } from '../theme';

const codeEditorCss = css`
  .not-toolbar code {
    padding-block-start: 8px !important;

    .line-numbers-rows {
      padding-block-start: 8px !important;
    }
  }

  .n-editor {
    --font-size: 13px;

    margin-block-start: 0;
    position: relative;

    textarea {
      position: absolute;
      z-index: 1;
      margin: 0;
      border: none;
      padding: 0;
      font-size: var(--font-size);
      white-space: inherit;
      color: transparent;
      background-color: transparent;
      outline: none;
      resize: none;
      box-sizing: border-box;
      inset-block-start: 32px;
      inset-inline-start: 16px;
      inset-inline-end: 16px;
      inset-block-end: 8px;
      min-block-size: 64px;
      caret-color: var(--text-color);
      block-size: fit-content;
      line-height: inherit !important;

      &.line-numbers {
        inset-inline-start: 54px;
        inset-inline-end: 10px;
      }

      &.not-toolbar {
        inset-block-start: 8px;
        min-block-size: 20px;
      }
    }

    pre {
      margin-block-start: 0 !important;
      pointer-events: none;
      inline-size: 100%;
      block-size: 100%;
      min-block-size: 65px;
      line-height: inherit !important;

      &.not-toolbar {
        min-block-size: 36px;
      }

      .toolbar {
        pointer-events: all;
      }

      code {
        line-height: inherit !important;
      }
    }
  }
`;

export interface CodeProps {
  class?: string;
  code?: string;
  lang?: string;
  css?: string;
  lineNumber?: boolean;
  children?: JSXElement;
  edit?: boolean | 'true' | 'false';
  toolbar?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?(code: string): void;
}

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
          !props.edit && props.class
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
        {codeEditorCss}
        {css(props.css || '')}
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

export interface CodeElement extends Omit<CodeProps, 'onChange'> {
  ref?: CodeElement | { current: CodeElement | null };
  // eslint-disable-next-line no-unused-vars
  onChange?(event: CustomEvent<string>): void;
}

interface CustomElementTags {
  'n-code': CodeElement;
}
declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
  }
}
declare global {
  export namespace JSX {
    export interface IntrinsicElements extends CustomElementTags, CustomElementTags {}
  }
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
            })
          );
        },
      },
      _
    );

    createEffect(() => {
      el.replaceChildren();
      el.removeAttribute('css');
    });

    return createComponent(Code, props);
  }
);
export default Code;
