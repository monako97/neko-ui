import React, { memo, useMemo } from 'react';
import { classNames, isEqual } from '@moneko/common';
import getPrefixCls from '../get-prefix-cls';
import './index.global.less';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ className, children, ...props }) => {
  const cls = useMemo(() => classNames([getPrefixCls('tooltip'), className]), [className]);

  return (
    <div className={cls} role="tooltip" {...props}>
      {children}
    </div>
  );
};

export default memo(Tooltip, isEqual);
