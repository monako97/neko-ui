import {
  type JSX,
  type JSXElement,
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
import { isElementInside, isFunction, passiveSupported } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { Portal } from 'solid-js/web';
import { popoverCss, portalCss } from './style';
import { baseStyle, theme } from '../theme';
import type { BasicConfig } from '..';

export interface PopoverProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 内容 */
  content: (() => JSXElement) | JSXElement;
  /** 挂载到指定的元素，值为一个返回对应 DOM 元素 默认 document.body */
  getPopupContainer?: (node?: HTMLElement | null) => HTMLElement;
  /** 触发行为
   * @default 'hover'
   */
  trigger?: keyof typeof TriggerOption;
  /** 打开内容气泡 */
  open?: boolean | null;
  /** 内容打开关闭时的回调方法 */
  onOpenChange?: (open: boolean | null) => void;
  /** 气泡的自定义类名 */
  popupClass?: string;
  /** 气泡的自定义样式表 */
  popupCss?: string;
  /** 关闭后是否销毁  */
  destroyInactive?: boolean;
  /** 不可用状态  */
  disabled?: boolean;
  /** 添加一个箭头显示  */
  arrow?: boolean;
  /** 指定气泡显示的方向 */
  placement?: keyof typeof Placement;
  /** 气泡宽度与触发dom一致  */
  dropdownMatchSelectWidth?: boolean;
  /** 尺寸
   * @default 'normal'
   */
  size?: BasicConfig['size'];
}

export enum TriggerOption {
  /** 鼠标移入 */
  hover = 'hover',
  /** 点击 */
  click = 'click',
  /** 右键 */
  contextMenu = 'contextMenu',
  /** 无 */
  none = 'none',
}

export enum Placement {
  /** 左下 */
  bottomLeft = 'bottomLeft',
  /** 下 */
  bottom = 'bottom',
  /** 右下 */
  bottomRight = 'bottomRight',
  /** 左上 */
  topLeft = 'topLeft',
  /** 上 */
  top = 'top',
  /** 右上 */
  topRight = 'topRight',
  /** 左 */
  left = 'left',
  /** 右 */
  right = 'right',
}

type Posi = {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  '--x'?: number;
};

