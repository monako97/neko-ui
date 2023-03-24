import React, {
  useMemo,
  type FC,
  type HtmlHTMLAttributes,
  type ReactNode,
  type CSSProperties,
  useEffect,
} from 'react';
import { injectGlobal } from '@emotion/css';
import { classNames } from '@moneko/common';
import prefixCls from '../prefix-cls';

const cls = {
  circle: prefixCls('wave-circle'),
  wave: prefixCls('wave-circles'),
  waveAfter: prefixCls('wave-circles::after'),
  waveBefore: prefixCls('wave-circles::before'),
};
const waveCss = `
  :root {
    --wave-circles-bg-color: var(--primary-color, #5794ff);
  }

  .${cls.wave} {
    position: relative;
    z-index: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background: var(--wave-circles-bg-color);
    line-height: 1;
  }
  .${cls.waveAfter}, .${cls.waveBefore} {
    animation: wave-pulse-effect 5s var(--transition-timing-function) -1s infinite;
    content: '';
  }
  .${cls.waveAfter} {
    animation: wave-pulse-effect 5s linear -5s infinite;
  }
  .${cls.circle}, .${cls.waveAfter}, .${cls.waveBefore} {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    background: inherit;
  }
  .${cls.circle} {
    &:nth-of-type(1) {
      animation: wave-pulse-effect 5s -2s linear infinite;
    }

    &:nth-of-type(2) {
      animation: wave-pulse-effect 5s -3s linear infinite;
    }

    &:nth-of-type(3) {
      animation: wave-pulse-effect 5s -4s linear infinite;
    }
  }

  @keyframes wave-pulse-effect {
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

  useEffect(() => {
    injectGlobal([waveCss]);
  }, []);

  return (
    <div
      {...props}
      style={prefixStyles as CSSProperties}
      className={classNames(cls.wave, className)}
    >
      <i className={cls.circle} />
      <i className={cls.circle} />
      <i className={cls.circle} />
      {children}
    </div>
  );
};

export default WaveCircle;
