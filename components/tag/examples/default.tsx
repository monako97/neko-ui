import React from 'react';
import { Tag } from 'neko-ui';
import styles from './default.less';

const Demo = () => {
  return (
    <div>
      <div className={styles.card}>
        <Tag className={styles.tag}>已封锁</Tag>
        <h4 className={styles.header}>手机打出小蛮腰</h4>
        <div className={styles.body}>
          手机打出小蛮腰手机打出小蛮腰手机打出小蛮腰手机打出小蛮腰手机打出小蛮腰手机打出小蛮腰手机打出小蛮腰手机打出小蛮腰手机打出小蛮腰手机打出小蛮腰手机打出小蛮腰手机打出小蛮腰
        </div>
        <div className={styles.footer}>手机打出小蛮腰</div>
      </div>
    </div>
  );
};

export default Demo;
