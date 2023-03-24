import React, { memo, useEffect } from 'react';
import { injectGlobal } from '@emotion/css';
import { Skeleton } from 'neko-ui';

const siteFallbackCss = `
  .site-fallback {
    display: flex;
    margin: auto;
    border-radius: var(--border-radius, 8px);
    padding: 2rem;
    max-width: 80rem;
    background-color: var(--component-background, rgb(255 255 255 / 80%));
    flex: 1;
  }
`;

const Fallback = () => {
  useEffect(() => {
    injectGlobal([siteFallbackCss]);
  }, []);
  return (
    <div className="site-fallback">
      <Skeleton title active rows={6} />
    </div>
  );
};

export default memo(Fallback, () => true);
