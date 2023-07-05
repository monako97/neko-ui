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

export interface ImgProps {
  src?: string;
  alt?: string;
  open?: boolean | null;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?(open: boolean | null): void;
  maskClosable?: boolean;
  escClosable?: boolean;
}

function Img(props: ImgProps) {
  const [open, setOpen] = createSignal<boolean | null>(null);
  const [posi, setPosi] = createSignal<DOMRect>();
  let portal: HTMLDivElement | undefined;

  function getCss() {
    const { width = 0, height = 0, top = 0, left = 0 } = posi() || {};

    return `.portal { --img: url(${props.src});inline-size: ${width}px; block-size: ${height}px;inset-block-start: ${top}px;inset-inline-start: ${left}px;}`;
  }
  function openChange(visi: boolean | null) {
    setOpen(visi);
    props.onOpenChange?.(visi);
  }
  function close(e: Event) {
    e.preventDefault();
    openChange(false);
  }
  function handleDestroy() {
    if (open() === false) {
      openChange(null);
    }
  }
  function handleOpen(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    setPosi((e.target as HTMLImageElement)?.getBoundingClientRect());
    openChange(true);
  }
  function portalClick(e: Event) {
    e.preventDefault();
    if (props.maskClosable && e.target === portal) {
      openChange(false);
    }
  }
  function handleWheel(e: WheelEvent | Event) {
    e.preventDefault();
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
        document.documentElement.addEventListener('mousewheel', handleWheel, {
          passive: false,
        });
      } else {
        document.documentElement.removeEventListener('mousewheel', handleWheel);
      }

      if (op === true && props.escClosable) {
        document.documentElement.addEventListener('keydown', close, false);
      } else {
        document.documentElement.removeEventListener('keydown', close, false);
      }
    });
  });

  // onCleanup(() => {
  //   setOpen(null);
  // });

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

export interface ImgElement extends ImgProps {
  ref?: ImgElement | { current: ImgElement | null };
}

interface CustomElementTags {
  'n-img': ImgElement;
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
            })
          );
        },
      },
      _
    );

    return createComponent(Img, props);
  }
);
export default Img;
