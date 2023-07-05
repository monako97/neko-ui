// import * as SolidJS from 'solid-js';
// import { customElement } from 'solid-element';
// import h from 'solid-js/h';
// import { render } from 'solid-js/web';
// import { transform } from 'sucrase';
// import type { ComponentOptions } from '..';
// import type { MDXComponents } from 'mdx/types';

// function ErrorMessage(p: { error: Error }) {
//   return (
//     <details class="n-error" style={{ color: 'red' }}>
//       <summary>
//         {p.error?.name}: {p.error?.message}
//       </summary>
//       <SolidJS.Index each={p.error?.stack?.split('\n')}>
//         {(item) => <div>{item()}</div>}
//       </SolidJS.Index>
//     </details>
//   );
// }
// function CodeLive(props: CodeLiveProps, opt: ComponentOptions<CodeLiveElement>) {
//   const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/;
//   const box = document.createElement('div');
//   let cleanup: VoidFunction;
//   const [err, setErr] = SolidJS.createSignal<Error | null>();

//   function compilerScript(code: string, scope = {}) {
//     return new Function(...Object.keys(scope), code)(...Object.values(scope));
//   }

//   function compiler(code?: string, scope?: MDXComponents) {
//     if (!code) return null;

//     function $$jsx(
//       type: SolidJS.Component,
//       p: SolidJS.VoidProps,
//       ...children: SolidJS.JSXElement[]
//     ) {
//       return h(type, {
//         ...p,
//         children,
//       });
//     }
//     function Fragment(p: SolidJS.VoidProps) {
//       return p.children;
//     }
//     const scopes = { $$jsx, Fragment, SolidJS, ...scope };
//     const codeTrimmed = code
//       .trim()
//       .replace(/;$/, '')
//       .replace(/export /g, '');
//     const source = (
//       codeTrimmed.includes('render(') ? `() => {${codeTrimmed}}` : codeTrimmed
//     ).replace('render(', 'return (');

//     return new Function(
//       ...Object.keys(scopes),
//       transform(`return (${source})`, {
//         transforms: ['jsx', 'typescript', 'imports'],
//         jsxPragma: '$$jsx',
//         jsxFragmentPragma: 'Fragment',
//         jsxImportSource: 'solid-js/h',
//         production: true,
//         ...props.transform,
//       }).code
//     )(...Object.values(scopes));
//   }
//   const element = SolidJS.createMemo(() => {
//     try {
//       cleanup?.();
//       if (props.jsx) {
//         box.replaceChildren();
//         setErr(null);
//         const comp = compiler(props.source, props.scope);

//         cleanup = render(comp, box);
//         return box;
//       }
//       box.innerHTML = (props.source || '').replace(scriptRegex, '');

//       return box;
//     } catch (error) {
//       setErr(error as Error);
//       return null;
//     }
//   });

//   SolidJS.createEffect(() => {
//     const match = props.source?.match(scriptRegex);

//     if (match) {
//       compilerScript(match[1], { container: opt.element.shadowRoot });
//     }
//   });

//   SolidJS.onCleanup(() => {
//     cleanup?.();
//     box.remove();
//   });

//   return (
//     <SolidJS.Show when={err()} fallback={element()}>
//       <ErrorMessage error={err() as Error} />
//     </SolidJS.Show>
//   );
// }

// export interface CodeLiveProps {
//   source?: string;
//   scope?: MDXComponents;
//   jsx?: boolean;
//   transform?: {
//     transforms?: Array<'jsx' | 'typescript' | 'flow' | 'imports' | 'react-hot-loader' | 'jest'>;
//     disableESTransforms?: boolean;
//     jsxRuntime?: 'classic' | 'automatic' | 'preserve';
//     production?: boolean;
//     jsxImportSource?: string;
//     jsxPragma?: string;
//     jsxFragmentPragma?: string;
//     preserveDynamicImport?: boolean;
//     injectCreateRequireForImportRequire?: boolean;
//     enableLegacyTypeScriptModuleInterop?: boolean;
//     enableLegacyBabel5ModuleInterop?: boolean;
//     sourceMapOptions?: {
//       compiledFilename: string;
//     };
//     filePath?: string;
//   };
// }

// export interface CodeLiveElement extends CodeLiveProps {
//   ref?: CodeLiveElement | { current: CodeLiveElement | null };
// }

// interface CustomElementTags {
//   'n-code-live': CodeLiveElement;
// }
// declare module 'solid-js' {
//   export namespace JSX {
//     export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
//   }
// }
// declare global {
//   export namespace JSX {
//     export interface IntrinsicElements extends CustomElementTags, CustomElementTags {}
//   }
// }

// customElement(
//   'n-code-live',
//   { source: undefined, scope: undefined, jsx: false, transform: undefined },
//   CodeLive
// );
// export default CodeLive;

// // import 'n-code-live';
