import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getMaxZindex, isString, colorParse } from '@moneko/common';
import { createPortal } from 'react-dom';
import { cls } from './style';
import { cx } from '../emotion';

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
  const [show, setShow] = useState<boolean | null>(null);
  const [posi, setPosi] = useState({ left: -9999, top: -9999 });

  useEffect(() => {
    onOpenChange?.(show);
  }, [onOpenChange, show]);

  useEffect(() => {
    setShow(open);
  }, [open]);
  useEffect(() => {
    if (show && ref.current) {
      ref.current.style.zIndex = getMaxZindex().toString();
    }
  }, [show]);
  const exit = useCallback(() => {
    if (show === false) {
      setShow(null);
    }
  }, [show]);
  const close = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (show && !ref.current?.contains(e.target as Node)) {
        setShow(false);
      }
    },
    [show]
  );

  useEffect(() => {
    if (!show || !ref.current || !childRef.current) return;
    const elRect = childRef.current.getBoundingClientRect();
    const portalRectHeight = ref.current.getBoundingClientRect();

    if (elRect && portalRectHeight) {
      const offsetY = ref.current.offsetHeight + elRect.height / 2;
      const offsetX = ref.current.offsetWidth / 2 - elRect.width / 2;

      setPosi({
        left: elRect.left - offsetX,
        top: elRect.top - offsetY,
      });
    }
  }, [show]);

  const container = useMemo(
    () => getPopupContainer?.(childRef.current) || document.body,
    [getPopupContainer]
  );

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
          [openFn]: (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setShow(true);
          },
        },
        closeFn && {
          [closeFn]: close,
        }
      );
    }

    return _props;
  }, [close, props, trigger]);

  useEffect(() => {
    document.body.addEventListener('click', close, false);
    return () => {
      document.body.removeEventListener('click', close, false);
    };
  }, [close]);

  const style = useMemo(() => {
    let shadowColor: string | undefined;

    if (color) {
      shadowColor = colorParse(color).setAlpha(0.1).toRgbaString();
    }

    return Object.assign(
      {
        ...popupStyle,
        left: Math.abs(posi.left),
        top: posi.top,
        '--x': -(Math.abs(posi.left) - posi.left) + 'px',
      },
      color && {
        '--tooltip-bg': color,
        '--tooltip-shadow-color': shadowColor,
      }
    ) as React.CSSProperties;
  }, [color, popupStyle, posi.left, posi.top]);

  return (
    <>
      {(show !== null || !destroyInactive) &&
        createPortal(
          <div
            ref={ref}
            onAnimationEnd={exit}
            className={cx(cls.portal, show ? cls.inUp : cls.outUp, popupClassName)}
            style={style}
          >
            {title}
          </div>,
          container
        )}
      <span {...childrenProps} className={cx(cls.tooltip, className)} ref={childRef}>
        {children}
      </span>
    </>
  );
};

export default Tooltip;
