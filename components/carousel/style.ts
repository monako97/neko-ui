import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  carousel: prefixCls('carousel'),
  item: prefixCls('carousel-item'),
  list: prefixCls('carousel-list'),
  prev: prefixCls('carousel-prev'),
  next: prefixCls('carousel-next'),
  dot: prefixCls('carousel-dot'),
  active: prefixCls('carousel-dot-active'),
  dots: prefixCls('carousel-dots'),
  header: prefixCls('carousel-header'),
};

injectGlobal`
  .${cls.carousel} {
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

  .${cls.item} {
    display: flex;
    justify-content: center;
    align-items: center;
    inline-size: 100%;
    min-inline-size: 100%;
    block-size: 100%;
    min-block-size: 100%;
    content-visibility: auto;
    transform: translate3d(-100%, 0, 0);
  }

  .${cls.list} {
    display: flex;
    border-radius: inherit;
    inline-size: 100%;
    block-size: 100%;
    transform: translate3d(0, 0, 0);

    &[data-dir='-1'] .${cls.item} {
      animation: carousel-prev 500ms forwards;
    }
    &[data-dir='1'] .${cls.item} {
      animation: carousel-next 500ms forwards;
    }
  }
  .${cls.prev}, .${cls.next} {
    position: absolute;
    z-index: 1;
    margin: auto;
    border-radius: var(--border-radius);
    font-size: 16px;
    font-weight: bold;
    transition: transform 0.3s;
    inset-block-start: 0;
    inset-block-end: 0;
    inline-size: fit-content;
    block-size: fit-content;
    line-height: 1;
    cursor: pointer;

    &::before {
      display: inline-block;
      transform: rotate(90deg);
    }
  }
  .${cls.prev} {
    inset-inline-start: 4px;
    transform: translateX(-32px) scaleY(0);

    &::before {
      content: '﹀';
    }
  }

  .${cls.next} {
    inset-inline-end: 4px;
    transform: translateX(32px) scaleY(0);

    &::before {
      content: '︿';
    }
  }
  .${cls.dots} {
    position: absolute;
    inset-inline-end: 0;
    inset-block-end: 16px;
    inset-inline-start: 0;
    z-index: 1;
    display: flex;
    overflow: hidden;
    margin: 0 auto;
    inline-size: fit-content;
    max-inline-size: calc(100% - 42px);
    transition: transform 0.3s, opacity 0.3s;
    gap: 4px;
  }

  .${cls.dot} {
    --offset: 0;

    border-radius: 2px;
    inline-size: 8px;
    min-inline-size: 8px;
    block-size: 3px;
    background-color: rgb(255 255 255 / 80%);
    transition: background-color 0.3s, width 0.3s;
    cursor: pointer;
    content-visibility: auto;

    &:hover,
    &.${cls.active} {
      inline-size: 16px;
      min-inline-size: 16px;
      background-color: var(--primary-color);
    }
  }

  .${cls.header} {
    position: absolute;
    inset-block-start: 0;
    z-index: 1;
    display: flex;
    inline-size: 100%;
    transition: transform 0.3s;
    transform: translate3d(0, -100%, 0);
  }

  .${cls.carousel}\:hover {
    .${cls.prev}, .${cls.next} {
      &:not([data-show='false']) {
        transform: translateX(0) scaleY(1.5);
      }
    }

    .${cls.header} {
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
