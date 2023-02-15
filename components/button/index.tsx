import React, {
  type FC,
  type HTMLAttributes,
  type MouseEventHandler,
  useCallback,
  useRef,
  useState,
  CSSProperties,
} from 'react';
import { css, keyframes } from '@emotion/css';
import { classNames, isFunction } from '@moneko/common';

const waveEffect = keyframes`0% {
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  /** 块按钮 */
  block?: boolean;
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
  let bg = 'var(--component-background, rgba(255,255,255,0.8))';
  let hoverBg = bg;
  let activeBg = bg;
  let borderColor = 'var(--border-color-base)';
  let borderHover = `var(--primary-color-hover, #80b3ff)`;
  let borderActive = `var(--primary-color-active, #3f72d9)`;
  let color = `var(--text-color)`;
  let colorHover = `var(--primary-color-hover, #80b3ff)`;
  let colorActive = `var(--primary-color-active, #3f72d9)`;

  if (type !== 'default') {
    bg = `var(--${type}-color${fill ? '' : '-bg'})`;
    borderColor = `var(--${type}-color${fill ? '' : '-border'})`;
    borderHover = `var(--${type}-color-hover)`;
    borderActive = `var(--${type}-color-active)`;
    color = fill ? 'white' : `var(--${type}-color)`;
    colorHover = fill ? 'white' : `var(--${type}-color-hover)`;
    colorActive = fill ? 'white' : `var(--${type}-color-active)`;
    hoverBg = `var(--${type}-color-${fill ? 'hover' : 'bg'})`;
    activeBg = `var(--${type}-color-${fill ? 'active' : 'bg'})`;
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
    border-style: ${dashed ? 'dashed' : 'solid'};
    border-color: ${borderColor};
    border-radius: ${circle ? '50%' : 'var(--border-radius-base)'};
    padding: ${circle ? 0 : '8px 16px'};
    min-width: ${circle ? '32px' : '22px'};
    max-width: ${circle ? '32px' : 'unset'};
    min-height: ${circle ? '32px' : '22px'};
    max-height: ${circle ? '32px' : 'unset'};
    color: ${color};
    background-color: ${bg};
    line-height: ${circle ? '32px' : 1};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    opacity: ${disabled ? 0.7 : 1};

    &:hover {
      border-color: ${borderHover};
      color: ${colorHover};
      background-color: ${hoverBg};
    }

    &:active {
      transform: scale(${disabled ? 1 : 0.95});
      border-color: ${borderActive};
      color: ${colorActive};
      background-color: ${activeBg};
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
  block,
  onClick,
  type = 'default',
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);
  const getBaseStyle = () => {
    return css`
      position: relative;
      display: inline-block;
      border-width: 1px;
      width: ${block ? '100%' : 'fit-content'};
      height: fit-content;
      text-align: center;
      outline-offset: 4px;
      transition-timing-function: var(--transition-timing-function);
      transition-duration: var(--transition-duration);
      transition-property: color, background-color, border-color, width, height, transform;
      user-select: none;
      touch-action: manipulation;
      box-sizing: border-box;

      &::before {
        position: absolute;
        display: block;
        border-radius: inherit;
        opacity: 0.2;
        box-shadow: 0 0 0 0 var(--wave-shadow-color);
        inset: 0;
        pointer-events: none;
      }

      &:last-of-type {
        margin-right: 0;
      }
    `;
  };

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
      style={
        {
          '--wave-shadow-color': `var(--${type === 'default' ? 'primary' : type}-color-outline)`,
        } as CSSProperties
      }
    >
      <span className={btnTextCss}>{children}</span>
    </div>
  );
};

export default Button;
