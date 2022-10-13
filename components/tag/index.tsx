import React, { memo, useMemo } from 'react';
import { getPrefixCls } from '../utils';
import { classNames, isEqual } from '@moneko/common';
import './index.global.less';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Tag: React.FC<TagProps> = ({ className, ...props }) => {
  const cls = useMemo(() => classNames([getPrefixCls('tag'), className]), [className]);

  return <div {...props} className={cls} />;
};

export default memo(Tag, isEqual);
