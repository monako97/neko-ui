import { css } from '@moneko/css';

export const style = css`
  :host {
    inline-size: 100%;
  }

  .carousel {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: var(--border-radius);
    inline-size: 100%;
    block-size: 200px;
    color: #fff;
    user-select: none;
    line-height: normal;
    background-color: rgb(0 0 0 / 20%);

    & ::-webkit-scrollbar {
      display: none;
    }
  }

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    inline-size: 100%;
    min-inline-size: 100%;
    block-size: 100%;
    min-block-size: 100%;
    /* content-visibility: auto; */
    transform: translate3d(-100%, 0, 0);
  }

  .list {
    display: flex;
    border-radius: inherit;
    inline-size: 100%;
    block-size: 100%;
    transform: translate3d(0, 0, 0);

    &[data-dir='-1'] .item {
      animation: carousel-prev 500ms forwards;
    }

    &[data-dir='1'] .item {
      animation: carousel-next 500ms forwards;
    }
  }

  .prev,
  .next {
    position: absolute;
    z-index: 1;
    margin: auto;
    border-radius: var(--border-radius);
    font-size: 16px;
    font-weight: bold;
    transition: transform var(--transition-duration);
    inset-block: 0 0;
    inline-size: fit-content;
    block-size: fit-content;
    line-height: 1;
    cursor: pointer;

    &::before {
      display: inline-block;
      transform: rotate(90deg);
    }
  }

  .prev {
    inset-inline-start: 4px;
    transform: translateX(-32px) scaleY(0);

    &::before {
      content: '﹀';
    }
  }

  .next {
    inset-inline-end: 4px;
    transform: translateX(32px) scaleY(0);

    &::before {
      content: '︿';
    }
  }

  .dots {
    position: absolute;
    inset-inline: 0 0;
    inset-block-end: 16px;
    z-index: 1;
    display: flex;
    overflow: hidden;
    margin: 0 auto;
    inline-size: fit-content;
    max-inline-size: calc(100% - 42px);
    transition:
      transform var(--transition-duration) linear,
      opacity var(--transition-duration) linear;
    gap: 4px;
  }

  .dot {
    --offset: 0;

    border-radius: 2px;
    inline-size: 16px;
    min-inline-size: 8px;
    block-size: 3px;
    background-color: rgb(255 255 255 / 80%);
    transition: background-color var(--transition-duration) linear;
    cursor: pointer;

    &:hover,
    &.active {
      background-color: var(--primary-color);
    }
  }

  .header {
    position: absolute;
    inset-block-start: 0;
    z-index: 1;
    display: flex;
    inline-size: 100%;
    transition: transform var(--transition-duration);
    transform: translate3d(0, -100%, 0);
  }

  .carousel:hover {
    .prev,
    .next {
      &:not([data-show='false']) {
        transform: translateX(0) scaleY(1.5);
      }
    }

    .header {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes carousel-prev {
    0% {
      transform: translate3d(-100%, 0, 0);
    }

    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes carousel-next {
    0% {
      transform: translate3d(-100%, 0, 0);
    }

    100% {
      transform: translate3d(-200%, 0, 0);
    }
  }
`;
