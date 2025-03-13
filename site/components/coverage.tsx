import { createMemo, For } from 'solid-js';
import coverages from '@app/coverage';
import { name } from '@app/info';
import { cx } from '@moneko/css';
import { getPathName, useLocation } from '@moneko/solid';

import './coverage.global.css';

type CoverageType = 'statements' | 'conditionals' | 'methods';

function Coverage() {
  const location = useLocation();
  const coverage = createMemo(() => {
    const component = getPathName(location);

    return coverages[component ? `components.${component}` : name] || {};
  });

  function getNum(num: number) {
    return typeof num === 'number' && !isNaN(num) ? num : '-';
  }
  const obj: Record<CoverageType, string> = {
    statements: '语句覆盖率',
    conditionals: '条件覆盖率',
    methods: '函数覆盖率',
  };
  const keys = Object.keys(obj);

  return (
    <div class="site-coverage">
      <For each={keys}>
        {(k) => {
          const c = createMemo(() => parseFloat(coverage()[k as never]));
          const cd = createMemo(() => parseFloat(coverage()[`covered${k}` as never]));
          const num = createMemo(() =>
            c() === 0 && cd() === 0 ? 100 : Math.round((cd() / c()) * 100) || 0,
          );
          const stat = createMemo(() =>
            num() < 50 ? 'error' : num() < 80 ? 'warning' : 'success',
          );

          return (
            <div class={cx('site-coverage-body', `site-coverage-${stat()}`)}>
              <div class="site-coverage-label">{obj[k as CoverageType]}</div>
              <div class="site-coverage-value">
                <div>{num()}%</div>
                <div>{`${getNum(c())} / ${getNum(cd())}`}</div>
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
}

export default Coverage;
