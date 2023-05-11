import React, { useEffect, useMemo, useRef } from 'react';
import { isUndefined } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';

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
    const _store = carousel.current;

    return () => {
      if (_store.playTimer) {
        clearTimeout(_store.playTimer);
      }
      _store();
    };
  }, []);
  return (
    <section className={cx(cls.carousel, className)} style={style}>
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
      <div className={cls.prev} onClick={carousel.current.handlePrev} />
      <div className={cls.next} onClick={carousel.current.handleNext} />
      {dots ? (
        <div className={cls.dots}>
          {dotLen.map((_, i) => (
            <i
              key={i}
              className={cx(cls.dot, i === (offset % 20) + direction && cls.active)}
              onClick={() => (carousel.current.offset = Math.floor(offset / 20) * 20 + i)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default Carousel;
