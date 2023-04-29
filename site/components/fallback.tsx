import React from 'react';
import { Skeleton, injectGlobal } from 'neko-ui';

injectGlobal`
  .site-fallback {
    display: flex;
    margin: auto;
    border-radius: var(--border-radius);
    padding: 32px;
    max-inline-size: 1280px;
    background-color: var(--component-bg);
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
