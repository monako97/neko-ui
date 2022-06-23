import React, { useEffect, useMemo } from 'react';
import { myPkgs, useLocation } from 'plugin-runtime';
import { useTheme } from 'neko-ui';
import { isEqual } from 'lodash';
import { PkgType, projectInfo } from '@/utils';
import styles from './index.less';

const Header = () => {
  const location = useLocation();
  const { type, setType } = useTheme();
  const handleTheme = () => {
    setType(type === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', type);
  }, [type]);
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
      <div onClick={handleTheme} className={styles.switchTheme}>
        {type === 'dark' ? '🌒' : '🌞'}
      </div>
    </header>
  );
};

export default React.memo(Header, isEqual);
