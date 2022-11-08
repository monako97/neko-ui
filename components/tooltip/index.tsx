import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames, getMaxZindex, isString } from '@moneko/common';
import tinycolor from 'tinycolor2';
import getPrefixCls from '../get-prefix-cls';
import './index.global.less';

export type TooltipTriggerOption = 'hover' | 'click' | 'focus' | 'contextMenu';
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
  visible?: boolean;
  // eslint-disable-next-line no-unused-vars
  onVisibleChange?: (visible: boolean) => void;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  color?: string;
  shadowColor?: string;
  /** 关闭后是否销毁 Tooltip */
  destroyInactive?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  className,
  overlayClassName,
  overlayStyle,
  getPopupContainer,
  title,
  children,
  color = '#000',
  shadowColor = tinycolor(color).setAlpha(0.2).toRgbString(),
  trigger = 'click',
  visible = null,
  destroyInactive = true,
  onVisibleChange,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState<boolean | null>(null);
  const [posi, setPosi] = useState({ left: -9999, top: -9999 });

  useEffect(() => {
    if (visible !== !show) {
      onVisibleChange?.(Boolean(show));
    }
  }, [onVisibleChange, show, visible]);
  useEffect(() => {
    if (show && ref.current) {
      ref.current.style.zIndex = getMaxZindex().toString();
    }
  }, [onVisibleChange, show]);
  const exit = useCallback(() => {
    if (show === false) {
      setShow(null);
    }
  }, [show]);
  const close = useCallback(
    (e: MouseEvent) => {
      if (show && !ref.current?.contains(e.target as Node)) {
        setShow(false);
      }
    },
    [show]
  );

  useEffect(() => {
    if (!show) return;
    const elRect = childRef.current?.getBoundingClientRect();
    const portalRectHeight = ref.current?.getBoundingClientRect();

    if (elRect && portalRectHeight) {
      const offsetY = portalRectHeight.height + elRect.height;
      const offsetX = portalRectHeight.width / 2 - elRect.width / 2;

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
      focus: 'onFocus',
      hover: 'onMouseOver',
      contextMenu: 'onContextMenu',
    };
    const closeEvent: TriggerOptionMap = {
      hover: 'onMouseOut',
      focus: 'onBlur',
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

  return (
    <React.Fragment>
      {(show !== null || !destroyInactive) &&
        createPortal(
          <div
            ref={ref}
            onAnimationEnd={exit}
            className={classNames(
              getPrefixCls('tooltip-portal'),
              overlayClassName,
              getPrefixCls(`tooltip-${show ? 'in-up' : 'out-up'}`)
            )}
            style={
              {
                ...overlayStyle,
                left: posi.left,
                top: posi.top,
                '--tooltip-bg': color,
                '--tooltip-shadow-color': shadowColor,
              } as React.CSSProperties
            }
          >
            {title}
          </div>,
          container
        )}
      <span
        {...childrenProps}
        className={classNames(getPrefixCls('tooltip'), className)}
        ref={childRef}
        tabIndex={0}
      >
        {children}
      </span>
    </React.Fragment>
  );
};

export default Tooltip;
