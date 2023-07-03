import { CoverageElement } from './coverage';
import { FooterElement } from './footer';
import { PaginationElement } from './pagination';
import { SandboxElement, SandboxGroupElement } from './sandbox';
import { SiderElement } from './sider';

interface CustomElementTags {
  'site-footer': FooterElement;
  'site-coverage': CoverageElement;
  'site-sandbox': SandboxElement;
  'site-sandbox-group': SandboxGroupElement;
  'site-sider': SiderElement;
  'site-pagination': PaginationElement;
}
declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
  }
}

export * from './coverage';
export * from './footer';
export * from './pagination';
export * from './sandbox';
export * from './sider';
