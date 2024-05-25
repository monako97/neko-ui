import {
  Show,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  untrack,
} from 'solid-js';
import { customElement } from 'solid-element';
import { Portal } from 'solid-js/web';
import modalStore from './store';
import { style } from './style';
import '../button';
import type { CustomElement } from '..';

/**
 * API
 * @since 2.6.0
 */
export interface ModalProps {
  /** 是否打开模态框 */
  open?: OpenStateKey;
  /** 开启关闭的回调函数 */
  onOpenChange?: (open: OpenStateKey) => void;
  /** 点击遮罩关闭
   * @default true
   */
  maskClosable?: boolean;
  /** 通过 `esc` 按键关闭
   * @default true
   */
  escClosable?: boolean;
  /**
   * 自定义关闭图标, 设置为 null 或 false 时隐藏关闭按钮
   */
  closeIcon?: JSX.Element | null;
  /** 内容 */
  content: JSX.Element;
  /** 标题 */
  title?: JSX.Element;
  /** 遮罩模糊
   * @default false
   */
  maskBlur?: boolean;
}

/**
 * OpenStateKey
 */
export enum OpenState {
  /** 完全关闭 */
  closed = 'closed',
  /** 正在关闭 */
  closeing = 'closeing',
  /** 打开 */
  open = 'open',
}
export type OpenStateKey = keyof typeof OpenState;
export type ModalElement = CustomElement<ModalProps, 'onOpenChange'>;

function Modal(props: ModalProps) {
  const doc = document.documentElement;
  const { setNum } = modalStore;
  const [open, setOpen] = createSignal<OpenStateKey>('closed');
  const [posi, setPosi] = createSignal({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  let portal: HTMLDivElement | undefined;

  const getCss = createMemo(() => {
    const { x, y, width, height } = posi();

    return `.portal { --y: ${-(y - height / 2)}px;--x: ${-(x - width / 2)}px;}`;
  });

  function openChange(visi: OpenStateKey) {
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
        openChange(OpenState.closeing);
      }
    } else {
      openChange(OpenState.closeing);
    }
  }
  function handleDestroy() {
    if (open() === OpenState.closeing) {
      openChange(OpenState.closed);
    }
  }
  function portalClick(e: Event) {
    preventDefault(e);
    if (props.maskClosable && e.target === portal) {
      openChange(OpenState.closeing);
    }
  }

  createEffect(() => {
    if (props.open !== void 0 && props.open !== untrack(open)) {
      setOpen(props.open);
    }
  });

  function point(e: MouseEvent) {
    setPosi((prev) => ({
      ...prev,
      x: doc.clientWidth / 2 - e.clientX,
      y: doc.clientHeight / 2 - e.clientY,
    }));
  }
  createEffect(() => {
    if (open() === OpenState.open) {
      setNum((prev) => prev + 1);
      doc.addEventListener('mousewheel', preventDefault, {
        passive: false,
      });

      if (props.escClosable) {
        doc.addEventListener('keydown', close, false);
      }
    } else if (open() === OpenState.closeing) {
      setNum((prev) => prev - 1);
    } else {
      doc.addEventListener('click', point, true);
    }

    onCleanup(() => {
      doc.removeEventListener('mousewheel', preventDefault, false);
      doc.removeEventListener('keydown', close, false);
      doc.removeEventListener('click', point, true);
    });
  });
  const closeIcon = createMemo(() => {
    if (props.closeIcon === null || props.closeIcon === false) {
      return null;
    }
    if (['function', 'object'].includes(typeof props.closeIcon)) {
      return () => <span class="modal-close">{props.closeIcon}</span>;
    }
    return () => (
      <n-button class="modal-close" danger={true} circle={true} flat={true} onClick={close}>
        {props.closeIcon}
      </n-button>
    );
  });

  return (
    <Show when={open() !== OpenState.closed}>
      <Portal useShadow={true}>
        <style textContent={getCss()} />
        <style textContent={style} />
        <div
          ref={portal}
          class="portal"
          classList={{
            open: open() === OpenState.open,
            closeing: open() !== OpenState.open,
            'mask-blur': props.maskBlur,
          }}
          onAnimationEnd={handleDestroy}
          onClick={portalClick}
        >
          <div class="modal-content">
            <div class="modal-header">
              <strong class="modal-title">{props.title}</strong>
            </div>
            <Show when={props.closeIcon === void 0} fallback={closeIcon() as JSXElement}>
              <n-button class="modal-close" danger={true} circle={true} flat={true} onClick={close}>
                ⛌
              </n-button>
            </Show>
            <div class="modal-body">{props.content}</div>
            {/* <div class="modal-footer">{props.footer}</div> */}
          </div>
        </div>
      </Portal>
    </Show>
  );
}

customElement<ModalProps>(
  'n-modal',
  {
    open: 'closed' as OpenStateKey,
    maskClosable: true,
    escClosable: true,
    onOpenChange: void 0,
    closeIcon: void 0,
    content: void 0,
    title: void 0,
    maskBlur: void 0,
  },
  (_, opt) => {
    const props = mergeProps(
      {
        onOpenChange(open: OpenStateKey) {
          opt.element.dispatchEvent(
            new CustomEvent('openchange', {
              detail: open,
            }),
          );
        },
      },
      _,
    );

    return <Modal {...props} />;
  },
);
export default Modal;
