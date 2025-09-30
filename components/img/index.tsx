import {
  createEffect,
  createSignal,
  type JSX,
  mergeProps,
  onCleanup,
  Show,
  untrack,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { css } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute } from '../basic-config';
import { inline } from '../theme';

import ImgLazy from './lazy';
import { imgCss, style } from './style';

export interface ImgProps extends JSX.HTMLAttributes<HTMLImageElement> {
  /** 自定义样式表 */
  css?: string;
  /** 自定义类名 */
  class?: string;
  /** 图片地址 */
  src?: string;
  /** 查看大图的地址, 默认使用 `src`
   * @since 2.1.2
   */
  srcFull?: string;
  /** 图片 alt */
  alt?: string;
  /** 大图查看 */
  open?: boolean | null;
  /** 开启关闭大图的回调函数 */
  onOpenChange?: (open: boolean | null) => void;
  /** 图片加载完成 */
  onLoad?(e: Event): void;
  /** 点击遮罩关闭
   * @since 2.0.8
   * @default true
   */
  maskClosable?: boolean;
  /** 通过 `esc` 按键关闭
   * @default true
   */
  escClosable?: boolean;
  /**
   * 懒加载
   * @since 2.8.1
   * @default true
   */
  lazy?: boolean;
  /** 禁止点开大图
   * @since 2.8.3
   * @default false
   */
  disabled?: boolean;
}
export type ImgElement = CustomElement<ImgProps, 'onOpenChange'>;

function Img(_: ImgProps) {
  let portal: HTMLDivElement | undefined;
  const props = mergeProps(
    {
      maskClosable: true,
      escClosable: true,
      lazy: true,
      disabled: false,
    },
    _,
  );
  const [open, setOpen] = createSignal<boolean | null>(null);
  const [posi, setPosi] = createSignal({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  function getCss() {
    const { width, height, top, left } = posi();

    return `.portal {--img: url(${props.src});inline-size: ${width}px;block-size: ${height}px;inset-block-start: ${top}px;inset-inline-start: ${left}px;}`;
  }
  function openChange(visi: boolean | null) {
    if (!props.disabled) {
      setOpen(visi);
      props.onOpenChange?.(visi);
    }
  }
  function preventDefault(e: Event) {
    e.preventDefault();
  }
  function close(e: KeyboardEvent | Event) {
    preventDefault(e);
    if (e.type === 'keydown') {
      if (props.escClosable && (e as KeyboardEvent).key === 'Escape') {
        openChange(false);
      }
    } else {
      openChange(false);
    }
  }
  function handleDestroy() {
    if (open() === false) {
      openChange(null);
    }
  }
  function handleOpen(e: MouseEvent) {
    if (!props.disabled) {
      e.stopPropagation();
      preventDefault(e);
      if (e.target) {
        setPosi((e.target as HTMLImageElement).getBoundingClientRect());
      }
      openChange(true);
    }
  }
  function portalClick(e: Event) {
    preventDefault(e);
    if (props.maskClosable && e.target === portal) {
      openChange(false);
    }
  }

  createEffect(() => {
    if (props.open !== void 0 && props.open !== untrack(open)) {
      setOpen(props.open);
    }
  });
  createEffect(() => {
    if (open() === true) {
      document.documentElement.addEventListener('mousewheel', preventDefault, {
        passive: false,
      });

      if (props.escClosable) {
        document.documentElement.addEventListener('keydown', close, false);
      }
    }

    onCleanup(() => {
      document.documentElement.removeEventListener('mousewheel', preventDefault, false);
      document.documentElement.removeEventListener('keydown', close, false);
    });
  });

  return (
    <>
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <ImgLazy
        src={props.src}
        alt={props.alt}
        lazy={props.lazy}
        style={props.style}
        classList={{
          none: !!open(),
        }}
        onClick={handleOpen}
      />
      <Show when={open() !== null}>
        <Portal useShadow={true}>
          <style textContent={getCss()} />
          <style textContent={imgCss} />
          <style textContent={style} />
          <div
            ref={portal}
            class="portal"
            classList={{
              open: !!open(),
              closeing: !open(),
            }}
            on:animationend={handleDestroy}
            on:click={portalClick}
          >
            <span class="close" on:click={close} />
            <img class="img" src={props.srcFull || props.src} alt={props.alt} />
          </div>
        </Portal>
      </Show>
    </>
  );
}

Img.registry = () => {
  customElement<ImgProps>(
    'n-img',
    {
      class: void 0,
      css: void 0,
      alt: void 0,
      src: void 0,
      srcFull: void 0,
      open: null as boolean | null,
      maskClosable: void 0,
      escClosable: void 0,
      onOpenChange: void 0,
      onLoad: void 0,
      lazy: void 0,
      disabled: void 0,
    },
    (_, opt) => {
      const el = opt.element;
      const props = mergeProps(
        {
          onOpenChange(open: boolean | null) {
            opt.element.dispatchEvent(
              new CustomEvent('openchange', {
                detail: open,
              }),
            );
          },
          onLoad() {
            opt.element.dispatchEvent(new CustomEvent('load'));
          },
        },
        _,
      );

      createEffect(() => {
        clearAttribute(el, ['css']);
      });
      return (
        <>
          <style textContent={inline} />
          <Img {...props} />
        </>
      );
    },
  );
};
export default Img;
