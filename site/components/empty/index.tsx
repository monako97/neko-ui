import { projectInfo } from '@/utils';
import getBrowser from 'neko-ui/utils/broswer';
import React from 'react';
import styles from './index.less';

const broswer = getBrowser();

const Empty: React.FC = () => {
  return (
    <div className={styles.empty}>
      <p className={styles.info}>
        <h3>{projectInfo.title}</h3>
        <span className={styles.desc}>{projectInfo.description}</span>
      </p>
      <p className={styles.info}>
        <h3>version:</h3>
        <span className={styles.desc}>v{projectInfo.version}</span>
      </p>
      <p className={styles.info}>
        <h3>author:</h3>
        <span className={styles.desc}>{projectInfo.author?.toString()}</span>
      </p>
      <p className={styles.info}>
        <h3>Broswer:</h3>
        <span className={styles.desc}>
          {broswer.name} {broswer.version}
        </span>
      </p>
    </div>
  );
};

export default Empty;
