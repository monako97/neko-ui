import type { SandboxElement, SandboxGroupElement } from './sandbox';

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags {
      'site-sandbox': SandboxElement;
      'site-sandbox-group': SandboxGroupElement;
    }
  }
}

export * from './sandbox';
