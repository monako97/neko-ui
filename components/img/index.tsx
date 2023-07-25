import {
  Show,
  batch,
  createComponent,
  createEffect,
  createSignal,
  mergeProps,
  untrack,
} from 'solid-js';
import { cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { Portal } from 'solid-js/web';
import { imgCss, style } from './style';
import type { CustomElement } from '..';

export interface ImgProps {
  /** 图片地址 */
  src?: string;
  /** 图片 alt */
  alt?: string;
  /** 大图查看 */
  open?: boolean | null;
  /** 开启关闭大图的回调函数 */
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean | null) => void;
  /** 点击遮罩关闭
   * @default false
   */
  maskClosable?: boolean;
  /** 通过 `esc` 按键关闭
   * @default true
   */
  escClosable?: boolean;
}
export type ImgElement = CustomElement<ImgProps>;

function Img(props: ImgProps) {
  const [open, setOpen] = createSignal<boolean | null>(null);
  const [posi, setPosi] = createSignal({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  let portal: HTMLDivElement | undefined;

  function getCss() {
    const { width, height, top, left } = posi();

    return `.portal { --img: url(${props.src});inline-size: ${width}px; block-size: ${height}px;inset-block-start: ${top}px;inset-inline-start: ${left}px;}`;
  }
  function openChange(visi: boolean | null) {
    setOpen(visi);
    props.onOpenChange?.(visi);
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
  function handleOpen(e: Event) {
    e.stopPropagation();
    preventDefault(e);
    setPosi((e.target as HTMLImageElement)?.getBoundingClientRect());
    openChange(true);
  }
  function portalClick(e: Event) {
    preventDefault(e);
    if (props.maskClosable && e.target === portal) {
      openChange(false);
    }
  }

  createEffect(() => {
    if (props.open !== undefined && props.open !== untrack(open)) {
      setOpen(props.open);
    }
  });
  createEffect(() => {
    batch(() => {
      const op = open();

      if (op === true) {
        document.documentElement.addEventListener('mousewheel', preventDefault, {
          passive: false,
        });
      } else {
        document.documentElement.removeEventListener('mousewheel', preventDefault);
      }

      if (op === true && props.escClosable) {
        document.documentElement.addEventListener('keydown', close, false);
      } else {
        document.documentElement.removeEventListener('keydown', close, false);
      }
    });
  });

  return (
    <>
      <style>{imgCss}</style>
      <img
        class={cx('img', open() && 'none')}
        src={props.src}
        alt={props.alt}
        onClick={handleOpen}
      />
      <Show when={open() !== null}>
        <Portal useShadow={true}>
          <style>
            {getCss()}
            {imgCss}
            {style}
          </style>
          <div
            ref={portal}
            class={cx('portal', open() ? 'open' : 'closeing')}
            onAnimationEnd={handleDestroy}
            onClick={portalClick}
          >
            <span class="close" onClick={close} />
            <img class="img" src={props.src} alt={props.alt} />
          </div>
        </Portal>
      </Show>
    </>
  );
}

customElement(
  'n-img',
  {
    src: undefined,
    alt: undefined,
    open: null as boolean | null,
    maskClosable: false,
    escClosable: true,
    onOpenChange: undefined,
  },
  (_, opt) => {
    const props = mergeProps(
      {
        onOpenChange(open: boolean | null) {
          opt.element.dispatchEvent(
            new CustomEvent('openchange', {
              detail: open,
            }),
          );
        },
      },
      _,
    );

    return createComponent(Img, props);
  },
);
export default Img;
