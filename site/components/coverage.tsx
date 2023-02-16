import React, { type FC, memo, useMemo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { classNames } from '@moneko/common';
import { projectBasicInfo, useLocation, useOutlet } from '@moneko/core';

const cover = projectBasicInfo.coverage;
const projectCoverage = cover[projectBasicInfo.programInfo.name] || {};

type CoverageType = 'statements' | 'conditionals' | 'methods';
const conf: Record<CoverageType, string> = {
  statements: '语句覆盖率',
  conditionals: '条件覆盖率',
  methods: '函数覆盖率',
};
const coverageStyle = css`
  .site-coverage {
    display: flex;
    gap: 16px;
    margin: 0 auto 16px;
    max-width: 1280px;
    flex-wrap: wrap;
  }

  .site-coverage-error {
    --coverage-color: var(--error-color, #ff4d4f);
  }

  .site-coverage-success {
    --coverage-color: var(--success-color, #52c41a);
  }

  .site-coverage-warning {
    --coverage-color: var(--warning-color, #faad14);
  }

  .site-coverage-body {
    display: flex;
    overflow: hidden;
    border: 1px solid var(--coverage-color);
    border-radius: var(--border-radius-base, 4px);
    box-shadow: 0 0 2px 0 var(--coverage-color), inset 0 0 2px 0 var(--coverage-color);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: box-shadow, background-color, border-color, color;
  }

  .site-coverage-label,
  .site-coverage-value {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: inherit;
  }

  .site-coverage-label {
    border-right: 1px solid var(--coverage-color);
    padding: 0 8px;
    font-size: 14px;
    font-weight: 500;
    color: white;
    background-color: var(--coverage-color);
    text-shadow: 2px 2px 2px var(--text-shadow-color);
    line-height: 20px;
  }

  .site-coverage-value {
    padding: 4px 8px;
    min-width: 80px;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
    flex-direction: column;
    color: var(--coverage-color);
  }

  .site-coverage-value > div:first-of-type {
    border-bottom: 1px solid var(--coverage-color);
    width: 100%;
    transition: inherit;
    transition-property: box-shadow, background-color, border-color;
  }
`;

injectGlobal([coverageStyle]);
function getNum(num: number) {
  return typeof num === 'number' && !isNaN(num) ? num : '-';
}
const Coverage: FC = () => {
  const readme = useOutlet();
  const location = useLocation();
  const coverage = useMemo(
    () => (readme ? cover[`components.${location.pathname.substring(1)}`] : projectCoverage) || {},
    [location.pathname, readme]
  );

  if (location.pathname === '/examples') return null;
  if (location.pathname.startsWith('/@moneko')) return null;
  return (
    <div className="site-coverage">
      {Object.keys(conf).map((k) => {
        const c = parseFloat(coverage[k as CoverageType]);
        const covered = parseFloat(coverage[`covered${k}` as CoverageType]);
        const coverNum = c === 0 && covered === 0 ? 100 : Math.round((covered / c) * 100) || 0;
        const stat = coverNum < 50 ? 'error' : coverNum < 80 ? 'warning' : 'success';

        return (
          <div key={k} className={classNames('site-coverage-body', `site-coverage-${stat}`)}>
            <div className="site-coverage-label">{conf[k as CoverageType]}</div>
            <div className="site-coverage-value">
              <div>{coverNum}%</div>
              <div>{`${getNum(c)} / ${getNum(covered)}`}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Coverage, () => true);
