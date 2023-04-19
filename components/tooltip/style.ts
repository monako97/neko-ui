import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  tooltip: prefixCls('tooltip'),
  portal: prefixCls('tooltip-portal'),
  inUp: prefixCls('tooltip-in-up'),
  outUp: prefixCls('tooltip-out-up'),
};

injectGlobal`
  :root {
    --tooltip-bg: rgb(255 255 255 / 80%);
    --tooltip-shadow-color: rgb(0 0 0 / 10%);
  }

  [data-theme='dark'] {
    --tooltip-bg: rgb(0 0 0 / 80%);
    --tooltip-shadow-color: rgb(255 255 255 / 5%);
  }

  .${cls.tooltip} {
    position: relative;
    display: inline-block;

    &::-webkit-scrollbar {
      inline-size: 1px;
    }
  }
  .${cls.portal} {
    position: fixed;
    display: inline-block;
    border-radius: var(--border-radius);
    padding: 4px 8px;
    font-size: var(--font-size);
    color: var(--text-color);
    background-color: var(--tooltip-bg);
    filter: drop-shadow(0.5px 1px 4px var(--tooltip-shadow-color))
      drop-shadow(1px 2px 8px var(--tooltip-shadow-color))
      drop-shadow(2px 4px 16px var(--tooltip-shadow-color));
    backdrop-filter: blur(16px);

    &::before {
      position: absolute;
      inset-inline-end: 0;
      inset-block-end: 0;
      inset-inline-start: 0;
      margin: auto;
      inline-size: 12px;
      block-size: 8px;
      background: inherit;
      content: '';
      clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
      transform: translateY(100%);
    }
  }
  .${cls.inUp} {
    animation: tooltip-slide-down-in-effect 0.3s forwards;
    transform: scaleY(1);
  }
  .${cls.outUp} {
    animation: tooltip-slide-down-out-effect 0.3s forwards;
    transform: scaleY(1);
  }

  @keyframes tooltip-slide-down-in-effect {
    0% {
      transform: scaleY(0.8);
      transform-origin: 100% 100%;
      opacity: 0;
    }

    100% {
      transform: scaleY(1);
      transform-origin: 100% 100%;
      opacity: 1;
    }
  }

  @keyframes tooltip-slide-down-out-effect {
    0% {
      transform: scaleY(1);
      transform-origin: 100% 100%;
      opacity: 1;
    }

    100% {
      transform: scaleY(0.8);
      transform-origin: 100% 100%;
      opacity: 0;
    }
  }
`;
