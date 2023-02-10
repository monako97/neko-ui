import { FC, memo, useMemo } from 'react';
import { projectBasicInfo, useLocation, useOutlet } from '@moneko/core';
import { css } from '@emotion/css';
import { classNames } from '@moneko/common';

const projectCoverage = projectBasicInfo.coverage[projectBasicInfo.programInfo.name] || {};

type CoverageType = 'statements' | 'conditionals' | 'methods';
const conf: Record<CoverageType, string> = {
  statements: '语句覆盖率',
  conditionals: '条件覆盖率',
  methods: '函数覆盖率',
};

const Coverage: FC = () => {
  const readme = useOutlet();
  const location = useLocation();
  const coverage = useMemo(
    () =>
      (readme ? projectBasicInfo.coverage[location.pathname.substring(1)] : projectCoverage) || {},
    [location.pathname, readme]
  );

  if (location.pathname === '/examples') return null;
  if (location.pathname.startsWith('/@moneko')) return null;
  return location.pathname === '/examples' ? null : (
    <div className="n-flex n-gap-4 n-mx-auto n-mt-0 n-mb-4 n-max-w-[80rem] n-flex-wrap">
      {Object.keys(conf).map((k) => {
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
        const itemStatCss = css`
          box-shadow: 0 0 2px 0 var(--${stat}-color), inset 0 0 2px 0 var(--${stat}-color);
          border-color: var(--${stat}-color);
        `;
        const labelStatCss = css`
          background-color: var(--${stat}-color);
          border-color: var(--${stat}-color);
        `;
        const valueStatCss = css`
          color: var(--${stat}-color);
        `;
        const valueSplitCss = css`
          border-color: var(--${stat}-color);
        `;

        return (
          <div
            key={k}
            className={classNames(
              'n-flex n-rounded n-transition-coverage n-border n-border-solid',
              itemStatCss
            )}
          >
            <div
              className={classNames(
                'n-flex n-items-center n-justify-center n-px-2 n-transition-coverage n-font-medium n-text-white n-text-sm n-text-shadow n-border-r n-border-solid',
                labelStatCss
              )}
            >
              {conf[k as CoverageType]}
            </div>
            <div
              className={classNames(
                'n-flex n-text-xs n-items-center n-justify-center n-px-2 n-py-1 n-transition-coverage n-flex-col n-text-center n-min-w-[5rem]',
                valueStatCss
              )}
            >
              <div
                className={classNames(
                  'n-w-full n-transition-s-bg-b n-border-0 n-border-b n-border-solid',
                  valueSplitCss
                )}
              >
                {coverNum}%
              </div>
              <div>{`${cover || '-'} / ${covered || '-'}`}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Coverage, () => true);
