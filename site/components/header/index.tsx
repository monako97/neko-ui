import React, { useMemo } from 'react';
import { myPkgs, useLocation } from '@moneko/core';
import { useTheme } from 'neko-ui';
import { isEqual } from 'neko-ui/utils';
import { projectInfo } from '@/utils';
import type { PkgType } from '@/utils';
import styles from './index.less';

const Header = () => {
  const location = useLocation();
  const [theme, changeTheme] = useTheme();

  const current: PkgType = useMemo(
    () =>
      (myPkgs.find((item) => item.key === location.pathname.substring(1)) as unknown as PkgType) ||
      projectInfo,
    [location.pathname]
  );

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h2>{current?.title}</h2>
        <span className={styles.subTitle}>{current?.subtitle}</span>
      </div>
      <div
        onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
        className={styles.switchTheme}
      >
        {theme === 'dark' ? '🌒' : '🌞'}
      </div>
    </header>
  );
};

export default React.memo(Header, isEqual);
