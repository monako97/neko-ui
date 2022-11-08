import React, { useCallback, useMemo, useRef } from 'react';
import getPrefixCls from '../get-prefix-cls';
import { classNames, isFunction } from '@moneko/common';
import './index.global.less';

export type ButtonType = 'success' | 'error' | 'danger' | 'primary' | 'warning' | 'default';

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 按钮类型 */
  type?: ButtonType;
  /** 无限动画 */
  infinite?: boolean;
  /** 透明背景 */
  ghost?: boolean;
  /** 实色背景 */
  fill?: boolean;
  /** 圆形按钮 */
  circle?: boolean;
  /** 虚线按钮 */
  dashed?: boolean;
  /** 只有文字的按钮 */
  float?: boolean;
  /** 禁用按钮 */
  disabled?: boolean;
  /** 链接按钮 */
  link?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  infinite,
  ghost,
  fill,
  circle,
  dashed,
  float,
  link,
  className,
  children,
  disabled,
  onClick,
  type,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = React.useState(false);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (disabled) return;
      setAnimating(true);
      if (isFunction(onClick)) {
        onClick(e);
      }
    },
    [disabled, onClick]
  );
  const cls = useMemo(
    () =>
      classNames(
        getPrefixCls('btn'),
        type && getPrefixCls(`btn-${type}`),
        infinite && getPrefixCls('btn-infinite'),
        ghost && getPrefixCls('btn-ghost'),
        fill && getPrefixCls('btn-fill'),
        circle && getPrefixCls('btn-circle'),
        dashed && getPrefixCls('btn-dashed'),
        float && getPrefixCls('btn-float'),
        animating && getPrefixCls('btn-without'),
        disabled && getPrefixCls('btn-disabled'),
        link && getPrefixCls('btn-link'),
        className
      ),
    [type, infinite, ghost, fill, circle, dashed, float, animating, disabled, link, className]
  );
  const handleAnimationEnd = useCallback(() => {
    setAnimating(false);
  }, []);

  return (
    <div
      {...props}
      className={cls}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      ref={ref}
    >
      <span className={getPrefixCls('btn-text')}>{children}</span>
    </div>
  );
};

export default Button;
