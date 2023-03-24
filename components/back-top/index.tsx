import React, {
  type FC,
  type HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { injectGlobal } from '@emotion/css';
import { classNames, getMaxZindex, getScrollTop, isEqual, isFunction } from '@moneko/common';
import { createPortal } from 'react-dom';
import prefixCls from '../prefix-cls';

const cls = {
  backtop: prefixCls('back-top'),
  out: prefixCls('back-top-out'),
};

const backTopCss = `
  :root {
    --back-top-color: #fff;
    --back-top-bg: var(--text-secondary, #4e4e4e);
    --back-top-hover-bg: var(--text-color, rgb(0 0 0 / 65%));
  }

  [data-theme='dark'] {
    --back-top-bg: rgb(255 255 255 / 45%);
  }
  .${cls.backtop} {
    position: sticky;
    bottom: 50px;
    left: calc(100% - 100px);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    min-width: 40px;
    height: 40px;
    min-height: 40px;
    color: var(--back-top-color);
    background-color: var(--back-top-bg);
    box-shadow: var(--box-shadow-base);
    transition: background-color var(--transition-duration), color var(--transition-duration);
    cursor: pointer;
    animation: back-top-fade-in 1s forwards;
    backdrop-filter: blur(16px);

    &::before {
      content: '';
      display: block;
      width: 16px;
      height: 8px;
      background-color: var(--back-top-color);
      clip-path: polygon(0 100%, 50% 0, 100% 100%);
    }

    &:hover {
      background-color: var(--back-top-hover-bg);
    }
  }
  .${cls.out} {
    animation: back-top-fade-out 1s forwards;
  }

  @keyframes back-top-fade-in {
    from {
      transform: translate3d(0, 16px, 0) scale(1);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
  }

  @keyframes back-top-fade-out {
    0%,
    20% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }

    100% {
      transform: translate3d(0, 16px, 0);
      opacity: 0;
    }
  }
`;

export interface BackTopProps extends HTMLAttributes<HTMLDivElement> {
  /** 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素 */
  target?: () => HTMLElement;
  /** 挂载到指定的元素，值为一个返回对应 DOM 元素 默认 document.body */
  // eslint-disable-next-line no-unused-vars
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  /** 滚动高度达到此参数值才出现 BackTop */
  visibilityHeight?: number;
}

const BackTop: FC<BackTopProps> = ({
  target = () => window as unknown as HTMLElement,
  getPopupContainer,
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

  const exit = useCallback(() => {
    if (show === false) {
      setShow(null);
    }
  }, [show]);

  useEffect(() => {
    injectGlobal([backTopCss]);
  }, []);

  if (show === null) return null;
  return createPortal(
    <div
      {...props}
      ref={ref}
      onAnimationEnd={exit}
      className={classNames(className, cls.backtop, show === false && cls.out)}
      onClick={handleBackTop}
    />,
    getPopupContainer?.(target()) || document.body
  );
};

export default memo(BackTop, isEqual);
