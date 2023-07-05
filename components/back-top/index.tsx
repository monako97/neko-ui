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
import { baseStyle, theme } from '../theme';

const themeStyle = createMemo(() => {
  const bg = theme.scheme === 'dark' ? 'rgb(255 255 255 / 45%)' : 'var(--primary-border)';

  return `:host {--back-top-bg: ${bg};}`;
});

const style = css`
  :host {
    --back-top-color: var(--on-primary-selection);
    --back-top-hover-bg: var(--primary-hover);
  }

  .back-top {
    position: sticky;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: var(--back-top-color);
    background-color: var(--back-top-bg);
    box-shadow: var(--box-shadow-base);
    transition: background-color var(--transition-duration), color var(--transition-duration);
    inset-block-end: 50px;
    inset-inline-start: calc(100% - 100px);
    inline-size: 40px;
    min-inline-size: 40px;
    block-size: 40px;
    min-block-size: 40px;
    cursor: pointer;
    animation: back-top-fade-in 1s forwards;
    backdrop-filter: blur(16px);
    pointer-events: all;

    &::before {
      content: '';
      display: block;
      inline-size: 16px;
      block-size: 8px;
      background-color: var(--back-top-color);
      clip-path: polygon(0 100%, 50% 0, 100% 100%);
    }

    &:hover {
      background-color: var(--back-top-hover-bg);
    }
  }

  .back-top-out {
    animation: back-top-fade-out 1s forwards;
  }

  @keyframes back-top-fade-in {
    from {
      transform: translate3d(0, 16px, 0) scale(1);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
  }

  @keyframes back-top-fade-out {
    0%,
    20% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }

    100% {
      transform: translate3d(0, 16px, 0);
      opacity: 0;
    }
  }
`;

export interface BackTopProps {
  /** 设置需要监听其滚动事件的元素，值为一个selectors */
  target?: HTMLElement;
  /** 挂载到指定的元素，值为一个selectors 默认 body */
  mount?: HTMLElement;
  /** 滚动高度达到此参数值才出现 BackTop */
  visibilityHeight?: number;
  css?: string;
  class?: string;
}

function BackTop(_props: BackTopProps) {
  const props = mergeProps(
    { target: window as unknown as HTMLElement, visibilityHeight: 400 },
    _props
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

export interface BackTopElement extends BackTopProps {
  ref?: BackTopElement | { current: BackTopElement | null };
}

interface CustomElementTags {
  'n-back-top': BackTopElement;
}
declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
  }
}
declare global {
  export namespace JSX {
    export interface IntrinsicElements extends CustomElementTags, CustomElementTags {}
  }
}

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
      _
    );

    createEffect(() => {
      el.removeAttribute('css');
    });
    return createComponent(BackTop, props);
  }
);
export default BackTop;
