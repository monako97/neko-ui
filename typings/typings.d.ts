declare module '*.less';
declare module '*.css';
declare module '*.js';
declare module '*.jsx';
declare module '*.ts';
declare module '*.png';
declare module '*.svg';
declare module '*.woff2';
declare module './index.less' {
  const styles: { readonly [key: string]: string };

  export default styles;
}

declare module '*?raw' {
  export default string;
}

declare module 'neko-ui' {
  export * from 'components/index';
}
declare module 'moment' {
  import { Dayjs } from 'dayjs';
  namespace moment {
    type Moment = Dayjs;
  }
  export = moment;
  export as namespace moment;
}
declare module 'env-flags';

interface PureComponentProps {
  path: string;
}

interface Window {
  Prism?: Prism & typeof Object;
}
