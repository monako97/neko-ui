import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';
import { getMaxZindex, getScrollTop } from '../utils/document';
import { isEqual, isFunction } from 'lodash';

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
  const [init, setInit] = useState<boolean>(false);
  const handleScrollY = useCallback(() => {
    let scrollTop: number | null = 0;
    let offsetHeight: number | null = 0;

    if (isFunction(target)) {
      let ele: HTMLElement | null = target();

      if (ele) {
        scrollTop = getScrollTop(ele);
        offsetHeight = ele.offsetHeight;
      }
      ele = null;
    } else {
      scrollTop = getScrollTop();
      offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
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

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const outing = show === false;

    if (show && ref.current) {
      ref.current.style.zIndex = getMaxZindex().toString();
    }
    if (init) {
      if (outing) {
        timer = setTimeout(() => {
          setShow(null);
          clearTimeout(timer);
        }, 1000);
      }
    } else {
      if (outing) {
        setShow(null);
      }
      setInit(true);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [init, show]);
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
    () => [styles.backTop, className, !show && styles.out].filter(Boolean).join(' '),
    [className, show]
  );

  return show === null ? null : (
    <div {...props} ref={ref} className={cls} onClick={handleBackTop} />
  );
};

export default memo(BackTop, isEqual);
