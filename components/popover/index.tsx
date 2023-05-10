import React, { useEffect, useMemo, useRef } from 'react';
import { getMaxZindex, isString, isFunction, passiveSupported } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import Portal from '../portal';

export type TriggerOption = 'hover' | 'click' | 'contextMenu' | 'none';
type TriggerOptionMap = Record<TriggerOption, keyof React.DOMAttributes<HTMLSpanElement> | null>;
export interface PopoverProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'content' | 'value' | 'onChange'> {
  children: React.ReactNode;
  content: React.ReactNode;
  /** 挂载到指定的元素，值为一个返回对应 DOM 元素 默认 document.body */
  // eslint-disable-next-line no-unused-vars
  getPopupContainer?: (node?: HTMLElement | null) => HTMLElement;
  /** 触发行为,可使用数组设置多个触发行为 */
  trigger?: TriggerOption | TriggerOption[];
  open?: boolean | null;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?(open: boolean | null): void;
  popupClassName?: string;
  popupStyle?: React.CSSProperties;
  /** 关闭后是否销毁  */
  destroyInactive?: boolean;
  disabled?: boolean;
  arrow?: boolean;
  placement?: 'bottomLeft' | 'bottom' | 'bottomRight' | 'topLeft' | 'top' | 'topRight';
}
const Popover: React.FC<PopoverProps> = ({
  className,
  popupClassName,
  popupStyle,
  getPopupContainer,
  children,
  content,
  trigger = 'hover',
  open = null,
  destroyInactive = true,
  onOpenChange,
  disabled,
  placement,
  arrow,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLSpanElement>(null);
  const state = useRef(
    sso({
      show: open as boolean | null,
      closeTimer: null as NodeJS.Timeout | null,
      up: false,
      posi: { left: -9999, top: -9999, x: '0px' },
      trigger,
      disabled,
      arrow,
      placement,
      exit() {
        if (state.current.show === false) {
          state.current.show = null;
        }
      },
      close(e: MouseEvent | Event) {
        e.preventDefault();
        e.stopPropagation();
        if (state.current.closeTimer) {
          clearTimeout(state.current.closeTimer);
          state.current.closeTimer = null;
        }
        state.current.closeTimer = setTimeout(
          () => {
            if (state.current.closeTimer) {
              clearTimeout(state.current.closeTimer);
              state.current.closeTimer = null;
            }
            if (state.current.show) {
              state.current.openChange(false);
            }
          },
          state.current.trigger === 'hover' ? 300 : 0
        );
      },
      open(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (state.current.closeTimer) {
          clearTimeout(state.current.closeTimer);
          state.current.closeTimer = null;
        }
        if (state.current.trigger === 'contextMenu' && e.type === 'contextmenu') {
          state.current.posi = {
            ...state.current.posi,
            left: e.clientX,
            top: e.clientY,
            x: -(ref.current?.getBoundingClientRect().width || 0) / 2 + 16 + 'px',
          };
        }
        state.current.openChange(true);
      },
      openChange(next: boolean) {
        if (!state.current.disabled) {
          if (isFunction(onOpenChange)) {
            onOpenChange(next);
          } else {
            state.current.show = next;
          }
        }
      },
      showPortal(e?: Event) {
        if (
          !state.current.show ||
          !ref.current ||
          !childRef.current ||
          (!e && state.current.trigger === 'contextMenu')
        ) {
          return;
        }
        if (e?.type === 'scroll' && state.current.trigger === 'contextMenu') {
          state.current.openChange(false);
          return;
        }
        const elRect = childRef.current.getBoundingClientRect();
        const portalRect = ref.current.getBoundingClientRect();
        const offsetX = portalRect.width / 2 - elRect.width / 2;
        const margin = window.innerHeight - elRect.bottom;
        let _isBottom = true;
        const arrowHeight = state.current.arrow ? 8 : 4;
        const _posi: { left: number; top: number; x: string } = {
          left: -9999,
          top: -9999,
          x: '0px',
        };

        switch (state.current.placement) {
          case 'bottomLeft':
            _posi.left = elRect.left;
            _posi.x = -portalRect.width / 2 + 16 + 'px';
            _isBottom = true;
            break;
          case 'bottom':
            _posi.left = Math.abs(offsetX > elRect.left ? elRect.left : elRect.left - offsetX);
            _posi.x = -(_posi.left - elRect.left + offsetX) + 'px';
            _isBottom = true;
            break;
          case 'bottomRight':
            _posi.left = elRect.right - portalRect.width;
            _posi.x = portalRect.width / 2 - 16 + 'px';
            _isBottom = true;
            break;
          case 'topLeft':
            _posi.left = elRect.left;
            _posi.x = -portalRect.width / 2 + 16 + 'px';
            _isBottom = false;
            break;
          case 'top':
            _posi.left = Math.abs(offsetX > elRect.left ? elRect.left : elRect.left - offsetX);
            _posi.x = -(_posi.left - elRect.left + offsetX) + 'px';
            _isBottom = false;
            break;
          case 'topRight':
            _posi.left = elRect.right - portalRect.width;
            _posi.x = portalRect.width / 2 - 16 + 'px';
            _isBottom = false;
            break;
          default:
            _posi.left = Math.abs(offsetX > elRect.left ? elRect.left : elRect.left - offsetX);
            _posi.x = -(_posi.left - elRect.left + offsetX) + 'px';
            _isBottom = margin > ref.current.offsetHeight * 0.8 && margin > elRect.top;
            break;
        }
        if (_isBottom) {
          _posi.top = elRect.bottom + arrowHeight;
        } else {
          _posi.top = elRect.top - ref.current.offsetHeight - arrowHeight;
        }
        state.current.posi = _posi;
        state.current.up = !_isBottom;
      },
    })
  );
  const { show, posi, up, arrow: showArrow, trigger: triggerType } = state.current;

  const container = useMemo(() => {
    if (isFunction(getPopupContainer)) {
      return getPopupContainer(childRef.current);
    }
    return document.body;
  }, [getPopupContainer]);

  const childrenProps = useMemo(() => {
    const _props = {};
    const openEvent: TriggerOptionMap = {
      click: 'onClick',
      hover: 'onMouseOver',
      contextMenu: 'onContextMenu',
      none: null,
    };
    const closeEvent: TriggerOptionMap = {
      hover: 'onMouseOut',
      click: null,
      contextMenu: null,
      none: null,
    };
    const triggers = isString(triggerType) ? [triggerType] : triggerType;

    for (let i = 0, len = triggers.length; i < len; i++) {
      const openFn = openEvent[triggers[i]];
      const closeFn = closeEvent[triggers[i]];

      Object.assign(
        _props,
        openFn && {
          [openFn]: state.current.open,
        },
        closeFn && {
          [closeFn]: state.current.close,
        }
      );
    }

    return _props;
  }, [triggerType]);

  const style = useMemo(() => {
    return {
      ...popupStyle,
      left: posi.left,
      top: posi.top,
      '--x': posi.x,
      zIndex: getMaxZindex().toString(),
    } as React.CSSProperties;
  }, [popupStyle, posi]);

  useEffect(() => {
    state.current.show = open;
  }, [open]);
  useEffect(() => {
    state.current.trigger = trigger;
  }, [trigger]);
  useEffect(() => {
    state.current.arrow = arrow;
  }, [arrow]);
  useEffect(() => {
    state.current.disabled = disabled;
  }, [disabled]);
  useEffect(() => {
    state.current.placement = placement;
  }, [placement]);

  useEffect(() => {
    state.current.showPortal();
  }, [show]);
  useEffect(() => {
    const _state = state.current;

    if (_state.trigger !== 'none') {
      document.documentElement.addEventListener('click', _state.close, false);
    }
    window.addEventListener('scroll', _state.showPortal, passiveSupported);
    return () => {
      if (_state.closeTimer) {
        clearTimeout(_state.closeTimer);
      }
      if (_state.trigger !== 'none') {
        document.documentElement.removeEventListener('click', _state.close, false);
      }
      window.removeEventListener('scroll', _state.showPortal, passiveSupported);
      _state();
    };
  }, []);

  return (
    <>
      {(show !== null || !destroyInactive) && (
        <Portal container={container}>
          <div
            {...childrenProps}
            ref={ref}
            onAnimationEnd={state.current.exit}
            className={cx(
              cls.portal,
              showArrow && cls.arrow,
              show ? (up ? cls.inUp : cls.inDown) : up ? cls.outUp : cls.outDown,
              popupClassName
            )}
            style={style}
          >
            {content}
          </div>
        </Portal>
      )}
      <span {...props} {...childrenProps} className={cx(cls.popover, className)} ref={childRef}>
        {children}
      </span>
    </>
  );
};

export default Popover;
