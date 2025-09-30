import {
  createEffect,
  createMemo,
  createSignal,
  Index,
  mergeProps,
  onCleanup,
  Show,
} from 'solid-js';
import { isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute, type JSXElement } from '../basic-config';
import theme, { block } from '../theme';

import { style } from './style';

export interface CarouselProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 轮播的内容 */
  children?: JSXElement[];
  /** 当前内容的位置
   * @default 0
   */
  offset?: number;
  /** 开启指示器 */
  dots?: boolean;
  /** 设置自动播放时长, 不设置时不自动播放 */
  autoplay?: number;
  /** 自定义头部 */
  header?: (current: number) => JSXElement;
  /** 切换显示的位置时的回调方法 */
  onChange?: (e: number) => void;
}
export type CarouselElement = CustomElement<CarouselProps>;

function Carousel(_props: CarouselProps) {
  const { baseStyle } = theme;
  const props = mergeProps({ autoplay: -1, children: [] }, _props);
  const [left, setLeft] = createSignal(0);
  const [right, setRight] = createSignal(1);
  const [offset, setOffset] = createSignal(0);
  const [direction, setDirection] = createSignal<1 | -1 | 0>(0);
  let playTimer: NodeJS.Timeout | undefined;

  function onOffsetChange() {
    const _dir = direction();

    if (_dir === -1) {
      setOffset(left());
    } else if (_dir === 1) {
      setOffset(right());
    }
    setDirection(0);
    if (isFunction(props.onChange)) {
      props.onChange(offset());
    }
  }
  function handlePrev() {
    setDirection(-1);
  }
  function handleNext() {
    setDirection(1);
  }
  function handleDot(idx: number, e: Event) {
    e.stopPropagation();
    const _offset = offset();
    const _current = Math.floor(_offset / 20) * 20 + idx;

    if (_current > _offset) {
      setDirection(1);
      setRight(_current);
    } else if (_current < _offset) {
      setDirection(-1);
      setLeft(_current);
    }
  }
  function getPrevNext(idx: number, arr: JSXElement[]) {
    let _prev = idx - 1,
      _next = idx + 1;

    if (_prev < 0) {
      _prev = arr.length - 1;
    }
    if (_next > arr.length - 1) {
      _next = 0;
    }
    return [_prev, _next];
  }
  const list = createMemo(() => [...props.children]);
  const dotLen = createMemo(() => Array(list().length > 20 ? 20 : list().length).fill(null));

  createEffect(() => {
    if (props.offset !== void 0) {
      setOffset(Number(props.offset));
    }
  });
  createEffect(() => {
    const [_prev, _next] = getPrevNext(offset(), list());

    setLeft(_prev);
    setRight(_next);
  });
  createEffect(() => {
    clearInterval(playTimer);
    const autoplay = Number(props.autoplay);

    if (autoplay > 0) {
      playTimer = setInterval(() => {
        if (autoplay < 1) {
          clearInterval(playTimer);
        }
        handleNext();
      }, autoplay);
    }
  });

  onCleanup(() => {
    clearInterval(playTimer);
  });
  const header = createMemo(() =>
    isFunction(props.header) ? props.header(offset()) : props.header,
  );

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <section class={cx('carousel', props.class)}>
        <section class="list" data-dir={direction()}>
          <div class="item">{list()[left()]}</div>
          <div class="item" on:animationend={onOffsetChange}>
            {list()[offset()]}
          </div>
          <div class="item">{list()[right()]}</div>
        </section>
        <slot name="header" />
        <Show when={header()}>
          <section class="header">{header()}</section>
        </Show>
        <div class="prev" on:click={handlePrev} />
        <div class="next" on:click={handleNext} />
        <Show when={props.dots}>
          <div class="dots">
            <Index each={dotLen()}>
              {(_, idx) => {
                return (
                  <i
                    class="dot"
                    classList={{
                      active: idx === (offset() % 20) + direction(),
                    }}
                    on:click={handleDot.bind(null, idx)}
                  />
                );
              }}
            </Index>
          </div>
        </Show>
      </section>
    </>
  );
}

Carousel.registry = () => {
  customElement<CarouselProps>(
    'n-carousel',
    {
      children: void 0,
      autoplay: void 0,
      class: void 0,
      css: void 0,
      offset: void 0,
      dots: void 0,
      header: void 0,
      onChange: void 0,
    },
    (_, opt) => {
      const el = opt.element;
      const props = mergeProps(
        {
          onChange(key: number) {
            el.offset = key;
            el.dispatchEvent(
              new CustomEvent('change', {
                detail: key,
              }),
            );
          },
        },
        _,
      );

      createEffect(() => {
        clearAttribute(el, ['css']);
        el.replaceChildren();
      });
      return (
        <>
          <style textContent={block} />
          <Carousel {...props} />
        </>
      );
    },
  );
};
export default Carousel;
