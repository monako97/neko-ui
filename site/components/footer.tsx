import React from 'react';
import { css } from '@emotion/css';
import { projectInfo } from '@/utils';

const footer = css`
  display: flex;
  justify-content: center;
  padding-block-end: 1rem;
  font-size: var(--font-size-sm);
  line-height: 1rem;
`;
const link = css`
  color: var(--text-color);
  transition-duration: var(--transition-duration);
  transition-timing-function: var(--transition-timing-function);
  transition-property: background-color, color;
`;

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className={footer}>
      <p>
        <a
          className={link}
          href={projectInfo.repository?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {projectInfo.title}&nbsp;
        </a>
        Ⓒ {year} Made with ❤️‍🔥 by&nbsp;
        <a
          className={link}
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
