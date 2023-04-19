import React from 'react';
import { injectGlobal } from '@emotion/css';
import { Skeleton } from 'neko-ui';

injectGlobal`
  .site-fallback {
    display: flex;
    margin: auto;
    border-radius: var(--border-radius);
    padding: 2rem;
    max-inline-size: 80rem;
    background-color: var(--component-background);
    flex: 1;
  }
`;

const Fallback = () => {
  return (
    <div className="site-fallback">
      <Skeleton title active rows={6} />
    </div>
  );
};

export default Fallback;
