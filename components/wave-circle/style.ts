import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  circle: prefixCls('wave-circle'),
  wave: prefixCls('wave-circles'),
  waveAfter: prefixCls('wave-circles::after'),
  waveBefore: prefixCls('wave-circles::before'),
};

injectGlobal`
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
    inline-size: 100px;
    block-size: 100px;
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
    inset-block-start: 0;
    inset-inline-start: 0;
    border-radius: inherit;
    inline-size: 100%;
    block-size: 100%;
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