type EventMap = {
  click: string | null;
  hover: string | null;
  contextMenu: string | null;
  none: null;
  [key: string]: string | null;
};
function Popover(props: PopoverProps) {
  const mp = mergeProps(
    {
      trigger: 'hover',
    },
    props,
  );
  const [local] = splitProps(mp, [
    'class',
    'css',
    'popupClass',
    'popupCss',
    'size',
    'trigger',
    'open',
    'disabled',
    'onOpenChange',
    'dropdownMatchSelectWidth',
    'destroyInactive',
    'arrow',
    'placement',
    'getPopupContainer',
    'children',
    'content',
  ]);
  let ref: HTMLDivElement | undefined;
  let childRef: HTMLSpanElement | undefined;
  let closeTimer: NodeJS.Timeout | undefined | null;
  const [open, setOpen] = createSignal<boolean | null>(null);
  const [posi, setPosi] = createSignal<Posi>({});
  const [up, setUp] = createSignal<boolean>(false);
  const [width, setWidth] = createSignal('');

  createEffect(() => {
    if (local.open !== void 0) {
      setOpen(local.open);
    }
  });
  function openChange(next: boolean | null) {
    if (!local.disabled) {
      if (local.onOpenChange) {
        local.onOpenChange(next);
      }
      if (local.open === void 0) {
        setOpen(next);
      }
    }
  }
  function exit() {
    if (open() === false) {
      setOpen(null);
      openChange(null);
    }
  }
  createEffect(() => {
    if (open() && local.dropdownMatchSelectWidth && childRef) {
      setWidth(`.portal {width: ${childRef.offsetWidth}px;}`);
    }
  });

  function close(e: MouseEvent | Event) {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    closeTimer = setTimeout(
      () => {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        if ((e.target as HTMLElement)?.getAttribute('handle-closed') === 'false') {
          return;
        }
        const isContains = isElementInside(e.target as Element, ref);

        if ((open() && !isContains) || (isContains && e.type !== 'mousedown')) {
          openChange(false);
        }
      },
      local.trigger === 'hover' ? 300 : 0,
    );
  }
  function showPortal(e?: Event) {
    if (!open() || !ref || !childRef || (!e && local.trigger === 'contextMenu')) {
      return;
    }
    if (e?.type === 'scroll' && local.trigger === 'contextMenu') {
      openChange(false);
      return;
    }
    const elRect = (childRef as HTMLSpanElement).getBoundingClientRect();
    const portalRect = (ref as HTMLDivElement).getBoundingClientRect();
    const offsetX = portalRect.width / 2 - elRect.width / 2;
    const margin = window.innerHeight - elRect.bottom;
    const _placement = local.placement;

    const _isBottom =
      (!_placement?.startsWith('top') && margin > ref.offsetHeight * 0.8 && margin > elRect.top) ||
      _placement?.startsWith('bottom');
    const arrowHeight = local.arrow ? 8 : 4;
    const _posi: Posi = {};

    switch (local.placement) {
      case 'bottomLeft':
      case 'left':
      case 'topLeft':
        _posi.left = elRect.left;
        _posi['--x'] = -portalRect.width / 2 + 16;
        break;
      case 'bottomRight':
      case 'right':
      case 'topRight':
        _posi.left = elRect.right - portalRect.width;
        _posi['--x'] = portalRect.width / 2 - 16;
        break;
      case 'bottom':
      case 'top':
      default:
        _posi.left = Math.abs(offsetX > elRect.left ? elRect.left : elRect.left - offsetX);
        _posi['--x'] = -(_posi.left - elRect.left + offsetX);
        break;
    }
    if (_isBottom) {
      _posi.top = elRect.bottom + arrowHeight;
    } else {
      _posi.bottom = window.innerHeight - elRect.top + arrowHeight;
    }
    setPosi(_posi);
    setUp(!_isBottom);
  }
  function handleOpen(e: MouseEvent) {
    e.stopPropagation();
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    if (local.trigger === 'contextMenu' && e.type === 'contextmenu') {
      e.preventDefault();
      setPosi((prev) => ({
        ...prev,
        left: e.clientX,
        top: e.clientY,
        ['--x']: -(ref?.getBoundingClientRect().width || 0) / 2 + 16,
      }));
    }
    openChange(true);
  }

  const container = createMemo(() => {
    if (isFunction(local.getPopupContainer)) {
      return local.getPopupContainer(childRef);
    }
    return document.body;
  });
  const childrenProps = createMemo(() => {
    const _props: Partial<Record<keyof EventMap, void>> = {};

    const openEvent: EventMap = {
      click: 'onMouseDown',
      hover: 'onMouseEnter',
      contextMenu: 'onContextMenu',
      none: null,
    };
    const closeEvent: EventMap = {
      hover: 'onMouseLeave',
      click: null,
      contextMenu: null,
      none: null,
    };

    const openFn = openEvent[local.trigger];
    const closeFn = closeEvent[local.trigger];

    Object.assign(
      _props,
      openFn && {
        [openFn]: handleOpen,
      },
      closeFn && {
        [closeFn]: close,
      },
    );

    return _props;
  });

  const portalStyle = createMemo(() => {
    const p = posi();

    // max-block-size: calc(100vb - ${(up() ? p.bottom : p.top) || 0}px);
    return `.portal {${Object.keys(p)
      .map((k) => `${k}:${p[k as keyof Posi]}px;`)
      .join('')}z-index: 1;}`;
  });
  const portalCls = createMemo(() => {
    return cx(
      'portal',
      local.arrow && 'arrow',
      `${open() ? 'in' : 'out'}-${up() ? 'up' : 'down'}`,
      local.size,
      local.popupClass,
    );
  });
  const hostStyle = createMemo(() => {
    return `:host {--popover-bg: ${
      theme.scheme === 'dark' ? '#1f1f1f' : 'var(--component-bg)'
    };--popover-shadow-color: rgb(0 0 0 / 5%);}`;
  });

  createEffect(() => {
    showPortal();
  });
  onMount(() => {
    if (local.trigger !== 'none') {
      document.documentElement.addEventListener('mousedown', close, false);
    }
    window.addEventListener('scroll', showPortal, passiveSupported);
  });

  onCleanup(() => {
    if (closeTimer) {
      clearTimeout(closeTimer);
    }
    if (local.trigger !== 'none') {
      document.documentElement.removeEventListener('mousedown', close, false);
    }
    window.removeEventListener('scroll', showPortal, passiveSupported);
  });

  return (
    <>
      <style>
        {baseStyle()}
        {popoverCss}
        {css(local.css)}
      </style>
      <span ref={childRef} class={cx('popover', local.size, local.class)} {...childrenProps()}>
        {local.children}
      </span>
      <Show when={open() !== null || !local.destroyInactive}>
        <Portal useShadow mount={container()}>
          <style>
            {baseStyle()}
            {portalCss}
            {hostStyle()}
            {portalStyle()}
            {width()}
            {css(local.popupCss || '')}
          </style>
          <div ref={ref} onAnimationEnd={exit} class={portalCls()} {...childrenProps()}>
            {local.content as JSXElement}
          </div>
        </Portal>
      </Show>
    </>
  );
}

export type PopoverElement = CustomElement<PopoverProps>;

export const defaultProps = {
  class: void 0,
  content: void 0,
  getPopupContainer: void 0,
  trigger: void 0,
  open: void 0,
  onOpenChange: void 0,
  popupClass: void 0,
  popupCss: void 0,
  destroyInactive: true,
  disabled: void 0,
  arrow: void 0,
  placement: void 0,
  css: void 0,
  dropdownMatchSelectWidth: void 0,
};
customElement('n-popover', defaultProps, (_, opt) => {
  const el = opt.element;
  const props = mergeProps(
    {
      onOpenChange(next: boolean | null) {
        el.dispatchEvent(
          new CustomEvent('openchange', {
            detail: next,
          }),
        );
      },
      children: [...el.childNodes.values()],
    },
    _,
  );

  return createComponent(Popover, props);
});
export default Popover;
