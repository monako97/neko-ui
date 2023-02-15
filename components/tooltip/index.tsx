import React, {
  type CSSProperties,
  type DOMAttributes,
  type FC,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { injectGlobal } from '@emotion/css';
import { classNames, getMaxZindex, isString, tinycolor } from '@moneko/common';
import { createPortal } from 'react-dom';
import { portalCss, tooltipCss, tooltipInUp, tooltipOutUp, variablesCss } from './style';

injectGlobal(variablesCss);
export type TooltipTriggerOption = 'hover' | 'click' | 'contextMenu';
type TriggerOptionMap = Record<TooltipTriggerOption, keyof DOMAttributes<HTMLSpanElement> | null>;
export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  children: ReactNode;
  title: ReactNode;
  /** 挂载到指定的元素，值为一个返回对应 DOM 元素 默认 document.body */
  // eslint-disable-next-line no-unused-vars
  getPopupContainer?: (node?: HTMLElement | null) => HTMLElement;
  /** 触发行为,可使用数组设置多个触发行为 */
  trigger?: TooltipTriggerOption | TooltipTriggerOption[];
  open?: boolean | null;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean | null) => void;
  popupClassName?: string;
  popupStyle?: CSSProperties;
  color?: string;
  /** 关闭后是否销毁 Tooltip */
  destroyInactive?: boolean;
}

const Tooltip: FC<TooltipProps> = ({
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
    return Object.assign(
      {
        ...popupStyle,
        left: posi.left,
        top: posi.top,
      },
      color && {
        '--tooltip-bg': color,
        '--tooltip-shadow-color': tinycolor(color).setAlpha(0.1).toRgbString(),
      }
    ) as CSSProperties;
  }, [color, popupStyle, posi.left, posi.top]);

  return (
    <>
      {(show !== null || !destroyInactive) &&
        createPortal(
          <div
            ref={ref}
            onAnimationEnd={exit}
            className={classNames(portalCss, show ? tooltipInUp : tooltipOutUp, popupClassName)}
            style={style}
          >
            {title}
          </div>,
          container
        )}
      <span {...childrenProps} className={classNames(tooltipCss, className)} ref={childRef}>
        {children}
      </span>
    </>
  );
};

export default Tooltip;
