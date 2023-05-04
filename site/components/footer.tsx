import React from 'react';
import { injectGlobal } from 'neko-ui';
import { projectInfo } from '@/utils';

injectGlobal`
  .n-site-footer {
    display: flex;
    justify-content: center;
    padding-block-end: 16px;
    font-size: var(--font-size-sm);
    line-height: 16px;
  }
  .n-site-footer-link {
    color: var(--text-color);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: background-color, color;
  }
`;

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="n-site-footer">
      <p>
        <a
          className="n-site-footer-link"
          href={projectInfo.repository?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {projectInfo.title}&nbsp;
        </a>
        Ⓒ {year} Made with ❤️‍🔥 by&nbsp;
        <a
          className="n-site-footer-link"
          href={projectInfo.author?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {projectInfo.author?.name}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
