import { css } from '@moneko/css';

export const popoverCss = css`
  .popover {
    position: relative;
    display: inline-block;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      inline-size: 1px;
    }
  }
`;
export const portalCss = css`
  .container {
    overflow-y: auto;
    /* stylelint-disable-next-line */
    max-block-size: -webkit-fill-available;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .portal {
    --direction: 1;

    position: fixed;
    display: inline-block;
    border-radius: var(--border-radius);
    padding: 4px;
    font-size: var(--font-size);
    white-space: break-spaces;
    color: var(--text-color);
    background-color: var(--popover-bg);
    filter: drop-shadow(0.5px calc(var(--direction) * 1px) 4px var(--popover-shadow-color))
      drop-shadow(1px calc(var(--direction) * 2px) 8px var(--popover-shadow-color))
      drop-shadow(2px calc(var(--direction) * 4px) 16px var(--popover-shadow-color));
    min-inline-size: 100px;
    backdrop-filter: blur(10px);
    box-sizing: border-box;
  }

  .arrow {
    &::before {
      position: absolute;
      inset-inline: 0;
      inset-block-end: 0;
      margin: auto;
      inline-size: 12px;
      block-size: 8px;
      background: inherit;
      content: '';
      clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
      transform: translate3d(var(--x, 0), 100%, 0);
    }
  }

  .in-up {
    --direction: -1;

    animation: popover-up-in-effect var(--transition-duration) forwards;
    transform: scaleY(1);
  }

  .out-up {
    --direction: -1;

    animation: popover-up-out-effect var(--transition-duration) forwards;
    transform: scaleY(1);
  }

  .in-down {
    --direction: 1;

    animation: popover-down-in-effect var(--transition-duration) forwards;
    transform: scaleY(1);

    &::before {
      inset-block-end: unset;
      inset-block-start: 0;
      transform: translate3d(var(--x, 0), -100%, 0) rotate(180deg);
    }
  }

  .out-down {
    --direction: 1;

    animation: popover-down-out-effect var(--transition-duration) forwards;
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
