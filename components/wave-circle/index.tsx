import React, { HtmlHTMLAttributes } from 'react';
import { getPrefixCls } from '../utils';
import { classNames, isEqual } from '@moneko/common';
import './index.global.less';

export interface WaveCircleProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /** 背景颜色 */
  bgColor?: string;
  /** 动画曲线 */
  timingFunction?: string;
  children?: React.ReactNode;
}

const WaveCircle: React.FC<WaveCircleProps> = ({
  bgColor,
  timingFunction,
  children,
  className,
  ...props
}) => {
  const prefixStyles = () => {
    return Object.assign(
      {},
      bgColor && {
        '--wave-circles-bg-color': bgColor,
      },
      timingFunction && {
        '--transition-timing-function': timingFunction,
      }
    );
  };

  return (
    <div
      {...props}
      className={classNames([getPrefixCls('wave-circles'), className])}
      style={prefixStyles() as React.CSSProperties}
    >
      <i className={getPrefixCls('wave-circle')} />
      <i className={getPrefixCls('wave-circle')} />
      <i className={getPrefixCls('wave-circle')} />
      {children}
    </div>
  );
};

export default React.memo(WaveCircle, isEqual);
