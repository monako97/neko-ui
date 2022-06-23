import { projectInfo } from '@/utils';
import React from 'react';
import styles from './index.less';

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <a href={projectInfo.repository} target="_blank" rel="noopener noreferrer">
          {projectInfo.title}
        </a>
        {` ${year} Created by `}
        <a href="" target="_blank" rel="noopener noreferrer">
          {projectInfo.author?.toString()}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
