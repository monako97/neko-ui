declare module '*.less';
declare module '*.css';
declare module '*.js';
declare module '*.jsx';
declare module '*.ts';
declare module '*.png';
declare module '*.svg';
declare module '*.woff2';
declare module 'components/*/examples/*';
declare module './index.less' {
  const styles: { readonly [key: string]: string };

  export default styles;
}
declare module '*.mdx' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let MDXComponent: (props: any) => JSX.Element;

  export default MDXComponent;
}
declare module '*?raw' {
  export default string;
}

declare module 'neko-ui' {
  export * from 'components';
}

declare const SolidJS: unknown;
