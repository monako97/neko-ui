import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  popover: prefixCls('popover'),
  portal: prefixCls('popover-portal'),
  arrow: prefixCls('popover-arrow'),
  inUp: prefixCls('popover-in-up'),
  outUp: prefixCls('popover-out-up'),
  inDown: prefixCls('popover-in-down'),
  outDown: prefixCls('popover-out-down'),
};

injectGlobal`
  :root {
    --popover-bg: var(--component-bg);
    --popover-shadow-color: rgb(0 0 0 / 5%);
  }

  [data-theme='dark'] {
    --popover-bg: #1f1f1f;
  }

  .${cls.popover} {
    position: relative;
    display: inline-block;

    &::-webkit-scrollbar {
      inline-size: 1px;
    }
  }
  .${cls.portal} {
    --direction: 1;

    min-inline-size: 100px;
    position: fixed;
    display: inline-block;
    border-radius: var(--border-radius);
    padding: 4px;
    font-size: var(--font-size);
    color: var(--text-color);
    background-color: var(--popover-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-sizing: border-box;
    filter: drop-shadow(0.5px calc(var(--direction) * 1px) 4px var(--popover-shadow-color))
      drop-shadow(1px calc(var(--direction) * 2px) 8px var(--popover-shadow-color))
      drop-shadow(2px calc(var(--direction) * 4px) 16px var(--popover-shadow-color));
  }
  .${cls.arrow} {
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
      transform: translate3d(var(--x, 0), 100%, 0);
    }
  }
  .${cls.inUp} {
    --direction: -1;

    animation: popover-up-in-effect 0.3s forwards;
    transform: scaleY(1);
  }
  .${cls.outUp} {
    --direction: -1;

    animation: popover-up-out-effect 0.3s forwards;
    transform: scaleY(1);
  }

  .${cls.inDown} {
    --direction: 1;

    animation: popover-down-in-effect 0.3s forwards;
    transform: scaleY(1);

    &::before {
      inset-block-end: unset;
      inset-block-start: 0;
      transform: translate3d(var(--x, 0), -100%, 0) rotate(180deg);
    }
  }
  .${cls.outDown} {
    --direction: 1;

    animation: popover-down-out-effect 0.3s forwards;
    transform: scaleY(1);

    &::before {
      inset-block-end: unset;
      inset-block-start: 0;
      transform: translate3d(var(--x, 0), -100%, 0) rotate(180deg);
    }
  }

  @keyframes popover-down-in-effect {
    0% {
      transform: scaleY(0.8);
      transform-origin: 0% 0%;
      opacity: 0;
    }

    100% {
      transform: scaleY(1);
      transform-origin: 0% 0%;
      opacity: 1;
    }
  }

  @keyframes popover-down-out-effect {
    0% {
      transform: scaleY(1);
      transform-origin: 0% 0%;
      opacity: 1;
      pointer-events: none;
    }

    100% {
      transform: scaleY(0.8);
      transform-origin: 0% 0%;
      opacity: 0;
      pointer-events: none;
    }
  }

  @keyframes popover-up-in-effect {
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

  @keyframes popover-up-out-effect {
    0% {
      transform: scaleY(1);
      transform-origin: 100% 100%;
      opacity: 1;
      pointer-events: none;
    }

    100% {
      transform: scaleY(0.8);
      transform-origin: 100% 100%;
      opacity: 0;
      pointer-events: none;
    }
  }
`;
