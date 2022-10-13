import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  classNames,
  getMaxZindex,
  getPrefixCls,
  getScrollTop,
  isEqual,
  isFunction,
} from '@moneko/common';
import './index.global.less';

export interface BackTopProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target?: () => HTMLElement;
  /** 滚动高度达到此参数值才出现 BackTop */
  visibilityHeight?: number;
}

const BackTop: React.FC<BackTopProps> = ({
  target = () => window as unknown as HTMLElement,
  visibilityHeight = 400,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean | null>(null);
  const handleScrollY = useCallback(() => {
    let scrollTop: number | null = 0;
    let offsetHeight: number | null = 0;

    if (isFunction(target)) {
      const ele: HTMLElement = target() as HTMLElement;

      if (ele) {
        scrollTop = getScrollTop(ele);
        offsetHeight = ele.offsetHeight;
      }
    }
    const nextShow: boolean = scrollTop > offsetHeight / 3 || scrollTop > visibilityHeight;

    if (Boolean(show) !== nextShow) {
      setShow(nextShow);
    }
  }, [show, target, visibilityHeight]);
  const handleBackTop = useCallback(() => {
    target()?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [target]);

  useEffect(() => {
    if (show && ref.current) {
      ref.current.style.zIndex = getMaxZindex().toString();
    }
  }, [show]);
  useEffect(() => {
    if (isFunction(target)) {
      target()?.addEventListener('scroll', handleScrollY, false);
    }
    return () => {
      if (isFunction(target)) {
        target()?.removeEventListener('scroll', handleScrollY, false);
      }
    };
  }, [handleScrollY, target]);

  const cls = useMemo(
    () => classNames([getPrefixCls('back-top'), className, !show && getPrefixCls('back-top-out')]),
    [className, show]
  );
  const exit = useCallback(() => {
    if (show === false) {
      setShow(null);
    }
  }, [show]);
  const el = useMemo(
    () => (
      <div {...props} ref={ref} onAnimationEnd={exit} className={cls} onClick={handleBackTop} />
    ),
    [cls, exit, handleBackTop, props]
  );

  return show === null ? null : ReactDOM.createPortal(el, target());
};

export default memo(BackTop, isEqual);
