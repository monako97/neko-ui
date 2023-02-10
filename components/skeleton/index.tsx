import React, { type FC, type HTMLAttributes } from 'react';
import { css, keyframes, injectGlobal } from '@emotion/css';
import { classNames } from '@moneko/common';

const skeletonVar = `
  :root {
    --skeleton-bg: rgba(0, 0, 0, 0.06);
    --skeleton-bg-active: rgba(0, 0, 0, 0.15);
  }
  [data-theme='dark'] {
    --skeleton-bg: rgba(255, 255, 255, 0.06);
    --skeleton-bg-active: rgba(255, 255, 255, 0.15);
  }
`;
const skeletonLoading = keyframes`
    0% {
        transform:translateX(-37.5%);
    }
    100% {
        transform:translateX(37.5%);
    }
`;
const skeletonCss = css`
  display: table;
  width: 100%;
`;
const contentCss = css`
  display: table-cell;
  width: 100%;
  vertical-align: top;
`;
const animationCss = css`
  position: relative;
  z-index: 0;
  overflow: hidden;
  background: var(--skeleton-bg);
  border-radius: var(--border-radius-base, 4px);
  &::after {
    position: absolute;
    top: 0;
    inset-inline-end: -150%;
    bottom: 0;
    inset-inline-start: -150%;
    background: linear-gradient(
      90deg,
      var(--skeleton-bg) 25%,
      var(--skeleton-bg-active) 37%,
      var(--skeleton-bg) 63%
    );
    animation: ${skeletonLoading} 1.4s ease infinite;
    content: '';
  }
`;
const titleCss = css`
  width: 32%;
  height: 32px;
  ${animationCss}
`;
const paragraphCss = css`
  margin-block-start: 24px;
  padding: 0;
  li {
    width: 100%;
    height: 16px;
    list-style: none;
    ${animationCss}
    & + li {
      margin-block-start: 16px;
    }
    &:last-of-type {
      width: 65%;
    }
  }
`;

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** 行 */
  count?: number;
}

injectGlobal(skeletonVar);

const Skeleton: FC<SkeletonProps> = ({ count = 3, className, ...props }) => {
  return (
    <div {...props} className={classNames(skeletonCss, className)}>
      <div className={contentCss}>
        <h3 className={titleCss} />
        <ul className={paragraphCss}>
          {Array(count)
            .fill(0)
            .map((_, i) => (
              <li key={i} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Skeleton;
