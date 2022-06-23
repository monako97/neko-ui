import { projectInfo } from '@/utils';
import React from 'react';
import styles from './index.less';

const Empty: React.FC = () => {
  return (
    <div className={styles.empty}>
      <p className={styles.info}>
        <h3>{projectInfo.title}</h3>
        <span className={styles.desc}>{projectInfo.description}</span>
      </p>
      <p className={styles.info}>
        <h3>version:</h3>
        <span className={styles.desc}>{projectInfo.version}</span>
      </p>
      <p className={styles.info}>
        <h3>author:</h3>
        <span className={styles.desc}>{projectInfo.author?.toString()}</span>
      </p>
    </div>
  );
};

export default Empty;
