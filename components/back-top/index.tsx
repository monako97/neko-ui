import {
  Show,
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
} from 'solid-js';
import { getMaxZindex, getScrollTop } from '@moneko/common';
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

export interface BackTopProps {
  /** 设置需要监听其滚动事件的元素，值为一个selectors */
  target?: HTMLElement;
  /** 挂载到指定的元素，值为一个selectors 默认 body */
  mount?: HTMLElement;
  /** 滚动高度达到此参数值才出现 BackTop */
  visibilityHeight?: number;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
}

function BackTop(_props: BackTopProps) {
  const props = mergeProps(
    { target: window as unknown as HTMLElement, visibilityHeight: 400 },
    _props,
  );
  const [show, setShow] = createSignal<boolean | null>(null);

  function handleBackTop() {
    props.target?.scrollTo({
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
    const _target = props.target;

    if (_target) {
      scrollTop = getScrollTop(_target);
      offsetHeight = _target.offsetHeight;
    }
    const nextShow = scrollTop > offsetHeight / 3 || scrollTop > props.visibilityHeight;

    if (Boolean(show()) !== nextShow) {
      setShow(nextShow);
    }
    return false;
  }

  onMount(() => {
    props.target.addEventListener('scroll', handleScrollY, false);
  });
  onCleanup(() => {
    props.target.removeEventListener('scroll', handleScrollY, false);
  });
  return (
    <Show when={show() !== null}>
      <Portal useShadow mount={props.mount}>
        <style>
          {baseStyle()}
          {themeStyle()}
          {style}
          {css(props.css)}
        </style>
        <div
          onAnimationEnd={exit}
          class={cx('back-top', show() === false && 'back-top-out', props.class)}
          onClick={handleBackTop}
          style={{ 'z-index': getMaxZindex().toString() }}
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
