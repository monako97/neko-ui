import { createEffect, createSignal, For, mergeProps, Show } from 'solid-js';
import { isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import { clearAttribute, type JSXElement } from '../basic-config';
import theme, { block } from '../theme';

import { style } from './style';

export interface MarqueeProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 是否在 hover 时暂停
   * @default true
   */
  hoverPause?: boolean;
  /** 滚动速度（单位：秒）
   * @default 15
   */
  speed?: number;
  /** 是否使用遮罩
   * @default true
   */
  mask?: boolean;
  children?: JSXElement | JSXElement[];
}

/** 跑马灯 */
const Marquee = (_: MarqueeProps) => {
  const { baseStyle } = theme;
  let el: HTMLDivElement | undefined;
  const props = mergeProps(
    {
      speed: 15,
      hoverPause: true,
      mask: true,
    },
    _,
  );
  const [count, setCount] = createSignal(2);

  createEffect(() => {
    if (el) {
      const item = el.querySelector('.n-marquee-item') as HTMLDivElement;

      setCount(Math.ceil(el.offsetWidth / item.offsetWidth) + 1);
    }
  });
  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <div
        ref={el}
        class={cx(
          'n-marquee',
          props.mask && 'n-marquee-mask',
          props.hoverPause && 'n-marquee-hover-pause',
        )}
        style={{ '--speed': `${props.speed}s` }}
      >
        <For each={Array.from({ length: count() })}>
          {() => (
            <div class="n-marquee-item">
              {Array.isArray(props.children) ? (
                <For each={props.children}>
                  {(item) => {
                    const node = item as HTMLElement;
                    const next = isFunction(node.cloneNode) ? node.cloneNode(true) : node;

                    return next;
                  }}
                </For>
              ) : (
                props.children
              )}
            </div>
          )}
        </For>
      </div>
    </>
  );
};

export type MarqueeElement = CustomElement<MarqueeProps>;

Marquee.registry = () => {
  customElement<MarqueeProps>(
    'n-marquee',
    {
      class: void 0,
      css: void 0,
      speed: 15,
      hoverPause: true,
      mask: true,
    },
    (_, opt) => {
      const el = opt.element;
      const props = mergeProps(
        {
          children: [...el.childNodes.values()],
        },
        _,
      );

      createEffect(() => {
        clearAttribute(el, ['css']);
      });
      return (
        <>
          <style textContent={block} />
          <Marquee {...props} />
        </>
      );
    },
  );
};

export default Marquee;
