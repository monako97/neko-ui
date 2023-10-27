declare module 'neko-ui' {
  // eslint-disable-next-line import/no-unresolved
  export * from 'components';
}
declare module '*.wasm';
declare module 'http*';
declare const SolidJS: unknown;

namespace JSX {
  export type Element = Any;
}

declare type JSXElement = JSX.Element;
