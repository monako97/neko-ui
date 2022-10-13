import variables from '../variables.less';
import { getPrefixCls as prefixCls } from '@moneko/common';

export const getPrefixCls = (className: string, prefix = variables.prefixCls) =>
  prefixCls(className, prefix);
