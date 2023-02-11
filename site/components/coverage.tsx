import React, { type FC, memo, useMemo, CSSProperties } from 'react';
import { css, injectGlobal } from '@emotion/css';
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

  .site-coverage-body {
    --coverage-color: var(--error-color, #ff4d4f);

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
        const c = coverage[k as CoverageType],
          covered = coverage[`covered${k}` as CoverageType],
          coverNum = Math.round((parseFloat(covered) / parseFloat(c)) * 100) || 0;

        let stat = 'success';

        if (coverNum < 50) {
          stat = 'error';
        } else if (coverNum < 80) {
          stat = 'warning';
        }

        return (
          <div
            key={k}
            className="site-coverage-body"
            style={
              {
                '--coverage-color': `var(--${stat}-color)`,
              } as CSSProperties
            }
          >
            <div className="site-coverage-label">{conf[k as CoverageType]}</div>
            <div className="site-coverage-value">
              <div>{coverNum ? `${coverNum}%` : '0%'}</div>
              <div>{`${c || '-'} / ${covered || '-'}`}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Coverage, () => true);
