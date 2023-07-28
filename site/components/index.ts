import './coverage';
import './footer';
import './pagination';
import type { SandboxElement, SandboxGroupElement } from './sandbox';

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags {
      'site-footer': CustomElement;
      'site-coverage': CustomElement;
      'site-sandbox': SandboxElement;
      'site-sandbox-group': SandboxGroupElement;
      'site-sider': CustomElement;
      'site-pagination': CustomElement;
    }
  }
}

export * from './sandbox';
