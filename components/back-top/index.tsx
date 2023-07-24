import {
  type JSX,
  Show,
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';
import { getMaxZindex, getScrollTop, isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { Portal } from 'solid-js/web';
import { style } from './style';
import { baseStyle, theme } from '../theme';
import type { CustomElement } from '..';

const themeStyle = createMemo(() => {
  const bg = theme.scheme === 'dark' ? 'rgb(255 255 255 / 45%)' : 'var(--primary-border)';

  return `:host {--back-top-bg: ${bg};}`;
});

export interface BackTopProps extends Omit<JSX.ButtonHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 设置需要监听其滚动事件的元素
   * @default window
   */
  target?: HTMLElement | (() => HTMLElement);
  /** 挂载到指定的元素
   * @default body
   */
  mount?: HTMLElement;
  /** 滚动高度达到此参数值才出现 BackTop */
  visibilityHeight?: number;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
}

function BackTop(_: BackTopProps) {
  const props = mergeProps({ target: window as unknown as HTMLElement, visibilityHeight: 400 }, _);
  const [local, other] = splitProps(props, [
    'class',
    'target',
    'mount',
    'css',
    'visibilityHeight',
    'onAnimationEnd',
    'ref',
    'style',
    'onClick',
  ]);
  const [show, setShow] = createSignal<boolean | null>(null);
  const target = createMemo(() => (isFunction(local.target) ? local.target() : local.target));

  function handleBackTop() {
    target()?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  function exit() {
    if (show() === false) {
      setShow(null);
    }
  }
  function handleScrollY(e: Event) {
    e.preventDefault();
    let scrollTop = 0;
    let offsetHeight = 0;
    const _target = target();

    if (_target) {
      scrollTop = getScrollTop(_target);
      offsetHeight = _target.offsetHeight || 0;
    }
    const nextShow = scrollTop > offsetHeight / 3 || scrollTop > local.visibilityHeight;

    if (Boolean(show()) !== nextShow) {
      setShow(nextShow);
    }
    return false;
  }

  onMount(() => {
    target().addEventListener('scroll', handleScrollY, false);
  });
  onCleanup(() => {
    target().removeEventListener('scroll', handleScrollY, false);
  });
  return (
    <Show when={show() !== null}>
      <Portal useShadow mount={local.mount}>
        <style>
          {baseStyle()}
          {themeStyle()}
          {style}
          {css(local.css)}
        </style>
        <div
          onAnimationEnd={exit}
          class={cx('back-top', show() === false && 'back-top-out', local.class)}
          onClick={handleBackTop}
          style={{ 'z-index': getMaxZindex().toString() }}
          {...other}
        />
      </Portal>
    </Show>
  );
}

export type BackTopElement = CustomElement<BackTopProps>;

customElement(
  'n-back-top',
  {
    class: undefined,
    css: undefined,
    visibilityHeight: undefined,
    mount: undefined,
    target: undefined,
  },
  (_, opt) => {
    const el = opt.element;

    if (!el.mount) {
      el.style.position = 'sticky';
      el.style.bottom = '24px';
      el.style.right = '24px';
      el.style.display = 'block';
      el.style.pointerEvents = 'none';
    }
    const props = mergeProps(
      {
        class: el.class,
        css: el.css,
        visibilityHeight: el.visibilityHeight,
        mount: el.renderRoot as HTMLElement,
        target: el.target,
      },
      _,
    );

    createEffect(() => {
      el.removeAttribute('css');
    });
    return createComponent(BackTop, props);
  },
);
export default BackTop;
