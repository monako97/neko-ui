import React, { useEffect, useMemo, useRef } from 'react';
import { injectGlobal } from '@emotion/css';
import { classNames, isUndefined } from '@moneko/common';
import sso from 'shared-store-object';
import prefixCls from '../prefix-cls';

const cls = {
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
const carouselCss = `
  .${cls.carousel} {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: var(--border-radius);
    width: 100%;
    height: 200px;
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
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    content-visibility: auto;
    transform: translate3d(-100%, 0, 0);
  }

  .${cls.list} {
    display: flex;
    border-radius: inherit;
    width: 100%;
    height: 100%;
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
    top: 0;
    bottom: 0;
    z-index: 1;
    margin: auto;
    border-radius: var(--border-radius);
    width: fit-content;
    height: fit-content;
    transition: transform 0.3s;
    line-height: 1;
    cursor: pointer;

    &::before {
      content: '\ue63d';
    }
  }
  .${cls.prev} {
    left: 16px;
    transform: translateX(-32px) scaleY(0);
  }

  .${cls.next} {
    right: 16px;
    transform: translateX(32px) rotate(180deg) scaleY(0);
  }
  .${cls.dots} {
    position: absolute;
    right: 0;
    bottom: 16px;
    left: 0;
    z-index: 1;
    display: flex;
    overflow: hidden;
    margin: 0 auto;
    width: fit-content;
    max-width: calc(100% - 42px);
    transition: transform 0.3s, opacity 0.3s;
    gap: 4px;
  }

  .${cls.dot} {
    --offset: 0;

    border-radius: 2px;
    width: 8px;
    min-width: 8px;
    height: 3px;
    background-color: rgb(255 255 255 / 80%);
    transition: background-color 0.3s, width 0.3s;
    cursor: pointer;
    content-visibility: auto;

    &:hover,
    &.${cls.active} {
      width: 16px;
      min-width: 16px;
      background-color: var(--primary-color);
    }
  }

  .${cls.header} {
    position: absolute;
    top: 0;
    z-index: 1;
    display: flex;
    width: 100%;
    transition: transform 0.3s;
    transform: translate3d(0, -100%, 0);
  }

  .${cls.carousel}:hover {
    .${cls.prev} {
      &:not([data-show='false']) {
        transform: translateX(0) scaleY(1.5);
      }
    }

    .${cls.next} {
      &:not([data-show='false']) {
        transform: translateX(0) rotate(180deg) scaleY(1.5);
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

export interface CarouselProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode[];
  offset?: number;
  dots?: boolean;
  autoplay?: number;
  // eslint-disable-next-line no-unused-vars
  header?: (offset: number) => React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onOffsetChange?: (offset: number) => void;
}
function Carousel(props: CarouselProps) {
  const carousel = useRef(
    sso({
      prev: props.children.length - 1,
      offset: props.offset || 0,
      next: 1,
      direction: 0 as 1 | -1 | 0,
      playTimer: null as NodeJS.Timer | null,
      onOffsetChange() {
        if (carousel.current.direction === -1) {
          carousel.current.offset = carousel.current.prev;
        } else if (carousel.current.direction === 1) {
          carousel.current.offset = carousel.current.next;
        }
        carousel.current.direction = 0;
        props.onOffsetChange?.(carousel.current.offset);
      },
      handlePrev() {
        carousel.current.direction = -1;
      },
      handleNext() {
        carousel.current.direction = 1;
      },
    })
  );
  const { offset, prev, next, direction } = carousel.current;
  const { autoplay = -1, className, style, dots, children, header } = props;

  const dotLen = useMemo(
    () => Array(children.length > 20 ? 20 : children.length).fill(0),
    [children.length]
  );

  useEffect(() => {
    if (carousel.current.playTimer) {
      clearTimeout(carousel.current.playTimer);
    }
    if (autoplay > 0) {
      carousel.current.playTimer = setInterval(() => {
        if (autoplay < 1 && carousel.current.playTimer) {
          clearInterval(carousel.current.playTimer);
        }
        carousel.current.handleNext();
      }, autoplay);
    }
  }, [autoplay]);
  useEffect(() => {
    if (!isUndefined(props.offset)) {
      carousel.current.offset = props.offset;
    }
  }, [props.offset]);
  useEffect(() => {
    let _prev = offset - 1,
      _next = offset + 1;

    if (_prev < 0) {
      _prev = children.length - 1;
    }
    if (_next > children.length - 1) {
      _next = 0;
    }
    carousel.current.prev = _prev;
    carousel.current.next = _next;
  }, [children.length, offset]);
  useEffect(() => {
    injectGlobal([carouselCss]);
  }, []);

  return (
    <section className={classNames(cls.carousel, className)} style={style}>
      <section
        className={cls.list}
        data-dir={direction}
        onAnimationEnd={carousel.current.onOffsetChange}
      >
        <div className={cls.item}>{children[prev]}</div>
        <div className={cls.item}>{children[offset]}</div>
        <div className={cls.item}>{children[next]}</div>
      </section>
      {header ? <section className={cls.header}>{header(offset)}</section> : null}
      <div className={classNames('neko-icon', cls.prev)} onClick={carousel.current.handlePrev} />
      <div className={classNames('neko-icon', cls.next)} onClick={carousel.current.handleNext} />
      {dots ? (
        <div className={cls.dots}>
          {dotLen.map((_, i) => (
            <i
              key={i}
              className={classNames(cls.dot, i === (offset % 20) + direction && cls.active)}
              onClick={() => (carousel.current.offset = Math.floor(offset / 20) * 20 + i)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default Carousel;
