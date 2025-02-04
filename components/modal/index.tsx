import {
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  Show,
  untrack,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { isFunction, passiveSupported } from '@moneko/common';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute, type JSXElement } from '../basic-config';
import type { ButtonProps } from '../button';

import open from './hooks';
import { defaultPosi } from './posi';
import modalStore from './store';
import { style } from './style';

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
  closeIcon?: JSXElement;
  /** 内容 */
  content?: HTMLElement | string | JSX.Element;
  /** 标题 */
  title?: HTMLElement | string | JSX.Element;
  /** 遮罩模糊
   * @default false
   */
  maskBlur?: boolean;
  okText?: string | false | null;
  cancelText?: string | false | null;
  onCancel?(): Promise<boolean> | boolean;
  onOk?(e: MouseEvent | Event): Promise<boolean> | boolean;
  okProps?: Omit<ButtonProps, 'children' | 'onClick' | 'loading'>;
  cancelProps?: Omit<ButtonProps, 'children' | 'onClick'>;
  centered?: boolean;
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

function Modal(_: ModalProps) {
  const doc = document.documentElement;
  const { setNum } = modalStore;
  const props = mergeProps(
    {
      okText: '确认',
      cancelText: '取消',
    },
    _,
  );
  const [moveing, setMoveing] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [open, setOpen] = createSignal<OpenStateKey>('closed');
  const [posi, setPosi] = createSignal(defaultPosi);
  const movement = [0, 0];
  let portal: HTMLDivElement | undefined;
  let modal: HTMLDivElement | undefined;

  const getCss = createMemo(() => {
    const { x, y, width, height } = posi();

    return `.portal { --y: ${-(y - height / 2)}px;--x: ${-(x - width / 2)}px; --movement-x: ${movement[0]}px; --movement-y: ${movement[1]}px;}`;
  });

  async function openChange(visi: OpenStateKey) {
    setLoading(false);
    if (visi === OpenState.closeing) {
      modal!.style.removeProperty('--x');
      modal!.style.removeProperty('--y');
      if (isFunction(props.onCancel)) {
        setLoading(true);
        if (!(await props.onCancel())) {
          setLoading(false);
          return;
        }
      }
    }
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
  async function handleOk(e: MouseEvent | Event) {
    preventDefault(e);
    if (isFunction(props.onOk)) {
      setLoading(true);
      if (!(await props.onOk(e))) {
        setLoading(false);
        return;
      }
    }

    setOpen(OpenState.closeing);
    props.onOpenChange?.(OpenState.closeing);
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

  function move(ev: MouseEvent) {
    if (modal) {
      movement[0] = movement[0] + ev.movementX;
      movement[1] = movement[1] + ev.movementY;

      portal!.style.setProperty('--movement-x', `${movement[0]}px`);
      portal!.style.setProperty('--movement-y', `${movement[1]}px`);
      modal!.style.setProperty('--x', `${movement[0]}px`);
      modal!.style.setProperty('--y', `${movement[1]}px`);
    }
  }

  function mouseDown(e: MouseEvent) {
    setMoveing(e.target === modal);
  }
  function mouseUp() {
    setMoveing(false);
  }
  createEffect(() => {
    if (moveing()) {
      document.body.addEventListener('mousemove', move, {
        passive: passiveSupported,
      });
    }
    onCleanup(() => {
      document.body.removeEventListener('mousemove', move, false);
    });
  });

  onMount(() => {
    document.body.addEventListener('mouseup', mouseUp, {
      passive: passiveSupported,
    });
  });
  onCleanup(() => {
    document.body.removeEventListener('mouseup', mouseUp, false);
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
          <div
            ref={modal}
            classList={{
              'modal-content': true,
              centered: props.centered,
              moveing: moveing(),
            }}
            onMouseDown={mouseDown}
          >
            <div class="modal-header">
              <strong class="modal-title">{props.title}</strong>
            </div>
            <Show when={props.closeIcon === void 0} fallback={closeIcon() as JSXElement}>
              <n-button class="modal-close" danger={true} circle={true} flat={true} onClick={close}>
                ⛌
              </n-button>
            </Show>
            <div class="modal-body">{props.content}</div>
            <Show when={props.cancelText || props.okText}>
              <div class="modal-footer">
                <Show when={props.cancelText}>
                  <n-button {...props.cancelProps} onClick={close}>
                    {props.cancelText}
                  </n-button>
                </Show>
                <Show when={props.okText}>
                  <n-button
                    type="primary"
                    fill={true}
                    {...props.okProps}
                    loading={loading()}
                    onClick={handleOk}
                  >
                    {props.okText}
                  </n-button>
                </Show>
              </div>
            </Show>
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
    okText: void 0,
    cancelText: void 0,
    okProps: void 0,
    cancelProps: void 0,
    centered: void 0,
  },
  (_, opt) => {
    const el = opt.element;
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

    createEffect(() => {
      clearAttribute(el, ['content']);
    });
    return <Modal {...props} />;
  },
);

Modal.open = open;

export default Modal;
