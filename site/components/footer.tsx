import React, { memo } from 'react';
import { isObject } from '@moneko/common';
import { projectInfo } from '@/utils';

const year = new Date().getFullYear();
const { repository, author } = projectInfo;
const repositoryUrl = isObject(repository) ? repository.url : repository;

const Footer = () => {
  return (
    <footer className="n-flex n-justify-center n-text-xs n-pb-4">
      <p>
        <a
          className="n-text-[var(--text-color)] n-transition-bg-c"
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {projectInfo.title}
        </a>
        {` ${year} Created by `}
        <a
          className="n-text-[var(--text-color)] n-transition-bg-c"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          {author?.toString()}
        </a>
      </p>
    </footer>
  );
};

export default memo(Footer, () => true);
