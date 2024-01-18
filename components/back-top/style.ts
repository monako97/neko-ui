import { css } from '@moneko/css';

export const style = css`
  :host {
    --back-top-color: var(--on-primary-selection);
    --back-top-hover-bg: var(--primary-hover);
  }

  .back-top {
    position: sticky;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: var(--back-top-color);
    background-color: var(--back-top-bg);
    box-shadow: var(--box-shadow-base);
    transition:
      background-color var(--transition-duration),
      color var(--transition-duration);
    inset-block-end: 50px;
    inset-inline-start: calc(100% - 100px);
    inline-size: 40px;
    min-inline-size: 40px;
    block-size: 40px;
    min-block-size: 40px;
    cursor: pointer;
    animation: back-top-fade-in 1s forwards;
    backdrop-filter: blur(10px);
    pointer-events: all;

    &::before {
      content: '';
      display: block;
      inline-size: 16px;
      block-size: 8px;
      background-color: var(--back-top-color);
      clip-path: polygon(0 100%, 50% 0, 100% 100%);
    }

    &:hover {
      background-color: var(--back-top-hover-bg);
    }
  }

  .back-top-out {
    animation: back-top-fade-out 1s forwards;
  }

  @keyframes back-top-fade-in {
    from {
      transform: translate3d(0, 16px, 0) scale(1);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
  }

  @keyframes back-top-fade-out {
    0%,
    20% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }

    100% {
      transform: translate3d(0, 16px, 0);
      opacity: 0;
    }
  }
`;
