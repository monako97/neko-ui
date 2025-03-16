import { css } from '@moneko/css';

export const style = css`
  .portal {
    --opacity: 0;
    --scale: 0;
    --timing: ease-in;

    position: fixed;
    box-sizing: border-box;
    inset-block-start: 0;
    inset-inline-start: 0;
    inline-size: 100%;
    block-size: 100%;
    z-index: 99999;
    display: flex;

    &::before {
      position: absolute;
      z-index: -1;
      background-color: var(--mask-bg);
      opacity: var(--opacity);
      transition: opacity 0.2s var(--timing);
      inset-inline-start: 0;
      inset-block-start: 0;
      content: '';
      inline-size: 100%;
      block-size: 100%;
      pointer-events: none;
    }
  }

  .mask-blur::before {
    backdrop-filter: blur(10px);
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    cursor: auto;
  }

  .modal-footer {
    display: flex;
    gap: 8px;
    margin-block-start: 24px;
    justify-content: flex-end;
  }

  .modal-body {
    overflow: auto;
    max-block-size: calc(100vb - 150px);

    &::-webkit-scrollbar {
      inline-size: 5px;
      block-size: 5px;
    }
  }

  .modal-content {
    margin: auto;
    border-radius: var(--border-radius);
    padding: 20px 24px;
    background-color: var(--modal-component-bg);
    opacity: var(--opacity);
    box-shadow: var(--modal-box-shadow);
    cursor: grab;
    min-inline-size: 200px;
    max-inline-size: calc(100% - 32px);
    transform: translate3d(var(--x), var(--y), 1px) scale3d(var(--scale), var(--scale), 1);
    transition-property: transform, opacity;
    transition-duration: 0.2s;
    transition-timing-function: var(--timing);
    backdrop-filter: blur(10px);

    &:active {
      cursor: grabbing;
    }

    &.moveing {
      transition-property: none;
      transition-duration: none;
      transition-timing-function: none;
      user-select: none;

      * {
        pointer-events: none;
      }
    }

    &.centered {
      text-align: center;

      .modal-body,
      .modal-footer {
        justify-content: center;
        text-align: center;
      }
    }
  }

  .open {
    --opacity: 0;
    --timing: ease-in;

    animation: zoom-in 0.2s var(--timing) forwards;
  }

  .closeing {
    --opacity: 1;
    --timing: ease-out;

    animation: zoom-out 0.2s var(--timing) forwards;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .modal-title {
    flex: 1;
  }

  .modal-close {
    position: absolute;
    inset-inline-end: 10px;
    inset-block-start: 10px;

    &::part(label) {
      color: var(--text-color);
    }
  }

  @keyframes zoom-in {
    0% {
      --opacity: 0;
      --scale: 0;

      pointer-events: none;
    }

    100% {
      --opacity: 1;
      --scale: 1;
      --x: var(--movement-x);
      --y: var(--movement-y);
    }
  }

  @keyframes zoom-out {
    0% {
      --opacity: 1;
      --scale: 1;
      --x: var(--movement-x);
      --y: var(--movement-y);
    }

    100% {
      --opacity: 0;
      --scale: 0;

      pointer-events: none;
    }
  }
`;
