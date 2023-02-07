import React, { FC, HTMLAttributes, MouseEventHandler, useCallback, useRef, useState } from 'react';
import { classNames, isFunction } from '@moneko/common';
import { css, keyframes } from '@emotion/css';

const waveEffect = keyframes`
  0% {
    opacity: 1;
    box-shadow: 0 0 0 var(--wave-shadow-color);
  }
  25% {
    opacity: 1;
    box-shadow: 0 0 0 4px var(--wave-shadow-color);
  }
  100% {
    opacity: 0;
    box-shadow: 0 0 0 6px var(--wave-shadow-color);
  }
`;
const btnTextCss = css`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export type ButtonType = 'success' | 'error' | 'primary' | 'warning' | 'default';

export interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
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
const getAnimationCss = (animating?: boolean, link?: boolean, infinite?: boolean) => {
  let animation = css``;

  if ((animating || infinite) && !link) {
    animation = css`
      &::before {
        animation: ${waveEffect} 0.3s cubic-bezier(1, 1, 1, ${infinite ? 0.99 : 1})
          ${infinite ? 'infinite' : ''} forwards;
        content: '';
      }
    `;
  }
  return animation;
};

const getStatusCss = (
  type: ButtonType,
  fill?: boolean,
  float?: boolean,
  ghost?: boolean,
  link?: boolean,
  circle?: boolean,
  dashed?: boolean,
  disabled?: boolean
) => {
  let bg = 'var(--component-background, white)';
  let hoverBg = bg;
  let activeBg = bg;
  let borderColor = 'var(--border-color-base)';
  let borderHover = `var(--primary-color-hover)`;
  let borderActive = `var(--primary-color-active)`;
  let color = `var(--text-color)`;
  let colorHover = `var(--primary-color-hover)`;
  let colorActive = `var(--primary-color-active)`;

  if (type !== 'default') {
    bg = `var(--${type}-color${fill ? '' : '-deprecated-bg'})`;
    borderColor = `var(--${type}-color${fill ? '' : '-deprecated-border'})`;
    borderHover = `var(--${type}-color-hover)`;
    borderActive = `var(--${type}-color-active)`;
    color = fill ? 'white' : `var(--${type}-color)`;
    colorHover = fill ? 'white' : `var(--${type}-color-hover)`;
    colorActive = fill ? 'white' : `var(--${type}-color-active)`;
    hoverBg = `var(--${type}-color-${fill ? 'hover' : 'deprecated-bg'})`;
    activeBg = `var(--${type}-color-${fill ? 'active' : 'deprecated-bg'})`;
  }
  if (ghost || link) {
    bg = 'transparent';
    hoverBg = 'transparent';
    activeBg = 'transparent';
  }
  if (float || link) {
    borderColor = 'transparent';
    borderHover = 'transparent';
    borderActive = 'transparent';
  }

  return css`
    --wave-shadow-color: var(--${type === 'default' ? 'primary' : type}-color-outline);
    color: ${color};
    background-color: ${bg};
    border-color: ${borderColor};
    min-width: ${circle ? '32px' : '22px'};
    min-height: ${circle ? '32px' : '22px'};
    max-width: ${circle ? '32px' : 'unset'};
    max-height: ${circle ? '32px' : 'unset'};
    line-height: ${circle ? '32px' : 1};
    padding: ${circle ? 0 : '8px 16px'};
    border-radius: ${circle ? '50%' : 'var(--border-radius-base)'};
    border-style: ${dashed ? 'dashed' : 'solid'};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};

    &:hover {
      color: ${colorHover};
      background-color: ${hoverBg};
      border-color: ${borderHover};
    }
    &:active {
      color: ${colorActive};
      background-color: ${activeBg};
      border-color: ${borderActive};
    }
  `;
};
const getBaseStyle = () => {
  return css`
    position: relative;
    outline-offset: 4px;
    display: inline-block;
    width: fit-content;
    height: fit-content;
    border-width: 1px;
    transition-timing-function: var(--transition-timing-function);
    transition-duration: var(--transition-duration);
    transition-property: color, background-color, border-color, width, height;
    user-select: none;
    touch-action: manipulation;
    box-sizing: border-box;
    text-align: center;

    &::before {
      position: absolute;
      inset: 0;
      display: block;
      border-radius: inherit;
      box-shadow: 0 0 0 0 var(--wave-shadow-color);
      opacity: 0.2;
      pointer-events: none;
    }
    &:last-of-type {
      margin-right: 0;
    }
  `;
};

const Button: FC<ButtonProps> = ({
  infinite,
  ghost,
  fill,
  circle,
  dashed,
  float,
  link,
  children,
  disabled,
  onClick,
  type = 'default',
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
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

  return (
    <div
      {...props}
      ref={ref}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      className={classNames(
        getBaseStyle(),
        getStatusCss(type, fill, float, ghost, link, circle, dashed, disabled),
        getAnimationCss(animating, link, infinite),
        className
      )}
    >
      <span className={btnTextCss}>{children}</span>
    </div>
  );
};

export default Button;
