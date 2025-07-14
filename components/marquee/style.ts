import { css } from '@moneko/css';

export const style = css`
  .n-marquee {
    --speed: 15s;

    position: relative;
    display: flex;
    overflow: hidden;
    margin: auto;
    white-space: nowrap;
    inline-size: 100%;

    &.n-marquee-mask {
      &::before,
      &::after {
        content: '';
        position: absolute;
        z-index: 1000;
        inset-block-start: 0;
        inset-inline-start: 0;
        inline-size: 15rem;
        max-inline-size: 25%;
        block-size: 100%;
        background-image: linear-gradient(to right, var(--component-bg), transparent);
        pointer-events: none;
      }

      &::after {
        inset-inline: auto 0;
        background-image: linear-gradient(to left, var(--component-bg), transparent);
      }
    }
  }

  .n-marquee-item {
    display: flex;
    align-items: center;
    line-height: 1;
    gap: 4px;
    animation-duration: var(--speed);
    animation-iteration-count: infinite;
    animation-name: marquee-content;
    animation-timing-function: linear;
    padding: 0 24px;
  }

  .n-marquee-hover-pause {
    &:hover .n-marquee-item {
      animation-play-state: paused;
    }
  }

  @keyframes marquee-content {
    from {
      transform: translateX(0%);
    }

    to {
      transform: translateX(-100%);
    }
  }
`;
