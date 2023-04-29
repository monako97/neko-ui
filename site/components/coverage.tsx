import React, { useCallback, useMemo } from 'react';
import { projectBasicInfo, useLocation, useOutlet } from '@moneko/core';
import { cx, injectGlobal } from 'neko-ui';

type CoverageType = 'statements' | 'conditionals' | 'methods';

injectGlobal`
  .site-coverage {
    display: flex;
    gap: 16px;
    margin: 0 auto 16px;
    max-inline-size: 1280px;
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
    box-shadow: 0 0 2px 0 var(--border-color), inset 0 0 2px 0 var(--border-color);
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
    padding: 0 8px;
    font-size: var(--font-size);
    font-weight: 500;
    color: white;
    background-color: var(--border-color);
    text-shadow: 2px 2px 2px var(--primary-shadow);
    line-height: 20px;
  }

  .site-coverage-value {
    padding: 4px 8px;
    min-inline-size: 80px;
    font-size: var(--font-size-sm);
    text-align: center;
    line-height: 16px;
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

const Coverage: React.FC = () => {
  const { keys, vals } = useMemo(() => {
    const obj: Record<CoverageType, string> = {
      statements: '语句覆盖率',
      conditionals: '条件覆盖率',
      methods: '函数覆盖率',
    };

    return {
      keys: Object.keys(obj),
      vals: obj,
    };
  }, []);

  const readme = useOutlet();
  const location = useLocation();
  const coverage = useMemo(() => {
    const cover = projectBasicInfo.coverage;

    if (readme) {
      return cover[`components.${location.pathname.substring(1)}`] || {};
    }
    return cover[projectBasicInfo.programInfo.name] || {};
  }, [location.pathname, readme]);
  const getNum = useCallback((num: number) => {
    return typeof num === 'number' && !isNaN(num) ? num : '-';
  }, []);

  if (location.pathname.startsWith('/@moneko')) return null;
  if (['/examples', '/change-log'].includes(location.pathname)) return null;
  return (
    <div className="site-coverage">
      {keys.map((k) => {
        const c = parseFloat(coverage[k as CoverageType]);
        const covered = parseFloat(coverage[`covered${k}` as CoverageType]);
        const coverNum = c === 0 && covered === 0 ? 100 : Math.round((covered / c) * 100) || 0;
        const stat = coverNum < 50 ? 'error' : coverNum < 80 ? 'warning' : 'success';

        return (
          <div key={k} className={cx('site-coverage-body', `site-coverage-${stat}`)}>
            <div className="site-coverage-label">{vals[k as CoverageType]}</div>
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
