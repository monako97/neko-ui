import * as Solid from 'solid-js';
import { css, cx } from '@moneko/css';
import { type ExampleModule, examples } from '@moneko/solid-js';
import { baseStyle } from 'neko-ui';
import { customElement } from 'solid-element';
import h from 'solid-js/h';
import { render } from 'solid-js/web';
import type { CodeLiveProps } from 'n-code-live';

const { For, Show, createEffect, createMemo, createSignal, mergeProps, onMount } = Solid;

const sandboxCss = css`
  :host {
    display: inline-block;
    inline-size: 100%;
    max-inline-size: 100%;
    break-inside: avoid;
    color: var(--text-color);
  }

  .sandbox-box {
    break-inside: avoid;
    box-sizing: border-box;
    padding-block-end: 16px;
  }

  .sandbox-container,
  .sandbox-info,
  .sandbox-view,
  .sandbox-btn,
  .sandbox-live-editor {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  .sandbox-container,
  .sandbox-info,
  .sandbox-live-editor {
    transition-property: border-color;
    border: var(--border-base);
  }

  .sandbox-container {
    border-radius: var(--border-radius);
  }

  fieldset {
    padding: 8px 16px 0;
  }

  .sandbox-title {
    padding: 0 8px;
    font-size: 14px;
    font-weight: 500;
  }

  .sandbox-view {
    position: relative;
    padding-block-end: 32px;
    padding-inline: 8px;
  }

  .sandbox-view > div {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .sandbox-view > .lang-btn {
    position: absolute;
    z-index: 1;
    display: inline-block;
    margin: auto;
    inline-size: fit-content;
    inset-inline-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    transform: translateY(calc(50%)) scale(0.8);
  }

  .sandbox-view .n-md-box,
  .sandbox-view pre {
    inline-size: 100%;
  }

  .sandbox-view pre:first-of-type {
    margin-block-start: 8px;
  }

  .sandbox-info {
    border: var(--border-base);
    border-style: dotted;
    border-width: 1px 0 0;
    margin-inline: -16px;
    margin-block-start: -12px;
    padding: 0 16px 8px;
  }

  .sandbox-info .sandbox-title::before {
    content: none;
  }

  .sandbox-description {
    padding: 0 8px;
  }

  .sandbox-description p:first-of-type {
    margin-block-start: 4px;
  }

  .sandbox-description p:last-of-type {
    margin-block-end: 4px;
  }

  .sandbox-btn {
    position: absolute;
    inset-inline-end: -16px;
    inset-block-end: 0;
    padding: 0 4px;
    inline-size: fit-content;
    font-size: var(--font-size-sm);
    cursor: pointer;
    border-start-start-radius: var(--border-radius);
    line-height: 24px;
    user-select: none;
    transition-property: background-color, color, transform;
  }

  .sandbox-btn::after {
    display: inline-block;
    text-indent: 4px;
    line-height: 1;
    content: '{ ... }';
  }

  .sandbox-btn:active {
    transform: scale(0.95);
  }

  .sandbox-btn[data-open='true'] {
    color: white;
    background-color: var(--primary-color);
  }

  .sandbox-btn[data-open='false'] {
    color: var(--primary-color);
    background-color: var(--primary-outline);
    border-end-end-radius: var(--border-radius);
  }

  .sandbox-btn.sandbox-btn-desc {
    transform: translateY(12px);
    border-end-end-radius: 0;
    border-end-start-radius: var(--border-radius);
  }

  .sandbox-live-editor {
    display: block;
    margin: 0 -16px;
    border-style: dotted;
    border-width: 1px 0 0;
    inline-size: calc(100% + 32px);
  }

  .sandbox-live-editor.hide {
    display: none;
  }

  .sandbox-error-msg,
  .n-preview-error {
    color: var(--error-color);
  }
`;

const mdNoShadowCss = css`
  .n-md-body {
    padding: 0;
    margin-block-end: 0;
    background-color: transparent;
    box-shadow: none;
  }
`;
const codeNoShadowCss = css`
  .n-editor,
  pre {
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    box-shadow: none;
  }
`;

function $$jsx(type: Solid.Component, p: Solid.VoidProps, ...children: Solid.JSXElement[]) {
  return h(type, {
    ...p,
    children,
  });
}
function Fragment(p: Solid.VoidProps) {
  return p.children;
}

const scope: CodeLiveProps['scope'] = {
  jsx: $$jsx,
  Fragment: Fragment,
  ...Solid,
};

