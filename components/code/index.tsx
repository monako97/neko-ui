import {
  type Accessor,
  createEffect,
  createResource,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  Show,
  untrack,
} from 'solid-js';
import { isFunction, setClipboard } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute } from '../basic-config';
import theme, { block } from '../theme';

import { style } from './style';

export interface CodeProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 内容 */
  code?: string;
  /** 语言 */
  language?: string;
  /** 显示代码行号 */
  lineNumber?: boolean;
  /** 支持编辑 */
  edit?: boolean;
  /** 开启代码块工具条 */
  toolbar?: boolean;
  /** 编辑修改时的回调 */
  onChange?: (code: string) => void;
  children?: JSX.Element;
  /**
   * 使用 web worker
   * @default false
   */
  webWorker?: boolean;
}

export type CodeElement = CustomElement<CodeProps>;
const cache = {
  Prism: null as typeof import('../prism/index').default | null,
  prismCss: null as Accessor<string> | null,
};

function Code(props: CodeProps) {
  let codeEl: HTMLPreElement;
  const diffLang = /^diff-([\w-]+)/i;
  const [code, setCode] = createSignal<string>('');
  const [hei, setHei] = createSignal(20);
  const [isIntersecting, setIsIntersecting] = createSignal(false);

  async function fetchPrism() {
    if (!cache.Prism) {
      cache.Prism = (await import('../prism')).default;
    }
    return cache.Prism;
  }
  async function fetchPrismCss() {
    if (!cache.prismCss) {
      cache.prismCss = (await import('../prism/css')).default;
    }
    return cache.prismCss;
  }
  const [prismJS] = createResource('prism', fetchPrism);
  const [prismCss] = createResource('prism-css', fetchPrismCss);

  function initObserver() {
    return new IntersectionObserver((entries) => {
      setIsIntersecting(entries[0].isIntersecting);
    });
  }
  function initWorker() {
    return new Worker('https://cdn.jsdelivr.net/npm/neko-ui@latest/es/code/worker.js');
  }
  // eslint-disable-next-line solid/reactivity
  let observer = props.webWorker ? void 0 : initObserver();
  // eslint-disable-next-line solid/reactivity
  let worker: Worker | undefined = props.webWorker ? initWorker() : void 0;

  function copy() {
    setClipboard(untrack(code), codeEl);
  }
  function Pre() {
    return (
      <pre
        classList={{
          [`language-${props.language}`]: !!props.language,
          'line-numbers': props.lineNumber,
          'not-toolbar': !props.toolbar,
          [props.class!]: !props.edit,
        }}
      >
        <Show when={props.toolbar}>
          <div class="toolbar" data-language={props.language?.split(' ')[0]}>
            <button class="toolbar-copy" aria-label="copy" onClick={copy} />
          </div>
        </Show>
        <code ref={codeEl} class={`language-${props.language}`} textContent={code()} />
      </pre>
    );
  }
  function change({ target }: { target: HTMLTextAreaElement }) {
    const c = `${target.value}${target.value.endsWith('\n') ? '\u200b' : ''}`;

    setCode(c);
    if (isFunction(props.onChange)) {
      props.onChange(c);
    }
  }
  function update(e: { data: string }) {
    codeEl.innerHTML = e.data;
    setHei(codeEl.getBoundingClientRect().height - (props.toolbar ? 40 : 16));
  }
  function cleanObserver() {
    if (observer) {
      // 停止观察目标元素
      observer.unobserve(codeEl);
      observer.disconnect();
    }
  }
  function postMessage(language: string, value?: string) {
    const Prism = prismJS();

    if (!value || !isIntersecting() || !Prism) return;
    cleanObserver();
    if (diffLang.test(language) && !Prism.languages[language]) {
      Prism.languages[language] = Prism.languages.diff;
    }
    update({
      data: Prism.highlight(
        `${value}\n`,
        Prism.languages[language] || Prism.languages.markup,
        language,
      ),
    });
  }
  createEffect(() => {
    if (props.code) {
      try {
        setCode(decodeURIComponent(props.code));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        setCode(props.code);
      }
    } else {
      setCode('');
    }
  });
  createEffect(() => {
    if (props.webWorker) {
      if (!worker) {
        worker = initWorker();
      }
      worker.addEventListener('message', update);
    } else if (!observer) {
      observer = initObserver();
    }
  });

  createEffect(() => {
    if (worker) {
      worker.postMessage(
        JSON.stringify({
          language: props.language,
          code: code(),
        }),
      );
    } else {
      postMessage(props.language || 'markup', code());
    }
  });
  onMount(() => {
    if (codeEl) {
      // 开始观察目标元素
      observer?.observe(codeEl);
    }
  });
  onCleanup(() => {
    if (worker) {
      worker.removeEventListener('message', update);
      worker.terminate();
    }
    cleanObserver();
  });

  return (
    <>
      <style textContent={prismCss()?.()} />
      <style textContent={style} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <Show when={props.edit} fallback={<Pre />}>
        <div class={cx('n-editor', props.class)}>
          <textarea
            value={props.code}
            classList={{
              'line-numbers': props.lineNumber,
              'not-toolbar': !props.toolbar,
            }}
            style={{ height: `${hei()}px` }}
            onInput={change}
          />
          <Pre />
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
    language: void 0,
    children: void 0,
    edit: void 0,
    toolbar: void 0,
    css: void 0,
    lineNumber: void 0,
    onChange: void 0,
    webWorker: void 0,
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
        <style textContent={block} />
        <style textContent={baseStyle()} />
        <Code {...props} />
      </>
    );
  },
);
export default Code;
