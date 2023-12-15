import * as Solid from 'solid-js';
import { type ExampleModule } from '@app/example';
import Fallback from '@app/fallback';
import { css, cx } from '@moneko/css';
import * as NekoUI from 'neko-ui';
import h from 'solid-js/h';
import * as SolidWeb from 'solid-js/web';
import './sandbox.global.less';
import type { CodeLiveProps } from 'n-code-live';

const { createEffect, createMemo, createSignal, mergeProps, onMount } = Solid;
const { For, Show, render, Portal, Dynamic } = SolidWeb;
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

function $$jsx(type: Solid.Component, p: Solid.VoidProps, ...children: JSX.Element[]) {
  return h(type, {
    ...p,
    children,
  });
}
function Fragment(p: Solid.VoidProps) {
  return p.children;
}
interface SandboxProps extends Omit<ExampleModule, 'title'> {
  legend: string;
  codes: Record<string, string>;
  description?: string;
  style?: Solid.JSX.CSSProperties;
}

export function Sandbox(_props: SandboxProps) {
  const props = mergeProps({ codes: {} }, _props);
  const [sources, setSources] = createSignal<Record<string, string>>({});
  const [current, setCurrent] = createSignal({
    code: '',
    jsx: false,
    lang: '',
  });
  const [open, setOpen] = createSignal(false);
  const scope: CodeLiveProps['scope'] = {
    ...Solid,
    NekoUI,
    Portal,
    Dynamic,
    jsx: $$jsx,
    Fragment: Fragment,
  };
  const hasDesc = createMemo(() => {
    if (typeof props.description === 'string') {
      return !!props.description?.trim().length;
    }
    return false;
  });

  createEffect(() => {
    setSources({ ...(props.codes || {}) });
  });
  function langChange(e: CustomEvent<string | number>) {
    setCurrent({
      code: sources()[e.detail as string],
      jsx: e.detail !== 'html',
      lang: e.detail as string,
    });
  }
  function codeChange(e: CustomEvent<string>) {
    const old = current();

    setCurrent({ ...old, code: e.detail });
    setSources((prev) => ({ ...prev, [old.lang]: e.detail }));
  }
  const langs = createMemo(() =>
    Object.keys(props.codes).map((k) => ({
      value: k,
      label: k.toLocaleUpperCase(),
    })),
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
    <section class="sandbox-box" style={_props.style}>
      <fieldset class="sandbox-container">
        <legend class="sandbox-title">{props.legend}</legend>
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
            edit={true}
            css={codeNoShadowCss}
            onChange={codeChange}
          />
        </Show>
      </fieldset>
    </section>
  );
}

interface SandboxGroupProps {
  name: string;
  ignore?: string[];
}

export function SandboxGroup(props: SandboxGroupProps) {
  async function load(name: string) {
    let box: () => Solid.JSX.Element;

    try {
      const resp = (await import(`@app/example/${name}`)).default || [];

      box = () => (
        <div class="sandbox-group">
          <For each={resp}>
            {({ title, ...m }) => (
              <Sandbox style={{ flex: m.col || 'calc(50% - 24px)' }} legend={title} {...m} />
            )}
          </For>
        </div>
      );
    } catch (error) {
      box = () => null;
    }
    return {
      default: box,
    };
  }
  const data = createMemo(() => {
    const app = load.bind(null, props.name);
    const View = Solid.lazy(app);

    return <View />;
  });

  return (
    <Solid.Suspense
      fallback={
        Fallback && (
          <div class="sandbox-group">
            <Fallback />
          </div>
        )
      }
    >
      {data()}
    </Solid.Suspense>
  );
}
