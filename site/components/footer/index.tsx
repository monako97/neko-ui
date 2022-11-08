import { projectInfo } from '@/utils';
import { isObject } from '@moneko/common';
import React from 'react';
import styles from './index.less';

const year = new Date().getFullYear();

const { repository, author } = projectInfo;

const repositoryUrl = isObject(repository) ? repository.url : repository;

const Footer = () => {
  return (
    <footer className={styles.footer}>
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

export default Footer;
