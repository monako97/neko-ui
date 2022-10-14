import css from './index.less';
import { getPrefixCls as prefixCls } from '@moneko/common';

const getPrefixCls = (className: string, prefix = css.prefixCls) => prefixCls(className, prefix);

export default getPrefixCls;
