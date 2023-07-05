import {
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
import { customElement, noShadowDOM } from 'solid-element';
import { Portal } from 'solid-js/web';
import { popoverCss, portalCss } from './style';
import { baseStyle, theme } from '../theme';
import type { CSSProperties, ComponentSize } from '..';

export type TriggerOption = 'hover' | 'click' | 'contextMenu' | 'none';

export type Placement =
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'left'
  | 'right';
export interface PopoverProps {
  class?: string;
  css?: string;
  style?: CSSProperties;
  children: JSXElement;
  content: JSXElement | (() => JSXElement);
  /** 挂载到指定的元素，值为一个返回对应 DOM 元素 默认 document.body */
  // eslint-disable-next-line no-unused-vars
  getPopupContainer?: (node?: HTMLElement | null) => HTMLElement;
  /** 触发行为 */
  trigger?: TriggerOption;
  open?: boolean | null;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?(open: boolean | null): void;
  popupClass?: string;
  popupCss?: string;
  /** 关闭后是否销毁  */
  destroyInactive?: boolean;
  disabled?: boolean;
  arrow?: boolean;
  placement?: Placement;
  dropdownMatchSelectWidth?: boolean;
  size?: ComponentSize;
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
      trigger: 'hover' as TriggerOption,
    },
    props
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
    if (local.open !== undefined) {
      setOpen(local.open);
    }
  });
  function openChange(next: boolean | null) {
    if (!local.disabled) {
      if (local.onOpenChange) {
        local.onOpenChange(next);
      }
      if (local.open === undefined) {
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
      local.trigger === 'hover' ? 300 : 0
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
      }
    );

    return _props;
  });

  const portalStyle = createMemo(() => {
    const p = posi();

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
      local.popupClass
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
        {css(local.css || '')}
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

export interface PopoverElement extends Omit<PopoverProps, 'onOpenChange' | 'ref'> {
  ref?: PopoverElement | { current: PopoverElement | null };
  // eslint-disable-next-line no-unused-vars
  onOpenChange?(open: CustomEvent<boolean | null>): void;
  useShadow?: boolean;
}

interface CustomElementTags {
  'n-popover': PopoverElement;
}

declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
  }
}
declare global {
  export namespace JSX {
    export interface IntrinsicElements extends Object, CustomElementTags {}
  }
}

export const defaultProps = {
  class: undefined,
  content: undefined,
  getPopupContainer: undefined,
  trigger: undefined,
  open: undefined,
  onOpenChange: undefined,
  popupClass: undefined,
  popupCss: undefined,
  destroyInactive: true,
  disabled: undefined,
  arrow: undefined,
  placement: undefined,
  css: undefined,
  dropdownMatchSelectWidth: undefined,
  useShadow: true,
};
customElement('n-popover', defaultProps, (_, opt) => {
  if (!_.useShadow) {
    noShadowDOM();
  }
  const el = opt.element;
  const props = mergeProps(
    {
      onOpenChange(next: boolean | null) {
        el.dispatchEvent(
          new CustomEvent('openchange', {
            detail: next,
          })
        );
      },
      children: [...el.childNodes.values()],
    },
    _
  );

  return createComponent(Popover, props);
});
export default Popover;
