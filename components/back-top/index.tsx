import React, { useEffect, useRef } from 'react';
import { getMaxZindex, getScrollTop } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import Portal from '../portal';

export interface BackTopProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素 */
  target?: () => HTMLElement;
  /** 挂载到指定的元素，值为一个返回对应 DOM 元素 默认 document.body */
  // eslint-disable-next-line no-unused-vars
  getPopupContainer?: (node?: HTMLElement) => HTMLElement;
  /** 滚动高度达到此参数值才出现 BackTop */
  visibilityHeight?: number;
}

const BackTop: React.FC<BackTopProps> = ({
  target = () => window as unknown as HTMLElement,
  getPopupContainer,
  visibilityHeight = 400,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef(
    sso(
      {
        show: null as boolean | null,
        visibilityHeight,
        exit() {
          if (state.current.show === false) {
            state.current.show = null;
          }
        },
        handleScrollY(e: Event) {
          e.preventDefault();
          let scrollTop = 0;
          let offsetHeight = 0;

          if (state.current.target) {
            scrollTop = getScrollTop(state.current.target);
            offsetHeight = state.current.target.offsetHeight;
          }
          const nextShow =
            scrollTop > offsetHeight / 3 || scrollTop > state.current.visibilityHeight;

          if (Boolean(state.current.show) !== nextShow) {
            state.current.show = nextShow;
          }
          return false;
        },
        handleBackTop() {
          state.current.target?.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        },
      },
      {
        target(): HTMLElement | undefined {
          return target?.();
        },
        style(): React.CSSProperties {
          return {
            ...props.style,
            zIndex: getMaxZindex().toString(),
          };
        },
      }
    )
  );
  const { show, style } = state.current;

  useEffect(() => {
    const _state = state.current;

    _state.target?.addEventListener('scroll', _state.handleScrollY, false);
    return () => {
      _state.target?.removeEventListener('scroll', _state.handleScrollY, false);
      _state();
    };
  }, []);

  if (show === null) return null;
  return (
    <Portal container={getPopupContainer?.(state.current.target)}>
      <div
        {...props}
        ref={ref}
        onAnimationEnd={state.current.exit}
        className={cx(cls.backtop, show === false && cls.out, className)}
        onClick={state.current.handleBackTop}
        style={style}
      />
    </Portal>
  );
};

export default BackTop;
