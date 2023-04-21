import React, { useMemo } from 'react';
import { projectBasicInfo, useLocation, useOutlet } from '@moneko/core';
import { cx, injectGlobal } from 'neko-ui';

const cover = projectBasicInfo.coverage;
const projectCoverage = cover[projectBasicInfo.programInfo.name] || {};

type CoverageType = 'statements' | 'conditionals' | 'methods';
const conf: Record<CoverageType, string> = {
  statements: '语句覆盖率',
  conditionals: '条件覆盖率',
  methods: '函数覆盖率',
};

injectGlobal`
  .site-coverage {
    display: flex;
    gap: 1rem;
    margin: 0 auto 1rem;
    max-inline-size: 80rem;
    flex-wrap: wrap;
  }

  .site-coverage-error {
    --border-color: var(--error-color, #ff4d4f);
  }

  .site-coverage-success {
    --border-color: var(--success-color, #52c41a);
  }

  .site-coverage-warning {
    --border-color: var(--warning-color, #faad14);
  }

  .site-coverage-body {
    display: flex;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: 0 0 0.125rem 0 var(--border-color), inset 0 0 0.125rem 0 var(--border-color);
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
    border-inline-end: 1px solid var(--border-color);
    padding: 0 0.5rem;
    font-size: var(--font-size);
    font-weight: 500;
    color: white;
    background-color: var(--border-color);
    text-shadow: 0.125rem 0.125rem 0.125rem var(--text-shadow-color);
    line-height: 1.25rem;
  }

  .site-coverage-value {
    padding: 0.25rem 0.5rem;
    min-inline-size: 5rem;
    font-size: var(--font-size-sm);
    text-align: center;
    line-height: 1rem;
    flex-direction: column;
    color: var(--border-color);
  }

  .site-coverage-value > div:first-of-type {
    border-block-end: 1px solid var(--border-color);
    inline-size: 100%;
    transition: inherit;
    transition-property: box-shadow, background-color, border-color;
  }
`;

function getNum(num: number) {
  return typeof num === 'number' && !isNaN(num) ? num : '-';
}
const Coverage: React.FC = () => {
  const readme = useOutlet();
  const location = useLocation();
  const coverage = useMemo(
    () => (readme ? cover[`components.${location.pathname.substring(1)}`] : projectCoverage) || {},
    [location.pathname, readme]
  );

  if (location.pathname === '/change-log') return null;
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
          <div key={k} className={cx('site-coverage-body', `site-coverage-${stat}`)}>
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

export default Coverage;
