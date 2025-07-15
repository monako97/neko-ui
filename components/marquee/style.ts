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
      mask-image: linear-gradient(
        to right,
        transparent 0,
        var(--component-bg) 25%,
        var(--component-bg) 75%,
        transparent 100%
      );
      mask-composite: intersect;
    }
  }

  .n-marquee-item {
    display: flex;
    align-items: center;
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
      transform: translate3d(0%, 0, 0);
    }

    to {
      transform: translate3d(-100%, 0, 0);
    }
  }
`;
