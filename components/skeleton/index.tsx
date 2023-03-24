import React, { useEffect, useMemo, type FC, type HTMLAttributes } from 'react';
import { injectGlobal } from '@emotion/css';
import { classNames } from '@moneko/common';
import prefixCls from '../prefix-cls';

const cls = {
  skeleton: prefixCls('skeleton'),
  active: prefixCls('skeleton-active'),
  title: prefixCls('skeleton-title'),
  paragraph: prefixCls('skeleton-paragraph'),
  body: prefixCls('skeleton-body'),
  avatar: prefixCls('skeleton-avatar'),
};

const skeletonCss = `
  :root {
    --skeleton-bg: rgb(0 0 0 / 6%);
    --skeleton-bg-active: linear-gradient(
        100deg,
        rgb(0 0 0 / 5%) 40%,
        rgb(0 0 0 / 15%) 50%,
        rgb(0 0 0 / 5%) 60%
      )
      transparent 180%/200% 100%;
  }

  [data-theme='dark'] {
    --skeleton-bg: rgb(255 255 255 / 6%);
    --skeleton-bg-active: linear-gradient(
        100deg,
        rgb(255 255 255 / 5%) 40%,
        rgb(255 255 255 / 15%) 50%,
        rgb(255 255 255 / 5%) 60%
      )
      transparent 180%/200% 100%;
  }
  .${cls.skeleton} {
    display: flex;
    width: 100%;
    gap: 16px;
  }
  .${cls.avatar} {
    border-radius: 50%;
    width: 32px;
    height: 32px;
  }

  .${cls.body} {
    flex: 1;
  }
  .${cls.title} {
    margin-bottom: 16px;
    width: 32%;
    height: 32px;
  }
  .${cls.paragraph} {
    display: flex;
    padding: 0;
    flex-direction: column;
    gap: 12px;
  }
  .${cls.paragraph} > div {
    width: 100%;
    height: 16px;
    list-style: none;
  }

  .${cls.paragraph} > div:last-of-type {
    width: 65%;
  }
  .${cls.avatar}, .${cls.title}, .${cls.paragraph} > div {
    overflow: hidden;
    border-radius: var(--border-radius, 8px);
    background: var(--skeleton-bg);
    transition: background-color var(--transition-duration) var(--transition-timing-function);
  }

  .${cls.active} {
    &::after {
      display: block;
      height: 100%;
      animation: skeleton-effect 1.4s ease-in-out infinite;
      background: var(--skeleton-bg-active);
      content: '';
      transition: background-color var(--transition-duration) var(--transition-timing-function);
    }
  }

  @keyframes skeleton-effect {
    to {
      background-position-x: -20%;
    }
  }
`;

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 行 */
  rows?: number;
  /** 显示动画 */
  active?: boolean;
  /** 显示头像 */
  avatar?: boolean;
  /** 显示标题 */
  title?: boolean;
}

const Skeleton: FC<SkeletonProps> = ({ rows = 3, className, active, avatar, title, ...props }) => {
  const activeCls = useMemo(() => active && cls.active, [active]);

  useEffect(() => {
    injectGlobal([skeletonCss]);
  }, []);
  return (
    <div {...props} className={classNames(cls.skeleton, className)}>
      {avatar && <div className={classNames(cls.avatar, activeCls)} />}
      <div className={cls.body}>
        {title && <div className={classNames(cls.title, activeCls)} />}
        <div className={cls.paragraph}>
          {Array(rows)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={classNames(activeCls)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
