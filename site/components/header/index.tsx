import React, { useCallback, useEffect, useMemo } from 'react';
import { myPkgs, useLocation } from 'plugin-runtime';
import { useTheme } from 'neko-ui';
import { isEqual } from 'lodash';
import { PkgType, projectInfo } from '@/utils';
import styles from './index.less';

const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
const Header = () => {
  const location = useLocation();
  const [type, setType] = useTheme();
  const handleTheme = useCallback(
    ({ matches }: { matches: boolean }) => {
      const theme = matches ? 'light' : 'dark';

      setType(theme);
      document.body.setAttribute('data-theme', theme);
    },
    [setType]
  );

  useEffect(() => {
    themeMedia.addEventListener('change', handleTheme);
    return () => {
      themeMedia.removeEventListener('change', handleTheme);
    };
  }, [handleTheme]);
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
      <div onClick={() => handleTheme({ matches: type === 'dark' })} className={styles.switchTheme}>
        {type === 'dark' ? '🌒' : '🌞'}
      </div>
    </header>
  );
};

export default React.memo(Header, isEqual);
