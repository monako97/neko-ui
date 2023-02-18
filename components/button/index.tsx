import React, {
  type FC,
  type HTMLAttributes,
  type MouseEventHandler,
  useCallback,
  useRef,
  useState,
  useMemo,
} from 'react';
import { css, injectGlobal } from '@emotion/css';
import { classNames, isFunction } from '@moneko/common';
import prefixCls from '../prefix-cls';
import type { ComponentSize } from '../';

const cls: Record<string | ButtonType | ComponentSize | number | symbol, string> = {
  btn: prefixCls('btn'),
  text: prefixCls('btn-text'),
  primary: prefixCls('btn-primary'),
  warning: prefixCls('btn-warning'),
  error: prefixCls('btn-error'),
  danger: prefixCls('btn-danger'),
  success: prefixCls('btn-success'),
  infinite: prefixCls('btn-infinite'),
  block: prefixCls('btn-block'),
  dashed: prefixCls('btn-dashed'),
  fill: prefixCls('btn-fill'),
  circle: prefixCls('btn-circle'),
  ghost: prefixCls('btn-ghost'),
  link: prefixCls('btn-link'),
  float: prefixCls('btn-float'),
  disabled: prefixCls('btn-disabled'),
  without: prefixCls('btn-without'),
  default: prefixCls('btn-default'),
  large: prefixCls('btn-large'),
  small: prefixCls('btn-small'),
  normal: prefixCls('btn-normal'),
};

function btnColor(type: ButtonType) {
  return `
    .${cls[type]} {
      --btn-color: var(--${type}-color);
      --btn-border: var(--${type}-color-border);
      --btn-bg: var(--${type}-color-bg);
      --btn-hover-color: var(--${type}-color-hover);
      --btn-active-color: var(--${type}-color-active);
      --btn-outline-color: var(--${type}-color-outline);
    }
    .${cls[type]}.${cls.fill} {
      --btn-bg: var(--${type}-color);
      --btn-border: var(--${type}-color);
      --btn-hover-bg: var(--${type}-color-hover);
      --btn-active-bg: var(--${type}-color-active);
    }
  `;
}
const btnCss = css`
  :root {
    --disable-color: rgb(0 0 0 / 25%);
    --disable-bg: rgb(0 0 0 / 4%);
    --disable-border: #d9d9d9;
  }

  [data-theme='dark'] {
    --disable-color: rgb(255 255 255 / 25%);
    --disable-bg: rgb(255 255 255 / 8%);
    --disable-border: #424242;
  }
  .${cls.btn} {
    display: inline-block;
    border: 1px solid var(--btn-border);
    border-radius: var(--border-radius);
    padding: 4px 16px;
    width: fit-content;
    min-width: var(--btn-size);
    height: fit-content;
    min-height: var(--btn-size);
    font-size: var(--font-size, 14px);
    color: var(--btn-color);
    background-color: var(--btn-bg);
    outline-offset: 4px;
    line-height: 1;
    cursor: pointer;
    transition-timing-function: var(--transition-timing-function);
    transition-duration: var(--transition-duration);
    transition-property: color, background-color, border-color, width, height, transform;
    user-select: none;
    touch-action: manipulation;
    box-sizing: border-box;

    &:hover:not([disabled]) {
      border-color: var(--btn-hover-color);
      color: var(--btn-hover-color);
      background-color: var(--btn-bg);
    }

    &:active:not([disabled]) {
      border-color: var(--btn-active-color);
      color: var(--btn-active-color);
      background-color: var(--btn-bg);
      transform: scale(0.98);
    }
  }
  .${cls.text} {
    display: block;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .${cls.normal} {
    --btn-size: 2rem;
  }
  .${cls.small} {
    --btn-size: 1.5rem;

    padding: 0 7px;
    font-size: var(--font-size-xs, 10px);
  }
  .${cls.large} {
    --btn-size: 2.5rem;

    font-size: var(--font-size-lg, 16px);
  }
  .${cls.default} {
    --btn-outline-color: var(--primary-color-outline);
    --btn-color: var(--text-color);
    --btn-bg: var(--component-background, #fff);
    --btn-border: var(--border-color);
    --btn-hover-color: var(--primary-color-hover);
    --btn-active-color: var(--primary-color-active);
  }
  ${btnColor('primary')}
  ${btnColor('error')}
  ${btnColor('success')}
  ${btnColor('warning')}
  .${cls.fill} {
    &:not([disabled]):not(.${cls.default}) {
      color: #fff !important;

      &:hover {
        --btn-bg: var(--btn-hover-color) !important;
      }

      &:active {
        --btn-bg: var(--btn-active-color) !important;
      }
    }
  }
  .${cls.dashed} {
    border-style: dashed;
  }
  .${cls.float}, .${cls.link} {
    border-color: transparent !important;
    background-color: transparent;
  }
  .${cls.ghost}, .${cls.link} {
    background-color: transparent !important;
  }
  .${cls.circle} {
    border-radius: 50% !important;
    padding: 0;
    min-width: var(--btn-size);
    max-width: var(--btn-size);
    min-height: var(--btn-size);
    max-height: var(--btn-size);
    text-align: center;
    line-height: var(--btn-size);
  }
  .${cls.disabled}[disabled] {
    --btn-color: var(--disable-color);
    --btn-bg: var(--disable-bg);
    --btn-border: var(--disable-border);

    cursor: not-allowed;
  }
  .${cls.block} {
    width: 100%;
  }

  .${cls.without}, .${cls.infinite} {
    &:not(${cls.link}) {
      position: relative;

      &::before {
        position: absolute;
        display: block;
        border-radius: inherit;
        opacity: 0.2;
        box-shadow: 0 0 0 0 var(--btn-outline-color);
        inset: 0;
        animation: btn-wave-effect 0.3s cubic-bezier(1, 1, 1, 1);
        animation-fill-mode: forwards;
        content: '';
        pointer-events: none;
      }
    }
  }

  .${cls.infinite} {
    &:not(${cls.link})::before {
      opacity: 0.2;
      animation: btn-wave-effect 0.3s cubic-bezier(1, 1, 1, 0.99) infinite;
    }
  }

  @keyframes btn-wave-effect {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 var(--btn-outline-color);
    }

    25% {
      opacity: 1;
      box-shadow: 0 0 0 0.25rem var(--btn-outline-color);
    }

    100% {
      opacity: 0;
      box-shadow: 0 0 0 0.375rem var(--btn-outline-color);
    }
  }
`;

injectGlobal([btnCss]);

export type ButtonType = 'success' | 'error' | 'primary' | 'warning' | 'default';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
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
  size?: ComponentSize;
}

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
  size = 'normal',
  type = 'default',
  className,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [animating, setAnimating] = useState(false);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
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

  const btnCls = useMemo(
    () =>
      classNames(
        cls.btn,
        cls[type],
        cls[size],
        block && cls.block,
        fill && cls.fill,
        circle && cls.circle,
        float && cls.float,
        dashed && cls.dashed,
        ghost && cls.ghost,
        infinite && cls.infinite,
        link && cls.link,
        disabled && cls.disabled,
        animating && cls.without,
        className
      ),
    [
      animating,
      block,
      circle,
      className,
      dashed,
      disabled,
      fill,
      float,
      ghost,
      infinite,
      link,
      size,
      type,
    ]
  );

  return (
    <button
      {...props}
      ref={ref}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      className={btnCls}
      disabled={disabled}
    >
      <span className={cls.text}>{children}</span>
    </button>
  );
};

export default Button;
