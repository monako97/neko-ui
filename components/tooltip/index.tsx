import React, { useEffect, useMemo, useRef } from 'react';
import { getMaxZindex, isString, colorParse, isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import Portal from '../portal';

export type TooltipTriggerOption = 'hover' | 'click' | 'contextMenu';
type TriggerOptionMap = Record<
  TooltipTriggerOption,
  keyof React.DOMAttributes<HTMLSpanElement> | null
>;
export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children: React.ReactNode;
  title: React.ReactNode;
  /** 挂载到指定的元素，值为一个返回对应 DOM 元素 默认 document.body */
  // eslint-disable-next-line no-unused-vars
  getPopupContainer?: (node?: HTMLElement | null) => HTMLElement;
  /** 触发行为,可使用数组设置多个触发行为 */
  trigger?: TooltipTriggerOption | TooltipTriggerOption[];
  open?: boolean | null;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean | null) => void;
  popupClassName?: string;
  popupStyle?: React.CSSProperties;
  color?: string;
  /** 关闭后是否销毁 Tooltip */
  destroyInactive?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  className,
  popupClassName,
  popupStyle,
  getPopupContainer,
  title,
  children,
  color,
  trigger = 'click',
  open = null,
  destroyInactive = true,
  onOpenChange,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLSpanElement>(null);
  const state = useRef(
    sso({
      show: null as boolean | null,
      up: false,
      posi: { left: -9999, top: -9999, x: '0px' },
      exit() {
        if (state.current.show === false) {
          state.current.show = null;
        }
      },
      close(e: MouseEvent | Event) {
        e.preventDefault();
        e.stopPropagation();
        if (state.current.show && !ref.current?.contains(e.target as Node)) {
          state.current.show = false;
        }
      },
      open(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        state.current.show = true;
      },
    })
  );
  const { show, posi, up } = state.current;

  useEffect(() => {
    state.current.show = open;
  }, [open]);
  useEffect(() => {
    if (isFunction(onOpenChange)) {
      onOpenChange(show);
    }
    if (show && ref.current) {
      ref.current.style.zIndex = getMaxZindex().toString();
    }
  }, [onOpenChange, show]);

  const container = useMemo(() => {
    if (isFunction(getPopupContainer)) {
      return getPopupContainer(childRef.current);
    }
    return document.body;
  }, [getPopupContainer]);

  useEffect(() => {
    if (!show || !ref.current || !childRef.current) return;
    const elRect = childRef.current.getBoundingClientRect();
    const portalRect = ref.current.getBoundingClientRect();

    if (elRect && portalRect) {
      const portalRectHeight = ref.current.offsetHeight;
      const offsetY = portalRectHeight + elRect.height / 2;
      const offsetX = portalRect.width / 2 - elRect.width / 2;
      const margin = window.innerHeight - elRect.bottom;
      const _isBottom = margin > portalRectHeight * 0.8 && margin > elRect.top;
      const _posi = {
        left: Math.abs(offsetX > elRect.left ? elRect.left : elRect.left - offsetX),
        top: _isBottom ? elRect.bottom + 8 : elRect.top - offsetY,
        x: '0px',
      };

      _posi.x = -(_posi.left - elRect.left + offsetX) + 'px';
      state.current.posi = _posi;
      state.current.up = !_isBottom;
    }
  }, [show]);

  const childrenProps = useMemo(() => {
    const _props = {
      ...props,
    };
    const openEvent: TriggerOptionMap = {
      click: 'onClick',
      hover: 'onMouseOver',
      contextMenu: 'onContextMenu',
    };
    const closeEvent: TriggerOptionMap = {
      hover: 'onMouseOut',
      click: null,
      contextMenu: null,
    };
    const triggers = isString(trigger) ? [trigger] : trigger;

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
  }, [props, trigger]);

  const style = useMemo(() => {
    let shadowColor: string | undefined;

    if (color) {
      shadowColor = colorParse(color).setAlpha(0.1).toRgbaString();
    }

    return Object.assign(
      {
        ...popupStyle,
        left: posi.left,
        top: posi.top,
        '--x': posi.x,
      },
      color && {
        '--tooltip-bg': color,
        '--tooltip-shadow-color': shadowColor,
      }
    ) as React.CSSProperties;
  }, [color, popupStyle, posi.left, posi.top, posi.x]);

  useEffect(() => {
    const _state = state.current;

    document.documentElement.addEventListener('click', _state.close, false);
    window.addEventListener('scroll', _state.close, false);
    return () => {
      document.documentElement.removeEventListener('click', _state.close, false);
      window.removeEventListener('scroll', _state.close, false);
      _state();
    };
  }, []);

  return (
    <>
      {(show !== null || !destroyInactive) && (
        <Portal container={container}>
          <div
            ref={ref}
            onAnimationEnd={state.current.exit}
            className={cx(
              cls.portal,
              show ? (up ? cls.inUp : cls.inDown) : up ? cls.outUp : cls.outDown,
              popupClassName
            )}
            style={style}
          >
            {title}
          </div>
        </Portal>
      )}
      <span {...childrenProps} className={cx(cls.tooltip, className)} ref={childRef}>
        {children}
      </span>
    </>
  );
};

export default Tooltip;
