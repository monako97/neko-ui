import React, { memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { projectInfo } from '@/utils';

const footerCss = css`
  .site-footer {
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
    font-size: var(--font-size-sm, 12px);
    line-height: 1rem;
  }

  .site-footer a {
    color: var(--text-color, rgb(0 0 0 / 65%));
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: background-color, color;
  }
`;

injectGlobal([footerCss]);
const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="site-footer">
      <p>
        <a href={projectInfo.repository?.url} target="_blank" rel="noopener noreferrer">
          {projectInfo.title}&nbsp;
        </a>
        Ⓒ {year} Made with ❤️‍🔥 by&nbsp;
        <a href={projectInfo.author?.url} target="_blank" rel="noopener noreferrer">
          {projectInfo.author?.name}
        </a>
      </p>
    </footer>
  );
};

export default memo(Footer, () => true);
