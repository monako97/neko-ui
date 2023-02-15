import React, { useMemo, type FC, type HTMLAttributes } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { classNames } from '@moneko/common';
import prefixCls from '../prefix-cls';

const skeletonCls = {
  skeleton: prefixCls('skeleton'),
  active: prefixCls('skeleton-active'),
  title: prefixCls('skeleton-title'),
  paragraph: prefixCls('skeleton-paragraph'),
  body: prefixCls('skeleton-body'),
  avatar: prefixCls('skeleton-avatar'),
};

const skeletonCss = css`
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
  .${skeletonCls.skeleton} {
    display: flex;
    width: 100%;
    gap: 16px;
  }
  .${skeletonCls.avatar} {
    border-radius: 50%;
    width: 32px;
    height: 32px;
  }

  .${skeletonCls.body} {
    flex: 1;
  }
  .${skeletonCls.title} {
    margin-bottom: 16px;
    width: 32%;
    height: 32px;
  }
  .${skeletonCls.paragraph} {
    display: flex;
    padding: 0;
    flex-direction: column;
    gap: 12px;
  }
  .${skeletonCls.paragraph} > div {
    width: 100%;
    height: 16px;
    list-style: none;
  }

  .${skeletonCls.paragraph} > div:last-of-type {
    width: 65%;
  }
  .${skeletonCls.avatar}, .${skeletonCls.title}, .${skeletonCls.paragraph} > div {
    overflow: hidden;
    border-radius: var(--border-radius-base, 4px);
    background: var(--skeleton-bg);
    transition: background-color var(--transition-duration) var(--transition-timing-function);
  }

  .${skeletonCls.active} {
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

injectGlobal([skeletonCss]);
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
  const activeCls = useMemo(() => active && skeletonCls.active, [active]);

  return (
    <div {...props} className={classNames(skeletonCls.skeleton, className)}>
      {avatar && <div className={classNames(skeletonCls.avatar, activeCls)} />}
      <div className={skeletonCls.body}>
        {title && <div className={classNames(skeletonCls.title, activeCls)} />}
        <div className={skeletonCls.paragraph}>
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
