import variables from '../variables.less';

export const getPrefixCls = (className: string, prefixCls = variables.prefixCls || 'neko') =>
  `${prefixCls}-${className}`;

export const classNames = (cls?: (string | undefined | null | boolean | number)[]) =>
  cls?.filter(Boolean).join(' ');
