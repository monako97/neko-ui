import React, { memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { isObject } from '@moneko/common';
import { projectInfo } from '@/utils';

const footerCss = css`
  .site-footer {
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
    font-size: 12px;
    line-height: 16px;
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
const { repository, author } = projectInfo;
const repositoryUrl = isObject(repository) ? repository.url : repository;

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>
        <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
          {projectInfo.title}
        </a>
        {` ${year} Created by `}
        <a href="" target="_blank" rel="noopener noreferrer">
          {author?.toString()}
        </a>
      </p>
    </footer>
  );
};

export default memo(Footer, () => true);
