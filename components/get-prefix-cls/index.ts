import css from './index.less';
import { getPrefixCls as prefixCls } from '@moneko/common';

const _prefix = css?.prefixCls || 'neko';
const getPrefixCls = (className: string, prefix = _prefix) => prefixCls(className, prefix);

export default getPrefixCls;
