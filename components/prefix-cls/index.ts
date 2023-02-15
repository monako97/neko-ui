import { getPrefixCls } from '@moneko/common';

let cls = 'n';

export const setPrefixCls = (val: string) => {
  cls = val;
};

function prefixCls<T extends string>(className: T) {
  return getPrefixCls(className, cls as 'n');
}

export default prefixCls;
