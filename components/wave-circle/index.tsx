import React, { type FC, useMemo, HtmlHTMLAttributes, ReactNode, CSSProperties } from 'react';
import { css, keyframes } from '@emotion/css';
import { classNames } from '@moneko/common';

const variablesCss = css`
  --wave-circles-bg-color: var(--primary-color);
  --transition-timing-function: var(--transition-timing-function);
`;
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }

  90% {
    transform: scale(3);
    opacity: 0;
  }

  100% {
    transform: scale(4);
    opacity: 0;
  }
`;
const inheritCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
`;
const waveCirclesCss = css`
  ${variablesCss}
  position: relative;
  z-index: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: auto;
  line-height: 1;
  background: var(--wave-circles-bg-color);
  border-radius: 50%;

  &::after,
  &::before {
    ${inheritCss}
    animation: ${pulse} 5s var(--transition-timing-function) -1s infinite;
    content: '';
  }

  &::after {
    animation: ${pulse} 5s linear -5s infinite;
  }
`;
const waveCircleCss = css`
  ${inheritCss}
  &:nth-of-type(1) {
    animation: ${pulse} 5s -2s linear infinite;
  }
  &:nth-of-type(2) {
    animation: ${pulse} 5s -3s linear infinite;
  }
  &:nth-of-type(3) {
    animation: ${pulse} 5s -4s linear infinite;
  }
`;

export interface WaveCircleProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /** 背景颜色 */
  bgColor?: string;
  /** 动画曲线 */
  timingFunction?: string;
  children?: ReactNode;
}

const WaveCircle: FC<WaveCircleProps> = ({
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
    <div
      {...props}
      style={prefixStyles as CSSProperties}
      className={classNames(waveCirclesCss, className)}
    >
      <i className={waveCircleCss} />
      <i className={waveCircleCss} />
      <i className={waveCircleCss} />
      {children}
    </div>
  );
};

export default WaveCircle;
