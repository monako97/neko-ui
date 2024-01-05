import {
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
import { isElementInside, isEqual, isFunction, passiveSupported } from '@moneko/common';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { Portal } from 'solid-js/web';
import { popoverCss, portalCss } from './style';
import '../empty';
import theme from '../theme';
import type { BasicConfig, CustomElement } from '..';

export interface PopoverProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 内容 */
  content?: (() => JSX.Element) | JSX.Element;
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
  children?: JSX.Element;
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
  click?: string;
  hover?: string;
  contextMenu?: string;
  none?: never;
  [key: string]: string | undefined;
};
function Popover(props: PopoverProps) {
  const { isDark, baseStyle } = theme;
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
  let closeTimer: NodeJS.Timeout | undefined;
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
    clearTimeout(closeTimer);
    closeTimer = setTimeout(
      () => {
        clearTimeout(closeTimer);
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
  let portalTimer: NodeJS.Timeout | undefined;
  const showPortal = function (e?: Event): void {
    clearTimeout(portalTimer);
    portalTimer = setTimeout(() => {
      clearTimeout(portalTimer);
      if (!ref || !childRef || (!e && local.trigger === 'contextMenu')) {
        return;
      }
      if (e?.type === 'scroll' && local.trigger === 'contextMenu') {
        openChange(false);
        return;
      }
      const elRect = childRef!.getBoundingClientRect();
      const portalRect = ref!.getBoundingClientRect();
      const offsetX = portalRect.width / 2 - elRect.width / 2;
      const margin = window.innerHeight - elRect.bottom;
      const _placement = local.placement;

      const _isBottom =
        (!_placement?.startsWith('top') &&
          margin > ref!.offsetHeight * 0.8 &&
          margin > elRect.top) ||
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
      setPosi((prev) => {
        return isEqual(prev, _posi) ? prev : _posi;
      });
      setUp((prev) => {
        return prev === !_isBottom ? prev : !_isBottom;
      });
    }, 32);
  };

  function handleOpen(e: MouseEvent) {
    clearTimeout(closeTimer);
    e.stopPropagation();
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
      none: void 0,
    };
    const closeEvent: EventMap = {
      hover: 'onMouseLeave',
      click: void 0,
      contextMenu: void 0,
      none: void 0,
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
      isDark() ? '#1f1f1f' : 'var(--component-bg)'
    };--popover-shadow-color: rgb(0 0 0 / 5%);}`;
  });

  createEffect(() => {
    if (open()) {
      showPortal();

      window.addEventListener('scroll', showPortal, {
        passive: passiveSupported,
      });
    }
    onCleanup(() => {
      window.removeEventListener('scroll', showPortal, false);
    });
  });
  onMount(() => {
    if (local.trigger !== 'none') {
      document.documentElement.addEventListener('mousedown', close, false);
    }
  });
  onCleanup(() => {
    clearTimeout(closeTimer);
    document.documentElement.removeEventListener('mousedown', close, false);
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
            {css(local.popupCss)}
          </style>
          <div ref={ref} onAnimationEnd={exit} class={portalCls()} {...childrenProps()}>
            <Show when={local.content} fallback={<n-empty />}>
              {local.content as JSX.Element}
            </Show>
          </div>
        </Portal>
      </Show>
    </>
  );
}

export type PopoverElement = CustomElement<PopoverProps, 'onOpenChange'>;

export const defaultProps = {
  class: void 0,
  css: void 0,
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
  dropdownMatchSelectWidth: void 0,
};
customElement<PopoverProps>('n-popover', defaultProps, (_, opt) => {
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

  createEffect(() => {
    el.removeAttribute('css');
  });
  return createComponent(Popover, props);
});
export default Popover;
