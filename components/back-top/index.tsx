import {
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  Show,
  splitProps,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { getMaxZindex, getScrollTop, isFunction } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import theme from '../theme';

import { style } from './style';

export interface BackTopProps {
  /** 设置需要监听其滚动事件的元素
   * @default window
   */
  target?: HTMLElement | (() => HTMLElement | undefined);
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
  const { baseStyle, isDark } = theme;
  const props = mergeProps({ target: window as unknown as HTMLElement, visibilityHeight: 400 }, _);
  const [local, other] = splitProps(props, ['class', 'target', 'mount', 'css', 'visibilityHeight']);
  const [show, setShow] = createSignal<boolean | null>(null);
  const target = createMemo(() => (isFunction(local.target) ? local.target() : local.target));

  const themeStyle = createMemo(() => {
    const bg = isDark() ? 'rgb(255 255 255 / 45%)' : 'var(--primary-border)';

    return `:host {--back-top-bg: ${bg};}`;
  });

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
    target()?.addEventListener('scroll', handleScrollY, false);
  });
  onCleanup(() => {
    target()?.removeEventListener('scroll', handleScrollY, false);
  });
  return (
    <Show when={show() !== null}>
      <Portal useShadow mount={local.mount}>
        <style textContent={baseStyle()} />
        <style textContent={themeStyle()} />
        <style textContent={style} />
        <Show when={local.css}>
          <style textContent={css(local.css)} />
        </Show>
        <div
          onAnimationEnd={exit}
          class={cx('back-top', local.class)}
          classList={{
            'back-top-out': show() === false,
          }}
          onClick={handleBackTop}
          style={{ 'z-index': getMaxZindex().toString() }}
          {...other}
        />
      </Portal>
    </Show>
  );
}

export type BackTopElement = CustomElement<BackTopProps>;

customElement<BackTopProps>(
  'n-back-top',
  {
    class: void 0,
    css: void 0,
    visibilityHeight: void 0,
    mount: void 0,
    target: void 0,
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
    return <BackTop {...props} />;
  },
);
export default BackTop;