function Sandbox(_props: ExampleModule) {
  const props = mergeProps({ codes: {} }, _props);
  const [sources, setSources] = createSignal<Record<string, string>>({});
  const [current, setCurrent] = createSignal({
    code: '',
    jsx: false,
    lang: '',
  });
  const [open, setOpen] = createSignal(false);
  const hasDesc = createMemo(() => {
    if (typeof props.description === 'string') {
      return !!props.description?.trim().length;
    }
    return false;
  });

  createEffect(() => {
    setSources({ ...(props.codes || {}) });
  });
  function langChange(e: CustomEvent<string>) {
    setCurrent({
      code: sources()[e.detail],
      jsx: e.detail !== 'html',
      lang: e.detail,
    });
  }
  function codeChange(e: CustomEvent<string>) {
    const old = current();

    setCurrent({ ...old, code: e.detail });
    setSources((prev) => ({ ...prev, [old.lang]: e.detail }));
  }
  const langs = createMemo(() =>
    Object.keys(props.codes).map((k) => ({ value: k, label: k.toLocaleUpperCase() }))
  );

  onMount(() => {
    const l = langs()[0].value;

    setCurrent({
      jsx: l !== 'html',
      code: props.codes[l],
      lang: l,
    });
  });

  return (
    <>
      <style>{sandboxCss}</style>
      <section class="sandbox-box">
        <fieldset class="sandbox-container">
          <legend class="sandbox-title">{props.title}</legend>
          <section class="sandbox-view">
            <n-code-live
              source={sources()[current().lang]}
              jsx={current().jsx}
              scope={scope}
              render-jsx={render}
            />
            <Show when={langs().length > 1}>
              <n-segmented
                class="lang-btn"
                value={current().lang}
                options={langs()}
                onChange={langChange}
              />
            </Show>
            <span
              class={cx('sandbox-btn', hasDesc() && 'sandbox-btn-desc')}
              data-open={open()}
              onClick={() => setOpen((prev) => !prev)}
            >
              编辑
            </span>
          </section>
          <Show when={hasDesc()}>
            <fieldset class="sandbox-info">
              <legend class="sandbox-title">描述</legend>
              <div class="sandbox-description">
                <n-md text={props.description} css={mdNoShadowCss} />
              </div>
            </fieldset>
          </Show>
          <Show when={open()}>
            <n-code
              class={cx('sandbox-live-editor', !open() && 'hide')}
              code={sources()[current().lang]}
              lang={current().lang === 'SolidJS' ? 'tsx' : current().lang}
              edit="true"
              css={codeNoShadowCss}
              onChange={codeChange}
            />
          </Show>
        </fieldset>
      </section>
    </>
  );
}

customElement(
  'site-sandbox',
  {
    title: undefined,
    description: undefined,
    codes: {},
    order: undefined,
  },
  Sandbox
);

const groupCss = css`
  .sandbox-group {
    margin: 0 auto 24px;
    border-radius: var(--border-radius);
    padding: 24px;
    background-color: var(--component-bg);
    box-shadow: 0 2px 8px 0 var(--primary-shadow);
    inline-size: 100%;
    max-inline-size: 1280px;
    box-sizing: border-box;
  }
`;

interface SandboxGroupProps {
  name: string;
  col?: number;
  ignore?: string[];
}

function SandboxGroup(_props: SandboxGroupProps) {
  const props = mergeProps({ col: 2 }, _props);
  const [api, setApi] = createSignal<string | null>(null);
  const data = createMemo(() => examples[props.name] || []);

  createEffect(async () => {
    try {
      setApi((await import(`@pkg/${props.name}/api.md?raw`)).default);
    } catch (error) {
      setApi(null);
    }
  });

  return (
    <>
      <Show when={data().length}>
        <style>
          {baseStyle()}
          {groupCss}
        </style>
        <div class="sandbox-group" style={{ 'column-count': props.col }}>
          <For each={data()}>{(m) => <site-sandbox {...m} />}</For>
        </div>
      </Show>
      <Show when={api()}>
        <n-md text={api() as string} />
      </Show>
    </>
  );
}

customElement(
  'site-sandbox-group',
  {
    col: 2,
    ignore: [],
    name: '',
  },
  SandboxGroup
);

export interface SandboxElement extends ExampleModule {
  ref?: SandboxElement | { current: SandboxElement | null };
}

export interface SandboxGroupElement extends SandboxGroupProps {
  ref?: SandboxGroupElement | { current: SandboxGroupElement | null };
}
