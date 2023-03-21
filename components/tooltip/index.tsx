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
import { css, injectGlobal } from '@emotion/css';
import { classNames, getMaxZindex, isString, colorParse } from '@moneko/common';
import { createPortal } from 'react-dom';
import prefixCls from '../prefix-cls';

const cls = {
  tooltip: prefixCls('tooltip'),
  portal: prefixCls('tooltip-portal'),
  inUp: prefixCls('tooltip-in-up'),
  outUp: prefixCls('tooltip-out-up'),
};
const tooltipCss = css`
  :root {
    --tooltip-bg: rgb(255 255 255 / 80%);
    --tooltip-shadow-color: rgb(0 0 0 / 10%);
  }

  [data-theme='dark'] {
    --tooltip-bg: rgb(0 0 0 / 80%);
    --tooltip-shadow-color: rgb(255 255 255 / 5%);
  }

  .${cls.tooltip} {
    position: relative;
    display: inline-block;

    &::-webkit-scrollbar {
      width: 1px;
    }
  }
  .${cls.portal} {
    position: fixed;
    display: inline-block;
    border-radius: var(--border-radius, 8px);
    padding: 4px 8px;
    font-size: var(--font-size, 14px);
    color: var(--text-color, rgb(0 0 0 / 65%));
    background-color: var(--tooltip-bg);
    filter: drop-shadow(0.5px 1px 4px var(--tooltip-shadow-color))
      drop-shadow(1px 2px 8px var(--tooltip-shadow-color))
      drop-shadow(2px 4px 16px var(--tooltip-shadow-color));
    backdrop-filter: blur(16px);

    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 12px;
      height: 8px;
      background: inherit;
      content: '';
      clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
      transform: translateY(100%);
    }
  }
  .${cls.inUp} {
    animation: tooltip-slide-down-in-effect 0.3s forwards;
    transform: scaleY(1);
  }
  .${cls.outUp} {
    animation: tooltip-slide-down-out-effect 0.3s forwards;
    transform: scaleY(1);
  }

  @keyframes tooltip-slide-down-in-effect {
    0% {
      transform: scaleY(0.8);
      transform-origin: 100% 100%;
      opacity: 0;
    }

    100% {
      transform: scaleY(1);
      transform-origin: 100% 100%;
      opacity: 1;
    }
  }

  @keyframes tooltip-slide-down-out-effect {
    0% {
      transform: scaleY(1);
      transform-origin: 100% 100%;
      opacity: 1;
    }

    100% {
      transform: scaleY(0.8);
      transform-origin: 100% 100%;
      opacity: 0;
    }
  }
`;

injectGlobal([tooltipCss]);

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
    let shadowColor: string | undefined;

    if (color) {
      shadowColor = colorParse(color).setAlpha(0.1).toRgbaString();
    }

    return Object.assign(
      {
        ...popupStyle,
        left: posi.left,
        top: posi.top,
      },
      color && {
        '--tooltip-bg': color,
        '--tooltip-shadow-color': shadowColor,
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
            className={classNames(cls.portal, show ? cls.inUp : cls.outUp, popupClassName)}
            style={style}
          >
            {title}
          </div>,
          container
        )}
      <span {...childrenProps} className={classNames(cls.tooltip, className)} ref={childRef}>
        {children}
      </span>
    </>
  );
};

export default Tooltip;
