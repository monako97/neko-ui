import * as Solid from 'solid-js';
import h from 'solid-js/h';
import * as SolidWeb from 'solid-js/web';
import examples, { type ExampleModule } from '@app/example';
import Fallback from '@app/fallback';
import { isFunction } from '@moneko/common';
import CodeLive, { type CodeLiveProps } from 'n-code-live';
import * as NekoUI from 'neko-ui';
import { customElement } from 'solid-element';

import { code, html, react, solid } from './icons';
import { codeNoShadowCss, groupCss, mdNoShadowCss, sandboxCss } from './sandbox.style';

const { createEffect, createMemo, createSignal, mergeProps, onMount } = Solid;
const { For, Show, render, Portal, Dynamic } = SolidWeb;

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
}

const icons: Record<string, () => SVGSVGElement> = {
  HTML: html,
  JSX: solid,
  solid: solid,
  REACT: react,
};
const components: CodeLiveProps['components'] = {
  ...Solid,
  ...NekoUI,
  CodeLive,
  NekoUI,
  Portal,
  Dynamic,
  jsx: $$jsx,
  Fragment: Fragment,
};

function Sandbox(_props: SandboxProps) {
  const props = mergeProps({ codes: {} } as SandboxProps, _props);
  const [sources, setSources] = createSignal<Record<string, string>>({});
  const [current, setCurrent] = createSignal({
    code: '',
    jsx: false,
    lang: '',
  });
  const [open, setOpen] = createSignal(false);
  const hasDesc = createMemo(() => {
    if (typeof props.description === 'string') {
      return !!props.description.trim().length;
    }
    return false;
  });

  createEffect(() => {
    setSources({ ...props.codes });
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
      icon: icons[k.toLocaleUpperCase()],
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
    <>
      <style textContent={sandboxCss} />
      <section class="sandbox-box">
        <fieldset class="sandbox-container">
          <legend class="sandbox-title">{props.legend}</legend>
          <section class="sandbox-view">
            <n-code-live
              source={sources()[current().lang]}
              jsx={current().jsx}
              components={components}
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
              class="sandbox-btn"
              classList={{
                'sandbox-btn-desc': hasDesc(),
              }}
              data-open={open()}
              onClick={() => setOpen((prev) => !prev)}
            >
              编辑 {code()}
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
              class="sandbox-live-editor"
              classList={{
                hide: !open(),
              }}
              code={sources()[current().lang]}
              language={(current().lang === 'html' ? 'html js' : current().lang) as NekoUI.Language}
              edit={true}
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
    legend: '',
    description: void 0,
    codes: {},
    order: void 0,
  },
  Sandbox,
);

interface SandboxGroupProps {
  name: string;
  ignore?: string[];
}

function SandboxGroup(props: SandboxGroupProps) {
  async function load(name: string) {
    let box: () => Solid.JSX.Element = () => null;
    const exampleModule = examples[`@app/example/${name}`];

    if (name.length > 0 && isFunction(exampleModule)) {
      const resp = (await exampleModule()).default || [];

      box = () => (
        <div class="sandbox-group">
          <For each={resp}>
            {({ title, ...m }) => (
              <site-sandbox style={{ flex: m.col || 'calc(50% - 24px)' }} legend={title} {...m} />
            )}
          </For>
        </div>
      );
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
    <>
      <style textContent={groupCss} />
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
    </>
  );
}

customElement(
  'site-sandbox-group',
  {
    ignore: [],
    name: '',
  },
  SandboxGroup,
);

export type SandboxElement = CustomElement<ExampleModule>;
export type SandboxGroupElement = CustomElement<SandboxGroupProps>;
