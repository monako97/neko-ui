import React, { memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { Skeleton } from 'neko-ui';

const siteFallbackCss = css`
  .site-fallback {
    display: flex;
    margin: auto;
    border-radius: var(--border-radius-base, 4px);
    padding: 32px;
    max-width: 1280px;
    background-color: var(--component-background, rgb(255 255 255 / 80%));
    flex: 1;
  }
`;

injectGlobal([siteFallbackCss]);

const Fallback = () => {
  return (
    <div className="site-fallback">
      <Skeleton count={6} />
    </div>
  );
};

export default memo(Fallback, () => true);
