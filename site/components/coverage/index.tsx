import React, { memo, useMemo } from 'react';
import { projectBasicInfo, useLocation, useOutlet } from '@moneko/core';
import styles from './index.less';
import { isEqual } from 'neko-ui/utils/type';

const projectCoverage = projectBasicInfo.coverage[projectBasicInfo.programInfo.name] || {};

type CoverageType = 'statements' | 'conditionals' | 'methods';
const conf: Record<CoverageType, string> = {
  statements: '语句覆盖率',
  conditionals: '条件覆盖率',
  methods: '函数覆盖率',
};

const Coverage: React.FC = () => {
  const readme = useOutlet();
  const location = useLocation();
  const coverage = useMemo(() => {
    const compCoverage = projectBasicInfo.coverage[location.pathname.substring(1)] || {};

    return readme === null ? projectCoverage : compCoverage;
  }, [location.pathname, readme]);

  return (
    <div className={styles.coverage}>
      {Object.keys(conf).map((k) => {
        if (location.pathname === '/examples') return null;
        if (location.pathname.startsWith('/@moneko')) return null;
        const cover = coverage[k as CoverageType],
          covered = coverage[`covered${k}` as CoverageType],
          coverNum = Math.round((parseFloat(covered) / parseFloat(cover)) * 100) || 0;

        let stat = 'success';

        if (coverNum < 80) {
          stat = 'warning';
        }
        if (coverNum < 50) {
          stat = 'error';
        }

        return (
          <div key={k} className={`${styles.item} ${styles[stat]}`}>
            <div className={styles.label}>{conf[k as CoverageType]}</div>
            <div className={styles.value}>
              {cover ? (
                <React.Fragment>
                  <div>{coverNum}%</div>
                  <div>{`${cover} / ${covered}`}</div>
                </React.Fragment>
              ) : (
                <strong>0%</strong>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Coverage, isEqual);
