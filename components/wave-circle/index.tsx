import React, { useMemo } from 'react';
import { cls } from './style';
import { cx } from '../emotion';

export interface WaveCircleProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /** 背景颜色 */
  bgColor?: string;
  /** 动画曲线 */
  timingFunction?: string;
  children?: React.ReactNode;
}

const WaveCircle: React.FC<WaveCircleProps> = ({
  className,
  bgColor,
  timingFunction,
  children,
  ...props
}) => {
  const prefixStyles = useMemo(() => {
    return Object.assign(
      {},
      bgColor && {
        '--wave-circles-bg-color': bgColor,
      },
      timingFunction && {
        '--transition-timing-function': timingFunction,
      }
    );
  }, [bgColor, timingFunction]);

  return (
    <div {...props} style={prefixStyles as React.CSSProperties} className={cx(cls.wave, className)}>
      <i className={cls.circle} />
      <i className={cls.circle} />
      <i className={cls.circle} />
      {children}
    </div>
  );
};

export default WaveCircle;
