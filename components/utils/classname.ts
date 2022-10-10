import variables from '../variables.less';

export const getPrefixCls = (className: string, prefixCls = variables.prefixCls) =>
  `${prefixCls}-${className}`;

export const classNames = (cls?: (string | undefined | null | boolean | number)[]) => {
  return cls?.filter(Boolean).join(' ');
};
