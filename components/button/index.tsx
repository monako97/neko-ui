import React, { useCallback, useRef, useState, useMemo, createElement } from 'react';
import { isFunction } from '@moneko/common';
import { cls, type ButtonType } from './style';
import { cx } from '../emotion';
import type { ComponentSize } from '../';

export type { ButtonType } from './style';
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
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
  /** 扁平按钮 */
  flat?: boolean;
  /** 禁用按钮 */
  disabled?: boolean;
  /** 块按钮 */
  block?: boolean;
  /** 链接按钮 */
  link?: boolean;
  /** 危险按钮 */
  danger?: boolean;
  size?: ComponentSize;
}

const Button: React.FC<ButtonProps> = ({
  infinite,
  ghost,
  fill,
  circle,
  dashed,
  flat,
  link,
  danger,
  children,
  disabled,
  block,
  onClick,
  size = 'normal',
  type = 'default',
  className,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [animating, setAnimating] = useState(false);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (disabled) return;
      setAnimating(true);
      if (isFunction(onClick)) {
        onClick(e);
      }
    },
    [disabled, onClick]
  );
  const handleAnimationEnd = useCallback(() => {
    setAnimating(false);
  }, []);
  const tag = useMemo(() => (link ? 'a' : 'button'), [link]);

  return createElement(
    tag,
    {
      ...props,
      ref,
      onClick: handleClick,
      onAnimationEnd: handleAnimationEnd,
      className: cx(
        cls.btn,
        cls[type],
        cls[size],
        danger && cls.danger,
        block && cls.block,
        fill && cls.fill,
        circle && cls.circle,
        flat && cls.flat,
        dashed && cls.dashed,
        ghost && cls.ghost,
        infinite && cls.infinite,
        link && cls.link,
        disabled && cls.disabled,
        animating && cls.without,
        className
      ),
      disabled: disabled,
    },
    createElement(
      'span',
      {
        className: cls.label,
      },
      children
    )
  );
};

export default Button;
